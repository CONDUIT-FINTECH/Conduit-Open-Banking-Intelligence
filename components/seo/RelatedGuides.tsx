import React from 'react';
import { ArrowRight, BookOpen, Shield, Zap, Activity, FileText } from 'lucide-react';

interface RelatedGuidesProps {
  currentPath: string;
  onNavigate?: (url: string) => void;
}

interface GuideItem {
  title: string;
  category: string;
  url: string;
  excerpt: string;
  icon: React.ReactNode;
}

const ALL_GUIDES: GuideItem[] = [
  {
    title: 'API Health Monitoring & UPI Node Latency',
    category: 'Telemetry & Observability',
    url: '/solutions/api-health',
    excerpt: 'How real-time synthetic pings prevent silent timeouts across Account Aggregators.',
    icon: <Activity size={18} className="text-[#00B4D8]" />
  },
  {
    title: 'SLA Scorecards & Partner Breach Governance',
    category: 'Regulatory Compliance',
    url: '/solutions/sla-governance',
    excerpt: 'Automating contract compliance, uptime calculation, and credit recovery workflows.',
    icon: <Shield size={18} className="text-[#10B981]" />
  },
  {
    title: 'Revenue Shield: Quantifying AUM at Risk',
    category: 'Financial Modeling',
    url: '/solutions/revenue-shield',
    excerpt: 'Calculating the rupee-cost of failed micro-transactions in digital mutual funds.',
    icon: <Zap size={18} className="text-[#EF4444]" />
  },
  {
    title: 'Interactive API Failure Cost Calculator',
    category: 'Analysis Tool',
    url: '/tools/roi-calculator',
    excerpt: 'Estimate annual revenue leakage with our transparent Open Banking loss model.',
    icon: <BookOpen size={18} className="text-[#8B5CF6]" />
  },
  {
    title: 'Conduit Architectural & Compliance Documentation',
    category: 'Developer Specs',
    url: '/docs',
    excerpt: 'Telemetry schemas, webhook specifications, and RBI master directions mapping.',
    icon: <FileText size={18} className="text-[#64748B]" />
  }
];

export const RelatedGuides: React.FC<RelatedGuidesProps> = ({ currentPath, onNavigate }) => {
  const filtered = ALL_GUIDES.filter(g => g.url !== currentPath).slice(0, 3);

  const handleClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(url);
    } else {
      window.history.pushState({}, '', url);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section className="my-16 pt-12 border-t border-gray-100">
      <div className="mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#00B4D8] mb-2">Related Intelligence</h3>
        <h4 className="text-2xl font-bold tracking-tight text-[#0A1628]">Explore Connected Open Banking Architecture</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(guide => (
          <a
            key={guide.url}
            href={guide.url}
            onClick={(e) => handleClick(e, guide.url)}
            className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#00B4D8]/40 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-[#00B4D8]/10 transition-colors">
                  {guide.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {guide.category}
                </span>
              </div>
              <h5 className="text-base font-bold text-[#0A1628] group-hover:text-[#00B4D8] transition-colors mb-2 leading-snug">
                {guide.title}
              </h5>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                {guide.excerpt}
              </p>
            </div>
            <span className="inline-flex items-center text-xs font-bold text-[#00B4D8] gap-1 group-hover:gap-2 transition-all mt-2">
              Read Guide <ArrowRight size={14} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default RelatedGuides;
