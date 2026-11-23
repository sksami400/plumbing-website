import { ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/siteData';

interface CtaBandProps {
  heading?: string;
  description?: string;
  onNavigate: (path: string) => void;
  contactPath?: string;
}

export function CtaBand({
  heading = 'Need reliable plumbing or septic help today?',
  description = 'Speak directly with our Carrollton dispatch team 24/7 or request an on-site visit online.',
  onNavigate,
  contactPath = '/contact',
}: CtaBandProps) {
  return (
    <section className="bg-[var(--bg-deep-elevated)] text-[var(--ink-on-dark)] border-t border-white/10">
      <div className="site-container section-pad-compact">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start lg:items-center fluid-grid-gap">
          <div className="lg:col-span-7 flex flex-col gap-3">
            <p className="type-eyebrow uppercase text-[#f2a6a3]">
              Carrollton &amp; West Georgia · Open 24/7
            </p>
            <h2 className="type-section-h2 text-white">{heading}</h2>
            <p className="type-intro text-[var(--ink-on-dark-muted)] measure-intro">
              {description}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-wrap lg:justify-end items-center gap-3.5">
            <a
              href={contactPath}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(contactPath);
              }}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-[4px] bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white type-button whitespace-nowrap shrink-0 transition-colors duration-150"
            >
              <span>Schedule Service</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-[4px] border border-white/25 hover:border-white/50 text-white type-button whitespace-nowrap shrink-0 transition-colors duration-150"
            >
              <Phone className="w-4 h-4 text-[#f2a6a3]" aria-hidden="true" />
              <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
