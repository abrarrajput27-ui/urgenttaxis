import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import { useJsApiLoader } from '@react-google-maps/api';
import { 
  Calendar, Clock, Zap, Headphones, Users, Check, ArrowRight, ArrowLeftRight, Loader2, Phone, HelpCircle, MessageCircle, MapPin, Link as LinkIcon
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import { getRouteDistance } from '../lib/mapsApi';
import { getAllVehicleFares } from '../lib/pricingEngine';
import { TRIP_TYPES } from '../lib/pricingRules';
import FareBreakup from '../components/FareBreakup';
import LocationInput from '../components/LocationInput';
import StatCard from '../components/StatCard';
import LeadCapturePopup from '../components/LeadCapturePopup';

// Import images statically
import heroBg from '../assets/images/hero-bg.webp';
import heroCar from '../assets/images/car-innova.png';
import { routesData } from '../data/routesData';

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

// Fleet images
import carDzire from '../assets/images/car-dzire.png';
import carErtiga from '../assets/images/car-ertiga.png';
import carInnova from '../assets/images/car-innova.png';
import carCrysta from '../assets/images/car-crysta.png';
import carTraveller from '../assets/images/car-traveller.png';

const routeImages = {
  dehradun: routeDehradun,
  haldwani: routeHaldwani,
  haridwar: routeHaridwar,
  rishikesh: routeRishikesh,
  shimla: routeShimla,
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

const fleetCards = [
  {
    title: "Toyota Dzire",
    image: carDzire,
    description: "Comfortable compact sedan, ideal for city rides."
  },
  {
    title: "Maruti Ertiga",
    image: carErtiga,
    description: "Spacious MPV, perfect for family trips."
  },
  {
    title: "Toyota Innova",
    image: carInnova,
    description: "Premium sedan with ample legroom."
  },
  {
    title: "Toyota Crysta",
    image: carCrysta,
    description: "Luxury SUV for a smooth journey."
  },
  {
    title: "Toyota Traveller",
    image: carTraveller,
    description: "Large capacity vehicle for group travel."
  },
];



const RouteSEOContent = lazy(() => import('../components/RouteSEOContent'));

import { getCurrentLocationConfig } from '../lib/location';
import { getCityRouteConfig } from '../config/locationRoutes';

const libraries = ['places'];

export default function Home() {
  const currentLocation = getCurrentLocationConfig();
  const cityRouteConfig = getCityRouteConfig();
  const location = useLocation();

  const getDynamicRouteData = (pathname) => {
    if (routesData[pathname]) {
      return routesData[pathname];
    }
    const match = pathname.match(/^\/([a-z0-9-]+)-to-([a-z0-9-]+)-taxi$/i);
    if (match) {
      const capitalize = (str) => str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      const fromCity = capitalize(match[1]);
      const toCity = capitalize(match[2]);
      
      let distance = "250 km";
      let travelTime = "5 - 6 hours";
      
      const matchingCard = cityRouteConfig.routeCards.find(
        c => c.destination.toLowerCase() === toCity.toLowerCase()
      );
      if (matchingCard) {
        distance = matchingCard.distance;
        travelTime = matchingCard.travelTime;
      }
      
      return {
        heading: `${fromCity} to ${toCity} Taxi Service`,
        distance: distance,
        travelTime: travelTime,
        pickupPoints: [`Any location in ${fromCity}`, `${fromCity} Railway Station`, `${fromCity} Bus Stand`],
        dropPoints: [`Any location in ${toCity}`, `${toCity} Railway Station`, `${toCity} Bus Stand`],
        whyChooseUs: [
          "No Hidden Charges – Clear transparent billing.",
          "Professional Drivers – Verified, experienced, and polite drivers.",
          "Well-Maintained Fleet – Clean, sanitized, and air-conditioned cars.",
          "24/7 Customer Support – Always available to assist you."
        ],
        content: [
          {
            title: `Seamless Cab Booking from ${fromCity} to ${toCity}`,
            body: `Traveling from ${fromCity} to ${toCity} is now extremely comfortable and convenient with Urgent Taxis. We specialize in providing premium, comfortable, and highly affordable outstation cab services on this route. Whether you are planning a weekend getaway, a business trip, or returning to your hometown, our one-way and round-trip taxi options ensure that your journey is completely hassle-free.`
          },
          {
            title: `Affordable One-Way Taxi from ${fromCity} to ${toCity}`,
            body: `Urgent Taxis offers dedicated one-way fares from ${fromCity} to ${toCity}. This means you only pay for the exact distance you actually travel, making it a highly cost-effective alternative to trains or buses. Booking is simple and straightforward—you can reserve your cab instantly via WhatsApp, a phone call, or through our website.`
          }
        ],
        faqs: [
          {
            q: `What is the distance between ${fromCity} and ${toCity}?`,
            a: `The road distance from ${fromCity} to ${toCity} is approximately ${distance}. It typically takes around ${travelTime} to cover this distance by car, depending on traffic and road conditions.`
          },
          {
            q: `How do I book a taxi from ${fromCity} to ${toCity}?`,
            a: `Booking is simple. You can use our online booking calculator to get instant fares, contact us directly on WhatsApp, or call our 24/7 hotline at +91 7310651940 to confirm your booking instantly.`
          }
        ]
      };
    }
    return null;
  };

  const resolvedRouteData = getDynamicRouteData(location.pathname);
  const isRoutePage = !!resolvedRouteData;
  const displayPhone = currentLocation.phone.replace('+91', '+91 ');

  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [popupPreFill, setPopupPreFill] = useState({ pickup: '', drop: '', routeName: '' });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries
  });

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    
    // Check if there's a hash to scroll to
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.substring(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (!isRoutePage) {
      window.scrollTo(0,0);
    }
  }, [location, isRoutePage]);

  const getRouteData = (path) => {
    const data = {
      h1: <>Book Trusted <br/><span className="text-[#1e3b8a]">Taxi</span> in {cityRouteConfig.city}</>,
      subtitle: <>One Way <span className="mx-1.5 md:mx-2 font-light">|</span> Round Trip <span className="mx-1.5 md:mx-2 font-light">|</span> Airport Transfers</>,
      title: cityRouteConfig.seoTitle || currentLocation.seoTitle || "Urgent Taxis - Book Trusted Taxi in Seconds",
      desc: cityRouteConfig.seoDescription || currentLocation.seoDescription || "Book affordable outstation taxis, airport transfers, and local rentals. Urgent Taxis - your reliable travel partner.",
      heading: "Home"
    };

    if (resolvedRouteData) {
      data.title = `${resolvedRouteData.heading} | Urgent Taxis`;
      data.desc = resolvedRouteData.faqs?.[0]?.a || data.desc;
      data.h1 = <>{resolvedRouteData.heading.replace('Taxi', '')} <br/><span className="text-[#1e3b8a]">Taxi</span></>;
      data.subtitle = `Check latest ${resolvedRouteData.heading} fare. Book instantly.`;
      data.heading = resolvedRouteData.heading;
    }
    return data;
  };

  const routeData = getRouteData(location.pathname);
  const canonicalUrl = `https://urgenttaxis.com${location.pathname === '/' ? '' : location.pathname}`;

  const [pickup, setPickup] = useState(currentLocation.city || '');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (currentLocation && currentLocation.city) {
      setPickup(currentLocation.city);
    }
  }, [currentLocation]);
  
  // Trip State
  const [tripType, setTripType] = useState(TRIP_TYPES.ONE_WAY);
  const [returnDate, setReturnDate] = useState('');
  const [localPackage, setLocalPackage] = useState('8hr/80km');
  
  // Fare Engine State
  const [isCalculating, setIsCalculating] = useState(false);
  const [showFareBreakup, setShowFareBreakup] = useState(false);
  const [calculatedFares, setCalculatedFares] = useState([]);
  const [calculatedDistance, setCalculatedDistance] = useState(0);

  const swapLocations = () => {
    const temp = pickup;
    setPickup(drop);
    setDrop(temp);
  };

  const handleCalculateFare = async (e) => {
    e.preventDefault();
    if (!pickup || !date || !time) {
      alert("Please fill all required fields");
      return;
    }
    if (tripType !== TRIP_TYPES.LOCAL && !drop) {
      alert("Please fill drop location");
      return;
    }
    if (tripType === TRIP_TYPES.ROUND_TRIP && !returnDate) {
      alert("Please select a return date");
      return;
    }
    
    setIsCalculating(true);

    try {
      ReactGA.event("fare_search", {
        category: "Engagement",
        label: `${tripType}: ${pickup} to ${drop || localPackage}`
      });

      const routeResult = tripType === TRIP_TYPES.LOCAL ? 
                        { distanceKm: 0, tollsAndTaxes: 0 } : 
                        await getRouteDistance(pickup, drop);
      
      const fares = getAllVehicleFares({
        tripType,
        distanceKm: routeResult.distanceKm,
        estimatedToll: routeResult.estimatedToll,
        estimatedStateTax: routeResult.estimatedStateTax,
        tollCount: routeResult.tollCount,
        travelTime: routeResult.travelTime,
        routeSource: routeResult.source,
        distanceSource: routeResult.distanceSource,
        isUnknownRoute: routeResult.isUnknownRoute,
        pickupDate: date,
        returnDate: returnDate,
        localPackage: localPackage
      });

      if (fares.length === 0) throw new Error("Could not calculate fares");

      setCalculatedDistance(routeResult.distanceKm);
      setCalculatedFares(fares);
      setShowFareBreakup(true);

    } catch (err) {
      console.error("Error calculating fare:", err);
      alert(err.message || "Unable to calculate fare for this route. Please contact us directly.");
    } finally {
      setIsCalculating(false);
    }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://urgenttaxis.com/#organization",
        "name": "Urgent Taxis",
        "url": "https://urgenttaxis.com",
        "logo": "https://urgenttaxis.com/assets/images/logo.jpg",
        "sameAs": [
          "https://www.facebook.com/p/Urgent-Taxis-100094316769562/",
          "https://www.instagram.com/urgent.taxis",
          "https://www.youtube.com/@urgenttaxis"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": currentLocation.phone,
          "contactType": "customer service",
          "email": "info@urgenttaxis.com",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://urgenttaxis.com/#website",
        "url": "https://urgenttaxis.com",
        "name": "Urgent Taxis",
        "description": currentLocation.seoDescription || "Book affordable outstation taxis, airport transfers, and local rentals.",
        "publisher": {
          "@id": "https://urgenttaxis.com/#organization"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": cityRouteConfig.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a.replace('+91 7310651940', displayPhone)
          }
        }))
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{routeData.title}</title>
        <meta name="description" content={routeData.desc} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative w-full pt-8 pb-[100px] lg:pb-[140px] bg-[#f5f8ff] overflow-visible z-20">
        
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src={heroBg} alt="City BG" className="w-full h-full object-cover opacity-[0.4]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>
        
        {/* Curved Bottom White Shape */}
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-[60px] md:h-[120px] z-10">
          <path d="M0 0 L0 120 L1440 120 L1440 0 Q720 150 0 0 Z" fill="#ffffff" />
        </svg>

        <div className="max-w-[1200px] mx-auto px-4 relative z-20">
          
          {/* Car Image - Mathematically positioned to sit perfectly in the gap without overlapping */}
          <div className="hidden lg:block absolute left-[52%] -translate-x-1/2 ml-[-80px] bottom-[-90px] w-[420px] xl:w-[490px] z-10 pointer-events-none opacity-90 xl:opacity-100">
             <img src={heroCar} alt="Toyota Innova" className="w-full h-auto object-contain" />
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 lg:gap-0 relative z-30">
            
            {/* Left Col */}
            <div className="w-full lg:w-[48%] lg:-ml-10 xl:-ml-[50px] pt-6 flex flex-col">
              <h1 className="text-[36px] md:text-[44px] lg:text-[52px] xl:text-[56px] font-black text-[#0f172a] leading-[1.1] mb-4 tracking-tight">
                {routeData.h1}
              </h1>
              
              <p className="text-[15px] md:text-[18px] lg:text-[20px] text-gray-600 font-medium mb-10">
                {routeData.subtitle}
              </p>
              
              <div className="space-y-6 mb-16">
                <div className="flex items-start">
                  <div className="bg-[#1e3a8a] rounded-full p-2 mt-1 shadow-sm">
                    <Zap className="w-4 h-4 text-white fill-current" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-[16px] font-bold text-gray-900 leading-snug">Instant Booking</h3>
                    <p className="text-[13px] text-gray-500 font-medium">Quick & easy booking in just 2 clicks</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 shadow-sm">
                    <svg viewBox="0 0 24 24" className="w-[34px] h-[34px]" fill="#00a859" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.25 10.5L10.5 2.25C10.9 1.85 11.4 1.6 12 1.6H20.4C21.28 1.6 22 2.32 22 3.2V11.6C22 12.2 21.75 12.7 21.35 13.1L13.1 21.35C12.3 22.15 11.05 22.15 10.25 21.35L2.25 13.35C1.45 12.55 1.45 11.3 2.25 10.5Z" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="#ffffff" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-[16px] font-bold text-gray-900 leading-snug">Affordable Pricing</h3>
                    <p className="text-[13px] text-gray-500 font-medium">Best price guarantee with no hidden charges</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#1e3a8a] rounded-full p-2 mt-1 shadow-sm">
                    <Headphones className="w-4 h-4 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-[16px] font-bold text-gray-900 leading-snug">24/7 Support</h3>
                    <p className="text-[13px] text-gray-500 font-medium">We are always here to help you anytime</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col - Booking Form */}
            <div className="w-full lg:w-[460px] xl:w-[480px] relative z-40 mt-4 lg:mt-0 lg:ml-auto">
              <div className="bg-white rounded-[24px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100">
                
                <div className="bg-[#1e3b8a] px-6 py-6 text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-[24px] font-bold text-white mb-1 tracking-wide">Book Your Ride</h2>
                    <p className="text-blue-100 text-[12px] font-medium">Get Instant Price & Book Your Taxi</p>
                  </div>
                </div>
                
                {showFareBreakup ? (
                  <FareBreakup 
                    pickup={pickup}
                    drop={drop}
                    date={date}
                    time={time}
                    tripType={tripType}
                    returnDate={returnDate}
                    localPackage={localPackage}
                    distanceKm={calculatedDistance}
                    fares={calculatedFares}
                    onBack={() => setShowFareBreakup(false)}
                  />
                ) : (
                  <form className="p-4 sm:p-6 space-y-4" onSubmit={handleCalculateFare}>
                    
                    {/* Trip Type Toggles */}
                    <div className="flex bg-blue-50/50 p-1 rounded-xl mb-4 overflow-x-auto scrollbar-hide">
                      {Object.values(TRIP_TYPES).map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setTripType(type)}
                          className={`flex-1 min-w-[85px] py-2 text-[11px] sm:text-[12px] font-bold rounded-lg transition-all whitespace-nowrap px-2 ${
                            tripType === type 
                              ? 'bg-white text-[#1e3b8a] shadow-sm' 
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    {/* Locations */}
                    {tripType === TRIP_TYPES.LOCAL ? (
                      <LocationInput
                        label="Pickup City"
                        placeholder="Enter pickup city"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        iconColor="text-[#00a859]"
                        isLoaded={isLoaded}
                      />
                    ) : (
                      <div className="relative flex flex-col">
                        <LocationInput
                          label={tripType === TRIP_TYPES.AIRPORT ? "Airport / Pickup" : "Pickup City"}
                          placeholder={tripType === TRIP_TYPES.AIRPORT ? "Enter airport or city" : "Enter pickup city"}
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                          iconColor="text-[#00a859]"
                          isLoaded={isLoaded}
                        />
                        
                        <div className="flex justify-center -my-2 relative z-10 pointer-events-none">
                          <button 
                            type="button" 
                            onClick={swapLocations}
                            className="bg-white border border-gray-200 shadow-sm rounded-full p-1.5 hover:bg-gray-50 transition-colors pointer-events-auto"
                          >
                            <ArrowLeftRight className="w-[16px] h-[16px] text-[#1e3b8a] rotate-90" />
                          </button>
                        </div>
                        
                        <LocationInput
                          label={tripType === TRIP_TYPES.AIRPORT ? "Drop Location" : "Drop City"}
                          placeholder={tripType === TRIP_TYPES.AIRPORT ? "Enter drop city or hotel" : "Enter drop city"}
                          value={drop}
                          onChange={(e) => setDrop(e.target.value)}
                          iconColor="text-red-500"
                          isLoaded={isLoaded}
                        />
                      </div>
                    )}

                    {/* Local Packages (If Local) */}
                    {tripType === TRIP_TYPES.LOCAL && (
                      <div>
                        <label className="block text-[12px] font-bold text-gray-800 mb-1.5 ml-1">Select Package</label>
                        <div className="relative">
                          <Clock className="absolute left-3.5 top-[13px] w-[18px] h-[18px] text-[#1e3b8a]" />
                          <select 
                            value={localPackage} onChange={(e) => setLocalPackage(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-[14px] text-gray-700 outline-none focus:border-blue-500 appearance-none bg-white"
                          >
<option value="4hr/40km">4 Hrs / 40 Kms</option>
<option value="6hr/60km">6 Hrs / 60 Kms</option>
<option value="8hr/80km">8 Hrs / 80 Kms</option>
<option value="10hr/100km">10 Hrs / 100 Kms</option>
<option value="12hr/120km">12 Hrs / 120 Kms</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Date & Time */}
                    <div>
                      <label className="block text-[12px] font-bold text-gray-800 mb-1.5 ml-1">Pickup Date & Time</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-[14px] w-[18px] h-[18px] text-gray-400 pointer-events-none" />
                          <input 
                            type="date" 
                            value={date} onChange={(e) => setDate(e.target.value)}
                            className="w-full pl-10 pr-2 py-3 border border-gray-200 rounded-lg text-[14px] sm:text-[13px] text-gray-700 outline-none focus:border-blue-500 bg-white min-h-[46px] appearance-none"
                            required
                          />
                        </div>
                        <div className="relative">
                          <Clock className="absolute left-3.5 top-[14px] w-[18px] h-[18px] text-gray-400 pointer-events-none" />
                          <input 
                            type="time" 
                            value={time} onChange={(e) => setTime(e.target.value)}
                            className="w-full pl-10 pr-2 py-3 border border-gray-200 rounded-lg text-[14px] sm:text-[13px] text-gray-700 outline-none focus:border-blue-500 bg-white min-h-[46px] appearance-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Return Date (If Round Trip) */}
                    {tripType === TRIP_TYPES.ROUND_TRIP && (
                      <div>
                        <label className="block text-[12px] font-bold text-gray-800 mb-1.5 ml-1">Return Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-[14px] w-[18px] h-[18px] text-gray-400 pointer-events-none" />
                          <input 
                            type="date" 
                            value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
                            className="w-full pl-10 pr-2 py-3 border border-gray-200 rounded-lg text-[14px] sm:text-[13px] text-gray-700 outline-none focus:border-blue-500 bg-white min-h-[46px] appearance-none"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isCalculating}
                      className="w-full bg-[#0aa63f] hover:bg-[#088c34] text-white font-bold py-3.5 rounded-[10px] flex items-center justify-center transition-colors mt-6 text-[15px] shadow-md shadow-[#0aa63f]/20 disabled:bg-gray-400"
                    >
                      {isCalculating ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Calculating Fare...</>
                      ) : (
                        <>Calculate Fare <ArrowRight className="w-5 h-5 ml-2" /></>
                      )}
                    </button>
                    <div className="text-center pt-2">
                      <p className="text-[12px] font-bold text-gray-600 flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 text-yellow-500 mr-1 fill-yellow-500" /> Transparent Pricing • No Hidden Fees
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>



      <section className="relative z-30 max-w-[1150px] mx-auto px-4 lg:px-0 -mt-[100px] lg:-mt-[110px] mb-24">
        <div className="bg-white rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] py-6 px-4 md:px-10 border border-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-x-6">
            <StatCard
              icon={<Users />}
              value="10,000+"
              label="Happy Customers"
              bgColor="#1E40AF"
            />
            <StatCard
              icon={<Check />}
              value="Verified"
              label="Drivers"
              bgColor="#00A859"
            />
            <StatCard
              icon={<span className="text-2xl font-bold">₹</span>}
              value="No Hidden"
              label="Charges"
              bgColor="#1E40AF"
            />
            <StatCard
              icon={<Headphones />}
              value="24/7 Support"
              label="We’re here anytime"
              bgColor="#1E40AF"
            />
          </div>
        </div>
      </section>



      {/* Route SEO Content (If Route Page) */}
      {isRoutePage && (
        <Suspense fallback={<div className="h-[200px] flex items-center justify-center"><Loader2 className="animate-spin text-blue-500 w-8 h-8" /></div>}>
          <RouteSEOContent 
            data={resolvedRouteData} 
            onOpenLeadForm={() => {
              const route = resolvedRouteData;
              setPopupPreFill({
                pickup: route?.pickupPoints?.[0] || currentLocation.city,
                drop: route?.dropPoints?.[0] || '',
                routeName: route?.heading || 'Route Booking'
              });
              setIsLeadFormOpen(true);
            }} 
          />
        </Suspense>
      )}

      {/* Default Content (If NOT Route Page) */}
      {!isRoutePage && (
        <>
          {/* Welcome Section */}
          <section className="py-16 bg-white text-center">
            <div className="max-w-[800px] mx-auto px-4">
               <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Welcome to Urgent Taxis - {cityRouteConfig.city} Taxi Service</h2>
               <div className="w-24 h-1 bg-[#1877F2] mx-auto rounded-full mb-6"></div>
               <p className="text-gray-600 text-lg leading-relaxed mb-8">
                 Your premier choice for outstation cabs, local rentals, and airport transfers. We provide transparent pricing, verified drivers, and comfortable rides in {cityRouteConfig.city} and surrounding areas.
               </p>
               <div className="flex justify-center space-x-4">
                 <Link to="/services" className="bg-[#1e3b8a] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[#152e73] transition">Explore Services</Link>
                 <Link to="/about" className="bg-gray-100 text-[#1e3b8a] px-6 py-3 rounded-full font-bold shadow-sm hover:bg-gray-200 transition">About Us</Link>
               </div>
            </div>
          </section>

          {/* Popular Route Cards */}
          <section className="py-16 bg-[#f8f9fa] border-t border-gray-100">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Popular Outstation Routes from {cityRouteConfig.city}</h2>
                <div className="w-24 h-1 bg-[#1877F2] mx-auto rounded-full mb-6"></div>
                <p className="text-gray-600 font-medium">Select your destination and book instantly with our premium outstation taxi services.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cityRouteConfig.routeCards.map((card, idx) => {
                  const imgFile = routeImages[card.image] || routeImages.default;
                  const waMessage = `Hi Urgent Taxis, I want to book a taxi for:
🛣️ Route: ${card.title}
📍 Pickup: ${cityRouteConfig.city}
📍 Drop: ${card.destination}

Please share the pricing and availability.`;
                  
                  return (
                    <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
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
                                href={`https://wa.me/${currentLocation.whatsapp}?text=${encodeURIComponent(waMessage)}`}
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
            </div>
          </section>

          {/* Our Fleet Section */}
<section className="py-16 bg-white border-t border-gray-100">
  <div className="max-w-[1200px] mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">Our Fleet</h2>
    <div className="w-24 h-1 bg-[#1877F2] mx-auto rounded-full mb-6"></div>
    <p className="text-gray-600 text-center mb-8">Choose the perfect vehicle for your journey.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {fleetCards.map((car, idx) => (
        <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
          <img src={car.image} alt={car.title} className="w-full h-48 object-cover" />
          <div className="p-6 flex-grow flex flex-col justify-between">
            <h3 className="text-xl font-bold text-gray-900 mb-2.5">{car.title}</h3>
            <p className="text-gray-500 mb-4">{car.description}</p>
            <div className="mt-auto flex space-x-2">
              <a href={`tel:${currentLocation.phone}`} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-3 rounded-xl transition-colors text-xs flex items-center justify-center shadow-sm">Call Now</a>
              <a href={`https://wa.me/${currentLocation.whatsapp}?text=${encodeURIComponent(`Hi, I want to know more about ${car.title}`)}`} target="_blank" rel="noopener noreferrer" className="bg-[#00a859] hover:bg-[#00904d] text-white font-bold py-2 px-3 rounded-xl transition-colors text-xs flex items-center justify-center shadow-sm">WhatsApp</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Frequently Asked Questions */}
          <section className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-[800px] mx-auto px-4">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 flex items-center justify-center">
                <HelpCircle className="w-7 h-7 mr-3 text-[#1877F2]" /> Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {cityRouteConfig.faqs.map((faq, idx) => (
                  <details key={idx} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors shadow-sm" open={false}>
                    <summary className="font-bold text-gray-900 text-lg cursor-pointer list-none mb-2">
                      {faq.q}
                    </summary>
                    <p className="text-gray-600 leading-relaxed ml-4">
                      {faq.a.replace('+91 7310651940', displayPhone)}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Related Routes Link Bar */}
          <section className="py-12 bg-[#f8f9fa] border-t border-gray-100">
            <div className="max-w-[800px] mx-auto px-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More Taxi Routes</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {cityRouteConfig.routePageLinks.map((route, idx) => (
                  <Link 
                    key={idx} 
                    to={route.path}
                    className="bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 text-gray-700 hover:text-[#1877F2] font-medium py-3 px-6 rounded-full transition-colors flex items-center shadow-sm"
                  >
                    <LinkIcon className="w-4 h-4 mr-2 text-gray-400" /> {route.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* local LeadCapturePopup */}
      <LeadCapturePopup 
        isOpen={isLeadFormOpen} 
        onClose={() => setIsLeadFormOpen(false)} 
        routeName={popupPreFill.routeName} 
        initialPickup={popupPreFill.pickup} 
        initialDrop={popupPreFill.drop} 
      />
    </>
  );
}
