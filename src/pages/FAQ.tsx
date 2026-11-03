import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { MotionReveal, StaggerContainer, StaggerItem } from '../components/common/MotionReveal';
import { faqData } from '../data/faqData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All Questions');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-1': true, 'faq-6': true });

  const categories = ['All Questions', 'Company Information', 'Services', 'Project Engagement', 'General Enquiries'];

  const filteredFaqs = activeCategory === 'All Questions'
    ? faqData
    : faqData.filter((f) => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100 overflow-hidden">
      <SEOHead 
        title="Frequently Asked Questions | SPES Swiftpace Engineering"
        description="Comprehensive answers to 20 frequently asked questions about SPES Swiftpace Engineering Solutions Limited, our services, locations, and engagements."
        canonicalPath="/faq"
      />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#040D1E] via-[#06152F] to-[#081D43]/60 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <MotionReveal direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
              <span className="w-2 h-2 rounded-full bg-[#12BCEB] animate-pulse"></span>
              <span>Client Resource & Knowledgebase</span>
            </div>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.1} duration={0.7}>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white leading-tight">
              Frequently Asked Questions
            </h1>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2} duration={0.7}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Find immediate clarity on our corporate background, engineering disciplines, project engagement workflows, and quotation procedures.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="border-b border-white/10 bg-[#081D43]/50 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto py-3 flex items-center justify-start sm:justify-center gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#12BCEB] text-[#06152F] shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-4">
        <StaggerContainer key={activeCategory} className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <StaggerItem key={faq.id}>
                <div
                  className="rounded-2xl bg-[#081D43]/60 border border-white/10 hover:border-[#12BCEB]/30 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left font-semibold text-sm sm:text-base text-white hover:text-[#12BCEB] transition-colors gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#12BCEB] flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                      <p>{faq.answer}</p>
                      <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                        <span>Category: {faq.category}</span>
                      </div>
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Unresolved Question Callout */}
        <MotionReveal direction="up" delay={0.2} className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#06152F] to-[#081D43] border border-[#12BCEB]/30 text-center space-y-4">
          <HelpCircle className="w-8 h-8 text-[#12BCEB] mx-auto" />
          <h3 className="font-serif-luxury text-2xl font-bold text-white">
            Have a Specific Engineering Question Not Listed Here?
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Our engineering desk is accessible by phone, email, and WhatsApp for tailored consultations on your structural drawings, site conditions, or commercial designs.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-cyan-500/20 transition-all"
            >
              Contact Our Directorate
            </Link>
            <a
              href="https://wa.me/2349010753592"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Hotline</span>
            </a>
          </div>
        </MotionReveal>
      </section>
    </div>
  );
};
