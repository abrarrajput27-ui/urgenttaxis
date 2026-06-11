import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, Calendar, Clock, CreditCard, ArrowLeft, Loader2, MessageCircle, Map, Navigation, AlertCircle, RefreshCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReactGA from 'react-ga4';
import { getCurrentLocationConfig } from '../lib/location';
import { MIN_BILLABLE_ROUND_TRIP_KM_PER_DAY } from '../lib/pricingRules';

// Vehicle Images
import carSwift from '../assets/images/car-swift.png';
import carDzire from '../assets/images/car-dzire.png';
import carErtiga from '../assets/images/car-ertiga.png';
import carInnova from '../assets/images/car-innova.png';
import carCrysta from '../assets/images/car-crysta.png';
import carTraveller from '../assets/images/car-traveller.png';

const VEHICLE_IMAGES = {
  "Hatchback": carSwift,
  "Sedan": carDzire,
  "Ertiga": carErtiga,
  "Innova": carInnova,
  "Innova Crysta": carCrysta,
  "Traveller 12": carTraveller,
  "Traveller 16": carTraveller,
  "Traveller 20": carTraveller,
  "Traveller 26": carTraveller,
  "Urbania 12": carTraveller,
  "Urbania 16": carTraveller,
  "Bus 27": carTraveller,
  "Bus 45": carTraveller
};

const VEHICLE_INFO = {
  "Hatchback": { seats: "4 Seats", luggage: "2 Small Bags" },
  "Sedan": { seats: "4 Seats", luggage: "3 Bags" },
  "Ertiga": { seats: "6+1 Seats", luggage: "4 Bags" },
  "Innova": { seats: "6+1 Seats", luggage: "4 Bags" },
  "Innova Crysta": { seats: "6+1 Seats", luggage: "5 Bags" }
};

const parseAddressDetails = (address) => {
  if (!address) return { city: '', district: '', state: '', full: '' };
  const parts = address.split(',').map(p => p.trim()).filter(Boolean);
  if (parts.length === 1) {
    const val = parts[0];
    if (val.toLowerCase() === 'delhi') return { city: 'Delhi', district: 'Delhi', state: 'Delhi', full: 'Delhi' };
    if (val.toLowerCase() === 'moradabad') return { city: 'Moradabad', district: 'Moradabad', state: 'Uttar Pradesh', full: 'Moradabad, Uttar Pradesh' };
    if (val.toLowerCase() === 'noida') return { city: 'Noida', district: 'Gautam Buddha Nagar', state: 'Uttar Pradesh', full: 'Noida, Uttar Pradesh' };
    if (val.toLowerCase() === 'ghaziabad') return { city: 'Ghaziabad', district: 'Ghaziabad', state: 'Uttar Pradesh', full: 'Ghaziabad, Uttar Pradesh' };
    if (val.toLowerCase() === 'lucknow') return { city: 'Lucknow', district: 'Lucknow', state: 'Uttar Pradesh', full: 'Lucknow, Uttar Pradesh' };
    if (val.toLowerCase() === 'haldwani') return { city: 'Haldwani', district: 'Nainital', state: 'Uttarakhand', full: 'Haldwani, Uttarakhand' };
    if (val.toLowerCase() === 'nainital') return { city: 'Nainital', district: 'Nainital', state: 'Uttarakhand', full: 'Nainital, Uttarakhand' };
    if (val.toLowerCase() === 'kanpur') return { city: 'Kanpur', district: 'Kanpur Nagar', state: 'Uttar Pradesh', full: 'Kanpur, Uttar Pradesh' };
    if (val.toLowerCase() === 'meerut') return { city: 'Meerut', district: 'Meerut', state: 'Uttar Pradesh', full: 'Meerut, Uttar Pradesh' };
    if (val.toLowerCase() === 'ramnagar') return { city: 'Ramnagar', district: 'Nainital', state: 'Uttarakhand', full: 'Ramnagar, Uttarakhand' };
    if (val.toLowerCase() === 'haridwar') return { city: 'Haridwar', district: 'Haridwar', state: 'Uttarakhand', full: 'Haridwar, Uttarakhand' };
    if (val.toLowerCase() === 'rishikesh') return { city: 'Rishikesh', district: 'Dehradun', state: 'Uttarakhand', full: 'Rishikesh, Uttarakhand' };
    if (val.toLowerCase() === 'dehradun') return { city: 'Dehradun', district: 'Dehradun', state: 'Uttarakhand', full: 'Dehradun, Uttarakhand' };
    if (val.toLowerCase() === 'bareilly') return { city: 'Bareilly', district: 'Bareilly', state: 'Uttar Pradesh', full: 'Bareilly, Uttar Pradesh' };
    if (val.toLowerCase() === 'jaipur') return { city: 'Jaipur', district: 'Jaipur', state: 'Rajasthan', full: 'Jaipur, Rajasthan' };
    if (val.toLowerCase() === 'agra') return { city: 'Agra', district: 'Agra', state: 'Uttar Pradesh', full: 'Agra, Uttar Pradesh' };
    if (val.toLowerCase() === 'katra') return { city: 'Katra', district: '', state: 'Jammu & Kashmir', full: 'Katra, Jammu & Kashmir' };
    return { city: val, district: '', state: '', full: val };
  }

  let state = '';
  let district = '';
  let city = '';

  const statesList = [
    'uttar pradesh', 'uttarakhand', 'delhi', 'haryana', 'rajasthan', 'himachal pradesh', 
    'jammu & kashmir', 'jammu and kashmir', 'punjab', 'up', 'uk', 'hp', 'rj', 'hr'
  ];

  const stateMap = {
    'up': 'Uttar Pradesh',
    'uttar pradesh': 'Uttar Pradesh',
    'uk': 'Uttarakhand',
    'uttarakhand': 'Uttarakhand',
    'delhi': 'Delhi',
    'hr': 'Haryana',
    'haryana': 'Haryana',
    'rj': 'Rajasthan',
    'rajasthan': 'Rajasthan',
    'hp': 'Himachal Pradesh',
    'himachal pradesh': 'Himachal Pradesh',
    'jammu & kashmir': 'Jammu & Kashmir',
    'jammu and kashmir': 'Jammu & Kashmir',
    'punjab': 'Punjab'
  };

  let stateIndex = -1;
  for (let i = parts.length - 1; i >= 0; i--) {
    const partLower = parts[i].toLowerCase();
    for (let st of statesList) {
      if (partLower === st || partLower.endsWith(' ' + st)) {
        state = stateMap[st];
        stateIndex = i;
        break;
      }
    }
    if (state) break;
  }

  if (stateIndex !== -1) {
    city = parts[0];
    if (stateIndex > 1) {
      district = parts[stateIndex - 1];
    }
  } else {
    city = parts[0];
    state = parts[parts.length - 1];
    if (parts.length > 2) {
      district = parts[parts.length - 2];
    }
  }

  const cityLower = city.toLowerCase();
  if (!state) {
    if (cityLower.includes('delhi')) state = 'Delhi';
    else if (cityLower.includes('haldwani') || cityLower.includes('nainital') || cityLower.includes('haridwar') || cityLower.includes('rishikesh') || cityLower.includes('dehradun')) state = 'Uttarakhand';
    else if (cityLower.includes('noida') || cityLower.includes('ghaziabad') || cityLower.includes('lucknow') || cityLower.includes('kanpur') || cityLower.includes('meerut') || cityLower.includes('agra')) state = 'Uttar Pradesh';
    else if (cityLower.includes('gurgaon') || cityLower.includes('gurugram') || cityLower.includes('faridabad')) state = 'Haryana';
    else if (cityLower.includes('jaipur')) state = 'Rajasthan';
  }

  if (cityLower.includes('haldwani') && !district) district = 'Nainital';
  if (cityLower.includes('nainital') && !district) district = 'Nainital';
  if (cityLower.includes('noida') && !district) district = 'Gautam Buddha Nagar';
  if (cityLower.includes('gurgaon') && !district) district = 'Gurugram';
  if (cityLower.includes('gurugram') && !district) district = 'Gurugram';

  return {
    city,
    district: district || 'N/A',
    state: state || '',
    full: [city, district, state].filter(Boolean).join(', ')
  };
};

const getVehicleSeatsAndLuggage = (category, defaultSeats) => {
  if (VEHICLE_INFO[category]) return VEHICLE_INFO[category];
  return { seats: `${defaultSeats} Seats`, luggage: "Ample Luggage" };
};

const FareBreakup = ({ 
  pickup, 
  drop, 
  date, 
  time, 
  tripType,
  returnDate,
  localPackage,
  distanceKm, 
  fares, 
  onBack 
}) => {
  const locationData = getCurrentLocationConfig();
  const [localPickup, setLocalPickup] = useState(pickup);
  const [localDrop, setLocalDrop] = useState(drop);
  const [displayedFares, setDisplayedFares] = useState(fares);
  const pickupDetails = parseAddressDetails(localPickup);
  const dropDetails = parseAddressDetails(localDrop);
  const WHATSAPP_NUMBER = locationData.whatsapp;



  const handleSwap = () => {
    setLocalPickup(localDrop);
    setLocalDrop(localPickup);
    setDisplayedFares([]);
  };

  const tripTimeDiff = returnDate ? Math.abs(new Date(returnDate).getTime() - new Date(date).getTime()) : 0;
  const tripDays = returnDate ? Math.max(1, Math.ceil(tripTimeDiff/86400000) + 1) : 1;
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [passengers, setPassengers] = useState('1 Passenger');
  const [luggage, setLuggage] = useState('No Luggage');
  const [email, setEmail] = useState('');
  const [landmark, setLandmark] = useState('');
  const [adults, setAdults] = useState('1 Adult');
  const [children, setChildren] = useState('No Children');
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [blockedUrl, setBlockedUrl] = useState(null);

  const handleBooking = async (e, selectedFare) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBlockedUrl(null);
    const activePickup = localPickup;
    const activeDrop = localDrop;

// Location validation removed - fare modal always shown

    try {
      ReactGA.event("fare_breakup_submit", {
        category: "Conversion",
        label: "Fare Breakup Booking",
        value: selectedFare.totalFare
      });

      // Prepare message with tracking details explicitly as a safe fallback
      const extraDetails = `
--- Additional Details ---
Email: ${email || 'N/A'}
Landmark: ${landmark || 'N/A'}
Adults: ${adults}
Children: ${children}
Special Requirements: ${requirements || 'None'}
`;
      const trackingDetails = `
--- Tracking Details ---
Domain: ${window.location.hostname}
City: ${locationData.city}
Route: ${pickupDetails.full} to ${dropDetails.full}
Pickup: ${pickupDetails.full}
Drop: ${dropDetails.full}
Travel Date: ${date}
Vehicle: ${selectedFare.category}
Customer Name: ${name}
Mobile: ${mobile}
Branch Phone: ${locationData.phone}
`;
      const finalMessage = `Type: ${tripType} | Fare: ₹${selectedFare.totalFare} | Dist: ${selectedFare.originalDistanceKm}km\n${trackingDetails}${extraDetails}`;

      const basePayload = {
        name,
        mobile,
        pickup: activePickup,
        drop_location: activeDrop || localPackage,
        trip_date: date,
        trip_type: tripType,
        return_date: returnDate || null,
        trip_time: time,
        vehicle_type: selectedFare.category,
        estimated_fare: selectedFare.totalFare,
        distance_km: selectedFare.originalDistanceKm,
        travel_time: selectedFare.travelTime,
        estimated_toll: typeof selectedFare.estimatedToll === 'number' ? selectedFare.estimatedToll : null,
        estimated_state_tax: typeof selectedFare.estimatedStateTax === 'number' ? selectedFare.estimatedStateTax : null,
        toll_count: typeof selectedFare.tollCount === 'number' ? selectedFare.tollCount : null,
        route_source: selectedFare.routeSource,
        distance_source: selectedFare.distanceSource,
        fare_version: "v1",
        pricing_engine_version: "fare-engine-v2",
        booking_id: null,
        customer_id: null,
        driver_id: null,
        vendor_id: null,
        fare_breakup: selectedFare,
        message: finalMessage,
        source_page: window.location.pathname,
        route_name: `${activePickup} to ${activeDrop || localPackage}`,
        lead_source: "Fare Breakup Engine"
      };

      const fullPayload = {
        ...basePayload,
        source_domain: window.location.hostname,
        source_city: locationData.city,
        selected_route: `${activePickup} to ${activeDrop || localPackage}`,
        contact_number: locationData.phone,
        drop: activeDrop || localPackage,
        travel_date: date,
        vehicle: selectedFare.category,
        customer_name: name,
        passenger_count: passengers,
        luggage_count: luggage,
        email: email || null,
        pickup_landmark: landmark || null,
        adults_count: adults,
        children_count: children,
        special_requirements: requirements || null
      };

      try {
        const { error } = await supabase.from('leads').insert([fullPayload]);
        if (error) {
          console.warn("First insert attempt failed in FareBreakup (likely missing columns), retrying with base payload:", error);
          const { error: retryError } = await supabase.from('leads').insert([basePayload]);
          if (retryError) {
            console.error("Retry insert failed in FareBreakup:", retryError);
          }
        }
      } catch (err) {
        console.warn("Exception during first insert attempt in FareBreakup, retrying with base payload:", err);
        const { error: retryError } = await supabase.from('leads').insert([basePayload]);
        if (retryError) {
          console.error("Retry insert failed in FareBreakup:", retryError);
        }
      }

      let messageText = `🚖 New Confirmed Booking - Urgent Taxis (${locationData.city})\n\n👤 Name: ${name}\n📞 Mobile: ${mobile}\n📧 Email: ${email || 'N/A'}\n🚕 Trip Type: ${tripType}\n📍 Pickup: ${pickupDetails.city}${pickupDetails.state ? ', ' + pickupDetails.state : ''}\n📍 Landmark: ${landmark || 'N/A'}\n📍 Drop/Package: ${dropDetails.city}${dropDetails.state ? ', ' + dropDetails.state : ''} ${activeDrop || localPackage}\n📅 Date: ${date} at ${time}`;
      
      if (tripType === 'Round Trip' && returnDate) {
        messageText += `\n📅 Return Date: ${returnDate}`;
      }

      messageText += `\n\n🚘 Vehicle: ${selectedFare.category}\n👥 Passengers: ${passengers}\n💼 Luggage: ${luggage}\n👥 Adults: ${adults}\n👶 Children: ${children}\n📝 Special Requirements: ${requirements || 'None'}\n`;
      messageText += `\n📏 Actual Route Distance: ${selectedFare.originalDistanceKm} km\n⏱️ Est. Travel Time: ${selectedFare.travelTime}\n🛣️ Est. Tolls: ${selectedFare.tollCount} (${selectedFare.estimatedToll === "To be confirmed" ? "TBD" : '₹' + selectedFare.estimatedToll})\n🏢 State Tax: ${selectedFare.estimatedStateTax === "As applicable" ? "TBD" : '₹' + selectedFare.estimatedStateTax}`;
      messageText += `\n💰 Final Quoted Fare: ₹${selectedFare.totalFare}\n\n🏢 Location: ${locationData.city}\n🌐 Source: ${window.location.hostname} Auto Fare Engine\n\nPlease call customer immediately to confirm.`;
      
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
      const newWindow = window.open(whatsappUrl, '_blank');

      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        setBlockedUrl(whatsappUrl);
      } else {
        setTimeout(() => setSuccess(true), 1500);
      }
      
      if (!blockedUrl) {
         setSuccess(true);
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try calling us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success && !blockedUrl) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[450px]">
        <CheckCircle2 className="w-20 h-20 text-[#0aa63f] mb-4 animate-bounce" />
        <h3 className="text-2xl font-black text-gray-900 mb-2">Booking Requested!</h3>
        <p className="text-gray-600 mb-6">We have received your request. Our team will call you at {mobile} shortly to confirm the ride.</p>
        <button onClick={onBack} className="text-blue-600 font-bold hover:underline">Calculate another route</button>
      </div>
    );
  }

  return (
    <div className="bg-white w-full relative z-[100]">
      {/* Header & Route Summary */}
      <div className="bg-[#0b1324] p-5 text-white">
        <button onClick={onBack} className="text-gray-300 hover:text-white transition-colors flex items-center text-[13px] font-bold mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Edit Route
        </button>
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[15px] font-black tracking-wide">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" />
                <span>{pickupDetails.city}{pickupDetails.state ? `, ${pickupDetails.state}` : ''}</span>
              </div>
              {tripType !== 'Local Rental' && (
                <>
                  <ArrowRight className="hidden sm:inline w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5 text-red-500 flex-shrink-0" />
                    <span>{dropDetails.city}{dropDetails.state ? `, ${dropDetails.state}` : ''}</span>
                  </div>
                </>
              )}
            </div>

            {/* Route Summary Block */}
            <div className="mt-3 space-y-1 text-[13px] text-gray-200">
              <div><strong>Pickup:</strong> {pickupDetails.full}</div>
              <div><strong>Drop:</strong> {dropDetails.full}</div>
              <div><strong>Distance:</strong> {distanceKm} KM</div>
              <div><strong>Duration:</strong> {displayedFares[0]?.travelTime || 'N/A'}</div>
              <div><strong>Trip Type:</strong> {tripType}</div>
            </div>
            
            {/* Swap button */}
            <div className="flex justify-center my-2">
              <button onClick={handleSwap} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-transform" title="Swap Locations">
                <RefreshCcw className="w-5 h-5 text-gray-600 rotate-0 transition-transform duration-300 hover:rotate-180" />
              </button>
            </div>

            {tripType !== 'Local Rental' && dropDetails.district && dropDetails.district !== 'N/A' && (
              <div className="text-[11px] text-gray-400 font-semibold pl-6">
                Destination District: {dropDetails.district}
              </div>
            )}

            <div className="text-[12px] text-gray-400 font-bold flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
              <span className="flex items-center bg-slate-800 px-2.5 py-1 rounded-full"><Navigation className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> {tripType}</span>
              {fares[0]?.fareTypeLabel && (
                <span className="flex items-center bg-slate-800 px-2.5 py-1 rounded-full text-xs ml-1">{fares[0].fareTypeLabel}</span>
              )}
              {distanceKm > 0 && <span className="flex items-center bg-slate-800 px-2.5 py-1 rounded-full"><Map className="w-3.5 h-3.5 mr-1.5 text-green-400" /> {distanceKm} km</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Confidence Badge */}
      <div className="bg-blue-50 border-b border-blue-100 p-2.5 flex items-center justify-center text-blue-800 text-[11px] font-bold">
        {fares[0]?.distanceSource === 'Google Maps' ? (
          <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-600" /> Exact route distance via Google Maps.</>
        ) : (
          <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-blue-600" /> Route distance resolved successfully.</>
        )}
      </div>

      {/* Vehicle List */}
      <div className="flex flex-col divide-y divide-gray-100">
        {(displayedFares.length > 0 ? displayedFares : fares).map((fare, idx) => {
          const isExpanded = expandedIndex === idx;
          const info = getVehicleSeatsAndLuggage(fare.category, fare.seats);
          const carImg = VEHICLE_IMAGES[fare.category] || carDzire;
          
          return (
            <div key={idx} className={`bg-white transition-all ${isExpanded ? 'ring-2 ring-blue-500 z-10 relative shadow-lg' : 'hover:bg-gray-50'}`}>
              <div 
                className="p-4 cursor-pointer"
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              >
                <div className="flex items-center justify-between gap-3 sm:gap-4">
                  {/* Left: Image & Details */}
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="w-20 sm:w-28 h-14 sm:h-20 flex-shrink-0 flex items-center justify-center overflow-hidden mr-3 sm:mr-4">
                      <img 
                        src={carImg} 
                        alt={fare.category} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-[14px] sm:text-[15px] text-gray-900 leading-tight">{fare.category}</h3>
                      <p className="text-[11px] text-gray-500 mt-0.5 truncate">{fare.description || `${fare.seats} Seats`}</p>
                      
                      <div className="flex items-center gap-x-2 mt-1 text-[10px] sm:text-[11px] text-gray-400 font-bold">
                        <span>{info.seats}</span>
                        <span>•</span>
                        <span>{info.luggage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Pricing & CTA */}
                  <div className="text-right flex flex-col items-end justify-center ml-2 flex-shrink-0">
                    <span className="text-[11px] sm:text-[12px] text-gray-400 line-through font-semibold mb-0.5">₹{fare.marketFare}</span>
                    <span className="font-black text-[16px] sm:text-[18px] text-gray-900 leading-none">₹{fare.totalFare}</span>
                    
                    {fare.youSave > 0 && (
                      <span className="bg-green-100 text-green-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase mt-1">Save ₹{fare.youSave}</span>
                    )}
                    
                    <button 
                      className={`mt-2 text-[10px] sm:text-[11px] font-bold px-3 sm:px-4 py-1.5 rounded-full transition-colors ${isExpanded ? 'bg-blue-600 text-white' : 'bg-gray-900 text-white hover:bg-black'}`}
                    >
                      {isExpanded ? 'Close' : 'Select'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              {isExpanded && (
                <div className="px-4 pb-5 pt-2 border-t border-gray-100 bg-gray-50">
                  <div className="flex flex-col lg:flex-row gap-4 mb-4">
                    {/* Left Details Grid (Fare Breakup + Includes/Excludes Side-by-Side) */}
                    <div className="flex-1 space-y-4">
                      {/* Conditional Pricing Breakups */}
                      {fare.tripType === 'One Way' ? (
                        <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-200">
                          <h4 className="font-bold text-gray-900 text-[13px] flex items-center border-b border-gray-100 pb-2 mb-2">
                            <CreditCard className="w-4 h-4 mr-1.5 text-blue-600" /> Fare Breakup
                          </h4>
                          
                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Actual Distance</span>
                            <span className="font-semibold text-gray-900">{fare.originalDistanceKm} km</span>
                          </div>

                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Fare Type</span>
                            <span className="font-semibold text-gray-900">{fare.fareTypeLabel}</span>
                          </div>

                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Package Fare</span>
                            <span className="font-semibold text-gray-900">₹{fare.distanceCharge}</span>
                          </div>

                          {fare.peakApplied && fare.peakAdjustment > 0 && (
                            <div className="flex justify-between text-[12px]">
                              <span className="text-gray-600">Peak Adjustment</span>
                              <span className="font-semibold text-orange-600">+₹{fare.peakAdjustment}</span>
                            </div>
                          )}

                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Toll & State Tax Status</span>
                            <span className={`font-semibold ${fare.routeSource === 'static_route' ? 'text-green-700' : 'text-gray-700'}`}>
                              {fare.routeSource === 'static_route' ? 'Included' : 'Approx / As per actual'}
                            </span>
                          </div>

                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">{"Parking / Airport / Railway Entry"}</span>
                            <span className="font-semibold text-red-600">Extra</span>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200 mt-2">
                            <span className="font-black text-gray-900 text-[14px]">Final Fare</span>
                            <span className="font-black text-[18px] text-[#0aa63f]">₹{fare.totalFare}</span>
                          </div>
                          
                          <div className="bg-blue-50 text-blue-800 p-2.5 rounded-lg text-[10px] leading-relaxed flex items-start border border-blue-100 mt-2">
                            <AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0 mt-0.5 text-blue-600" />
                            <span>Toll and state entry tax are included in package only for verified routes. Dynamic routes require payment at toll booths at actuals.</span>
                          </div>
                        </div>
                      ) : fare.tripType === 'Round Trip' ? (
                        <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-200">
                          <h4 className="font-bold text-gray-900 text-[13px] flex items-center border-b border-gray-100 pb-2 mb-2">
                            <CreditCard className="w-4 h-4 mr-1.5 text-blue-600" /> Fare Breakup
                          </h4>
                          
                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Actual Distance</span>
                            <span className="font-semibold text-gray-900">{fare.originalDistanceKm * 2} km (Round Trip Est)</span>
                          </div>

                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Minimum KM / Day</span>
                            <span className="font-semibold text-gray-900">250 km</span>
                          </div>

                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Trip Days</span>
                            <span className="font-semibold text-gray-900">
                              {tripDays} Days
                            </span>
                          </div>

                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Package Fare</span>
                            <span className="font-semibold text-gray-900">₹{fare.distanceCharge}</span>
                          </div>

                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Tolls & State Tax</span>
                            <span className="font-semibold text-gray-700">{"Extra / Payable at actuals"}</span>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200 mt-2">
                            <span className="font-black text-gray-900 text-[14px]">Final Fare</span>
                            <span className="font-black text-[18px] text-[#0aa63f]">₹{fare.totalFare}</span>
                          </div>
                          
                          <div className="bg-yellow-50 text-yellow-800 p-2.5 rounded-lg text-[10px] leading-relaxed flex items-start border border-yellow-100 mt-2">
                            <AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0 mt-0.5 text-yellow-600" />
                            <span>Tolls, state taxes, parking, and helper charges are extra and to be paid directly during the journey.</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-200">
                          <h4 className="font-bold text-gray-900 text-[13px] flex items-center border-b border-gray-100 pb-2 mb-2">
                            <CreditCard className="w-4 h-4 mr-1.5 text-blue-600" /> Fare Breakup
                          </h4>
                          
                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Selected Package</span>
                            <span className="font-semibold text-gray-900">{localPackage || 'Hourly Rental'}</span>
                          </div>

                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">{"Included KM / Hours"}</span>
                            <span className="font-semibold text-gray-900">{fare.chargeableKm} km</span>
                          </div>

                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Extra KM Rate</span>
                            <span className="font-semibold text-gray-900">₹{fare.perKmRate}{"/km"}</span>
                          </div>

                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Extra Hour Rate</span>
                            <span className="font-semibold text-gray-900">
                              ₹{fare.category.includes('Swift') || fare.category.includes('Hatchback') ? '100' : '150'}{"/hr"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200 mt-2">
                            <span className="font-black text-gray-900 text-[14px]">Final Quoted Fare</span>
                            <span className="font-black text-[18px] text-[#0aa63f]">₹{fare.totalFare}</span>
                          </div>
                          
                          <div className="bg-yellow-50 text-yellow-800 p-2.5 rounded-lg text-[10px] leading-relaxed flex items-start border border-yellow-100 mt-2">
                            <AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0 mt-0.5 text-yellow-600" />
                            <span>Extra KM and hours are calculated dynamically post-journey and paid to the driver. Parking fees are extra.</span>
                          </div>
                        </div>
                      )}

                    {/* Included / Excluded Items side-by-side */}
                      <div className="grid grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-gray-200 text-[12px]">
                        <div>
                          <h4 className="font-bold text-green-700 mb-2 pb-1 border-b border-green-50 flex items-center">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-green-600" /> Included
                          </h4>
                          <ul className="space-y-1 text-gray-600">
                            {tripType === 'One Way' ? (
                              <>
                                {fare.routeSource === 'static_route' && (
                                  <>
                                    <li>• Toll Included</li>
                                    <li>• State Tax Included</li>
                                  </>
                                )}

                                <li>• Fuel Charges</li>
                              </>
                            ) : (
                              <>

                                <li>• Fuel Charges</li>
                                <li>• Base KMs</li>
                              </>
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-red-700 mb-2 pb-1 border-b border-red-50 flex items-center">
                            <AlertCircle className="w-3.5 h-3.5 mr-1 text-red-600" /> Excluded
                          </h4>
                          <ul className="space-y-1 text-gray-600">
                            {tripType === 'One Way' ? (
                              <>
                                {fare.routeSource !== 'static_route' && (
                                  <>
                                    <li>• Toll Extra</li>
                                    <li>• State Tax Extra</li>
                                  </>
                                )}
                                <li>• Parking Extra</li>
                                <li>• Airport Entry</li>
                                <li>• Railway Entry</li>
                                <li>• Local Sightseeing</li>
                              </>
                            ) : (
                              <>
                                <li>• Toll Extra</li>
                                <li>• State Tax Extra</li>
                                <li>• Parking Extra</li>
                                <li>• Airport Entry</li>
                                <li>• Railway Entry</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Right Details Grid (Lead Form / Booking Form) */}
                    <div className="w-full lg:w-[360px] flex-shrink-0">
                      {blockedUrl ? (
                        <div className="p-4 bg-blue-50 rounded-xl w-full text-center border border-blue-100">
                          <p className="text-[13px] text-blue-800 mb-3 font-medium">To confirm this fare, please send your details to our WhatsApp:</p>
                          <a 
                            href={blockedUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center w-full shadow-md text-[14px]"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" /> Confirm via WhatsApp
                          </a>
                        </div>
                      ) : (
                        <form onSubmit={(e) => handleBooking(e, fare)} className="space-y-3 bg-white p-4 rounded-xl border border-gray-200">
                          <h4 className="font-bold text-gray-900 text-[13px] border-b border-gray-100 pb-2 mb-2">
                            👤 Passenger Details
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              placeholder="Your Name *" 
                              value={name} onChange={(e) => setName(e.target.value)}
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-white"
                              required
                            />
                            <input 
                              type="tel" 
                              placeholder="Mobile No. *" 
                              value={mobile} onChange={(e) => setMobile(e.target.value)}
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-white"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1 ml-0.5">Passengers</label>
                              <select 
                                value={passengers} 
                                onChange={(e) => setPassengers(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-white text-gray-700"
                              >
                                <option value="1 Passenger">1 Passenger</option>
                                <option value="2 Passengers">2 Passengers</option>
                                <option value="3 Passengers">3 Passengers</option>
                                <option value="4 Passengers">4 Passengers</option>
                                <option value="5 Passengers">5 Passengers</option>
                                <option value="6 Passengers">6 Passengers</option>
                                <option value="7 Passengers">7 Passengers</option>
                                <option value="8 Passengers">8 Passengers</option>
                                <option value="9+ Passengers">9+ Passengers</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1 ml-0.5">Luggage</label>
                              <select 
                                value={luggage} 
                                onChange={(e) => setLuggage(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-white text-gray-700"
                              >
                                <option value="No Luggage">No Luggage</option>
                                <option value="1 Bag">1 Bag</option>
                                <option value="2 Bags">2 Bags</option>
                                <option value="3 Bags">3 Bags</option>
                                <option value="4 Bags">4 Bags</option>
                                <option value="5+ Bags">5+ Bags</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <input 
                              type="email" 
                              placeholder="Email Address (Optional)" 
                              value={email} onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-white text-gray-700"
                            />
                            <input 
                              type="text" 
                              placeholder="Pickup Landmark (Optional)" 
                              value={landmark} onChange={(e) => setLandmark(e.target.value)}
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-white text-gray-700"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1 ml-0.5">Adults</label>
                              <select 
                                value={adults} 
                                onChange={(e) => setAdults(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-white text-gray-700"
                              >
                                <option value="1 Adult">1 Adult</option>
                                <option value="2 Adults">2 Adults</option>
                                <option value="3 Adults">3 Adults</option>
                                <option value="4 Adults">4 Adults</option>
                                <option value="5 Adults">5 Adults</option>
                                <option value="6 Adults">6 Adults</option>
                                <option value="7 Adults">7 Adults</option>
                                <option value="8+ Adults">8+ Adults</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1 ml-0.5">Children</label>
                              <select 
                                value={children} 
                                onChange={(e) => setChildren(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-white text-gray-700"
                              >
                                <option value="No Children">No Children</option>
                                <option value="1 Child">1 Child</option>
                                <option value="2 Children">2 Children</option>
                                <option value="3 Children">3 Children</option>
                                <option value="4+ Children">4+ Children</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <textarea 
                              placeholder="Special Requirements (e.g. child seat, carrier, specific route requests...)" 
                              value={requirements} onChange={(e) => setRequirements(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-white text-gray-700 min-h-[60px]"
                              rows={2}
                            />
                          </div>
                          
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full mt-2 rounded-xl bg-[#0b1324] hover:bg-black text-white py-3 font-bold flex items-center justify-center gap-2 transition-colors disabled:bg-gray-400 text-[14px] shadow-lg cursor-pointer active:scale-95"
                          >
                            {isSubmitting ? (
                              <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                            ) : (
                              <>Get Instant Quote <ArrowRight className="w-4 h-4" /></>
                            )}
                          </button>
                          <p className="text-[10px] text-center text-gray-500 mt-2 flex items-center justify-center">
                            <ShieldCheck className="w-3 h-3 mr-1 text-green-500" /> No Advance Payment Required
                          </p>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FareBreakup;
