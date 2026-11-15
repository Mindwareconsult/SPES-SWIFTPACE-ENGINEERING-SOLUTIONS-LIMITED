import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { MotionReveal, StaggerContainer, StaggerItem } from '../components/common/MotionReveal';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  MapPin,
  Building2,
  FileCheck,
  Compass,
  Boxes,
  ClipboardCheck,
  Briefcase,
  Wrench,
  ChevronRight,
  Award,
  Layers,
  Phone,
  Mail
} from 'lucide-react';

export const About: React.FC = () => {
  // Exact 8 Core Values from Official SPES Company Profile
  const coreValues = [
    { title: 'Professionalism', desc: 'Maintaining high standards of professional conduct and service delivery.' },
    { title: 'Integrity', desc: 'Building relationships through transparency, honesty and accountability.' },
    { title: 'Quality', desc: 'Giving attention to workmanship, specifications and project requirements.' },
    { title: 'Innovation', desc: 'Applying practical and modern approaches to engineering and construction.' },
    { title: 'Efficiency', desc: 'Encouraging effective planning, coordination and resource utilisation.' },
    { title: 'Safety', desc: 'Recognising the importance of responsible construction practices.' },
    { title: 'Client Satisfaction', desc: 'Understanding client needs and aligning services with project objectives.' },
    { title: 'Sustainability', desc: 'Supporting thoughtful and responsible development of the built environment.' }
  ];

  // The 6 Principal Stated Capabilities from Company Profile (linking to service pages)
  const capabilities = [
    {
      id: 'architecture',
      title: 'Architecture',
      slug: '/services/architecture',
      desc: 'Architectural planning and design support for functional, considered and context-appropriate built environments.',
      icon: Compass,
      image: '/uploads/projects/architectural-facade-concepts/arch-terraced-streetscape-01.jpg'
    },
    {
      id: 'building-construction',
      title: 'Building Construction',
      slug: '/services/building-construction',
      desc: 'Building construction services focused on translating project requirements and design intent into built works.',
      icon: Building2,
      image: '/uploads/projects/contemporary-terraced-residential/terraced-residential-courtyard-01.jpg'
    },
    {
      id: 'civil-structural-engineering',
      title: 'Civil & Structural Engineering',
      slug: '/services/civil-structural-engineering',
      desc: 'Civil and structural engineering input supporting the planning, design and delivery of safe and functional infrastructure and building elements.',
      icon: Boxes,
      image: '/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-foundation-overview-01.jpg'
    },
    {
      id: 'construction-management',
      title: 'Construction Management',
      slug: '/services/construction-management',
      desc: 'Project coordination and construction management support, with attention to planning, sequencing, resources, quality and delivery.',
      icon: ClipboardCheck,
      image: '/assets/projects/suspended-slab-decking/suspended-slab-decking-01.jpg'
    },
    {
      id: 'consultancy',
      title: 'Consultancy',
      slug: '/services/consultancy',
      desc: 'Professional advisory and consultancy support to help clients assess project needs, options and implementation considerations.',
      icon: Briefcase,
      image: '/assets/projects/multilevel-concrete-frame/multilevel-concrete-frame-03.jpg'
    },
    {
      id: 'allied-services',
      title: 'Allied Services',
      slug: '/services/allied-services',
      desc: 'Related services that complement the company’s core architecture, engineering, construction and management activities.',
      icon: Wrench,
      image: '/uploads/projects/interior-architecture-joinery/interior-living-media-wall-02.jpg'
    }
  ];

  // Approach to Project Delivery from Company Profile (Section 03)
  const deliveryPrinciples = [
    { title: 'Understanding the Brief', desc: 'Clarifying the client’s objectives, site or project context, requirements and constraints.' },
    { title: 'Planning & Coordination', desc: 'Organising relevant design, engineering, construction and delivery activities.' },
    { title: 'Technical Consideration', desc: 'Applying appropriate professional judgement and technical practices to the work undertaken.' },
    { title: 'Quality Awareness', desc: 'Paying attention to workmanship, specifications and agreed project requirements.' },
    { title: 'Clear Communication', desc: 'Maintaining clear coordination with clients, consultants, contractors and other relevant stakeholders.' },
    { title: 'Responsible Delivery', desc: 'Recognising safety, resource efficiency and the wider impact of construction activity.' }
  ];

  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100 overflow-hidden">
      <SEOHead 
        title="About Us | SPES Swiftpace Engineering Solutions Limited"
        description="SPES Swiftpace Engineering Solutions Limited (RC: 8978524) provides integrated architecture, building construction, civil & structural engineering, and consultancy in Ado Ekiti, Nigeria."
        canonicalPath="/about"
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#040D1E] via-[#06152F] to-[#081D43]/60 border-b border-white/10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <MotionReveal direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
              <span className="w-2 h-2 rounded-full bg-[#12BCEB] animate-pulse"></span>
              <span>Official Company Profile · RC 8978524</span>
            </div>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.1} duration={0.7}>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white leading-tight">
              SPES Swiftpace <br />
              <span className="text-[#12BCEB]">Engineering Solutions Limited</span>
            </h1>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2} duration={0.7}>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              An engineering, construction and consultancy company based in Ado Ekiti, Ekiti State, Nigeria. Providing integrated professional services across architecture, building construction, civil and structural engineering, construction management, consultancy and allied services.
            </p>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.3} duration={0.6}>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#078A43]" />
                <span>Incorporated under CAMA · Registration Number: <strong>RC 8978524</strong></span>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#12BCEB]" />
                <span>Headquarters: Ado Ekiti, Ekiti State, Nigeria</span>
              </span>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Company Overview with Genuine Site Photography */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <MotionReveal direction="left" duration={0.8} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#078A43]">
              <span className="w-2 h-2 rounded-full bg-[#078A43]"></span>
              <span>01 | Company Overview</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
              Practical Engineering & Construction Solutions for the Built Environment
            </h2>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              SPES Swiftpace Engineering Solutions Limited provides integrated professional services across architecture, building construction, civil and structural engineering, construction management, consultancy and allied services. Operating from Ado Ekiti, Ekiti State, Nigeria, the company is positioned to serve individuals, businesses, institutions and organisations seeking practical solutions for the built environment.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              The company’s service offering brings together design-related capabilities, engineering input, construction activity and project coordination. Its stated approach places emphasis on technical precision, professional coordination, quality workmanship, functional design and effective project delivery.
            </p>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="text-xs font-bold text-[#12BCEB] uppercase tracking-wider">Corporate Information Summary</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Registered Name</span>
                  <strong className="text-white">SPES Swiftpace Engineering Solutions Limited</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">CAC Registration Number</span>
                  <strong className="text-emerald-400">RC 8978524</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Corporate Address</span>
                  <span>Plot 2, Toluwani Street, Peace Avenue, Off Iworoko Road, Ado Ekiti, Nigeria</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Direct Inquiries</span>
                  <span>spesengineeringlimited@gmail.com</span>
                </div>
              </div>
            </div>
          </MotionReveal>

          {/* Genuine Project Photography Showcase */}
          <MotionReveal direction="right" duration={0.8} delay={0.15} className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-56 rounded-2xl overflow-hidden border border-white/10 group shadow-xl bg-[#040D1E] relative">
                <img
                  src="/uploads/projects/ijebu-ode-substructure-foundation/ijebu-ode-spes-team-rebar-02.jpg"
                  alt="SPES field operative tying pad footing reinforcement in Ijebu Ode"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono text-white">Pad Footing Works · Ijebu Ode</span>
                </div>
              </div>

              <div className="h-64 rounded-2xl overflow-hidden border border-white/10 group shadow-xl bg-[#040D1E] relative">
                <img
                  src="/assets/projects/suspended-slab-decking/suspended-slab-decking-01.jpg"
                  alt="Supervisory engineers inspecting structural drawings on slab deck"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono text-white">Site Drawing Inspection · Lagos</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="h-64 rounded-2xl overflow-hidden border border-white/10 group shadow-xl bg-[#040D1E] relative">
                <img
                  src="/assets/projects/curvilinear-mixed-use/curvilinear-mixed-use-01.jpg"
                  alt="Curvilinear 4-storey mixed use architectural building"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono text-white">Curvilinear Mixed-Use Architecture</span>
                </div>
              </div>

              <div className="h-56 rounded-2xl overflow-hidden border border-white/10 group shadow-xl bg-[#040D1E] relative">
                <img
                  src="/uploads/projects/contemporary-terraced-residential/terraced-residential-courtyard-01.jpg"
                  alt="Contemporary multi-unit terraced residential development"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono text-white">Terraced Residential Envelope</span>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-16 bg-[#081D43]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision */}
            <MotionReveal direction="up" duration={0.7} delay={0.1}>
              <div className="p-8 rounded-2xl bg-[#06152F] border border-[#12BCEB]/30 space-y-4 relative overflow-hidden h-full shadow-lg hover:border-[#12BCEB]/60 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#082657] text-[#12BCEB] flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#12BCEB]">Corporate Vision</h3>
                <blockquote className="font-serif-luxury text-xl sm:text-2xl text-white font-medium leading-snug">
                  "To become a recognised and trusted engineering and construction company, distinguished by technical excellence, innovative thinking, quality project delivery and sustainable contributions to the built environment."
                </blockquote>
              </div>
            </MotionReveal>

            {/* Mission */}
            <MotionReveal direction="up" duration={0.7} delay={0.2}>
              <div className="p-8 rounded-2xl bg-[#06152F] border border-[#078A43]/40 space-y-4 relative overflow-hidden h-full shadow-lg hover:border-[#078A43]/70 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-950 text-[#078A43] flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#078A43]">Corporate Mission</h3>
                <blockquote className="font-serif-luxury text-xl sm:text-2xl text-white font-medium leading-snug">
                  "To provide professional, efficient and innovative engineering, construction and consultancy services through sound technical practices, effective project management and a commitment to quality, safety and client satisfaction."
                </blockquote>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* Core Values (Exact from Company Profile) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <MotionReveal direction="up" className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
            <span className="w-2 h-2 rounded-full bg-[#12BCEB]"></span>
            <span>Corporate Ethos</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            Our Core Values
          </h2>
          <p className="text-slate-400 text-sm">
            The principles that guide our client relationships, technical decisions, and construction practices across every engagement.
          </p>
        </MotionReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((v, idx) => (
            <StaggerItem key={idx}>
              <div
                className="p-6 rounded-2xl bg-[#081D43]/60 border border-white/10 hover:border-[#12BCEB]/50 transition-all space-y-2.5 h-full hover:shadow-lg hover:shadow-cyan-950/30"
              >
                <div className="text-xs font-mono font-bold text-[#12BCEB]">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-white">{v.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Principal Capabilities / Service Links */}
      <section className="py-20 bg-[#081D43]/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <MotionReveal direction="up" className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#078A43]">
              <span className="w-2 h-2 rounded-full bg-[#078A43]"></span>
              <span>02 | Services & Capabilities</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
              Six Principal Service Disciplines
            </h2>
            <p className="text-slate-400 text-sm">
              Explore our core stated capabilities, linking directly to detailed engineering methodologies and scope for each practice area.
            </p>
          </MotionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <StaggerItem key={cap.id}>
                  <Link
                    to={cap.slug}
                    className="group rounded-2xl bg-[#06152F] border border-white/10 hover:border-[#12BCEB]/50 overflow-hidden flex flex-col h-full transition-all shadow-lg hover:shadow-cyan-950/40"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={cap.image}
                        alt={cap.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-[#06152F]/90 text-[#12BCEB] border border-white/10 backdrop-blur-md">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#12BCEB] transition-colors flex items-center justify-between">
                          <span>{cap.title}</span>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#12BCEB] group-hover:translate-x-1 transition-all" />
                        </h3>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {cap.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 text-[11px] font-bold text-[#12BCEB] flex items-center gap-1 group-hover:text-white transition-colors">
                        <span>Explore discipline overview</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 03 | Approach to Project Delivery (from Company Profile) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <MotionReveal direction="up" className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
            <span className="w-2 h-2 rounded-full bg-[#12BCEB]"></span>
            <span>03 | Project Approach & Methodology</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            General Principles of Project Delivery
          </h2>
          <p className="text-slate-400 text-sm">
            SPES brings together design, engineering, construction and project coordination capabilities centered around six proven delivery principles.
          </p>
        </MotionReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliveryPrinciples.map((dp, idx) => (
            <StaggerItem key={idx}>
              <div className="p-6 rounded-2xl bg-[#081D43]/60 border border-white/10 hover:border-[#12BCEB]/40 transition-colors space-y-3 h-full">
                <div className="text-xs font-mono font-bold text-[#12BCEB]">
                  PRINCIPLE 0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-white">{dp.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{dp.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Corporate Credentials, Verification Policy & Sister Enterprise Reference */}
      <section className="py-20 bg-[#081D43]/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Official Credentials & Policy Note */}
            <MotionReveal direction="left" duration={0.7} className="p-8 rounded-2xl bg-[#06152F] border border-white/10 space-y-5 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#082657] text-[#12BCEB] flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Official Corporate Credentials</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  SPES Swiftpace Engineering Solutions Limited is an engineering, construction and consultancy company incorporated under the Companies and Allied Matters Act by the Corporate Affairs Commission (CAC) with Registration Number <strong>RC 8978524</strong>.
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#078A43]" />
                    <span>Registered Company: SPES Swiftpace Engineering Solutions Limited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#078A43]" />
                    <span>Registration Number: <strong>RC 8978524</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#078A43]" />
                    <span>Official Address: Plot 2, Toluwani Street, Peace Avenue, Off Iworoko Road, Ado Ekiti</span>
                  </div>
                </div>

                {/* Official Logo Signboard Presentation */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-3 rounded-xl">
                  <img
                    src="/logo.peg"
                    alt="SPES Swiftpace Engineering Solutions Official Logo"
                    className="h-20 w-auto object-contain rounded-lg bg-white p-1 border border-white/20 shadow-md"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/assets/spes_logo.jpeg'; }}
                  />
                  <div className="text-xs text-slate-300">
                    <div className="font-bold text-white uppercase tracking-wider text-[11px] text-[#12BCEB]">Official Corporate Emblem & Trademark</div>
                    <p className="mt-0.5 text-[11px] text-slate-400">Authentic 3D identity mark representing architectural precision, civil integrity, and engineering quality.</p>
                  </div>
                </div>
              </div>

              {/* Exact Policy Statement from Profile */}
              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-400 italic leading-relaxed">
                "Profile verification policy: In alignment with our official company profile, project records, named personnel, professional registrations, licences and certifications are added only when supporting details have been formally verified."
              </div>
            </MotionReveal>

            {/* Sister Enterprise Reference per Section 7 */}
            <MotionReveal direction="right" duration={0.7} delay={0.1} className="p-8 rounded-2xl bg-[#06152F] border border-white/10 space-y-5 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 text-slate-300 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Sister Enterprise Reference</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our professional founders and engineering directors share an established engineering heritage alongside sister enterprise <strong>HarmoStructs Engineering Company Limited</strong>, collaborating on regional infrastructure knowledge while maintaining independent corporate governance, distinct registration, and individual contractual execution.
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12BCEB]"></span>
                    <span>Distinct corporate identities, governance and CAC registrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12BCEB]"></span>
                    <span>Dedicated administrative and project execution teams</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <a
                  href="https://harmostructsengineering.com.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#12BCEB] hover:text-white font-semibold transition-colors"
                >
                  <span>Visit HarmoStructs Engineering Reference Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 bg-gradient-to-r from-[#06152F] via-[#081D43] to-[#06152F] border-t border-white/10 text-center">
        <MotionReveal direction="up" className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            Have a Project in Mind? Discuss Your Brief with Our Team
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Our engineering, architectural, and construction teams in Ado Ekiti are positioned to evaluate your site, drawings, or development concepts.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              <span>Schedule a Project Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+2349010753592"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#12BCEB]" />
              <span>+234 901 075 3592</span>
            </a>
          </div>
        </MotionReveal>
      </section>
    </div>
  );
};
