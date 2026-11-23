import {
  SERVICES,
  SERVICE_COUNTIES,
  type CountyArea,
  type ServiceCategory,
  type ServiceItem,
} from '../data/siteData';

export type PageRoute =
  | { page: 'home' }
  | { page: 'services' }
  | { page: 'service-detail'; slug: string }
  | { page: 'about' }
  | { page: 'service-areas' }
  | { page: 'contact'; preselectedService?: string; preselectedCounty?: string };

export interface ServiceRequestInput {
  fullName: string;
  phone: string;
  email: string;
  county: string;
  serviceSlug: string;
  urgency: 'standard' | 'emergency';
  details: string;
}

export interface ValidationErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  county?: string;
  serviceSlug?: string;
  details?: string;
}

export interface ServiceRequestResult {
  valid: boolean;
  errors: ValidationErrors;
  formattedPhone?: string;
  confirmationId?: string;
}

export function parseRoute(pathname: string, search = ''): PageRoute {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(search);

  if (cleanPath === '/' || cleanPath === '') {
    return { page: 'home' };
  }
  if (cleanPath === '/services') {
    return { page: 'services' };
  }
  if (cleanPath.startsWith('/services/')) {
    const slug = cleanPath.slice('/services/'.length).trim();
    const matched = SERVICES.find((s) => s.slug === slug);
    if (matched) {
      return { page: 'service-detail', slug: matched.slug };
    }
    return { page: 'services' };
  }
  if (cleanPath === '/about') {
    return { page: 'about' };
  }
  if (cleanPath === '/service-areas') {
    return { page: 'service-areas' };
  }
  if (cleanPath === '/contact') {
    const serviceParam = params.get('service') || undefined;
    const countyParam = params.get('county') || undefined;
    return {
      page: 'contact',
      preselectedService: SERVICES.some((s) => s.slug === serviceParam) ? serviceParam : undefined,
      preselectedCounty: SERVICE_COUNTIES.some((c) => c.id === countyParam) ? countyParam : undefined,
    };
  }
  return { page: 'home' };
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function filterServicesByCategory(category: 'all' | ServiceCategory): ServiceItem[] {
  if (category === 'all') {
    return SERVICES;
  }
  return SERVICES.filter((service) => service.category === category);
}

export function getCountyById(id: string): CountyArea {
  return SERVICE_COUNTIES.find((c) => c.id === id) ?? SERVICE_COUNTIES[0];
}

export function searchCountiesAndCities(query: string): CountyArea[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return SERVICE_COUNTIES;
  }
  return SERVICE_COUNTIES.filter(
    (county) =>
      county.name.toLowerCase().includes(normalized) ||
      county.communities.some((city) => city.toLowerCase().includes(normalized))
  );
}

export function normalizeUsPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  const trimmed = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (trimmed.length !== 10) {
    return null;
  }
  return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
}

export function validateServiceRequest(input: ServiceRequestInput): ServiceRequestResult {
  const errors: ValidationErrors = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  const formattedPhone = normalizeUsPhone(input.phone || '');
  if (!formattedPhone) {
    errors.phone = 'Enter a valid 10-digit US phone number.';
  }

  const emailTrimmed = (input.email || '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
    errors.email = 'Enter a valid email address for scheduling updates.';
  }

  if (!input.county || !SERVICE_COUNTIES.some((c) => c.id === input.county)) {
    errors.county = 'Select the county where service is needed.';
  }

  if (!input.serviceSlug || !SERVICES.some((s) => s.slug === input.serviceSlug)) {
    errors.serviceSlug = 'Select the service you need help with.';
  }

  if (!input.details || input.details.trim().length < 10) {
    errors.details = 'Share at least a brief description of the issue (10+ characters).';
  }

  const valid = Object.keys(errors).length === 0;
  if (!valid) {
    return { valid: false, errors };
  }

  const seed = `${input.fullName.trim()}-${formattedPhone}-${input.serviceSlug}`.length;
  const confirmationId = `SPL-${String(1040 + (seed % 8900))}`;

  return {
    valid: true,
    errors: {},
    formattedPhone: formattedPhone!,
    confirmationId,
  };
}
