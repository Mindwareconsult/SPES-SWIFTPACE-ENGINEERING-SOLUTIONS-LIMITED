import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { db } from '../database/db';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

const mediaStorage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const category = (req.body.category as string) || 'general';
    const sub = ['projects', 'blog', 'media'].includes(category) ? category : 'media';
    const dir = path.join(process.cwd(), 'uploads', sub);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${base}-${uniqueSuffix}${ext}`);
  }
});

const uploadMedia = multer({
  storage: mediaStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (.jpg, .jpeg, .png, .webp, .svg) are allowed.'));
    }
  }
});

// ADMIN: GET /api/admin/media
router.get('/admin', authenticateAdmin, (req, res) => {
  const { category } = req.query;
  let query = 'SELECT * FROM media';
  const params: any[] = [];
  if (category && category !== 'all') {
    query += ' WHERE category = ?';
    params.push(category);
  }
  query += ' ORDER BY uploaded_at DESC';
  const items = db.prepare(query).all(...params);
  return res.json({ media: items });
});

// ADMIN: POST /api/admin/media/upload
router.post('/admin/upload', authenticateAdmin, uploadMedia.array('files', 10), (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded.' });
    }

    const category = (req.body.category as string) || 'general';
    const sub = ['projects', 'blog', 'media'].includes(category) ? category : 'media';
    const insert = db.prepare(`
      INSERT INTO media (filename, file_path, file_type, file_size, category)
      VALUES (?, ?, ?, ?, ?)
    `);

    const uploaded = files.map(file => {
      const webPath = `/uploads/${sub}/${file.filename}`;
      const info = insert.run(file.originalname, webPath, file.mimetype, file.size, category);
      return {
        id: info.lastInsertRowid,
        filename: file.originalname,
        file_path: webPath,
        file_size: file.size,
        category
      };
    });

    return res.status(201).json({ success: true, files: uploaded });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Upload failed.' });
  }
});

// ADMIN: DELETE /api/admin/media/:id
router.delete('/admin/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const item = db.prepare('SELECT * FROM media WHERE id = ?').get(id) as any;
  if (!item) {
    return res.status(404).json({ error: 'Media not found' });
  }

  // Attempt to delete physical file
  const fullPath = path.join(process.cwd(), item.file_path);
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch {
      // Ignore if already deleted
    }
  }

  db.prepare('DELETE FROM media WHERE id = ?').run(id);
  return res.json({ success: true, message: 'Media removed.' });
});

export default router;
