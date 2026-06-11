// src/lib/mapsApi.js
import { getStaticRouteData } from './fareData.js';

const routeCache = new Map();

/**
 * Attempts to resolve coordinates via Nominatim geocoder and road distance via OSRM.
 */
const getOSRMRouteDistance = async (pickup, drop) => {
  try {
    console.log("Attempting Nominatim + OSRM routing fallback for:", pickup, "to", drop);
    const originResult = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(pickup)}&format=json&limit=1`).then(r => r.json());
    const destResult = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(drop)}&format=json&limit=1`).then(r => r.json());
    
    if (originResult && originResult.length > 0 && destResult && destResult.length > 0) {
      const originLon = originResult[0].lon;
      const originLat = originResult[0].lat;
      const destLon = destResult[0].lon;
      const destLat = destResult[0].lat;
      
      const osrmResult = await fetch(`https://router.project-osrm.org/route/v1/driving/${originLon},${originLat};${destLon},${destLat}?overview=false`).then(r => r.json());
      
      if (osrmResult && osrmResult.routes && osrmResult.routes.length > 0) {
        const route = osrmResult.routes[0];
        const distanceKm = Math.round(route.distance / 1000);
        const travelTime = `${Math.round(route.duration / 3600)} hrs ${Math.round((route.duration % 3600) / 60)} mins`;
        
        console.log("OSRM routing successful:", distanceKm, "km");
        return {
          distanceKm,
          travelTime,
          estimatedToll: 350,
          estimatedStateTax: 250,
          tollCount: 2,
          source: 'osrm_maps',
          distanceSource: 'Estimated Road Route',
          isUnknownRoute: false
        };
      }
    }
  } catch (err) {
    console.error("OSRM + Nominatim routing fallback failed:", err);
  }
  return null;
};

/**
 * Attempts to get distance using:
 * 1. Static route database lookup
 * 2. Google Maps Distance Matrix API (if key is valid)
 * 3. OSRM + Nominatim geocoding & routing fallback
 * 
 * Returns null if all calculation chains fail.
 */
export const getRouteDistance = async (pickup, drop) => {
  const cacheKey = `${pickup.toLowerCase().trim()}|${drop.toLowerCase().trim()}`;
  if (routeCache.has(cacheKey)) {
    console.log("Using cached route data for:", cacheKey);
    return routeCache.get(cacheKey);
  }
  const apiKey = import.meta?.env?.VITE_GOOGLE_MAPS_API_KEY || "";
  const staticData = getStaticRouteData(pickup, drop);
  
  // 1. Static Route Database First
  if (staticData) {
    const staticResult = {
      distanceKm: staticData.distance,
      travelTime: staticData.travelTime || null,
      estimatedToll: staticData.tolls || 0,
      estimatedStateTax: staticData.stateTax || 0,
      tollCount: staticData.tollCount || 0,
      source: 'static_route',
      distanceSource: 'Static Route',
      isUnknownRoute: false
    };
    routeCache.set(cacheKey, staticResult);
    return staticResult;
  }

  // 2. Google Maps (If Key is Valid)
  if (apiKey && apiKey.trim() !== "") {
    try {
      // Try Google Maps JS SDK
      if (window.google && window.google.maps && window.google.maps.DistanceMatrixService) {
        console.log("Using Google Maps JS SDK for Distance Matrix...");
        const service = new window.google.maps.DistanceMatrixService();
        
        const googleResult = await new Promise((resolve, reject) => {
          service.getDistanceMatrix({
            origins: [pickup],
            destinations: [drop],
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.METRIC,
          }, (response, status) => {
            if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
              const distanceKm = Math.round(response.rows[0].elements[0].distance.value / 1000);
              const travelTime = response.rows[0].elements[0].duration.text;
              resolve({
                distanceKm,
                travelTime,
                estimatedToll: "To be confirmed",
                estimatedStateTax: "As applicable",
                tollCount: "Varies",
                source: 'google_maps',
                distanceSource: 'Google Maps',
                isUnknownRoute: false
              });
            } else {
              reject(new Error("Google Maps JS SDK failed"));
            }
          });
        });
        routeCache.set(cacheKey, googleResult);
        return googleResult;
      }

      // Try Google Maps fetch fallback
      console.log("JS SDK not loaded, falling back to fetch...");
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(pickup)}&destinations=${encodeURIComponent(drop)}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
        const distanceKm = Math.round(data.rows[0].elements[0].distance.value / 1000);
        const travelTime = data.rows[0].elements[0].duration.text;
        const googleResult = {
          distanceKm,
          travelTime,
          estimatedToll: "To be confirmed",
          estimatedStateTax: "As applicable",
          tollCount: "Varies",
          source: 'google_maps',
          distanceSource: 'Google Maps',
          isUnknownRoute: false
        };
        routeCache.set(cacheKey, googleResult);
        return googleResult;
      }
    } catch (googleError) {
      console.error("Google Maps call failed, trying OSRM fallback:", googleError);
    }
  }

  // 3. OSM Nominatim + OSRM Routing Fallback
  const osrmResult = await getOSRMRouteDistance(pickup, drop);
  if (osrmResult) {
    routeCache.set(cacheKey, osrmResult);
    return osrmResult;
  }

  // 4. Absolute Failure
  return null;
};

/**
 * Resolve a free‑form address to structured components using Nominatim.
 * Returns an object containing city, state, district, postcode, country, full address, lat, lng.
 * If resolution fails, returns null.
 */
export const resolveAddress = async (address) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`;
    const resp = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    const data = await resp.json();
    if (!data || data.length === 0) return null;
    const result = data[0];
    const a = result.address || {};
    const city = a.city || a.town || a.village || a.municipality || a.county || '';
    const state = a.state || a.state_district || '';
    const district = a.county || a.state_district || '';
    const postcode = a.postcode || '';
    const country = a.country || '';
    const full = result.display_name || '';
    const lat = result.lat;
    const lon = result.lon;
    return { city, state, district, postcode, country, full, lat, lon };
  } catch (e) {
    console.error('Address resolution error:', e);
    return null;
  }
};
