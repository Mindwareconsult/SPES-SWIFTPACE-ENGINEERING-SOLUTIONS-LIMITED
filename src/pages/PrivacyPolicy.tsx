import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Shield, ChevronRight, Lock, FileCheck } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100">
      <SEOHead 
        title="Privacy Policy | SPES Swiftpace Engineering Solutions"
        description="Privacy policy and data protection disclosures for SPES Swiftpace Engineering Solutions Limited in compliance with Nigerian Data Protection regulations."
        canonicalPath="/privacy-policy"
      />

      <section className="pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-[#040D1E] border-b border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#12BCEB]">Privacy Policy</span>
          </nav>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Last Updated: March 2026 · SPES Swiftpace Engineering Solutions Limited (RC: 8978524)
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <div className="p-6 rounded-2xl bg-[#081D43]/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Shield className="w-4 h-4 text-[#078A43]" />
            <span>Commitment to Data Privacy</span>
          </div>
          <p>
            SPES Swiftpace Engineering Solutions Limited ("SPES", "we", "us", or "our") respects the privacy of our clients, prospective project owners, partners, and website visitors. This Privacy Policy details our practices concerning the collection, storage, use, and protection of personal data in accordance with the Nigeria Data Protection Act (NDPA) and applicable corporate regulations.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-white">
            1. Information We Collect
          </h2>
          <p>
            When you interact with our website, request a consultation, or submit a project brief through our online portal, we may collect the following categories of information:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong>Personal Contact Data:</strong> Full name, email address, telephone numbers, and preferred contact channels.</li>
            <li><strong>Corporate Data:</strong> Company or organization name, registered business details, and official roles.</li>
            <li><strong>Project & Site Specifications:</strong> Project type, site location, estimated budget parameters, scope descriptions, and proposed construction timelines.</li>
            <li><strong>Technical Attachments:</strong> Architectural sketches, survey plans, CAD/DWG drawings, and project documents voluntarily uploaded through our contact portal.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-white">
            2. Purpose of Data Processing
          </h2>
          <p>
            We process your personal and project information exclusively for genuine commercial and engineering purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>To evaluate your engineering brief and formulate tailored technical proposals or Bills of Quantities.</li>
            <li>To initiate direct communications via telephone, email, or WhatsApp regarding your consultation request.</li>
            <li>To perform site inspections, constructability reviews, and geotechnical/statutory feasibility checks.</li>
            <li>To fulfill statutory reporting and record-keeping requirements under Nigerian law.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-white">
            3. Protection and Handling of Technical Drawings
          </h2>
          <p>
            All architectural concepts, engineering calculations, and proprietary site survey documents uploaded to our servers are treated with strict confidentiality. Files are stored on secure persistent servers and are accessible only by authorized engineering directors and project managers assigned to your project review. We do not sell, rent, or trade your technical documents to third parties.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-white">
            4. Data Retention
          </h2>
          <p>
            We retain contact and project records only for the period necessary to fulfill the operational purposes described in this policy, or as mandated by Nigerian contractual and engineering liability limitation statutes.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-white">
            5. Your Data Protection Rights
          </h2>
          <p>
            Under the Nigeria Data Protection Act, you possess the right to request access to your personal data held by us, request correction of inaccurate records, or request deletion of preliminary inquiry data where no binding construction contract exists.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#081D43] border border-white/10 space-y-2">
          <div className="font-bold text-white text-sm">Privacy Inquiries Contact</div>
          <p>
            If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our Data Governance Officer at:
          </p>
          <div className="pt-1 text-xs space-y-1 font-mono text-[#12BCEB]">
            <div>Email: spesengineeringlimited@gmail.com</div>
            <div>Telephone: +234 901 075 3592 / +234 707 636 5837</div>
            <div className="font-sans text-slate-300">Plot 2, Toluwani Street, Peace Avenue, Off Iworoko Road, Ado Ekiti, Nigeria.</div>
          </div>
        </div>
      </section>
    </div>
  );
};
