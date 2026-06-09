import React from 'react';
import { FileText } from 'lucide-react';
import ReactGA from 'react-ga4';

const FloatingQuoteWidget = ({ onOpenLeadForm, isHidden }) => {
  if (isHidden) return null;

  const handleQuoteClick = () => {
    ReactGA.event("get_quote_click", { category: "Conversion", label: "Desktop Floating Widget" });
    onOpenLeadForm();
  };

  return (
    <button 
      onClick={handleQuoteClick}
      className="hidden lg:flex fixed bottom-[40px] right-[40px] z-[30] bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-full shadow-2xl transition-transform transform hover:scale-105 items-center group border border-gray-700"
    >
      <div className="bg-[#fbbf24] p-2 rounded-full mr-3 group-hover:animate-pulse">
        <FileText className="w-5 h-5 text-gray-900" />
      </div>
      <span className="font-bold tracking-wide">Get Instant Quote</span>
    </button>
  );
};

export default FloatingQuoteWidget;
