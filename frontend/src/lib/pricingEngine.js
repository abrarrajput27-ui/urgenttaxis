export const VEHICLE_RATES = {
  "Sedan": {
    baseFare: 0,
    perKmRate: 11,
    seats: 4,
    description: "Swift Dzire, Etios or similar"
  },
  "Ertiga": {
    baseFare: 0,
    perKmRate: 14,
    seats: 6,
    description: "Maruti Ertiga or similar"
  },
  "Innova": {
    baseFare: 0,
    perKmRate: 16,
    seats: 6,
    description: "Toyota Innova"
  },
  "Innova Crysta": {
    baseFare: 0,
    perKmRate: 18,
    seats: 6,
    description: "Toyota Innova Crysta"
  },
  "Tempo Traveller": {
    baseFare: 0,
    perKmRate: 24,
    seats: 12,
    description: "Force Tempo Traveller 12 Seater"
  }
};

export const DRIVER_ALLOWANCE = 300; // Per day allowance

export const STATIC_ROUTES = {
  "delhi-haldwani": { distance: 285, tolls: 450, stateTax: 250 },
  "delhi-nainital": { distance: 315, tolls: 450, stateTax: 300 },
  "delhi-ramnagar": { distance: 265, tolls: 350, stateTax: 250 },
  "delhi-dehradun": { distance: 255, tolls: 350, stateTax: 250 },
  "delhi-rishikesh": { distance: 245, tolls: 350, stateTax: 250 },
  "delhi-haridwar": { distance: 225, tolls: 300, stateTax: 200 }
};

/**
 * Calculates the exact fare breakdown for a one-way outstation trip.
 * @param {number} distanceKm - The total distance in kilometers.
 * @param {string} vehicleCategory - The category of vehicle (e.g. "Sedan").
 * @param {number} extraTolls - (Optional) Pre-calculated tolls + state tax.
 * @returns {Object} Fare breakdown object.
 */
export const calculateOneWayFare = (distanceKm, vehicleCategory, extraTolls = 0) => {
  const vehicle = VEHICLE_RATES[vehicleCategory];
  if (!vehicle) return null;

  // Minimum billing of 130 km for any outstation trip
  const billableDistance = Math.max(distanceKm, 130);
  
  const distanceCharge = Math.round(billableDistance * vehicle.perKmRate);
  const totalFare = vehicle.baseFare + distanceCharge + DRIVER_ALLOWANCE + extraTolls;

  return {
    category: vehicleCategory,
    description: vehicle.description,
    seats: vehicle.seats,
    distanceKm: billableDistance,
    perKmRate: vehicle.perKmRate,
    distanceCharge: distanceCharge,
    driverAllowance: DRIVER_ALLOWANCE,
    tollsAndTaxes: extraTolls,
    baseFare: vehicle.baseFare,
    totalFare: totalFare
  };
};

/**
 * Generates an array of all vehicle fares for a specific distance.
 * @param {number} distanceKm - The distance in KM
 * @param {number} extraTolls - Extra tolls/taxes
 * @returns {Array} Array of fare breakdown objects
 */
export const getAllVehicleFares = (distanceKm, extraTolls = 0) => {
  return Object.keys(VEHICLE_RATES).map(category => 
    calculateOneWayFare(distanceKm, category, extraTolls)
  );
};

/**
 * Normalizes a location string to check against static routes.
 */
const normalizeLocation = (loc) => loc.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Attempts to match pickup and drop against our static database.
 */
export const getStaticRouteData = (pickup, drop) => {
  const p = normalizeLocation(pickup);
  const d = normalizeLocation(drop);
  
  // Basic matching logic
  if (p.includes('delhi') || p.includes('ncr') || p.includes('airport')) {
    if (d.includes('haldwani')) return STATIC_ROUTES["delhi-haldwani"];
    if (d.includes('nainital')) return STATIC_ROUTES["delhi-nainital"];
    if (d.includes('ramnagar') || d.includes('corbett')) return STATIC_ROUTES["delhi-ramnagar"];
    if (d.includes('dehradun')) return STATIC_ROUTES["delhi-dehradun"];
    if (d.includes('rishikesh')) return STATIC_ROUTES["delhi-rishikesh"];
    if (d.includes('haridwar')) return STATIC_ROUTES["delhi-haridwar"];
  }
  
  // Reverse matching
  if (d.includes('delhi') || d.includes('ncr') || d.includes('airport')) {
    if (p.includes('haldwani')) return STATIC_ROUTES["delhi-haldwani"];
    if (p.includes('nainital')) return STATIC_ROUTES["delhi-nainital"];
    if (p.includes('ramnagar') || p.includes('corbett')) return STATIC_ROUTES["delhi-ramnagar"];
    if (p.includes('dehradun')) return STATIC_ROUTES["delhi-dehradun"];
    if (p.includes('rishikesh')) return STATIC_ROUTES["delhi-rishikesh"];
    if (p.includes('haridwar')) return STATIC_ROUTES["delhi-haridwar"];
  }

  return null; // No static match found
};
