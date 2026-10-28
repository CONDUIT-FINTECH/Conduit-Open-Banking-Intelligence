import React from 'react';
import Breadcrumbs from '../seo/Breadcrumbs';
import MetaTags from '../seo/MetaTags';
import JsonLd from '../seo/JsonLd';
import { getRouteMetadata } from '../../services/seo/metadata';
import { buildArticleSchema } from '../../services/seo/schemaBuilder';
import RelatedGuides from '../seo/RelatedGuides';
import AdUnit from '../ads/AdUnit';
import { Activity, Shield, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface SolutionPageProps {
  slug: 'api-health' | 'sla-governance' | 'revenue-shield';
  onNavigate?: (url: string) => void;
  onEnterApp?: () => void;
}

const SOLUTION_CONTENT = {
  'api-health': {
    title: 'API Health Monitoring & Real-Time Latency Intelligence',
    badge: 'Telemetry Rail',
    icon: <Activity className="text-[#00B4D8]" size={24} />,
    description: 'Active and passive telemetry monitoring across every Account Aggregator bridge, payment gateway switch, and FIP node in your open banking supply chain.',
    points: [
      'Sub-millisecond packet-level monitoring using eBPF and lightweight edge sidecars.',
      'Synthetic ping probes verifying TLS certificates, DNS resolution, and HTTP 200 payload validity.',
      'Automated P95 and P99 latency anomaly detection alerting teams before transaction drop-offs surge.',
      'Full visibility into RBI-regulated Account Aggregator consent journeys and timeout distributions.'
    ],
    editorial1: `In open banking environments, traditional end-to-end telemetry often obscures where delays occur. When an end-user attempts an account aggregation journey, requests hop between Financial Information Users (FIUs), Account Aggregators (AAs), and Financial Information Providers (FIPs). If an FIP bank node experiences database locks during peak evening hours, transactions fail silently with generic timeout errors.`,
    editorial2: `Conduit provides continuous, high-fidelity monitoring by correlating distributed trace IDs across partner boundaries. By benchmarking partner response latencies against historical baselines, Conduit immediately indicates whether latency spikes originate from your internal microservices or an external banking partner.`
  },
  'sla-governance': {
    title: 'Partner SLA Scorecards & Automated Breach Tracking',
    badge: 'Governance & Compliance',
    icon: <Shield className="text-[#10B981]" size={24} />,
    description: 'Automated contract enforcement and SLA breach attribution across bank gateways, KYC providers, and Account Aggregators with automated credit calculations.',
    points: [
      'Continuous uptime verification eliminating vendor disputes during monthly reconciliation.',
      'Automatic attribution of downtime hours directly mapped to master service agreement (MSA) penalties.',
      'RBI IT Outsourcing Master Directions 2025 compliant audit logs ready for supervisory inspections.',
      'Granular performance benchmarking across multiple competing partner banks and payment switches.'
    ],
    editorial1: `Enterprise financial agreements specify rigorous Service Level Agreements (typically 99.9% to 99.99% monthly availability). However, when month-end arrives, vendors present their own internal status dashboards claiming 100% uptime, while your operations team registered hundreds of customer support tickets for failed API calls.`,
    editorial2: `Conduit’s SLA Scorecard serves as an independent, cryptographic source of truth. Every connection attempt, response duration, and HTTP status code is timestamped and recorded in immutable audit logs. When partner latency exceeds contractual thresholds, Conduit automatically compiles penalty credit claims.`
  },
  'revenue-shield': {
    title: 'Revenue Shield: Quantifying AUM Leakage & Financial Impact',
    badge: 'Financial Impact Engine',
    icon: <Zap className="text-[#EF4444]" size={24} />,
    description: 'Bridge the gap between infrastructure metrics and Rupees. Quantify API downtime in ₹ Crore and protect recurring digital wealth revenue flows.',
    points: [
      'Real-time translation of technical API drop-offs into ₹ Crore financial exposure.',
      'Segmentation by product line: Mutual Fund SIPs, digital lending origination, and instant UPI transfers.',
      'Automated circuit-breakers triggering dynamic failover to backup partner bridges before losses mount.',
      'Executive dashboards synchronizing CTO, CFO, and Chief Risk Officer priorities.'
    ],
    editorial1: `In wealth management and digital banking, user drop-offs directly impact Assets Under Management (AUM) and lifetime customer value. An abandoned mutual fund SIP setup or delayed loan verification often means the customer never returns. Traditional APM dashboards count 'errors per second,' which fails to communicate enterprise urgency.`,
    editorial2: `Conduit Revenue Shield connects API telemetry directly to product revenue models. When an API connection degrades, the engine calculates the estimated rupee value of at-risk transactions, empowering risk officers to make informed traffic re-routing decisions in real time.`
  }
};

export const SolutionPage: React.FC<SolutionPageProps> = ({ slug, onNavigate, onEnterApp }) => {
  const currentPath = `/solutions/${slug}`;
  const metadata = getRouteMetadata(currentPath);
  const data = SOLUTION_CONTENT[slug];

  const schema = buildArticleSchema({
    headline: data.title,
    description: metadata.description,
    url: metadata.canonical,
    authorName: 'Conduit Financial Architecture Team'
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628] font-sans">
      <MetaTags metadata={metadata} />
      <JsonLd id={`solution-${slug}-jsonld`} schema={schema} />

      <header className="bg-[#0A1628] text-white py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/20 mb-4 text-xs font-semibold">
            {data.icon}
            <span>{data.badge}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {data.title}
          </h1>
          <p className="text-sm md:text-base text-[#8B9BB4] max-w-2xl leading-relaxed">
            {data.description}
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Breadcrumbs
          items={[
            { name: 'Solutions', url: '/docs' },
            { name: data.badge, url: currentPath }
          ]}
          onNavigate={onNavigate}
        />

        <AdUnit currentPath={currentPath} hasContent={true} slotId={`solution-${slug}-top`} />

        <article className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm mt-6 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-4">Architecture Overview</h2>
            <p className="text-sm text-gray-600 mb-4">{data.editorial1}</p>
            <p className="text-sm text-gray-600 mb-6">{data.editorial2}</p>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3">
              <h3 className="text-sm font-bold text-[#0A1628] uppercase tracking-wider">
                Key Technical Capabilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-gray-700">
                {data.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#00B4D8] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#0A1628] to-[#1E293B] text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Ready to monitor your banking APIs?</h3>
              <p className="text-xs text-gray-300">
                Schedule an architecture audit or explore live telemetry in our enterprise sandbox.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onEnterApp}
                className="px-6 py-3 rounded-xl bg-[#00B4D8] text-[#0A1628] font-bold text-xs uppercase tracking-wider hover:bg-[#0096b4] transition-colors"
              >
                Access Sandbox
              </button>
            </div>
          </section>
        </article>

        <AdUnit currentPath={currentPath} hasContent={true} slotId={`solution-${slug}-bottom`} />

        <RelatedGuides currentPath={currentPath} onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default SolutionPage;
