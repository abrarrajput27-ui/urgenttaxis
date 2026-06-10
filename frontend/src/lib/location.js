import locationProfiles from '../config/locationProfiles';

export const getCurrentLocationConfig = () => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const locationData = locationProfiles[hostname] || locationProfiles['urgenttaxis.com'];
  // Ensure phone has +91 prefix for display; WhatsApp uses raw number
  return {
    ...locationData,
    phone: locationData.phone.startsWith('+') ? locationData.phone : `+91${locationData.phone}`
  };
};
