import React, { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Autocomplete } from '@react-google-maps/api';

/**
 * LocationInput Component
 * Uses Google Places Autocomplete if isLoaded is true.
 */
const LocationInput = ({ label, placeholder, value, onChange, iconColor = "text-[#00a859]", required = true, isLoaded }) => {
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        // Create a synthetic event to pass to the onChange handler
        onChange({ target: { value: place.formatted_address } });
      } else if (place && place.name) {
        onChange({ target: { value: place.name } });
      }
    }
  };

  const inputElement = (
    <input 
      type="text" 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          // If Enter pressed, use current input as address
          onChange({ target: { value: e.target.value } });
        }
      }}
      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 transition-colors bg-white text-gray-800"
      required={required}
    />
  );

  return (
    <div>
      {label && <label className="block text-[12px] font-bold text-gray-800 mb-1.5 ml-1">{label}</label>}
      <div className="relative">
        <MapPin className={`absolute left-3.5 top-[12px] w-[18px] h-[18px] ${iconColor} z-10`} />
        {isLoaded ? (
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceChanged}
            options={{ componentRestrictions: { country: 'in' } }}
          >
            {inputElement}
          </Autocomplete>
        ) : (
          inputElement
        )}
      </div>
    </div>
  );
};

export default LocationInput;
