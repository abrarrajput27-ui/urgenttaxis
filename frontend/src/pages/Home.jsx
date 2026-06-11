import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import { useJsApiLoader } from '@react-google-maps/api';
import { 
  Calendar, Clock, Zap, Headphones, Users, Check, ArrowRight, ArrowLeftRight, Loader2, Phone, HelpCircle, MessageCircle, MapPin, Link as LinkIcon,
  ShieldCheck, Star, Car, ChevronDown, ChevronLeft, ChevronRight, X
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
import carSwift from '../assets/images/car-swift.png';
import carDzire from '../assets/images/car-dzire.png';
import carErtiga from '../assets/images/car-ertiga.png';
import carInnova from '../assets/images/car-innova.png';
import carCrysta from '../assets/images/car-crysta.png';
import carTraveller from '../assets/images/car-traveller.png';

// Service and user images
import serviceOneway from '../assets/images/service-oneway.png';
import serviceRoundtrip from '../assets/images/service-roundtrip.png';
import serviceAirport from '../assets/images/service-airport.png';
import serviceLocal from '../assets/images/service-local.png';
import serviceTour from '../assets/images/service-tour.png';
import ctaCar from '../assets/images/cta-car-premium.png';
import user1 from '../assets/images/user1.jpg';
import user2 from '../assets/images/user2.jpg';
import user3 from '../assets/images/user3.jpg';

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
    title: "Maruti Swift",
    subtitle: "Hatchback or Similar",
    image: carSwift,
    seating: "4 Seater",
    ac: "AC",
    luggage: "2 Small Bags",
    plainRate: "₹10/km",
    hillRate: "₹13/km",
    description: "Compact hatchback perfect for quick city trips and easy parking."
  },
  {
    title: "Maruti Dzire",
    subtitle: "Toyota Etios or Similar (Dzire, Aura, Amaze)",
    image: carDzire,
    seating: "4 Seater",
    ac: "AC",
    luggage: "2 Bags",
    plainRate: "₹12/km",
    hillRate: "₹15/km",
    description: "Comfort sedan ideal for family trips and business commutes."
  },
  {
    title: "Maruti Ertiga",
    subtitle: "Spacious MPV",
    image: carErtiga,
    seating: "6 Seater",
    ac: "AC",
    luggage: "3 Bags",
    plainRate: "₹16/km",
    hillRate: "₹20/km",
    description: "Spacious seven-seater family car for outstation tours."
  },
  {
    title: "Toyota Innova",
    subtitle: "Premium MUV",
    image: carInnova,
    seating: "6 Seater",
    ac: "AC",
    luggage: "4 Bags",
    plainRate: "₹24/km",
    hillRate: "₹28/km",
    description: "Spacious and reliable multi-utility vehicle for all terrains."
  },
  {
    title: "Innova Crysta",
    subtitle: "Luxury SUV",
    image: carCrysta,
    seating: "6 Seater",
    ac: "AC",
    luggage: "4 Bags",
    plainRate: "₹25/km",
    hillRate: "₹30/km",
    description: "Premium class luxury SUV for the ultimate comfort ride."
  },
  {
    title: "Tempo Traveller",
    subtitle: "12-26 Seater Van",
    image: carTraveller,
    seating: "12 Seater",
    ac: "AC",
    luggage: "5 Bags",
    plainRate: "₹26/km",
    hillRate: "₹32/km",
    description: "Large capacity premium force traveler for groups and events."
  }
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
        ],
        relatedRoutes: cityRouteConfig.routePageLinks || []
      };
    }
    return null;
  };

  const resolvedRouteData = getDynamicRouteData(location.pathname);
  const isRoutePage = !!resolvedRouteData;
  const displayPhone = currentLocation.phone.replace('+91', '+91 ');

  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [popupPreFill, setPopupPreFill] = useState({ pickup: '', drop: '', routeName: '' });

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const hasMapsKey = !!(apiKey && apiKey.trim() !== "");

  const { isLoaded: mapsScriptLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: libraries
  });

  const isLoaded = hasMapsKey && mapsScriptLoaded;

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
      h1: <>Book Trusted <br/><span className="text-blue-600">Taxi</span> in Seconds</>,
      subtitle: <>One Way <span className="mx-1.5 md:mx-2 font-light">|</span> Round Trip <span className="mx-1.5 md:mx-2 font-light">|</span> Airport Transfers</>,
      title: cityRouteConfig.seoTitle || currentLocation.seoTitle || "Urgent Taxis - Book Trusted Taxi in Seconds",
      desc: cityRouteConfig.seoDescription || currentLocation.seoDescription || "Book affordable outstation taxis, airport transfers, and local rentals. Urgent Taxis - your reliable travel partner.",
      heading: "Home"
    };

    if (resolvedRouteData) {
      let cleanRoute;
      if (path.match(/^\/([a-z0-9-]+)-to-([a-z0-9-]+)-taxi$/i)) {
        cleanRoute = path.match(/^\/([a-z0-9-]+)-to-([a-z0-9-]+)-taxi$/i)[0]
          .replace(/^\//, '')
          .replace(/-taxi$/, '')
          .split('-to-')
          .map(w => w.split('-').map(token => token.charAt(0).toUpperCase() + token.slice(1)).join(' '))
          .join(' to ');
      } else if (path.match(/^\/([a-z0-9-]+)-taxi-service$/i)) {
        cleanRoute = path.match(/^\/([a-z0-9-]+)-taxi-service$/i)[1]
          .split('-')
          .map(token => token.charAt(0).toUpperCase() + token.slice(1))
          .join(' ');
      } else {
        cleanRoute = resolvedRouteData.heading
          .replace(/\b(Taxi Service|Taxi Booking|Taxi|Service|Reliable|Premium|in)\b/gi, '')
          .replace(/[|]/g, '')
          .replace(/\s+/g, ' ')
          .trim();
      }

      data.title = `${cleanRoute} Taxi | Taxi Service | Urgent Taxis`;
      data.desc = resolvedRouteData.faqs?.[0]?.a || data.desc;
      data.h1 = <>{cleanRoute} Taxi <br/><span className="text-[#1e3b8a]">Service</span></>;
      data.subtitle = `Check latest ${cleanRoute} Taxi Service fare. Book instantly.`;
      data.heading = `${cleanRoute} Taxi Service`;
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

  const [prevPickupDate, setPrevPickupDate] = useState(date);

  useEffect(() => {
    if (date !== prevPickupDate) {
      if (returnDate && returnDate < date) {
        setReturnDate('');
      }
      setPrevPickupDate(date);
    }
  }, [date, returnDate, prevPickupDate]);
  
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
    if (tripType === TRIP_TYPES.ROUND_TRIP) {
      if (!returnDate) {
        alert("Please select a return date");
        return;
      }
      if (returnDate < date) {
        alert("Return date cannot be before pickup date.");
        return;
      }
    }
    
    setIsCalculating(true);

    try {
      ReactGA.event("fare_search", {
        category: "Engagement",
        label: `${tripType}: ${pickup} to ${drop || localPackage}`
      });

      const routeResult = tripType === TRIP_TYPES.LOCAL ? 
                        { distanceKm: 0, tollsAndTaxes: 0, source: 'local', distanceSource: 'local', isUnknownRoute: false } : 
                        await getRouteDistance(pickup, drop);
      
      if (!routeResult || routeResult.distanceKm === null || routeResult.distanceKm === undefined) {
        throw new Error("Unable to calculate route distance. Please check pickup/drop address.");
      }

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
        localPackage: localPackage,
        pickupTime: time
      });

      if (fares.length === 0) throw new Error("Could not calculate fares");

      setCalculatedDistance(routeResult.distanceKm);
      setCalculatedFares(fares);
      setShowFareBreakup(true);

    } catch (err) {
      console.error("Error calculating fare:", err);
      alert(err.message || "Unable to calculate route distance. Please check pickup/drop address.");
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
          
          {/* Car Image - Positioned above the curve and stats row for full visibility */}
          <div className="hidden lg:block absolute left-[50%] -translate-x-1/2 ml-[-50px] bottom-[15px] w-[480px] xl:w-[560px] z-30 pointer-events-none opacity-95 xl:opacity-100 transition-all">
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
                
                  <form className="p-4 sm:p-6 space-y-4" onSubmit={handleCalculateFare}>
                    
                    {/* Trip Type Toggles */}
                    <div className="flex bg-gray-100 p-1 rounded-xl mb-4 overflow-x-auto scrollbar-hide">
                      {Object.values(TRIP_TYPES).map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setTripType(type)}
                          className={`flex-1 min-w-[85px] py-2 text-[11px] sm:text-[12px] font-extrabold rounded-lg transition-all whitespace-nowrap px-2 ${
                            tripType === type 
                              ? 'bg-white text-gray-950 shadow-sm' 
                              : 'text-gray-500 hover:text-gray-800'
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
                      <div className="relative space-y-3">
                        <LocationInput
                          label={tripType === TRIP_TYPES.AIRPORT ? "Airport / Pickup" : "Pickup City"}
                          placeholder={tripType === TRIP_TYPES.AIRPORT ? "Enter airport or city" : "Enter pickup city"}
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                          iconColor="text-[#00a859]"
                          isLoaded={isLoaded}
                        />
                        
                        <LocationInput
                          label={tripType === TRIP_TYPES.AIRPORT ? "Drop Location" : "Drop City"}
                          placeholder={tripType === TRIP_TYPES.AIRPORT ? "Enter drop city or hotel" : "Enter drop city"}
                          value={drop}
                          onChange={(e) => setDrop(e.target.value)}
                          iconColor="text-red-500"
                          isLoaded={isLoaded}
                        />
                        
                        {/* Swap Button on the Right */}
                        <div className="absolute right-3.5 top-[86px] -translate-y-1/2 z-20 pointer-events-auto">
                          <button 
                            type="button" 
                            onClick={swapLocations}
                            className="bg-white border-2 border-blue-100 hover:border-blue-600 shadow-md rounded-full p-1.5 hover:bg-gray-50 transition-all flex items-center justify-center cursor-pointer active:scale-95"
                          >
                            <ArrowLeftRight className="w-[14px] h-[14px] text-[#1e3b8a] rotate-90" />
                          </button>
                        </div>
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
                            type={date ? "date" : "text"} 
                            placeholder="Select Journey Date"
                            min={new Date().toISOString().split('T')[0]}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => !e.target.value && (e.target.type = "text")}
                            value={date} onChange={(e) => setDate(e.target.value)}
                            className="w-full pl-10 pr-2 py-3 border border-gray-200 rounded-lg text-[14px] sm:text-[13px] text-gray-700 outline-none focus:border-blue-500 bg-white min-h-[46px] appearance-none"
                            required
                          />
                        </div>
                        <div className="relative">
                          <Clock className="absolute left-3.5 top-[14px] w-[18px] h-[18px] text-gray-400 pointer-events-none" />
                          <input 
                            type={time ? "time" : "text"} 
                            placeholder="Select Pickup Time"
                            onFocus={(e) => (e.target.type = "time")}
                            onBlur={(e) => !e.target.value && (e.target.type = "text")}
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
                            type={returnDate ? "date" : "text"} 
                            placeholder="Select Return Date"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => !e.target.value && (e.target.type = "text")}
                            min={date}
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
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Checking Fare...</>
                      ) : (
                        <>Check Fare <ArrowRight className="w-5 h-5 ml-2" /></>
                      )}
                    </button>
                    <div className="text-center pt-2">
                      <p className="text-[12px] font-bold text-gray-600 flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 text-yellow-500 mr-1 fill-yellow-500" /> Instant WhatsApp Confirmation
                      </p>
                    </div>
                  </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Trust / Stat Cards Section */}
      <section className="relative z-30 max-w-[1150px] mx-auto px-4 lg:px-0 -mt-[80px] lg:-mt-[90px] mb-20">
        <div className="bg-white rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] py-8 px-6 md:px-10 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white flex-shrink-0 shadow-md">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-[18px] text-[#0f172a] leading-tight">10,000+</h3>
                <p className="text-[13px] font-bold text-gray-800 leading-tight">Happy Customers</p>
                <p className="text-[11px] text-gray-400 font-medium">and counting</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#00a859] text-white flex-shrink-0 shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-[18px] text-[#0f172a] leading-tight">Verified</h3>
                <p className="text-[13px] font-bold text-gray-800 leading-tight">Drivers</p>
                <p className="text-[11px] text-gray-400 font-medium">Background verified</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white flex-shrink-0 shadow-md">
                <span className="text-xl font-black">₹</span>
              </div>
              <div>
                <h3 className="font-black text-[18px] text-[#0f172a] leading-tight">No Hidden</h3>
                <p className="text-[13px] font-bold text-gray-800 leading-tight">Charges</p>
                <p className="text-[11px] text-gray-400 font-medium">100% Transparent</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#00a859] text-white flex-shrink-0 shadow-md">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-[18px] text-[#0f172a] leading-tight">24/7</h3>
                <p className="text-[13px] font-bold text-gray-800 leading-tight">Support</p>
                <p className="text-[11px] text-gray-400 font-medium">We're here anytime</p>
              </div>
            </div>
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

      {!isRoutePage && (
        <>
          {/* 1. Services Section */}
          <section id="services-section" className="py-16 bg-white border-t border-gray-50">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="text-center mb-12">
                <span className="text-xs font-black uppercase tracking-widest text-[#00a859]">What We Offer</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-3">Our Taxi Services</h2>
                <p className="text-gray-500 font-medium text-sm max-w-xl mx-auto">Choose from a wide range of taxi services made just for you</p>
              </div>

              <div className="relative group/carousel px-4">
                {/* Left Carousel Arrow */}
                <button 
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('services-grid-container');
                    if (el) el.scrollBy({ left: -240, behavior: 'smooth' });
                  }}
                  className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all z-10 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div id="services-grid-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 overflow-x-auto lg:overflow-x-visible scrollbar-hide">
                {/* Card 1: One Way */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center group">
                  <div className="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src={serviceOneway} alt="One Way Taxi" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">One Way Taxi</h3>
                  <p className="text-gray-400 text-xs font-medium mb-5 leading-relaxed">Affordable one way drops at best prices</p>
                  <button 
                    onClick={() => {
                      setTripType(TRIP_TYPES.ONE_WAY);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center transition-colors mt-auto group-hover:translate-x-1 duration-200"
                  >
                    Book Now →
                  </button>
                </div>

                {/* Card 2: Round Trip */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center group">
                  <div className="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src={serviceRoundtrip} alt="Round Trip Taxi" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">Round Trip Taxi</h3>
                  <p className="text-gray-400 text-xs font-medium mb-5 leading-relaxed">Round trips with flexible packages</p>
                  <button 
                    onClick={() => {
                      setTripType(TRIP_TYPES.ROUND_TRIP);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center transition-colors mt-auto group-hover:translate-x-1 duration-200"
                  >
                    Book Now →
                  </button>
                </div>

                {/* Card 3: Airport Transfer */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center group">
                  <div className="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src={serviceAirport} alt="Airport Transfer" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">Airport Transfer</h3>
                  <p className="text-gray-400 text-xs font-medium mb-5 leading-relaxed">On-time airport pickup & drop</p>
                  <button 
                    onClick={() => {
                      setTripType(TRIP_TYPES.AIRPORT);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center transition-colors mt-auto group-hover:translate-x-1 duration-200"
                  >
                    Book Now →
                  </button>
                </div>

                {/* Card 4: Local Rental */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center group">
                  <div className="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src={serviceLocal} alt="Local Rental" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">Local Rental</h3>
                  <p className="text-gray-400 text-xs font-medium mb-5 leading-relaxed">Hourly / Daily local taxi rentals</p>
                  <button 
                    onClick={() => {
                      setTripType(TRIP_TYPES.LOCAL);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center transition-colors mt-auto group-hover:translate-x-1 duration-200"
                  >
                    Book Now →
                  </button>
                </div>

                {/* Card 5: Tour Packages */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center group">
                  <div className="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src={serviceTour} alt="Tour Packages" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">Tour Packages</h3>
                  <p className="text-gray-400 text-xs font-medium mb-5 leading-relaxed">Outstation & Tour packages</p>
                  <button 
                    onClick={() => {
                      setTripType(TRIP_TYPES.ROUND_TRIP);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center transition-colors mt-auto group-hover:translate-x-1 duration-200"
                  >
                    Book Now →
                  </button>
                </div>
              </div>

              {/* Right Carousel Arrow */}
              <button 
                type="button"
                onClick={() => {
                  const el = document.getElementById('services-grid-container');
                  if (el) el.scrollBy({ left: 240, behavior: 'smooth' });
                }}
                className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all z-10 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* 2. Fleet Section */}
        <section className="py-16 bg-[#f8f9fa] border-t border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#00a859]">Our Fleet</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-3">Wide Range of Clean & Comfortable Cars</h2>
              <p className="text-gray-500 font-medium text-sm">Choose your perfect ride</p>
            </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 xl:gap-6 mb-10">
                {fleetCards.map((car, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => {
                      setSelectedVehicle(car.title === "Maruti Swift" ? "Maruti Swift" : (car.title === "Maruti Dzire" ? "Swift Dzire" : car.title));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer"
                  >
                    <div className="h-[120px] w-full bg-slate-50 flex items-center justify-center p-4 relative">
                      <img src={car.image} alt={car.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm md:text-base font-black text-gray-950 mb-0.5 leading-tight">{car.title}</h3>
                        <p className="text-[10px] text-blue-600 font-semibold mb-2 leading-tight">{car.subtitle.split('(')[0]}</p>
                        
                        {/* Specs */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          <span className="bg-gray-100 text-gray-500 text-[9px] font-extrabold px-2 py-0.5 rounded">{car.seating}</span>
                          <span className="bg-gray-100 text-gray-500 text-[9px] font-extrabold px-2 py-0.5 rounded">{car.ac}</span>
                          <span className="bg-gray-100 text-gray-500 text-[9px] font-extrabold px-2 py-0.5 rounded">{car.luggage}</span>
                        </div>
                      </div>

                      <div className="border-t border-gray-50 pt-2.5 mt-2">
                        {/* Plain & Hill Rate Inline */}
                        <div className="flex flex-col space-y-1">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Plain</span>
                            <span className="text-[#00a859] font-black">{car.plainRate}</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Hill</span>
                            <span className="text-blue-600 font-black">{car.hillRate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">Driver Allowance Extra | Toll Tax Extra | State Tax Extra</p>
              </div>
            </div>
          </section>

          {/* 3. Popular Routes Section */}
          <section className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                  <span className="text-xs font-black uppercase tracking-widest text-[#00a859]">Popular Routes</span>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Most Booked Routes</h2>
                  <p className="text-gray-500 font-medium text-sm mt-2">Select your destination and book instantly with our premium taxi services.</p>
                </div>
                <Link 
                  to="/routes" 
                  className="self-center md:self-auto bg-blue-50 hover:bg-blue-100 text-[#1e3b8a] font-bold px-6 py-3 rounded-full text-xs flex items-center transition-colors shadow-sm"
                >
                  View All Routes <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
              
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${cityRouteConfig.routeCards.length >= 5 ? 'lg:grid-cols-5' : (cityRouteConfig.routeCards.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')} gap-6`}>
                {cityRouteConfig.routeCards.map((card, idx) => {
                  const imgFile = routeImages[card.image] || routeImages.default;
                  
                  return (
                    <div 
                      key={idx} 
                      onClick={() => {
                        setPopupPreFill({
                          pickup: cityRouteConfig.city,
                          drop: card.destination,
                          routeName: card.title
                        });
                        setIsLeadFormOpen(true);
                      }}
                      className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer"
                    >
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
                        <h3 className="text-lg font-black text-gray-900 mb-4 leading-tight">{card.title}</h3>

                        <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
                          <span className="bg-blue-50 text-blue-600 text-xs font-black px-2.5 py-1 rounded-full">One Way</span>
                          <div className="text-right">
                            <span className="text-[#00a859] font-black text-xl">{card.pricing.split('|')[0].replace('Sedan: ', '').trim()}</span>
                            <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">Starting Price</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 4. Customer Reviews Section */}
          <section className="py-16 bg-[#f8f9fa] border-t border-gray-100">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="text-center mb-12">
                <span className="text-xs font-black uppercase tracking-widest text-[#00a859]">What Our Customers Say</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-3">Happy Customers, Happy Us</h2>
                <p className="text-gray-500 font-medium text-sm">Real feedback from our regular travelers</p>
              </div>

              <div className="relative group/carousel px-4">
                {/* Left Testimonial Arrow */}
                <button 
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('reviews-grid-container');
                    if (el) el.scrollBy({ left: -280, behavior: 'smooth' });
                  }}
                  className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all z-10 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div id="reviews-grid-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-x-visible scrollbar-hide">
                {/* Review 1 */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm italic leading-relaxed mb-6">
                      "Excellent service! Driver was on time, polite and the car was well maintained."
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-auto">
                    <img src={user1} alt="Rahul Sharma" className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm" />
                    <div>
                      <h4 className="text-sm font-extrabold text-gray-900">Rahul Sharma</h4>
                      <p className="text-[11px] text-gray-400 font-medium">New Delhi</p>
                    </div>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm italic leading-relaxed mb-6">
                      "Booked for Delhi to Haridwar trip. Very comfortable journey at best price."
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-auto">
                    <img src={user2} alt="Priya Verma" className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm" />
                    <div>
                      <h4 className="text-sm font-extrabold text-gray-900">Priya Verma</h4>
                      <p className="text-[11px] text-gray-400 font-medium">Gurgaon</p>
                    </div>
                  </div>
                </div>

                {/* Review 3 */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm italic leading-relaxed mb-6">
                      "Very quick response on WhatsApp and smooth booking experience."
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-auto">
                    <img src={user3} alt="Amit Singh" className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm" />
                    <div>
                      <h4 className="text-sm font-extrabold text-gray-900">Amit Singh</h4>
                      <p className="text-[11px] text-gray-400 font-medium">Noida</p>
                    </div>
                  </div>
                </div>

                {/* Review 4 */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm italic leading-relaxed mb-6">
                      "Best taxi service I have ever used. Highly recommended for outstation trips."
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-auto">
                    <img src={user1} alt="Neha Kapoor" className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm" />
                    <div>
                      <h4 className="text-sm font-extrabold text-gray-900">Neha Kapoor</h4>
                      <p className="text-[11px] text-gray-400 font-medium">Faridabad</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Testimonial Arrow */}
              <button 
                type="button"
                onClick={() => {
                  const el = document.getElementById('reviews-grid-container');
                  if (el) el.scrollBy({ left: 280, behavior: 'smooth' });
                }}
                className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all z-10 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

          {/* 5. Bottom booking CTA strip */}
          <section className="py-12 bg-white">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-[#0B132B] text-white rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-6 z-10">
                  <div className="w-48 h-auto hidden md:block flex-shrink-0">
                    <img src={ctaCar} alt="Book cab" className="w-full h-auto object-contain" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-black mb-2 leading-tight">Book your ride in just 2 clicks</h3>
                    <p className="text-gray-300 font-semibold text-sm md:text-base">Get instant confirmation via WhatsApp</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full sm:w-auto">
                  <a 
                    href={`tel:${currentLocation.phone}`}
                    className="bg-white hover:bg-gray-100 text-[#0B132B] font-bold px-8 py-3.5 rounded-full flex items-center justify-center shadow-lg transition-all text-sm w-full sm:w-auto text-center"
                  >
                    <Phone className="w-4 h-4 mr-2 fill-current" /> Call Now
                  </a>
                  <a 
                    href={`https://wa.me/${currentLocation.whatsapp}?text=` + encodeURIComponent("Hi Urgent Taxis, I want to book a taxi from " + currentLocation.city + ". Please confirm availability.")}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#00a859] hover:bg-[#00904d] text-white font-bold px-8 py-3.5 rounded-full flex items-center justify-center shadow-lg transition-all text-sm w-full sm:w-auto text-center"
                  >
                    <MessageCircle className="w-4.5 h-4.5 mr-2 fill-current" /> Book on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Welcome Section (SEO Content) */}
          <section className="py-16 bg-white text-center border-t border-gray-50">
            <div className="max-w-[800px] mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Welcome to Urgent Taxis - {cityRouteConfig.city} Taxi | Taxi Service</h2>
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

          {/* 7. Frequently Asked Questions */}
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

          {/* 8. Related Routes Link Bar */}
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

      {/* Fare Calculation Result Modal Overlay */}
      {showFareBreakup && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-200">
          <div className="relative bg-white w-full h-full md:w-[90vw] md:h-[90vh] md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Close Button */}
            <div className="absolute top-4 right-4 z-[101]">
              <button
                type="button"
                onClick={() => setShowFareBreakup(false)}
                className="bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-all cursor-pointer active:scale-95 flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
