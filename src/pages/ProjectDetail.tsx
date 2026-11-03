import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { MotionReveal } from '../components/common/MotionReveal';
import { Project, ProjectImage } from '../types';
import { 
  ChevronRight, 
  ChevronLeft,
  ArrowRight, 
  MessageSquare, 
  Phone,
  X, 
  Maximize2 
} from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/projects/${projectSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setProject(data.project);
        setImages(data.images || []);
        setRelated(data.related || []);
        setLoading(false);
      })
      .catch(() => {
        setProject(null);
        setLoading(false);
      });
  }, [projectSlug]);

  // Keyboard navigation for full-screen lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null || images.length === 0) return;
    if (e.key === 'Escape') {
      setLightboxIndex(null);
    } else if (e.key === 'ArrowRight') {
      setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length));
    } else if (e.key === 'ArrowLeft') {
      setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length));
    }
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length === 0) return;
    setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length));
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length === 0) return;
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06152F] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#12BCEB] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100 overflow-hidden">
      <SEOHead 
        title={`${project.title} | SPES Swiftpace Engineering Portfolio`}
        description={project.short_description}
        canonicalPath={`/projects/${project.slug}`}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#040D1E] border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={project.cover_image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          {/* Breadcrumbs */}
          <MotionReveal direction="down" duration={0.5}>
            <nav className="flex items-center gap-2 text-xs text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#12BCEB] truncate max-w-xs">{project.title}</span>
            </nav>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.1} duration={0.6}>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
              <span>{project.category}</span>
              {project.location && (
                <>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-300">{project.location}</span>
                </>
              )}
            </div>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.15} duration={0.7}>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {project.title}
            </h1>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2} duration={0.7}>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              {project.short_description}
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Project Details & Gallery */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Project Hero Image */}
            <MotionReveal direction="up" duration={0.7}>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={project.cover_image}
                  alt={project.title}
                  className="w-full h-[440px] object-cover"
                />
                {images.length > 0 && (
                  <button
                    onClick={() => setLightboxIndex(0)}
                    className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#06152F]/90 backdrop-blur-md text-xs font-semibold text-white border border-white/10 hover:border-[#12BCEB] transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4 text-[#12BCEB]" />
                    <span>View All {images.length} Photos</span>
                  </button>
                )}
              </div>
            </MotionReveal>

            {/* Overview */}
            {project.overview && (
              <MotionReveal direction="up" duration={0.6} className="space-y-4">
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                  Project Overview
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.overview}
                </p>
              </MotionReveal>
            )}

            {/* Objectives */}
            {project.objectives && (
              <MotionReveal direction="up" duration={0.6} className="space-y-4">
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Key Objectives & Client Requirements
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.objectives}
                </p>
              </MotionReveal>
            )}

            {/* Scope of Work */}
            {project.scope_of_work && (
              <MotionReveal direction="up" duration={0.6} className="space-y-4">
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Engineering Scope of Work
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.scope_of_work}
                </p>
              </MotionReveal>
            )}

            {/* Technical Approach */}
            {project.technical_approach && (
              <MotionReveal direction="up" duration={0.6} className="space-y-4 p-6 rounded-2xl bg-[#081D43]/60 border border-[#12BCEB]/20">
                <h3 className="font-serif-luxury text-2xl font-bold text-[#12BCEB]">
                  Technical Approach & Methodology
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {project.technical_approach}
                </p>
              </MotionReveal>
            )}

            {/* Project Outcome */}
            {project.project_outcome && (
              <MotionReveal direction="up" duration={0.6} className="space-y-4">
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Delivered Outcome & Performance
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.project_outcome}
                </p>
              </MotionReveal>
            )}

            {/* Project Gallery */}
            {images.length > 0 && (
              <MotionReveal direction="up" duration={0.6} className="space-y-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-2xl font-bold text-white">
                      Project Site Gallery
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {images.length} verified photographs documenting site execution, formwork, and craftsmanship.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#12BCEB]">
                    Click any photo to enlarge
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, idx) => (
                    <div
                      key={img.id}
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative h-48 rounded-xl overflow-hidden border border-white/10 hover:border-[#12BCEB]/60 transition-all cursor-pointer shadow-lg bg-[#040D1E]"
                    >
                      <img
                        src={img.image_path}
                        alt={img.image_caption || `${project.title} photo ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                        <span className="text-[11px] text-white font-medium line-clamp-2 leading-tight">
                          {img.image_caption || `Photo 0${idx + 1}`}
                        </span>
                        <div className="mt-1 flex items-center gap-1 text-[10px] text-[#12BCEB]">
                          <Maximize2 className="w-3 h-3" />
                          <span>Enlarge viewer</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionReveal>
            )}
          </div>

          {/* Right Column: Project Metadata Card & CTAs */}
          <div className="lg:col-span-4 space-y-8">
            <MotionReveal direction="left" duration={0.7} delay={0.1} className="space-y-8">
              {/* Metadata Card */}
              <div className="p-6 rounded-2xl bg-[#081D43] border border-[#12BCEB]/30 space-y-5 shadow-xl">
                <h4 className="font-display-luxury text-base font-bold text-white border-b border-white/10 pb-3">
                  Project Information
                </h4>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <div className="text-slate-400 uppercase tracking-wider text-[10px]">Project Category</div>
                    <div className="font-bold text-white mt-0.5">{project.category}</div>
                  </div>

                  {project.location && (
                    <div>
                      <div className="text-slate-400 uppercase tracking-wider text-[10px]">Location</div>
                      <div className="font-bold text-white mt-0.5">{project.location}</div>
                    </div>
                  )}

                  {project.client && (
                    <div>
                      <div className="text-slate-400 uppercase tracking-wider text-[10px]">Client / Stakeholder</div>
                      <div className="font-bold text-white mt-0.5">{project.client}</div>
                    </div>
                  )}

                  <div>
                    <div className="text-slate-400 uppercase tracking-wider text-[10px]">Project Status</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{project.project_status || 'Active Construction'}</div>
                  </div>

                  {project.completion_date && (
                    <div>
                      <div className="text-slate-400 uppercase tracking-wider text-[10px]">Timeline / Target</div>
                      <div className="font-bold text-white mt-0.5">{project.completion_date}</div>
                    </div>
                  )}
                </div>

                {/* Specific Enquiry Action Box per Section 4.3 */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div>
                    <h5 className="text-sm font-bold text-white">Have a Similar Project in Mind?</h5>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                      Consult directly with SPES Swiftpace Engineering Solutions Limited in Ado Ekiti for drawings review, costing, or turnkey delivery.
                    </p>
                  </div>

                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-cyan-500/20 transition-all"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="tel:+2349010753592"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#12BCEB]" />
                      <span>Call SPES</span>
                    </a>

                    <a
                      href={`https://wa.me/2349010753592?text=${encodeURIComponent(`Hello SPES Swiftpace, I am inquiring regarding your project: ${project.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Enquiry</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Projects */}
              {related.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#081D43]/50 border border-white/10 space-y-4">
                  <h4 className="font-display-luxury text-sm font-bold uppercase tracking-wider text-slate-200">
                    Related Projects
                  </h4>
                  <div className="space-y-4">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        to={`/projects/${r.slug}`}
                        className="flex gap-3 group"
                      >
                        <img
                          src={r.cover_image}
                          alt={r.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-white/10"
                        />
                        <div>
                          <div className="text-[10px] text-[#12BCEB] font-semibold">{r.category}</div>
                          <h5 className="text-xs font-bold text-white group-hover:text-[#12BCEB] transition-colors line-clamp-2">
                            {r.title}
                          </h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* Full-Screen Interactive Lightbox Modal with Prev/Next Navigation */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div 
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between text-white z-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#12BCEB] bg-white/10 px-2.5 py-1 rounded-md">
                Photo {lightboxIndex + 1} of {images.length}
              </span>
              <span className="text-xs text-slate-300 font-medium truncate max-w-md hidden sm:inline">
                {project.title}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              title="Close viewer (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Image with Prev / Next Buttons */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {images.length > 1 && (
              <button
                onClick={showPrevImage}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#12BCEB] text-white transition-colors cursor-pointer"
                title="Previous photo (Left arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <img
              src={images[lightboxIndex].image_path}
              alt={images[lightboxIndex].image_caption || `${project.title} full view`}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />

            {images.length > 1 && (
              <button
                onClick={showNextImage}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#12BCEB] text-white transition-colors cursor-pointer"
                title="Next photo (Right arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption & Thumbnails */}
          <div className="text-center space-y-3 z-10" onClick={(e) => e.stopPropagation()}>
            {images[lightboxIndex].image_caption && (
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto bg-black/60 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                {images[lightboxIndex].image_caption}
              </p>
            )}

            {/* Thumbnail Navigation Strip */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-full no-scrollbar">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setLightboxIndex(i)}
                  className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                    i === lightboxIndex ? 'border-[#12BCEB] scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.image_path} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
