import { Router } from 'express';
import type { Request } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { db } from '../database/db.ts';
import {
  generateToken,
  authenticateAdmin,
  extractTokenFromRequest,
  revokeToken,
  TOKEN_TTL_MS
} from '../middleware/auth.ts';
import type { AuthRequest } from '../middleware/auth.ts';

const router = Router();

// Precomputed dummy bcrypt hash to equalize timing when username/email is not found
const DUMMY_HASH = '$2b$12$C6UzMDM.H6dfI/f/IKcEeO0uU5U/Z4W9z8z6H0w2k1sQ0b1F5e6a.';

// In-memory IP rate limiter for login attempts (sliding window)
const MAX_IP_FAILURES = 15;
const IP_WINDOW_MS = 5 * 60 * 1000;
const ACCOUNT_LOCKOUT_THRESHOLD = 5;
const ACCOUNT_LOCKOUT_MINUTES = 5;
const ipFailureLog = new Map<string, number[]>();

function getClientIp(req: Request): string {
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function isIpRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipFailureLog.get(ip) || []).filter((t) => now - t < IP_WINDOW_MS);
  ipFailureLog.set(ip, timestamps);
  return timestamps.length >= MAX_IP_FAILURES;
}

function recordIpFailure(ip: string) {
  const now = Date.now();
  const timestamps = (ipFailureLog.get(ip) || []).filter((t) => now - t < IP_WINDOW_MS);
  timestamps.push(now);
  ipFailureLog.set(ip, timestamps);
}

function clearIpFailures(ip: string) {
  ipFailureLog.delete(ip);
}

function getCookieOptions(req: Request) {
  const forwardedProto = req.headers['x-forwarded-proto'];
  const isHttps =
    req.secure ||
    (typeof forwardedProto === 'string' && forwardedProto.split(',')[0].trim() === 'https');

  const secFetchSite = typeof req.headers['sec-fetch-site'] === 'string' ? req.headers['sec-fetch-site'] : '';
  const secFetchDest = typeof req.headers['sec-fetch-dest'] === 'string' ? req.headers['sec-fetch-dest'] : '';
  const isCrossSiteFrame = isHttps && (secFetchSite === 'cross-site' || secFetchDest === 'iframe');

  return {
    httpOnly: true,
    secure: isHttps,
    sameSite: (isCrossSiteFrame ? 'none' : 'lax') as 'none' | 'lax',
    path: '/',
    maxAge: TOKEN_TTL_MS
  };
}

// PUBLIC: GET /api/admin/auth-status (safe metadata only, no credentials exposed)
router.get('/auth-status', (_req, res) => {
  const admin = db
    .prepare('SELECT must_change_password FROM admins ORDER BY id ASC LIMIT 1')
    .get() as { must_change_password?: number } | undefined;

  return res.json({
    initialized: Boolean(admin),
    initialSetupPending: Boolean(admin?.must_change_password)
  });
});

// POST /api/admin/login
router.post('/login', (req, res) => {
  try {
    const ip = getClientIp(req);
    if (isIpRateLimited(ip)) {
      return res.status(429).json({
        error: 'Too many failed authentication attempts. Please wait 5 minutes before trying again.'
      });
    }

    const { usernameOrEmail, password } = req.body || {};

    if (typeof usernameOrEmail !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Username or official email and password are required.' });
    }

    const identifier = usernameOrEmail.trim();
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Username or official email and password are required.' });
    }

    if (identifier.length > 150 || password.length > 128) {
      return res.status(400).json({ error: 'Invalid input length.' });
    }

    const admin = db.prepare(`
      SELECT * FROM admins
      WHERE LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?)
      LIMIT 1
    `).get(identifier, identifier) as any;

    if (!admin) {
      // Equalize response timing
      bcrypt.compareSync(password, DUMMY_HASH);
      recordIpFailure(ip);
      return res.status(401).json({
        error: 'Invalid credentials. Please verify your username/email and password.'
      });
    }

    // Check account lockout
    if (admin.locked_until) {
      const normalized = String(admin.locked_until).includes('T')
        ? String(admin.locked_until)
        : String(admin.locked_until).replace(' ', 'T') + 'Z';
      const lockedUntilMs = new Date(normalized).getTime();
      if (!Number.isNaN(lockedUntilMs) && lockedUntilMs > Date.now()) {
        const remainingMin = Math.ceil((lockedUntilMs - Date.now()) / 60000);
        return res.status(429).json({
          error: `Account temporarily locked due to repeated failed attempts. Try again in ${remainingMin} minute(s).`
        });
      }
    }

    const isMatch = bcrypt.compareSync(password, admin.password_hash);
    if (!isMatch) {
      recordIpFailure(ip);
      const nextFailures = (admin.failed_attempts || 0) + 1;
      if (nextFailures >= ACCOUNT_LOCKOUT_THRESHOLD) {
        db.prepare(`
          UPDATE admins
          SET failed_attempts = ?, locked_until = datetime('now', '+${ACCOUNT_LOCKOUT_MINUTES} minutes')
          WHERE id = ?
        `).run(nextFailures, admin.id);
        return res.status(429).json({
          error: `Account temporarily locked for ${ACCOUNT_LOCKOUT_MINUTES} minutes due to repeated failed attempts.`
        });
      } else {
        db.prepare(`UPDATE admins SET failed_attempts = ? WHERE id = ?`).run(nextFailures, admin.id);
      }

      return res.status(401).json({
        error: 'Invalid credentials. Please verify your username/email and password.'
      });
    }

    // Successful authentication: reset lockout counters and update last_login
    clearIpFailures(ip);
    db.prepare(`
      UPDATE admins
      SET failed_attempts = 0, locked_until = NULL, last_login = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(admin.id);

    const updatedAdmin = db.prepare(`
      SELECT id, username, email, must_change_password, token_version, last_login
      FROM admins
      WHERE id = ?
    `).get(admin.id) as any;

    const { token, expiresAt } = generateToken({
      id: updatedAdmin.id,
      username: updatedAdmin.username,
      email: updatedAdmin.email,
      token_version: updatedAdmin.token_version
    });

    res.cookie('spes_admin_token', token, getCookieOptions(req));

    return res.json({
      success: true,
      token,
      expiresAt,
      user: {
        id: updatedAdmin.id,
        username: updatedAdmin.username,
        email: updatedAdmin.email,
        must_change_password: Boolean(updatedAdmin.must_change_password),
        last_login: updatedAdmin.last_login
      }
    });
  } catch (err) {
    console.error('[SPES Auth] Login error:', err);
    return res.status(500).json({ error: 'An authentication service error occurred. Please try again.' });
  }
});

// POST /api/admin/logout
router.post('/logout', (req, res) => {
  const { token, source } = extractTokenFromRequest(req);
  if (source === 'cookie') {
    const hasCustomHeader = Boolean(req.headers['x-requested-with']);
    const origin = req.headers.origin;
    const host = req.headers.host;
    let sameOrigin = false;
    if (origin && host) {
      try {
        sameOrigin = new URL(origin).host === host;
      } catch {
        sameOrigin = false;
      }
    }
    if (!hasCustomHeader && !sameOrigin) {
      return res.status(403).json({ error: 'CSRF validation failed for logout request.' });
    }
  }

  revokeToken(token);

  const cookieOpts = getCookieOptions(req);
  res.clearCookie('spes_admin_token', {
    httpOnly: cookieOpts.httpOnly,
    secure: cookieOpts.secure,
    sameSite: cookieOpts.sameSite,
    path: cookieOpts.path
  });

  return res.json({ success: true, message: 'Successfully logged out.' });
});

// GET /api/admin/me
router.get('/me', authenticateAdmin, (req: AuthRequest, res) => {
  const admin = db.prepare(`
    SELECT id, username, email, must_change_password, created_at, last_login
    FROM admins
    WHERE id = ?
  `).get(req.user!.id) as any;

  if (!admin) {
    return res.status(404).json({ error: 'Administrator record not found.' });
  }

  return res.json({
    user: {
      ...admin,
      must_change_password: Boolean(admin.must_change_password)
    }
  });
});

// PUT /api/admin/change-password
router.put('/change-password', authenticateAdmin, (req: AuthRequest, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (typeof currentPassword !== 'string' || typeof newPassword !== 'string' || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
  }

  if (newPassword.length > 128) {
    return res.status(400).json({ error: 'New password must not exceed 128 characters.' });
  }

  const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(req.user!.id) as any;
  if (!admin || !bcrypt.compareSync(currentPassword, admin.password_hash)) {
    return res.status(400).json({ error: 'Current password is incorrect.' });
  }

  if (bcrypt.compareSync(newPassword, admin.password_hash)) {
    return res.status(400).json({ error: 'New password must be different from your current password.' });
  }

  const salt = bcrypt.genSaltSync(12);
  const newHash = bcrypt.hashSync(newPassword, salt);
  const nextVersion = (admin.token_version || 1) + 1;

  db.prepare(`
    UPDATE admins
    SET password_hash = ?, must_change_password = 0, token_version = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(newHash, nextVersion, req.user!.id);

  // Issue fresh token so the active session continues uninterrupted while all older sessions are invalidated
  const { token, expiresAt } = generateToken({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    token_version: nextVersion
  });

  res.cookie('spes_admin_token', token, getCookieOptions(req));

  return res.json({
    success: true,
    message: 'Administrator password updated successfully.',
    token,
    expiresAt
  });
});

// POST /api/admin/recover (only active if ADMIN_RECOVERY_TOKEN is configured in server environment)
router.post('/recover', (req, res) => {
  const ip = getClientIp(req);
  if (isIpRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many recovery attempts. Please wait 5 minutes before trying again.'
    });
  }

  const configuredToken = process.env.ADMIN_RECOVERY_TOKEN;
  if (!configuredToken || configuredToken.length < 16) {
    return res.status(403).json({
      error: 'Administrator password recovery via HTTP is disabled. Use the server CLI recovery tool.'
    });
  }

  const { recoveryToken, newPassword } = req.body || {};
  if (typeof recoveryToken !== 'string' || typeof newPassword !== 'string') {
    return res.status(400).json({ error: 'Recovery token and new password are required.' });
  }

  const a = Buffer.from(recoveryToken);
  const b = Buffer.from(configuredToken);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    recordIpFailure(ip);
    return res.status(401).json({ error: 'Invalid recovery token.' });
  }

  if (newPassword.length < 8 || newPassword.length > 128) {
    return res.status(400).json({ error: 'New password must be between 8 and 128 characters.' });
  }

  const admin = db.prepare('SELECT id, token_version FROM admins ORDER BY id ASC LIMIT 1').get() as any;
  if (!admin) {
    return res.status(404).json({ error: 'No administrator account exists.' });
  }

  const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(12));
  db.prepare(`
    UPDATE admins
    SET password_hash = ?, must_change_password = 0, failed_attempts = 0, locked_until = NULL,
        token_version = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(hash, (admin.token_version || 1) + 1, admin.id);

  return res.json({ success: true, message: 'Administrator password has been reset securely.' });
});

export default router;

