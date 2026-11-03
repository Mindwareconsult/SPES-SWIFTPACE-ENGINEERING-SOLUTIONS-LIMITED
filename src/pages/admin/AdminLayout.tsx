import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
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
  Lock,
  UserCheck
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if authenticated
    fetch('/api/admin/me')
      .then((res) => {
        if (!res.ok) throw new Error('Unauthenticated');
        return res.json();
      })
      .then((data) => {
        setAdminUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        navigate('/admin/login');
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040D1E] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#12BCEB] border-t-transparent animate-spin" />
          <span className="text-xs text-slate-400">Authenticating SPES Secure Portal...</span>
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
              <div className="text-xs font-bold text-white truncate">{adminUser?.username || 'spesadmin'}</div>
              <div className="text-[10px] text-slate-400 truncate">{adminUser?.email}</div>
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
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-[11px] text-red-300 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-[#040D1E] p-4 sm:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
