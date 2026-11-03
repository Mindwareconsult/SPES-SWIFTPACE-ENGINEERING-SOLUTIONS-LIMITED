import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  FileText, 
  Inbox, 
  Image, 
  Plus, 
  ArrowRight, 
  Eye, 
  AlertCircle,
  Clock,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard-stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data.metrics);
        setRecentEnquiries(data.recentEnquiries || []);
        setRecentProjects(data.recentProjects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-[#12BCEB] border-t-transparent animate-spin" />
      </div>
    );
  }

  const metricCards = [
    { label: 'Total Enquiries', value: stats?.totalEnquiries || 0, sub: `${stats?.newEnquiries || 0} New`, icon: Inbox, color: 'text-amber-400', link: '/admin/enquiries' },
    { label: 'Published Projects', value: stats?.publishedProjects || 0, sub: `${stats?.draftProjects || 0} Drafts`, icon: FolderKanban, color: 'text-[#12BCEB]', link: '/admin/projects' },
    { label: 'Published Articles', value: stats?.publishedArticles || 0, sub: `${stats?.draftArticles || 0} Drafts`, icon: FileText, color: 'text-[#078A43]', link: '/admin/blog' },
    { label: 'Total Projects', value: stats?.totalProjects || 0, sub: 'In database', icon: FolderKanban, color: 'text-sky-400', link: '/admin/projects' }
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Executive Engineering Overview
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time management console for SPES Swiftpace Engineering Solutions Limited (RC: 8978524).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#063B85] hover:bg-[#0849a6] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </Link>

          <Link
            to="/admin/blog"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Article</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricCards.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Link
              key={idx}
              to={m.link}
              className="p-5 rounded-2xl bg-[#06152F] border border-white/10 hover:border-[#12BCEB]/40 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{m.label}</span>
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <div className="text-3xl font-bold font-serif-luxury text-white">
                {m.value}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-white/5">
                <span>{m.sub}</span>
                <span className="text-[#12BCEB] group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Recent Enquiries & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Enquiries (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#06152F] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm text-white">Recent Client Inquiries</h3>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs text-[#12BCEB] hover:underline font-semibold"
            >
              View All Inquiries →
            </Link>
          </div>

          {recentEnquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-slate-400">
                    <th className="py-2.5">Client Name</th>
                    <th className="py-2.5">Service Requested</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5">Date</th>
                    <th className="py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 font-semibold text-white">
                        <div>{enq.full_name}</div>
                        {enq.company_name && (
                          <div className="text-[10px] text-slate-400">{enq.company_name}</div>
                        )}
                      </td>
                      <td className="py-3 text-slate-300">{enq.service_required}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          enq.enquiry_status === 'New'
                            ? 'bg-amber-950 text-amber-300 border border-amber-600/30'
                            : enq.enquiry_status === 'Converted'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/30'
                            : 'bg-white/5 text-slate-300'
                        }`}>
                          {enq.enquiry_status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400 font-mono text-[11px]">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          to="/admin/enquiries"
                          className="text-[#12BCEB] hover:text-white font-semibold text-[11px]"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-6 text-center">No inquiries logged yet.</p>
          )}
        </div>

        {/* Recent Projects Activity (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#06152F] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-[#12BCEB]" />
              <h3 className="font-bold text-sm text-white">Recent Projects</h3>
            </div>
            <Link
              to="/admin/projects"
              className="text-xs text-[#12BCEB] hover:underline font-semibold"
            >
              All →
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#12BCEB]">{p.category}</span>
                  <span className="text-[10px] font-mono text-emerald-400">{p.publication_status}</span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{p.title}</h4>
                <div className="text-[10px] text-slate-400">
                  Added on {new Date(p.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#12BCEB]" />
              <span>Preview Live Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
