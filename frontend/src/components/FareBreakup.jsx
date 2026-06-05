import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, Calendar, Clock, Car, CreditCard, ArrowLeft, Loader2, MessageCircle, Map, Navigation, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReactGA from 'react-ga4';

const WHATSAPP_NUMBER = "918595066033";

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
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [blockedUrl, setBlockedUrl] = useState(null);

  const selectedFare = fares[selectedVehicleIndex];

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBlockedUrl(null);

    try {
      ReactGA.event("fare_breakup_submit", {
        category: "Conversion",
        label: "Fare Breakup Booking",
        value: selectedFare.totalFare
      });

      const payload = {
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
        estimated_toll: selectedFare.estimatedToll,
        estimated_state_tax: selectedFare.estimatedStateTax,
        toll_count: selectedFare.tollCount,
        route_source: selectedFare.routeSource,
        distance_source: selectedFare.distanceSource,
        fare_version: "v1",
        pricing_engine_version: "fare-engine-v2",
        booking_id: null,
        customer_id: null,
        driver_id: null,
        vendor_id: null,
        fare_breakup: selectedFare,
        message: `Type: ${tripType} | Fare: ₹${selectedFare.isUnknownRoute ? 'TBD' : selectedFare.totalFare} | Dist: ${selectedFare.isUnknownRoute ? 'TBD' : selectedFare.originalDistanceKm}km`,
        source_page: window.location.pathname,
        route_name: `${pickup} to ${drop || localPackage}`,
        lead_source: "Fare Breakup Engine"
      };

      const { error } = await supabase.from('leads').insert([payload]);
      if (error) console.error("Supabase insert failed, continuing to WhatsApp:", error);

      let messageText = `🚖 New Confirmed Booking - Urgent Taxis\n\n👤 Name: ${name}\n📞 Mobile: ${mobile}\n🚕 Trip Type: ${tripType}\n📍 Pickup: ${pickup}\n📍 Drop/Package: ${drop || localPackage}\n📅 Date: ${date} at ${time}`;
      
      if (tripType === 'Round Trip' && returnDate) {
        messageText += `\n📅 Return Date: ${returnDate}`;
      }

      messageText += `\n\n🚘 Vehicle: ${selectedFare.category}\n`;
      if (selectedFare.isUnknownRoute) {
        messageText += `💰 Starting Base Fare: ₹${selectedFare.baseFare}\n\n*Exact distance and fare will be confirmed shortly on WhatsApp.*\n\n🌐 Source: Website Auto Fare Engine\n\nPlease call customer immediately.`;
      } else {
        messageText += `📏 Actual Route Distance: ${selectedFare.originalDistanceKm} km\n⏱️ Est. Travel Time: ${selectedFare.travelTime}\n🛣️ Est. Tolls: ${selectedFare.tollCount} (₹${selectedFare.estimatedToll})\n🏢 State Tax: ₹${selectedFare.estimatedStateTax}`;
        messageText += `\n💰 Final Quoted Fare: ₹${selectedFare.totalFare}\n\n🌐 Source: Website Auto Fare Engine\n\nPlease call customer immediately to confirm.`;
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
        <p className="text-gray-600 mb-6">We have received your request for a {selectedFare.category}. Our team will call you at {mobile} shortly to confirm the ride.</p>
        <button onClick={onBack} className="text-blue-600 font-bold hover:underline">Calculate another route</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative z-[100]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a8a] to-blue-800 p-4 text-white flex items-center justify-between">
        <button onClick={onBack} className="text-blue-100 hover:text-white transition-colors flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Edit Route
        </button>
        <div className="text-right">
           <h3 className="font-bold text-lg leading-tight">Select Vehicle</h3>
           <p className="text-xs text-blue-200">{selectedFare.isUnknownRoute ? 'Distance TBD' : `~${distanceKm} km Total Distance`}</p>
        </div>
      </div>

      {/* Route Summary Card */}
      <div className="bg-blue-50/50 p-4 border-b border-gray-100 text-[13px]">
        <div className="grid grid-cols-2 gap-y-3 gap-x-2">
          <div className="flex flex-col">
            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-0.5">Route Distance</span>
            <span className="font-semibold text-gray-900 flex items-center">
              <Map className="w-3.5 h-3.5 mr-1 text-blue-500" /> {selectedFare.isUnknownRoute ? 'TBD' : `${selectedFare.originalDistanceKm} km`}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-0.5">Est. Travel Time</span>
            <span className="font-semibold text-gray-900 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-blue-500" /> {selectedFare.isUnknownRoute ? 'TBD' : selectedFare.travelTime}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-0.5">Estimated Tolls</span>
            <span className="font-semibold text-gray-900">
              {selectedFare.tollCount} (Est. ₹{selectedFare.estimatedToll})
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-0.5">Estimated State Tax</span>
            <span className="font-semibold text-gray-900">₹{selectedFare.estimatedStateTax}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-0.5">Trip Type</span>
            <span className="font-semibold text-gray-900 flex items-center">
              <Navigation className="w-3.5 h-3.5 mr-1 text-blue-500" /> {tripType}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-0.5">Distance Source</span>
            <span className="font-semibold text-gray-900">{selectedFare.distanceSource}</span>
          </div>
        </div>
      </div>

      {/* Vehicle Selection */}
      <div className="w-full max-w-full p-4 bg-gray-50 border-b border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide pb-5">
        <div className="flex gap-3">
          {fares.map((fare, idx) => (
            <button 
              key={idx}
              onClick={() => setSelectedVehicleIndex(idx)}
              className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl border-2 transition-all min-w-[110px] ${selectedVehicleIndex === idx ? 'border-[#00a859] bg-[#e6f6ec] shadow-sm' : 'border-transparent bg-white hover:border-gray-200'}`}
            >
              <Car className={`w-8 h-8 mb-2 ${selectedVehicleIndex === idx ? 'text-[#00a859]' : 'text-gray-400'}`} />
              <span className="font-bold text-[13px] text-gray-900 leading-tight">{fare.category}</span>
              <span className="text-[10px] text-gray-500 mb-1">{fare.seats} Seats</span>
              <span className={`font-black text-[14px] ${selectedVehicleIndex === idx ? 'text-[#00a859]' : 'text-gray-700'}`}>
                {fare.isUnknownRoute ? `Start ₹${fare.baseFare}` : `₹${fare.totalFare}`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Fare Breakdown */}
      <div className="w-full max-w-full p-5 pb-[80px]">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-blue-600" /> Fare Breakup
        </h4>
        
        <div className="space-y-3 mb-6">
          {selectedFare.isUnknownRoute ? (
            <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm border border-blue-100 font-medium">
              Exact distance and fare will be confirmed shortly on WhatsApp.
            </div>
          ) : (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Distance Fare ({selectedFare.originalDistanceKm} km)</span>
                <span className="font-semibold text-gray-900">₹{selectedFare.distanceCharge}</span>
              </div>
              {selectedFare.distanceKm > selectedFare.originalDistanceKm && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Min. Fare Adjustment (upto {selectedFare.distanceKm} km)</span>
                  <span className="font-semibold text-gray-900">₹{Math.round((selectedFare.distanceKm - selectedFare.originalDistanceKm) * selectedFare.perKmRate)}</span>
                </div>
              )}
              {selectedFare.driverAllowance > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Driver Allowance</span>
                  <span className="font-semibold text-gray-900">₹{selectedFare.driverAllowance}</span>
                </div>
              )}
              {selectedFare.baseFare > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base/Package/Surcharge</span>
                  <span className="font-semibold text-gray-900">₹{selectedFare.baseFare}</span>
                </div>
              )}
              {selectedFare.estimatedToll > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated Toll</span>
                  <span className="font-semibold text-gray-900">₹{selectedFare.estimatedToll}</span>
                </div>
              )}
              {selectedFare.estimatedStateTax > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated State Tax</span>
                  <span className="font-semibold text-gray-900">₹{selectedFare.estimatedStateTax}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-500">
                 <span className="text-[12px] italic">Night / Peak Charges</span>
                 <span className="text-[12px] italic">As applicable</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200 mt-2">
                <span className="font-black text-gray-900">Final Estimated Fare</span>
                <span className="font-black text-2xl text-[#0aa63f]">₹{selectedFare.totalFare}</span>
              </div>
            </>
          )}
          
          <div className="bg-yellow-50 text-yellow-800 p-2.5 rounded-lg text-[11px] leading-relaxed flex items-start mt-3 mb-6 border border-yellow-100">
            <AlertCircle className="w-4 h-4 mr-1.5 flex-shrink-0 mt-0.5 text-yellow-600" />
            <span>Final fare may vary based on actual toll, state tax, parking, exact pickup/drop location and vehicle availability. Night/Peak charges may apply.</span>
          </div>
        </div>

        {/* Lead Capture Form to Confirm */}
        {blockedUrl ? (
          <div className="mt-2 p-4 bg-blue-50 rounded-xl w-full text-center">
            <p className="text-[13px] text-blue-800 mb-3 font-medium">To confirm this fare, please send your details to our WhatsApp:</p>
            <a 
              href={blockedUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center w-full shadow-lg text-[14px]"
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Confirm via WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name *" 
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-gray-50"
                  required
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Mobile No. *" 
                  value={mobile} onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 bg-gray-50"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold py-3.5 rounded-[10px] flex items-center justify-center transition-colors text-[15px] shadow-md disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
              ) : (
                <>Get Instant Quote <ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </button>
            <p className="text-[11px] text-center text-gray-500 mt-2 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-green-500" /> No Advance Payment Required
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default FareBreakup;
