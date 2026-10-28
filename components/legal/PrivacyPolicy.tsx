import React from 'react';
import Breadcrumbs from '../seo/Breadcrumbs';
import MetaTags from '../seo/MetaTags';
import JsonLd from '../seo/JsonLd';
import { getRouteMetadata } from '../../services/seo/metadata';
import { buildArticleSchema } from '../../services/seo/schemaBuilder';
import RelatedGuides from '../seo/RelatedGuides';
import { Shield, Lock, FileCheck, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigate?: (url: string) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  const metadata = getRouteMetadata('/privacy-policy');
  const schema = buildArticleSchema({
    headline: 'Conduit Privacy Policy & Cookie Disclosure',
    description: metadata.description,
    url: metadata.canonical,
    authorName: 'Conduit Compliance Office'
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628] font-sans">
      <MetaTags metadata={metadata} />
      <JsonLd id="privacy-jsonld" schema={schema} />

      {/* Header */}
      <header className="bg-[#0A1628] text-white py-16 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/20 mb-4 text-xs font-semibold">
            <Lock size={12} />
            <span>Compliance & Legal Transparency</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Privacy Policy & Cookie Disclosure
          </h1>
          <p className="text-sm md:text-base text-[#8B9BB4] max-w-2xl leading-relaxed">
            Effective Date: January 1, 2026 | Last Updated: October 28, 2026. Compliant with Digital Personal Data Protection (DPDP) Rules 2025 and Google AdSense Publisher Policies.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Breadcrumbs
          items={[{ name: 'Legal', url: '/privacy-policy' }, { name: 'Privacy Policy', url: '/privacy-policy' }]}
          onNavigate={onNavigate}
        />

        <article className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm mt-6 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-3 flex items-center gap-2">
              <Shield className="text-[#00B4D8]" size={22} />
              1. Introduction & Commitment to Data Privacy
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Conduit Financial Technologies Private Limited (“Conduit”, “we”, “our”, or “us”) operates the enterprise observability platform accessible via <strong>https://maxcnfront.vercel.app</strong>. We are committed to safeguarding personal information collected from visitors, enterprise clients, and stakeholders in full alignment with the <em>Digital Personal Data Protection (DPDP) Rules 2025</em> and the <em>Reserve Bank of India (RBI) IT Outsourcing Master Directions 2025</em>.
            </p>
            <p className="text-sm text-gray-600">
              This Privacy Policy details how we collect, process, store, and protect data, as well as the rights and choices available to you.
            </p>
          </section>

          <section className="bg-sky-50/60 border border-sky-100 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#0A1628] mb-2 flex items-center gap-2">
              <FileCheck className="text-[#00B4D8]" size={20} />
              2. Google AdSense & Third-Party Advertising Disclosures
            </h2>
            <p className="text-sm text-gray-700 mb-3">
              To support educational research, open-source documentation, and industry whitepapers, our website may display contextual advertisements served by <strong>Google AdSense</strong>. As required by Google AdSense Publisher Terms and Program Policies:
            </p>
            <ul className="text-xs md:text-sm text-gray-700 space-y-2.5 list-disc pl-5">
              <li>
                <strong>Third-Party Vendors & Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites across the Internet.
              </li>
              <li>
                <strong>Google DoubleClick DART Cookies:</strong> Google’s use of advertising cookies enables it and its partners to serve ads to users based on their visits to our site and/or other sites on the Internet.
              </li>
              <li>
                <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#00B4D8] underline font-semibold">Google Ads Settings</a>. Alternatively, users may opt out of a third-party vendor’s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#00B4D8] underline font-semibold">www.aboutads.info</a> or the Network Advertising Initiative at <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-[#00B4D8] underline font-semibold">optout.networkadvertising.org</a>.
              </li>
              <li>
                <strong>Non-Content Screen Isolation:</strong> In accordance with Google Publisher Policies, advertisements are strictly suppressed on authentication views, login portals, internal telemetry dashboards, and status screens.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-3">3. Categories of Information Collected</h2>
            <p className="text-sm text-gray-600 mb-3">
              We collect information in two primary categories:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                <h3 className="font-bold text-[#0A1628] mb-1">Directly Provided Information</h3>
                <p className="text-gray-600">
                  When you submit inquiries via our Contact Form or request a platform demo, we collect your name, institutional email, phone number, and organization name.
                </p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                <h3 className="font-bold text-[#0A1628] mb-1">Telemetry & Machine Data</h3>
                <p className="text-gray-600">
                  IP addresses, browser client fingerprints, referring URLs, HTTP request headers, and performance diagnostics collected strictly for network security and rate-limiting.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-3">4. Cookies and Web Beacons</h2>
            <p className="text-sm text-gray-600 mb-3">
              Cookies are small data packets stored on your terminal device. We classify cookies into:
            </p>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#00B4D8] shrink-0 mt-0.5" />
                <div>
                  <strong>Essential Cookies:</strong> Required for CSRF mitigation, session token integrity, and security handshake.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#00B4D8] shrink-0 mt-0.5" />
                <div>
                  <strong>Performance & Analytics Cookies:</strong> Aggregate telemetry to monitor Core Web Vitals, page rendering latencies, and server load distributions.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#00B4D8] shrink-0 mt-0.5" />
                <div>
                  <strong>Advertising & Tracking Cookies:</strong> Deployed exclusively by third-party advertising partners (such as Google) to deliver non-intrusive, compliant contextual advertisements.
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-3">5. Data Subject Rights Under DPDP Act 2025</h2>
            <p className="text-sm text-gray-600 mb-2">
              As a Data Principal under Indian data protection legislation, you are entitled to:
            </p>
            <ul className="text-xs md:text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Request summary and confirmation of personal data undergoing processing.</li>
              <li>Demand correction, completion, or updating of inaccurate data.</li>
              <li>Request erasure of personal information when retention is no longer necessary.</li>
              <li>Nominate another individual in the event of death or incapacity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-3">6. Grievance Officer & Contact Information</h2>
            <p className="text-sm text-gray-600 mb-3">
              If you have inquiries, complaints, or wish to exercise your statutory rights regarding data privacy, contact our designated Grievance Officer:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-xs md:text-sm space-y-1 text-gray-700">
              <p><strong>Officer:</strong> Compliance & Data Protection Officer</p>
              <p><strong>Entity:</strong> Conduit Financial Technologies Private Limited</p>
              <p><strong>Address:</strong> Outer Ring Road, Kadubeesanahalli, Bengaluru, Karnataka 560103, India</p>
              <p><strong>Email:</strong> <a href="mailto:compliance@conduit.financial" className="text-[#00B4D8] underline">compliance@conduit.financial</a></p>
              <p><strong>Telephone:</strong> +91-80-4567-8900</p>
            </div>
          </section>
        </article>

        <RelatedGuides currentPath="/privacy-policy" onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
