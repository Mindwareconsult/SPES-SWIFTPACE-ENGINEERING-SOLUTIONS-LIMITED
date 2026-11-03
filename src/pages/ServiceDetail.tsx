import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { MotionReveal, StaggerContainer, StaggerItem } from '../components/common/MotionReveal';
import { servicesData } from '../data/servicesData';
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Compass, 
  Building2, 
  Boxes, 
  ClipboardCheck, 
  Briefcase, 
  Wrench,
  ChevronDown,
  Phone,
  MessageSquare,
  Shield
} from 'lucide-react';

export const ServiceDetail: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const service = servicesData.find((s) => s.slug === serviceSlug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const getIcon = (id: string) => {
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

  const Icon = getIcon(service.id);
  const relatedServices = servicesData.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100 overflow-hidden">
      <SEOHead 
        title={`${service.title} Services | SPES Swiftpace Engineering Solutions`}
        description={service.shortDesc}
        canonicalPath={`/services/${service.slug}`}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#040D1E] via-[#06152F] to-[#081D43]/60 border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          {/* Breadcrumbs */}
          <MotionReveal direction="down" duration={0.5}>
            <nav className="flex items-center gap-2 text-xs text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#12BCEB] font-medium">{service.title}</span>
            </nav>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.1} duration={0.6}>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#082657] text-[#12BCEB] border border-[#12BCEB]/30">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#078A43]">
                SPES Engineering Discipline
              </span>
            </div>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.15} duration={0.7}>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white leading-tight">
              {service.title}
            </h1>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2} duration={0.7}>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              {service.shortDesc}
            </p>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.25} duration={0.6}>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                Consult an Engineer
              </Link>
              <a
                href="https://wa.me/2349010753592"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Service Detailed Overview & Capabilities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <MotionReveal direction="up" duration={0.7} className="space-y-4">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                Detailed Practice Overview
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {service.detailedOverview}
              </p>
            </MotionReveal>

            {/* Comprehensive Capabilities */}
            <div className="space-y-6">
              <MotionReveal direction="up" duration={0.6}>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Specialized Capabilities & Technical Scope
                </h3>
              </MotionReveal>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.capabilities.map((cap, idx) => (
                  <StaggerItem key={idx}>
                    <div
                      className="p-4 rounded-xl bg-[#081D43]/60 border border-white/10 flex items-start gap-3 h-full hover:border-[#12BCEB]/30 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#12BCEB] flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 leading-snug">{cap}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Client Benefits */}
            <div className="space-y-6">
              <MotionReveal direction="up" duration={0.6}>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Value & Benefits to Project Owners
                </h3>
              </MotionReveal>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.clientBenefits.map((benefit, idx) => (
                  <StaggerItem key={idx}>
                    <div
                      className="p-5 rounded-xl bg-[#06152F] border border-[#12BCEB]/20 space-y-2 h-full hover:border-[#12BCEB]/50 transition-colors"
                    >
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12BCEB]"></span>
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Delivery Process */}
            <div className="space-y-6">
              <MotionReveal direction="up" duration={0.6}>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Our Structured 6-Stage Delivery Process
                </h3>
              </MotionReveal>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.processStages.map((stage) => (
                  <StaggerItem key={stage.step}>
                    <div
                      className="p-5 rounded-xl bg-[#081D43]/40 border border-white/10 space-y-1.5 h-full hover:border-[#12BCEB]/30 transition-colors"
                    >
                      <div className="text-xs font-mono font-bold text-[#12BCEB]">
                        STAGE {stage.step}
                      </div>
                      <h4 className="text-sm font-bold text-white">{stage.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Relevant FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <MotionReveal direction="up" className="space-y-4 pt-4">
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Common Inquiries About {service.title}
                </h3>
                <div className="space-y-2.5">
                  {service.faqs.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div
                        key={i}
                        className="rounded-xl bg-[#06152F] border border-white/10 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-white hover:text-[#12BCEB] cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-[#12BCEB] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-xs text-slate-300 border-t border-white/5 pt-3 leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </MotionReveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <MotionReveal direction="left" duration={0.7} delay={0.1} className="space-y-8">
              {/* Quick Contact Box */}
              <div className="p-6 rounded-2xl bg-[#081D43] border border-[#12BCEB]/30 space-y-4 shadow-xl">
                <h4 className="font-display-luxury text-base font-bold text-white">
                  Request a Consultation
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Connect directly with our engineering directorate for a technical consultation on your {service.title.toLowerCase()} brief.
                </p>

                <div className="space-y-2.5 pt-2">
                  <a
                    href="tel:+2349010753592"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-200 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#12BCEB]" />
                    <span>Call: +234 901 075 3592</span>
                  </a>

                  <a
                    href="https://wa.me/2349010753592"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-xs text-white font-medium transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#063B85] hover:bg-[#0849a6] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <span>Submit Project Drawings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Other Services */}
              <div className="p-6 rounded-2xl bg-[#081D43]/40 border border-white/10 space-y-4">
                <h4 className="font-display-luxury text-sm font-bold uppercase tracking-wider text-slate-200">
                  Related Disciplines
                </h4>
                <div className="space-y-2">
                  {relatedServices.map((r) => (
                    <Link
                      key={r.id}
                      to={`/services/${r.slug}`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-xs text-slate-300 hover:text-white transition-colors group"
                    >
                      <span>{r.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#12BCEB] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Corporate Note */}
              <div className="p-5 rounded-2xl bg-[#06152F] border border-white/10 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <Shield className="w-4 h-4 text-[#078A43]" />
                  <span>Statutory Standards</span>
                </div>
                <p>
                  All engineering drawings and calculations comply strictly with Nigerian National Building Codes and state Town Planning regulations.
                </p>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>
    </div>
  );
};
