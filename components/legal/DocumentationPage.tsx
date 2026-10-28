import React from 'react';
import Breadcrumbs from '../seo/Breadcrumbs';
import MetaTags from '../seo/MetaTags';
import JsonLd from '../seo/JsonLd';
import { getRouteMetadata } from '../../services/seo/metadata';
import { buildArticleSchema } from '../../services/seo/schemaBuilder';
import RelatedGuides from '../seo/RelatedGuides';
import AdUnit from '../ads/AdUnit';
import { BookOpen, Terminal, Network, ShieldCheck, Cpu, Code2 } from 'lucide-react';

interface DocumentationPageProps {
  onNavigate?: (url: string) => void;
}

export const DocumentationPage: React.FC<DocumentationPageProps> = ({ onNavigate }) => {
  const metadata = getRouteMetadata('/docs');
  const schema = buildArticleSchema({
    headline: 'Conduit Open Banking Observability Architecture & Telemetry Guide',
    description: metadata.description,
    url: metadata.canonical,
    authorName: 'Conduit Systems Architecture Group'
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628] font-sans">
      <MetaTags metadata={metadata} />
      <JsonLd id="docs-jsonld" schema={schema} />

      <header className="bg-[#0A1628] text-white py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/20 mb-4 text-xs font-semibold">
            <BookOpen size={12} />
            <span>Developer Specs & Compliance Frameworks</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Technical Architecture Documentation
          </h1>
          <p className="text-sm md:text-base text-[#8B9BB4] max-w-2xl leading-relaxed">
            Comprehensive guide to Open Banking telemetry, eBPF packet capture, partner SLA attribution algorithms, and regulatory audit compliance.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Breadcrumbs
          items={[{ name: 'Resources', url: '/docs' }, { name: 'Documentation', url: '/docs' }]}
          onNavigate={onNavigate}
        />

        {/* AdUnit: Compliant placement on genuine editorial content */}
        <AdUnit currentPath="/docs" hasContent={true} slotId="docs-top-banner" />

        <article className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm mt-6 space-y-10 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-4 flex items-center gap-2">
              <Network className="text-[#00B4D8]" size={22} />
              1. The Topology of Open Banking Failures
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              In a standard financial transaction involving Account Aggregators (AAs), Financial Information Providers (FIPs), and Financial Information Users (FIUs), an end-to-end consent journey traverses at least four independent corporate networks. A failure at any single hop—such as an OTP SMS delivery gateway delay or an FIP decryption timeout—results in user drop-off.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Conduit injects lightweight non-intrusive collectors at the application perimeter. By capturing TCP handshake durations, TLS negotiation overhead, and HTTP response header headers (e.g. <code>X-Correlation-ID</code>), Conduit maps every hop deterministically.
            </p>
            <div className="bg-[#0A1628] text-gray-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto space-y-1">
              <p className="text-gray-400">// Conduit Standard Telemetry Event Payload</p>
              <p><span className="text-[#00B4D8]">POST</span> /v1/telemetry/events</p>
              <p>{`{`}</p>
              <p className="pl-4">{`"trace_id": "aa_fip_982348a7b1",`}</p>
              <p className="pl-4">{`"node_type": "ACCOUNT_AGGREGATOR_BRIDGE",`}</p>
              <p className="pl-4">{`"partner_id": "ONEMARKET_AA",`}</p>
              <p className="pl-4">{`"upstream_latency_ms": 348.2,`}</p>
              <p className="pl-4">{`"http_status": 504,`}</p>
              <p className="pl-4">{`"failure_attributed_to": "UPSTREAM_FIP_TIMEOUT",`}</p>
              <p className="pl-4">{`"impacted_aum_inr": 250000.00`}</p>
              <p>{`}`}</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-4 flex items-center gap-2">
              <Cpu className="text-[#00B4D8]" size={22} />
              2. Heuristic Fault Attribution Algorithm
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Traditional monitoring systems emit alerts whenever overall error rates spike, causing panic and finger-pointing among internal teams and external vendors. Conduit employs a bipartite Bayesian attribution graph that contrasts internal service metrics against external partner baseline distributions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-5 rounded-xl border border-gray-100 bg-gray-50">
                <h3 className="font-bold text-[#0A1628] mb-2">Step 1: Baseline Variance</h3>
                <p className="text-gray-600">
                  Calculates rolling 30-minute standard deviation bands for each partner's latency percentiles (P95, P99).
                </p>
              </div>
              <div className="p-5 rounded-xl border border-gray-100 bg-gray-50">
                <h3 className="font-bold text-[#0A1628] mb-2">Step 2: Attribution Isolation</h3>
                <p className="text-gray-600">
                  Correlates error codes (e.g. HTTP 502/504) with TCP RST flags to isolate whether failure occurred before or after the client firewall.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-4 flex items-center gap-2">
              <ShieldCheck className="text-[#00B4D8]" size={22} />
              3. RBI Master Directions Compliance Architecture
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              The <em>Reserve Bank of India Master Direction on Outsourcing of Information Technology Services 2025</em> mandates that Regulated Entities maintain real-time visibility over critical technology vendors, complete with incident logs, recovery time metrics (MTTR), and continuous business continuity testing.
            </p>
            <p className="text-sm text-gray-600">
              Conduit generates automated, cryptographically signed compliance digests ready for supervisory audit. These digests record partner uptime, breach duration, financial exposure, and remediation records without exposing customer transaction credentials.
            </p>
          </section>
        </article>

        {/* AdUnit: Compliant bottom banner on long editorial content */}
        <AdUnit currentPath="/docs" hasContent={true} slotId="docs-bottom-banner" />

        <RelatedGuides currentPath="/docs" onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default DocumentationPage;
