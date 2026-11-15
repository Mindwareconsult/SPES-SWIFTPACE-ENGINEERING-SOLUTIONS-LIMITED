import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { initDatabase } from './server/database/db.ts';
import { ensureAuthenticProjectsAndMedia } from './server/database/seed_authentic_projects.ts';
import { authenticateAdmin } from './server/middleware/auth.ts';
import authRoutes from './server/routes/auth.ts';
import projectsRoutes from './server/routes/projects.ts';
import blogRoutes from './server/routes/blog.ts';
import enquiriesRoutes from './server/routes/enquiries.ts';
import mediaRoutes from './server/routes/media.ts';
import settingsRoutes from './server/routes/settings.ts';
import dashboardRoutes from './server/routes/dashboard.ts';

function resolvePort(): number {
  const portFlagIndex = process.argv.indexOf('--port');
  const cliPort = portFlagIndex !== -1 ? process.argv[portFlagIndex + 1] : undefined;
  const parsed = parseInt(cliPort || process.env.PORT || '3000', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3000;
}

async function startServer() {
  // Initialize SQLite database and ensure authentic projects and media assets
  initDatabase();
  ensureAuthenticProjectsAndMedia();

  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  const PORT = resolvePort();

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

  // Ensure unmatched or errored /api/* requests always return JSON rather than SPA HTML
  app.all('/api/*', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found.' });
  });

  app.use('/api', (err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status =
      typeof err?.status === 'number'
        ? err.status
        : typeof err?.statusCode === 'number'
          ? err.statusCode
          : 500;
    console.error('[SPES API Error]', err);
    res.status(status).json({ error: err?.message || 'An unexpected server error occurred.' });
  });

  // Vite development middleware or static production serving
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
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
