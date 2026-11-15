import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  Inbox, 
  Image, 
  Settings, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  UserCheck,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, welcomeNotification, dismissWelcome, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  if (loading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#040D1E] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#12BCEB] border-t-transparent animate-spin" />
          <span className="text-xs text-slate-400">Verifying SPES Secure Portal Session...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects & Portfolio', path: '/admin/projects', icon: FolderKanban },
    { name: 'Engineering Blog', path: '/admin/blog', icon: FileText },
    { name: 'Client Enquiries', path: '/admin/enquiries', icon: Inbox },
    { name: 'Media Asset Library', path: '/admin/media', icon: Image },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings }
  ];

  const isActive = (p: string) => location.pathname === p || location.pathname.startsWith(`${p}/`);

  return (
    <div className="min-h-screen bg-[#040D1E] text-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#06152F] border-b border-white/10">
        <BrandLogo size="sm" showSubtitle={false} />
        <button
          onClick={() => setMobileSidebar(!mobileSidebar)}
          aria-label="Toggle admin navigation"
          className="p-2 rounded-lg bg-white/5 text-slate-200"
        >
          {mobileSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#06152F] border-r border-white/10 p-5 flex flex-col justify-between z-40 transition-transform duration-200 ${
          mobileSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Logo */}
          <div className="pb-4 border-b border-white/10">
            <BrandLogo size="sm" />
            <div className="mt-2 text-[10px] uppercase font-mono tracking-wider text-[#12BCEB]">
              Integrated Control Console
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebar(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#082657] text-[#12BCEB] border border-[#12BCEB]/30 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-xs">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user.username}</div>
              <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-[11px] text-red-300 transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-[#040D1E] p-4 sm:p-8 overflow-y-auto space-y-6">
        {welcomeNotification && (
          <div
            role="status"
            className="flex items-center justify-between gap-4 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-100 text-xs shadow-lg"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-medium">{welcomeNotification}</span>
            </div>
            <button
              onClick={dismissWelcome}
              aria-label="Dismiss welcome notification"
              className="text-emerald-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {user.must_change_password && location.pathname !== '/admin/settings' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-100 text-xs shadow-lg">
            <div className="flex items-start sm:items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong>Security Action Required:</strong> You are currently using the initial administrator password. Please update your password in Settings.
              </span>
            </div>
            <Link
              to="/admin/settings#security"
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 font-bold whitespace-nowrap self-start sm:self-auto transition-colors"
            >
              Update Password →
            </Link>
          </div>
        )}

        <Outlet />
      </main>
    </div>
  );
};

