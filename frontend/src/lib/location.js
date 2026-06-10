import locations from '../config/locations';

export const getCurrentLocationConfig = () => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const locationData = locations[hostname] || locations['urgenttaxis.com'];
  return locationData;
};
