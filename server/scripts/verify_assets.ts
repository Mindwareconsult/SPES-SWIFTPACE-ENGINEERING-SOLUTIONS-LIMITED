import fs from 'fs';
import path from 'path';
import { db, initDatabase } from '../database/db.ts';
import { ensureAuthenticProjectsAndMedia } from '../database/seed_authentic_projects.ts';
import { BUNDLED_UPLOADS_DIR, DB_PATH, PUBLIC_DIR, UPLOAD_DIR } from '../config/paths.ts';

function resolveLocalFileForWebPath(webPath: string): string | null {
  const clean = webPath.replace(/^\/+/, '');
  if (clean.startsWith('assets/')) {
    const candidate = path.join(PUBLIC_DIR, clean);
    return fs.existsSync(candidate) ? candidate : null;
  }
  if (clean.startsWith('uploads/')) {
    const rel = clean.slice('uploads/'.length);
    const persistentCandidate = path.join(UPLOAD_DIR, rel);
    if (fs.existsSync(persistentCandidate)) return persistentCandidate;
    const bundledCandidate = path.join(BUNDLED_UPLOADS_DIR, rel);
    if (fs.existsSync(bundledCandidate)) return bundledCandidate;
    return null;
  }
  const publicCandidate = path.join(PUBLIC_DIR, clean);
  return fs.existsSync(publicCandidate) ? publicCandidate : null;
}

initDatabase();
ensureAuthenticProjectsAndMedia();

console.log('=== SPES SWIFTPACE ASSET & DATABASE INVENTORY ===');
console.log(`Database Path : ${DB_PATH}`);
console.log(`Upload Dir    : ${UPLOAD_DIR}`);
console.log(`Public Dir    : ${PUBLIC_DIR}`);
console.log('');

const projects = db.prepare('SELECT id, title, slug, cover_image, publication_status FROM projects ORDER BY id ASC').all() as Array<{
  id: number;
  title: string;
  slug: string;
  cover_image: string;
  publication_status: string;
}>;

let missingCount = 0;

for (const project of projects) {
  const coverFile = resolveLocalFileForWebPath(project.cover_image);
  const images = db
    .prepare('SELECT id, image_path FROM project_images WHERE project_id = ? ORDER BY display_order ASC')
    .all(project.id) as Array<{ id: number; image_path: string }>;

  let galleryMissing = 0;
  for (const img of images) {
    if (!resolveLocalFileForWebPath(img.image_path)) {
      galleryMissing++;
      missingCount++;
      console.error(`  [MISSING GALLERY] Project #${project.id} (${project.slug}): ${img.image_path}`);
    }
  }
  if (!coverFile) {
    missingCount++;
    console.error(`  [MISSING COVER]   Project #${project.id} (${project.slug}): ${project.cover_image}`);
  }

  console.log(
    `Project #${project.id} [${project.publication_status}] "${project.title}" | Cover: ${coverFile ? 'OK' : 'MISSING'} | Gallery: ${images.length - galleryMissing}/${images.length} OK`
  );
}

const blogs = db.prepare('SELECT id, slug, featured_image FROM blog_posts ORDER BY id ASC').all() as Array<{
  id: number;
  slug: string;
  featured_image: string;
}>;

console.log('');
for (const blog of blogs) {
  const blogImg = resolveLocalFileForWebPath(blog.featured_image);
  if (!blogImg) missingCount++;
  console.log(`Blog #${blog.id} (${blog.slug}) | Featured Image: ${blogImg ? 'OK' : 'MISSING'} (${blog.featured_image})`);
}

const mediaRow = db.prepare('SELECT COUNT(*) as count FROM media').get() as { count: number };
console.log(`\nTotal Media Records: ${mediaRow.count}`);
console.log(`Missing Files Count: ${missingCount}`);

if (missingCount > 0) {
  process.exit(1);
}
