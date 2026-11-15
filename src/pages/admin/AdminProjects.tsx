import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { authFetch } from '../../utils/authFetch';
import { applyImageFallback, resolveMediaUrl } from '../../utils/api';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  CheckCircle2, 
  X, 
  Upload, 
  ExternalLink,
  MapPin,
  Building
} from 'lucide-react';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    category: 'Commercial & Industrial',
    location: '',
    client: '',
    project_status: 'Completed',
    completion_date: '',
    short_description: '',
    overview: '',
    objectives: '',
    scope_of_work: '',
    technical_approach: '',
    project_outcome: '',
    cover_image: '',
    featured: 0,
    publication_status: 'published' as 'published' | 'draft'
  });

  const [galleryUrls, setGalleryUrls] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const categories = [
    'Architecture',
    'Building Construction',
    'Civil & Structural Engineering',
    'Infrastructure',
    'Commercial & Industrial',
    'Construction Management'
  ];

  const fetchProjects = () => {
    setLoading(true);
    authFetch('/api/projects/admin/all')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load projects');
        return res.json();
      })
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Commercial & Industrial',
      location: 'Ado Ekiti, Ekiti State',
      client: '',
      project_status: 'Completed',
      completion_date: 'March 2026',
      short_description: '',
      overview: '',
      objectives: '',
      scope_of_work: '',
      technical_approach: '',
      project_outcome: '',
      cover_image: '/uploads/projects/',
      featured: 0,
      publication_status: 'published'
    });
    setGalleryUrls('');
    setModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      category: p.category,
      location: p.location || '',
      client: p.client || '',
      project_status: p.project_status || 'Completed',
      completion_date: p.completion_date || '',
      short_description: p.short_description,
      overview: p.overview || '',
      objectives: p.objectives || '',
      scope_of_work: p.scope_of_work || '',
      technical_approach: p.technical_approach || '',
      project_outcome: p.project_outcome || '',
      cover_image: p.cover_image,
      featured: p.featured,
      publication_status: p.publication_status
    });
    setGalleryUrls('');
    setModalOpen(true);

    // Fetch full project record including existing gallery images so edits preserve them
    authFetch(`/api/projects/admin/${p.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data?.images)) {
          const urls = data.images.map((img: any) => img.image_path).filter(Boolean).join('\n');
          setGalleryUrls(urls);
        }
      })
      .catch(() => {});
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await authFetch(`/api/projects/admin/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      fetchProjects();
    } catch {
      alert('Failed to delete project');
    }
  };

  const handleTogglePublish = async (p: Project) => {
    const nextStatus = p.publication_status === 'published' ? 'draft' : 'published';
    try {
      const res = await authFetch(`/api/projects/admin/${p.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publication_status: nextStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchProjects();
    } catch {
      alert('Failed to update status');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const galleryArray = galleryUrls
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean)
      .map((url) => ({ image_path: url, image_caption: '' }));

    const payload = {
      ...formData,
      gallery_images: galleryArray
    };

    try {
      const url = editingProject
        ? `/api/projects/admin/${editingProject.id}`
        : '/api/projects/admin';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save');
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Error saving project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-serif-luxury text-2xl font-bold text-white">
            Project & Portfolio Management
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Create, edit, or publish engineering case studies and project records.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold uppercase tracking-wider shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#12BCEB] border-t-transparent animate-spin" />
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-[#06152F] border border-white/10 overflow-hidden flex flex-col justify-between shadow-xl"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={resolveMediaUrl(p.cover_image)}
                  alt={p.title}
                  onError={(e) => applyImageFallback(e)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#06152F]/90 text-[#12BCEB]">
                    {p.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    p.publication_status === 'published'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/30'
                      : 'bg-amber-950 text-amber-300 border border-amber-600/30'
                  }`}>
                    {p.publication_status}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{p.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {p.short_description}
                  </p>
                  {p.location && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                      <MapPin className="w-3 h-3 text-[#12BCEB]" />
                      <span>{p.location}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleTogglePublish(p)}
                    className="text-slate-300 hover:text-white font-medium"
                  >
                    {p.publication_status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200"
                      title="Edit Project"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#06152F] border border-white/10 text-slate-400 text-xs">
          No projects found. Click "Add New Project" to create one.
        </div>
      )}

      {/* Create / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 rounded-2xl bg-[#06152F] border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                {editingProject ? 'Edit Project Record' : 'Create New Engineering Project'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Metropolitan Commercial Plaza & Office Tower"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Off Iworoko Road, Ado Ekiti"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Client (Optional)</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g., Commercial Consortium"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Status</label>
                  <input
                    type="text"
                    value={formData.project_status}
                    onChange={(e) => setFormData({ ...formData, project_status: e.target.value })}
                    placeholder="e.g., Completed or Ongoing"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Completion Date</label>
                  <input
                    type="text"
                    value={formData.completion_date}
                    onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                    placeholder="e.g., November 2025"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Cover Photograph URL *</label>
                <input
                  type="text"
                  required
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  placeholder="https://... or /uploads/projects/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Short Description (Summary Card) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Concise overview of engineering and architectural scope..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Detailed Project Overview</label>
                  <textarea
                    rows={3}
                    value={formData.overview}
                    onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Project Objectives</label>
                  <textarea
                    rows={3}
                    value={formData.objectives}
                    onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Engineering Scope of Work</label>
                  <textarea
                    rows={3}
                    value={formData.scope_of_work}
                    onChange={(e) => setFormData({ ...formData, scope_of_work: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Technical Approach & Methodology</label>
                  <textarea
                    rows={3}
                    value={formData.technical_approach}
                    onChange={(e) => setFormData({ ...formData, technical_approach: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Project Outcome & Results</label>
                <textarea
                  rows={2}
                  value={formData.project_outcome}
                  onChange={(e) => setFormData({ ...formData, project_outcome: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Additional Gallery Image URLs (One URL per line)
                </label>
                <textarea
                  rows={2}
                  value={galleryUrls}
                  onChange={(e) => setGalleryUrls(e.target.value)}
                  placeholder="/uploads/projects/...&#10;/assets/projects/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white font-mono text-[11px] focus:outline-none focus:border-[#12BCEB]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured === 1}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked ? 1 : 0 })}
                    className="accent-[#12BCEB]"
                  />
                  <span className="font-semibold text-slate-300">Feature on Homepage</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-300">Publication:</span>
                  <select
                    value={formData.publication_status}
                    onChange={(e) => setFormData({ ...formData, publication_status: e.target.value as any })}
                    className="px-2.5 py-1 rounded-lg bg-[#081D43] border border-white/10 text-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white font-bold"
                >
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
