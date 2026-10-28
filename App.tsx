import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout.tsx';
import LandingPage from './components/LandingPage.tsx';
import LoginPage from './components/LoginPage.tsx';
import ObservabilityHub from './components/ObservabilityHub.tsx';
import SLAScorecard from './components/SLAScorecard.tsx';
import RevenueShield from './components/RevenueShield.tsx';
import IncidentCommandCenter from './components/IncidentCommandCenter.tsx';
import AIResolutionEngine from './components/AIResolutionEngine.tsx';
import PartnerNetworkGraph from './components/PartnerNetworkGraph.tsx';
import ComplianceMonitor from './components/ComplianceMonitor.tsx';
import SystemConfiguration from './components/SystemConfiguration.tsx';
import Integrations from './components/Integrations.tsx';
import AIAssistantConsole from './components/AIAssistantConsole.tsx';

// Legal & SEO Content Pages
import PrivacyPolicy from './components/legal/PrivacyPolicy.tsx';
import TermsOfService from './components/legal/TermsOfService.tsx';
import ContactPage from './components/legal/ContactPage.tsx';
import AboutPage from './components/legal/AboutPage.tsx';
import DocumentationPage from './components/legal/DocumentationPage.tsx';
import CalculatorPage from './components/legal/CalculatorPage.tsx';
import SolutionPage from './components/legal/SolutionPage.tsx';

// AdSense Guard
import AdSenseGuard from './components/ads/AdSenseGuard.tsx';
import MetaTags from './components/seo/MetaTags.tsx';
import { getRouteMetadata } from './services/seo/metadata.ts';
import { ConduitUser } from './types.ts';
import { CONDUIT_USERS } from './constants.tsx';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('conduit_auth') === 'true';
  });

  const [user, setUser] = useState<ConduitUser | null>(() => {
    const saved = localStorage.getItem('conduit_user_email');
    if (saved) {
      return CONDUIT_USERS.find(u => u.email === saved) || CONDUIT_USERS[0];
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('conduit_active_tab') || 'hub';
  });

  // Navigate helper synchronizing URL and State
  const navigate = useCallback((url: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', url);
      setCurrentPath(url);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Listen to popstate (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    localStorage.setItem('conduit_active_tab', activeTab);
  }, [activeTab]);

  const handleLogin = (email: string) => {
    const foundUser = CONDUIT_USERS.find(u => u.email === email) || CONDUIT_USERS[0];
    setUser(foundUser);
    setIsAuthenticated(true);
    localStorage.setItem('conduit_auth', 'true');
    localStorage.setItem('conduit_user_email', foundUser.email);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('conduit_auth');
    localStorage.removeItem('conduit_user_email');
    navigate('/');
  };

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'hub': return <ObservabilityHub />;
      case 'scorecard': return <SLAScorecard />;
      case 'shield': return <RevenueShield />;
      case 'incidents': return <IncidentCommandCenter />;
      case 'assistant': return <AIAssistantConsole />;
      case 'ai': return <AIResolutionEngine />;
      case 'graph': return <PartnerNetworkGraph />;
      case 'compliance': return <ComplianceMonitor />;
      case 'config': return <SystemConfiguration />;
      case 'integrations': return <Integrations />;
      default: return <ObservabilityHub />;
    }
  };

  // Route Dispatcher
  const renderCurrentRoute = () => {
    const normalized = currentPath.replace(/\/+$/, '') || '/';

    // 1. Mandatory Legal & Trust Routes
    if (normalized === '/privacy-policy') {
      return <PrivacyPolicy onNavigate={navigate} />;
    }
    if (normalized === '/terms-of-service') {
      return <TermsOfService onNavigate={navigate} />;
    }
    if (normalized === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (normalized === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (normalized === '/docs') {
      return <DocumentationPage onNavigate={navigate} />;
    }

    // 2. High-Content Tools & Solutions
    if (normalized === '/tools/roi-calculator') {
      return <CalculatorPage onNavigate={navigate} />;
    }
    if (normalized === '/solutions/api-health') {
      return <SolutionPage slug="api-health" onNavigate={navigate} onEnterApp={() => navigate('/login')} />;
    }
    if (normalized === '/solutions/sla-governance') {
      return <SolutionPage slug="sla-governance" onNavigate={navigate} onEnterApp={() => navigate('/login')} />;
    }
    if (normalized === '/solutions/revenue-shield') {
      return <SolutionPage slug="revenue-shield" onNavigate={navigate} onEnterApp={() => navigate('/login')} />;
    }

    // 3. Authentication Route
    if (normalized === '/login') {
      if (isAuthenticated) {
        return (
          <Layout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
            {renderDashboardContent()}
          </Layout>
        );
      }
      return <LoginPage onLogin={handleLogin} onBack={() => navigate('/')} />;
    }

    // 4. Authenticated Dashboard Routes
    if (normalized === '/dashboard' || normalized.startsWith('/app')) {
      if (!isAuthenticated) {
        return <LoginPage onLogin={handleLogin} onBack={() => navigate('/')} />;
      }
      return (
        <Layout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
          {renderDashboardContent()}
        </Layout>
      );
    }

    // 5. Default Public Landing Page
    return <LandingPage onEnter={() => navigate('/login')} onNavigate={navigate} />;
  };

  const currentMetadata = getRouteMetadata(currentPath);

  return (
    <AdSenseGuard currentPath={currentPath} hasPublisherContent={!currentMetadata.isNoIndex}>
      <MetaTags metadata={currentMetadata} />
      {renderCurrentRoute()}
    </AdSenseGuard>
  );
};

export default App;
