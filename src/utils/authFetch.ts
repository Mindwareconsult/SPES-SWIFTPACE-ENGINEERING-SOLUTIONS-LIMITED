export interface StoredAuthSession {
  token: string;
  expiresAt: number;
}

const LEGACY_LOCAL_STORAGE_KEY = 'spes_admin_session';
const IFRAME_SESSION_KEY = 'spes_admin_iframe_session';
let memorySession: StoredAuthSession | null = null;
let sessionExpiryMeta: number | null = null;

function isEmbeddedIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

// Proactively remove any legacy localStorage token from prior versions (XSS mitigation)
try {
  window.localStorage.removeItem(LEGACY_LOCAL_STORAGE_KEY);
} catch {
  // Ignore storage access restrictions
}

export function getStoredSession(): StoredAuthSession | null {
  if (memorySession) {
    if (memorySession.expiresAt && Date.now() >= memorySession.expiresAt) {
      clearStoredSession();
      return null;
    }
    return memorySession;
  }

  // Only allow tab-scoped sessionStorage fallback when running inside a cross-site iframe
  // where browsers block third-party HttpOnly cookies. Never read/write localStorage.
  if (isEmbeddedIframe()) {
    try {
      const raw = window.sessionStorage.getItem(IFRAME_SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredAuthSession;
        if (parsed?.token && (!parsed.expiresAt || Date.now() < parsed.expiresAt)) {
          memorySession = parsed;
          return parsed;
        }
        window.sessionStorage.removeItem(IFRAME_SESSION_KEY);
      }
    } catch {
      // Ignore storage access errors
    }
  }

  return null;
}

export function getSessionExpiresAt(): number | null {
  if (memorySession?.expiresAt) return memorySession.expiresAt;
  return sessionExpiryMeta;
}

export function setCookieOnlySession(expiresAt?: number): void {
  memorySession = null;
  sessionExpiryMeta = typeof expiresAt === 'number' ? expiresAt : null;
  try {
    window.localStorage.removeItem(LEGACY_LOCAL_STORAGE_KEY);
    window.sessionStorage.removeItem(IFRAME_SESSION_KEY);
  } catch {
    // Ignore storage errors
  }
}

export function setFallbackBearerSession(token: string, expiresAt: number): void {
  const session: StoredAuthSession = { token, expiresAt };
  memorySession = session;
  sessionExpiryMeta = expiresAt;

  try {
    window.localStorage.removeItem(LEGACY_LOCAL_STORAGE_KEY);
  } catch {
    // Ignore
  }

  if (isEmbeddedIframe()) {
    try {
      window.sessionStorage.setItem(IFRAME_SESSION_KEY, JSON.stringify(session));
    } catch {
      // Fallback to memorySession only
    }
  }
}

export function clearStoredSession(): void {
  memorySession = null;
  sessionExpiryMeta = null;
  try {
    window.localStorage.removeItem(LEGACY_LOCAL_STORAGE_KEY);
    window.sessionStorage.removeItem(IFRAME_SESSION_KEY);
  } catch {
    // Ignore storage errors
  }
}

export async function verifyHttpOnlyCookieActive(): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/me', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include'
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const session = getStoredSession();
  const headers = new Headers(init.headers || {});

  if (session?.token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${session.token}`);
  }

  if (!headers.has('X-Requested-With')) {
    headers.set('X-Requested-With', 'XMLHttpRequest');
  }

  const response = await fetch(input, {
    ...init,
    headers,
    credentials: 'include'
  });

  if (response.status === 401) {
    const hadSession = Boolean(session || sessionExpiryMeta);
    clearStoredSession();
    if (hadSession || window.location.pathname.startsWith('/admin')) {
      window.dispatchEvent(new CustomEvent('spes:session-expired'));
    }
  }

  return response;
}
