import locationProfiles from '../config/locationProfiles';

export const getCurrentLocationConfig = () => {
  let hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  
  // Allow overriding hostname via query param for testing/preview environments
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const domainOverride = params.get('domain');
    if (domainOverride && locationProfiles[domainOverride]) {
      hostname = domainOverride;
    }
  }

  const locationData = locationProfiles[hostname] || locationProfiles['urgenttaxis.com'];
  // Ensure phone has +91 prefix for display; WhatsApp uses raw number
  return {
    ...locationData,
    phone: locationData.phone.startsWith('+') ? locationData.phone : `+91${locationData.phone}`
  };
};
