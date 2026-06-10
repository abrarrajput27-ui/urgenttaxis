import React from 'react';
import { PhoneCall, MessageCircle, FileText } from 'lucide-react';
import ReactGA from 'react-ga4';
import { getCurrentLocationConfig } from '../lib/location';

const StickyMobileBar = ({ onOpenLeadForm }) => {
  const locationData = getCurrentLocationConfig();
  const WHATSAPP_NUMBER = locationData.whatsapp;
  const CALL_NUMBER = locationData.phone;

  const handleCall = () => {
    ReactGA.event("sticky_call_click", { category: "Conversion", label: "Mobile Sticky Bar" });
  };

  const handleWhatsApp = () => {
    ReactGA.event("sticky_whatsapp_click", { category: "Conversion", label: "Mobile Sticky Bar" });
  };

  const handleQuoteClick = () => {
    ReactGA.event("get_quote_click", { category: "Conversion", label: "Mobile Sticky Bar" });
    onOpenLeadForm();
  };

  const whatsappMessage = `Hi, I am looking for a taxi.\n\nFrom ${locationData.city} (${window.location.hostname})`;

  return (
    <div className="fixed bottom-4 left-3 right-3 bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.15)] z-[30] flex items-center md:hidden rounded-[18px] overflow-hidden">
      <a 
        href={`tel:${CALL_NUMBER}`} 
        onClick={handleCall}
        className="flex-1 flex flex-col items-center justify-center py-2.5 px-2 text-[#00a859] hover:bg-green-50 transition-colors border-r border-gray-100"
      >
        <PhoneCall className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wide">Call Now</span>
      </a>
      
      <button 
        onClick={handleQuoteClick}
        className="flex-[1.2] flex flex-col items-center justify-center py-2.5 px-2 bg-gray-900 text-white hover:bg-black transition-colors"
      >
        <FileText className="w-5 h-5 mb-1 text-[#fbbf24]" />
        <span className="text-[10px] font-bold uppercase tracking-wide">Get Quote</span>
      </button>

      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsApp}
        className="flex-1 flex flex-col items-center justify-center py-2.5 px-2 text-[#1877F2] hover:bg-blue-50 transition-colors border-l border-gray-100"
      >
        <MessageCircle className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wide">WhatsApp</span>
      </a>
    </div>
  );
};

export default StickyMobileBar;
