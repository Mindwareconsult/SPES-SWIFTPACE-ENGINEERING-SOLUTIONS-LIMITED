import fs from 'fs';
import path from 'path';

export const BUNDLED_UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
export const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

export function resolveDatabasePath(): string {
  const configured = process.env.DATABASE_PATH?.trim();
  if (configured) {
    return path.resolve(configured);
  }
  return path.resolve(process.cwd(), 'data', 'spes_database.sqlite');
}

export function resolveUploadDir(): string {
  const configured = process.env.UPLOAD_DIR?.trim();
  if (configured) {
    return path.resolve(configured);
  }
  return BUNDLED_UPLOADS_DIR;
}

export function resolveJwtSecretPath(): string {
  const configured = process.env.JWT_SECRET_FILE?.trim();
  if (configured) {
    return path.resolve(configured);
  }
  return path.join(path.dirname(resolveDatabasePath()), '.jwt_secret');
}

export const DB_PATH = resolveDatabasePath();
export const UPLOAD_DIR = resolveUploadDir();

export function ensureStorageDirectories(): void {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const uploadSubdirs = ['projects', 'blog', 'attachments', 'media'];
  for (const sub of uploadSubdirs) {
    const dir = path.join(UPLOAD_DIR, sub);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

function copyMissingFilesRecursive(srcDir: string, destDir: string): number {
  if (!fs.existsSync(srcDir)) return 0;
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  let copiedCount = 0;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copiedCount += copyMissingFilesRecursive(srcPath, destPath);
    } else if (entry.isFile() && !fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
      copiedCount++;
    }
  }
  return copiedCount;
}

/**
 * Hydrate a fresh persistent upload directory (e.g., Render/Railway disk at /var/data/uploads)
 * with bundled public seed media (projects/blog/media) without ever overwriting existing uploads
 * or touching private client enquiry attachments.
 */
export function syncSeedUploadsToUploadDir(): void {
  ensureStorageDirectories();
  if (path.resolve(UPLOAD_DIR) === path.resolve(BUNDLED_UPLOADS_DIR)) {
    return;
  }

  let totalCopied = 0;
  for (const sub of ['projects', 'blog', 'media']) {
    totalCopied += copyMissingFilesRecursive(
      path.join(BUNDLED_UPLOADS_DIR, sub),
      path.join(UPLOAD_DIR, sub)
    );
  }

  if (totalCopied > 0) {
    console.log(`[SPES Storage] Hydrated ${totalCopied} seed media asset(s) to persistent upload directory: ${UPLOAD_DIR}`);
  }
}
