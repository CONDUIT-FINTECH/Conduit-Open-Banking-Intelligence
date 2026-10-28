export interface RouteMetadata {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  robots?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  alternateLanguages?: Array<{ lang: string; href: string }>;
  isNoIndex?: boolean;
}

export const SITE_CONFIG = {
  name: 'Conduit',
  fullName: 'Conduit - Open Banking Reliability & Observability Operating System',
  baseUrl: 'https://maxcnfront.vercel.app',
  defaultOgImage: 'https://maxcnfront.vercel.app/favicon.png',
  twitterHandle: '@ConduitHQ',
  contactEmail: 'compliance@conduit.financial',
  phone: '+91-80-4567-8900',
  address: {
    street: 'Outer Ring Road, Kadubeesanahalli',
    city: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560103',
    country: 'IN'
  }
};

export const getCanonicalUrl = (pathname: string): string => {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const pathWithoutTrailing = cleanPath === '/' ? '' : cleanPath.replace(/\/+$/, '');
  return `${SITE_CONFIG.baseUrl}${pathWithoutTrailing}`;
};

export const getRouteMetadata = (pathname: string): RouteMetadata => {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  switch (normalized) {
    case '/':
      return {
        title: 'Conduit | Open Banking Reliability & Autonomous Observability OS',
        description: 'Conduit monitors every API call across your financial ecosystem, attributes failures to responsible partners, and quantifies revenue leakage in ₹ Crore in real time.',
        canonical: getCanonicalUrl('/'),
        keywords: ['open banking', 'api observability', 'account aggregator', 'upi monitoring', 'sla tracking', 'rbi it outsourcing master directions'],
        ogType: 'website',
        ogImage: SITE_CONFIG.defaultOgImage,
        twitterCard: 'summary_large_image',
        robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        alternateLanguages: [
          { lang: 'en', href: getCanonicalUrl('/') },
          { lang: 'en-IN', href: getCanonicalUrl('/') },
          { lang: 'x-default', href: getCanonicalUrl('/') }
        ]
      };

    case '/about':
      return {
        title: 'About Conduit | Mission, Architecture & Open Banking Leadership',
        description: 'Learn about Conduit, the financial-grade observability system safeguarding digital wealth, NBFC integrations, and Account Aggregator ecosystems across India.',
        canonical: getCanonicalUrl('/about'),
        keywords: ['conduit company', 'fintech reliability', 'about conduit', 'api resilience'],
        ogType: 'website',
        robots: 'index, follow'
      };

    case '/contact':
      return {
        title: 'Contact Conduit Engineering & Compliance Support',
        description: 'Get in touch with the Conduit technical team, request an enterprise deployment audit, or reach our compliance office for SLA integration support.',
        canonical: getCanonicalUrl('/contact'),
        keywords: ['conduit contact', 'fintech support', 'api audit demo', 'open banking enterprise demo'],
        ogType: 'website',
        robots: 'index, follow'
      };

    case '/privacy-policy':
      return {
        title: 'Privacy Policy | Conduit Data Protection & AdSense Disclosures',
        description: 'Read the Conduit Privacy Policy covering DPDP Rules 2025, RBI IT Outsourcing compliance, cookie governance, Google AdSense, and DART cookie disclosures.',
        canonical: getCanonicalUrl('/privacy-policy'),
        keywords: ['privacy policy', 'dpdp compliance', 'adsense disclosures', 'dart cookie policy', 'rbi data protection'],
        ogType: 'article',
        robots: 'index, follow'
      };

    case '/terms-of-service':
      return {
        title: 'Terms of Service | Conduit Enterprise API Governance Agreement',
        description: 'Terms of Service, service level commitments, acceptable use policies, and master subscription agreement terms for the Conduit platform.',
        canonical: getCanonicalUrl('/terms-of-service'),
        keywords: ['terms of service', 'sla commitments', 'conduit legal terms'],
        ogType: 'article',
        robots: 'index, follow'
      };

    case '/docs':
      return {
        title: 'Conduit Documentation | Open Banking Observability & Architecture Guides',
        description: 'Technical documentation, telemetry ingestion specs, SLA monitoring pipelines, and RBI IT Outsourcing audit frameworks for the Conduit platform.',
        canonical: getCanonicalUrl('/docs'),
        keywords: ['conduit docs', 'open banking documentation', 'api failure attribution', 'fintech telemetry'],
        ogType: 'article',
        robots: 'index, follow'
      };

    case '/solutions/api-health':
      return {
        title: 'API Health Monitoring & Real-Time Latency Intelligence | Conduit',
        description: 'Monitor live latency across all AA and UPI nodes. Detect degraded endpoints before transactions fail, protecting user trust and transaction velocity.',
        canonical: getCanonicalUrl('/solutions/api-health'),
        keywords: ['api health', 'latency intelligence', 'upi node monitoring', 'fintech uptime'],
        ogType: 'article',
        robots: 'index, follow'
      };

    case '/solutions/sla-governance':
      return {
        title: 'Partner SLA Scorecards & Breach Tracking | Conduit',
        description: 'Automated contract enforcement and SLA breach attribution across bank gateways, KYC providers, and Account Aggregators with automated credit calculations.',
        canonical: getCanonicalUrl('/solutions/sla-governance'),
        keywords: ['sla governance', 'partner scorecard', 'fintech vendor risk', 'breach attribution'],
        ogType: 'article',
        robots: 'index, follow'
      };

    case '/solutions/revenue-shield':
      return {
        title: 'Revenue Shield | Quantifying AUM Leakage & Financial Impact | Conduit',
        description: 'Bridge the gap between infrastructure metrics and Rupees. Quantify API downtime in ₹ Crore and protect recurring digital wealth revenue flows.',
        canonical: getCanonicalUrl('/solutions/revenue-shield'),
        keywords: ['revenue shield', 'aum protection', 'api downtime cost', 'fintech revenue leakage'],
        ogType: 'article',
        robots: 'index, follow'
      };

    case '/tools/roi-calculator':
      return {
        title: 'Open Banking API ROI & Failure Cost Calculator | Conduit',
        description: 'Quantify your organization’s annual AUM at risk from API failures. Complete interactive calculator with detailed methodology and economic analysis.',
        canonical: getCanonicalUrl('/tools/roi-calculator'),
        keywords: ['api roi calculator', 'aum failure calculator', 'open banking loss estimation'],
        ogType: 'article',
        robots: 'index, follow'
      };

    case '/login':
      return {
        title: 'Sign In | Conduit Workspace Security',
        description: 'Secure authentication gateway for Conduit Enterprise workspaces.',
        canonical: getCanonicalUrl('/login'),
        robots: 'noindex, nofollow',
        isNoIndex: true
      };

    default:
      if (normalized.startsWith('/dashboard') || normalized.startsWith('/app')) {
        return {
          title: 'Dashboard | Conduit Observability Core',
          description: 'Private Conduit telemetry console.',
          canonical: getCanonicalUrl(normalized),
          robots: 'noindex, nofollow',
          isNoIndex: true
        };
      }
      return {
        title: 'Conduit | Enterprise Open Banking Observability',
        description: 'The definitive Open Banking intelligence and autonomous observability operating system for financial institutions.',
        canonical: getCanonicalUrl(normalized),
        robots: 'index, follow'
      };
  }
};
