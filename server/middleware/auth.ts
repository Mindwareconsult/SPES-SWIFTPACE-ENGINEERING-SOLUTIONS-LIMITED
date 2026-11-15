import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { db } from '../database/db.ts';
import { resolveJwtSecretPath } from '../config/paths.ts';

export const TOKEN_TTL_SECONDS = 24 * 60 * 60; // 24 hours
export const TOKEN_TTL_MS = TOKEN_TTL_SECONDS * 1000;

function resolveJwtSecret(): string {
  const envSecret = process.env.JWT_SECRET?.trim();
  if (envSecret) {
    if (envSecret.length >= 32) {
      return envSecret;
    }
    console.warn('[SPES Security] JWT_SECRET is shorter than 32 characters and was rejected. Using persisted secret instead.');
  } else if (process.env.NODE_ENV === 'production') {
    console.warn('[SPES Security] JWT_SECRET environment variable is not set in production. Falling back to persisted secret file (set JWT_SECRET for multi-instance deployments).');
  }

  const secretFile = resolveJwtSecretPath();
  try {
    if (fs.existsSync(secretFile)) {
      const stored = fs.readFileSync(secretFile, 'utf8').trim();
      if (stored.length >= 32) {
        return stored;
      }
    }
    const generated = crypto.randomBytes(64).toString('hex');
    fs.mkdirSync(path.dirname(secretFile), { recursive: true });
    fs.writeFileSync(secretFile, generated, { mode: 0o600 });
    return generated;
  } catch {
    // Ephemeral fallback if filesystem is read-only
    return crypto.randomBytes(64).toString('hex');
  }
}

const JWT_SECRET = resolveJwtSecret();

export interface TokenPayload {
  id: number;
  username: string;
  email: string;
  ver: number;
  jti: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    email: string;
    must_change_password?: number;
  };
  authTokenPayload?: TokenPayload;
}

export function generateToken(user: {
  id: number;
  username: string;
  email: string;
  token_version?: number;
}): { token: string; expiresAt: number; jti: string } {
  const jti = crypto.randomUUID();
  const ver = user.token_version ?? 1;
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      ver,
      jti
    },
    JWT_SECRET,
    { algorithm: 'HS256', expiresIn: TOKEN_TTL_SECONDS }
  );
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  return { token, expiresAt, jti };
}

export function extractTokenFromRequest(req: Request): { token: string | null; source: 'bearer' | 'cookie' | null } {
  const authHeader = req.headers.authorization;
  if (authHeader && /^Bearer\s+/i.test(authHeader)) {
    const bearer = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (bearer && bearer !== 'null' && bearer !== 'undefined') {
      return { token: bearer, source: 'bearer' };
    }
  }

  const cookieToken = req.cookies?.spes_admin_token;
  if (cookieToken && typeof cookieToken === 'string') {
    return { token: cookieToken, source: 'cookie' };
  }

  return { token: null, source: null };
}

export function revokeToken(token: string | null) {
  if (!token) return;
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as TokenPayload;
    if (decoded?.jti && decoded?.exp) {
      db.prepare(`
        INSERT OR IGNORE INTO revoked_tokens (jti, expires_at)
        VALUES (?, ?)
      `).run(decoded.jti, decoded.exp);
    }
  } catch {
    // Token already invalid or expired
  }
}

function getConfiguredOriginPatterns(): string[] {
  const raw = [
    process.env.ALLOWED_ORIGINS,
    process.env.FRONTEND_URL,
    process.env.APP_URL
  ]
    .filter((v): v is string => typeof v === 'string' && v.trim().length > 0)
    .join(',');

  return raw
    .split(',')
    .map((item) => item.trim().replace(/\/+$/, ''))
    .filter(Boolean);
}

export function isAllowedOrigin(origin: string | undefined, req?: Request): boolean {
  if (!origin) return false;
  let parsedOrigin: URL;
  try {
    parsedOrigin = new URL(origin);
  } catch {
    return false;
  }

  const normalizedOrigin = `${parsedOrigin.protocol}//${parsedOrigin.host}`;

  if (req) {
    const directHost = typeof req.headers.host === 'string' ? req.headers.host.trim() : '';
    const forwardedHostRaw = req.headers['x-forwarded-host'];
    const forwardedHost =
      typeof forwardedHostRaw === 'string' ? forwardedHostRaw.split(',')[0].trim() : '';

    if ((directHost && parsedOrigin.host === directHost) || (forwardedHost && parsedOrigin.host === forwardedHost)) {
      return true;
    }
  }

  if (process.env.NODE_ENV !== 'production' && (parsedOrigin.hostname === 'localhost' || parsedOrigin.hostname === '127.0.0.1')) {
    return true;
  }

  const patterns = getConfiguredOriginPatterns();
  for (const pattern of patterns) {
    if (pattern === normalizedOrigin) return true;
    if (pattern.startsWith('https://*.') || pattern.startsWith('http://*.')) {
      try {
        const [scheme, wildcardHost] = pattern.split('://*.');
        if (
          parsedOrigin.protocol === `${scheme}:` &&
          wildcardHost &&
          (parsedOrigin.host === wildcardHost || parsedOrigin.host.endsWith(`.${wildcardHost}`))
        ) {
          return true;
        }
      } catch {
        // Ignore malformed wildcard pattern
      }
    }
  }

  return false;
}

export function isTrustedCsrfRequest(req: Request): boolean {
  if (req.headers['x-requested-with']) {
    return true;
  }
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined;
  return isAllowedOrigin(origin, req);
}

export function authenticateAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const { token, source } = extractTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }

  // CSRF protection for cookie-only state-changing requests
  const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method.toUpperCase());
  if (source === 'cookie' && isMutation && !isTrustedCsrfRequest(req)) {
    return res.status(403).json({ error: 'CSRF validation failed for state-changing request.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as TokenPayload;

    if (!decoded || typeof decoded.id !== 'number') {
      return res.status(401).json({ error: 'Invalid authentication token payload.' });
    }

    // Verify token has not been revoked on logout
    if (decoded.jti) {
      const revoked = db.prepare('SELECT jti FROM revoked_tokens WHERE jti = ?').get(decoded.jti);
      if (revoked) {
        return res.status(401).json({ error: 'Session has been terminated. Please log in again.' });
      }
    }

    // Verify admin exists and token_version matches (invalidates tokens after password change)
    const admin = db.prepare(`
      SELECT id, username, email, must_change_password, token_version
      FROM admins
      WHERE id = ?
    `).get(decoded.id) as
      | { id: number; username: string; email: string; must_change_password: number; token_version: number }
      | undefined;

    if (!admin) {
      return res.status(401).json({ error: 'Administrator account no longer exists.' });
    }

    if ((decoded.ver ?? 1) !== (admin.token_version ?? 1)) {
      return res.status(401).json({ error: 'Session invalidated due to credential update. Please log in again.' });
    }

    req.user = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      must_change_password: admin.must_change_password
    };
    req.authTokenPayload = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }
}

