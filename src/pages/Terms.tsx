import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { ChevronRight, FileCheck, Shield } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100">
      <SEOHead 
        title="Terms & Conditions | SPES Swiftpace Engineering Solutions"
        description="Terms of corporate engagement and website usage for SPES Swiftpace Engineering Solutions Limited RC:8978524."
        canonicalPath="/terms-and-conditions"
      />

      <section className="pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-[#040D1E] border-b border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#12BCEB]">Terms & Conditions</span>
          </nav>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            Terms & Conditions of Engagement
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Corporate Operating Protocols · SPES Swiftpace Engineering Solutions Limited (RC: 8978524)
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-white">
            1. Corporate Identity and Regulatory Scope
          </h2>
          <p>
            This website is owned and operated by SPES Swiftpace Engineering Solutions Limited (RC: 8978524), a company incorporated in the Federal Republic of Nigeria with its principal corporate address at Plot 2, Toluwani Street, Peace Avenue, Off Iworoko Road, Ado Ekiti, Ekiti State. By accessing this website or submitting project briefs, you agree to these Terms and Conditions.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-white">
            2. Engineering Consultations & Proposals
          </h2>
          <p>
            Information displayed on this website is for informational and preliminary advisory purposes. An online enquiry or preliminary consultation does not constitute a formal contract for works. Formal engineering design, structural calculations, and building construction contracts require a mutually executed Service Agreement and certified Bill of Quantities.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-white">
            3. Intellectual Property of Engineering Blueprints
          </h2>
          <p>
            All architectural drawings, 3D renderings, structural calculations, CAD models, and technical specifications produced by SPES Swiftpace Engineering Solutions Limited remain the intellectual property of the company until full contractual settlement is executed in accordance with project agreements. Unauthorized replication or submission of our unreleased blueprints to third-party contractors is strictly prohibited.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-white">
            4. Statutory Permitting and Approvals
          </h2>
          <p>
            While SPES prepares architectural and structural packages conforming to statutory codes, final statutory building permits are granted by relevant state ministries and town planning authorities. Project owners are obligated to supply authentic land ownership documentation and certified survey plans required for statutory submission.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-white">
            5. Governing Law and Jurisdiction
          </h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any legal disputes arising out of website usage or professional engineering engagements shall be subject to the jurisdiction of the competent courts of Ekiti State, Nigeria.
          </p>
        </div>
      </section>
    </div>
  );
};
