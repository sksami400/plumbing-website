import { useState } from 'react';
import { ArrowRight, Check, MapPin, Phone, Search } from 'lucide-react';
import { BUSINESS_INFO, SERVICE_COUNTIES } from '../data/siteData';
import { getCountyById, searchCountiesAndCities } from '../utils/serviceLogic';
import { CtaBand } from '../components/CtaBand';

interface ServiceAreasPageProps {
  onNavigate: (path: string) => void;
}

export function ServiceAreasPage({ onNavigate }: ServiceAreasPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountyId, setSelectedCountyId] = useState(SERVICE_COUNTIES[0].id);

  const filteredCounties = searchCountiesAndCities(searchQuery);
  const activeCounty =
    filteredCounties.find((c) => c.id === selectedCountyId) ??
    filteredCounties[0] ??
    getCountyById(selectedCountyId);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div>
      {/* Header */}
      <section className="section-pad-compact bg-[var(--bg-surface)] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="measure-intro">
            <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-3">
              West Georgia Coverage
            </p>
            <h1 className="type-inner-h1 text-[var(--ink-primary)] mb-4">
              Plumbing &amp; septic service areas across seven Georgia counties
            </h1>
            <p className="type-intro text-[var(--ink-body)]">
              Dispatched from our shop at {BUSINESS_INFO.fullAddress}, our trucks cover Carrollton
              and neighboring communities day and night.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive County Directory */}
      <section className="section-pad bg-[var(--bg-canvas)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 fluid-grid-gap items-start">
            {/* Left Column: Search + County Selector */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div>
                <label
                  htmlFor="county-city-search"
                  className="block type-nav text-[var(--ink-primary)] mb-2"
                >
                  Find your county or town
                </label>
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-[var(--ink-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="county-city-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search e.g. Carrollton, Newnan, Bremen..."
                    className="w-full min-h-[46px] pl-10 pr-4 py-2.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--ink-primary)] text-[15px] placeholder:text-[var(--ink-muted)]"
                  />
                </div>
              </div>

              {filteredCounties.length > 0 ? (
                <div
                  role="list"
                  aria-label="West Georgia counties served"
                  className="flex flex-col gap-2"
                >
                  {filteredCounties.map((county) => {
                    const isSelected = activeCounty.id === county.id;
                    return (
                      <button
                        key={county.id}
                        type="button"
                        onClick={() => setSelectedCountyId(county.id)}
                        aria-pressed={isSelected}
                        className={`w-full text-left px-4 py-3.5 min-h-[54px] rounded-[4px] border transition-colors flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white'
                            : 'bg-[var(--bg-card)] border-[var(--border-hairline)] hover:border-[var(--border-strong)] text-[var(--ink-primary)]'
                        }`}
                      >
                        <div>
                          <span className="font-[var(--font-display)] font-semibold text-[16px] block">
                            {county.name}
                          </span>
                          <span
                            className={`text-[13px] ${
                              isSelected ? 'text-white/85' : 'text-[var(--ink-muted)]'
                            }`}
                          >
                            {county.communities.slice(0, 3).join(', ')}
                          </span>
                        </div>
                        <MapPin
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-white' : 'text-[var(--brand-primary)]'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] p-5">
                  <p className="type-body text-[var(--ink-body)] mb-3">
                    No matching town found for &ldquo;{searchQuery}&rdquo;. Call us to confirm if
                    your property is on our West Georgia route.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="min-h-[44px] px-4 py-2 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-card)] type-button text-[var(--ink-primary)] hover:border-[var(--ink-primary)]"
                  >
                    Show all counties
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Selected County Details */}
            <div className="lg:col-span-7">
              <div className="bg-[var(--bg-card)] border border-[var(--border-hairline)] rounded-[4px] card-pad flex flex-col gap-6">
                <div className="pb-5 border-b border-[var(--border-hairline)]">
                  <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-2">
                    {activeCounty.regionNote}
                  </p>
                  <h2 className="type-section-h2 text-[var(--ink-primary)] mb-3">
                    {activeCounty.name}
                  </h2>
                  <p className="type-body text-[var(--ink-body)] measure-prose">
                    {activeCounty.localFocus}
                  </p>
                </div>

                <div>
                  <h3 className="font-[var(--font-display)] text-[16px] font-semibold text-[var(--ink-primary)] mb-3">
                    Cities &amp; Communities Covered
                  </h3>
                  <p className="type-body text-[var(--ink-body)]">
                    {activeCounty.communities.join(' · ')}
                  </p>
                </div>

                <div>
                  <h3 className="font-[var(--font-display)] text-[16px] font-semibold text-[var(--ink-primary)] mb-3">
                    Frequent Calls in {activeCounty.name}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {activeCounty.primaryServices.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[15px] text-[var(--ink-body)]"
                      >
                        <Check
                          className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-1"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-[var(--border-hairline)] flex flex-wrap items-center gap-3.5">
                  <a
                    href={`/contact?county=${activeCounty.id}`}
                    onClick={(e) => handleLink(e, `/contact?county=${activeCounty.id}`)}
                    className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-[4px] bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white type-button whitespace-nowrap transition-colors"
                  >
                    <span>Schedule in {activeCounty.name}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>

                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center gap-2 min-h-[48px] px-5 py-3 rounded-[4px] border border-[var(--border-strong)] hover:border-[var(--ink-primary)] text-[var(--ink-primary)] type-button whitespace-nowrap transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[var(--brand-primary)]" aria-hidden="true" />
                    <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand onNavigate={onNavigate} contactPath={`/contact?county=${activeCounty.id}`} />
    </div>
  );
}
