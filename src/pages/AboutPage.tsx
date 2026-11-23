import { ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_INFO, IMAGES, TRUST_PILLARS } from '../data/siteData';
import { MediaFrame } from '../components/MediaFrame';
import { CtaBand } from '../components/CtaBand';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div>
      {/* Header Band */}
      <section className="section-pad-compact bg-[var(--bg-surface)] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="measure-intro">
            <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-3">
              About Our Company · Carrollton, GA
            </p>
            <h1 className="type-inner-h1 text-[var(--ink-primary)] mb-4">
              Family-owned plumbing and septic service, rooted in{' '}
              <span className="type-serif-accent text-[var(--brand-primary)] font-normal">
                honest workmanship.
              </span>
            </h1>
            <p className="type-intro text-[var(--ink-body)]">
              Scott’s Plumbing and LSJK Septic operates out of {BUSINESS_INFO.fullAddress}, serving
              homeowners, landlords, and commercial properties across West Georgia 24 hours a day.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Story Split */}
      <section className="section-pad bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center fluid-grid-gap">
            <div className="lg:col-span-5">
              <MediaFrame
                src={IMAGES.septicTruck}
                alt="Scott's Plumbing and LSJK Septic service truck parked at a West Georgia home"
                className="aspect-[4/3] rounded-[4px]"
              />
            </div>

            <div className="lg:col-span-7 lg:pl-6 flex flex-col gap-4 measure-prose">
              <h2 className="type-section-h2 text-[var(--ink-primary)]">
                Why Scott’s Plumbing &amp; LSJK Septic work as one team
              </h2>
              <p className="type-body text-[var(--ink-body)]">
                Many West Georgia properties sit on septic systems rather than municipal sewer—and
                when a drain slows down or backs up, homeowners are often caught in the middle
                between a plumber who stops at the exterior wall and a septic pumper who will not
                troubleshoot interior fixtures.
              </p>
              <p className="type-body text-[var(--ink-body)]">
                By combining full-service residential and commercial plumbing with complete LSJK
                Septic pumping, field line repairs, and tank installations, our crew takes full
                responsibility for the entire wastewater and water supply system. We show up on time,
                explain what we find in plain language, and protect your home and yard while working.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-3.5">
                <a
                  href="/services"
                  onClick={(e) => handleLink(e, '/services')}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-[4px] bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white type-button transition-colors"
                >
                  <span>Explore our services</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-card)] hover:border-[var(--ink-primary)] text-[var(--ink-primary)] type-button transition-colors"
                >
                  <Phone className="w-4 h-4 text-[var(--brand-primary)]" aria-hidden="true" />
                  <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="section-pad bg-[var(--bg-surface)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 fluid-grid-gap">
            <div className="lg:col-span-4">
              <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-2.5">
                How We Operate
              </p>
              <h2 className="type-section-h2 text-[var(--ink-primary)]">
                Built on trust across Carrollton &amp; West Georgia
              </h2>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 fluid-grid-gap">
              {TRUST_PILLARS.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="bg-[var(--bg-card)] border border-[var(--border-hairline)] rounded-[4px] card-pad"
                >
                  <span className="font-[var(--font-display)] text-[14px] font-bold text-[var(--brand-primary)] tabular-nums block mb-2">
                    0{index + 1}
                  </span>
                  <h3 className="type-card-title text-[var(--ink-primary)] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="type-body text-[var(--ink-body)]">{pillar.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand onNavigate={onNavigate} />
    </div>
  );
}
