import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { createServer as createViteServer } from 'vite';
import { initDatabase } from './server/database/db';
import { ensureAuthenticProjectsAndMedia } from './server/database/seed_authentic_projects';
import { authenticateAdmin } from './server/middleware/auth';
import authRoutes from './server/routes/auth';
import projectsRoutes from './server/routes/projects';
import blogRoutes from './server/routes/blog';
import enquiriesRoutes from './server/routes/enquiries';
import mediaRoutes from './server/routes/media';
import settingsRoutes from './server/routes/settings';
import dashboardRoutes from './server/routes/dashboard';

async function startServer() {
  // Initialize SQLite database and ensure authentic projects and media assets
  initDatabase();
  ensureAuthenticProjectsAndMedia();

  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  const PORT = parseInt(process.env.PORT || '3000', 10);

  // Security headers compatible with embedded preview & production TLS
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));
  app.use(cookieParser());

  // Protected static directory for confidential client enquiry attachments
  const uploadsPath = path.join(process.cwd(), 'uploads');
  app.use('/uploads/attachments', authenticateAdmin, express.static(path.join(uploadsPath, 'attachments')));

  // Public static directories for published project, blog, and media images
  app.use('/uploads', express.static(uploadsPath));

  // Static directory for local public assets (including official logos & references)
  app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets')));

  // API Routes
  app.use('/api/admin', authRoutes);
  app.use('/api/projects', projectsRoutes);
  app.use('/api/blog', blogRoutes);
  app.use('/api/enquiries', enquiriesRoutes);
  app.use('/api/media', mediaRoutes);
  app.use('/api/settings', settingsRoutes);
  app.use('/api/admin', dashboardRoutes);

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      company: 'SPES Swiftpace Engineering Solutions Limited',
      rc: 'RC:8978524',
      uptime: process.uptime()
    });
  });

  // Vite development middleware or static production serving
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SPES] Swiftpace Engineering Solutions server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[SPES] Failed to start server:', err);
  process.exit(1);
});
