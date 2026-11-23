export type ServiceCategory = 'septic' | 'plumbing' | 'specialty';

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  slug: string;
  number: string;
  category: ServiceCategory;
  categoryLabel: string;
  title: string;
  shortTitle: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  overviewParagraphs: string[];
  homeownerSigns: string[];
  processSteps: {
    step: string;
    detail: string;
  }[];
  propertyScope: string;
  faqs: ServiceFaq[];
}

export interface CountyArea {
  id: string;
  name: string;
  regionNote: string;
  communities: string[];
  localFocus: string;
  primaryServices: string[];
}

export const BUSINESS_INFO = {
  brandName: "Scott's Plumbing & LSJK Septic",
  shortBrand: "Scott's Plumbing & Septic",
  logoUrl: '/assets/aistudio/Logo_1_TRANSPARENT_ec4fac20.png',
  addressLine1: '4226 N US-27',
  cityStateZip: 'Carrollton, GA 30117',
  fullAddress: '4226 N US-27, Carrollton, GA 30117',
  phoneDisplay: '(404) 859-8371',
  phoneHref: 'tel:+14048598371',
  email: 'scottsplumbing7@gmail.com',
  emailHref: 'mailto:scottsplumbing7@gmail.com',
  hoursSummary: 'Open 24 hours, 7 days a week',
  accreditation: 'BBB A+ Accredited Business',
  ownership: 'Family-Owned & Operated in Carrollton, Georgia',
  website: 'https://www.scottsplumbinglsjkseptic.com/',
};

export const IMAGES = {
  heroCraft: '/src/assets/images/hero_plumbing_craft_1795430660931.jpg',
  septicTruck: '/src/assets/images/septic_service_field_1795430660608.jpg',
  bathroomFixtures: '/src/assets/images/bathroom_fixture_detail_1795430660906.jpg',
  waterLineTrench: '/src/assets/images/water_line_excavation_1795430661256.jpg',
};

export const SERVICES: ServiceItem[] = [
  {
    slug: 'septic-pumping-repair',
    number: '01',
    category: 'septic',
    categoryLabel: 'LSJK Septic',
    title: 'Septic Pumping, Repairs & Field Lines',
    shortTitle: 'Septic Systems',
    summary:
      'Complete septic tank pump-outs, system diagnostics, field line replacement, and new tank installations for West Georgia homes and businesses.',
    heroImage: IMAGES.septicTruck,
    heroAlt: 'Septic service truck parked cleanly along a residential gravel driveway in West Georgia',
    overviewParagraphs: [
      'A healthy septic system works quietly out of sight until routine maintenance falls behind or Georgia red clay shifts a distribution line. Through our LSJK Septic division, Scott’s Plumbing handles routine tank pumping, baffle and riser repairs, field line replacements, and full septic installations from one local team.',
      'Before digging or recommending major excavation, we locate your tank access, check liquid and sludge levels, inspect inlet and outlet tees, and evaluate how your drain field absorbs wastewater. You get a plain explanation of what your system needs today and what can wait.',
    ],
    homeownerSigns: [
      'Slow-draining tubs, showers, or toilets across multiple rooms',
      'Standing water, damp patches, or unusually lush grass over the drain field',
      'Noticeable septic odors outdoors near the tank lid or inside utility drains',
      'More than three to five years since your last documented tank pump-out',
    ],
    processSteps: [
      {
        step: 'Locate & Expose Access',
        detail: 'We pinpoint the tank lid cleanly and protect surrounding landscaping while opening access.',
      },
      {
        step: 'Pump & Inspect Components',
        detail: 'Complete solids removal paired with an inspection of tank walls, baffles, and outlet flow.',
      },
      {
        step: 'Verify Drain Field Performance',
        detail: 'If field lines show saturation or root intrusion, we outline clear repair or replacement options.',
      },
    ],
    propertyScope: 'Residential acreage, rural estates, commercial facilities, and real estate inspection pump-outs.',
    faqs: [
      {
        question: 'How often should a residential septic tank be pumped in West Georgia?',
        answer:
          'Most households benefit from pumping every three to five years depending on tank capacity, household size, and water usage. Regular pumping prevents solids from migrating into the drain field where repairs become far more invasive.',
      },
      {
        question: 'Do you handle both septic tank pumping and drain field line replacement?',
        answer:
          'Yes. Because Scott’s Plumbing and LSJK Septic operate as one integrated crew, we handle routine pump-outs, distribution box repairs, field line replacements, and building sewer connections without handing you off to another contractor.',
      },
    ],
  },
  {
    slug: 'water-heaters-plumbing',
    number: '02',
    category: 'plumbing',
    categoryLabel: 'Residential & Commercial Plumbing',
    title: 'Water Heaters & General Plumbing Repairs',
    shortTitle: 'Water Heaters & Repairs',
    summary:
      'Reliable replacement and repair for tank and tankless water heaters, household fixtures, shutoff valves, and pressure regulators.',
    heroImage: IMAGES.heroCraft,
    heroAlt: 'Master plumber inspecting neatly soldered copper water heater piping in a clean utility room',
    overviewParagraphs: [
      'When hot water runs cold or a shutoff valve starts weeping behind a wall, you need a licensed crew that diagnoses the root cause instead of patching symptoms. We service and replace conventional gas and electric tank heaters alongside high-efficiency tankless systems.',
      'Beyond water heaters, our Carrollton plumbers handle everyday fixture replacements, leaking supply lines, toilet rebuilds, hose bibbs, and pressure reducing valves with tidy copper, PEX, and brass workmanship built to handle Georgia water pressure.',
    ],
    homeownerSigns: [
      'Fluctuating water temperatures, rusty hot water, or popping tank sediment',
      'Moisture pooling around the water heater pan or beneath sink supply stops',
      'Sudden drops in water pressure or banging pipes when fixtures shut off',
      'Aging units over ten years old showing corrosion near top fittings',
    ],
    processSteps: [
      {
        step: 'Inspect Supply & Venting',
        detail: 'We check water pressure, expansion tanks, electrical or gas supply, and flue clearance.',
      },
      {
        step: 'Code-Compliant Installation',
        detail: 'Clean piping manifolds, drip pans, thermal expansion protection, and haul-away of old units.',
      },
      {
        step: 'Pressure & Leak Testing',
        detail: 'Every joint, valve, and temperature setting is tested under working flow before we pack up.',
      },
    ],
    propertyScope: 'Single-family homes, multi-unit rentals, offices, and light commercial buildings.',
    faqs: [
      {
        question: 'Can you replace a failed water heater the same day?',
        answer:
          'In most cases, yes. Our dispatch runs 24 hours a day out of Carrollton, and we keep standard residential tank sizes and replacement parts accessible so families are not left without hot water.',
      },
      {
        question: 'Should I choose a standard tank or tankless water heater?',
        answer:
          'That depends on your peak hot water demand, existing gas or electrical capacity, and venting layout. During an assessment, we walk through upfront equipment costs and operating differences so you can pick what fits your home.',
      },
    ],
  },
  {
    slug: 'drain-sewer-lines',
    number: '03',
    category: 'plumbing',
    categoryLabel: 'Underground & Drains',
    title: 'Drain Unclogging, Water & Sewer Lines',
    shortTitle: 'Drains, Water & Sewer',
    summary:
      'Targeted drain clearing and durable water main or sewer line repair and replacement when tree roots, bellied pipe, or aging lines fail.',
    heroImage: IMAGES.waterLineTrench,
    heroAlt: 'Precision Schedule 40 PVC sewer line and copper water supply pipe installed in a tidy trench',
    overviewParagraphs: [
      'Stubborn drain backups and unexplained yard sogginess often point to deeper underground line trouble. From kitchen and main-stack clogs to cracked sewer laterals and leaking main water service pipes, we locate the exact fault before trenching.',
      'When spot repairs will not hold—such as crushed clay tile, root-compromised sewer lines, or failing polybutylene water mains—we replace underground piping with properly bedded Schedule 40 PVC and durable supply materials built for decades of service.',
    ],
    homeownerSigns: [
      'Recurring main-line backups even after standard snaking',
      'Unexplained spikes in your municipal water bill or constant meter movement',
      'Soft, wet strips of lawn running between the home and street or septic tank',
      'Gurgling floor drains when washing machines or showers discharge',
    ],
    processSteps: [
      {
        step: 'Pinpoint Blockage or Break',
        detail: 'We trace the line route and determine whether clearing or structural repair is warranted.',
      },
      {
        step: 'Precision Clearing or Trenching',
        detail: 'Open affected segments cleanly with proper slope, gravel bedding, and code-grade fittings.',
      },
      {
        step: 'Backfill & Site Restoration',
        detail: 'After pressure and flow verification, trenches are compacted neatly to minimize yard disruption.',
      },
    ],
    propertyScope: 'Main water service lines, municipal sewer tie-ins, septic building sewers, and interior drains.',
    faqs: [
      {
        question: 'How do I know if I need drain clearing versus full sewer line replacement?',
        answer:
          'Isolated grease or debris buildup can usually be cleared cleanly. If a pipe has collapsed, bellied, or been repeatedly split by tree roots, replacing the damaged section prevents repeated emergency calls.',
      },
      {
        question: 'Do you repair leaking water lines between the meter and the house?',
        answer:
          'Yes. Yard service lines between the utility meter and your home foundation are the property owner’s responsibility, and we repair or replace full runs cleanly.',
      },
    ],
  },
  {
    slug: 'gas-lines-repiping',
    number: '04',
    category: 'specialty',
    categoryLabel: 'Specialty Piping',
    title: 'Gas Line Services & Whole-Home Re-Piping',
    shortTitle: 'Gas Lines & Re-Piping',
    summary:
      'Pressure-tested natural gas and propane piping for appliances, outdoor kitchens, and generators, plus full-home water re-piping.',
    heroImage: IMAGES.heroCraft,
    heroAlt: 'Precision brass valves and supply manifold inspected for pressure integrity',
    overviewParagraphs: [
      'Gas piping and aging home supply plumbing leave zero room for guesswork. Whether you are adding a gas range, tankless water heater, backup generator, or outdoor grill line—or tracking down a suspected gas leak—our team sizes, installs, and pressure-tests every branch safely.',
      'For older West Georgia homes still running galvanized steel or brittle polybutylene supply lines, we execute organized whole-home re-piping that restores steady water pressure, eliminates rusty discoloration, and protects drywall and finishes.',
    ],
    homeownerSigns: [
      'Low flow at upper-floor fixtures or rusted water from galvanized pipes',
      'Frequent pinhole leaks across older copper or aging plastic supply lines',
      'Adding new gas appliances, patio fire features, or standby generators',
      'Suspected gas odor requiring immediate shutoff and pressure testing',
    ],
    processSteps: [
      {
        step: 'Load Sizing & Route Planning',
        detail: 'Calculate BTU demand for gas runs or map efficient manifold zones for whole-home re-piping.',
      },
      {
        step: 'Clean Installation & Strapping',
        detail: 'Install black iron, CSST, copper, or PEX piping with clean access and shutoff valves.',
      },
      {
        step: 'Manometer & Pressure Certification',
        detail: 'Verify leak-free hold under pressure before restoring active appliance or water service.',
      },
    ],
    propertyScope: 'Historic renovations, appliance conversions, standby generators, and full residential re-pipes.',
    faqs: [
      {
        question: 'How long does a typical whole-home re-pipe take?',
        answer:
          'Most single-family re-pipes are planned so water service is restored each evening, typically completing within two to four days depending on home size and bathroom count.',
      },
      {
        question: 'Can you run a new gas line for an outdoor kitchen or tankless heater?',
        answer:
          'Yes. We calculate total appliance load to ensure your meter and trunk line can support the added demand, then run and pressure-test the new branch.',
      },
    ],
  },
  {
    slug: 'new-construction-commercial',
    number: '05',
    category: 'specialty',
    categoryLabel: 'Construction & Commercial',
    title: 'New Construction & Renovation Plumbing',
    shortTitle: 'New Construction & Remodels',
    summary:
      'Rough-in through final fixture trim for custom homes, bathroom and kitchen remodels, and commercial build-outs across West Georgia.',
    heroImage: IMAGES.bathroomFixtures,
    heroAlt: 'Finished residential bathroom renovation with brushed nickel faucet and limestone vanity',
    overviewParagraphs: [
      'Remodels and ground-up builds stay on schedule when plumbing rough-ins pass inspection the first time. We partner with homeowners, custom builders, and commercial tenants across Carrollton and neighboring counties from initial groundworks through final fixture trim.',
      'Every tub valve, shower pan, kitchen island vent, and septic tie-in is laid out carefully so tile setters, cabinetmakers, and inspectors encounter clean geometry and zero rework.',
    ],
    homeownerSigns: [
      'Planning a primary bath remodel, kitchen relocation, or basement apartment build-out',
      'Building a custom home or detached shop requiring water, drain, and septic integration',
      'Commercial tenant improvements needing reliable scheduling and code compliance',
    ],
    processSteps: [
      {
        step: 'Plan Review & Ground Rough-In',
        detail: 'Coordinate slab penetrations, drain slopes, and septic or sewer elevations early.',
      },
      {
        step: 'Top-Out & Pressure Inspections',
        detail: 'Install supply, DWV, and gas rough-ins cleanly ahead of drywall and tile work.',
      },
      {
        step: 'Precision Fixture Trim-Out',
        detail: 'Set sinks, faucets, toilets, disposals, and water heaters with clean finish protection.',
      },
    ],
    propertyScope: 'Custom homes, bathroom/kitchen remodels, workshops, and commercial spaces.',
    faqs: [
      {
        question: 'Can Scott’s Plumbing handle both the new septic system and house plumbing on new builds?',
        answer:
          'Yes. Having one company coordinate the building sewer exit height with the septic tank and drain field layout eliminates costly elevation mismatches during rough-in.',
      },
      {
        question: 'Do you work directly with homeowners on bath remodels?',
        answer:
          'Yes. Whether you are working with a general contractor or managing your own renovation, we handle rough-in valve relocation and final fixture installation.',
      },
    ],
  },
];

export const SERVICE_COUNTIES: CountyArea[] = [
  {
    id: 'carroll',
    name: 'Carroll County',
    regionNote: 'Headquarters · Carrollton, GA',
    communities: ['Carrollton', 'Villa Rica', 'Temple', 'Bowdon', 'Mount Zion', 'Whitesburg', 'Roopville'],
    localFocus:
      'Dispatched directly from US-27 in Carrollton for both city water/sewer residences and rural acreage septic properties.',
    primaryServices: [
      '24/7 emergency plumbing dispatch',
      'Septic tank pumping & field line replacement',
      'Water heater & main water line replacement',
    ],
  },
  {
    id: 'douglas',
    name: 'Douglas County',
    regionNote: 'East Corridor Coverage',
    communities: ['Douglasville', 'Lithia Springs', 'Winston', 'Bill Arp'],
    localFocus:
      'Serving established neighborhoods and suburban properties along I-20 with sewer line replacements, water heaters, and septic care.',
    primaryServices: [
      'Main sewer line clearing & replacement',
      'Tank & tankless water heater upgrades',
      'Septic pumping & inspection letters',
    ],
  },
  {
    id: 'coweta',
    name: 'Coweta County',
    regionNote: 'South & Southeast Coverage',
    communities: ['Newnan', 'Senoia', 'Sharpsburg', 'Moreland', 'Grantville'],
    localFocus:
      'Supporting both historic Newnan homes needing careful re-piping and larger Coweta residential lots relying on septic systems.',
    primaryServices: [
      'Whole-home re-piping & fixture upgrades',
      'Septic system installation & repairs',
      'Gas line additions & pressure testing',
    ],
  },
  {
    id: 'haralson',
    name: 'Haralson County',
    regionNote: 'North & West Coverage',
    communities: ['Bremen', 'Tallapoosa', 'Buchanan', 'Waco'],
    localFocus:
      'Fast response across US-27 and I-20 for rural water mains, well-to-home plumbing connections, and septic field line maintenance.',
    primaryServices: [
      'Septic tank pump-outs & risers',
      'Water main leak repair & replacement',
      '24/7 emergency burst pipe response',
    ],
  },
  {
    id: 'heard',
    name: 'Heard County',
    regionNote: 'South US-27 Coverage',
    communities: ['Franklin', 'Centralhatchee', 'Ephesus'],
    localFocus:
      'Dedicated rural plumbing and septic support along the US-27 corridor, tailored to acreage properties and lake-area homes.',
    primaryServices: [
      'Septic tank pumping & drain field diagnostics',
      'Water heater & pressure valve replacement',
      'New build rough-in & septic coordination',
    ],
  },
  {
    id: 'paulding',
    name: 'Paulding County',
    regionNote: 'Northeast Coverage',
    communities: ['Dallas', 'Hiram', 'Braswell'],
    localFocus:
      'Residential plumbing repairs, sewer line service, and septic pumping for growing Paulding County neighborhoods.',
    primaryServices: [
      'Drain unclogging & main line repairs',
      'Water heater replacements',
      'Septic pumping & baffle service',
    ],
  },
  {
    id: 'cobb',
    name: 'Cobb County',
    regionNote: 'West & South Cobb Coverage',
    communities: ['Powder Springs', 'Austell', 'Mableton'],
    localFocus:
      'Commercial and residential plumbing service, gas piping, and scheduled septic maintenance across West Cobb.',
    primaryServices: [
      'Commercial & renovation plumbing',
      'Gas line repair & installation',
      'Water & sewer line replacement',
    ],
  },
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Direct Dispatch & Honest Assessment',
    description:
      'Call (404) 859-8371 day or night or submit your request online. We arrive on time, inspect the plumbing or septic issue thoroughly, and pinpoint the cause.',
  },
  {
    number: '02',
    title: 'Clear Scope & Fair Pricing',
    description:
      'Before work begins, we walk you through practical options and straightforward pricing—never pushing unnecessary replacements when a sound repair will last.',
  },
  {
    number: '03',
    title: 'Clean Execution & Verified Testing',
    description:
      'Our family-led crew protects your floors, landscaping, and driveway, tests every repair under full pressure or flow, and leaves the site neat.',
  },
];

export const TRUST_PILLARS = [
  {
    title: 'One Team for Plumbing & Septic',
    detail:
      'Most contractors stop at the foundation wall or refuse indoor fixtures. Having Scott’s Plumbing and LSJK Septic under one roof prevents finger-pointing between indoor lines and outdoor tanks.',
  },
  {
    title: 'BBB A+ Accredited Standing',
    detail:
      'Holding an A+ rating with the Better Business Bureau and strong multi-year homeowner reviews across Carrollton and West Georgia reflects steady accountability.',
  },
  {
    title: '24/7 Local Availability',
    detail:
      'Active leaks, backed-up main lines, and failed water heaters do not wait for Monday morning. Our Carrollton team answers calls around the clock, seven days a week.',
  },
  {
    title: 'Residential & Commercial Capable',
    detail:
      'Equipped for everything from a residential faucet cartridge or routine tank pump-out to commercial build-outs, underground sewer lines, and gas piping.',
  },
];

export const HOMEOWNER_FAQS: ServiceFaq[] = [
  {
    question: 'Do you charge extra just to talk through an emergency plumbing or septic issue over the phone?',
    answer:
      'No. When you call (404) 859-8371, we ask a few practical questions about what you are seeing—such as whether multiple drains are backing up or if water is actively leaking—so we can help you shut off valves safely and dispatch the right truck.',
  },
  {
    question: 'Are Scott’s Plumbing and LSJK Septic the same company?',
    answer:
      'Yes. We operate together out of 4226 N US-27 in Carrollton as a single family-owned residential and commercial business covering both full-service plumbing and complete septic tank and field line work.',
  },
  {
    question: 'Which areas around Carrollton do your trucks cover?',
    answer:
      'We serve Carroll County as well as Coweta, Douglas, Haralson, Heard, Paulding, and Cobb counties—including Villa Rica, Newnan, Douglasville, Bremen, Temple, Bowdon, Franklin, Dallas, and Powder Springs.',
  },
  {
    question: 'What information helps most when scheduling septic tank pumping?',
    answer:
      'Sharing the approximate age of your home, how long since the last pump-out, and whether your tank lid is visible or buried under turf helps us arrive prepared and keep yard disturbance to a minimum.',
  },
];
