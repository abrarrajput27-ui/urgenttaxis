// Master Pricing Rules

export const DRIVER_ALLOWANCE = 300; // Per day allowance

export const VEHICLE_RATES = {
  "Sedan": {
    category: "Sedan",
    seats: 4,
    description: "Swift Dzire, Etios or similar",
    oneWayRate: 11,
    roundTripRate: 10,
    localRates: {
      "4hr/40km": 1500,
      "8hr/80km": 2500,
      "12hr/120km": 3500
    },
    localExtraKmRate: 11,
    localExtraHrRate: 150
  },
  "Ertiga": {
    category: "Ertiga",
    seats: 6,
    description: "Maruti Ertiga or similar",
    oneWayRate: 14,
    roundTripRate: 13,
    localRates: {
      "4hr/40km": 2000,
      "8hr/80km": 3000,
      "12hr/120km": 4000
    },
    localExtraKmRate: 14,
    localExtraHrRate: 200
  },
  "Innova": {
    category: "Innova",
    seats: 6,
    description: "Toyota Innova",
    oneWayRate: 16,
    roundTripRate: 15,
    localRates: {
      "4hr/40km": 2500,
      "8hr/80km": 3500,
      "12hr/120km": 5000
    },
    localExtraKmRate: 16,
    localExtraHrRate: 250
  },
  "Innova Crysta": {
    category: "Innova Crysta",
    seats: 6,
    description: "Toyota Innova Crysta",
    oneWayRate: 18,
    roundTripRate: 17,
    localRates: {
      "4hr/40km": 3000,
      "8hr/80km": 4000,
      "12hr/120km": 6000
    },
    localExtraKmRate: 18,
    localExtraHrRate: 300
  },
  "Tempo Traveller": {
    category: "Tempo Traveller",
    seats: 12,
    description: "Force Tempo Traveller 12 Seater",
    oneWayRate: 24,
    roundTripRate: 24,
    localRates: {
      "4hr/40km": 4500,
      "8hr/80km": 6000,
      "12hr/120km": 8000
    },
    localExtraKmRate: 24,
    localExtraHrRate: 400
  }
};

export const MIN_BILLABLE_ONE_WAY_KM = 130;
export const MIN_BILLABLE_ROUND_TRIP_KM_PER_DAY = 250;
export const AIRPORT_TRANSFER_SURCHARGE = 200; // Flat base fare component for airport

export const TRIP_TYPES = {
  ONE_WAY: 'One Way',
  ROUND_TRIP: 'Round Trip',
  LOCAL: 'Local Rental',
  AIRPORT: 'Airport Transfer'
};
