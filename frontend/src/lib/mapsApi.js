import { getStaticRouteData } from './fareData';

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
    distanceKm: staticData ? staticData.distance : null,
    travelTime: staticData && staticData.travelTime ? staticData.travelTime : null,
    estimatedToll: staticData ? staticData.tolls : 0,
    estimatedStateTax: staticData ? staticData.stateTax : 0,
    tollCount: staticData && staticData.tollCount !== undefined ? staticData.tollCount : 0,
    source: staticData ? 'static_route' : 'fallback_estimate',
    distanceSource: staticData ? 'Static Route' : 'Estimated',
    isUnknownRoute: !staticData
  };

  if (!apiKey) {
    console.log("No Google Maps API Key found. Using static/fallback route data.");
    return fallback;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(pickup)}&destinations=${encodeURIComponent(drop)}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
      const distanceKm = Math.round(data.rows[0].elements[0].distance.value / 1000);
      const travelTime = data.rows[0].elements[0].duration.text;
      
      return {
        distanceKm,
        travelTime,
        // Keep static tolls/taxes as fallback because Distance Matrix doesn't return toll cost natively
        estimatedToll: fallback.estimatedToll,
        estimatedStateTax: fallback.estimatedStateTax,
        tollCount: fallback.tollCount,
        source: 'google_maps',
        distanceSource: 'Google Maps',
        isUnknownRoute: false
      };
    }
    
    console.warn("Google Maps API returned non-OK status. Falling back.");
    return fallback;
  } catch (error) {
    console.error("Error fetching distance from Google Maps API:", error);
    return fallback;
  }
};
