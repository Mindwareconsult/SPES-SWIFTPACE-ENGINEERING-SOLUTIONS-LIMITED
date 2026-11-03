import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('spesadmin');
  const [password, setPassword] = useState('AdminSecure2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify your credentials.');
      }

      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login error occurred.');
    } finally {
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
        <div className="p-8 rounded-2xl bg-[#06152F] border border-white/10 shadow-2xl space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Username or Official Email
              </label>
              <input
                type="text"
                required
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Username or email"
                className="w-full px-4 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-xs text-white focus:outline-none focus:border-[#12BCEB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl bg-[#081D43] border border-white/10 text-xs text-white focus:outline-none focus:border-[#12BCEB]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] hover:from-[#0849a6] hover:to-[#22ccfb] text-white text-xs font-bold uppercase tracking-wider shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Verifying Access...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          {/* Initial Credential Notice */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#078A43]" />
              <span>Initial Setup Credentials:</span>
            </div>
            <div>Username: <code className="text-[#12BCEB]">spesadmin</code></div>
            <div>Default Password: <code className="text-[#12BCEB]">AdminSecure2026!</code></div>
            <div className="text-[10px] text-slate-500 pt-1">
              * Change password immediately in Settings after first login.
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
