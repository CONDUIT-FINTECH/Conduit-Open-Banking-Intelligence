import React, { useState } from 'react';
import Breadcrumbs from '../seo/Breadcrumbs';
import MetaTags from '../seo/MetaTags';
import JsonLd from '../seo/JsonLd';
import { getRouteMetadata, SITE_CONFIG } from '../../services/seo/metadata';
import { buildOrganizationSchema, buildFAQSchema } from '../../services/seo/schemaBuilder';
import RelatedGuides from '../seo/RelatedGuides';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Building2, HelpCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (url: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const metadata = getRouteMetadata('/contact');
  const orgSchema = buildOrganizationSchema();
  
  const faqs = [
    {
      question: 'How fast can Conduit be deployed in an existing banking stack?',
      answer: 'Conduit deploys as a non-invasive sidecar or eBPF agent. Zero code changes are required on core transaction rails; initial telemetry streams start within 4 hours.'
    },
    {
      question: 'Does Conduit store sensitive PII or customer account balances?',
      answer: 'No. Conduit follows a strict Zero-Knowledge telemetry architecture. All payload bodies are sanitized locally, extracting only HTTP status codes, latency timings, and cryptographic hash attributions.'
    },
    {
      question: 'Is Conduit compliant with RBI IT Outsourcing Master Directions 2025?',
      answer: 'Yes. Conduit provides built-in compliance reports, audit logging, multi-tenant data residency within Indian data centers, and deterministic forensic export for regulatory audits.'
    }
  ];

  const faqSchema = buildFAQSchema(faqs);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Enterprise Demo',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid corporate email address.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        inquiryType: 'Enterprise Demo',
        message: ''
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628] font-sans">
      <MetaTags metadata={metadata} />
      <JsonLd id="contact-org-jsonld" schema={orgSchema} />
      <JsonLd id="contact-faq-jsonld" schema={faqSchema} />

      <header className="bg-[#0A1628] text-white py-16 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/20 mb-4 text-xs font-semibold">
            <Mail size={12} />
            <span>Connect with Engineering & Compliance</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Contact Conduit
          </h1>
          <p className="text-sm md:text-base text-[#8B9BB4] max-w-2xl leading-relaxed">
            Have questions about Open Banking telemetry, regulatory audits, or custom SLA monitoring? Reach out to our solutions architecture team.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Breadcrumbs
          items={[{ name: 'Company', url: '/about' }, { name: 'Contact', url: '/contact' }]}
          onNavigate={onNavigate}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Contact Details Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#0A1628] flex items-center gap-2">
                <Building2 className="text-[#00B4D8]" size={20} />
                Global Headquarters
              </h2>
              <div className="space-y-3 text-xs md:text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#00B4D8] shrink-0 mt-1" size={16} />
                  <span>
                    Conduit Financial Technologies Pvt Ltd<br />
                    Outer Ring Road, Kadubeesanahalli<br />
                    Bengaluru, Karnataka 560103, India
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-[#00B4D8] shrink-0" size={16} />
                  <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-[#00B4D8] transition-colors">
                    {SITE_CONFIG.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-[#00B4D8] shrink-0" size={16} />
                  <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="hover:text-[#00B4D8] transition-colors">
                    {SITE_CONFIG.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0A1628] to-[#1E293B] text-white p-6 rounded-2xl shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#00B4D8] uppercase tracking-wider">
                Support Hours & SLA
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Mission-critical P1 emergency triage: <strong>24/7/365 NOC Response</strong>. General enterprise inquiries answered within 4 business hours.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-[#0A1628] mb-2">Send Us an Inquiry</h2>
              <p className="text-xs md:text-sm text-gray-500 mb-6">
                Fill in your details below to request a sandbox trial or schedule a technical walkthrough.
              </p>

              {status === 'success' ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-3 text-center">
                  <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
                  <h3 className="text-lg font-bold">Inquiry Dispatched Successfully</h3>
                  <p className="text-xs md:text-sm text-emerald-700">
                    Thank you for contacting Conduit. A solutions architect will reach out to your corporate email within 4 business hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="priya@hdfcbank.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Institution / Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Bank / Fintech / NBFC"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/10"
                      >
                        <option>Enterprise Demo</option>
                        <option>API Health Audit</option>
                        <option>Regulatory Compliance</option>
                        <option>Partnership & Integration</option>
                        <option>Press & Legal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Message / Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your Open Banking architecture, daily API volume, or specific compliance questions..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/10"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#0A1628] hover:bg-[#00B4D8] text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    {status === 'submitting' ? (
                      <span>Dispatching Message...</span>
                    ) : (
                      <>
                        <span>Submit Enterprise Inquiry</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <section className="mt-16 bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="text-[#00B4D8]" size={22} />
            <h2 className="text-xl font-bold text-[#0A1628]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <h3 className="text-sm font-bold text-[#0A1628] mb-1.5">{faq.question}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedGuides currentPath="/contact" onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default ContactPage;
