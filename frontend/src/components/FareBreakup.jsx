import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, Calendar, Clock, Car, CreditCard, ArrowLeft, Loader2, MessageCircle, Map, Navigation, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReactGA from 'react-ga4';
import { getCurrentLocationConfig } from '../lib/location';

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
  const WHATSAPP_NUMBER = locationData.whatsapp;
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [blockedUrl, setBlockedUrl] = useState(null);

  const handleBooking = async (e, selectedFare) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBlockedUrl(null);

    try {
      ReactGA.event("fare_breakup_submit", {
        category: "Conversion",
        label: "Fare Breakup Booking",
        value: selectedFare.totalFare
      });

      // Prepare message with tracking details explicitly as a safe fallback
      const trackingDetails = `
--- Tracking Details ---
Domain: ${window.location.hostname}
City: ${locationData.city}
Route: ${pickup} to ${drop || localPackage}
Pickup: ${pickup}
Drop: ${drop || localPackage}
Travel Date: ${date}
Vehicle: ${selectedFare.category}
Customer Name: ${name}
Mobile: ${mobile}
Branch Phone: ${locationData.phone}
`;
      const finalMessage = `Type: ${tripType} | Fare: ₹${selectedFare.isUnknownRoute ? 'TBD' : selectedFare.totalFare} | Dist: ${selectedFare.isUnknownRoute ? 'TBD' : selectedFare.originalDistanceKm}km\n${trackingDetails}`;

      const basePayload = {
        name,
        mobile,
        pickup,
        drop_location: drop || localPackage,
        trip_date: date,
        trip_type: tripType,
        return_date: returnDate || null,
        trip_time: time,
        vehicle_type: selectedFare.category,
        estimated_fare: selectedFare.totalFare,
        distance_km: selectedFare.isUnknownRoute ? 0 : selectedFare.originalDistanceKm,
        travel_time: selectedFare.isUnknownRoute ? null : selectedFare.travelTime,
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
        route_name: `${pickup} to ${drop || localPackage}`,
        lead_source: "Fare Breakup Engine"
      };

      const fullPayload = {
        ...basePayload,
        source_domain: window.location.hostname,
        source_city: locationData.city,
        selected_route: `${pickup} to ${drop || localPackage}`,
        contact_number: locationData.phone,
        drop: drop || localPackage,
        travel_date: date,
        vehicle: selectedFare.category,
        customer_name: name
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

      let messageText = `🚖 New Confirmed Booking - Urgent Taxis (${locationData.city})\n\n👤 Name: ${name}\n📞 Mobile: ${mobile}\n🚕 Trip Type: ${tripType}\n📍 Pickup: ${pickup}\n📍 Drop/Package: ${drop || localPackage}\n📅 Date: ${date} at ${time}`;
      
      if (tripType === 'Round Trip' && returnDate) {
        messageText += `\n📅 Return Date: ${returnDate}`;
      }

      messageText += `\n\n🚘 Vehicle: ${selectedFare.category}\n`;
      if (selectedFare.isUnknownRoute) {
        messageText += `💰 Starting Base Fare: ₹${selectedFare.baseFare}\n\n*Exact distance and fare will be confirmed shortly on WhatsApp.*\n\n🏢 Location: ${locationData.city}\n🌐 Source: ${window.location.hostname} Auto Fare Engine\n\nPlease call customer immediately.`;
      } else {
        messageText += `📏 Actual Route Distance: ${selectedFare.originalDistanceKm} km\n⏱️ Est. Travel Time: ${selectedFare.travelTime}\n🛣️ Est. Tolls: ${selectedFare.tollCount} (${selectedFare.estimatedToll === "To be confirmed" ? "TBD" : '₹' + selectedFare.estimatedToll})\n🏢 State Tax: ${selectedFare.estimatedStateTax === "As applicable" ? "TBD" : '₹' + selectedFare.estimatedStateTax}`;
        messageText += `\n💰 Final Quoted Fare: ₹${selectedFare.totalFare}\n\n🏢 Location: ${locationData.city}\n🌐 Source: ${window.location.hostname} Auto Fare Engine\n\nPlease call customer immediately to confirm.`;
      }
      
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative z-[100] w-full">
      {/* Header & Route Summary */}
      <div className="bg-[#0b1324] p-4 text-white">
        <button onClick={onBack} className="text-gray-300 hover:text-white transition-colors flex items-center text-[13px] font-bold mb-3">
          <ArrowLeft className="w-4 h-4 mr-1" /> Edit Route
        </button>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 text-[15px] font-black tracking-wide">
              <span>{pickup}</span>
              <ArrowRight className="w-4 h-4 text-yellow-400" />
              <span>{drop || localPackage}</span>
            </div>
            <div className="mt-2 text-[12px] text-gray-400 font-medium flex items-center space-x-3">
              <span className="flex items-center"><Navigation className="w-3.5 h-3.5 mr-1" /> {tripType}</span>
              {distanceKm > 0 && <span className="flex items-center"><Map className="w-3.5 h-3.5 mr-1" /> {distanceKm} km</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Confidence Badge */}
      <div className="bg-blue-50 border-b border-blue-100 p-2.5 flex items-center justify-center text-blue-800 text-[11px] font-bold">
        {fares[0]?.isUnknownRoute ? (
          <><AlertCircle className="w-3.5 h-3.5 mr-1.5" /> Fare confirmation required for this route.</>
        ) : fares[0]?.distanceSource === 'Google Maps' ? (
          <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-600" /> Exact route distance via Google Maps.</>
        ) : (
          <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-blue-600" /> Estimated route distance.</>
        )}
      </div>

      {/* Vehicle List */}
      <div className="flex flex-col divide-y divide-gray-100">
        {fares.map((fare, idx) => {
          const isExpanded = expandedIndex === idx;
          
          return (
            <div key={idx} className={`bg-white transition-all ${isExpanded ? 'ring-2 ring-blue-500 z-10 relative shadow-lg' : 'hover:bg-gray-50'}`}>
              <div 
                className="p-4 cursor-pointer"
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  {/* Left: Image & Details */}
                  <div className="flex items-center flex-1">
                    <div className="bg-gray-100 p-2 rounded-xl mr-4 flex-shrink-0">
                      <Car className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-black text-[15px] text-gray-900 leading-tight">{fare.category}</h3>
                      <p className="text-[11px] text-gray-500 mt-0.5">{fare.description || `${fare.seats} Seats`}</p>
                      
                      {!fare.isUnknownRoute && (
                        <div className="flex items-center mt-1.5 space-x-2">
                          <span className="bg-green-100 text-green-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Save ₹{fare.youSave}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Pricing & CTA */}
                  <div className="text-right flex flex-col items-end justify-center ml-2">
                    {fare.isUnknownRoute ? (
                      <span className="font-black text-[16px] text-gray-900">TBD</span>
                    ) : (
                      <>
                        <span className="text-[12px] text-gray-400 line-through font-semibold mb-0.5">₹{fare.marketFare}</span>
                        <span className="font-black text-[18px] text-gray-900 leading-none">₹{fare.totalFare}</span>
                      </>
                    )}
                    <button 
                      className={`mt-2 text-[11px] font-bold px-4 py-1.5 rounded-full transition-colors ${isExpanded ? 'bg-blue-600 text-white' : 'bg-gray-900 text-white hover:bg-black'}`}
                    >
                      {isExpanded ? 'Close' : 'Select'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              {isExpanded && (
                <div className="px-4 pb-5 pt-2 border-t border-gray-100 bg-gray-50">
                  <div className="space-y-3 mb-6 bg-white p-4 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 text-[13px] flex items-center border-b border-gray-100 pb-2 mb-2">
                      <CreditCard className="w-4 h-4 mr-1.5 text-blue-600" /> Fare Breakup
                    </h4>
                    
                    {fare.isUnknownRoute ? (
                      <div className="text-sm font-medium text-gray-600">Exact distance and fare will be confirmed shortly on WhatsApp.</div>
                    ) : (
                      <>
                        {fare.tripType !== 'Local Rental' && (
                          <>
                            <div className="flex justify-between text-[12px]">
                              <span className="text-gray-600">Distance</span>
                              <span className="font-semibold text-gray-900">{fare.originalDistanceKm} km</span>
                            </div>
                            <div className="flex justify-between text-[12px]">
                              <span className="text-gray-600">Chargeable KM</span>
                              <span className="font-semibold text-gray-900">{fare.chargeableKm} km</span>
                            </div>
                            <div className="flex justify-between text-[12px]">
                              <span className="text-gray-600">Per KM Rate</span>
                              <span className="font-semibold text-gray-900">₹{fare.perKmRate}/km</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between text-[12px]">
                          <span className="text-gray-600">Base Fare / Distance Charge</span>
                          <span className="font-semibold text-gray-900">₹{fare.distanceCharge || fare.baseFare}</span>
                        </div>
                        {fare.driverAllowance > 0 && (
                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Driver Allowance</span>
                            <span className="font-semibold text-gray-900">₹{fare.driverAllowance}</span>
                          </div>
                        )}
                        {fare.estimatedToll > 0 || typeof fare.estimatedToll === 'string' ? (
                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">Estimated Tolls</span>
                            <span className="font-semibold text-gray-900">
                              {typeof fare.estimatedToll === 'number' ? `₹${fare.estimatedToll}` : fare.estimatedToll}
                            </span>
                          </div>
                        ) : null}
                        {fare.estimatedStateTax > 0 || typeof fare.estimatedStateTax === 'string' ? (
                          <div className="flex justify-between text-[12px]">
                            <span className="text-gray-600">State Tax</span>
                            <span className="font-semibold text-gray-900">
                              {typeof fare.estimatedStateTax === 'number' ? `₹${fare.estimatedStateTax}` : fare.estimatedStateTax}
                            </span>
                          </div>
                        ) : null}

                        <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                           <span className="italic">Parking & Airport Entry</span>
                           <span className="italic">Extra</span>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200 mt-2">
                          <span className="font-black text-gray-900 text-[14px]">Final Estimated Fare</span>
                          <span className="font-black text-[18px] text-[#0aa63f]">₹{fare.totalFare}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="bg-yellow-50 text-yellow-800 p-2 rounded-lg text-[10px] leading-relaxed flex items-start mt-3 border border-yellow-100">
                      <AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0 mt-0.5 text-yellow-600" />
                      <span>Final fare may vary based on actual toll, state tax, parking, exact pickup/drop location and vehicle availability. Night/Peak charges may apply.</span>
                    </div>
                  </div>

                  {/* Lead Capture Form to Confirm */}
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
                    <form onSubmit={(e) => handleBooking(e, fare)} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          placeholder="Your Name *" 
                          value={name} onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-3 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-white"
                          required
                        />
                        <input 
                          type="tel" 
                          placeholder="Mobile No. *" 
                          value={mobile} onChange={(e) => setMobile(e.target.value)}
                          className="w-full px-3 py-3 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-white"
                          required
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full mt-2 rounded-xl bg-[#0b1324] hover:bg-black text-white py-3.5 font-bold flex items-center justify-center gap-2 transition-colors disabled:bg-gray-400 text-[14px] shadow-lg"
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FareBreakup;
