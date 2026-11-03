import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { MotionReveal } from '../components/common/MotionReveal';
import { servicesData } from '../data/servicesData';
import { 
  ArrowRight, 
  Compass, 
  Building2, 
  Boxes, 
  ClipboardCheck, 
  Briefcase, 
  Wrench,
  CheckCircle2
} from 'lucide-react';

export const Services: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100 overflow-hidden">
      <SEOHead 
        title="Our Engineering & Construction Services | SPES Swiftpace Engineering"
        description="Explore the six core engineering and architectural disciplines offered by SPES Swiftpace Engineering Solutions Limited in Nigeria."
        canonicalPath="/services"
      />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#040D1E] via-[#06152F] to-[#081D43]/60 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <MotionReveal direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
              <span className="w-2 h-2 rounded-full bg-[#12BCEB] animate-pulse"></span>
              <span>Comprehensive Built Environment Capabilities</span>
            </div>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.1} duration={0.7}>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white leading-tight">
              Our Engineering & Construction Services
            </h1>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2} duration={0.7}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Integrated professional services designed to support projects from concept development and technical planning through construction coordination and delivery.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Services List / Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
        {servicesData.map((service, index) => {
          const Icon = getIcon(service.id);
          const isEven = index % 2 === 1;

          return (
            <div
              key={service.id}
              id={service.slug}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image side */}
              <MotionReveal
                direction={isEven ? 'right' : 'left'}
                duration={0.8}
                className={`lg:col-span-6 ${isEven ? 'lg:order-2' : ''}`}
              >
                <div className="relative rounded-2xl overflow-hidden border border-[#12BCEB]/30 shadow-2xl group">
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06152F] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#06152F]/90 text-[#12BCEB] border border-white/10 backdrop-blur-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
                      Discipline 0{index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>
              </MotionReveal>

              {/* Text side */}
              <MotionReveal
                direction={isEven ? 'left' : 'right'}
                duration={0.8}
                delay={0.15}
                className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-1' : ''}`}
              >
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#078A43]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#078A43]"></span>
                  <span>SPES Technical Division</span>
                </div>

                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {service.title}
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {service.detailedOverview}
                </p>

                {/* Capabilities list */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#12BCEB]">
                    Key Capabilities Include:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {service.capabilities.slice(0, 4).map((cap, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#12BCEB] flex-shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-cyan-500/20 transition-all hover:translate-x-0.5"
                  >
                    <span>View Full Service Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
                  >
                    <span>Request Quotation</span>
                  </Link>
                </div>
              </MotionReveal>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-[#06152F] via-[#081D43] to-[#06152F] border-t border-white/10 text-center">
        <MotionReveal direction="up" className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            Need Multiple Engineering Services Integrated?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            SPES Swiftpace specializes in unified design-build coordination, bringing architecture, structural engineering, and construction management under single-point responsibility.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              <span>Discuss an Integrated Brief</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </MotionReveal>
      </section>
    </div>
  );
};
