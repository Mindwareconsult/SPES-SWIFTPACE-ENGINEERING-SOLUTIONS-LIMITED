const RAW_API_BASE = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');

export const FALLBACK_PROJECT_IMAGE =
  '/assets/projects/commercial-column-shoring/commercial-column-shoring-01.jpg';
export const FALLBACK_LOGO_IMAGE = '/assets/spes_logo.jpeg';

export function getApiBaseUrl(): string {
  return RAW_API_BASE;
}

export function isCrossOriginApi(): boolean {
  if (!RAW_API_BASE || typeof window === 'undefined') return false;
  try {
    return new URL(RAW_API_BASE).origin !== window.location.origin;
  } catch {
    return false;
  }
}

export function resolveApiUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return pathOrUrl;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const normalized = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  if (!RAW_API_BASE) return normalized;
  if (normalized.startsWith('/api/') || normalized.startsWith('/uploads/')) {
    return `${RAW_API_BASE}${normalized}`;
  }
  return normalized;
}

export function resolveMediaUrl(src?: string | null, fallback: string = FALLBACK_PROJECT_IMAGE): string {
  if (!src || typeof src !== 'string') return fallback;
  let trimmed = src.trim();
  if (!trimmed) return fallback;

  if (/^(https?:\/\/|data:|blob:)/i.test(trimmed)) {
    return trimmed;
  }

  // Normalize missing leading slash and collapse duplicate slashes or repeated upload prefixes
  trimmed = trimmed.replace(/^\/+/, '/');
  if (!trimmed.startsWith('/')) {
    trimmed = `/${trimmed}`;
  }
  trimmed = trimmed.replace(/\/{2,}/g, '/').replace(/^(\/uploads)+/i, '/uploads');

  if (trimmed === '/uploads' || trimmed === '/uploads/') {
    return fallback;
  }

  if (RAW_API_BASE && trimmed.startsWith('/uploads/')) {
    return `${RAW_API_BASE}${trimmed}`;
  }

  return trimmed;
}

export function applyImageFallback(
  e: React.SyntheticEvent<HTMLImageElement>,
  fallback: string = FALLBACK_PROJECT_IMAGE
): void {
  const img = e.currentTarget;
  if (img.dataset.fallbackApplied === '1') return;
  img.dataset.fallbackApplied = '1';
  img.src = fallback;
}
