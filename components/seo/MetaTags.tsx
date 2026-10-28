import React, { useEffect } from 'react';
import { RouteMetadata, SITE_CONFIG } from '../../services/seo/metadata';

interface MetaTagsProps {
  metadata: RouteMetadata;
}

export const MetaTags: React.FC<MetaTagsProps> = ({ metadata }) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = metadata.title;

    // Helper to set or create a meta tag
    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set or create a link tag
    const setLink = (rel: string, href: string, extraAttrs?: Record<string, string>) => {
      let selector = `link[rel="${rel}"]`;
      if (extraAttrs?.hreflang) {
        selector += `[hreflang="${extraAttrs.hreflang}"]`;
      }
      let element = document.querySelector(selector) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (extraAttrs) {
          Object.entries(extraAttrs).forEach(([k, v]) => element?.setAttribute(k, v));
        }
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard Meta
    setMeta('name', 'description', metadata.description);
    if (metadata.keywords && metadata.keywords.length > 0) {
      setMeta('name', 'keywords', metadata.keywords.join(', '));
    }
    setMeta('name', 'robots', metadata.robots || 'index, follow');

    // Canonical Link
    setLink('canonical', metadata.canonical);

    // Hreflang alternates
    if (metadata.alternateLanguages) {
      metadata.alternateLanguages.forEach(alt => {
        setLink('alternate', alt.href, { hreflang: alt.lang });
      });
    }

    // OpenGraph
    setMeta('property', 'og:title', metadata.title);
    setMeta('property', 'og:description', metadata.description);
    setMeta('property', 'og:url', metadata.canonical);
    setMeta('property', 'og:type', metadata.ogType || 'website');
    setMeta('property', 'og:image', metadata.ogImage || SITE_CONFIG.defaultOgImage);
    setMeta('property', 'og:site_name', SITE_CONFIG.name);

    // Twitter
    setMeta('name', 'twitter:card', metadata.twitterCard || 'summary_large_image');
    setMeta('name', 'twitter:site', SITE_CONFIG.twitterHandle);
    setMeta('name', 'twitter:title', metadata.title);
    setMeta('name', 'twitter:description', metadata.description);
    setMeta('name', 'twitter:image', metadata.ogImage || SITE_CONFIG.defaultOgImage);
  }, [metadata]);

  return null;
};

export default MetaTags;
