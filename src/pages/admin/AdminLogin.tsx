import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { resolveApiUrl } from '../../utils/api';
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialSetupPending, setInitialSetupPending] = useState<boolean>(true);
  const submittingRef = useRef(false);

  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading, sessionNotice, clearSessionNotice } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Check safe auth initialization status from server
  useEffect(() => {
    fetch(resolveApiUrl('/api/admin/auth-status'))
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.initialSetupPending === 'boolean') {
          setInitialSetupPending(data.initialSetupPending);
        }
      })
      .catch(() => {
        // Non-fatal
      });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current || loading) return;

    clearSessionNotice();
    const trimmedIdentifier = usernameOrEmail.trim();

    if (!trimmedIdentifier) {
      setError('Please enter your administrator username or official email address.');
      return;
    }

    if (!password) {
      setError('Please enter your administrator password.');
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      await login(trimmedIdentifier, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040D1E] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo size="lg" />
          </div>
          <div>
            <h1 className="font-serif-luxury text-2xl font-bold text-white">
              Administrator Authentication
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Authorized personnel access to SPES Swiftpace engineering management systems.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#06152F] border border-white/10 shadow-2xl space-y-6">
          {sessionNotice && !error && (
            <div className="p-3 rounded-xl bg-sky-950/70 border border-[#12BCEB]/40 text-sky-200 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#12BCEB] flex-shrink-0 mt-0.5" />
              <span>{sessionNotice}</span>
            </div>
          )}

          {error && (
            <div role="alert" className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} noValidate className="space-y-4">
            <div>
              <label htmlFor="admin-username" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Username or Official Email
              </label>
              <input
                id="admin-username"
                name="usernameOrEmail"
                type="text"
                autoComplete="username"
                value={usernameOrEmail}
                onChange={(e) => {
                  setUsernameOrEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="spesadmin or official email"
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#12BCEB] disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter administrator password"
                  disabled={loading}
                  className="w-full px-4 py-2.5 pr-10 rounded-xl bg-[#081D43] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#12BCEB] disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] hover:from-[#0849a6] hover:to-[#22ccfb] text-white text-xs font-bold uppercase tracking-wider shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          {/* Initial Credential Notice (without exposing plaintext password in frontend JS) */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#078A43]" />
              <span>Initial Setup Credentials:</span>
            </div>
            <div>Username: <code className="text-[#12BCEB]">spesadmin</code></div>
            <div>
              Status:{' '}
              <span className="text-slate-300">
                {initialSetupPending
                  ? 'Default administrator password configured on server initialization.'
                  : 'Custom administrator password configured.'}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 pt-1">
              * Change temporary initial password immediately in Settings after first login.
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};

