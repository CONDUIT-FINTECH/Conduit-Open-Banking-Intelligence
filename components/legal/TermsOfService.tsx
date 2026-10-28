import React from 'react';
import Breadcrumbs from '../seo/Breadcrumbs';
import MetaTags from '../seo/MetaTags';
import JsonLd from '../seo/JsonLd';
import { getRouteMetadata } from '../../services/seo/metadata';
import { buildArticleSchema } from '../../services/seo/schemaBuilder';
import RelatedGuides from '../seo/RelatedGuides';
import { FileText, Scale, ShieldAlert, CheckCircle } from 'lucide-react';

interface TermsOfServiceProps {
  onNavigate?: (url: string) => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigate }) => {
  const metadata = getRouteMetadata('/terms-of-service');
  const schema = buildArticleSchema({
    headline: 'Conduit Master Terms of Service & API Governance',
    description: metadata.description,
    url: metadata.canonical,
    authorName: 'Conduit Legal Affairs'
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628] font-sans">
      <MetaTags metadata={metadata} />
      <JsonLd id="terms-jsonld" schema={schema} />

      <header className="bg-[#0A1628] text-white py-16 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/20 mb-4 text-xs font-semibold">
            <Scale size={12} />
            <span>Master Service Agreement</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-sm md:text-base text-[#8B9BB4] max-w-2xl leading-relaxed">
            Effective: January 1, 2026. Governing enterprise access, API observability integrations, and SLA verification across the Conduit ecosystem.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Breadcrumbs
          items={[{ name: 'Legal', url: '/terms-of-service' }, { name: 'Terms of Service', url: '/terms-of-service' }]}
          onNavigate={onNavigate}
        />

        <article className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm mt-6 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-3 flex items-center gap-2">
              <FileText className="text-[#00B4D8]" size={22} />
              1. Acceptance of Terms
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              By accessing, deploying, or testing the Conduit Observability platform, websites, or documentation hosted at <strong>https://maxcnfront.vercel.app</strong>, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a financial institution, bank, or NBFC, you represent that you possess lawful authority to bind such entity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-3">2. Service Provision & SLA Commitments</h2>
            <p className="text-sm text-gray-600 mb-3">
              Conduit provides non-invasive, financial-grade telemetry, API SLA breach attribution, and AUM risk calculations for Open Banking ecosystems. Enterprise subscriptions are backed by:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50 flex items-start gap-2">
                <CheckCircle size={18} className="text-[#00B4D8] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#0A1628]">99.99% Ingestion Availability</strong>
                  Telemetry ingestion endpoints maintain multi-region high availability with automated edge failover.
                </div>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50 flex items-start gap-2">
                <CheckCircle size={18} className="text-[#00B4D8] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#0A1628]">Sub-Second Incident Attribution</strong>
                  Root cause partner classification executes in under 2.3 minutes with deterministic forensic audit trails.
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-3">3. Acceptable Use & Security Guardrails</h2>
            <p className="text-sm text-gray-600 mb-3">
              Users shall not:
            </p>
            <ul className="text-xs md:text-sm text-gray-600 list-disc pl-5 space-y-2">
              <li>Reverse engineer, decompile, or extract the proprietary LSTM failure prediction heuristics or simulation models.</li>
              <li>Inject unauthorized traffic, synthetic load tests, or automated scraping against non-public API endpoints without written authorization.</li>
              <li>Attempt to circumvent the route-level ad isolation, authentication barriers, or security token verifiers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-3 flex items-center gap-2">
              <ShieldAlert className="text-amber-500" size={22} />
              4. Limitation of Liability
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Conduit provides observability telemetry and heuristic breach modeling. While our algorithms provide forensic attribution, Conduit is not liable for indirect, consequential, or punitive damages resulting from partner-side bank gateway outages, Account Aggregator network partitions, or third-party cloud infrastructure downtimes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-3">5. Governing Law and Jurisdiction</h2>
            <p className="text-sm text-gray-600 mb-3">
              These Terms shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka, India.
            </p>
          </section>
        </article>

        <RelatedGuides currentPath="/terms-of-service" onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default TermsOfService;
