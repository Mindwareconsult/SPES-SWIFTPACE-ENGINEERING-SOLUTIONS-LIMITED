import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Phone, 
  ArrowRight,
  Compass,
  Building2,
  Boxes,
  ClipboardCheck,
  Briefcase,
  Wrench
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const serviceLinks = [
    { name: 'Architecture', href: '/services/architecture', icon: Compass, desc: 'Concept planning, 3D designs, and blueprints' },
    { name: 'Building Construction', href: '/services/building-construction', icon: Building2, desc: 'Turnkey residential and commercial construction' },
    { name: 'Civil & Structural Engineering', href: '/services/civil-structural-engineering', icon: Boxes, desc: 'Foundation engineering, load analysis, and concrete works' },
    { name: 'Construction Management', href: '/services/construction-management', icon: ClipboardCheck, desc: 'Schedule tracking, quality audits, and contractor coordination' },
    { name: 'Consultancy', href: '/services/consultancy', icon: Briefcase, desc: 'Technical feasibility and engineering advisory' },
    { name: 'Allied Services', href: '/services/allied-services', icon: Wrench, desc: 'Facility maintenance and specialized technical works' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#06152F]/95 backdrop-blur-md border-b border-[#12BCEB]/20 py-3 shadow-xl'
            : 'bg-gradient-to-b from-[#06152F]/90 via-[#06152F]/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <BrandLogo size={isScrolled ? 'sm' : 'md'} />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-[#12BCEB]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive('/about')
                    ? 'text-[#12BCEB]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                About Us
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <Link
                  to="/services"
                  className={`inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors py-2 ${
                    isActive('/services')
                      ? 'text-[#12BCEB]'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-[#12BCEB]' : 'text-slate-400'
                    }`}
                  />
                </Link>

                {/* Dropdown Menu */}
                {servicesDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-96 rounded-2xl bg-[#081D43] border border-[#12BCEB]/30 p-3 shadow-2xl backdrop-blur-xl animate-in fade-in duration-150">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#12BCEB] px-3 py-1.5 border-b border-white/10 mb-2">
                      Core Engineering Disciplines
                    </div>
                    <div className="space-y-1">
                      {serviceLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                          >
                            <div className="p-2 rounded-lg bg-[#06152F] text-[#12BCEB] group-hover:bg-[#12BCEB] group-hover:text-[#06152F] transition-colors flex-shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-white group-hover:text-[#12BCEB] transition-colors">
                                {item.name}
                              </div>
                              <div className="text-[11px] text-slate-400 line-clamp-1">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/10 text-center">
                      <Link
                        to="/services"
                        className="text-xs text-[#12BCEB] hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <span>View All Services</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/portfolio"
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive('/portfolio') || isActive('/projects')
                    ? 'text-[#12BCEB]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                Portfolio
              </Link>

              <Link
                to="/blog"
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive('/blog')
                    ? 'text-[#12BCEB]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                Blog
              </Link>

              <Link
                to="/contact"
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive('/contact')
                    ? 'text-[#12BCEB]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Right Action CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+2349010753592"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                title="Call SPES Engineering Desk"
              >
                <Phone className="w-3.5 h-3.5 text-[#12BCEB]" />
                <span className="font-mono text-xs">+234 901 075 3592</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#063B85] to-[#12BCEB] hover:from-[#0849a6] hover:to-[#22ccfb] text-white text-xs font-semibold tracking-wider uppercase shadow-md shadow-[#06152F] hover:shadow-cyan-500/20 transition-all duration-300 group border border-white/20"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-3">
              <Link
                to="/contact"
                className="px-3 py-1.5 rounded-lg bg-[#063B85] text-white text-xs font-semibold"
              >
                Quote
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-white/5 text-slate-200 hover:text-white border border-white/10"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#06152F]/98 backdrop-blur-2xl flex flex-col p-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <BrandLogo size="sm" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            <Link
              to="/"
              className="block text-lg font-semibold text-slate-200 hover:text-[#12BCEB]"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-lg font-semibold text-slate-200 hover:text-[#12BCEB]"
            >
              About Us
            </Link>

            <div className="pt-2 pb-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#12BCEB] mb-2">
                Our Services
              </div>
              <div className="pl-3 space-y-2.5 border-l border-white/10">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    className="block text-sm text-slate-300 hover:text-white"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/portfolio"
              className="block text-lg font-semibold text-slate-200 hover:text-[#12BCEB]"
            >
              Portfolio & Projects
            </Link>
            <Link
              to="/blog"
              className="block text-lg font-semibold text-slate-200 hover:text-[#12BCEB]"
            >
              Insights & Blog
            </Link>
            <Link
              to="/faq"
              className="block text-lg font-semibold text-slate-200 hover:text-[#12BCEB]"
            >
              Frequently Asked Questions
            </Link>
            <Link
              to="/contact"
              className="block text-lg font-semibold text-slate-200 hover:text-[#12BCEB]"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href="tel:+2349010753592"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 text-slate-200 text-xs font-medium"
            >
              <Phone className="w-4 h-4 text-[#12BCEB]" />
              <span>Call: +234 901 075 3592</span>
            </a>

            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold uppercase tracking-wider"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
