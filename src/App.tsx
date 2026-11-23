import { useCallback, useEffect, useState } from 'react';
import { BUSINESS_INFO, SERVICES } from './data/siteData';
import { parseRoute, type PageRoute } from './utils/serviceLogic';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { ContactPage } from './pages/ContactPage';

function getPageTitle(route: PageRoute): string {
  switch (route.page) {
    case 'services':
      return `Services | ${BUSINESS_INFO.brandName}`;
    case 'service-detail': {
      const found = SERVICES.find((s) => s.slug === route.slug);
      return found
        ? `${found.shortTitle} | ${BUSINESS_INFO.brandName}`
        : `Services | ${BUSINESS_INFO.brandName}`;
    }
    case 'about':
      return `About Us | ${BUSINESS_INFO.brandName}`;
    case 'service-areas':
      return `Service Areas | ${BUSINESS_INFO.brandName}`;
    case 'contact':
      return `Schedule Service | ${BUSINESS_INFO.brandName}`;
    default:
      return `${BUSINESS_INFO.brandName} | Carrollton & West Georgia`;
  }
}

export default function App() {
  const [route, setRoute] = useState<PageRoute>(() =>
    parseRoute(window.location.pathname, window.location.search)
  );

  const navigate = useCallback((target: string) => {
    const url = new URL(target, window.location.origin);
    window.history.pushState({}, '', `${url.pathname}${url.search}`);
    setRoute(parseRoute(url.pathname, url.search));
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute(window.location.pathname, window.location.search));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = getPageTitle(route);
  }, [route]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--ink-body)]">
      <SiteHeader route={route} onNavigate={navigate} />

      <main className="flex-1">
        {route.page === 'home' && <HomePage onNavigate={navigate} />}
        {route.page === 'services' && <ServicesPage onNavigate={navigate} />}
        {route.page === 'service-detail' && (
          <ServiceDetailPage slug={route.slug} onNavigate={navigate} />
        )}
        {route.page === 'about' && <AboutPage onNavigate={navigate} />}
        {route.page === 'service-areas' && <ServiceAreasPage onNavigate={navigate} />}
        {route.page === 'contact' && (
          <ContactPage
            preselectedService={route.preselectedService}
            preselectedCounty={route.preselectedCounty}
          />
        )}
      </main>

      <SiteFooter onNavigate={navigate} />
    </div>
  );
}
