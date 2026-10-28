import React, { useEffect } from 'react';
import { safeJsonLdStringify } from '../../services/seo/schemaBuilder';

interface JsonLdProps {
  id?: string;
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ id = 'page-jsonld', schema }) => {
  useEffect(() => {
    let scriptTag = document.getElementById(id) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = id;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = safeJsonLdStringify(schema);

    return () => {
      // Cleanup on route unmount
      const el = document.getElementById(id);
      if (el) {
        el.remove();
      }
    };
  }, [id, schema]);

  return null;
};

export default JsonLd;
