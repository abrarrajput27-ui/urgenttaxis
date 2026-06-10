// Centralized city-wise route, card, FAQ, and SEO configuration
const locationRoutes = {
  'urgenttaxis.com': {
    city: 'Ghaziabad',
    seoTitle: 'Best Taxi Service in Ghaziabad | Ghaziabad Outstation Taxi',
    seoDescription: 'Reliable taxi service in Ghaziabad. Book one-way cabs, round trips, and local rentals at affordable rates with Urgent Taxis.',
    popularRoutes: [
      'Ghaziabad to Delhi Airport Taxi',
      'Ghaziabad to Haldwani Taxi',
      'Ghaziabad to Nainital Taxi',
      'Ghaziabad to Haridwar Taxi',
      'Ghaziabad to Dehradun Taxi',
      'Ghaziabad to Rishikesh Taxi',
      'Ghaziabad to Jaipur Taxi',
      'Ghaziabad to Agra Taxi',
      'Ghaziabad to Mathura Vrindavan Taxi',
      'Ghaziabad to Meerut Taxi'
    ],
    routeCards: [
      {
        title: 'Ghaziabad to Delhi Airport Taxi',
        destination: 'Delhi Airport',
        description: 'Fast, on-time airport transfer. Safe and clean cabs with flight tracking support.',
        pricing: 'Sedan: ₹1499 | SUV: ₹2499'
      },
      {
        title: 'Ghaziabad to Haldwani Taxi',
        destination: 'Haldwani',
        description: 'Reliable outstation cab for Kumaon gateway. Direct door-to-door drops.',
        pricing: 'Sedan: ₹3999 | SUV: ₹5499'
      },
      {
        title: 'Ghaziabad to Nainital Taxi',
        destination: 'Nainital',
        description: 'Comfortable hill station travel with experienced drivers trained in mountain terrains.',
        pricing: 'Sedan: ₹4499 | SUV: ₹5999'
      },
      {
        title: 'Ghaziabad to Haridwar Taxi',
        destination: 'Haridwar',
        description: 'Smooth and spiritual travel to Ganga Ghats. Direct drop to your hotel or ashram.',
        pricing: 'Sedan: ₹2499 | SUV: ₹3999'
      }
    ],
    faqs: [
      {
        q: 'How can I book a cab from Ghaziabad?',
        a: 'You can book instantly online using our booking form, via WhatsApp, or by calling our 24/7 dispatch helpline directly.'
      },
      {
        q: 'Are tolls and state taxes included in the Ghaziabad outstation fares?',
        a: 'Our fares are transparent. Standard state taxes and tolls are either included in the final quote or clearly itemized so there are zero surprises.'
      },
      {
        q: 'Can I book a local rental in Ghaziabad?',
        a: 'Yes, we offer flexible local packages including 4 hours/40 km and 8 hours/80 km rentals for traveling within Ghaziabad and NCR.'
      }
    ],
    routePageLinks: [
      { path: '/delhi-to-haldwani-taxi', name: 'Delhi to Haldwani Taxi' },
      { path: '/delhi-to-nainital-taxi', name: 'Delhi to Nainital Taxi' },
      { path: '/ghaziabad-taxi-service', name: 'Ghaziabad Taxi Service' }
    ]
  },
  'haldwani.urgenttaxis.com': {
    city: 'Haldwani',
    seoTitle: 'Best Taxi Service in Haldwani | Haldwani Outstation Taxi',
    seoDescription: 'Reliable taxi service in Haldwani. Book one-way cabs, round trips, and local rentals at affordable rates with Urgent Taxis.',
    popularRoutes: [
      'Haldwani to Delhi Taxi',
      'Haldwani to Noida Taxi',
      'Haldwani to Greater Noida Taxi',
      'Haldwani to Moradabad Taxi',
      'Haldwani to Dehradun Taxi',
      'Haldwani to Ramnagar Taxi',
      'Haldwani to Rishikesh Taxi',
      'Haldwani to Mussoorie Taxi',
      'Haldwani to Meerut Taxi',
      'Haldwani to Saharanpur Taxi',
      'Haldwani to Muzaffarnagar Taxi',
      'Haldwani to Khurja Taxi'
    ],
    routeCards: [
      {
        title: 'Haldwani to Delhi Taxi',
        destination: 'Delhi',
        description: 'Reliable outstation cab from Haldwani to Delhi NCR. High quality cars and professional drivers.',
        pricing: 'Sedan: ₹2999 | SUV: ₹4499'
      },
      {
        title: 'Haldwani to Noida Taxi',
        destination: 'Noida',
        description: 'Direct drops from Kumaon to Noida sectors and IT Parks. Smooth highway travel.',
        pricing: 'Sedan: ₹3199 | SUV: ₹4699'
      },
      {
        title: 'Haldwani to Dehradun Taxi',
        destination: 'Dehradun',
        description: 'Connecting Haldwani and Dehradun. Comfortable rides via beautiful routes.',
        pricing: 'Sedan: ₹4999 | SUV: ₹6999'
      },
      {
        title: 'Haldwani to Ramnagar Taxi',
        destination: 'Ramnagar',
        description: 'Easy transfers to Jim Corbett Safari base and local resorts in Ramnagar.',
        pricing: 'Sedan: ₹1499 | SUV: ₹2499'
      }
    ],
    faqs: [
      {
        q: 'What is the travel time from Haldwani to Delhi by taxi?',
        a: 'It typically takes about 6 to 7 hours to cover the 280 km distance via NH9, depending on highway traffic.'
      },
      {
        q: 'Do you offer one-way drops from Haldwani to Delhi Airport?',
        a: 'Yes, we specialize in dedicated one-way drops to IGI Delhi Airport with fixed pricing and no hidden return charges.'
      },
      {
        q: 'Are your Haldwani drivers familiar with hill routes?',
        a: 'Absolutely, all our drivers on hill routes are specially trained and certified for driving safely on steep mountain terrains.'
      }
    ],
    routePageLinks: [
      { path: '/delhi-to-haldwani-taxi', name: 'Delhi to Haldwani Taxi' },
      { path: '/delhi-to-nainital-taxi', name: 'Delhi to Nainital Taxi' },
      { path: '/delhi-to-ramnagar-taxi', name: 'Delhi to Ramnagar Taxi' }
    ]
  },
  'ramnagar.urgenttaxis.com': {
    city: 'Ramnagar',
    seoTitle: 'Best Taxi Service in Ramnagar | Jim Corbett Outstation Taxi',
    seoDescription: 'Reliable taxi service in Ramnagar. Book one-way cabs, Jim Corbett resort packages, and local rentals with Urgent Taxis.',
    popularRoutes: [
      'Ramnagar to Delhi Taxi',
      'Ramnagar to Noida Taxi',
      'Ramnagar to Gurgaon Taxi',
      'Ramnagar to Haldwani Taxi',
      'Ramnagar to Nainital Taxi',
      'Ramnagar to Jim Corbett Taxi',
      'Ramnagar to Kashipur Taxi',
      'Ramnagar to Moradabad Taxi',
      'Ramnagar to Haridwar Taxi',
      'Ramnagar to Rishikesh Taxi',
      'Ramnagar to Dehradun Taxi',
      'Ramnagar to Mussoorie Taxi'
    ],
    routeCards: [
      {
        title: 'Ramnagar to Delhi Taxi',
        destination: 'Delhi',
        description: 'Direct resort-to-home transfer. Convenient, hygienic, and timely pickups.',
        pricing: 'Sedan: ₹2899 | SUV: ₹4199'
      },
      {
        title: 'Ramnagar to Haldwani Taxi',
        destination: 'Haldwani',
        description: 'Quick inter-city commute between Ramnagar and Haldwani Kumaon base.',
        pricing: 'Sedan: ₹1499 | SUV: ₹2499'
      },
      {
        title: 'Ramnagar to Nainital Taxi',
        destination: 'Nainital',
        description: 'Beautiful hill station transit. Hill-trained drivers with high-safety standards.',
        pricing: 'Sedan: ₹2199 | SUV: ₹3499'
      },
      {
        title: 'Ramnagar to Jim Corbett Taxi',
        destination: 'Jim Corbett',
        description: 'Local safari gate drops and resort transfers. Always on time for safari bookings.',
        pricing: 'Sedan: ₹999 | SUV: ₹1499'
      }
    ],
    faqs: [
      {
        q: 'Do you provide direct taxi drop to Jim Corbett resorts?',
        a: 'Yes, we provide door-to-door drops to all resorts, cottages, and safari entry gates in Ramnagar and Corbett periphery.'
      },
      {
        q: 'Can I book a multi-day taxi for sightseeing in Jim Corbett?',
        a: 'Absolutely! We offer customized tour packages where the cab stays at your disposal for local visits and safaris.'
      }
    ],
    routePageLinks: [
      { path: '/delhi-to-ramnagar-taxi', name: 'Delhi to Ramnagar Taxi' },
      { path: '/delhi-to-nainital-taxi', name: 'Delhi to Nainital Taxi' },
      { path: '/delhi-to-haldwani-taxi', name: 'Delhi to Haldwani Taxi' }
    ]
  },
  'haridwar.urgenttaxis.com': {
    city: 'Haridwar',
    seoTitle: 'Best Taxi Service in Haridwar | Haridwar Outstation Taxi',
    seoDescription: 'Reliable taxi service in Haridwar. Book one-way cabs, Char Dham pilgrimages, and local drops with Urgent Taxis.',
    popularRoutes: [
      'Haridwar to Delhi Taxi',
      'Haridwar to Noida Taxi',
      'Haridwar to Gurgaon Taxi',
      'Haridwar to Meerut Taxi',
      'Haridwar to Rishikesh Taxi',
      'Haridwar to Dehradun Taxi',
      'Haridwar to Mussoorie Taxi',
      'Haridwar to Haldwani Taxi',
      'Haridwar to Nainital Taxi',
      'Haridwar to Kedarnath Taxi'
    ],
    routeCards: [
      {
        title: 'Haridwar to Delhi Taxi',
        destination: 'Delhi',
        description: 'Express highway taxi from Haridwar to Delhi NCR. Fully customizable pick-ups.',
        pricing: 'Sedan: ₹2399 | SUV: ₹3799'
      },
      {
        title: 'Haridwar to Rishikesh Taxi',
        destination: 'Rishikesh',
        description: 'Quick local transit between twin holy cities. Perfect for rafting and Ganga Aarti.',
        pricing: 'Sedan: ₹999 | SUV: ₹1499'
      },
      {
        title: 'Haridwar to Dehradun Taxi',
        destination: 'Dehradun',
        description: 'Reliable travel for business or personal commutes between Haridwar and Dehradun.',
        pricing: 'Sedan: ₹1499 | SUV: ₹2499'
      },
      {
        title: 'Haridwar to Kedarnath Taxi',
        destination: 'Kedarnath',
        description: 'Chardham Yatra pickup to Phata/Sonprayag helipads. Safe and powerful SUVs.',
        pricing: 'Sedan: ₹5999 | SUV: ₹8499'
      }
    ],
    faqs: [
      {
        q: 'Do you offer pickup service from Haridwar Railway Station?',
        a: 'Yes, our driver will meet you directly at Haridwar Junction station with placard display if requested.'
      },
      {
        q: 'Is AC allowed during hill Yatra routes from Haridwar?',
        a: 'AC is operational on flat plain roads. On steep hill climbs, AC may be turned off momentarily to ensure maximum engine power.'
      }
    ],
    routePageLinks: [
      { path: '/ghaziabad-taxi-service', name: 'Ghaziabad Taxi' },
      { path: '/delhi-to-haldwani-taxi', name: 'Delhi to Haldwani' },
      { path: '/delhi-to-nainital-taxi', name: 'Delhi to Nainital' }
    ]
  },
  'dehradun.urgenttaxis.com': {
    city: 'Dehradun',
    seoTitle: 'Best Taxi Service in Dehradun | Dehradun Outstation Taxi',
    seoDescription: 'Reliable taxi service in Dehradun. Book one-way cabs, Mussoorie drops, airport transfers, and local rentals with Urgent Taxis.',
    popularRoutes: [
      'Dehradun to Delhi Taxi',
      'Dehradun to Noida Taxi',
      'Dehradun to Gurgaon Taxi',
      'Dehradun to Haridwar Taxi',
      'Dehradun to Rishikesh Taxi',
      'Dehradun to Mussoorie Taxi',
      'Dehradun to Haldwani Taxi',
      'Dehradun to Nainital Taxi',
      'Dehradun to Saharanpur Taxi',
      'Dehradun to Meerut Taxi'
    ],
    routeCards: [
      {
        title: 'Dehradun to Delhi Taxi',
        destination: 'Delhi',
        description: 'Express travel via Dehradun-Delhi Highway. Punctual airport and home drops.',
        pricing: 'Sedan: ₹2499 | SUV: ₹3899'
      },
      {
        title: 'Dehradun to Mussoorie Taxi',
        destination: 'Mussoorie',
        description: 'Queen of Hills drop. Scenic mountain driving by experienced hill operators.',
        pricing: 'Sedan: ₹1499 | SUV: ₹2299'
      },
      {
        title: 'Dehradun to Rishikesh Taxi',
        destination: 'Rishikesh',
        description: 'Quick spiritual or adventure drops. Secure and well-ventilated vehicles.',
        pricing: 'Sedan: ₹1499 | SUV: ₹2499'
      },
      {
        title: 'Dehradun to Jolly Grant Airport Taxi',
        destination: 'Jolly Grant Airport',
        description: 'Dehradun airport pickups and drops. Strict adherence to airline timelines.',
        pricing: 'Sedan: ₹999 | SUV: ₹1499'
      }
    ],
    faqs: [
      {
        q: 'Do you serve Jolly Grant Airport in Dehradun?',
        a: 'Yes, we provide 24/7 transfers to and from Dehradun Airport to all local areas and surrounding hill stations.'
      },
      {
        q: 'Are your Dehradun cabs equipped with music and clean seats?',
        a: 'Absolutely! All cabs feature premium interiors, functional music systems, and undergo deep sanitization before every trip.'
      }
    ],
    routePageLinks: [
      { path: '/delhi-to-nainital-taxi', name: 'Delhi to Nainital Taxi' },
      { path: '/delhi-to-haldwani-taxi', name: 'Delhi to Haldwani Taxi' },
      { path: '/noida-taxi-service', name: 'Noida Taxi Service' }
    ]
  },
  'meerut.urgenttaxis.com': {
    city: 'Meerut',
    seoTitle: 'Best Taxi Service in Meerut | Meerut Outstation Taxi',
    seoDescription: 'Reliable taxi service in Meerut. Book outstation cabs, Delhi Airport drops, and highway travels with Urgent Taxis.',
    popularRoutes: [
      'Meerut to Delhi Airport Taxi',
      'Meerut to Delhi Taxi',
      'Meerut to Noida Taxi',
      'Meerut to Ghaziabad Taxi',
      'Meerut to Haridwar Taxi',
      'Meerut to Rishikesh Taxi',
      'Meerut to Dehradun Taxi',
      'Meerut to Haldwani Taxi',
      'Meerut to Nainital Taxi',
      'Meerut to Mussoorie Taxi',
      'Meerut to Jaipur Taxi',
      'Meerut to Agra Taxi'
    ],
    routeCards: [
      {
        title: 'Meerut to Delhi Airport Taxi',
        destination: 'Delhi Airport',
        description: 'On-time transfer to IGI Airport via Delhi-Meerut Expressway. Fast and convenient.',
        pricing: 'Sedan: ₹1699 | SUV: ₹2699'
      },
      {
        title: 'Meerut to Delhi Taxi',
        destination: 'Delhi',
        description: 'Commutes to Central or South Delhi made easy and quick via the express corridor.',
        pricing: 'Sedan: ₹1499 | SUV: ₹2399'
      },
      {
        title: 'Meerut to Haridwar Taxi',
        destination: 'Haridwar',
        description: 'Express pilgrimage drops. Experience professional service with local drivers.',
        pricing: 'Sedan: ₹2299 | SUV: ₹3499'
      },
      {
        title: 'Meerut to Nainital Taxi',
        destination: 'Nainital',
        description: 'Enjoy a relaxing road trip from Meerut to the beautiful Lake City of Nainital.',
        pricing: 'Sedan: ₹4499 | SUV: ₹5999'
      }
    ],
    faqs: [
      {
        q: 'Do you use the Delhi-Meerut Expressway for travel?',
        a: 'Yes! We actively route all Delhi/Noida trips via the Delhi-Meerut Expressway for a faster and smoother journey.'
      },
      {
        q: 'Can I book a local taxi package in Meerut?',
        a: 'Yes, we offer 4-hour/40km and 8-hour/80km packages for local sightseeing and industrial visits in Meerut.'
      }
    ],
    routePageLinks: [
      { path: '/noida-taxi-service', name: 'Noida Taxi Service' },
      { path: '/ghaziabad-taxi-service', name: 'Ghaziabad Taxi Service' },
      { path: '/delhi-to-haldwani-taxi', name: 'Delhi to Haldwani' }
    ]
  },
  'lucknow.urgenttaxis.com': {
    city: 'Lucknow',
    seoTitle: 'Best Taxi Service in Lucknow | Lucknow Outstation Taxi',
    seoDescription: 'Reliable taxi service in Lucknow. Book one-way cabs to Ayodhya, Kanpur, Delhi, and local rentals with Urgent Taxis.',
    popularRoutes: [
      'Lucknow to Delhi Taxi',
      'Lucknow to Noida Taxi',
      'Lucknow to Ghaziabad Taxi',
      'Lucknow to Ayodhya Taxi',
      'Lucknow to Kanpur Taxi',
      'Lucknow to Varanasi Taxi',
      'Lucknow to Prayagraj Taxi',
      'Lucknow to Gorakhpur Taxi'
    ],
    routeCards: [
      {
        title: 'Lucknow to Ayodhya Taxi',
        destination: 'Ayodhya',
        description: 'Spiritual transit to Ram Mandir. On-time pickups and comfortable outstation sedans.',
        pricing: 'Sedan: ₹1999 | SUV: ₹2999'
      },
      {
        title: 'Lucknow to Kanpur Taxi',
        destination: 'Kanpur',
        description: 'Frequent business and personal travel options. Well-maintained cars and polite drivers.',
        pricing: 'Sedan: ₹1499 | SUV: ₹2199'
      },
      {
        title: 'Lucknow to Varanasi Taxi',
        destination: 'Varanasi',
        description: 'Long-distance drops to Kashi Vishwanath Dham. Safe and secure highway travel.',
        pricing: 'Sedan: ₹3999 | SUV: ₹5499'
      },
      {
        title: 'Lucknow to Delhi Taxi',
        destination: 'Delhi',
        description: 'Premium highway travel connecting Lucknow to Delhi via Purvanchal & Yamuna Expressways.',
        pricing: 'Sedan: ₹6999 | SUV: ₹9499'
      }
    ],
    faqs: [
      {
        q: 'Do you offer airport drops to Amausi Airport (LKO) in Lucknow?',
        a: 'Yes, we provide highly reliable local transfers to and from Chaudhary Charan Singh International Airport (LKO).'
      },
      {
        q: 'Are toll charges included in Ayodhya outstation bookings?',
        a: 'Tolls can be pre-paid or billed on actuals. A clear itemized fare breakdown is generated during booking.'
      }
    ],
    routePageLinks: [
      { path: '/ghaziabad-taxi-service', name: 'Ghaziabad Taxi' },
      { path: '/delhi-to-nainital-taxi', name: 'Delhi to Nainital' },
      { path: '/delhi-to-haldwani-taxi', name: 'Delhi to Haldwani' }
    ]
  },
  'delhi.urgenttaxis.com': {
    city: 'Delhi',
    seoTitle: 'Best Taxi Service in Delhi | Delhi Outstation Taxi Cabs',
    seoDescription: 'Reliable taxi service in Delhi. Book Delhi Airport transfers, outstation drops to Haldwani, Haridwar, and Jaipur with Urgent Taxis.',
    popularRoutes: [
      'Delhi to Haldwani Taxi',
      'Delhi to Nainital Taxi',
      'Delhi to Ramnagar Taxi',
      'Delhi to Haridwar Taxi',
      'Delhi to Rishikesh Taxi',
      'Delhi to Dehradun Taxi',
      'Delhi to Mussoorie Taxi',
      'Delhi to Meerut Taxi',
      'Delhi to Agra Taxi',
      'Delhi to Jaipur Taxi',
      'Delhi Airport Taxi'
    ],
    routeCards: [
      {
        title: 'Delhi to Haldwani Taxi',
        destination: 'Haldwani',
        description: 'Connecting Delhi NCR to the gateway of Kumaon. Affordable one-way drops.',
        pricing: 'Sedan: ₹2899 | SUV: ₹4199'
      },
      {
        title: 'Delhi to Nainital Taxi',
        destination: 'Nainital',
        description: 'Premium tourist transit. Safe driving on mountain roads by hill-certified drivers.',
        pricing: 'Sedan: ₹3499 | SUV: ₹4999'
      },
      {
        title: 'Delhi to Haridwar Taxi',
        destination: 'Haridwar',
        description: 'Comfortable outstation cabs for pilgrims. Clean seats and AC standard.',
        pricing: 'Sedan: ₹2299 | SUV: ₹3499'
      },
      {
        title: 'Delhi to Dehradun Taxi',
        destination: 'Dehradun',
        description: 'Reliable highway transit between Delhi NCR and Uttarakhand capital.',
        pricing: 'Sedan: ₹2499 | SUV: ₹3799'
      }
    ],
    faqs: [
      {
        q: 'Do you offer pickup from IGI Delhi Airport Terminal 3?',
        a: 'Yes, we provide 24/7 pickups from Terminals 1, 2, and 3 with flight tracking to accommodate delays.'
      },
      {
        q: 'Can I book a one-way outstation cab to Jaipur or Agra?',
        a: 'Yes, we offer fixed-rate one-way outstation taxis via Yamuna and NH48 Expressways.'
      }
    ],
    routePageLinks: [
      { path: '/delhi-to-haldwani-taxi', name: 'Delhi to Haldwani Taxi' },
      { path: '/delhi-to-nainital-taxi', name: 'Delhi to Nainital Taxi' },
      { path: '/delhi-to-ramnagar-taxi', name: 'Delhi to Ramnagar Taxi' }
    ]
  }
};

// Handle fallback mappings (e.g. www subdomain or default main domain)
export const getCityRouteConfig = () => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const config = locationRoutes[hostname] || locationRoutes['urgenttaxis.com'];
  return config;
};

export default locationRoutes;
