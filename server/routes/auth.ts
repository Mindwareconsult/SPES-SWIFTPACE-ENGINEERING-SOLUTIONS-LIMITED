import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../database/db';
import { generateToken, authenticateAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ error: 'Username/email and password are required.' });
  }

  const admin = db.prepare(`
    SELECT * FROM admins
    WHERE username = ? OR email = ?
  `).get(usernameOrEmail.trim(), usernameOrEmail.trim().toLowerCase()) as any;

  if (!admin) {
    return res.status(401).json({ error: 'Invalid credentials. Please verify your login details.' });
  }

  const isMatch = bcrypt.compareSync(password, admin.password_hash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials. Please verify your login details.' });
  }

  // Update last login
  db.prepare(`UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?`).run(admin.id);

  const token = generateToken({
    id: admin.id,
    username: admin.username,
    email: admin.email
  });

  res.cookie('spes_admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  return res.json({
    success: true,
    token,
    user: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      last_login: admin.last_login
    }
  });
});

// POST /api/admin/logout
router.post('/logout', (_req, res) => {
  res.clearCookie('spes_admin_token');
  return res.json({ success: true, message: 'Successfully logged out.' });
});

// GET /api/admin/me
router.get('/me', authenticateAdmin, (req: AuthRequest, res) => {
  const admin = db.prepare('SELECT id, username, email, created_at, last_login FROM admins WHERE id = ?').get(req.user!.id);
  if (!admin) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json({ user: admin });
});

// PUT /api/admin/change-password
router.put('/change-password', authenticateAdmin, (req: AuthRequest, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
  }

  const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(req.user!.id) as any;
  if (!admin || !bcrypt.compareSync(currentPassword, admin.password_hash)) {
    return res.status(400).json({ error: 'Current password is incorrect.' });
  }

  const salt = bcrypt.genSaltSync(10);
  const newHash = bcrypt.hashSync(newPassword, salt);
  db.prepare('UPDATE admins SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(newHash, req.user!.id);

  return res.json({ success: true, message: 'Password updated successfully.' });
});

export default router;
