import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'spes_secret_key_prod_2026_engineering_excellence';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

export function generateToken(user: { id: number; username: string; email: string }) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export function authenticateAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  // Check cookie or Authorization Bearer header
  const token = req.cookies?.spes_admin_token || req.headers.authorization?.replace(/^Bearer\s+/i, '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string; email: string };
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Session expired or invalid token. Please log in again.' });
  }
}
