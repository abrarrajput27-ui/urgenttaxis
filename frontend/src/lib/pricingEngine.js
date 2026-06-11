import { VEHICLE_RATES, MIN_BILLABLE_ROUND_TRIP_KM_PER_DAY, TRIP_TYPES, AIRPORT_TRANSFER_SURCHARGE, ONE_WAY_TIER_RATES } from './pricingRules.js';

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
 * Safe Rounding UP logic.
 * Below ₹5000: Math.ceil((fare + 1) / 500) * 500 - 1
 * ₹5000 and above: Math.ceil(fare / 100) * 100
 */
const roundFare = (fare) => {
  if (fare < 5000) {
    return Math.ceil((fare + 1) / 500) * 500 - 1;
  } else {
    return Math.ceil(fare / 100) * 100;
  }
};

/**
 * Computes individual peak pricing factors.
 */
const getPeakFactors = (pickupDateStr, pickupTimeStr) => {
  let isWeekend = false;
  let isNight = false;
  let isLastMinute = false;

  // 1. Weekend Check (travel date is Saturday/Sunday)
  if (pickupDateStr) {
    const [year, month, day] = pickupDateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayOfWeek = dateObj.getDay();
    isWeekend = (dayOfWeek === 0 || dayOfWeek === 6); // 0 = Sunday, 6 = Saturday
  }

  // 2. Night Check (pickup time is 10 PM to 6 AM)
  if (pickupTimeStr) {
    const parts = pickupTimeStr.split(':');
    const hour = parseInt(parts[0], 10);
    isNight = (hour >= 22 || hour < 6);
  }

  // 3. Last-minute Check (travel date/time within 6 hours of current local time)
  if (pickupDateStr && pickupTimeStr) {
    const [year, month, day] = pickupDateStr.split('-').map(Number);
    const [hours, minutes] = pickupTimeStr.split(':').map(Number);
    const travelDateTime = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();
    const diffMs = travelDateTime - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    isLastMinute = (diffHours >= 0 && diffHours <= 6);
  }

  return { isWeekend, isNight, isLastMinute };
};

/**
 * Calculates the exact fare breakdown based on trip type.
 * @param {Object} params
 * @param {string} params.tripType
 * @param {number} params.distanceKm
 * @param {string} params.vehicleCategory
 * @param {number} params.estimatedToll
 * @param {number} params.estimatedStateTax
 * @param {string} params.pickupDate
 * @param {string} params.returnDate
 * @param {string} params.localPackage
 * @param {string} params.pickupTime
 * @returns {Object} Fare breakdown object
 */
export const calculateFare = ({ 
  tripType, 
  distanceKm, 
  vehicleCategory, 
  estimatedToll = 0, 
  estimatedStateTax = 0, 
  pickupDate, 
  returnDate, 
  localPackage, 
  travelTime = "N/A", 
  tollCount = 0, 
  routeSource = "fallback_estimate", 
  distanceSource = "Estimated", 
  isUnknownRoute = false,
  pickupTime
}) => {
  const vehicle = VEHICLE_RATES[vehicleCategory];
  if (!vehicle) return null;

  // Enforce: if distanceKm is positive, it can never be an unknown route (TBD)
  const actualIsUnknownRoute = distanceKm > 0 ? false : isUnknownRoute;

  let totalFare = 0;
  let distanceCharge = 0;
  let billableDistance = 0;
  let chargeableKm = 0;
  let driverAllowanceTotal = 0;
  let perKmRate = 0;
  let baseFare = 0;
  let description = vehicle.description;
  let finalTollCount = tollCount;
  let finalEstimatedToll = estimatedToll;
  let finalEstimatedStateTax = estimatedStateTax;
  let fareTypeLabel = '';

  let oneWayMinFareApplied = false;
  let peakAdjustment = 0;

  // Resolve pickup time
  const time = pickupTime || (typeof document !== 'undefined' ? document.querySelector('input[placeholder="Select Pickup Time"]')?.value : '') || '';
  const { isWeekend, isNight, isLastMinute } = getPeakFactors(pickupDate, time);

  let peakMultiplier = 1.0;
  if (isWeekend) peakMultiplier *= 1.10;
  if (isNight) peakMultiplier *= 1.10;
  if (isLastMinute) peakMultiplier *= 1.15;

  // Keep festival multiplier config available but disabled
  const applyFestival = false;
  const festivalMultiplier = 1.20;
  if (applyFestival) peakMultiplier *= festivalMultiplier;

  const peakApplied = peakMultiplier > 1.0;

  if (tripType === TRIP_TYPES.ONE_WAY) {
    perKmRate = vehicle.oneWayRate;
    // Determine fare based on distance tiers
    const tierRates = ONE_WAY_TIER_RATES[vehicleCategory] || [];
    let tierFare = null;
    let fareType = '';
    for (const tier of tierRates) {
      if (distanceKm <= tier.maxKm) {
        tierFare = tier.fare;
        if (tier.maxKm === 30) fareType = 'City / Airport Transfer';
        else if (tier.maxKm === 80) fareType = 'Short One-Way Drop';
        else if (tier.maxKm === 130) fareType = 'Mini Outstation';
        break;
      }
    }
    if (tierFare === null) {
      // 131+ km: use max of min fare or per km rate
      tierFare = Math.max(vehicle.minOneWayFare || 0, Math.round(distanceKm * vehicle.oneWayRate));
      fareType = 'Regular Outstation';
    }
    distanceCharge = tierFare;
    chargeableKm = distanceKm;
    billableDistance = distanceKm;
    driverAllowanceTotal = vehicle.driverAllowance || 0; // Internal only
    // Store fare type for UI
    fareTypeLabel = fareType;
    
    const isStatic = (routeSource === 'static_route');
    if (isStatic) {
      finalEstimatedToll = estimatedToll;
      finalEstimatedStateTax = estimatedStateTax;
    } else {
      finalEstimatedToll = "Approx / As per actual";
      finalEstimatedStateTax = "As applicable";
    }

    const numericToll = typeof finalEstimatedToll === 'number' ? finalEstimatedToll : 0;
    const numericTax = typeof finalEstimatedStateTax === 'number' ? finalEstimatedStateTax : 0;
    const totalTollsAndTaxes = numericToll + numericTax;

    const rawAdjustedBaseFare = distanceCharge * peakMultiplier;
    const rawFinalFare = rawAdjustedBaseFare + totalTollsAndTaxes;
    totalFare = roundFare(rawFinalFare);

    const roundedBaseFare = peakApplied ? roundFare(distanceCharge) : (totalFare - totalTollsAndTaxes);
    if (peakApplied) {
      const standardRoundedBase = roundFare(distanceCharge);
      peakAdjustment = Math.max(0, totalFare - standardRoundedBase - totalTollsAndTaxes);
    }
    distanceCharge = roundedBaseFare;
  } 
  
  else if (tripType === TRIP_TYPES.ROUND_TRIP) {
    const tripDays = calculateDays(pickupDate, returnDate);
    const minKmForTrip = tripDays * MIN_BILLABLE_ROUND_TRIP_KM_PER_DAY;
    
    const estTotalDistance = distanceKm * 2;
    billableDistance = Math.max(estTotalDistance, minKmForTrip);
    chargeableKm = billableDistance;
    perKmRate = vehicle.roundTripRate;
    distanceCharge = Math.round(billableDistance * perKmRate);
    driverAllowanceTotal = tripDays * (vehicle.driverAllowance || 0);
    
    finalEstimatedToll = typeof estimatedToll === 'number' ? (estimatedToll * 2) : "To be confirmed";
    finalEstimatedStateTax = typeof estimatedStateTax === 'number' ? (estimatedStateTax * 2) : "As applicable";
    finalTollCount = typeof tollCount === 'number' ? (tollCount * 2) : "Varies";
    
    const numericToll = typeof finalEstimatedToll === 'number' ? finalEstimatedToll : 0;
    const numericTax = typeof finalEstimatedStateTax === 'number' ? finalEstimatedStateTax : 0;
    const totalTollsAndTaxes = numericToll + numericTax;

    const rawAdjustedBaseFare = distanceCharge * peakMultiplier;
    const rawFinalFare = rawAdjustedBaseFare + totalTollsAndTaxes; // driver allowance excluded from customer fare
    totalFare = roundFare(rawFinalFare);

    const roundedBaseFare = peakApplied ? roundFare(distanceCharge) : (totalFare - totalTollsAndTaxes); // driver allowance excluded
    if (peakApplied) {
      const standardRoundedBase = roundFare(distanceCharge);
      peakAdjustment = Math.max(0, totalFare - standardRoundedBase - totalTollsAndTaxes); // driver allowance excluded
    }
    distanceCharge = roundedBaseFare;
  }

  else if (tripType === TRIP_TYPES.LOCAL) {
    if (!vehicle.localRates) return null;
    
    const pkg = localPackage || "8hr/80km";
    baseFare = vehicle.localRates[pkg];
    perKmRate = vehicle.localExtraKmRate;
    billableDistance = parseInt(pkg.split('/')[1]);
    chargeableKm = billableDistance;
    finalEstimatedToll = 0;
    finalEstimatedStateTax = 0;
    finalTollCount = 0;
    driverAllowanceTotal = 0;
    description = `${vehicle.description} - ${pkg}`;

    const rawAdjustedBaseFare = baseFare * peakMultiplier;
    totalFare = roundFare(rawAdjustedBaseFare);

    const roundedBaseFare = peakApplied ? roundFare(baseFare) : totalFare;
    if (peakApplied) {
      const standardRoundedBase = roundFare(baseFare);
      peakAdjustment = Math.max(0, totalFare - standardRoundedBase);
    }
    baseFare = roundedBaseFare;
  }

  else if (tripType === TRIP_TYPES.AIRPORT) {
    billableDistance = Math.max(distanceKm, 30);
    chargeableKm = billableDistance;
    perKmRate = vehicle.oneWayRate;
    distanceCharge = Math.round(billableDistance * perKmRate);
    baseFare = AIRPORT_TRANSFER_SURCHARGE;
    
    const numericToll = typeof finalEstimatedToll === 'number' ? finalEstimatedToll : 0;
    const numericTax = typeof finalEstimatedStateTax === 'number' ? finalEstimatedStateTax : 0;
    const totalTollsAndTaxes = numericToll + numericTax;

    const rawAdjustedBaseFare = (distanceCharge + baseFare) * peakMultiplier;
    const rawFinalFare = rawAdjustedBaseFare + totalTollsAndTaxes;
    totalFare = roundFare(rawFinalFare);

    const roundedBaseFare = peakApplied ? roundFare(distanceCharge + baseFare) : (totalFare - totalTollsAndTaxes);
    if (peakApplied) {
      const standardRoundedBase = roundFare(distanceCharge + baseFare);
      peakAdjustment = Math.max(0, totalFare - standardRoundedBase - totalTollsAndTaxes);
    }
    distanceCharge = roundedBaseFare - baseFare;
  }

  // Market Fare Logic: Urgent Taxis Fare + 18%, rounded UP to nearest 50
  const rawMarketFare = totalFare * 1.18;
  const marketFare = Math.ceil(rawMarketFare / 50) * 50;
  const youSave = marketFare - totalFare;

  return {
    category: vehicleCategory,
    description: description,
    seats: vehicle.seats,
    tripType: tripType,
    distanceKm: billableDistance,
    originalDistanceKm: distanceKm,
    chargeableKm: chargeableKm,
    perKmRate: perKmRate,
    fareTypeLabel: fareTypeLabel,
    distanceCharge: distanceCharge,
    driverAllowance: driverAllowanceTotal,
    estimatedToll: finalEstimatedToll,
    estimatedStateTax: finalEstimatedStateTax,
    tollCount: finalTollCount,
    travelTime: travelTime,
    routeSource: routeSource,
    distanceSource: distanceSource,
    isUnknownRoute: actualIsUnknownRoute,
    baseFare: baseFare,
    totalFare: totalFare,
    marketFare: marketFare,
    youSave: youSave,
    oneWayMinFareApplied: oneWayMinFareApplied,
    peakApplied: peakApplied,
    peakAdjustment: peakAdjustment
  };
};

/**
 * Generates an array of all vehicle fares for a specific trip.
 */
export const getAllVehicleFares = (params) => {
  return Object.keys(VEHICLE_RATES)
    .map(category => calculateFare({ ...params, vehicleCategory: category }))
    .filter(fare => fare !== null);
};
