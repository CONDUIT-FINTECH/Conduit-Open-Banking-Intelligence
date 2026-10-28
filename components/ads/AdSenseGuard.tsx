import React, { useEffect, useState } from 'react';

export const PUBLISHER_ID = 'pub-4318712038607459';
export const CLIENT_ID = `ca-${PUBLISHER_ID}`;

// Explicitly permitted public, content-rich editorial paths
const ALLOWED_CONTENT_ROUTES = [
  '/',
  '/about',
  '/privacy-policy',
  '/terms-of-service',
  '/contact',
  '/docs',
  '/solutions/api-health',
  '/solutions/sla-governance',
  '/solutions/revenue-shield',
  '/tools/roi-calculator'
];

// Strictly prohibited paths for AdSense
const PROHIBITED_ROUTES = [
  '/login',
  '/signup',
  '/auth',
  '/reset-password',
  '/dashboard',
  '/app',
  '/settings',
  '/profile',
  '/404',
  '/500',
  '/maintenance'
];

export const isRouteAdEligible = (pathname: string): boolean => {
  const clean = pathname.replace(/\/+$/, '') || '/';

  // Check prohibited first
  if (PROHIBITED_ROUTES.some(p => clean.startsWith(p))) {
    return false;
  }

  // Must match explicit allowed content routes
  return ALLOWED_CONTENT_ROUTES.some(r => clean === r || clean.startsWith(r + '/'));
};

interface AdSenseGuardProps {
  currentPath: string;
  hasPublisherContent?: boolean;
  children?: React.ReactNode;
}

export const AdSenseGuard: React.FC<AdSenseGuardProps> = ({
  currentPath,
  hasPublisherContent = true,
  children
}) => {
  const [isAdAllowed, setIsAdAllowed] = useState(false);

  useEffect(() => {
    const eligible = isRouteAdEligible(currentPath) && hasPublisherContent;
    setIsAdAllowed(eligible);

    const scriptId = 'google-adsense-script';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (eligible) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}`;
        scriptElement.async = true;
        scriptElement.crossOrigin = 'anonymous';
        document.head.appendChild(scriptElement);
      }
    } else {
      // Strictly isolate: remove script if navigating to private/restricted route
      if (scriptElement) {
        scriptElement.remove();
      }
    }
  }, [currentPath, hasPublisherContent]);

  return <>{children}</>;
};

export default AdSenseGuard;
