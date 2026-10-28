import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem, buildBreadcrumbSchema } from '../../services/seo/schemaBuilder';
import JsonLd from './JsonLd';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (url: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  const schema = buildBreadcrumbSchema(items);

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
    <>
      <JsonLd id="breadcrumbs-jsonld" schema={schema} />
      <nav aria-label="Breadcrumb" className="py-3 px-1 flex items-center text-xs text-gray-500 font-medium">
        <ol className="flex items-center space-x-2 flex-wrap">
          <li className="inline-flex items-center">
            <a
              href="/"
              onClick={(e) => handleClick(e, '/')}
              className="inline-flex items-center text-gray-400 hover:text-[#00B4D8] transition-colors gap-1.5"
            >
              <Home size={13} className="shrink-0" />
              <span>Conduit</span>
            </a>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.url} className="inline-flex items-center space-x-2">
                <ChevronRight size={12} className="text-gray-300 shrink-0" />
                {isLast ? (
                  <span className="text-[#0A1628] font-bold tracking-tight" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <a
                    href={item.url}
                    onClick={(e) => handleClick(e, item.url)}
                    className="text-gray-500 hover:text-[#00B4D8] transition-colors"
                  >
                    {item.name}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
