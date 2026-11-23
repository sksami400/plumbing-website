import { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import {
  BUSINESS_INFO,
  HOMEOWNER_FAQS,
  SERVICE_COUNTIES,
  SERVICES,
} from '../data/siteData';
import {
  validateServiceRequest,
  type ServiceRequestInput,
  type ValidationErrors,
} from '../utils/serviceLogic';
import { FaqAccordion } from '../components/FaqAccordion';

interface ContactPageProps {
  preselectedService?: string;
  preselectedCounty?: string;
}

interface SubmittedReceipt {
  confirmationId: string;
  fullName: string;
  formattedPhone: string;
  email: string;
  countyName: string;
  serviceTitle: string;
  urgency: 'standard' | 'emergency';
  details: string;
  submittedAt: string;
}

const STORAGE_KEY = 'scotts_plumbing_last_request_v1';

export function ContactPage({
  preselectedService,
  preselectedCounty,
}: ContactPageProps) {
  const [formState, setFormState] = useState<ServiceRequestInput>({
    fullName: '',
    phone: '',
    email: '',
    county: preselectedCounty || 'carroll',
    serviceSlug: preselectedService || SERVICES[0].slug,
    urgency: 'standard',
    details: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [receipt, setReceipt] = useState<SubmittedReceipt | null>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as SubmittedReceipt) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      county: preselectedCounty || prev.county,
      serviceSlug: preselectedService || prev.serviceSlug,
    }));
  }, [preselectedService, preselectedCounty]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateServiceRequest(formState);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    const countyName =
      SERVICE_COUNTIES.find((c) => c.id === formState.county)?.name || 'Carroll County';
    const serviceTitle =
      SERVICES.find((s) => s.slug === formState.serviceSlug)?.title || SERVICES[0].title;

    const newReceipt: SubmittedReceipt = {
      confirmationId: result.confirmationId!,
      fullName: formState.fullName.trim(),
      formattedPhone: result.formattedPhone!,
      email: formState.email.trim(),
      countyName,
      serviceTitle,
      urgency: formState.urgency,
      details: formState.details.trim(),
      submittedAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
    };

    setErrors({});
    setReceipt(newReceipt);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newReceipt));
    } catch {
      // Ignore storage quota issues cleanly
    }
  };

  const handleReset = () => {
    setReceipt(null);
    setFormState({
      fullName: '',
      phone: '',
      email: '',
      county: preselectedCounty || 'carroll',
      serviceSlug: preselectedService || SERVICES[0].slug,
      urgency: 'standard',
      details: '',
    });
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="section-pad-compact bg-[var(--bg-surface)] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="measure-intro">
            <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-3">
              24/7 Dispatch &amp; Scheduling
            </p>
            <h1 className="type-inner-h1 text-[var(--ink-primary)] mb-4">
              Request plumbing or septic service
            </h1>
            <p className="type-intro text-[var(--ink-body)]">
              Call <span className="font-semibold text-[var(--ink-primary)] tabular-nums">{BUSINESS_INFO.phoneDisplay}</span> anytime for urgent leaks or backups, or send your project details below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="section-pad bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 fluid-grid-gap items-start">
            {/* Form / Confirmation Column */}
            <div className="lg:col-span-7">
              {receipt ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="bg-[var(--bg-card)] border border-[var(--border-hairline)] rounded-[4px] card-pad flex flex-col gap-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-[#1f6b3b] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="type-eyebrow uppercase text-[#1f6b3b] mb-1">
                        Request Logged · Ref {receipt.confirmationId}
                      </p>
                      <h2 className="type-subsection-h3 text-[var(--ink-primary)]">
                        Thank you, {receipt.fullName}. Your service details are ready.
                      </h2>
                    </div>
                  </div>

                  <p className="type-body text-[var(--ink-body)]">
                    For immediate emergency dispatch, please call{' '}
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="font-semibold text-[var(--brand-primary)] underline underline-offset-4 tabular-nums"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>{' '}
                    and share reference <span className="font-semibold">{receipt.confirmationId}</span>.
                  </p>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[var(--border-hairline)] text-[15px]">
                    <div>
                      <dt className="text-[var(--ink-muted)] text-[13px]">Service Requested</dt>
                      <dd className="font-semibold text-[var(--ink-primary)] mt-0.5">
                        {receipt.serviceTitle}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[var(--ink-muted)] text-[13px]">County</dt>
                      <dd className="font-semibold text-[var(--ink-primary)] mt-0.5">
                        {receipt.countyName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[var(--ink-muted)] text-[13px]">Callback Number</dt>
                      <dd className="font-semibold text-[var(--ink-primary)] mt-0.5 tabular-nums">
                        {receipt.formattedPhone}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[var(--ink-muted)] text-[13px]">Priority</dt>
                      <dd className="font-semibold text-[var(--ink-primary)] mt-0.5">
                        {receipt.urgency === 'emergency' ? '24/7 Urgent Dispatch' : 'Standard Scheduling'}
                      </dd>
                    </div>
                  </dl>

                  <div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="min-h-[44px] px-5 py-2.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:border-[var(--ink-primary)] text-[var(--ink-primary)] type-button transition-colors"
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-[var(--bg-card)] border border-[var(--border-hairline)] rounded-[4px] card-pad flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="req-full-name"
                        className="block type-nav text-[var(--ink-primary)] mb-1.5"
                      >
                        Full Name
                      </label>
                      <input
                        id="req-full-name"
                        name="fullName"
                        type="text"
                        required
                        value={formState.fullName}
                        onChange={(e) => {
                          setFormState((p) => ({ ...p, fullName: e.target.value }));
                          if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                        }}
                        aria-invalid={Boolean(errors.fullName)}
                        placeholder="e.g. Jordan Miller"
                        className="w-full min-h-[46px] px-3.5 py-2.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--ink-primary)] text-[15px]"
                      />
                      {errors.fullName && (
                        <p role="alert" className="text-[13px] text-[var(--brand-primary)] mt-1.5">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="req-phone"
                        className="block type-nav text-[var(--ink-primary)] mb-1.5"
                      >
                        Phone Number
                      </label>
                      <input
                        id="req-phone"
                        name="phone"
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => {
                          setFormState((p) => ({ ...p, phone: e.target.value }));
                          if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                        }}
                        aria-invalid={Boolean(errors.phone)}
                        placeholder="(404) 555-0199"
                        className="w-full min-h-[46px] px-3.5 py-2.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--ink-primary)] text-[15px]"
                      />
                      {errors.phone && (
                        <p role="alert" className="text-[13px] text-[var(--brand-primary)] mt-1.5">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="req-email"
                        className="block type-nav text-[var(--ink-primary)] mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        id="req-email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => {
                          setFormState((p) => ({ ...p, email: e.target.value }));
                          if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                        }}
                        aria-invalid={Boolean(errors.email)}
                        placeholder="you@example.com"
                        className="w-full min-h-[46px] px-3.5 py-2.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--ink-primary)] text-[15px]"
                      />
                      {errors.email && (
                        <p role="alert" className="text-[13px] text-[var(--brand-primary)] mt-1.5">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="req-county"
                        className="block type-nav text-[var(--ink-primary)] mb-1.5"
                      >
                        County
                      </label>
                      <select
                        id="req-county"
                        name="county"
                        value={formState.county}
                        onChange={(e) =>
                          setFormState((p) => ({ ...p, county: e.target.value }))
                        }
                        className="w-full min-h-[46px] px-3.5 py-2.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--ink-primary)] text-[15px]"
                      >
                        {SERVICE_COUNTIES.map((county) => (
                          <option key={county.id} value={county.id}>
                            {county.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="req-service"
                      className="block type-nav text-[var(--ink-primary)] mb-1.5"
                    >
                      Service Needed
                    </label>
                    <select
                      id="req-service"
                      name="serviceSlug"
                      value={formState.serviceSlug}
                      onChange={(e) =>
                        setFormState((p) => ({ ...p, serviceSlug: e.target.value }))
                      }
                      className="w-full min-h-[46px] px-3.5 py-2.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--ink-primary)] text-[15px]"
                    >
                      {SERVICES.map((service) => (
                        <option key={service.slug} value={service.slug}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="block type-nav text-[var(--ink-primary)] mb-2">
                      Urgency
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        aria-pressed={formState.urgency === 'standard'}
                        onClick={() => setFormState((p) => ({ ...p, urgency: 'standard' }))}
                        className={`min-h-[44px] px-4 py-2.5 rounded-[4px] border type-nav text-left transition-colors ${
                          formState.urgency === 'standard'
                            ? 'bg-[var(--bg-deep)] border-[var(--bg-deep)] text-white'
                            : 'bg-[var(--bg-canvas)] border-[var(--border-strong)] text-[var(--ink-primary)]'
                        }`}
                      >
                        Standard Appointment
                      </button>
                      <button
                        type="button"
                        aria-pressed={formState.urgency === 'emergency'}
                        onClick={() => setFormState((p) => ({ ...p, urgency: 'emergency' }))}
                        className={`min-h-[44px] px-4 py-2.5 rounded-[4px] border type-nav text-left transition-colors ${
                          formState.urgency === 'emergency'
                            ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white'
                            : 'bg-[var(--bg-canvas)] border-[var(--border-strong)] text-[var(--ink-primary)]'
                        }`}
                      >
                        24/7 Urgent Dispatch
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="req-details"
                      className="block type-nav text-[var(--ink-primary)] mb-1.5"
                    >
                      Describe the Issue or Project
                    </label>
                    <textarea
                      id="req-details"
                      name="details"
                      rows={4}
                      required
                      value={formState.details}
                      onChange={(e) => {
                        setFormState((p) => ({ ...p, details: e.target.value }));
                        if (errors.details) setErrors((p) => ({ ...p, details: undefined }));
                      }}
                      aria-invalid={Boolean(errors.details)}
                      placeholder="Tell us what you are seeing (e.g., water heater leaking, septic pump-out needed, slow main drain)..."
                      className="w-full px-3.5 py-2.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--ink-primary)] text-[15px]"
                    />
                    {errors.details && (
                      <p role="alert" className="text-[13px] text-[var(--brand-primary)] mt-1.5">
                        {errors.details}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-fit min-h-[48px] px-7 py-3 rounded-[4px] bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white type-button transition-colors"
                  >
                    Submit Service Request
                  </button>
                </form>
              )}
            </div>

            {/* Direct Office Information */}
            <aside className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] card-pad flex flex-col gap-5">
                <div>
                  <p className="type-eyebrow uppercase text-[var(--brand-primary)] mb-2">
                    Carrollton Shop
                  </p>
                  <h2 className="type-subsection-h3 text-[var(--ink-primary)]">
                    Direct Contact
                  </h2>
                </div>

                <ul className="flex flex-col gap-4 border-t border-[var(--border-hairline)] pt-5">
                  <li className="flex items-start gap-3">
                    <Phone
                      className="w-5 h-5 text-[var(--brand-primary)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="block text-[13px] text-[var(--ink-muted)]">
                        24/7 Dispatch Line
                      </span>
                      <a
                        href={BUSINESS_INFO.phoneHref}
                        className="font-[var(--font-display)] text-[19px] font-bold text-[var(--ink-primary)] hover:text-[var(--brand-primary)] tabular-nums transition-colors"
                      >
                        {BUSINESS_INFO.phoneDisplay}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Mail
                      className="w-5 h-5 text-[var(--brand-primary)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="block text-[13px] text-[var(--ink-muted)]">Email</span>
                      <a
                        href={BUSINESS_INFO.emailHref}
                        className="text-[16px] font-medium text-[var(--ink-primary)] hover:text-[var(--brand-primary)] break-all transition-colors"
                      >
                        {BUSINESS_INFO.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <MapPin
                      className="w-5 h-5 text-[var(--brand-primary)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="block text-[13px] text-[var(--ink-muted)]">Address</span>
                      <p className="text-[16px] text-[var(--ink-primary)] flex flex-col">
                        <span>{BUSINESS_INFO.addressLine1}</span>
                        <span>{BUSINESS_INFO.cityStateZip}</span>
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Clock
                      className="w-5 h-5 text-[var(--brand-primary)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="block text-[13px] text-[var(--ink-muted)]">Hours</span>
                      <p className="text-[16px] text-[var(--ink-primary)]">
                        {BUSINESS_INFO.hoursSummary}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Homeowner FAQ */}
      <section className="section-pad bg-[var(--bg-canvas)]">
        <div className="site-container">
          <FaqAccordion
            items={HOMEOWNER_FAQS}
            title="Before You Call"
            intro="Quick answers on scheduling, septic pumping preparation, and emergency response across West Georgia."
          />
        </div>
      </section>
    </div>
  );
}
