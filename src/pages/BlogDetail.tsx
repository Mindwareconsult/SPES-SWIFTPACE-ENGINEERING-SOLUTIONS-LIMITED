import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { MotionReveal } from '../components/common/MotionReveal';
import { BlogPost } from '../types';
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Check, 
  Copy
} from 'lucide-react';

export const BlogDetail: React.FC = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/blog/${articleSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setPost(data.post);
        setRelated(data.related || []);
        setLoading(false);
      })
      .catch(() => {
        setPost(null);
        setLoading(false);
      });
  }, [articleSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06152F] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#12BCEB] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Calculate estimated reading time
  const wordCount = (post.content || '').split(/\s+/).length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentUrl = window.location.href;
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(`${post.title} - Read more on SPES Swiftpace Engineering: ${currentUrl}`)}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`;
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

  // Parse simple markdown formatting for content
  const formatContent = (content: string) => {
    const lines = content.trim().split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) {
        return <h3 key={idx} className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-8 mb-3">{trimmed.replace('### ', '')}</h3>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={idx} className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-10 mb-4 pb-2 border-b border-white/10">{trimmed.replace('## ', '')}</h2>;
      }
      if (trimmed.startsWith('# ')) {
        return <h1 key={idx} className="font-serif-luxury text-3xl font-bold text-white mt-10 mb-4">{trimmed.replace('# ', '')}</h1>;
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-300 text-sm leading-relaxed mb-1">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (trimmed === '') {
        return <div key={idx} className="h-3" />;
      }
      return (
        <p key={idx} className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100 overflow-hidden">
      <SEOHead 
        title={`${post.title} | SPES Swiftpace Engineering Insights`}
        description={post.excerpt}
        ogImage={post.featured_image}
        canonicalPath={`/blog/${post.slug}`}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-[#040D1E] border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumbs */}
          <MotionReveal direction="down" duration={0.5}>
            <nav className="flex items-center gap-2 text-xs text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#12BCEB] truncate max-w-xs">{post.title}</span>
            </nav>
          </MotionReveal>

          {/* Unboxed Metadata */}
          <MotionReveal direction="up" delay={0.1} duration={0.6}>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="font-bold text-[#12BCEB] uppercase tracking-wider">{post.category_name}</span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{readMinutes} min read</span>
              </span>
            </div>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.15} duration={0.7}>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2} duration={0.7}>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed italic border-l-2 border-[#12BCEB] pl-4">
              {post.excerpt}
            </p>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.25} duration={0.5}>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <User className="w-4 h-4 text-[#078A43]" />
              <span>Author: <strong className="text-slate-200">{post.author}</strong></span>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Featured Image */}
        <MotionReveal direction="up" duration={0.7}>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-12">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-80 sm:h-[450px] object-cover"
            />
          </div>
        </MotionReveal>

        {/* Article Body */}
        <MotionReveal direction="up" delay={0.1} duration={0.7}>
          <div className="prose prose-invert max-w-none">
            {formatContent(post.content)}
          </div>
        </MotionReveal>

        {/* Social Share Bar */}
        <MotionReveal direction="up" delay={0.1} className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Share this perspective:
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-200 transition-colors cursor-pointer"
              title="Copy article URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>

            <a
              href={whatsappShare}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-xs text-white transition-colors"
            >
              WhatsApp
            </a>

            <a
              href={twitterShare}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#082657] hover:bg-[#0A3273] text-xs text-white transition-colors"
            >
              Twitter / X
            </a>

            <a
              href={linkedInShare}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#0077b5] hover:bg-[#006396] text-xs text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </MotionReveal>

        {/* Related Articles */}
        {related.length > 0 && (
          <MotionReveal direction="up" className="mt-16 pt-12 border-t border-white/10 space-y-6">
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              Related Engineering Insights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="group rounded-xl bg-[#081D43]/60 border border-white/10 hover:border-[#12BCEB]/40 overflow-hidden flex flex-col transition-all p-4 space-y-3"
                >
                  <img
                    src={r.featured_image}
                    alt={r.title}
                    className="w-full h-32 rounded-lg object-cover"
                  />
                  <div className="text-[10px] text-[#12BCEB] font-bold uppercase">
                    {r.category_name}
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#12BCEB] transition-colors line-clamp-2">
                    {r.title}
                  </h4>
                </Link>
              ))}
            </div>
          </MotionReveal>
        )}

        {/* Bottom Consultation CTA */}
        <MotionReveal direction="up" className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#06152F] to-[#081D43] border border-[#12BCEB]/30 text-center space-y-4">
          <h3 className="font-serif-luxury text-2xl font-bold text-white">
            Need Expert Structural or Architectural Counsel?
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Speak directly with our senior engineers and spatial planners regarding your commercial, residential or infrastructure development in Nigeria.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              <span>Initiate Project Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </MotionReveal>
      </section>
    </div>
  );
};
