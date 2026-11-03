import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { MotionReveal, StaggerContainer, StaggerItem } from '../components/common/MotionReveal';
import { BlogPost, BlogCategory } from '../types';
import { 
  Search, 
  ArrowRight, 
  BookOpen
} from 'lucide-react';

export const Blog: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchParams] = useSearchParams();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [loading, setLoading] = useState(true);

  // Load categories
  useEffect(() => {
    fetch('/api/blog/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(() => {});
  }, []);

  // Find active category name from categorySlug if present
  const activeCategory = categorySlug 
    ? categories.find((c) => c.slug === categorySlug)?.name || ''
    : searchParams.get('category') || 'All Articles';

  // Fetch posts
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== 'All Articles') {
      params.set('category', activeCategory);
    }
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }
    params.set('page', String(page));
    params.set('limit', '9');

    fetch(`/api/blog?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeCategory, searchTerm, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const featuredPost = posts.length > 0 && page === 1 && !searchTerm ? posts[0] : null;
  const gridPosts = featuredPost ? posts.slice(1) : posts;

  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100 overflow-hidden">
      <SEOHead 
        title="Insights, Ideas & Perspectives | SPES Swiftpace Engineering"
        description="Explore technical engineering articles, structural guidelines, building construction advice, and architectural perspectives from SPES Swiftpace in Nigeria."
        canonicalPath="/blog"
      />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#040D1E] via-[#06152F] to-[#081D43]/60 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <MotionReveal direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
              <span className="w-2 h-2 rounded-full bg-[#12BCEB] animate-pulse"></span>
              <span>Engineering Knowledge & Industry Perspectives</span>
            </div>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.1} duration={0.7}>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white leading-tight">
              Insights, Ideas & Engineering Perspectives
            </h1>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2} duration={0.7}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore professional insights, industry perspectives and practical knowledge across architecture, engineering, construction and the built environment.
            </p>
          </MotionReveal>

          {/* Search Bar */}
          <MotionReveal direction="up" delay={0.25} duration={0.6}>
            <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto pt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles on structural design, foundation, codes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#081D43] border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#12BCEB]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </form>
          </MotionReveal>
        </div>
      </section>

      {/* Categories Bar */}
      <div className="border-b border-white/10 bg-[#081D43]/50 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto py-3 flex items-center gap-2 no-scrollbar">
          <Link
            to="/blog"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              !categorySlug && (!searchParams.get('category') || searchParams.get('category') === 'All Articles')
                ? 'bg-[#12BCEB] text-[#06152F]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            All Articles
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/blog/category/${cat.slug}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                categorySlug === cat.slug
                  ? 'bg-[#12BCEB] text-[#06152F]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Articles Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Featured Hero Article */}
            {featuredPost && (
              <MotionReveal direction="up" duration={0.7}>
                <div className="group rounded-2xl bg-[#081D43] border border-white/10 hover:border-[#12BCEB]/50 overflow-hidden flex flex-col md:flex-row transition-all shadow-xl">
                  <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                    <img
                      src={featuredPost.featured_image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#081D43]/90 md:block hidden" />
                  </div>

                  <div className="md:w-1/2 p-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[11px] text-[#12BCEB] font-bold uppercase tracking-wider">
                        <span>{featuredPost.category_name}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400 font-normal">
                          {new Date(featuredPost.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>

                      <h2 className="font-serif-luxury text-2xl font-bold text-white group-hover:text-[#12BCEB] transition-colors leading-snug">
                        {featuredPost.title}
                      </h2>

                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#12BCEB] group-hover:text-white transition-colors self-start"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </MotionReveal>
            )}

            {/* Grid Articles */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : gridPosts.length > 0 ? (
              <StaggerContainer key={activeCategory + searchTerm} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {gridPosts.map((article) => (
                  <StaggerItem key={article.id}>
                    <article
                      className="group rounded-2xl bg-[#081D43]/70 border border-white/10 hover:border-[#12BCEB]/40 overflow-hidden flex flex-col transition-all duration-300 h-full hover:shadow-xl hover:shadow-cyan-950/20"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.featured_image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#081D43] via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#12BCEB] bg-[#06152F]/90 px-2.5 py-0.5 rounded">
                            {article.category_name}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="text-[11px] text-slate-400 mb-2">
                            {new Date(article.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                          <h3 className="text-base font-bold text-white group-hover:text-[#12BCEB] transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>

                        <Link
                          to={`/blog/${article.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12BCEB] group-hover:text-white transition-colors"
                        >
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="text-center py-16 rounded-2xl bg-[#081D43]/40 border border-white/10 p-8 space-y-3">
                <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-slate-300 text-sm">
                  No articles found matching your query.
                </p>
                <Link to="/blog" className="text-xs text-[#12BCEB] font-semibold underline">
                  View all published articles
                </Link>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 rounded-xl bg-[#081D43] border border-white/10 text-xs text-slate-300 disabled:opacity-30 cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-xs text-slate-400 px-3">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 rounded-xl bg-[#081D43] border border-white/10 text-xs text-slate-300 disabled:opacity-30 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <MotionReveal direction="left" duration={0.7} delay={0.1} className="space-y-8">
              {/* Categories Widget */}
              <div className="p-6 rounded-2xl bg-[#081D43] border border-white/10 space-y-4">
                <h4 className="font-display-luxury text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
                  Browse by Discipline
                </h4>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      to={`/blog/category/${c.slug}`}
                      className="flex items-center justify-between text-xs text-slate-300 hover:text-[#12BCEB] py-1.5 transition-colors group"
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] font-mono text-slate-500 group-hover:text-[#12BCEB]">
                        {c.post_count || 0}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Editorial Advisory Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#06152F] to-[#081D43] border border-[#12BCEB]/30 space-y-4">
                <h4 className="font-display-luxury text-sm font-bold text-white">
                  Technical Editorial Board
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Articles published on SPES Swiftpace Insights are authored and peer-reviewed by registered structural engineers, architects, and seasoned construction managers to ensure strict code accuracy.
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs text-[#12BCEB] font-semibold hover:underline"
                  >
                    <span>Submit technical enquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>
    </div>
  );
};
