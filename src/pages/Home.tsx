import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { ProjectStatistics } from '../components/common/ProjectStatistics';
import { MotionReveal, StaggerContainer, StaggerItem } from '../components/common/MotionReveal';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { faqData } from '../data/faqData';
import { Project, BlogPost } from '../types';
import { applyImageFallback, resolveApiUrl, resolveMediaUrl } from '../utils/api';
import { 
  ArrowRight, 
  Building2, 
  Compass, 
  Boxes, 
  ClipboardCheck, 
  Briefcase, 
  Wrench,
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  ChevronDown,
  Layers,
  Shield,
  Activity,
  Globe2,
  Calendar,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    // Fetch featured projects
    fetch(resolveApiUrl('/api/projects?featured=true'))
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) setProjects(data.projects.slice(0, 6));
      })
      .catch(() => {});

    // Fetch latest published blog articles
    fetch(resolveApiUrl('/api/blog?limit=3'))
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) setBlogs(data.posts);
      })
      .catch(() => {});
  }, []);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'architecture': return Compass;
      case 'building-construction': return Building2;
      case 'civil-structural-engineering': return Boxes;
      case 'construction-management': return ClipboardCheck;
      case 'consultancy': return Briefcase;
      case 'allied-services': return Wrench;
      default: return Building2;
    }
  };

  const deliverySteps = [
    { number: '01', title: 'Consultation', desc: 'Understanding project vision, functional requirements, site constraints, and feasibility parameters.' },
    { number: '02', title: 'Planning & Design', desc: 'Architectural schematics, structural analysis, load modeling, and permit-ready engineering drawings.' },
    { number: '03', title: 'Technical Coordination', desc: 'Harmonizing architectural, civil, MEP systems, and material specifications for seamless site execution.' },
    { number: '04', title: 'Project Execution', desc: 'Mobilizing plant, certified materials, and specialized technical labor under continuous engineering leadership.' },
    { number: '05', title: 'Quality Monitoring', desc: 'Conducting standard concrete slump/cube tests, rebar inspections, and milestone progress tracking.' },
    { number: '06', title: 'Completion & Handover', desc: 'Rigorous commissioning, operational manuals, defect checks, and formal client project handover.' }
  ];

  const whyChoosePoints = [
    { title: 'Integrated Engineering Disciplines', desc: 'From architecture and structural engineering to full construction execution under one unified corporate roof.' },
    { title: 'Technical Precision & Code Fidelity', desc: 'Zero guesswork. Every structural member and concrete pour is engineered strictly to Nigerian and international standards.' },
    { title: 'Transparent Cost & Schedule Control', desc: 'Itemized Bills of Quantities and critical path scheduling to prevent budget overruns and contractor delays.' },
    { title: 'Professional Site Supervision', desc: 'Resident engineering presence holding every material supplier and artisan to uncompromising quality thresholds.' },
    { title: 'Client-Centered Communication', desc: 'Regular milestone video briefings, progress logs, and direct access to senior engineering leadership.' },
    { title: 'Practical, Sustainable Solutions', desc: 'Climate-responsive designs tailored to West African soils, hydrology, and thermal realities.' }
  ];

  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100 overflow-hidden">
      <SEOHead 
        title="SPES Swiftpace Engineering Solutions Limited | Engineering, Architecture & Construction"
        description="SPES Swiftpace Engineering Solutions Limited (RC: 8978524) delivers integrated architectural, civil/structural engineering, building construction, and consultancy in Nigeria."
        canonicalPath="/"
      />

      {/* 5.2 Cinematic Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Deep Blue Cinematic Overlay matching NovaEngineering styling */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/projects/commercial-column-shoring/commercial-column-shoring-01.jpg"
            alt="SPES Swiftpace reinforced concrete column formwork and structural engineering works"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-125"
          />
          {/* Layered deep navy gradients and subtle radial cyan glows */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] via-[#06152F]/70 to-[#040D1E]/90" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#12BCEB]/15 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#06152F] to-transparent" />
        </div>

        {/* Hero Content with Framer Motion Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-5xl mx-auto text-center space-y-8"
        >
          {/* Subtle Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#12BCEB] uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#12BCEB] animate-pulse"></span>
            <span>RC: 8978524 · Ado Ekiti, Nigeria</span>
            <span className="text-slate-500">|</span>
            <span>Corporate Engineering Portal</span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto"
          >
            Engineering Excellence. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-[#12BCEB]">
              Building the Future.
            </span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed"
          >
            SPES Swiftpace Engineering Solutions Limited delivers integrated architectural, engineering, construction and consultancy services designed to shape functional, durable and sustainable built environments.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] hover:from-[#0849a6] hover:to-[#22ccfb] text-white text-sm font-semibold tracking-wide shadow-xl shadow-[#06152F] transition-all duration-300 group border border-white/20"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-semibold tracking-wide border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-md"
            >
              <span>Discuss Your Project</span>
            </Link>
          </motion.div>

          {/* Quick Credibility Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-white/10 max-w-3xl mx-auto"
          >
            <div className="p-2">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Registration</div>
              <div className="text-sm font-semibold text-white mt-0.5">RC: 8978524</div>
            </div>
            <div className="p-2">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Headquarters</div>
              <div className="text-sm font-semibold text-white mt-0.5">Ado Ekiti, Nigeria</div>
            </div>
            <div className="p-2">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Disciplines</div>
              <div className="text-sm font-semibold text-white mt-0.5">6 Core Divisions</div>
            </div>
            <div className="p-2">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Delivery Mode</div>
              <div className="text-sm font-semibold text-white mt-0.5">Turnkey & Advisory</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 5.3 Company Introduction with Reveal Animations */}
      <section className="relative py-24 bg-[#081D43]/60 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <MotionReveal direction="right" className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#12BCEB]/30 shadow-2xl group bg-[#040D1E]">
                <img
                  src="/assets/projects/suspended-slab-decking/suspended-slab-decking-01.jpg"
                  alt="SPES Swiftpace resident engineers reviewing structural drawings on slab deck"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#06152F]/90 backdrop-blur-md border border-white/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#12BCEB]">Corporate Creed</div>
                  <p className="text-xs text-slate-200 mt-1 italic">
                    "Technical precision, professional coordination, quality workmanship and effective project delivery."
                  </p>
                </div>
              </div>
            </MotionReveal>

            {/* Content Column */}
            <MotionReveal direction="left" delay={0.15} className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#078A43]">
                <span className="w-2 h-2 rounded-full bg-[#078A43]"></span>
                <span>01 | Corporate Overview</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Practical Solutions for <br />
                <span className="text-[#12BCEB]">The Built Environment</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                SPES Swiftpace Engineering Solutions Limited is an engineering, construction and consultancy company providing integrated professional services across architecture, building construction, civil and structural engineering, construction management, consultancy and allied services. Operating from Ado Ekiti, Ekiti State, Nigeria, the company is positioned to serve individuals, businesses, institutions and organisations seeking practical solutions for the built environment.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                The company’s service offering brings together design-related capabilities, engineering input, construction activity and project coordination. Its stated approach places emphasis on technical precision, professional coordination, quality workmanship, functional design and effective project delivery.
              </p>

              {/* Core Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-[#12BCEB] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Multi-Disciplinary Team</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Architects, civil engineers, and construction directors working in synergy.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-[#078A43] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Statutory Rigor</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Strict compliance with Nigerian building codes and physical planning laws.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#12BCEB] hover:text-white transition-colors group"
                >
                  <span>Learn More About Our Firm & Leadership</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* Animated Company Performance Statistics Counter */}
      <ProjectStatistics />

      {/* 5.4 Core Services (Three-Column / Six-Grid Layout inspired by NovaEngineering) */}
      <section className="relative py-24 bg-[#06152F] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with MotionReveal */}
          <MotionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
              <span className="w-2 h-2 rounded-full bg-[#12BCEB]"></span>
              <span>Our Practice Areas</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
              Comprehensive Engineering & Construction Solutions
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Integrated engineering and architectural services designed to guide projects from initial concept through engineering calculation and turnkey delivery.
            </p>
          </MotionReveal>

          {/* Six Service Cards with Stagger Animation */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => {
              const Icon = getServiceIcon(service.id);
              return (
                <StaggerItem key={service.id}>
                  <div
                    className="group relative rounded-2xl bg-[#081D43]/80 border border-white/10 hover:border-[#12BCEB]/50 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:shadow-cyan-950/40 h-full"
                  >
                    {/* Service Image with Dark Navy Gradient */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={resolveMediaUrl(service.heroImage)}
                        alt={service.title}
                        loading="lazy"
                        onError={(e) => applyImageFallback(e)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081D43] via-[#081D43]/40 to-transparent" />
                      
                      {/* Floating Icon */}
                      <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-[#06152F]/90 text-[#12BCEB] border border-white/10 backdrop-blur-md shadow-lg">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#12BCEB] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                          {service.shortDesc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#063B85] text-xs font-semibold text-slate-200 hover:text-white transition-all group/btn border border-white/10"
                        >
                          <span>Learn More</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <MotionReveal delay={0.2} className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold tracking-wider uppercase border border-white/10 transition-colors"
            >
              <span>View Detailed Service Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </MotionReveal>
        </div>
      </section>

      {/* 5.5 Capabilities: Cutting-Edge Solutions for the Built Environment */}
      <section className="relative py-20 bg-gradient-to-b from-[#081D43]/80 to-[#06152F] border-y border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
              Cutting-Edge Solutions for the Built Environment
            </h2>
            <p className="text-slate-400 text-sm">
              Technical precision, advanced computational engineering, and comprehensive project coordination.
            </p>
          </MotionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-[#06152F]/80 border border-white/10 hover:border-[#12BCEB]/40 transition-colors h-full">
                <div className="p-3 w-fit rounded-xl bg-[#082657] text-[#12BCEB] mb-4">
                  <Boxes className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Advanced Engineering</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Finite element structural analysis, soil mechanics calculations, and precision load modeling.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 rounded-2xl bg-[#06152F]/80 border border-white/10 hover:border-[#12BCEB]/40 transition-colors h-full">
                <div className="p-3 w-fit rounded-xl bg-[#082657] text-[#12BCEB] mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Architectural Design</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Contemporary aesthetics harmonized with bioclimatic principles and functional space programming.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 rounded-2xl bg-[#06152F]/80 border border-white/10 hover:border-[#12BCEB]/40 transition-colors h-full">
                <div className="p-3 w-fit rounded-xl bg-[#082657] text-[#12BCEB] mb-4">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Construction Management</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Critical path scheduling, QA/QC testing, material audits, and client capital protection.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 rounded-2xl bg-[#06152F]/80 border border-white/10 hover:border-[#12BCEB]/40 transition-colors h-full">
                <div className="p-3 w-fit rounded-xl bg-[#082657] text-[#12BCEB] mb-4">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Technical Consultancy</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Structural failure audits, feasibility investigations, and statutory regulatory clearance.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 5.6 Featured Projects Showcase */}
      <section className="relative py-24 bg-[#06152F] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <MotionReveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
                <span className="w-2 h-2 rounded-full bg-[#12BCEB]"></span>
                <span>Engineering Case Studies</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
                Featured Projects
              </h2>
            </div>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-[#063B85] text-white text-xs font-semibold tracking-wider uppercase border border-white/10 transition-all self-start md:self-auto"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </MotionReveal>

          {/* Project Grid with Stagger Container */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project) => (
                <StaggerItem key={project.id}>
                  <div
                    className="group rounded-2xl bg-[#081D43] border border-white/10 hover:border-[#12BCEB]/50 overflow-hidden flex flex-col transition-all duration-300 shadow-xl h-full"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={resolveMediaUrl(project.cover_image)}
                        alt={`${project.title} — ${project.category}`}
                        loading="lazy"
                        onError={(e) => applyImageFallback(e)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081D43] via-transparent to-transparent" />
                      
                      {/* Unboxed clean text metadata */}
                      <div className="absolute top-4 left-4">
                        <span className="text-[11px] font-semibold tracking-wide text-white bg-[#06152F]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
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
                        <h3 className="text-lg font-bold text-white group-hover:text-[#12BCEB] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                          {project.short_description}
                        </p>
                      </div>

                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12BCEB] group-hover:text-white transition-colors"
                      >
                        <span>View Project Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
              ))
            )}
          </StaggerContainer>
        </div>
      </section>

      {/* 5.7 Why Choose SPES? */}
      <section className="relative py-24 bg-[#081D43]/40 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#078A43]">
              <span className="w-2 h-2 rounded-full bg-[#078A43]"></span>
              <span>The SPES Distinction</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
              Why Choose Nova-Class Engineering with SPES?
            </h2>
            <p className="text-slate-400 text-sm">
              We eliminate the traditional gaps between architectural vision and on-site physical execution.
            </p>
          </MotionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoosePoints.map((point, index) => (
              <StaggerItem key={index}>
                <div
                  className="p-8 rounded-2xl bg-[#06152F] border border-white/10 hover:border-[#12BCEB]/30 transition-all space-y-3 h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#082657] text-[#12BCEB] flex items-center justify-center font-bold text-sm">
                    0{index + 1}
                  </div>
                  <h4 className="text-base font-bold text-white">{point.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{point.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5.8 Project Delivery Process: From Concept to Completion */}
      <section className="relative py-24 bg-[#06152F] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
              <span className="w-2 h-2 rounded-full bg-[#12BCEB]"></span>
              <span>Project Lifecycle</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
              From Concept to Completion
            </h2>
            <p className="text-slate-400 text-sm">
              Our 6-stage engineering delivery methodology ensures complete accountability at every milestone.
            </p>
          </MotionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverySteps.map((stage) => (
              <StaggerItem key={stage.number}>
                <div
                  className="relative p-6 rounded-2xl bg-[#081D43]/60 border border-white/10 hover:border-[#12BCEB]/40 transition-colors h-full"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                    <span className="text-2xl font-serif-luxury font-bold text-[#12BCEB]">
                      {stage.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">Stage</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{stage.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5.9 Corporate Commitment */}
      <section className="relative py-24 bg-[#040D1E] overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src={resolveMediaUrl('/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-foundation-overview-01.jpg')}
            alt="SPES Swiftpace substructure concrete foundation and blockwork site in Ijebu Ode"
            loading="lazy"
            onError={(e) => applyImageFallback(e)}
            className="w-full h-full object-cover"
          />
        </div>
        <MotionReveal className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 space-y-6">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            Building with Purpose. <br />
            <span className="text-[#12BCEB]">Engineering with Precision.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            From the reinforced concrete foundation to the final architectural handover, SPES Swiftpace Engineering Solutions Limited brings technical certainty to complex construction ventures across Nigeria.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              <span>Discuss Your Next Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </MotionReveal>
      </section>

      {/* 5.10 Featured Blog Articles */}
      <section className="relative py-24 bg-[#06152F] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
                <span className="w-2 h-2 rounded-full bg-[#12BCEB]"></span>
                <span>Engineering Perspectives</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
                Insights, Ideas & Perspectives
              </h2>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#12BCEB] hover:text-white transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </MotionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((article) => (
              <StaggerItem key={article.id}>
                <article
                  className="group rounded-2xl bg-[#081D43] border border-white/10 hover:border-[#12BCEB]/40 overflow-hidden flex flex-col transition-all duration-300 h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={resolveMediaUrl(article.featured_image)}
                      alt={article.title}
                      onError={(e) => applyImageFallback(e)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081D43] via-transparent to-transparent" />
                    
                    {/* Clean unboxed category */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#12BCEB] bg-[#06152F]/90 px-2 py-0.5 rounded">
                        {article.category_name}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Unboxed date metadata */}
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
        </div>
      </section>

      {/* 5.12 FAQ Preview */}
      <section className="relative py-20 bg-[#081D43]/60 border-t border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <MotionReveal className="text-center mb-12 space-y-3">
            <h2 className="font-serif-luxury text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Clear answers regarding our engineering services, location, and project engagement protocols.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.15} className="space-y-3">
            {faqData.slice(0, 5).map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-[#06152F] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-white hover:text-[#12BCEB] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[#12BCEB] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </MotionReveal>

          <div className="text-center mt-8">
            <Link
              to="/faq"
              className="text-xs font-semibold text-[#12BCEB] hover:underline"
            >
              View All 20 Frequently Asked Questions →
            </Link>
          </div>
        </div>
      </section>

      {/* 5.11 Contact CTA */}
      <section className="relative py-20 bg-gradient-to-r from-[#06152F] via-[#081D43] to-[#06152F] border-t border-white/10 overflow-hidden">
        <MotionReveal className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            Have a Project in Mind? <br />
            <span className="text-[#12BCEB]">Let's Build Something Exceptional.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Contact our engineering and construction team today. We provide transparent technical evaluations, feasibility studies, and itemized quotations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Request a Consultation
            </Link>

            <a
              href="tel:+2349010753592"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold tracking-wider border border-white/15 transition-all"
            >
              <Phone className="w-4 h-4 text-[#12BCEB]" />
              <span>Call +234 901 075 3592</span>
            </a>

            <a
              href="https://wa.me/2349010753592"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wider transition-all shadow-md shadow-emerald-950/40"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </MotionReveal>
      </section>
    </div>
  );
};
