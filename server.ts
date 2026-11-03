import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { createServer as createViteServer } from 'vite';
import { initDatabase } from './server/database/db';
import authRoutes from './server/routes/auth';
import projectsRoutes from './server/routes/projects';
import blogRoutes from './server/routes/blog';
import enquiriesRoutes from './server/routes/enquiries';
import mediaRoutes from './server/routes/media';
import settingsRoutes from './server/routes/settings';
import dashboardRoutes from './server/routes/dashboard';

async function startServer() {
  // Initialize SQLite database and seed initial tables/data
  initDatabase();

  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));
  app.use(cookieParser());

  // Static directory for file uploads
  const uploadsPath = path.join(process.cwd(), 'uploads');
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
