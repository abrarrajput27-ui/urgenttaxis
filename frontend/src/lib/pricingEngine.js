import { VEHICLE_RATES, DRIVER_ALLOWANCE, MIN_BILLABLE_ONE_WAY_KM, MIN_BILLABLE_ROUND_TRIP_KM_PER_DAY, TRIP_TYPES, AIRPORT_TRANSFER_SURCHARGE } from './pricingRules';

/**
 * Parses dates to calculate number of days between pickup and return.
 */
const calculateDays = (pickupDate, returnDate) => {
  if (!returnDate) return 1;
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1); // If same day, it counts as 1 day. If next day, it's 2 days.
};

/**
 * Calculates the exact fare breakdown based on trip type.
 * @param {Object} params
 * @param {string} params.tripType
 * @param {number} params.distanceKm
 * @param {string} params.vehicleCategory
 * @param {number} params.extraTolls
 * @param {string} params.pickupDate
 * @param {string} params.returnDate
 * @param {string} params.localPackage
 * @returns {Object} Fare breakdown object
 */
export const calculateFare = ({ tripType, distanceKm, vehicleCategory, estimatedToll = 0, estimatedStateTax = 0, pickupDate, returnDate, localPackage, travelTime = "N/A", tollCount = 0, routeSource = "fallback_estimate", distanceSource = "Estimated", isUnknownRoute = false }) => {
  const vehicle = VEHICLE_RATES[vehicleCategory];
  if (!vehicle) return null;

  let totalFare = 0;
  let distanceCharge = 0;
  let billableDistance = 0;
  let driverAllowanceTotal = 0;
  let perKmRate = 0;
  let baseFare = 0;
  let description = vehicle.description;
  let finalTollCount = tollCount;
  let finalEstimatedToll = estimatedToll;
  let finalEstimatedStateTax = estimatedStateTax;

  if (tripType === TRIP_TYPES.ONE_WAY) {
    billableDistance = isUnknownRoute ? 0 : Math.max(distanceKm, MIN_BILLABLE_ONE_WAY_KM);
    perKmRate = vehicle.oneWayRate;
    distanceCharge = isUnknownRoute ? 0 : Math.round(billableDistance * perKmRate);
    driverAllowanceTotal = isUnknownRoute ? 0 : DRIVER_ALLOWANCE;
    totalFare = isUnknownRoute ? 0 : (distanceCharge + driverAllowanceTotal + finalEstimatedToll + finalEstimatedStateTax);
  } 
  
  else if (tripType === TRIP_TYPES.ROUND_TRIP) {
    const tripDays = calculateDays(pickupDate, returnDate);
    const minKmForTrip = tripDays * MIN_BILLABLE_ROUND_TRIP_KM_PER_DAY;
    
    // For round trip, we double the one-way distance to get estimated total journey
    const estTotalDistance = isUnknownRoute ? 0 : (distanceKm * 2);
    billableDistance = isUnknownRoute ? 0 : Math.max(estTotalDistance, minKmForTrip);
    perKmRate = vehicle.roundTripRate;
    distanceCharge = isUnknownRoute ? 0 : Math.round(billableDistance * perKmRate);
    driverAllowanceTotal = isUnknownRoute ? 0 : (tripDays * DRIVER_ALLOWANCE);
    
    // We double the one-way tolls as an estimate for the return journey
    finalEstimatedToll = isUnknownRoute ? 0 : (estimatedToll * 2);
    finalEstimatedStateTax = isUnknownRoute ? 0 : (estimatedStateTax * 2);
    finalTollCount = isUnknownRoute ? 0 : (tollCount * 2);
    
    totalFare = isUnknownRoute ? 0 : (distanceCharge + driverAllowanceTotal + finalEstimatedToll + finalEstimatedStateTax);
  }

  else if (tripType === TRIP_TYPES.LOCAL) {
    // localPackage is like "8hr/80km"
    const pkg = localPackage || "8hr/80km";
    baseFare = vehicle.localRates[pkg];
    totalFare = baseFare;
    perKmRate = vehicle.localExtraKmRate;
    billableDistance = parseInt(pkg.split('/')[1]); // Extract 80 from "8hr/80km"
    finalEstimatedToll = 0; // Usually paid directly by customer in local
    finalEstimatedStateTax = 0;
    finalTollCount = 0;
    driverAllowanceTotal = 0; // Included in local base rate mostly
    description = `${vehicle.description} - ${pkg}`;
  }

  else if (tripType === TRIP_TYPES.AIRPORT) {
    billableDistance = isUnknownRoute ? 0 : Math.max(distanceKm, 30); // Minimal billing distance for airport
    perKmRate = vehicle.oneWayRate;
    distanceCharge = isUnknownRoute ? 0 : Math.round(billableDistance * perKmRate);
    baseFare = AIRPORT_TRANSFER_SURCHARGE; // Extra surcharge for airport commercial parking/entry
    totalFare = isUnknownRoute ? 0 : (distanceCharge + baseFare + finalEstimatedToll + finalEstimatedStateTax); // No driver allowance for local airport drops
  }

  return {
    category: vehicleCategory,
    description: description,
    seats: vehicle.seats,
    tripType: tripType,
    distanceKm: billableDistance, // this is billable, let's keep original distance too
    originalDistanceKm: distanceKm,
    perKmRate: perKmRate,
    distanceCharge: distanceCharge,
    driverAllowance: driverAllowanceTotal,
    estimatedToll: finalEstimatedToll,
    estimatedStateTax: finalEstimatedStateTax,
    tollCount: finalTollCount,
    travelTime: travelTime,
    routeSource: routeSource,
    distanceSource: distanceSource,
    isUnknownRoute: isUnknownRoute,
    baseFare: baseFare,
    totalFare: totalFare
  };
};

/**
 * Generates an array of all vehicle fares for a specific trip.
 */
export const getAllVehicleFares = (params) => {
  return Object.keys(VEHICLE_RATES).map(category => 
    calculateFare({ ...params, vehicleCategory: category })
  );
};
