import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, Calendar, Clock, Car, CreditCard, ArrowLeft, Loader2, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReactGA from 'react-ga4';

const WHATSAPP_NUMBER = "918595066033";

const FareBreakup = ({ 
  pickup, 
  drop, 
  date, 
  time, 
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
        drop_location: drop,
        trip_date: date,
        vehicle_type: selectedFare.category,
        message: `Time: ${time} | Fare: ₹${selectedFare.totalFare} | Dist: ${distanceKm}km`,
        source_page: window.location.pathname,
        route_name: `${pickup} to ${drop}`,
        lead_source: "Fare Breakup Engine"
      };

      const { error } = await supabase.from('leads').insert([payload]);
      if (error) console.error("Supabase insert failed, continuing to WhatsApp:", error);

      const messageText = `🚖 New Confirmed Booking - Urgent Taxis\n\n👤 Name: ${name}\n📞 Mobile: ${mobile}\n📍 Pickup: ${pickup}\n📍 Drop: ${drop}\n📅 Trip Date: ${date} at ${time}\n🚘 Vehicle: ${selectedFare.category}\n\n💰 Quoted Fare: ₹${selectedFare.totalFare}\n📏 Est. Distance: ${distanceKm} km\n\n🌐 Source: Website Auto Fare Engine\n\nPlease call customer immediately to confirm.`;
      
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a8a] to-blue-800 p-4 text-white flex items-center justify-between">
        <button onClick={onBack} className="text-blue-100 hover:text-white transition-colors flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Edit Route
        </button>
        <div className="text-right">
           <h3 className="font-bold text-lg leading-tight">Select Vehicle</h3>
           <p className="text-xs text-blue-200">~{distanceKm} km Total Distance</p>
        </div>
      </div>

      {/* Vehicle Selection */}
      <div className="p-4 bg-gray-50 border-b border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide pb-5">
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
              <span className={`font-black text-[14px] ${selectedVehicleIndex === idx ? 'text-[#00a859]' : 'text-gray-700'}`}>₹{fare.totalFare}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Fare Breakdown */}
      <div className="p-5">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-blue-600" /> Fare Breakup
        </h4>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Base Fare ({distanceKm} km x ₹{selectedFare.perKmRate})</span>
            <span className="font-semibold text-gray-900">₹{selectedFare.distanceCharge}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Driver Allowance</span>
            <span className="font-semibold text-gray-900">₹{selectedFare.driverAllowance}</span>
          </div>
          {selectedFare.tollsAndTaxes > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Est. Tolls & State Tax</span>
              <span className="font-semibold text-gray-900">₹{selectedFare.tollsAndTaxes}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200 mt-2">
            <span className="font-black text-gray-900">Total Estimated Fare</span>
            <span className="font-black text-2xl text-[#0aa63f]">₹{selectedFare.totalFare}</span>
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
                <>Lock This Price & Book <ArrowRight className="w-5 h-5 ml-2" /></>
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
