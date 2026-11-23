import { ArrowRight, Check, MapPin, Phone } from 'lucide-react';
import {
  BUSINESS_INFO,
  IMAGES,
  PROCESS_STEPS,
  SERVICE_COUNTIES,
  SERVICES,
  TRUST_PILLARS,
} from '../data/siteData';
import { MediaFrame } from '../components/MediaFrame';
import { CtaBand } from '../components/CtaBand';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredSeptic = SERVICES[0];
  const featuredPlumbing = SERVICES[1];
  const supportingServices = SERVICES.slice(2);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div>
      {/* 1. Hero Section: Left-aligned content (55%) + Authentic craft imagery right (45%) */}
      <section className="section-pad-compact bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch fluid-grid-gap">
            <div className="lg:col-span-7 flex flex-col justify-center py-2 lg:py-6">
              <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-4">
                Carrollton &amp; West Georgia · Open 24/7
              </p>

              <h1 className="type-hero-h1 text-[var(--ink-primary)] measure-hero mb-5">
                Dependable plumbing and septic care,{' '}
                <span className="type-serif-accent text-[var(--brand-primary)] font-normal">
                  built to last.
                </span>
              </h1>

              <p className="type-intro text-[var(--ink-body)] measure-hero mb-7">
                From routine septic tank pump-outs and field line repairs to water heaters, gas
                piping, and emergency leaks—handled by one family-owned Carrollton team.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 mb-7">
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-[4px] bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white type-button whitespace-nowrap shrink-0 transition-colors duration-150"
                >
                  <span>Schedule Service</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-card)] hover:border-[var(--ink-primary)] text-[var(--ink-primary)] type-button whitespace-nowrap shrink-0 transition-colors duration-150"
                >
                  <Phone className="w-4 h-4 text-[var(--brand-primary)]" aria-hidden="true" />
                  <span className="tabular-nums">Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-3 gap-y-1.5 text-[14px] text-[var(--ink-muted)]">
                <span className="whitespace-nowrap">Family-Owned in Carrollton, GA</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span className="whitespace-nowrap">BBB A+ Accredited</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span className="whitespace-nowrap">Residential &amp; Commercial</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <MediaFrame
                src={IMAGES.heroCraft}
                alt="Master plumber inspecting copper and brass water heater manifold piping"
                focalPoint="68% 28%"
                priority
                className="w-full aspect-[16/10] lg:aspect-auto lg:min-h-[440px] rounded-[4px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Services Section: Controlled Asymmetry (Featured 7/5 + 3-col supporting row) */}
      <section className="section-pad bg-[var(--bg-canvas)]">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="measure-intro">
              <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-2.5">
                Plumbing &amp; LSJK Septic
              </p>
              <h2 className="type-section-h2 text-[var(--ink-primary)]">
                Complete service from indoor fixtures to underground field lines
              </h2>
            </div>

            <a
              href="/services"
              onClick={(e) => handleLink(e, '/services')}
              className="inline-flex items-center gap-2 type-button text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] whitespace-nowrap shrink-0 min-h-[44px]"
            >
              <span>View all services</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Primary Asymmetric Pair: 7 cols Septic Feature + 5 cols Plumbing Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 fluid-grid-gap mb-6">
            <article className="lg:col-span-7 bg-[var(--bg-card)] border border-[var(--border-hairline)] rounded-[4px] overflow-hidden flex flex-col">
              <MediaFrame
                src={featuredSeptic.heroImage}
                alt={featuredSeptic.heroAlt}
                className="aspect-[16/9] border-0 border-b border-[var(--border-hairline)] rounded-none"
              />
              <div className="card-pad flex flex-col flex-1 justify-between gap-5">
                <div>
                  <p className="type-eyebrow text-[var(--ink-muted)] mb-2">
                    {featuredSeptic.number} · {featuredSeptic.categoryLabel}
                  </p>
                  <h3 className="type-subsection-h3 text-[var(--ink-primary)] mb-3">
                    {featuredSeptic.title}
                  </h3>
                  <p className="type-body text-[var(--ink-body)] measure-prose">
                    {featuredSeptic.summary}
                  </p>
                </div>

                <div>
                  <a
                    href={`/services/${featuredSeptic.slug}`}
                    onClick={(e) => handleLink(e, `/services/${featuredSeptic.slug}`)}
                    className="inline-flex items-center gap-2 type-button text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] min-h-[44px]"
                  >
                    <span>Explore septic service</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>

            <article className="lg:col-span-5 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] card-pad flex flex-col justify-between gap-6">
              <div>
                <p className="type-eyebrow text-[var(--ink-muted)] mb-2">
                  {featuredPlumbing.number} · {featuredPlumbing.categoryLabel}
                </p>
                <h3 className="type-subsection-h3 text-[var(--ink-primary)] mb-3">
                  {featuredPlumbing.title}
                </h3>
                <p className="type-body text-[var(--ink-body)] mb-6">
                  {featuredPlumbing.summary}
                </p>

                <ul className="border-t border-[var(--border-hairline)] pt-5 flex flex-col gap-3">
                  {featuredPlumbing.homeownerSigns.slice(0, 3).map((sign) => (
                    <li key={sign} className="flex items-start gap-2.5 text-[15px] text-[var(--ink-body)]">
                      <Check
                        className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[var(--border-hairline)]">
                <a
                  href={`/services/${featuredPlumbing.slug}`}
                  onClick={(e) => handleLink(e, `/services/${featuredPlumbing.slug}`)}
                  className="inline-flex items-center gap-2 type-button text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] min-h-[44px]"
                >
                  <span>Explore water heaters &amp; repairs</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>

          {/* Supporting Services Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 fluid-grid-gap">
            {supportingServices.map((service) => (
              <article
                key={service.slug}
                className="bg-[var(--bg-card)] border border-[var(--border-hairline)] rounded-[4px] card-pad flex flex-col justify-between gap-5"
              >
                <div>
                  <p className="type-eyebrow text-[var(--ink-muted)] mb-2">
                    {service.number} · {service.categoryLabel}
                  </p>
                  <h3 className="type-card-title text-[var(--ink-primary)] mb-2.5">
                    {service.title}
                  </h3>
                  <p className="type-body text-[var(--ink-body)]">{service.summary}</p>
                </div>

                <div>
                  <a
                    href={`/services/${service.slug}`}
                    onClick={(e) => handleLink(e, `/services/${service.slug}`)}
                    className="inline-flex items-center gap-1.5 type-button text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] min-h-[44px]"
                  >
                    <span>Service details</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Editorial About Section: 45/55 split on soft limestone surface */}
      <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center fluid-grid-gap">
            <div className="lg:col-span-5">
              <MediaFrame
                src={IMAGES.bathroomFixtures}
                alt="Finished bathroom renovation with brushed nickel faucet and limestone countertop"
                className="aspect-[4/3] rounded-[4px]"
              />
            </div>

            <div className="lg:col-span-7 lg:pl-6">
              <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-3">
                Local Accountability
              </p>
              <h2 className="type-section-h2 text-[var(--ink-primary)] mb-5 measure-intro">
                One Carrollton shop built on straightforward answers and tidy work
              </h2>
              <div className="flex flex-col gap-4 measure-prose type-body text-[var(--ink-body)] mb-7">
                <p>
                  Based on North US-27 in Carrollton, Scott’s Plumbing and LSJK Septic operates as a
                  family-owned residential and commercial contractor. Instead of splitting indoor
                  plumbing and outdoor septic work across separate companies, our crew handles the
                  entire system from your kitchen sink to the drain field.
                </p>
                <p>
                  Customers across West Georgia count on us for clear explanations before work
                  starts, fair pricing, and respect for floors, driveways, and landscaping.
                </p>
              </div>

              <a
                href="/about"
                onClick={(e) => handleLink(e, '/about')}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-card)] hover:border-[var(--ink-primary)] text-[var(--ink-primary)] type-button transition-colors"
              >
                <span>About our team</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process & Why Choose Us: Intentional Asymmetry */}
      <section className="section-pad bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 fluid-grid-gap">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-2.5">
                  How We Work
                </p>
                <h2 className="type-section-h2 text-[var(--ink-primary)] mb-4">
                  Practical diagnostics before any digging or replacement
                </h2>
                <p className="type-body text-[var(--ink-body)]">
                  Whether it is an urgent midnight leak or planned septic maintenance, every call
                  follows a disciplined three-step process.
                </p>
              </div>

              <MediaFrame
                src={IMAGES.waterLineTrench}
                alt="Schedule 40 PVC and copper water service piping neatly bedded in trench"
                className="aspect-[4/3] rounded-[4px]"
              />
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <ol className="border-t border-[var(--border-hairline)]">
                {PROCESS_STEPS.map((step) => (
                  <li
                    key={step.number}
                    className="py-6 border-b border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-start"
                  >
                    <span className="sm:col-span-2 font-[var(--font-display)] text-[22px] font-bold text-[var(--brand-primary)] tabular-nums">
                      {step.number}
                    </span>
                    <div className="sm:col-span-10">
                      <h3 className="type-card-title text-[var(--ink-primary)] mb-2">
                        {step.title}
                      </h3>
                      <p className="type-body text-[var(--ink-body)]">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] card-pad">
                {TRUST_PILLARS.slice(0, 2).map((pillar) => (
                  <div key={pillar.title}>
                    <h3 className="font-[var(--font-display)] text-[17px] font-semibold text-[var(--ink-primary)] mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-[var(--ink-body)]">
                      {pillar.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. West Georgia Service Areas Preview */}
      <section className="section-pad bg-[var(--bg-canvas)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 fluid-grid-gap items-start">
            <div className="lg:col-span-5">
              <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-2.5">
                Regional Dispatch
              </p>
              <h2 className="type-section-h2 text-[var(--ink-primary)] mb-4">
                Serving Carrollton and seven West Georgia counties
              </h2>
              <p className="type-body text-[var(--ink-body)] mb-6">
                Dispatched from {BUSINESS_INFO.fullAddress}, our plumbing and septic trucks travel
                across surrounding towns for scheduled work and 24-hour emergencies.
              </p>

              <a
                href="/service-areas"
                onClick={(e) => handleLink(e, '/service-areas')}
                className="inline-flex items-center gap-2 type-button text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] min-h-[44px]"
              >
                <span>Explore all service areas</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICE_COUNTIES.map((county) => (
                <a
                  key={county.id}
                  href={`/contact?county=${county.id}`}
                  onClick={(e) => handleLink(e, `/contact?county=${county.id}`)}
                  className="group bg-[var(--bg-card)] border border-[var(--border-hairline)] hover:border-[var(--brand-primary)] rounded-[4px] p-5 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-[var(--font-display)] text-[18px] font-semibold text-[var(--ink-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
                      {county.name}
                    </h3>
                    <MapPin
                      className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--brand-primary)] shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-[14px] text-[var(--ink-muted)]">
                    {county.communities.slice(0, 4).join(' · ')}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand onNavigate={onNavigate} />
    </div>
  );
}
