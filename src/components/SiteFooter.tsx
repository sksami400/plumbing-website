import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/siteData';

interface SiteFooterProps {
  onNavigate: (path: string) => void;
}

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[var(--bg-deep)] text-[var(--ink-on-dark)] border-t border-white/10">
      <div className="site-container section-pad-compact">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 fluid-grid-gap pb-10 border-b border-white/12">
          {/* Column 1: Brand & Carrollton Headquarters */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-flex items-center gap-3 w-fit group"
            >
              <img
                src={BUSINESS_INFO.logoUrl}
                alt="Scott's Plumbing and LSJK Septic emblem"
                referrerPolicy="no-referrer"
                className="w-11 h-11 object-contain shrink-0"
              />
              <span className="font-[var(--font-display)] text-[18px] font-bold tracking-[-0.02em] text-white">
                {BUSINESS_INFO.brandName}
              </span>
            </a>

            <p className="type-footer text-[var(--ink-on-dark-muted)] max-w-[340px]">
              Family-owned residential and commercial plumbing and septic specialists serving
              Carrollton and West Georgia.
            </p>

            <p className="type-footer text-white/90 font-medium">
              {BUSINESS_INFO.accreditation}
            </p>
          </div>

          {/* Column 2: Core Services */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h2 className="type-eyebrow uppercase text-[var(--ink-on-dark-muted)]">
              Services
            </h2>
            <ul className="flex flex-col gap-2.5 type-footer">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`/services/${service.slug}`}
                    onClick={(e) => handleLink(e, `/services/${service.slug}`)}
                    className="text-white/85 hover:text-white transition-colors inline-block py-0.5"
                  >
                    {service.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h2 className="type-eyebrow uppercase text-[var(--ink-on-dark-muted)]">
              Company
            </h2>
            <ul className="flex flex-col gap-2.5 type-footer">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLink(e, '/')}
                  className="text-white/85 hover:text-white transition-colors inline-block py-0.5"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => handleLink(e, '/services')}
                  className="text-white/85 hover:text-white transition-colors inline-block py-0.5"
                >
                  All Services
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLink(e, '/about')}
                  className="text-white/85 hover:text-white transition-colors inline-block py-0.5"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/service-areas"
                  onClick={(e) => handleLink(e, '/service-areas')}
                  className="text-white/85 hover:text-white transition-colors inline-block py-0.5"
                >
                  Service Areas
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className="text-white/85 hover:text-white transition-colors inline-block py-0.5"
                >
                  Schedule Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct 24/7 Dispatch */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h2 className="type-eyebrow uppercase text-[var(--ink-on-dark-muted)]">
              24/7 Dispatch &amp; Office
            </h2>
            <ul className="flex flex-col gap-3 type-footer text-white/90">
              <li>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 font-semibold text-white hover:text-[#f8a5a3] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                  <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.emailHref}
                  className="inline-flex items-center gap-2.5 text-white/85 hover:text-white transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 text-[var(--ink-on-dark-muted)]">
                <MapPin className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-1" aria-hidden="true" />
                <span className="flex flex-col">
                  <span>{BUSINESS_INFO.addressLine1}</span>
                  <span>{BUSINESS_INFO.cityStateZip}</span>
                </span>
              </li>
              <li className="inline-flex items-center gap-2.5 text-[var(--ink-on-dark-muted)]">
                <Clock className="w-4 h-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                <span>{BUSINESS_INFO.hoursSummary}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 type-footer text-[var(--ink-on-dark-muted)]">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.brandName}. All rights reserved.
          </p>
          <p>Carrollton &amp; West Georgia · Residential &amp; Commercial</p>
        </div>
      </div>
    </footer>
  );
}
