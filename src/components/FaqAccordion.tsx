import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ServiceFaq } from '../data/siteData';

interface FaqAccordionProps {
  items: ServiceFaq[];
  title?: string;
  intro?: string;
}

export function FaqAccordion({
  items,
  title = 'Common Questions',
  intro,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="measure-faq">
      <div className="mb-6">
        <h2 className="type-section-h2 text-[var(--ink-primary)]">{title}</h2>
        {intro && (
          <p className="type-body text-[var(--ink-body)] mt-3">{intro}</p>
        )}
      </div>

      <div className="border-t border-[var(--border-hairline)]">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={item.question} className="border-b border-[var(--border-hairline)]">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left min-h-[48px] group"
              >
                <span className="font-[var(--font-display)] text-[17px] sm:text-[18px] font-semibold leading-[1.35] text-[var(--ink-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-[var(--ink-muted)] transition-transform duration-150 ${
                    isOpen ? 'rotate-180 text-[var(--brand-primary)]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div className="pb-5 pr-8">
                  <p className="type-body text-[var(--ink-body)]">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
