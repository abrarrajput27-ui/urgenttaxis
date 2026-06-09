import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { X, Loader2, CheckCircle2, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLocation } from 'react-router-dom';

const LeadCapturePopup = ({ isOpen, onClose, routeName = "General Booking" }) => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [blockedUrl, setBlockedUrl] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pickup: '',
    drop_location: '',
    trip_date: '',
    vehicle_type: 'Sedan',
    message: ''
  });

  // Track Open Event
  useEffect(() => {
    if (isOpen) {
      ReactGA.event("lead_form_open", {
        category: "Conversion",
        label: routeName,
        page_path: location.pathname
      });
      setIsSuccess(false); // Reset success state when opened
      setBlockedUrl(null);
    }
  }, [isOpen, routeName, location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFallbackClick = () => {
    ReactGA.event("whatsapp_lead_notification_opened", {
      category: "Conversion",
      label: "Fallback Clicked"
    });
    // Auto close after clicking
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setBlockedUrl(null);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBlockedUrl(null);

    try {
      // 1. Fire GA4 Event
      ReactGA.event("lead_form_submit", {
        category: "Conversion",
        label: routeName,
        value: 1
      });

      // 2. Prepare Payload mapping to expected DB columns
      const payload = {
        name: formData.name,
        phone: formData.mobile,
        pickup_location: formData.pickup,
        drop_location: formData.drop_location,
        travel_date: formData.trip_date,
        vehicle_category: formData.vehicle_type,
        trip_type: "Not Specified",
        message: formData.message,
        source_page: location.pathname,
        route_source: routeName,
        lead_source: "Popup Form"
      };

      // 3. Insert into Supabase
      const { error } = await supabase.from('leads').insert([payload]);

      if (error) {
        throw error;
      }

      // 4. WhatsApp Integration
      const BUSINESS_WHATSAPP_NUMBER = "918595066033";
      const messageText = `🚖 New Quote Request - Urgent Taxis\n\n👤 Name: ${formData.name}\n📞 Mobile: ${formData.mobile}\n📍 Pickup: ${formData.pickup}\n📍 Drop: ${formData.drop_location}\n📅 Trip Date: ${formData.trip_date}\n🚘 Vehicle: ${formData.vehicle_type}\n💬 Message: ${formData.message || 'N/A'}\n\n🌐 Source Page: ${location.pathname}\n🛣️ Route Name: ${routeName}\n📌 Lead Source: Website Get Quote Form\n\nPlease call customer as soon as possible.`;

      const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
      
      const newWindow = window.open(whatsappUrl, "_blank");
      
      let isBlocked = false;
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        isBlocked = true;
        setBlockedUrl(whatsappUrl);
      } else {
        ReactGA.event("whatsapp_lead_notification_opened", {
          category: "Conversion",
          label: "Auto Opened"
        });
      }

      setIsSuccess(true);
      // Reset form
      setFormData({
        name: '', mobile: '', pickup: '', drop_location: '',
        trip_date: '', vehicle_type: 'Sedan', message: ''
      });

      // Auto close after 3 seconds only if not blocked
      if (!isBlocked) {
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
        }, 3000);
      }

    } catch (err) {
      console.error("Error submitting lead:", err);
      alert("Something went wrong. Please try calling us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
            <CheckCircle2 className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
            <h3 className="text-2xl font-black text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">Your request has been received. Our team will contact you shortly.</p>
            
            {blockedUrl && (
              <div className="mt-2 p-4 bg-blue-50 rounded-xl w-full animate-in slide-in-from-bottom-4 duration-500">
                <p className="text-sm text-blue-800 mb-3 font-medium">To ensure immediate processing, please send your details to our WhatsApp:</p>
                <a 
                  href={blockedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleFallbackClick}
                  className="bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center w-full shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" /> Send Lead to WhatsApp
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-black text-gray-900 mb-1">Get Instant Quote</h3>
            <p className="text-sm text-gray-500 mb-6">Fill out the details below and we will contact you immediately.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile *</label>
                  <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="10-digit number" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Pickup City *</label>
                  <input required type="text" name="pickup" value={formData.pickup} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="E.g. Delhi Airport" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Drop City *</label>
                  <input required type="text" name="drop_location" value={formData.drop_location} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="E.g. Haldwani" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Trip Date *</label>
                  <input required type="date" name="trip_date" value={formData.trip_date} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Vehicle Preference</label>
                  <select name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option value="Sedan">Sedan (4 Pax)</option>
                    <option value="Ertiga">Ertiga (6 Pax)</option>
                    <option value="Innova">Innova (6/7 Pax)</option>
                    <option value="Innova Crysta">Innova Crysta (6/7 Pax)</option>
                    <option value="Tempo Traveller">Tempo Traveller (12 Pax)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Any specific requirements?</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="2" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Late night pickup, extra luggage, etc..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#1877F2] hover:bg-[#155fc2] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting Request...</>
                ) : (
                  "Request Quote"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadCapturePopup;
