import { Router } from 'express';
import { db } from '../database/db.ts';
import { authenticateAdmin } from '../middleware/auth.ts';

const router = Router();

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// PUBLIC: GET /api/projects
router.get('/', (req, res) => {
  const { category, featured } = req.query;
  let query = 'SELECT * FROM projects WHERE publication_status = ?';
  const params: any[] = ['published'];

  if (category && category !== 'All Projects' && category !== 'all') {
    if (category === 'Civil Engineering' || category === 'Structural Engineering') {
      query += " AND (category LIKE ? OR category = 'Civil & Structural Engineering')";
      params.push(`%${category}%`);
    } else {
      query += ' AND category LIKE ?';
      params.push(`%${category}%`);
    }
  }

  if (featured === 'true' || featured === '1') {
    query += ' AND featured = 1';
  }

  query += ' ORDER BY featured DESC, created_at DESC, id ASC';

  const projects = db.prepare(query).all(...params);
  return res.json({ projects });
});

// PUBLIC: GET /api/projects/:slug
router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const project = db.prepare("SELECT * FROM projects WHERE slug = ? AND publication_status = 'published'").get(slug) as any;

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  // Fetch gallery images
  const images = db.prepare('SELECT * FROM project_images WHERE project_id = ? ORDER BY display_order ASC').all(project.id);
  
  // Fetch related projects
  const related = db.prepare(`
    SELECT id, title, slug, category, cover_image, location, short_description 
    FROM projects 
    WHERE id != ? AND publication_status = 'published'
    LIMIT 3
  `).all(project.id);

  return res.json({ project, images, related });
});

// ADMIN: GET /api/admin/projects (all)
router.get('/admin/all', authenticateAdmin, (_req, res) => {
  const projects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
  return res.json({ projects });
});

// ADMIN: GET /api/admin/projects/:id
router.get('/admin/:id', authenticateAdmin, (req, res) => {
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id) as any;
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  const images = db.prepare('SELECT * FROM project_images WHERE project_id = ? ORDER BY display_order ASC').all(project.id);
  return res.json({ project, images });
});

// ADMIN: POST /api/admin/projects
router.post('/admin', authenticateAdmin, (req, res) => {
  const {
    title,
    category,
    location,
    client,
    project_status,
    completion_date,
    short_description,
    overview,
    objectives,
    scope_of_work,
    technical_approach,
    project_outcome,
    cover_image,
    featured,
    publication_status,
    seo_title,
    meta_description,
    gallery_images
  } = req.body;

  if (!title || !category || !short_description || !cover_image) {
    return res.status(400).json({ error: 'Title, category, short description, and cover image are required.' });
  }

  let slug = slugify(title);
  // Ensure unique slug
  let counter = 1;
  const originalSlug = slug;
  while (db.prepare('SELECT id FROM projects WHERE slug = ?').get(slug)) {
    slug = `${originalSlug}-${counter++}`;
  }

  const insert = db.prepare(`
    INSERT INTO projects (
      title, slug, category, location, client, project_status, completion_date,
      short_description, overview, objectives, scope_of_work, technical_approach,
      project_outcome, cover_image, featured, publication_status, seo_title, meta_description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const info = insert.run(
    title,
    slug,
    category,
    location || '',
    client || '',
    project_status || 'Completed',
    completion_date || '',
    short_description,
    overview || '',
    objectives || '',
    scope_of_work || '',
    technical_approach || '',
    project_outcome || '',
    cover_image,
    featured ? 1 : 0,
    publication_status || 'published',
    seo_title || title,
    meta_description || short_description
  );

  const projectId = info.lastInsertRowid;

  // Insert gallery images if provided
  if (Array.isArray(gallery_images)) {
    const insertImage = db.prepare(`
      INSERT INTO project_images (project_id, image_path, image_caption, display_order)
      VALUES (?, ?, ?, ?)
    `);
    gallery_images.forEach((img: any, idx: number) => {
      const path = typeof img === 'string' ? img : img.image_path;
      const caption = typeof img === 'object' ? img.image_caption || '' : '';
      if (path) {
        insertImage.run(projectId, path, caption, idx);
      }
    });
  }

  return res.status(201).json({ success: true, id: projectId, slug });
});

// ADMIN: PUT /api/admin/projects/:id
router.put('/admin/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const {
    title,
    category,
    location,
    client,
    project_status,
    completion_date,
    short_description,
    overview,
    objectives,
    scope_of_work,
    technical_approach,
    project_outcome,
    cover_image,
    featured,
    publication_status,
    seo_title,
    meta_description,
    gallery_images
  } = req.body;

  const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as any;
  if (!existing) {
    return res.status(404).json({ error: 'Project not found' });
  }

  db.prepare(`
    UPDATE projects SET
      title = ?,
      category = ?,
      location = ?,
      client = ?,
      project_status = ?,
      completion_date = ?,
      short_description = ?,
      overview = ?,
      objectives = ?,
      scope_of_work = ?,
      technical_approach = ?,
      project_outcome = ?,
      cover_image = ?,
      featured = ?,
      publication_status = ?,
      seo_title = ?,
      meta_description = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    title || existing.title,
    category || existing.category,
    location !== undefined ? location : existing.location,
    client !== undefined ? client : existing.client,
    project_status || existing.project_status,
    completion_date !== undefined ? completion_date : existing.completion_date,
    short_description || existing.short_description,
    overview !== undefined ? overview : existing.overview,
    objectives !== undefined ? objectives : existing.objectives,
    scope_of_work !== undefined ? scope_of_work : existing.scope_of_work,
    technical_approach !== undefined ? technical_approach : existing.technical_approach,
    project_outcome !== undefined ? project_outcome : existing.project_outcome,
    cover_image || existing.cover_image,
    featured !== undefined ? (featured ? 1 : 0) : existing.featured,
    publication_status || existing.publication_status,
    seo_title !== undefined ? seo_title : existing.seo_title,
    meta_description !== undefined ? meta_description : existing.meta_description,
    id
  );

  // Update gallery if array provided
  if (Array.isArray(gallery_images)) {
    db.prepare('DELETE FROM project_images WHERE project_id = ?').run(id);
    const insertImage = db.prepare(`
      INSERT INTO project_images (project_id, image_path, image_caption, display_order)
      VALUES (?, ?, ?, ?)
    `);
    gallery_images.forEach((img: any, idx: number) => {
      const path = typeof img === 'string' ? img : img.image_path;
      const caption = typeof img === 'object' ? img.image_caption || '' : '';
      if (path) {
        insertImage.run(id, path, caption, idx);
      }
    });
  }

  return res.json({ success: true, message: 'Project updated successfully' });
});

// ADMIN: DELETE /api/admin/projects/:id
router.delete('/admin/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM projects WHERE id = ?').run(id);
  return res.json({ success: true, message: 'Project deleted successfully' });
});

export default router;
