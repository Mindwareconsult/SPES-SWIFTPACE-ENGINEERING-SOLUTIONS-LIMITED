import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { MotionReveal } from '../components/common/MotionReveal';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Send,
  Building
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    email: '',
    phone: '',
    service_required: 'Architecture',
    project_type: 'Commercial',
    project_location: '',
    estimated_budget: 'To be discussed',
    preferred_contact_method: 'WhatsApp',
    project_description: '',
    privacy_consent: true,
    honeypot: '' // Anti-bot trap
  });

  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const services = [
    'Architecture',
    'Building Construction',
    'Civil Engineering',
    'Structural Engineering',
    'Construction Management',
    'Consultancy',
    'Allied Services',
    'Integrated Design-Build',
    'Other'
  ];

  const projectTypes = [
    'Commercial',
    'Residential (Private / Multi-Family)',
    'Industrial & Warehouse',
    'Institutional / Educational / Health',
    'Civic & Infrastructure',
    'Remodeling / Renovation',
    'Other'
  ];

  const budgetRanges = [
    'To be discussed',
    'Below ₦10 million',
    '₦10 million–₦50 million',
    '₦50 million–₦100 million',
    '₦100 million–₦500 million',
    'Above ₦500 million'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.size > 15 * 1024 * 1024) {
        setErrorMessage('File exceeds the 15MB limit. Please upload a smaller document.');
        return;
      }
      setFile(selected);
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, String(val));
      });
      if (file) {
        data.append('attachment', file);
      }

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        body: data
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit enquiry');
      }

      setSuccessMessage(
        'Thank you. Your project brief has been logged directly in our engineering system. A senior director or project engineer will contact you shortly.'
      );
      setFormData({
        full_name: '',
        company_name: '',
        email: '',
        phone: '',
        service_required: 'Architecture',
        project_type: 'Commercial',
        project_location: '',
        estimated_budget: 'To be discussed',
        preferred_contact_method: 'WhatsApp',
        project_description: '',
        privacy_consent: true,
        honeypot: ''
      });
      setFile(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission error. Please check your network and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100 overflow-hidden">
      <SEOHead 
        title="Contact Our Engineering Directorate | SPES Swiftpace Engineering"
        description="Discuss your project with SPES Swiftpace Engineering Solutions Limited in Ado Ekiti, Nigeria. Phone, email, WhatsApp, and project brief form."
        canonicalPath="/contact"
      />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#040D1E] via-[#06152F] to-[#081D43]/60 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <MotionReveal direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#12BCEB]">
              <span className="w-2 h-2 rounded-full bg-[#12BCEB] animate-pulse"></span>
              <span>Direct Client Engagement</span>
            </div>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.1} duration={0.7}>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white leading-tight">
              Let's Discuss Your Next Project
            </h1>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2} duration={0.7}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Tell us about your engineering, architectural or construction requirements. Our team looks forward to understanding your project and exploring how we can assist.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Official Contact Cards & Location */}
          <MotionReveal direction="left" duration={0.8} className="lg:col-span-5 space-y-8">
            
            {/* Headquarters Card */}
            <div className="p-8 rounded-2xl bg-[#081D43] border border-[#12BCEB]/30 space-y-6 shadow-xl">
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <img
                  src="/logo.peg"
                  alt="SPES Swiftpace Engineering Solutions"
                  className="h-16 w-auto object-contain rounded-xl bg-white p-1 border border-white/20 shadow-md"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/assets/spes_logo.jpeg'; }}
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#12BCEB]">Official Company Headquarters</span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    SPES Swiftpace Engineering Solutions Limited
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">Corporate Affairs Commission RC: <strong>8978524</strong></div>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#06152F] text-[#12BCEB] flex-shrink-0 border border-white/5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white mb-0.5">Physical Office Address</div>
                    <address className="not-italic leading-relaxed text-slate-300">
                      Plot 2, Toluwani Street, Peace Avenue, <br />
                      Off Iworoko Road, Ado Ekiti, <br />
                      Ekiti State, Nigeria.
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#06152F] text-[#12BCEB] flex-shrink-0 border border-white/5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white mb-0.5">Official Inquiries Email</div>
                    <a
                      href="mailto:spesengineeringlimited@gmail.com"
                      className="text-slate-300 hover:text-white underline-offset-2 hover:underline font-mono"
                    >
                      spesengineeringlimited@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#06152F] text-[#078A43] flex-shrink-0 border border-white/5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white mb-0.5">Official Telephones</div>
                    <div className="space-y-1 font-mono">
                      <div>
                        <a href="tel:+2349010753592" className="text-slate-200 hover:text-white">
                          +234 901 075 3592
                        </a>{' '}
                        <span className="text-[10px] text-slate-400 font-sans">(Primary Desk)</span>
                      </div>
                      <div>
                        <a href="tel:+2347076365837" className="text-slate-200 hover:text-white">
                          +234 707 636 5837
                        </a>{' '}
                        <span className="text-[10px] text-slate-400 font-sans">(Secondary Line)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 text-emerald-400 flex-shrink-0 border border-emerald-500/30">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white mb-0.5">Instant WhatsApp Consultation</div>
                    <a
                      href="https://wa.me/2349010753592"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 hover:text-emerald-200 underline font-medium"
                    >
                      wa.me/2349010753592
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Ado Ekiti Regional Presence Card */}
            <div className="p-6 rounded-2xl bg-[#081D43]/60 border border-white/10 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-[#12BCEB]" />
                <span>Geographic Scope & Mobilization</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Headquartered strategically along the Iworoko Road development corridor in Ado Ekiti, our technical personnel and construction machinery mobilize rapidly across Ekiti State, South-West Nigeria, and regional infrastructure corridors.
              </p>
              <div className="pt-2 text-[11px] text-[#12BCEB] font-mono">
                Coordinates: 7.6211° N, 5.2215° E (Ado Ekiti)
              </div>
            </div>
          </MotionReveal>

          {/* Right Column: Functional Project Brief & Enquiry Form */}
          <MotionReveal direction="right" duration={0.8} delay={0.15} className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#081D43] border border-white/10 shadow-2xl relative">
              <div className="mb-6 space-y-1">
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Submit a Project Brief
                </h3>
                <p className="text-xs text-slate-400">
                  Please provide preliminary project details. Our registered engineers review all submissions confidentially.
                </p>
              </div>

              {/* Success Notification */}
              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Submission Confirmed</div>
                    <p className="mt-0.5 text-slate-300 leading-relaxed">{successMessage}</p>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Please Review Submission</div>
                    <p className="mt-0.5 text-slate-300 leading-relaxed">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      placeholder="e.g., Dr. Babatunde Adeyemi"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#06152F] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#12BCEB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      placeholder="e.g., Apex Commercial Ventures Ltd"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#06152F] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#12BCEB]"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g., adeyemi@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#06152F] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#12BCEB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number (WhatsApp Preferred) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g., +234 803 123 4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#06152F] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#12BCEB]"
                    />
                  </div>
                </div>

                {/* Service & Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Primary Service Required
                    </label>
                    <select
                      name="service_required"
                      value={formData.service_required}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#06152F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#12BCEB]"
                    >
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Project Type
                    </label>
                    <select
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#06152F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#12BCEB]"
                    >
                      {projectTypes.map((pt) => (
                        <option key={pt} value={pt}>{pt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Project Site Location <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="project_location"
                      required
                      placeholder="e.g., Off Iworoko Road, Ado Ekiti"
                      value={formData.project_location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#06152F] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#12BCEB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Estimated Project Budget (Optional)
                    </label>
                    <select
                      name="estimated_budget"
                      value={formData.estimated_budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#06152F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#12BCEB]"
                    >
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-4">
                    {['WhatsApp', 'Phone Call', 'Email'].map((method) => (
                      <label key={method} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="radio"
                          name="preferred_contact_method"
                          value={method}
                          checked={formData.preferred_contact_method === method}
                          onChange={handleInputChange}
                          className="accent-[#12BCEB]"
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Description & Requirements <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="project_description"
                    required
                    rows={4}
                    placeholder="Describe your site dimensions, desired number of floors, functional spaces, structural questions, or construction timeline..."
                    value={formData.project_description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#06152F] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#12BCEB]"
                  />
                </div>

                {/* Attachment Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Attach Survey Plan / Architectural Drawings (Optional, Max 15MB)
                  </label>
                  <div className="relative border border-dashed border-white/20 rounded-xl p-4 text-center hover:border-[#12BCEB] transition-colors bg-[#06152F]/40">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.webp,.zip,.doc,.docx"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <Upload className="w-5 h-5 text-[#12BCEB]" />
                      <span className="text-xs text-slate-300 font-medium">
                        {file ? file.name : 'Click to select drawings (PDF, DWG, images, ZIP)'}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB selected` : 'Supported: PDF, CAD Drawings, JPG, PNG, DOCX up to 15MB'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Privacy Consent */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="privacy_consent"
                    name="privacy_consent"
                    checked={formData.privacy_consent}
                    onChange={handleCheckboxChange}
                    required
                    className="mt-0.5 accent-[#12BCEB]"
                  />
                  <label htmlFor="privacy_consent" className="text-[11px] text-slate-400 leading-relaxed cursor-pointer">
                    I agree that SPES Swiftpace Engineering Solutions Limited may use the information submitted to respond to my enquiry in accordance with its privacy policy.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] hover:from-[#0849a6] hover:to-[#22ccfb] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#06152F] disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {submitting ? (
                      <span>Transmitting Project Brief...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Brief to Engineering Directorate</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </MotionReveal>
        </div>
      </section>
    </div>
  );
};
