// Location configuration for multi-subdomain Urgent Taxis sites
// Map hostname -> location specific data
// Fields: phone, whatsapp, address, city, seoTitle, seoDescription, popularRoutes (array of strings)

const locations = {
  // Main domain – defaults to Ghaziabad
  'urgenttaxis.com': {
    city: 'Ghaziabad',
    phone: '+917310651940',
    whatsapp: '918595066033',
    address: 'Shop No. 09, S. R. Complex, Railway Station Road, Masuri, Ghaziabad, Uttar Pradesh 201302',
    seoTitle: 'Urgent Taxis - Ghaziabad Taxi Service',
    seoDescription: 'Fast, reliable taxi service in Ghaziabad. Book your ride instantly with Urgent Taxis.',
    popularRoutes: ['Ghaziabad to Delhi', 'Ghaziabad to Noida', 'Ghaziabad to Delhi Airport']
  },
  // Subdomains
  'www.urgenttaxis.com': {
    city: 'Ghaziabad',
    phone: '+917310651940',
    whatsapp: '918595066033',
    address: 'Shop No. 09, S. R. Complex, Railway Station Road, Masuri, Ghaziabad, Uttar Pradesh 201302',
    seoTitle: 'Urgent Taxis - Ghaziabad Taxi Service',
    seoDescription: 'Fast, reliable taxi service in Ghaziabad. Book your ride instantly with Urgent Taxis.',
    popularRoutes: ['Ghaziabad to Delhi', 'Ghaziabad to Noida', 'Ghaziabad to Delhi Airport']
  },
  'haldwani.urgenttaxis.com': {
    city: 'Haldwani',
    phone: '+919990304054',
    whatsapp: '919990304054',
    address: 'Government Hospital, NEW, ITI Rd, near Susheela Tiwari, Haldwani, Uttarakhand 263139',
    seoTitle: 'Urgent Taxis - Haldwani Taxi Service',
    seoDescription: 'Book reliable taxi service in Haldwani and surrounding areas with Urgent Taxis.',
    popularRoutes: ['Haldwani to Nainital', 'Haldwani to Kathgodam', 'Haldwani to Delhi']
  },
  'ramnagar.urgenttaxis.com': {
    city: 'Ramnagar',
    phone: '+919997752146',
    whatsapp: '919997752146',
    address: 'Ladhuwachor, Dhikuli, Ramnagar, Uttarakhand 244715',
    seoTitle: 'Urgent Taxis - Ramnagar Taxi Service',
    seoDescription: 'Your trusted taxi partner in Ramnagar. Quick pickups and comfortable rides.',
    popularRoutes: ['Ramnagar to Nainital', 'Ramnagar to Haldwani', 'Ramnagar to Delhi']
  },
  'haridwar.urgenttaxis.com': {
    city: 'Haridwar',
    phone: '+919879786981',
    whatsapp: '919879786981',
    address: 'Guru Goraksh Nath Mandir, Upper Rd, near agra chat bhandar, Haridwar, Uttarakhand 249401',
    seoTitle: 'Urgent Taxis - Haridwar Taxi Service',
    seoDescription: 'Safe and affordable taxi rides in Haridwar. Book instantly with Urgent Taxis.',
    popularRoutes: ['Haridwar to Rishikesh', 'Haridwar to Dehradun', 'Haridwar to Delhi']
  },
  'dehradun.urgenttaxis.com': {
      city: 'Dehradun',
      phone: '+919634228639',
      whatsapp: '919634228639',
      address: '00, road, near kaushal Arts, Haripur, Nawada, Majari Mafi, Dehradun, Uttarakhand 248005',
      seoTitle: 'Urgent Taxis - Dehradun Taxi Service',
      seoDescription: 'Convenient taxi services in Dehradun. Book your ride now.',
      popularRoutes: ['Dehradun to Haridwar', 'Dehradun to Rishikesh', 'Dehradun to Delhi']
    },
    'meerut.urgenttaxis.com': {
      city: 'Meerut',
      phone: '+917310651940',
      whatsapp: '918595066033',
      address: 'CP 106/1, Delhi Rd, Madhav Puram, Meerut, Uttar Pradesh 250002',
      seoTitle: 'Urgent Taxis - Meerut Taxi Service',
      seoDescription: 'Reliable taxi service in Meerut. Fast bookings with Urgent Taxis.',
      popularRoutes: ['Meerut to Delhi', 'Meerut to Noida', 'Meerut to Ghaziabad']
    },
    'lucknow.urgenttaxis.com': {
      city: 'Lucknow',
      phone: '+919718256092',
      whatsapp: '919718256092',
      address: '568, Kailashpuri, 154, Gali No 10, near Neelkanth Temple, Barha, Alambagh, Lucknow, Uttar Pradesh 226005',
      seoTitle: 'Urgent Taxis - Lucknow Taxi Service',
      seoDescription: 'Premium taxi solutions in Lucknow. Book your ride instantly.',
      popularRoutes: ['Lucknow to Delhi', 'Lucknow to Agra', 'Lucknow to Kanpur']
    },
    'delhi.urgenttaxis.com': {
      city: 'Delhi',
      phone: '+919870998802',
      whatsapp: '919870998802',
      address: '215 Chaudhar Mohalla Malikpur Kohi Rangpuri, near Dada Bhaiya Road, Mahipalpur Village, market, New Delhi, Delhi 110037',
      seoTitle: 'Urgent Taxis - Delhi Taxi Service',
      seoDescription: 'Fast and safe taxi services across Delhi. Book quickly with Urgent Taxis.',
      popularRoutes: ['Delhi to Gurgaon', 'Delhi to Noida', 'Delhi to Faridabad']
    }
};

export default locations;
