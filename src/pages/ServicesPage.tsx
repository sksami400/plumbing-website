import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES, type ServiceCategory } from '../data/siteData';
import { filterServicesByCategory } from '../utils/serviceLogic';
import { MediaFrame } from '../components/MediaFrame';
import { CtaBand } from '../components/CtaBand';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

const FILTER_OPTIONS: { id: 'all' | ServiceCategory; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'septic', label: 'Septic Systems' },
  { id: 'plumbing', label: 'Plumbing & Drains' },
  { id: 'specialty', label: 'Gas & Construction' },
];

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | ServiceCategory>('all');
  const visibleServices = filterServicesByCategory(activeFilter);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="section-pad-compact bg-[var(--bg-surface)] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="measure-intro">
            <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-3">
              Services · Residential &amp; Commercial
            </p>
            <h1 className="type-inner-h1 text-[var(--ink-primary)] mb-4">
              Plumbing, gas, and septic services built for West Georgia properties
            </h1>
            <p className="type-intro text-[var(--ink-body)]">
              Every service is performed by our Carrollton-based crew—eliminating delays between
              indoor fixture diagnostics, main line repairs, and outdoor septic field work.
            </p>
          </div>

          {/* Interactive Category Filter */}
          <div
            role="group"
            aria-label="Filter services by category"
            className="mt-8 inline-flex flex-wrap items-center gap-2 p-1.5 bg-[var(--bg-canvas)] border border-[var(--border-hairline)] rounded-[4px]"
          >
            {FILTER_OPTIONS.map((option) => {
              const selected = activeFilter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveFilter(option.id)}
                  aria-pressed={selected}
                  className={`px-4 min-h-[40px] rounded-[3px] type-nav whitespace-nowrap shrink-0 transition-colors ${
                    selected
                      ? 'bg-[var(--brand-primary)] text-white'
                      : 'text-[var(--ink-body)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filtered Services List */}
      <section className="section-pad bg-[var(--bg-canvas)]">
        <div className="site-container flex flex-col gap-10">
          {visibleServices.map((service, idx) => {
            const imageFirst = idx % 2 === 1;
            return (
              <article
                key={service.slug}
                className="grid grid-cols-1 lg:grid-cols-12 items-stretch fluid-grid-gap bg-[var(--bg-card)] border border-[var(--border-hairline)] rounded-[4px] overflow-hidden"
              >
                <div
                  className={`lg:col-span-5 ${
                    imageFirst ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <MediaFrame
                    src={service.heroImage}
                    alt={service.heroAlt}
                    focalPoint={
                      service.slug === 'water-heaters-plumbing' ||
                      service.slug === 'gas-lines-repiping'
                        ? '65% 25%'
                        : 'center center'
                    }
                    className="w-full h-full min-h-[260px] aspect-[4/3] lg:aspect-auto border-0 rounded-none"
                  />
                </div>

                <div
                  className={`lg:col-span-7 card-pad flex flex-col justify-between gap-6 ${
                    imageFirst ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div>
                    <p className="type-eyebrow text-[var(--brand-primary)] mb-2">
                      {service.number} · {service.categoryLabel}
                    </p>
                    <h2 className="type-subsection-h3 text-[var(--ink-primary)] mb-3">
                      {service.title}
                    </h2>
                    <p className="type-body text-[var(--ink-body)] mb-5 measure-prose">
                      {service.overviewParagraphs[0]}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-[var(--border-hairline)]">
                      {service.homeownerSigns.slice(0, 4).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[14px] text-[var(--ink-body)]"
                        >
                          <Check
                            className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href={`/services/${service.slug}`}
                      onClick={(e) => handleLink(e, `/services/${service.slug}`)}
                      className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-[4px] bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white type-button whitespace-nowrap transition-colors"
                    >
                      <span>View full scope</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>

                    <a
                      href={`/contact?service=${service.slug}`}
                      onClick={(e) => handleLink(e, `/contact?service=${service.slug}`)}
                      className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[4px] border border-[var(--border-strong)] hover:border-[var(--ink-primary)] text-[var(--ink-primary)] type-button whitespace-nowrap transition-colors"
                    >
                      <span>Request quote</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}

          {visibleServices.length === 0 && (
            <div className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] p-8 text-center">
              <p className="type-body text-[var(--ink-primary)]">
                No services matched that category. Showing all {SERVICES.length} services instead.
              </p>
            </div>
          )}
        </div>
      </section>

      <CtaBand onNavigate={onNavigate} />
    </div>
  );
}
