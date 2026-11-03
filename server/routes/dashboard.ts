import { Router } from 'express';
import { db } from '../database/db';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// ADMIN: GET /api/admin/dashboard-stats
router.get('/dashboard-stats', authenticateAdmin, (_req, res) => {
  const totalProjects = (db.prepare('SELECT COUNT(*) as count FROM projects').get() as any).count;
  const publishedProjects = (db.prepare("SELECT COUNT(*) as count FROM projects WHERE publication_status = 'published'").get() as any).count;
  const draftProjects = (db.prepare("SELECT COUNT(*) as count FROM projects WHERE publication_status != 'published'").get() as any).count;

  const totalArticles = (db.prepare('SELECT COUNT(*) as count FROM blog_posts').get() as any).count;
  const publishedArticles = (db.prepare("SELECT COUNT(*) as count FROM blog_posts WHERE publication_status = 'published'").get() as any).count;
  const draftArticles = (db.prepare("SELECT COUNT(*) as count FROM blog_posts WHERE publication_status != 'published'").get() as any).count;

  const totalEnquiries = (db.prepare('SELECT COUNT(*) as count FROM enquiries').get() as any).count;
  const newEnquiries = (db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE enquiry_status = 'New'").get() as any).count;

  const recentEnquiries = db.prepare(`
    SELECT id, full_name, company_name, email, phone, service_required, enquiry_status, created_at
    FROM enquiries
    ORDER BY created_at DESC
    LIMIT 6
  `).all();

  const recentProjects = db.prepare(`
    SELECT id, title, category, publication_status, created_at
    FROM projects
    ORDER BY created_at DESC
    LIMIT 5
  `).all();

  return res.json({
    metrics: {
      totalProjects,
      publishedProjects,
      draftProjects,
      totalArticles,
      publishedArticles,
      draftArticles,
      totalEnquiries,
      newEnquiries
    },
    recentEnquiries,
    recentProjects
  });
});

export default router;
