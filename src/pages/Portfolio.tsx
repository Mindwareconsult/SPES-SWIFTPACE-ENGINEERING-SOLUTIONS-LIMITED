import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { MotionReveal, StaggerContainer, StaggerItem } from '../components/common/MotionReveal';
import { Project } from '../types';
import { applyImageFallback, resolveApiUrl, resolveMediaUrl } from '../utils/api';
import { MapPin, ArrowRight } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(() => searchParams.get('category') || 'All Projects');
  const [loading, setLoading] = useState<boolean>(true);

  const categories = [
    'All Projects',
    'Architecture',
    'Building Construction',
    'Civil & Structural Engineering',
    'Construction Management'
  ];

  useEffect(() => {
    const paramCat = searchParams.get('category');
    if (paramCat && paramCat !== activeCategory) {
      setActiveCategory(paramCat);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All Projects') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  useEffect(() => {
    setLoading(true);
    const query = activeCategory === 'All Projects' ? '' : `?category=${encodeURIComponent(activeCategory)}`;
    fetch(resolveApiUrl(`/api/projects${query}`))
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) setProjects(data.projects);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100 overflow-hidden">
      <SEOHead 
        title="Project Portfolio | SPES Swiftpace Engineering Solutions"
        description="Browse civil, structural, architectural, and commercial engineering project case studies by SPES Swiftpace Engineering Solutions Limited in Nigeria."
        canonicalPath="/portfolio"
      />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#040D1E] via-[#06152F] to-[#081D43]/60 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <MotionReveal direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
              <span className="w-2 h-2 rounded-full bg-[#12BCEB] animate-pulse"></span>
              <span>Technical Track Record</span>
            </div>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.1} duration={0.7}>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white leading-tight">
              Our Portfolio of Engineering & Construction Solutions
            </h1>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2} duration={0.7}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Examine our integrated engineering methodologies, structural solutions, and commercial developments across Nigeria.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Filter Tabs & Gallery */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Interactive Segmented Filter Controls */}
        <MotionReveal direction="up" duration={0.5} className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#12BCEB] text-[#06152F] shadow-lg shadow-cyan-950/50'
                  : 'bg-[#081D43] text-slate-300 hover:text-white hover:bg-[#0A265A] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </MotionReveal>

        {/* Project Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <StaggerContainer key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <div
                  className="group rounded-2xl bg-[#081D43] border border-white/10 hover:border-[#12BCEB]/50 overflow-hidden flex flex-col transition-all duration-300 shadow-xl hover:shadow-cyan-950/30 h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={resolveMediaUrl(project.cover_image)}
                      alt={`${project.title} — ${project.category}`}
                      loading="lazy"
                      onError={(e) => applyImageFallback(e)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081D43] via-transparent to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[11px] font-semibold text-white bg-[#06152F]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    {project.location && (
                      <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-[#12BCEB]" />
                        <span>{project.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#12BCEB] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                        {project.short_description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">
                        {project.project_status || 'Delivered'}
                      </span>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12BCEB] hover:text-white transition-colors"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-20 rounded-2xl bg-[#081D43]/40 border border-white/10 p-8 space-y-3">
            <p className="text-slate-300 text-sm">
              No projects found currently under category "{activeCategory}".
            </p>
            <button
              onClick={() => handleCategoryChange('All Projects')}
              className="text-xs text-[#12BCEB] font-semibold underline cursor-pointer"
            >
              Reset to all projects
            </button>
          </div>
        )}
      </section>

      {/* Transparency Note */}
      <section className="py-12 bg-[#040D1E] border-t border-white/10">
        <MotionReveal direction="up" className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            * Note on Portfolio Photography: Case studies highlight representative architectural and engineering scope. New projects and ongoing construction photography are updated regularly via our integrated administrative system.
          </p>
        </MotionReveal>
      </section>
    </div>
  );
};
