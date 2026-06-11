import React, { useState, useEffect } from 'react';
import { getCurrentLocationConfig } from '../lib/location';
import { getCityRouteConfig } from '../config/locationRoutes';
import { Phone, MessageCircle, MapPin, Clock, HelpCircle, ChevronRight, Compass } from 'lucide-react';
import LeadCapturePopup from '../components/LeadCapturePopup';
import ReactGA from 'react-ga4';
import { createWhatsAppUrl } from '../lib/whatsapp';

// Import images statically
import routeDehradun from '../assets/images/route-dehradun.webp';
import routeHaldwani from '../assets/images/route-haldwani.webp';
import routeHaridwar from '../assets/images/route-haridwar.webp';
import routeRishikesh from '../assets/images/route-rishikesh.webp';
import routeShimla from '../assets/images/route-shimla.webp';
import defaultRouteImg from '../assets/images/hero-bg.webp';

// New travel route images
import routeDelhi from '../assets/images/route-delhi.png';
import routeNainital from '../assets/images/route-nainital.png';
import routeCorbett from '../assets/images/route-corbett.png';
import routeKedarnath from '../assets/images/route-kedarnath.png';
import routeAyodhya from '../assets/images/route-ayodhya.png';
import routeKanpur from '../assets/images/route-kanpur.png';
import routeJaipur from '../assets/images/route-jaipur.png';
import routeAgra from '../assets/images/route-agra.png';

const routeImages = {
  dehradun: routeDehradun,
  haldwani: routeHaldwani,
  haridwar: routeHaridwar,
  rishikesh: routeRishikesh,
  mussoorie: routeShimla,
  delhi: routeDelhi,
  nainital: routeNainital,
  corbett: routeCorbett,
  kedarnath: routeKedarnath,
  ayodhya: routeAyodhya,
  kanpur: routeKanpur,
  jaipur: routeJaipur,
  agra: routeAgra,
  default: defaultRouteImg
};

export default function RoutesPage() {
  const currentLocation = getCurrentLocationConfig();
  const cityRouteConfig = getCityRouteConfig();
  const displayPhone = currentLocation.phone.replace('+91', '+91 ');

  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [popupPreFill, setPopupPreFill] = useState({ pickup: '', drop: '', routeName: '' });

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/routes" });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      {/* Hero Header */}
      <div className="bg-[#0B132B] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${defaultRouteImg})` }}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="bg-blue-600/30 text-blue-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/20">
            One-Way & Round Trips
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-4">
            Taxi Routes from {cityRouteConfig.city}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-medium">
            Explore premium outstation cab routes from {cityRouteConfig.city} to top travel destinations. Punctual, safe, and comfortable journeys guaranteed.
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mt-6"></div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1200px] mx-auto px-4 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <Compass className="w-6 h-6 mr-2 text-blue-600" />
          Popular Routes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cityRouteConfig.routeCards.map((card, idx) => {
            const imgFile = routeImages[card.image] || routeImages.default;
            const waMessage = `Hi Urgent Taxis, I want to book a taxi for:
🛣️ Route: ${card.title}
📍 Pickup: ${cityRouteConfig.city}
📍 Drop: ${card.destination}

Please share the pricing and availability.
(From ${window.location.hostname} / ${cityRouteConfig.city})`;

            return (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
                {/* Image & Badges */}
                <div className="h-[200px] w-full overflow-hidden relative bg-gray-100">
                  <img 
                    src={imgFile} 
                    alt={card.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col space-y-1.5 z-10">
                    <span className="bg-[#0b132b]/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center shadow-md">
                      <MapPin className="w-3 h-3 mr-1 text-blue-400" /> {card.distance || 'TBD'}
                    </span>
                    <span className="bg-[#0b132b]/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center shadow-md">
                      <Clock className="w-3 h-3 mr-1 text-green-400" /> {card.travelTime || 'TBD'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2.5">{card.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">{card.description}</p>
                  </div>

                  <div>
                    {/* Pricing Badge */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5 text-center text-[#1e3b8a] font-bold text-sm">
                      💰 {card.pricing}
                    </div>

                    {/* CTAs */}
                    <div className="grid grid-cols-1 gap-2">
                      <button 
                        onClick={() => {
                          setPopupPreFill({
                            pickup: cityRouteConfig.city,
                            drop: card.destination,
                            routeName: card.title
                          });
                          setIsLeadFormOpen(true);
                        }}
                        className="w-full bg-[#1e3b8a] hover:bg-[#152e73] text-white font-bold py-2.5 rounded-xl transition-colors text-center text-sm shadow-md"
                      >
                        Get Quote
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <a 
                          href={createWhatsAppUrl(currentLocation.whatsapp, waMessage)}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-[#00a859] hover:bg-[#00904d] text-white font-bold py-2 px-3 rounded-xl transition-colors text-center text-xs flex items-center justify-center shadow-sm"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
                        </a>
                        <a 
                          href={`tel:${currentLocation.phone}`}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-3 rounded-xl transition-colors text-center text-xs flex items-center justify-center shadow-sm"
                        >
                          <Phone className="w-3.5 h-3.5 mr-1" /> Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs Section */}
        {cityRouteConfig.faqs && cityRouteConfig.faqs.length > 0 && (
          <div className="max-w-[800px] mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 mr-2 text-blue-600" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              {cityRouteConfig.faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{faq.q}</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <LeadCapturePopup 
        isOpen={isLeadFormOpen} 
        onClose={() => setIsLeadFormOpen(false)} 
        routeName={popupPreFill.routeName} 
        initialPickup={popupPreFill.pickup} 
        initialDrop={popupPreFill.drop} 
      />
    </div>
  );
}
