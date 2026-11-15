import React, { useState, useEffect } from 'react';
import { MediaItem } from '../../types';
import { authFetch } from '../../utils/authFetch';
import { Upload, Trash2, Copy, Check, Filter } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('Projects');
  const [activeFilter, setActiveFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const categories = [
    'All',
    'Projects',
    'Architecture',
    'Building Construction',
    'Civil Engineering',
    'Structural Engineering',
    'Company',
    'Blog',
    'Team',
    'Management'
  ];

  const fetchMedia = () => {
    setLoading(true);
    const query = activeFilter === 'All' ? '' : `?category=${encodeURIComponent(activeFilter)}`;
    authFetch(`/api/media/admin${query}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load media');
        return res.json();
      })
      .then((data) => {
        setMedia(data.media || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, [activeFilter]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('category', category);
    Array.from(e.target.files).forEach((file) => {
      formData.append('files', file);
    });

    try {
      const res = await authFetch('/api/media/admin/upload', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      fetchMedia();
    } catch {
      alert('Failed to upload media files');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this media item?')) return;
    try {
      const res = await authFetch(`/api/media/admin/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      fetchMedia();
    } catch {
      alert('Delete failed');
    }
  };

  const handleCopyPath = (id: number, path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-serif-luxury text-2xl font-bold text-white">
            Media Asset Library
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Centralized storage for verified project photography, company branding, and engineering assets ({media.length} items).
          </p>
        </div>

        {/* Upload Controls */}
        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#06152F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#12BCEB]"
          >
            {categories.filter((c) => c !== 'All').map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] hover:from-[#0849a6] hover:to-[#22ccfb] text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer transition-all">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === cat
                ? 'bg-[#12BCEB] text-[#06152F] font-bold shadow-sm'
                : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#12BCEB] border-t-transparent animate-spin" />
        </div>
      ) : media.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl bg-[#06152F] border border-white/10 overflow-hidden flex flex-col justify-between shadow-md hover:border-[#12BCEB]/50 transition-colors"
            >
              <div className="relative h-32 overflow-hidden bg-black/40">
                <img
                  src={item.file_path}
                  alt={item.filename}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-1.5 left-1.5">
                  <span className="text-[9px] font-semibold text-white bg-[#06152F]/90 px-1.5 py-0.5 rounded border border-white/10">
                    {item.category || 'General'}
                  </span>
                </div>
              </div>

              <div className="p-2.5 space-y-2">
                <div className="text-[10px] text-slate-300 font-mono truncate" title={item.filename}>
                  {item.filename}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <button
                    onClick={() => handleCopyPath(item.id, item.file_path)}
                    className="inline-flex items-center gap-1 text-[10px] text-[#12BCEB] hover:text-white cursor-pointer"
                    title="Copy Image URL"
                  >
                    {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#06152F] border border-white/10 text-slate-400 text-xs space-y-2">
          <p>No media files found under "{activeFilter}".</p>
          {activeFilter !== 'All' && (
            <button
              onClick={() => setActiveFilter('All')}
              className="text-[#12BCEB] underline font-semibold"
            >
              Reset to all media
            </button>
          )}
        </div>
      )}
    </div>
  );
};
