import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { db, initDatabase } from './server/database/db.ts';
import { ensureAuthenticProjectsAndMedia } from './server/database/seed_authentic_projects.ts';
import { authenticateAdmin, isAllowedOrigin } from './server/middleware/auth.ts';
import { BUNDLED_UPLOADS_DIR, PUBLIC_DIR, UPLOAD_DIR } from './server/config/paths.ts';
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
  const trustProxyHops = parseInt(process.env.TRUST_PROXY_HOPS || '2', 10);
  app.set('trust proxy', Number.isFinite(trustProxyHops) ? trustProxyHops : 2);
  const PORT = resolvePort();

  // Security headers compatible with embedded preview, Vercel proxy, and TLS
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  // Strict origin-allowlisted CORS for cross-origin Vercel Preview/Frontend -> Express backend calls
  app.use((req, res, next) => {
    const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined;
    if (origin && isAllowedOrigin(origin, req)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      if (req.method === 'OPTIONS') {
        return res.status(204).end();
      }
    }
    next();
  });

  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));
  app.use(cookieParser());

  // Protected static directory for confidential client enquiry attachments (NEVER expose publicly)
  app.use(
    '/uploads/attachments',
    authenticateAdmin,
    express.static(path.join(UPLOAD_DIR, 'attachments'), {
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'private, no-store');
      }
    })
  );

  // Public static directories for published project, blog, and media images
  app.use(
    '/uploads',
    express.static(UPLOAD_DIR, {
      maxAge: '1d'
    })
  );
  if (path.resolve(UPLOAD_DIR) !== path.resolve(BUNDLED_UPLOADS_DIR)) {
    app.use('/uploads/projects', express.static(path.join(BUNDLED_UPLOADS_DIR, 'projects'), { maxAge: '1d' }));
    app.use('/uploads/blog', express.static(path.join(BUNDLED_UPLOADS_DIR, 'blog'), { maxAge: '1d' }));
    app.use('/uploads/media', express.static(path.join(BUNDLED_UPLOADS_DIR, 'media'), { maxAge: '1d' }));
  }

  // Static directory for local public assets (including official logos & references)
  app.use('/assets', express.static(path.join(PUBLIC_DIR, 'assets'), { maxAge: '7d' }));

  // API Routes
  app.use('/api/admin', authRoutes);
  app.use('/api/projects', projectsRoutes);
  app.use('/api/blog', blogRoutes);
  app.use('/api/enquiries', enquiriesRoutes);
  app.use('/api/media', mediaRoutes);
  app.use('/api/settings', settingsRoutes);
  app.use('/api/admin', dashboardRoutes);

  // Health & DB readiness check endpoint
  app.get('/api/health', (_req, res) => {
    try {
      const row = db
        .prepare("SELECT COUNT(*) as count FROM projects WHERE publication_status = 'published'")
        .get() as { count: number };
      res.json({
        status: 'ok',
        database: 'connected',
        publishedProjects: row.count,
        company: 'SPES Swiftpace Engineering Solutions Limited',
        rc: 'RC:8978524',
        uptime: process.uptime()
      });
    } catch {
      res.status(503).json({
        status: 'error',
        database: 'unavailable'
      });
    }
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
