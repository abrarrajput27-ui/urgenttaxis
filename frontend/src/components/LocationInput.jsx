import React from 'react';
import { MapPin } from 'lucide-react';

/**
 * LocationInput Component
 * Future-ready structure for Google Places Autocomplete.
 * Currently falls back to a standard text input.
 */
const LocationInput = ({ label, placeholder, value, onChange, iconColor = "text-[#00a859]", required = true }) => {
  // TODO: Wrap with <Autocomplete> when VITE_GOOGLE_MAPS_API_KEY is available and @react-google-maps/api is loaded.
  
  return (
    <div>
      {label && <label className="block text-[12px] font-bold text-gray-800 mb-1.5 ml-1">{label}</label>}
      <div className="relative">
        <MapPin className={`absolute left-3.5 top-[12px] w-[18px] h-[18px] ${iconColor}`} />
        <input 
          type="text" 
          placeholder={placeholder} 
          value={value} 
          onChange={onChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 transition-colors bg-white text-gray-800"
          required={required}
        />
      </div>
    </div>
  );
};

export default LocationInput;
