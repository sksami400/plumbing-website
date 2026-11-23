import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterServicesByCategory,
  getCountyById,
  normalizeUsPhone,
  parseRoute,
  searchCountiesAndCities,
  validateServiceRequest,
} from './serviceLogic';

test('parseRoute resolves root, inner pages, and service detail slugs', () => {
  assert.deepEqual(parseRoute('/'), { page: 'home' });
  assert.deepEqual(parseRoute('/services/'), { page: 'services' });
  assert.deepEqual(parseRoute('/services/septic-pumping-repair'), {
    page: 'service-detail',
    slug: 'septic-pumping-repair',
  });
  assert.deepEqual(parseRoute('/services/unknown-slug'), { page: 'services' });
  assert.deepEqual(parseRoute('/about'), { page: 'about' });
  assert.deepEqual(parseRoute('/service-areas'), { page: 'service-areas' });
  assert.deepEqual(parseRoute('/contact', '?service=gas-lines-repiping&county=douglas'), {
    page: 'contact',
    preselectedService: 'gas-lines-repiping',
    preselectedCounty: 'douglas',
  });
});

test('filterServicesByCategory separates septic, plumbing, and specialty services', () => {
  const all = filterServicesByCategory('all');
  const septic = filterServicesByCategory('septic');
  const plumbing = filterServicesByCategory('plumbing');
  assert.equal(all.length, 5);
  assert.equal(septic.length, 1);
  assert.equal(septic[0].slug, 'septic-pumping-repair');
  assert.equal(plumbing.length, 2);
});

test('searchCountiesAndCities matches both county names and cities', () => {
  const byCity = searchCountiesAndCities('newnan');
  assert.equal(byCity.length, 1);
  assert.equal(byCity[0].id, 'coweta');

  const byCounty = searchCountiesAndCities('Carroll');
  assert.equal(byCounty.length, 1);
  assert.equal(byCounty[0].id, 'carroll');

  assert.equal(getCountyById('missing').id, 'carroll');
});

test('normalizeUsPhone formats 10-digit and 11-digit US numbers cleanly', () => {
  assert.equal(normalizeUsPhone('4048598371'), '(404) 859-8371');
  assert.equal(normalizeUsPhone('1-404-859-8371'), '(404) 859-8371');
  assert.equal(normalizeUsPhone('12345'), null);
});

test('validateServiceRequest catches invalid fields and formats valid submissions', () => {
  const invalid = validateServiceRequest({
    fullName: '',
    phone: '555',
    email: 'not-an-email',
    county: '',
    serviceSlug: '',
    urgency: 'standard',
    details: 'short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.county);
  assert.ok(invalid.errors.serviceSlug);
  assert.ok(invalid.errors.details);

  const valid = validateServiceRequest({
    fullName: 'Jordan Miller',
    phone: '4045550199',
    email: 'jordan@example.com',
    county: 'carroll',
    serviceSlug: 'septic-pumping-repair',
    urgency: 'emergency',
    details: 'Main bath drain is backing up into the utility room.',
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.formattedPhone, '(404) 555-0199');
  assert.match(valid.confirmationId ?? '', /^SPL-\d{4}$/);
});
