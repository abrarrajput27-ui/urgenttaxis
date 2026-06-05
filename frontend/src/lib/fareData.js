// Static Route Distance and Toll Data

export const STATIC_ROUTES = {
  // Common Outstation Routes from Delhi NCR
  "delhi-haldwani": { distance: 285, tolls: 450, stateTax: 250, tollCount: 2, travelTime: "6 hrs 15 mins" },
  "delhi-nainital": { distance: 315, tolls: 450, stateTax: 300, tollCount: 2, travelTime: "7 hrs 30 mins" },
  "delhi-ramnagar": { distance: 265, tolls: 350, stateTax: 250, tollCount: 2, travelTime: "5 hrs 45 mins" },
  "delhi-dehradun": { distance: 255, tolls: 350, stateTax: 250, tollCount: 3, travelTime: "5 hrs" },
  "delhi-rishikesh": { distance: 245, tolls: 350, stateTax: 250, tollCount: 2, travelTime: "5 hrs 15 mins" },
  "delhi-haridwar": { distance: 225, tolls: 300, stateTax: 200, tollCount: 2, travelTime: "4 hrs 30 mins" },
  "delhi-agra": { distance: 230, tolls: 500, stateTax: 200, tollCount: 3, travelTime: "3 hrs 30 mins" },
  "delhi-jaipur": { distance: 280, tolls: 400, stateTax: 300, tollCount: 4, travelTime: "5 hrs" },
  "delhi-chandigarh": { distance: 250, tolls: 350, stateTax: 200, tollCount: 3, travelTime: "4 hrs 15 mins" },
  "delhi-manali": { distance: 530, tolls: 600, stateTax: 500, tollCount: 5, travelTime: "12 hrs" },
  "delhi-shimla": { distance: 340, tolls: 450, stateTax: 400, tollCount: 3, travelTime: "8 hrs" },
  "noida-agra": { distance: 200, tolls: 450, stateTax: 200, tollCount: 3, travelTime: "3 hrs" },
  
  // Local Defaults
  "local": { distance: 80, tolls: 0, stateTax: 0, tollCount: 0, travelTime: "N/A" }
};

/**
 * Normalizes a location string to check against static routes.
 */
export const normalizeLocation = (loc) => loc?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';

/**
 * Attempts to match pickup and drop against our static database.
 */
export const getStaticRouteData = (pickup, drop) => {
  const p = normalizeLocation(pickup);
  const d = normalizeLocation(drop);
  
  // Check basic combinations
  const combinations = [
    `${p}-${d}`,
    `${d}-${p}`
  ];

  for (let combo of combinations) {
    if (STATIC_ROUTES[combo]) return STATIC_ROUTES[combo];
  }

  // Fallbacks based on keywords
  const isDelhi = (str) => str.includes('delhi') || str.includes('ncr') || str.includes('airport') || str.includes('noida') || str.includes('ghaziabad') || str.includes('gurgaon') || str.includes('gurugram') || str.includes('faridabad');
  
  if (isDelhi(p) || isDelhi(d)) {
    const other = isDelhi(p) ? d : p;
    if (other.includes('haldwani')) return STATIC_ROUTES["delhi-haldwani"];
    if (other.includes('nainital')) return STATIC_ROUTES["delhi-nainital"];
    if (other.includes('ramnagar') || other.includes('corbett')) return STATIC_ROUTES["delhi-ramnagar"];
    if (other.includes('dehradun')) return STATIC_ROUTES["delhi-dehradun"];
    if (other.includes('rishikesh')) return STATIC_ROUTES["delhi-rishikesh"];
    if (other.includes('haridwar')) return STATIC_ROUTES["delhi-haridwar"];
    if (other.includes('agra') || other.includes('taj')) return STATIC_ROUTES["delhi-agra"];
    if (other.includes('jaipur')) return STATIC_ROUTES["delhi-jaipur"];
    if (other.includes('chandigarh')) return STATIC_ROUTES["delhi-chandigarh"];
    if (other.includes('manali')) return STATIC_ROUTES["delhi-manali"];
    if (other.includes('shimla')) return STATIC_ROUTES["delhi-shimla"];
  }

  return null;
};
