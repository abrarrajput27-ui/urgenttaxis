import { getStaticRouteData } from './fareData';

const routeCache = new Map();

/**
 * Attempts to get distance using Google Maps Distance Matrix API.
 * If API key is missing or request fails, falls back to static route database.
 * 
 * @param {string} pickup 
 * @param {string} drop 
 * @returns {Promise<{distanceKm: number, tollsAndTaxes: number, source: string}>}
 */
export const getRouteDistance = async (pickup, drop) => {
  const cacheKey = `${pickup.toLowerCase().trim()}|${drop.toLowerCase().trim()}`;
  if (routeCache.has(cacheKey)) {
    console.log("Using cached route data for:", cacheKey);
    return routeCache.get(cacheKey);
  }
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
    if (!staticData) throw new Error("Google Maps distance failed: Missing API Key");
    return fallback;
  }

  try {
    // Use the native Google Maps JavaScript SDK if loaded
    if (window.google && window.google.maps && window.google.maps.DistanceMatrixService) {
      console.log("Using Google Maps JS SDK for Distance Matrix...");
      const service = new window.google.maps.DistanceMatrixService();
      
      return new Promise((resolve, reject) => {
        service.getDistanceMatrix({
          origins: [pickup],
          destinations: [drop],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.METRIC,
        }, (response, status) => {
          if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
            const distanceKm = Math.round(response.rows[0].elements[0].distance.value / 1000);
            const travelTime = response.rows[0].elements[0].duration.text;
            
            console.log("Resolved Distance KM (JS SDK):", distanceKm);
            const result = {
              distanceKm,
              travelTime,
              estimatedToll: staticData ? fallback.estimatedToll : "To be confirmed",
              estimatedStateTax: staticData ? fallback.estimatedStateTax : "As applicable",
              tollCount: staticData ? fallback.tollCount : "Varies",
              source: 'google_maps',
              distanceSource: 'Google Maps',
              isUnknownRoute: false
            };
            routeCache.set(cacheKey, result);
            resolve(result);
          } else if (status === 'OK' && response.rows[0].elements[0].status === 'ZERO_RESULTS') {
            console.error("No route found on Google Maps.");
            reject(new Error("No route found between these locations on Google Maps."));
          } else {
            console.error("Distance Matrix Service failed:", status, response);
            reject(new Error("Distance Matrix Service failed."));
          }
        });
      }).catch((error) => {
        console.error("Distance Matrix SDK Error:", error);
        if (staticData) return fallback;
        throw error;
      });
    }

    // Fallback to fetch if JS SDK is not loaded for some reason
    console.log("JS SDK not loaded, falling back to fetch...");
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(pickup)}&destinations=${encodeURIComponent(drop)}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    console.log("Google API Key Exists:", !!apiKey);
    console.log("Google Maps Response:", data);
    
    if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
      const distanceKm = Math.round(data.rows[0].elements[0].distance.value / 1000);
      const travelTime = data.rows[0].elements[0].duration.text;
      
      console.log("Resolved Distance KM:", distanceKm);
      console.log("Route Source:", 'google_maps');
      console.log("Is Unknown Route:", false);

      const result = {
        distanceKm,
        travelTime,
        estimatedToll: staticData ? fallback.estimatedToll : "To be confirmed",
        estimatedStateTax: staticData ? fallback.estimatedStateTax : "As applicable",
        tollCount: staticData ? fallback.tollCount : "Varies",
        source: 'google_maps',
        distanceSource: 'Google Maps',
        isUnknownRoute: false
      };
      routeCache.set(cacheKey, result);
      return result;
    } else if (data.status === 'OK' && data.rows[0].elements[0].status === 'ZERO_RESULTS') {
      throw new Error("No route found between these locations on Google Maps.");
    }
    
    console.error("Google Maps API Error:", data.status, data.error_message || data);
    throw new Error(data.error_message || data.status || "Unknown Google Maps API Error");
  } catch (error) {
    console.error("Error fetching distance from Google Maps API:", error);
    if (staticData) {
      console.log("Falling back to static data.");
      return fallback;
    }
    throw new Error(`Google Maps distance failed: ${error.message}`);
  }
};
