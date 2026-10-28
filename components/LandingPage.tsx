import React, { useState } from 'react';
import { 
  Activity, 
  Shield, 
  Zap, 
  ArrowRight, 
  BarChart3, 
  Brain, 
  Network, 
  FileCheck,
  ChevronRight,
  TrendingUp,
  Target,
  Search,
  MessageSquare,
  ShieldCheck,
  Calculator,
  Plus,
  ArrowUpRight,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MetaTags from './seo/MetaTags';
import JsonLd from './seo/JsonLd';
import { getRouteMetadata } from '../services/seo/metadata';
import { buildOrganizationSchema, buildWebSiteSchema } from '../services/seo/schemaBuilder';

interface LandingPageProps {
  onEnter: () => void;
  onNavigate?: (url: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, onNavigate }) => {
  const [aum, setAum] = useState(10000);
  const [failureRate, setFailureRate] = useState(2.5);

  const estimatedLoss = (aum * (failureRate / 100) * 0.15); // Simple logic for demo
  const estimatedROI = (estimatedLoss / 2).toFixed(2);

  const metadata = getRouteMetadata('/');
  const orgSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(url);
    } else {
      window.history.pushState({}, '', url);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const navLinks = [
    { label: 'API Health', url: '/solutions/api-health' },
    { label: 'SLA Performance', url: '/solutions/sla-governance' },
    { label: 'Revenue Shield', url: '/solutions/revenue-shield' },
    { label: 'ROI Calculator', url: '/tools/roi-calculator' },
    { label: 'Documentation', url: '/docs' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0A1628] selection:bg-[#00B4D8] selection:text-white">
      <MetaTags metadata={metadata} />
      <JsonLd id="landing-org-jsonld" schema={orgSchema} />
      <JsonLd id="landing-website-jsonld" schema={webSiteSchema} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0A1628] flex items-center justify-center text-[#00B4D8]">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase">Conduit</span>
          </a>
          
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => (
              <a 
                key={item.label} 
                href={item.url} 
                onClick={(e) => handleLinkClick(e, item.url)}
                className="text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-[#00B4D8] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onEnter}
              className="text-[11px] font-bold uppercase tracking-wider text-[#0A1628] hover:text-[#00B4D8] transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={onEnter}
              className="bg-[#00B4D8] text-[#0A1628] px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-[#00B4D8]/90 transition-all shadow-sm"
            >
              Live Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/20 mb-8">
              <ShieldCheck size={14} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-nowrap">Open Banking Reliability</span>
            </div>
            <h1 className="text-[44px] md:text-[54px] font-extrabold tracking-tight leading-[1.1] mb-6 text-[#0A1628]">
              Protect your AUM from <br /> API failures in real time
            </h1>
            <p className="text-[17px] text-[#8B9BB4] font-medium leading-relaxed mb-8 max-w-xl">
              Conduit monitors every API call across your financial ecosystem, attributes failures to responsible partners, and quantifies revenue leakage in ₹ Crore before your team even opens a ticket.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onEnter}
                className="bg-[#00B4D8] text-[#0A1628] px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-[#0096b4] hover:text-white transition-all shadow-sm"
              >
                Enter Sandbox
              </button>
              <a 
                href="/docs"
                onClick={(e) => handleLinkClick(e, '/docs')}
                className="border border-[#E2E8F0] text-[#0A1628] px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all inline-flex items-center gap-2"
              >
                <span>Read Architecture</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
          
          <div className="bg-[#0A1628] rounded-3xl p-8 aspect-[4/3] relative overflow-hidden flex items-center justify-center border border-white/5 shadow-2xl">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #00B4D8 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
             <div className="relative w-full text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00B4D8] mb-4">REAL-TIME MONITORING</p>
                <div className="flex items-center justify-center gap-12 mb-8">
                   <div className="w-20 h-20 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                      <Zap size={32} className="text-[#00B4D8]" />
                   </div>
                   <div className="w-32 h-1 bg-[#00B4D8]/20 relative">
                     <motion.div 
                       animate={{ left: ['0%', '100%'] }}
                       transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                       className="absolute top-0 w-8 h-full bg-[#00B4D8] shadow-[0_0_10px_#00B4D8]"
                     />
                   </div>
                   <div className="w-20 h-20 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                      <Shield size={32} className="text-white" />
                   </div>
                </div>
                <p className="text-[36px] font-bold text-white tracking-tighter leading-none mb-1">99.98%</p>
                <p className="text-[11px] font-medium text-[#8B9BB4] uppercase tracking-widest">ECOSYSTEM UPTIME</p>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics Bar */}
      <section className="bg-[#0A1628] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <TrustMetric value="₹ 847 Cr" label="AUM Protected" />
          <TrustMetric value="2.3 min" label="Average MTTR" />
          <TrustMetric value="450+" label="Partners Monitored" />
          <TrustMetric value="99.2%" label="Attribution Accuracy" />
        </div>
      </section>

      {/* Module Grid Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#00B4D8] mb-3">Enterprise Modules</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A1628]">Full-Stack API Governance</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModuleCard 
            bgColor="#3B82F6" 
            icon={<Activity />} 
            title="API Health" 
            desc="Monitor live latency across all AA nodes." 
            onClick={(e) => handleLinkClick(e, '/solutions/api-health')}
          />
          <ModuleCard 
            bgColor="#10B981" 
            icon={<BarChart3 />} 
            title="SLA Performance" 
            desc="Track partner compliance & breach history." 
            onClick={(e) => handleLinkClick(e, '/solutions/sla-governance')}
          />
          <ModuleCard 
            bgColor="#EF4444" 
            icon={<Shield />} 
            title="Revenue Impact" 
            desc="Quantify AUM leakage in ₹ Crore." 
            onClick={(e) => handleLinkClick(e, '/solutions/revenue-shield')}
          />
          <ModuleCard 
            bgColor="#F59E0B" 
            icon={<Zap />} 
            title="Incident Control" 
            desc="Manage & resolve incidents end to end." 
            onClick={(e) => handleLinkClick(e, '/docs')}
          />
          <ModuleCard 
            bgColor="#6366F1" 
            icon={<MessageSquare />} 
            title="AI Assistant" 
            desc="Conversational interface for queries." 
            onClick={(e) => handleLinkClick(e, '/docs')}
          />
          <ModuleCard 
            bgColor="#14B8A6" 
            icon={<Brain />} 
            title="AI Actions" 
            desc="Automated remediation & escalation." 
            onClick={(e) => handleLinkClick(e, '/docs')}
          />
          <ModuleCard 
            bgColor="#8B5CF6" 
            icon={<Network />} 
            title="Partner Map" 
            desc="Visualise your supply chain." 
            onClick={(e) => handleLinkClick(e, '/docs')}
          />
          <ModuleCard 
            bgColor="#64748B" 
            icon={<FileCheck />} 
            title="Compliance Alerts" 
            desc="Generate RBI-ready audit reports." 
            onClick={(e) => handleLinkClick(e, '/docs')}
          />
        </div>
      </section>

      {/* How it Works Pipeline */}
      <section className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00B4D8] mb-3">The Logic</h2>
             <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A1628]">Built on Pipeline Integrity</h3>
           </div>
           
           <div className="flex flex-col lg:flex-row items-center gap-4">
             {['Input', 'Monitor', 'Detect', 'Predict', 'Attribute', 'Calculate', 'Output'].map((step, idx) => (
               <React.Fragment key={step}>
                 <div className="flex-1 w-full lg:w-auto p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center lg:text-left hover:border-[#00B4D8] transition-all group">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">0{idx + 1}</span>
                   <h4 className="text-sm font-bold text-[#0A1628] mb-1">{step}</h4>
                   <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Automated execution layer for {step.toLowerCase()} triggers.</p>
                 </div>
                 {idx < 6 && <ChevronRight className="hidden lg:block text-gray-200" size={20} />}
               </React.Fragment>
             ))}
           </div>
        </div>
      </section>

      {/* ROI Calculator Section with Link to Deep Methodology */}
      <section className="py-20 px-6 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-[#0A1628] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B4D8]/10 blur-[100px] pointer-events-none" />
           <div className="relative z-10 space-y-8">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-white">ROI Calculator</h3>
                <p className="text-[#8B9BB4] text-sm font-medium">Quantify your API failure costs and projected ROI</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#8B9BB4]">
                         <span>Digital AUM</span>
                         <span className="text-white">₹ {aum.toLocaleString()} Cr</span>
                      </div>
                      <input 
                        type="range" min="1000" max="100000" step="1000" 
                        value={aum} onChange={(e) => setAum(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00B4D8]"
                      />
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#8B9BB4]">
                         <span>Failure Rate</span>
                         <span className="text-white">{failureRate}%</span>
                      </div>
                      <input 
                        type="range" min="1" max="10" step="0.1" 
                        value={failureRate} onChange={(e) => setFailureRate(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00B4D8]"
                      />
                   </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center gap-4">
                   <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#8B9BB4] mb-1">Annual AUM at Risk</p>
                      <p className="text-3xl md:text-4xl font-extrabold text-red-400 tracking-tight">₹ {estimatedLoss.toFixed(2)} Cr</p>
                   </div>
                   <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                      <div className="text-center border-r border-white/10">
                         <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B9BB4] mb-1">Platform</p>
                         <p className="text-base font-bold text-white">₹ 1 Cr</p>
                      </div>
                      <div className="text-center">
                         <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B9BB4] mb-1">ROI</p>
                         <p className="text-base font-bold text-[#00B4D8]">{estimatedROI}x</p>
                      </div>
                   </div>
                </div>
              </div>

              {/* Link to Standalone Editorial Calculator Guide */}
              <div className="text-center pt-4 border-t border-white/10">
                <a
                  href="/tools/roi-calculator"
                  onClick={(e) => handleLinkClick(e, '/tools/roi-calculator')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00B4D8] hover:text-white transition-colors"
                >
                  <span>Explore Complete Economic Whitepaper & Mathematical Model</span>
                  <ArrowRight size={14} />
                </a>
              </div>
           </div>
        </div>
      </section>

      {/* Client Archetypes */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h3 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-12">Who Uses Conduit</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <ClientCard 
             title="Private Sector Banks" 
             desc="Managing digital wealth journeys and AA API compliance requirements."
             onClick={(e) => handleLinkClick(e, '/solutions/api-health')}
           />
           <ClientCard 
             title="Fintech Platforms" 
             desc="Monitoring FIU API reliability and partner SLA performance metrics."
             onClick={(e) => handleLinkClick(e, '/solutions/sla-governance')}
           />
           <ClientCard 
             title="Asset Mgmt Companies" 
             desc="Tracking distribution API uptime and consent flow completion rates."
             onClick={(e) => handleLinkClick(e, '/solutions/revenue-shield')}
           />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center gap-2"
            >
              <Zap className="text-[#00B4D8]" size={24} fill="currentColor" />
              <span className="text-xl font-black tracking-tighter uppercase">Conduit</span>
            </a>
            <p className="text-sm text-gray-500 font-medium max-w-md leading-relaxed">
              The infrastructure layer for Open Banking reliability in the Indian financial ecosystem. Quantifying latency in Rupees.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <FooterList 
              title="Solutions" 
              items={[
                { label: 'API Health', url: '/solutions/api-health' },
                { label: 'SLA Governance', url: '/solutions/sla-governance' },
                { label: 'Revenue Shield', url: '/solutions/revenue-shield' },
                { label: 'ROI Calculator', url: '/tools/roi-calculator' },
                { label: 'Architecture Specs', url: '/docs' }
              ]}
              onNavigate={handleLinkClick}
            />
            <FooterList 
              title="Company & Legal" 
              items={[
                { label: 'About Us', url: '/about' },
                { label: 'Contact Support', url: '/contact' },
                { label: 'Privacy Policy', url: '/privacy-policy' },
                { label: 'Terms of Service', url: '/terms-of-service' }
              ]}
              onNavigate={handleLinkClick}
            />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
           <p className="font-semibold uppercase tracking-wider">
             Aligned with RBI IT Outsourcing Master Directions 2025 and DPDP Rules 2025
           </p>
           <p className="font-bold">
             © 2026 Conduit Platform. All Rights Reserved.
           </p>
        </div>
      </footer>
    </div>
  );
};

const TrustMetric = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center space-y-1 lg:border-r border-white/10 last:border-0 px-4">
    <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{value}</p>
    <p className="text-[11px] font-bold uppercase tracking-wider text-[#8B9BB4]">{label}</p>
  </div>
);

const ModuleCard = ({ 
  icon, 
  title, 
  desc, 
  bgColor,
  onClick 
}: { 
  icon: React.ReactElement; 
  title: string; 
  desc: string; 
  bgColor: string;
  onClick: (e: React.MouseEvent) => void;
}) => (
  <div 
    onClick={onClick}
    className="bg-white border border-gray-100 p-6 rounded-2xl hover:border-[#00B4D8]/30 transition-all shadow-sm hover:shadow-md group cursor-pointer"
  >
    <div 
      className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4"
      style={{ backgroundColor: bgColor }}
    >
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <h4 className="text-sm font-bold text-[#0A1628] mb-1.5">{title}</h4>
    <p className="text-xs text-gray-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const ClientCard = ({ 
  title, 
  desc,
  onClick
}: { 
  title: string; 
  desc: string;
  onClick: (e: React.MouseEvent) => void;
}) => (
  <div className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all flex flex-col justify-between">
    <div>
      <h4 className="text-lg font-bold text-[#0A1628] mb-2">{title}</h4>
      <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">{desc}</p>
    </div>
    <button 
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00B4D8] hover:gap-2.5 transition-all text-left"
    >
      <span>Explore Architecture</span>
      <ChevronRight size={14} />
    </button>
  </div>
);

const FooterList = ({ 
  title, 
  items,
  onNavigate
}: { 
  title: string; 
  items: Array<{ label: string; url: string }>;
  onNavigate: (e: React.MouseEvent, url: string) => void;
}) => (
  <div className="space-y-4">
    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A1628]">{title}</h4>
    <div className="flex flex-col gap-2.5">
      {items.map(item => (
        <a 
          key={item.label} 
          href={item.url} 
          onClick={(e) => onNavigate(e, item.url)}
          className="text-xs text-gray-500 hover:text-[#00B4D8] transition-colors"
        >
          {item.label}
        </a>
      ))}
    </div>
  </div>
);

export default LandingPage;
