import bcrypt from 'bcryptjs';
import { db, initDatabase } from '../database/db';

const newPassword = process.argv[2];

if (!newPassword || newPassword.length < 8) {
  console.error('Usage: npx tsx server/scripts/reset_admin.ts <new-password-min-8-chars>');
  process.exit(1);
}

initDatabase();

const admin = db.prepare('SELECT id, username, token_version FROM admins ORDER BY id ASC LIMIT 1').get() as
  | { id: number; username: string; token_version: number }
  | undefined;

if (!admin) {
  console.error('No administrator record found in database.');
  process.exit(1);
}

const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(12));
db.prepare(`
  UPDATE admins
  SET password_hash = ?, must_change_password = 0, failed_attempts = 0, locked_until = NULL,
      token_version = ?, updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
`).run(hash, (admin.token_version || 1) + 1, admin.id);

console.log(`Password securely reset for administrator "${admin.username}". All previous sessions invalidated.`);
