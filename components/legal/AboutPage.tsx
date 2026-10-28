import React from 'react';
import Breadcrumbs from '../seo/Breadcrumbs';
import MetaTags from '../seo/MetaTags';
import JsonLd from '../seo/JsonLd';
import { getRouteMetadata } from '../../services/seo/metadata';
import { buildOrganizationSchema } from '../../services/seo/schemaBuilder';
import RelatedGuides from '../seo/RelatedGuides';
import { Zap, Shield, Activity, Users, Award, Database, Cpu, Lock } from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (url: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const metadata = getRouteMetadata('/about');
  const orgSchema = buildOrganizationSchema();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628] font-sans">
      <MetaTags metadata={metadata} />
      <JsonLd id="about-org-jsonld" schema={orgSchema} />

      <header className="bg-[#0A1628] text-white py-20 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/20 mb-6 text-xs font-semibold">
            <Zap size={12} />
            <span>Mission-Critical Financial Infrastructure</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            The Definitive Open Banking Intelligence OS
          </h1>
          <p className="text-base md:text-lg text-[#8B9BB4] max-w-3xl leading-relaxed">
            Conduit is the foundational telemetry layer engineered for Indian and Southeast Asian banking ecosystems. We bridge the gap between infrastructure uptime and business revenue.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Breadcrumbs
          items={[{ name: 'Company', url: '/about' }, { name: 'About Conduit', url: '/about' }]}
          onNavigate={onNavigate}
        />

        {/* Core Pillars */}
        <section className="my-10 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A1628] mb-4">
              Why We Built Conduit
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              In modern financial networks—where Account Aggregator (AA) consent journeys, UPI switches, and automated KYC pipelines interoperate across dozens of external endpoints—a 250ms degradation doesn't just mean a slow screen. It means an abandoned mutual fund SIP, an invalidated loan origination, or a breached SLA penalty.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Traditional monitoring platforms focus solely on server CPU and RAM. <strong>Conduit focuses on Rupees, Revenue, and Regulatory Compliance.</strong> Our platform isolates partner-side network degradation in real time, attributing faults with deterministic precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A1628] text-[#00B4D8] flex items-center justify-center">
                <Activity size={20} />
              </div>
              <h3 className="font-bold text-[#0A1628] text-base">Ecosystem Observability</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Passive and synthetic telemetry tracking live latency, packet loss, and status return codes across all Account Aggregator and bank nodes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A1628] text-[#00B4D8] flex items-center justify-center">
                <Cpu size={20} />
              </div>
              <h3 className="font-bold text-[#0A1628] text-base">Predictive Maintenance</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Proprietary LSTM sequence models that detect micro-latency drift before partner APIs trigger cascade transaction drop-offs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A1628] text-[#00B4D8] flex items-center justify-center">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-[#0A1628] text-base">Revenue Attribution</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct translation of API drop-offs into ₹ Crore AUM impact, providing finance and engineering teams with shared visibility.
              </p>
            </div>
          </div>
        </section>

        {/* Security & Accreditations */}
        <section className="my-10 bg-gradient-to-r from-[#0A1628] to-[#1E293B] text-white p-8 md:p-12 rounded-3xl shadow-xl">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
              <Lock className="text-[#00B4D8]" size={24} />
              Bank-Grade Security & Regulatory Certifications
            </h2>
            <p className="text-xs md:text-sm text-gray-300 mb-8 leading-relaxed">
              Designed specifically for tier-1 financial institutions operating under the supervisory framework of the Reserve Bank of India and international banking authorities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <Award className="text-[#00B4D8] mx-auto mb-2" size={24} />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">ISO 27001</h4>
              <p className="text-[10px] text-gray-400 mt-1">Information Security</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <Shield className="text-[#00B4D8] mx-auto mb-2" size={24} />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">SOC 2 Type II</h4>
              <p className="text-[10px] text-gray-400 mt-1">Audited Controls</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <Database className="text-[#00B4D8] mx-auto mb-2" size={24} />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">RBI Master Dir</h4>
              <p className="text-[10px] text-gray-400 mt-1">IT Outsourcing 2025</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <Users className="text-[#00B4D8] mx-auto mb-2" size={24} />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">DPDP 2025</h4>
              <p className="text-[10px] text-gray-400 mt-1">Zero-Knowledge PII</p>
            </div>
          </div>
        </section>

        <RelatedGuides currentPath="/about" onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default AboutPage;
