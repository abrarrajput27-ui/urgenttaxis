import { getStaticRouteData } from './pricingEngine';

/**
 * Attempts to get distance using Google Maps Distance Matrix API.
 * If API key is missing or request fails, falls back to static route database.
 * 
 * @param {string} pickup 
 * @param {string} drop 
 * @returns {Promise<{distanceKm: number, tollsAndTaxes: number, source: string}>}
 */
export const getRouteDistance = async (pickup, drop) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const staticData = getStaticRouteData(pickup, drop);
  
  const fallback = {
    distanceKm: staticData ? staticData.distance : 300, // Safe default assumption if unknown
    tollsAndTaxes: staticData ? (staticData.tolls + staticData.stateTax) : 500,
    source: staticData ? 'static_db' : 'default_estimation'
  };

  // If no API key is provided, use fallback immediately
  if (!apiKey) {
    console.log("No Google Maps API Key found. Using static/fallback route data.");
    return fallback;
  }

  try {
    // In a real implementation, you would call the Distance Matrix API here:
    // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(pickup)}&destinations=${encodeURIComponent(drop)}&key=${apiKey}`;
    // const response = await fetch(url);
    // const data = await response.json();
    // if (data.rows[0].elements[0].status === 'OK') {
    //   const distanceKm = Math.round(data.rows[0].elements[0].distance.value / 1000);
    //   return {
    //     distanceKm,
    //     tollsAndTaxes: staticData ? (staticData.tolls + staticData.stateTax) : 500, // API doesn't easily return tolls without specific routing
    //     source: 'google_maps_api'
    //   };
    // }
    
    // For now, since we don't have a backend proxy to protect the API key from CORS/billing abuse,
    // we simulate the API call and just rely on the robust static database.
    
    return fallback;
  } catch (error) {
    console.error("Error fetching distance from Google Maps API:", error);
    return fallback;
  }
};
