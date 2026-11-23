import { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/siteData';
import type { PageRoute } from '../utils/serviceLogic';

interface SiteHeaderProps {
  route: PageRoute;
  onNavigate: (path: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', path: '/', matchPages: ['home'] },
  { label: 'Services', path: '/services', matchPages: ['services', 'service-detail'] },
  { label: 'About', path: '/about', matchPages: ['about'] },
  { label: 'Service Areas', path: '/service-areas', matchPages: ['service-areas'] },
  { label: 'Contact', path: '/contact', matchPages: ['contact'] },
];

export function SiteHeader({ route, onNavigate }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-canvas)]/95 backdrop-blur-sm border-b border-[var(--border-hairline)]">
      <div className="site-container flex items-center justify-between gap-4 lg:gap-8 h-16 lg:h-[76px]">
        {/* Zone 1: Single-line Brand Wordmark + Official Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
          aria-label="Scott's Plumbing & LSJK Septic Home"
        >
          <img
            src={BUSINESS_INFO.logoUrl}
            alt="Scott's Plumbing and LSJK Septic emblem"
            referrerPolicy="no-referrer"
            className="w-9 h-9 lg:w-10 lg:h-10 object-contain shrink-0"
          />
          <span className="font-[var(--font-display)] text-[15px] sm:text-[16px] lg:text-[17px] font-bold tracking-[-0.02em] text-[var(--ink-primary)] whitespace-nowrap shrink-0">
            {BUSINESS_INFO.shortBrand}
          </span>
        </a>

        {/* Zone 2: 5 Concise Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = item.matchPages.includes(route.page);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`type-nav relative py-2 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[var(--brand-primary)]'
                    : 'text-[var(--ink-body)] hover:text-[var(--ink-primary)]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--brand-primary)]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] rounded-[4px] bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white type-button whitespace-nowrap shrink-0 transition-colors duration-150"
          >
            Schedule Service
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-[4px] border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--ink-primary)] hover:border-[var(--border-strong)] transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
        >
          <nav aria-label="Mobile Navigation" className="site-container py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = item.matchPages.includes(route.page);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between px-3 min-h-[44px] rounded-[4px] type-nav transition-colors ${
                    isActive
                      ? 'bg-[var(--brand-tint)] text-[var(--brand-primary)]'
                      : 'text-[var(--ink-primary)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}

            <div className="mt-3 pt-3 border-t border-[var(--border-hairline)] flex flex-col gap-2.5">
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, '/contact')}
                className="flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-[4px] bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white type-button whitespace-nowrap"
              >
                Schedule Service
              </a>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--ink-primary)] type-button whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[var(--brand-primary)]" aria-hidden="true" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
