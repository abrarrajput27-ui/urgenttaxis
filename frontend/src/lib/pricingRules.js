// Master Pricing Rules - Delhi Transporters Club Revised Rates

export const MIN_BILLABLE_ROUND_TRIP_KM_PER_DAY = 250; // Updated per new minimum km per day
export const AIRPORT_TRANSFER_SURCHARGE = 200; // Flat base fare component for airport

export const TRIP_TYPES = {
  ONE_WAY: 'One Way',
  ROUND_TRIP: 'Round Trip',
  LOCAL: 'Local Rental',
  AIRPORT: 'Airport Transfer'
};

export const VEHICLE_RATES = {
  "Hatchback": {
    category: "Hatchback",
    seats: 4,
    description: "Maruti Swift, WagonR or similar",
    oneWayRate: 10,
    roundTripRate: 10,
    minOneWayFare: 3000,
    driverAllowance: 300,
    localRates: {
      "4hr/40km": 1200,
      "6hr/60km": 1700,
      "8hr/80km": 2200,
      "10hr/100km": 2700,
      "12hr/120km": 3200
    },
    localExtraKmRate: 10,
    localExtraHrRate: 100
  },
  "Sedan": {
    category: "Sedan",
    seats: 4,
    description: "Swift Dzire, Etios or similar",
    oneWayRate: 14,
    roundTripRate: 14,
    minOneWayFare: 4000,
    driverAllowance: 300,
    localRates: {
      "4hr/40km": 1600,
      "6hr/60km": 2200,
      "8hr/80km": 2800,
      "10hr/100km": 3500,
      "12hr/120km": 4200
    },
    localExtraKmRate: 14,
    localExtraHrRate: 150
  },
  "Ertiga": {
    category: "Ertiga",
    seats: 6,
    description: "Maruti Ertiga or similar",
    oneWayRate: 16,
    roundTripRate: 16,
    minOneWayFare: 5000,
    driverAllowance: 400,
    localRates: {
      "4hr/40km": 2200,
      "6hr/60km": 3000,
      "8hr/80km": 3800,
      "10hr/100km": 4650,
      "12hr/120km": 5500
    },
    localExtraKmRate: 16,
    localExtraHrRate: 200
  },
  "Innova": {
    category: "Innova",
    seats: 6,
    description: "Toyota Innova",
    oneWayRate: 24,
    roundTripRate: 24,
    minOneWayFare: 7000,
    driverAllowance: 500,
    localRates: {
      "4hr/40km": 3000,
      "6hr/60km": 4100,
      "8hr/80km": 5200,
      "10hr/100km": 6350,
      "12hr/120km": 7500
    },
    localExtraKmRate: 24,
    localExtraHrRate: 250
  },
  "Innova Crysta": {
    category: "Innova Crysta",
    seats: 6,
    description: "Toyota Innova Crysta",
    oneWayRate: 25, // Assuming slightly higher than Innova
    roundTripRate: 25,
    minOneWayFare: 8000,
    driverAllowance: 500,
    localRates: {
      "4hr/40km": 3500,
      "6hr/60km": 4750,
      "8hr/80km": 6000,
      "10hr/100km": 7250,
      "12hr/120km": 8500
    },
    localExtraKmRate: 25,
    localExtraHrRate: 300
  },
  "Traveller 12": {
    category: "Traveller 12",
    seats: 12,
    description: "Force Tempo Traveller 12 Seater",
    oneWayRate: 26,
    roundTripRate: 26,
    minOneWayFare: 10000,
    driverAllowance: 600
  },
  "Traveller 16": {
    category: "Traveller 16",
    seats: 16,
    description: "Force Tempo Traveller 16 Seater",
    oneWayRate: 28,
    roundTripRate: 28,
    minOneWayFare: 12000,
    driverAllowance: 600
  },
  "Traveller 20": {
    category: "Traveller 20",
    seats: 20,
    description: "Force Tempo Traveller 20 Seater",
    oneWayRate: 30,
    roundTripRate: 30,
    minOneWayFare: 14000,
    driverAllowance: 600
  },
  "Traveller 26": {
    category: "Traveller 26",
    seats: 26,
    description: "Force Tempo Traveller 26 Seater",
    oneWayRate: 32,
    roundTripRate: 32,
    minOneWayFare: 16000,
    driverAllowance: 600
  },
  "Urbania 12": {
    category: "Urbania 12",
    seats: 12,
    description: "Force Urbania 12 Seater",
    oneWayRate: 42,
    roundTripRate: 42,
    minOneWayFare: 18000,
    driverAllowance: 700
  },
  "Urbania 16": {
    category: "Urbania 16",
    seats: 16,
    description: "Force Urbania 16 Seater",
    oneWayRate: 45,
    roundTripRate: 45,
    minOneWayFare: 20000,
    driverAllowance: 700
  },
  "Bus 27": {
    category: "Bus 27",
    seats: 27,
    description: "Mini Bus 27 Seater",
    oneWayRate: 50,
    roundTripRate: 50,
    minOneWayFare: 25000,
    driverAllowance: 1000
  },
  "Bus 45": {
    category: "Bus 45",
    seats: 45,
    description: "Volvo/Scania Bus 45 Seater",
    oneWayRate: 60,
    roundTripRate: 60,
    minOneWayFare: 35000,
    driverAllowance: 1000
  }
};

// One‑Way package tier fares (city/airport, short drop, mini outstation, regular outstation)
export const ONE_WAY_TIER_RATES = {
  "Hatchback": [
    { maxKm: 30, fare: 999 },
    { maxKm: 80, fare: 1499 },
    { maxKm: 130, fare: 1999 }
  ],
  "Sedan": [
    { maxKm: 30, fare: 1299 },
    { maxKm: 80, fare: 1999 },
    { maxKm: 130, fare: 2499 }
  ],
  "Ertiga": [
    { maxKm: 30, fare: 1799 },
    { maxKm: 80, fare: 2499 },
    { maxKm: 130, fare: 3499 }
  ],
  "Innova": [
    { maxKm: 30, fare: 2499 },
    { maxKm: 80, fare: 3499 },
    { maxKm: 130, fare: 4999 }
  ],
  "Innova Crysta": [
    { maxKm: 30, fare: 2999 },
    { maxKm: 80, fare: 3999 },
    { maxKm: 130, fare: 5999 }
  ]
};
