import { Router } from 'express';
import { db } from '../database/db';
import { authenticateAdmin } from '../middleware/auth';

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

// PUBLIC: GET /api/blog/categories
router.get('/categories', (_req, res) => {
  const categories = db.prepare(`
    SELECT bc.*, COUNT(bp.id) as post_count
    FROM blog_categories bc
    LEFT JOIN blog_posts bp ON bc.name = bp.category_name AND bp.publication_status = 'published'
    GROUP BY bc.id
    ORDER BY bc.name ASC
  `).all();
  return res.json({ categories });
});

// PUBLIC: GET /api/blog
router.get('/', (req, res) => {
  const { category, search, limit = 20, page = 1 } = req.query;
  const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit as string, 10) || 20);
  const offset = (pageNum - 1) * limitNum;

  let query = 'SELECT * FROM blog_posts WHERE publication_status = ?';
  const params: any[] = ['published'];

  if (category && category !== 'All Articles' && category !== 'all') {
    query += ' AND category_name = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  // Count total matching
  const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as count');
  const countRow = db.prepare(countQuery).get(...params) as { count: number };

  query += ' ORDER BY published_at DESC LIMIT ? OFFSET ?';
  params.push(limitNum, offset);

  const posts = db.prepare(query).all(...params);

  return res.json({
    posts,
    total: countRow.count,
    page: pageNum,
    totalPages: Math.ceil(countRow.count / limitNum)
  });
});

// PUBLIC: GET /api/blog/:slug
router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const post = db.prepare("SELECT * FROM blog_posts WHERE slug = ? AND publication_status = 'published'").get(slug) as any;

  if (!post) {
    return res.status(404).json({ error: 'Article not found' });
  }

  // Related articles
  const related = db.prepare(`
    SELECT id, title, slug, category_name, featured_image, published_at, excerpt
    FROM blog_posts
    WHERE id != ? AND publication_status = 'published'
    ORDER BY published_at DESC
    LIMIT 3
  `).all(post.id);

  return res.json({ post, related });
});

// ADMIN: GET /api/admin/blog/all
router.get('/admin/all', authenticateAdmin, (_req, res) => {
  const posts = db.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all();
  return res.json({ posts });
});

// ADMIN: GET /api/admin/blog/:id
router.get('/admin/:id', authenticateAdmin, (req, res) => {
  const post = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  return res.json({ post });
});

// ADMIN: POST /api/admin/blog
router.post('/admin', authenticateAdmin, (req, res) => {
  const {
    title,
    category_name,
    excerpt,
    content,
    featured_image,
    author,
    publication_status,
    seo_title,
    meta_description
  } = req.body;

  if (!title || !category_name || !excerpt || !content || !featured_image) {
    return res.status(400).json({ error: 'Title, category, excerpt, content, and featured image are required.' });
  }

  let slug = slugify(title);
  let counter = 1;
  const originalSlug = slug;
  while (db.prepare('SELECT id FROM blog_posts WHERE slug = ?').get(slug)) {
    slug = `${originalSlug}-${counter++}`;
  }

  const insert = db.prepare(`
    INSERT INTO blog_posts (
      title, slug, category_name, excerpt, content, featured_image,
      author, publication_status, published_at, seo_title, meta_description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)
  `);

  const info = insert.run(
    title,
    slug,
    category_name,
    excerpt,
    content,
    featured_image,
    author || 'SPES Engineering Directorate',
    publication_status || 'published',
    seo_title || title,
    meta_description || excerpt
  );

  return res.status(201).json({ success: true, id: info.lastInsertRowid, slug });
});

// ADMIN: PUT /api/admin/blog/:id
router.put('/admin/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const {
    title,
    category_name,
    excerpt,
    content,
    featured_image,
    author,
    publication_status,
    seo_title,
    meta_description
  } = req.body;

  const existing = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id) as any;
  if (!existing) {
    return res.status(404).json({ error: 'Article not found' });
  }

  db.prepare(`
    UPDATE blog_posts SET
      title = ?,
      category_name = ?,
      excerpt = ?,
      content = ?,
      featured_image = ?,
      author = ?,
      publication_status = ?,
      seo_title = ?,
      meta_description = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    title || existing.title,
    category_name || existing.category_name,
    excerpt || existing.excerpt,
    content || existing.content,
    featured_image || existing.featured_image,
    author || existing.author,
    publication_status || existing.publication_status,
    seo_title !== undefined ? seo_title : existing.seo_title,
    meta_description !== undefined ? meta_description : existing.meta_description,
    id
  );

  return res.json({ success: true, message: 'Article updated successfully' });
});

// ADMIN: DELETE /api/admin/blog/:id
router.delete('/admin/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM blog_posts WHERE id = ?').run(id);
  return res.json({ success: true, message: 'Article deleted successfully' });
});

export default router;
