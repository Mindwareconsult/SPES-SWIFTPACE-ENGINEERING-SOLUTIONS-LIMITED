import { Router } from 'express';
import { db } from '../database/db';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// PUBLIC: GET /api/settings
router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT setting_key, setting_value FROM website_settings').all() as any[];
  const settings: Record<string, string> = {};
  for (const r of rows) {
    settings[r.setting_key] = r.setting_value;
  }
  return res.json({ settings });
});

// ADMIN: PUT /api/admin/settings
router.put('/admin', authenticateAdmin, (req, res) => {
  const settings = req.body;
  if (!settings || typeof settings !== 'object') {
    return res.status(400).json({ error: 'Invalid settings payload.' });
  }

  const upsert = db.prepare(`
    INSERT INTO website_settings (setting_key, setting_value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(setting_key) DO UPDATE SET
      setting_value = excluded.setting_value,
      updated_at = CURRENT_TIMESTAMP
  `);

  const runMany = db.transaction((entries: [string, any][]) => {
    for (const [key, value] of entries) {
      if (typeof value === 'string' || typeof value === 'number') {
        upsert.run(key, String(value));
      }
    }
  });

  runMany(Object.entries(settings));

  return res.json({ success: true, message: 'Settings successfully updated.' });
});

export default router;
