import { VEHICLE_RATES } from '../lib/pricingRules';

export const fareData = {
  "/delhi-to-haldwani-taxi": {
    route: "Delhi to Haldwani",
    distanceKm: 280,
    travelTime: "6 - 7 hours",
  },
  "/delhi-to-nainital-taxi": {
    route: "Delhi to Nainital",
    distanceKm: 310,
    travelTime: "7 - 8 hours",
  },
  "/delhi-to-ramnagar-taxi": {
    route: "Delhi to Ramnagar",
    distanceKm: 260,
    travelTime: "5.5 - 6.5 hours",
  },
  "/delhi-airport-to-haldwani-taxi": {
    route: "Delhi Airport to Haldwani",
    distanceKm: 300,
    travelTime: "6.5 - 7.5 hours",
  },
  "/ghaziabad-taxi-service": {
    route: "Ghaziabad Local & Outstation",
    distanceKm: 150, // placeholder distance for SEO estimate
    travelTime: "Varies",
  },
  "/noida-taxi-service": {
    route: "Noida Local & Outstation",
    distanceKm: 150,
    travelTime: "Varies",
  }
};

/**
 * calculateFare
 * 
 * @param {string} route - The route path (e.g. "/delhi-to-haldwani-taxi")
 * @param {string} vehicleType - "Sedan", "Ertiga", etc.
 * @returns {object} - { fare, mmtReference, seats, perKm, driverAllowance }
 */
export const calculateFare = (route, vehicleType) => {
  const data = fareData[route];
  const vehicle = VEHICLE_RATES[vehicleType];
  
  if (!data || !vehicle) return null;
  
  const distance = data.distanceKm;
  const rawDistanceCharge = Math.round(distance * vehicle.oneWayRate);
  const distanceCharge = Math.max(rawDistanceCharge, vehicle.minOneWayFare || 0);
  
  // Market fare reference (+18% rounded to nearest 50)
  const rawMarketFare = distanceCharge * 1.18;
  const marketFare = Math.round(rawMarketFare / 50) * 50;
  
  return {
    fare: distanceCharge,
    mmtReference: marketFare,
    perKm: vehicle.oneWayRate,
    seats: vehicle.seats,
    driverAllowance: `₹${vehicle.driverAllowance} per day`
  };
};
