import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  Lock,
  ChevronRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#040D1E] text-slate-300 border-t border-[#12BCEB]/20 pt-16 pb-12 overflow-hidden">
      {/* Decorative architectural grid background overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#12BCEB 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Overview (2 cols on large) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-3">
              SPES Swiftpace Engineering Solutions Limited is an engineering, architecture, building construction, and technical consultancy firm providing integrated solutions designed to shape functional, durable, and sustainable built environments.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#078A43]" />
              <span>Incorporated in the Federal Republic of Nigeria · <strong className="text-slate-200">RC: 8978524</strong></span>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://wa.me/2349010753592"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Staff Portal</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div>
            <h4 className="font-display-luxury text-sm font-bold tracking-wider uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12BCEB]"></span>
              Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services/architecture" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Architecture</span>
                </Link>
              </li>
              <li>
                <Link to="/services/building-construction" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Building Construction</span>
                </Link>
              </li>
              <li>
                <Link to="/services/civil-structural-engineering" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Civil & Structural</span>
                </Link>
              </li>
              <li>
                <Link to="/services/construction-management" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Construction Management</span>
                </Link>
              </li>
              <li>
                <Link to="/services/consultancy" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Technical Consultancy</span>
                </Link>
              </li>
              <li>
                <Link to="/services/allied-services" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Allied Services</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="font-display-luxury text-sm font-bold tracking-wider uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#078A43]"></span>
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>About Our Firm</span>
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Project Portfolio</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Engineering Insights</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Frequently Asked Questions</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Request a Consultation</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-[#12BCEB] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office Details */}
          <div>
            <h4 className="font-display-luxury text-sm font-bold tracking-wider uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12BCEB]"></span>
              Head Office
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#12BCEB] flex-shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  Plot 2, Toluwani Street, Peace Avenue, Off Iworoko Road, Ado Ekiti, Ekiti State, Nigeria.
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#12BCEB] flex-shrink-0" />
                <a
                  href="mailto:spesengineeringlimited@gmail.com"
                  className="hover:text-white transition-colors underline-offset-2 hover:underline truncate"
                >
                  spesengineeringlimited@gmail.com
                </a>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#078A43] flex-shrink-0" />
                  <a href="tel:+2349010753592" className="hover:text-white font-mono transition-colors">
                    +234 901 075 3592
                  </a>
                </div>
                <div className="flex items-center gap-2.5 pl-6.5">
                  <a href="tel:+2347076365837" className="hover:text-white font-mono transition-colors">
                    +234 707 636 5837
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-[#12BCEB] hover:text-white font-semibold transition-colors group"
                >
                  <span>Submit an engineering brief</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {currentYear} SPES Swiftpace Engineering Solutions Limited (RC: 8978524). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms of Engagement
            </Link>
            <span>·</span>
            <Link to="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <span>·</span>
            <Link to="/admin/login" className="hover:text-[#12BCEB] transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
