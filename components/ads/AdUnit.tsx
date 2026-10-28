import React, { useEffect, useRef } from 'react';
import { CLIENT_ID, isRouteAdEligible } from './AdSenseGuard';

interface AdUnitProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  currentPath: string;
  hasContent: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const AdUnit: React.FC<AdUnitProps> = ({
  slotId = 'default-slot',
  format = 'auto',
  responsive = true,
  currentPath,
  hasContent,
  className = ''
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  const eligible = isRouteAdEligible(currentPath) && hasContent;

  useEffect(() => {
    if (!eligible || pushedRef.current) return;

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushedRef.current = true;
      }
    } catch {
      // Ignore adsbygoogle push errors in test/local environments
    }
  }, [eligible]);

  // NEVER render on prohibited routes or if content is missing
  if (!eligible) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`my-8 p-3 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center overflow-hidden ${className}`}
    >
      <span className="text-[9px] font-semibold tracking-wider uppercase text-gray-400 mb-2">
        Sponsored Content
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: 'block', minHeight: '90px', width: '100%' }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </aside>
  );
};

export default AdUnit;
