import React, { useState, useEffect } from 'react';
import { BlogPost, BlogCategory } from '../../types';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  Calendar, 
  X, 
  BookOpen, 
  CheckCircle2, 
  Tag
} from 'lucide-react';

export const AdminBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category_name: 'Structural Engineering',
    excerpt: '',
    content: '',
    featured_image: '',
    author: 'SPES Engineering Directorate',
    publication_status: 'published' as 'published' | 'draft',
    seo_title: '',
    meta_description: ''
  });

  const [saving, setSaving] = useState(false);

  const fetchPosts = () => {
    setLoading(true);
    fetch('/api/blog/admin/all')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
    fetch('/api/blog/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(() => {});
  }, []);

  const openCreateModal = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      category_name: categories[0]?.name || 'Structural Engineering',
      excerpt: '',
      content: `## Engineering Context\n\nProvide technical analysis and professional engineering perspective here...\n\n### Key Considerations\n\n- Technical parameter 1\n- Parameter 2\n- Code compliance note`,
      featured_image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      author: 'SPES Engineering Directorate',
      publication_status: 'published',
      seo_title: '',
      meta_description: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      category_name: post.category_name,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featured_image,
      author: post.author,
      publication_status: post.publication_status,
      seo_title: post.seo_title || '',
      meta_description: post.meta_description || ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await fetch(`/api/blog/admin/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch {
      alert('Failed to delete post');
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    const nextStatus = post.publication_status === 'published' ? 'draft' : 'published';
    try {
      await fetch(`/api/blog/admin/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publication_status: nextStatus })
      });
      fetchPosts();
    } catch {
      alert('Failed to update publication status');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingPost ? `/api/blog/admin/${editingPost.id}` : '/api/blog/admin';
      const method = editingPost ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save');
      }

      setModalOpen(false);
      fetchPosts();
    } catch (err: any) {
      alert(err.message || 'Error saving article');
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
            Engineering Blog & Perspectives
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Publish technical insights, structural guidelines, and industry perspectives.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold uppercase tracking-wider shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Articles Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#12BCEB] border-t-transparent animate-spin" />
        </div>
      ) : posts.length > 0 ? (
        <div className="rounded-2xl bg-[#06152F] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-white/10 bg-[#081D43]/60 text-[10px] uppercase tracking-wider text-slate-400">
                  <th className="p-4">Article</th>
                  <th className="p-4">Discipline</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold text-white max-w-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-white/10"
                        />
                        <div>
                          <div className="line-clamp-1">{post.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono">/blog/{post.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-[#082657] text-[#12BCEB] text-[10px] font-semibold">
                        {post.category_name}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                          post.publication_status === 'published'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/30 hover:bg-emerald-900'
                            : 'bg-amber-950 text-amber-300 border border-amber-600/30 hover:bg-amber-900'
                        }`}
                      >
                        {post.publication_status}
                      </button>
                    </td>
                    <td className="p-4 text-slate-400">{post.author}</td>
                    <td className="p-4 text-slate-400 font-mono text-[11px]">
                      {new Date(post.published_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(post)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200"
                          title="Edit Article"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#06152F] border border-white/10 text-slate-400 text-xs">
          No blog posts found. Click "Write New Article" to draft one.
        </div>
      )}

      {/* Create / Edit Article Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 rounded-2xl bg-[#06152F] border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                {editingPost ? 'Edit Blog Article' : 'Draft New Technical Article'}
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
                <label className="block font-semibold text-slate-300 mb-1">Article Headline *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Critical Foundation Engineering Protocols in High-Water Terrains"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Discipline Category *</label>
                  <select
                    value={formData.category_name}
                    onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Author Byline</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g., SPES Technical Directorate"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Featured Photograph URL *</label>
                <input
                  type="url"
                  required
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  placeholder="https://... or /uploads/blog/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Short Excerpt (Search Snippet) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Summary of the article for blog grid and social sharing..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Article Body (Supports Markdown formatting: ## Headings, - Bullets, Paragraphs) *
                </label>
                <textarea
                  rows={10}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#12BCEB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">SEO Title (Optional)</label>
                  <input
                    type="text"
                    value={formData.seo_title}
                    onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                    placeholder="Custom meta title for Google Search"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Publication Status</label>
                  <select
                    value={formData.publication_status}
                    onChange={(e) => setFormData({ ...formData, publication_status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Unlisted)</option>
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
                  {saving ? 'Saving...' : 'Save Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
