import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  authFetch,
  getStoredSession,
  getSessionExpiresAt,
  setCookieOnlySession,
  setFallbackBearerSession,
  verifyHttpOnlyCookieActive,
  clearStoredSession
} from '../utils/authFetch';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  must_change_password?: boolean;
  created_at?: string;
  last_login?: string;
}

interface AuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  welcomeNotification: string | null;
  sessionNotice: string | null;
  dismissWelcome: () => void;
  clearSessionNotice: () => void;
  login: (usernameOrEmail: string, password: string) => Promise<AdminUser>;
  logout: (reason?: string) => Promise<void>;
  refreshSession: () => Promise<AdminUser | null>;
  updateSessionToken: (token: string, expiresAt: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [welcomeNotification, setWelcomeNotification] = useState<string | null>(null);
  const [sessionNotice, setSessionNotice] = useState<string | null>(null);

  const refreshSession = useCallback(async (): Promise<AdminUser | null> => {
    try {
      const res = await authFetch('/api/admin/me');
      if (!res.ok) {
        setUser(null);
        return null;
      }
      const data = await res.json();
      if (data?.user) {
        setUser(data.user);
        return data.user as AdminUser;
      }
      setUser(null);
      return null;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  // Verify existing HttpOnly cookie (or iframe fallback) session on mount for admin routes
  useEffect(() => {
    const stored = getStoredSession();
    const isAdminPath = window.location.pathname.startsWith('/admin');

    if (stored || isAdminPath) {
      refreshSession().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [refreshSession]);

  // Listen for session expiration events from authFetch
  useEffect(() => {
    const handleExpired = () => {
      clearStoredSession();
      setUser(null);
      setWelcomeNotification(null);
      setSessionNotice('Your administrator session has expired or been terminated. Please sign in again.');
    };

    window.addEventListener('spes:session-expired', handleExpired);
    return () => window.removeEventListener('spes:session-expired', handleExpired);
  }, []);

  // Periodic expiration check every 30 seconds while logged in
  useEffect(() => {
    if (!user) return;
    const interval = window.setInterval(() => {
      const expiresAt = getSessionExpiresAt();
      if (expiresAt && Date.now() >= expiresAt) {
        clearStoredSession();
        setUser(null);
        setWelcomeNotification(null);
        setSessionNotice('Your session has expired. Please authenticate again.');
      }
    }, 30000);

    return () => window.clearInterval(interval);
  }, [user]);

  const applyAuthenticatedToken = useCallback(async (token?: string, expiresAt?: number) => {
    const expiry = typeof expiresAt === 'number' ? expiresAt : Date.now() + 24 * 60 * 60 * 1000;
    const cookieWorks = await verifyHttpOnlyCookieActive();
    if (cookieWorks) {
      // Standard secure mode: rely exclusively on HttpOnly cookie with zero JS-readable token storage
      setCookieOnlySession(expiry);
    } else if (token) {
      // Fallback only when embedded iframe blocks third-party cookies
      setFallbackBearerSession(token, expiry);
    }
  }, []);

  const login = useCallback(async (usernameOrEmail: string, password: string): Promise<AdminUser> => {
    setSessionNotice(null);

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include',
      body: JSON.stringify({ usernameOrEmail, password })
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      throw new Error('Unexpected response from authentication server.');
    }

    if (!res.ok) {
      throw new Error(data?.error || 'Authentication failed. Please verify your credentials.');
    }

    await applyAuthenticatedToken(data?.token, data?.expiresAt);

    const loggedInUser: AdminUser = data.user;
    setUser(loggedInUser);
    setWelcomeNotification(
      `Welcome back, ${loggedInUser.username}. Your SPES Swiftpace administrative session is now active.`
    );

    return loggedInUser;
  }, [applyAuthenticatedToken]);

  const logout = useCallback(async (reason?: string) => {
    try {
      await authFetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // Clear local session regardless of network outcome
    } finally {
      clearStoredSession();
      setUser(null);
      setWelcomeNotification(null);
      if (reason) {
        setSessionNotice(reason);
      } else {
        setSessionNotice('You have been securely logged out.');
      }
    }
  }, []);

  const updateSessionToken = useCallback(async (token: string, expiresAt: number) => {
    await applyAuthenticatedToken(token, expiresAt);
  }, [applyAuthenticatedToken]);

  const dismissWelcome = useCallback(() => setWelcomeNotification(null), []);
  const clearSessionNotice = useCallback(() => setSessionNotice(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        welcomeNotification,
        sessionNotice,
        dismissWelcome,
        clearSessionNotice,
        login,
        logout,
        refreshSession,
        updateSessionToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
