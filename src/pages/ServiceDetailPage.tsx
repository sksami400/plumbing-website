import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/siteData';
import { getServiceBySlug } from '../utils/serviceLogic';
import { MediaFrame } from '../components/MediaFrame';
import { FaqAccordion } from '../components/FaqAccordion';
import { CtaBand } from '../components/CtaBand';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function ServiceDetailPage({ slug, onNavigate }: ServiceDetailPageProps) {
  const service = getServiceBySlug(slug) ?? SERVICES[0];
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div>
      {/* Hero Split */}
      <section className="section-pad-compact bg-[var(--bg-surface)] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="mb-6">
            <a
              href="/services"
              onClick={(e) => handleLink(e, '/services')}
              className="inline-flex items-center gap-2 type-nav text-[var(--ink-muted)] hover:text-[var(--ink-primary)] min-h-[40px]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>All plumbing &amp; septic services</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch fluid-grid-gap">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-3">
                {service.number} · {service.categoryLabel}
              </p>
              <h1 className="type-inner-h1 text-[var(--ink-primary)] mb-4">
                {service.title}
              </h1>
              <p className="type-intro text-[var(--ink-body)] measure-intro mb-7">
                {service.summary}
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href={`/contact?service=${service.slug}`}
                  onClick={(e) => handleLink(e, `/contact?service=${service.slug}`)}
                  className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-[4px] bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white type-button whitespace-nowrap transition-colors"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2 min-h-[48px] px-5 py-3 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-card)] hover:border-[var(--ink-primary)] text-[var(--ink-primary)] type-button whitespace-nowrap transition-colors"
                >
                  <Phone className="w-4 h-4 text-[var(--brand-primary)]" aria-hidden="true" />
                  <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <MediaFrame
                src={service.heroImage}
                alt={service.heroAlt}
                priority
                className="w-full h-full aspect-[4/3] rounded-[4px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Scope + Warning Signs */}
      <section className="section-pad bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 fluid-grid-gap">
            <div className="lg:col-span-7 flex flex-col gap-5 measure-prose">
              <h2 className="type-section-h2 text-[var(--ink-primary)]">
                What our Carrollton crew inspects and resolves
              </h2>
              {service.overviewParagraphs.map((paragraph) => (
                <p key={paragraph} className="type-body text-[var(--ink-body)]">
                  {paragraph}
                </p>
              ))}

              <div className="mt-2 pt-5 border-t border-[var(--border-hairline)]">
                <h3 className="font-[var(--font-display)] text-[17px] font-semibold text-[var(--ink-primary)] mb-1.5">
                  Property Scope
                </h3>
                <p className="type-body text-[var(--ink-body)]">{service.propertyScope}</p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[var(--bg-card)] border border-[var(--border-hairline)] rounded-[4px] card-pad">
                <h3 className="type-card-title text-[var(--ink-primary)] mb-4">
                  Common signs it is time to call
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {service.homeownerSigns.map((sign) => (
                    <li
                      key={sign}
                      className="flex items-start gap-3 text-[15px] leading-[1.55] text-[var(--ink-body)]"
                    >
                      <Check
                        className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Technician Process */}
      <section className="section-pad bg-[var(--bg-surface)] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="measure-intro mb-10">
            <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-2.5">
              On-Site Workflow
            </p>
            <h2 className="type-section-h2 text-[var(--ink-primary)]">
              Step-by-step from arrival to final check
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 fluid-grid-gap">
            {service.processSteps.map((step, index) => (
              <div
                key={step.step}
                className="bg-[var(--bg-card)] border border-[var(--border-hairline)] rounded-[4px] card-pad"
              >
                <span className="font-[var(--font-display)] text-[20px] font-bold text-[var(--brand-primary)] tabular-nums block mb-3">
                  0{index + 1}
                </span>
                <h3 className="type-card-title text-[var(--ink-primary)] mb-2">{step.step}</h3>
                <p className="type-body text-[var(--ink-body)]">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQ */}
      <section className="section-pad bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <FaqAccordion
            items={service.faqs}
            title={`Questions about ${service.shortTitle}`}
          />
        </div>
      </section>

      {/* Related Services */}
      <section className="section-pad-compact bg-[var(--bg-canvas)]">
        <div className="site-container">
          <h2 className="type-subsection-h3 text-[var(--ink-primary)] mb-6">
            Related Plumbing &amp; Septic Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 fluid-grid-gap">
            {otherServices.map((item) => (
              <a
                key={item.slug}
                href={`/services/${item.slug}`}
                onClick={(e) => handleLink(e, `/services/${item.slug}`)}
                className="group bg-[var(--bg-card)] border border-[var(--border-hairline)] hover:border-[var(--brand-primary)] rounded-[4px] p-5 flex flex-col justify-between gap-3 transition-colors"
              >
                <div>
                  <p className="type-eyebrow text-[var(--ink-muted)] mb-1.5">
                    {item.number} · {item.categoryLabel}
                  </p>
                  <h3 className="font-[var(--font-display)] text-[18px] font-semibold text-[var(--ink-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--brand-primary)]">
                  <span>View service</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading={`Schedule ${service.shortTitle.toLowerCase()} in West Georgia`}
        onNavigate={onNavigate}
        contactPath={`/contact?service=${service.slug}`}
      />
    </div>
  );
}
