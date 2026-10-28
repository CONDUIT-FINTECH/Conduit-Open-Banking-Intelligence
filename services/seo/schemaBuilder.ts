import { SITE_CONFIG } from './metadata';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleSchemaData {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
}

export const buildOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.baseUrl}/#organization`,
    name: SITE_CONFIG.name,
    legalName: 'Conduit Financial Technologies Private Limited',
    url: SITE_CONFIG.baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.baseUrl}/favicon.png`,
      width: 512,
      height: 512,
      caption: 'Conduit Open Banking Observability'
    },
    sameAs: [
      'https://twitter.com/ConduitHQ',
      'https://www.linkedin.com/company/conduit-observability',
      'https://github.com/ankitsharma706/Conduit-Open-Banking-Intelligence'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone,
        contactType: 'customer support',
        email: SITE_CONFIG.contactEmail,
        areaServed: ['IN', 'SG', 'AE'],
        availableLanguage: ['English', 'Hindi']
      },
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone,
        contactType: 'compliance office',
        email: 'compliance@conduit.financial',
        areaServed: 'IN',
        availableLanguage: ['English']
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.region,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country
    }
  };
};

export const buildWebSiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.baseUrl}/#website`,
    url: SITE_CONFIG.baseUrl,
    name: SITE_CONFIG.fullName,
    description: 'The definitive Open Banking intelligence & autonomous observability operating system for financial institutions.',
    publisher: {
      '@id': `${SITE_CONFIG.baseUrl}/#organization`
    },
    inLanguage: 'en-US'
  };
};

export const buildSoftwareApplicationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Conduit Observability Platform',
    operatingSystem: 'Cloud-native, Web Browser, Linux Enterprise',
    applicationCategory: 'BusinessApplication, DeveloperApplication, FinancialApplication',
    url: SITE_CONFIG.baseUrl,
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'INR',
      description: 'Enterprise demo & trial deployment for regulated financial institutions'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '48',
      bestRating: '5',
      worstRating: '1'
    },
    author: {
      '@id': `${SITE_CONFIG.baseUrl}/#organization`
    }
  };
};

export const buildBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.baseUrl}${item.url}`
    }))
  };
};

export const buildFAQSchema = (items: FAQItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
};

export const buildArticleSchema = (data: ArticleSchemaData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: data.headline,
    description: data.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url
    },
    author: {
      '@type': 'Organization',
      name: data.authorName || 'Conduit Infrastructure Architecture Team',
      url: SITE_CONFIG.baseUrl
    },
    publisher: {
      '@id': `${SITE_CONFIG.baseUrl}/#organization`
    },
    datePublished: data.datePublished || '2026-01-15T09:00:00+05:30',
    dateModified: data.dateModified || '2026-10-28T10:00:00+05:30',
    image: data.imageUrl || `${SITE_CONFIG.baseUrl}/favicon.png`,
    inLanguage: 'en-US'
  };
};

/**
 * XSS-safe serialization for JSON-LD script blocks
 */
export const safeJsonLdStringify = (data: unknown): string => {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
};
