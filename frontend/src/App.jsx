import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Calendar, Clock, Car, ChevronDown,
  Zap, Tag, Headphones, Users, ShieldCheck, ArrowRight, 
  ChevronRight, ChevronLeft, Star, CheckCircle2, Menu, X, ArrowLeftRight
} from 'lucide-react';

// Import images statically
import heroBg from './assets/images/hero-bg.png';
import logoImg from './assets/images/logo.jpg';
import heroCar from './assets/images/car-innova.png';
import ctaCarPremium from './assets/images/cta-car-premium.png';

import carDzire from './assets/images/car-dzire.png';
import carErtiga from './assets/images/car-ertiga.png';
import carInnova from './assets/images/car-innova.png';
import carCrysta from './assets/images/car-crysta.png';
import carTraveller from './assets/images/car-traveller.png';

import routeHaridwar from './assets/images/route-haridwar.png';
import routeDehradun from './assets/images/route-dehradun.png';
import routeHaldwani from './assets/images/route-haldwani.png';
import routeRishikesh from './assets/images/route-rishikesh.png';
import routeShimla from './assets/images/route-shimla.png';

import user1 from './assets/images/user1.jpg';
import user2 from './assets/images/user2.jpg';
import user3 from './assets/images/user3.jpg';

import { googleReviews } from './data/googleReviews';

import serviceOneWay from './assets/images/service-oneway.png';
import serviceRoundTrip from './assets/images/service-roundtrip.png';
import serviceAirport from './assets/images/service-airport.png';
import serviceLocal from './assets/images/service-local.png';
import serviceTour from './assets/images/service-tour.png';

const WHATSAPP_NUMBER = '918595066033';
const CALL_NUMBER = '+917310651940';

// Social Icons
const FacebookIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const InstagramIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const TwitterIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>;
const YoutubeIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;

// APPROVED ASSET LOCKS (DO NOT MODIFY OR REPLACE)
export const servicesAssets = {
  oneWay: <img src={serviceOneWay} alt="One Way Taxi" className="w-full h-full object-contain mix-blend-multiply" />,
  roundTrip: <img src={serviceRoundTrip} alt="Round Trip Taxi" className="w-full h-full object-contain mix-blend-multiply" />,
  airport: <img src={serviceAirport} alt="Airport Transfer" className="w-full h-full object-contain mix-blend-multiply" />,
  local: <img src={serviceLocal} alt="Local Rental" className="w-full h-full object-contain mix-blend-multiply" />,
  tour: <img src={serviceTour} alt="Tour Packages" className="w-full h-full object-contain mix-blend-multiply" />
};

export const fleetAssets = {
  dzire: carDzire,
  ertiga: carErtiga,
  innova: carInnova,
  crysta: carCrysta,
  traveller: carTraveller
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vehicle, setVehicle] = useState('Select cab type');

  // Testimonial Slider State
  const [testiSlide, setTestiSlide] = useState(0);
  const [testiVisible, setTestiVisible] = useState(4);
  const [testiPaused, setTestiPaused] = useState(false);

  // googleReviews imported from data/googleReviews.js

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setTestiVisible(1);
      else if (window.innerWidth < 1024) setTestiVisible(2);
      else setTestiVisible(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxTestiSlide = Math.max(0, googleReviews.length - testiVisible);

  useEffect(() => {
    if (testiPaused) return;
    const timer = setInterval(() => {
      setTestiSlide(prev => (prev >= maxTestiSlide ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [testiPaused, maxTestiSlide]);

  const handleTestiNext = () => setTestiSlide(prev => (prev >= maxTestiSlide ? 0 : prev + 1));
  const handleTestiPrev = () => setTestiSlide(prev => (prev <= 0 ? maxTestiSlide : prev - 1));

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    const text = `Hello Urgent Taxis, I need a ride:
- Pickup: ${pickup}
- Drop: ${drop}
- Date: ${date}
- Time: ${time}
- Vehicle: ${vehicle}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSimpleWhatsApp = (message) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const swapLocations = () => {
    const temp = pickup;
    setPickup(drop);
    setDrop(temp);
  };

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      
      {/* 1. Top Bar */}
      <div className="bg-[#f8f9fa] border-b border-gray-100 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-4 h-10 flex justify-between items-center text-[12px] font-medium text-gray-500">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-gray-800 font-bold">
              <div className="w-2 h-2 bg-[#00a859] rounded-full mr-2"></div> 
              24/7 Customer Support
            </span>
            <span className="flex items-center text-gray-500 font-medium">
              <svg className="w-3.5 h-3.5 mr-2 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8Z" /></svg>
              We are always here to help you!
            </span>
          </div>
          <div className="flex items-center space-x-5">
            <a href="mailto:info@urgenttaxis.com" className="flex items-center hover:text-blue-600 text-gray-600 font-medium">
              <Mail className="w-4 h-4 mr-2 opacity-70" /> info@urgenttaxis.com
            </a>
            <div className="h-4 w-[1px] bg-gray-200"></div>
            <div className="flex items-center space-x-3">
              <a href="#" className="hover:opacity-80"><FacebookIcon className="w-4 h-4 text-[#1877F2]" /></a>
              <a href="#" className="hover:opacity-80"><InstagramIcon className="w-4 h-4 text-[#E1306C]" /></a>
              <a href="#" className="hover:opacity-80"><TwitterIcon className="w-4 h-4 text-[#1DA1F2]" /></a>
              <a href="#" className="hover:opacity-80"><YoutubeIcon className="w-4 h-4 text-[#FF0000]" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <header className="bg-white sticky top-0 z-50 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 h-[85px] flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 cursor-pointer">
            <img src={logoImg} alt="Urgent Taxis" className="h-[55px] md:h-[65px] w-auto mix-blend-multiply" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8 items-center h-full ml-12">
            <div className="h-full flex flex-col justify-center relative">
              <a href="#" className="text-[#3b82f6] font-bold text-[14px]">Home</a>
              <div className="absolute bottom-[24px] left-0 w-full h-[2px] bg-[#3b82f6]"></div>
            </div>
            <a href="#" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] flex items-center transition-colors">Services <ChevronDown className="w-4 h-4 ml-1 text-gray-400" /></a>
            <a href="#" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">Routes</a>
            <a href="#" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">Fleet</a>
            <a href="#" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">About Us</a>
            <a href="#" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">Contact Us</a>
          </nav>

          {/* Spacer */}
          <div className="flex-1 hidden lg:block"></div>

          {/* Phone & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center">
              <div className="bg-[#1e3a8a] text-white p-2 rounded-full mr-3 shadow-sm">
                <Phone className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <a href={`tel:${CALL_NUMBER}`} className="font-black text-[18px] text-[#1e3a8a] leading-tight tracking-wide">73106 51940</a>
                <span className="text-[11px] font-medium text-gray-400 leading-tight">Call Us Anytime</span>
              </div>
            </div>
            <button 
              onClick={() => handleSimpleWhatsApp('Hi, I need a taxi.')}
              className="bg-[#00a859] hover:bg-[#00904d] text-white px-5 py-2.5 rounded-full font-bold flex items-center shadow-lg transition-all text-[14px]"
            >
              <svg className="w-[18px] h-[18px] mr-1.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.888-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              WhatsApp
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600">
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white px-4 pt-2 pb-6 border-b border-gray-100 shadow-sm absolute w-full z-40">
           <a href="#" className="block py-3 text-blue-600 font-bold border-b border-gray-50">Home</a>
           <a href="#" className="block py-3 text-gray-700 font-bold border-b border-gray-50">Services</a>
           <a href="#" className="block py-3 text-gray-700 font-bold border-b border-gray-50">Routes</a>
           <a href="#" className="block py-3 text-gray-700 font-bold border-b border-gray-50">Fleet</a>
           <a href="#" className="block py-3 text-gray-700 font-bold border-b border-gray-50">About Us</a>
           <a href="#" className="block py-3 text-gray-700 font-bold">Contact Us</a>
        </div>
      )}

      {/* 3. Hero Section */}
      <section className="relative w-full pt-8 pb-[100px] lg:pb-[140px] bg-[#f5f8ff] overflow-visible z-10">
        
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src={heroBg} alt="City BG" className="w-full h-full object-cover opacity-[0.4]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>
        
        {/* Curved Bottom White Shape */}
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-[60px] md:h-[120px] z-20">
          <path d="M0 0 L0 120 L1440 120 L1440 0 Q720 150 0 0 Z" fill="#ffffff" />
        </svg>

        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          
          {/* Car Image - Mathematically positioned to sit perfectly in the gap without overlapping */}
          <div className="hidden lg:block absolute left-[52%] -translate-x-1/2 ml-[-80px] bottom-[-90px] w-[420px] xl:w-[490px] z-20 pointer-events-none opacity-90 xl:opacity-100">
             <img src={heroCar} alt="Toyota Innova" className="w-full h-auto object-contain" />
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 lg:gap-0 relative z-10">
            
            {/* Left Col */}
            <div className="w-full lg:w-[52%] lg:-ml-10 xl:-ml-[50px] pt-6 flex flex-col">
              <h1 className="text-[36px] md:text-[44px] lg:text-[52px] xl:text-[56px] font-black text-[#0f172a] leading-[1.1] mb-4 tracking-tight">
                Book Trusted <br/><span className="text-[#1e3b8a]">Taxi</span> in Seconds
              </h1>
              
              <p className="text-[15px] md:text-[18px] lg:text-[20px] text-gray-600 font-medium mb-10">
                One Way <span className="mx-1.5 md:mx-2 font-light">|</span> Round Trip <span className="mx-1.5 md:mx-2 font-light">|</span> Airport Transfers
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
            <div className="w-full lg:w-[410px] relative z-40 mt-4 lg:mt-0 lg:ml-auto">
              <div className="bg-white rounded-[24px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100">
                
                <div className="bg-[#1e3b8a] px-6 py-6 text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-[24px] font-bold text-white mb-1 tracking-wide">Book Your Ride</h2>
                    <p className="text-blue-100 text-[12px] font-medium">Get Instant Price & Book Your Taxi</p>
                  </div>
                </div>
                
                <form className="p-6 space-y-4" onSubmit={handleWhatsAppBooking}>
                  {/* Locations with Swap Icon */}
                  <div className="relative">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[12px] font-bold text-gray-800 mb-1.5 ml-1">Pickup Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-[12px] w-[18px] h-[18px] text-[#00a859]" />
                          <input 
                            type="text" 
                            placeholder="Enter pickup location" 
                            value={pickup} onChange={(e) => setPickup(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 transition-colors bg-white text-gray-800"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[12px] font-bold text-gray-800 mb-1.5 ml-1">Drop Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-[13px] w-[18px] h-[18px] text-red-500" />
                          <input 
                            type="text" 
                            placeholder="Enter drop location" 
                            value={drop} onChange={(e) => setDrop(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 transition-colors bg-white text-gray-800"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      type="button" 
                      onClick={swapLocations}
                      className="absolute right-4 top-[50%] -translate-y-1/2 bg-white border border-gray-200 shadow-md rounded-full p-2 z-10 hover:bg-gray-50 transition-colors"
                    >
                      <ArrowLeftRight className="w-[18px] h-[18px] text-[#1e3b8a] rotate-90" />
                    </button>
                  </div>

                  {/* Date & Time */}
                  <div>
                    <label className="block text-[12px] font-bold text-gray-800 mb-1.5 ml-1">Date & Time</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-[13px] w-[18px] h-[18px] text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Select date"
                          onFocus={(e) => e.target.type = 'date'}
                          onBlur={(e) => e.target.value === '' ? e.target.type = 'text' : null}
                          value={date} onChange={(e) => setDate(e.target.value)}
                          className="w-full pl-10 pr-9 py-3 border border-gray-200 rounded-lg text-[13px] text-gray-600 outline-none focus:border-blue-500 bg-white"
                          required
                        />
                        <ChevronDown className="absolute right-3.5 top-[13px] w-[16px] h-[16px] text-gray-400 pointer-events-none" />
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-[13px] w-[18px] h-[18px] text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Select time"
                          onFocus={(e) => e.target.type = 'time'}
                          onBlur={(e) => e.target.value === '' ? e.target.type = 'text' : null}
                          value={time} onChange={(e) => setTime(e.target.value)}
                          className="w-full pl-10 pr-9 py-3 border border-gray-200 rounded-lg text-[13px] text-gray-600 outline-none focus:border-blue-500 bg-white"
                          required
                        />
                        <ChevronDown className="absolute right-3.5 top-[13px] w-[16px] h-[16px] text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle */}
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5 ml-1">Select Vehicle</label>
                    <div className="relative">
                      <Car className="absolute left-3.5 top-[13px] w-[18px] h-[18px] text-gray-400" />
                      <select 
                        value={vehicle} onChange={(e) => setVehicle(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-[14px] text-gray-700 outline-none focus:border-blue-500 appearance-none bg-white"
                      >
                        <option value="Select cab type">Select cab type</option>
                        <option value="Swift Dzire">Swift Dzire (4 Seater)</option>
                        <option value="Maruti Ertiga">Maruti Ertiga (6 Seater)</option>
                        <option value="Toyota Innova">Toyota Innova (6 Seater)</option>
                        <option value="Innova Crysta">Innova Crysta (6 Seater)</option>
                        <option value="Tempo Traveller">Tempo Traveller (12 Seater)</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-[13px] w-[18px] h-[18px] text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#0aa63f] hover:bg-[#088c34] text-white font-bold py-3.5 rounded-[10px] flex items-center justify-center transition-colors mt-6 text-[15px] shadow-md shadow-[#0aa63f]/20"
                  >
                    Check Fare <ArrowRight className="w-5 h-5 ml-2" />
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

      {/* 4. Stats Section (Floating Pill overlapping Hero) */}
      <section className="relative z-30 max-w-[1150px] mx-auto px-4 lg:px-0 -mt-[100px] lg:-mt-[110px] mb-24">
        <div className="bg-white rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] py-6 px-4 md:px-10 grid grid-cols-2 gap-y-8 lg:flex lg:flex-nowrap justify-between items-center border border-gray-50">
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start text-center sm:text-left">
            <div className="bg-[#1e3b8a] text-white p-3.5 rounded-full sm:mr-4 shrink-0 shadow-sm mb-2 sm:mb-0"><Users className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px]" /></div>
            <div>
              <h3 className="font-bold text-[15px] sm:text-[17px] text-[#1e3b8a] leading-tight">10,000+</h3>
              <p className="text-[11px] sm:text-[13px] font-bold text-gray-800 leading-snug">Happy Customers</p>
              <p className="text-[9px] sm:text-[11px] font-medium text-gray-400">and counting</p>
            </div>
          </div>
          
          <div className="hidden lg:block w-[1px] h-12 bg-gray-200"></div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:pl-6 text-center sm:text-left">
            <div className="sm:mr-4 shrink-0 mb-2 sm:mb-0">
              <svg viewBox="0 0 24 24" className="w-[42px] h-[42px] sm:w-14 sm:h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" fill="#00a859"/>
                <path d="M10.5 16l-4.5-4.5 1.41-1.41L10.5 13.17l6.59-6.59L18.5 8l-8 8z" fill="#ffffff"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-[15px] sm:text-[17px] text-[#1e3b8a] leading-tight">Verified</h3>
              <p className="text-[11px] sm:text-[13px] font-bold text-gray-800 leading-snug">Drivers</p>
              <p className="text-[9px] sm:text-[11px] font-medium text-gray-400">Background verified</p>
            </div>
          </div>
          
          <div className="hidden lg:block w-[1px] h-12 bg-gray-200"></div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:pl-6 text-center sm:text-left">
            <div className="bg-[#1e3b8a] text-white w-[42px] h-[42px] sm:w-[52px] sm:h-[52px] rounded-full sm:mr-4 shrink-0 flex items-center justify-center font-serif font-bold text-[22px] sm:text-[28px] shadow-sm relative mb-2 sm:mb-0">
              <div className="absolute -top-[5px] sm:-top-[6px] left-[50%] -translate-x-[50%] w-[2px] h-2 bg-gray-300"></div>
              ₹
            </div>
            <div>
              <h3 className="font-bold text-[15px] sm:text-[17px] text-[#1e3b8a] leading-tight">No Hidden</h3>
              <p className="text-[11px] sm:text-[13px] font-bold text-gray-800 leading-snug">Charges</p>
              <p className="text-[9px] sm:text-[11px] font-medium text-gray-400">100% Transparent</p>
            </div>
          </div>

          <div className="hidden lg:block w-[1px] h-12 bg-gray-200"></div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end lg:pr-2 text-center sm:text-left">
            <div className="sm:mr-4 shrink-0 mb-2 sm:mb-0">
               <svg viewBox="0 0 24 24" className="w-[42px] h-[42px] sm:w-[52px] sm:h-[52px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <circle cx="12" cy="12" r="11" fill="#ffffff" />
                 <circle cx="12" cy="12" r="8" fill="none" stroke="#00a859" strokeWidth="2" />
                 <path d="M12 1V4 M12 20V23 M1 12H4 M20 12H23" stroke="#00a859" strokeWidth="2" strokeLinecap="round" />
                 <path d="M20 12 L17 9 M20 12 L23 9" stroke="#00a859" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                 <text x="12" y="15.5" fontSize="10" fontWeight="900" fill="#00a859" textAnchor="middle" style={{ fontFamily: 'Poppins, sans-serif' }}>24</text>
               </svg>
            </div>
            <div>
              <h3 className="font-bold text-[15px] sm:text-[17px] text-[#1e3b8a] leading-tight">24/7</h3>
              <p className="text-[11px] sm:text-[13px] font-bold text-gray-800 leading-snug">Support</p>
              <p className="text-[9px] sm:text-[11px] font-medium text-gray-400">We're here anytime</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Services Section */}
      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-4 text-center relative">
          <p className="text-[#00a859] font-black text-[10px] tracking-[0.2em] uppercase mb-1">WHAT WE OFFER</p>
          <h2 className="text-[32px] font-black text-gray-900 mb-2 leading-tight">Our Taxi Services</h2>
          <p className="text-[14px] text-gray-500 font-medium mb-8">Choose from a wide range of taxi services made just for you</p>
          
          {/* Slider Arrows Outside Grid */}
          <button className="hidden lg:flex absolute -left-6 top-[55%] -translate-y-1/2 bg-white border border-gray-100 rounded-full p-3 shadow-md text-gray-400 hover:text-blue-600 transition-colors z-10"><ChevronLeft className="w-6 h-6" /></button>
          <button className="hidden lg:flex absolute -right-6 top-[55%] -translate-y-1/2 bg-white border border-gray-100 rounded-full p-3 shadow-md text-gray-400 hover:text-blue-600 transition-colors z-10"><ChevronRight className="w-6 h-6" /></button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { title: 'One Way Taxi', desc: 'Affordable one way drops at best prices', svg: servicesAssets.oneWay },
              { title: 'Round Trip Taxi', desc: 'Round trips with flexible packages', svg: servicesAssets.roundTrip },
              { title: 'Airport Transfer', desc: 'On-time airport pickup & drop', svg: servicesAssets.airport },
              { title: 'Local Rental', desc: 'Hourly / Daily local taxi rentals', svg: servicesAssets.local },
              { title: 'Tour Packages', desc: 'Outstation & Tour packages', svg: servicesAssets.tour }
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center justify-between h-[270px]">
                <div className="w-[120px] h-[100px] flex items-center justify-center mt-2">{service.svg}</div>
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-[16px] text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-[12px] text-gray-500 font-medium mb-4 leading-relaxed px-1">{service.desc}</p>
                </div>
                <div className="text-blue-600 font-bold text-[13px] flex items-center group-hover:text-blue-800 transition-colors mb-2">
                  Book Now <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Fleet Section */}
      <section className="py-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <p className="text-[#00a859] font-black text-[10px] tracking-[0.2em] uppercase mb-1">OUR FLEET</p>
          <h2 className="text-[32px] font-black text-gray-900 mb-2 leading-tight">Wide Range of Clean & Comfortable Cars</h2>
          <p className="text-[14px] text-gray-500 font-medium mb-8">Choose your perfect ride</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
            {[
              { name: 'Swift Dzire', seats: 4, ac: 'AC', bags: '1 Bag', price: '9', img: fleetAssets.dzire },
              { name: 'Maruti Ertiga', seats: 6, ac: 'AC', bags: '2 Bag', price: '12', img: fleetAssets.ertiga },
              { name: 'Toyota Innova', seats: 6, ac: 'AC', bags: '2 Bag', price: '15', img: fleetAssets.innova },
              { name: 'Innova Crysta', seats: 6, ac: 'AC', bags: '3 Bag', price: '18', img: fleetAssets.crysta },
              { name: 'Tempo Traveller', seats: 12, ac: 'AC', bags: '5 Bag', price: '22', img: fleetAssets.traveller },
            ].map((car, idx) => (
              <div key={idx} className="bg-white rounded-[16px] border border-gray-100 p-4 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col h-[240px]">
                <div className="h-[95px] flex items-end justify-center mb-3">
                  <img src={car.img} alt={car.name} className="w-full h-full object-contain drop-shadow-sm" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[15px] text-gray-900 mb-2">{car.name}</h3>
                    <div className="flex justify-center items-center space-x-2 text-[10px] font-bold text-gray-400 mb-2 pb-2 border-b border-gray-50">
                      <span className="flex items-center"><Users className="w-3 h-3 mr-0.5" /> {car.seats} Seater</span>
                      <span className="flex items-center"><Zap className="w-3 h-3 mr-0.5" /> {car.ac}</span>
                      <span className="flex items-center"><Car className="w-3 h-3 mr-0.5" /> {car.bags}</span>
                    </div>
                  </div>
                  <div className="text-left mt-auto pt-1">
                    <span className="text-[20px] font-black text-[#00a859]">₹{car.price}</span> 
                    <span className="text-[11px] font-bold text-gray-600"> /km</span> 
                    <span className="text-[10px] text-gray-400 font-medium ml-1">Outstation</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-[11px] font-bold text-gray-600">
            Driver Allowance Extra <span className="mx-2 text-gray-300">|</span> Toll Tax Extra <span className="mx-2 text-gray-300">|</span> State Tax Extra
          </p>
        </div>
      </section>

      {/* 7. Popular Routes */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-gray-200 pb-3">
            <div>
              <p className="text-[#00a859] font-black text-[10px] tracking-[0.2em] uppercase mb-1">POPULAR ROUTES</p>
              <h2 className="text-[30px] font-black text-gray-900 leading-tight">Most Booked Routes</h2>
            </div>
            <button className="hidden md:flex items-center text-blue-600 font-bold border border-blue-200 bg-white rounded-full px-5 py-2 hover:border-blue-600 transition-colors shadow-sm text-sm">
              View All Routes <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { to: 'Delhi to Haridwar', price: '4,499', img: routeHaridwar },
              { to: 'Delhi to Dehradun', price: '5,499', img: routeDehradun },
              { to: 'Delhi to Haldwani', price: '6,999', img: routeHaldwani },
              { to: 'Delhi to Rishikesh', price: '4,799', img: routeRishikesh },
              { to: 'Delhi to Shimla', price: '7,999', img: routeShimla },
            ].map((route, idx) => (
              <div key={idx} className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-[225px]">
                <img src={route.img} alt={route.to} className="w-full h-[105px] object-cover" />
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[14px] text-gray-900 mb-1">{route.to}</h3>
                    <p className="text-[10px] font-bold text-gray-400 mb-2">One Way</p>
                  </div>
                  
                  <div className="flex justify-between items-end pt-2.5 border-t border-gray-50 mt-auto">
                    <span className="flex items-center text-[10px] font-bold text-[#00a859]">
                      <div className="w-[5px] h-[5px] bg-[#00a859] rounded-full mr-1.5"></div>
                      One Way
                    </span>
                    <div className="text-right">
                      <div className="font-black text-[18px] text-gray-900 leading-none mb-1">₹{route.price}</div>
                      <div className="text-[9px] font-bold text-gray-500 uppercase">Starting Price</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-8 bg-white relative">
        <div className="max-w-[1200px] mx-auto px-4 text-center relative">
          <p className="text-[#00a859] font-black text-[10px] tracking-[0.2em] uppercase mb-1">WHAT OUR CUSTOMERS SAY</p>
          <h2 className="text-[30px] font-black text-gray-900 mb-4 leading-tight">Happy Customers, Happy Us</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4 mb-8">
            <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2.5 rounded-full border border-gray-100">
              <span className="text-[#fbbf24] text-lg leading-none">★</span>
              <span className="font-bold text-gray-900 text-sm">4.9/5 Google Rating</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500 text-[13px] font-medium">Based on 88 Google reviews</span>
            </div>
            
            <div className="flex space-x-3">
              <a href="https://g.page/r/CWwcpluhBRROEBM/review" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[13px] px-5 py-2.5 rounded-full transition-colors shadow-sm">
                Write a Review
              </a>
              <a href="https://g.page/r/CWwcpluhBRROEBM" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-bold text-[13px] px-5 py-2.5 rounded-full transition-colors shadow-sm">
                View All Reviews
              </a>
            </div>
          </div>

          {googleReviews.length === 0 ? null : (
            <>
              <button onClick={handleTestiPrev} className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 bg-white border border-gray-100 rounded-full p-3 shadow-md text-gray-400 hover:text-blue-600 transition-colors z-10"><ChevronLeft className="w-6 h-6" /></button>
              
              <div 
                className="overflow-hidden px-2 py-4 -mx-2"
                onMouseEnter={() => setTestiPaused(true)}
                onMouseLeave={() => setTestiPaused(false)}
                onTouchStart={() => setTestiPaused(true)}
                onTouchEnd={() => setTestiPaused(false)}
              >
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${testiSlide * (100 / testiVisible)}%)` }}
                >
                  {googleReviews.map((review, idx) => (
                    <div key={idx} className="flex-shrink-0 px-2" style={{ width: `${100 / testiVisible}%` }}>
                      <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[16px] p-4 text-left hover:shadow-lg transition-shadow flex flex-col h-[200px] justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex text-[#fbbf24] space-x-1">
                              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                            </div>
                          </div>
                          <p className="text-gray-600 text-[13px] font-medium leading-[1.6] mb-3">{review.text}</p>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                          <div className="flex items-center">
                            <img src={review.img} alt={review.name} className="w-[36px] h-[36px] rounded-full object-cover mr-3" />
                            <div>
                              <h4 className="font-bold text-[13px] text-gray-900 leading-tight">{review.name}</h4>
                              <p className="text-[10px] font-semibold text-gray-500">{review.loc}</p>
                            </div>
                          </div>
                          <div className="flex-shrink-0" title="Google Review">
                            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleTestiNext} className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 bg-white border border-gray-100 rounded-full p-3 shadow-md text-gray-400 hover:text-blue-600 transition-colors z-10"><ChevronRight className="w-6 h-6" /></button>
            </>
          )}
        </div>
      </section>

      {/* 9. CTA Banner */}
      <section className="max-w-[1200px] mx-auto px-4 pb-5">
        <div className="bg-[#1e3a8a] rounded-[24px] h-auto lg:h-[120px] px-8 py-6 lg:py-0 flex flex-col lg:flex-row items-center justify-between shadow-xl mt-4" style={{ position: 'relative', overflow: 'hidden' }}>
          
          {/* Car Image Wrapper */}
          <div className="hidden lg:block pointer-events-none animate-premium-shine" style={{ position: 'absolute', left: '32px', bottom: '-6px', width: '280px', zIndex: 2 }}>
             <img src={ctaCarPremium} alt="Premium SUV" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.25))' }} />
          </div>

          {/* Text Content */}
          <div className="z-20 text-center lg:ml-[330px] lg:text-left flex-1 mb-5 lg:mb-0">
             <h2 className="text-[22px] md:text-[26px] font-black text-white leading-tight mb-1">Book your ride in just 2 clicks</h2>
             <p className="text-[#a5b4fc] font-medium text-[14px]">Get instant confirmation via WhatsApp</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 z-20 shrink-0 lg:ml-auto">
            <a 
              href={`tel:${CALL_NUMBER}`}
              className="bg-white text-[#1e3a8a] px-5 py-2.5 rounded-xl font-bold flex items-center justify-center transition-colors shadow-md hover:bg-gray-50 text-[13px]"
            >
              <Phone className="w-[16px] h-[16px] mr-2 fill-[#1e3a8a]" /> Call Now
            </a>
            <button 
              onClick={() => handleSimpleWhatsApp('Hi, I want to book a ride.')}
              className="bg-[#00a859] hover:bg-[#00904d] text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center transition-colors shadow-md shadow-[#00a859]/30 text-[13px]"
            >
              <svg className="w-[16px] h-[16px] mr-2 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.888-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              Book on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-[#0B132B] text-gray-400 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 mb-16 items-start">
            
            {/* Col 1: Brand */}
            <div className="pr-0 lg:pr-6 h-full">
              <div className="mb-6">
                <img src={logoImg} alt="Urgent Taxis" className="h-[45px] w-auto rounded-md mix-blend-lighten" />
              </div>
              <p className="text-[14px] text-gray-400 mb-8 font-medium leading-[1.8]">
                Your reliable travel partner for outstation trips, local rentals and airport transfers across India.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="bg-[#1877F2] text-white p-2.5 rounded-full hover:opacity-80 transition"><FacebookIcon className="w-[15px] h-[15px]" /></a>
                <a href="#" className="bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white p-2.5 rounded-full hover:opacity-80 transition"><InstagramIcon className="w-[15px] h-[15px]" /></a>
                <a href="#" className="bg-[#1DA1F2] text-white p-2.5 rounded-full hover:opacity-80 transition"><TwitterIcon className="w-[15px] h-[15px]" /></a>
                <a href="#" className="bg-[#FF0000] text-white p-2.5 rounded-full hover:opacity-80 transition"><YoutubeIcon className="w-[15px] h-[15px]" /></a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Quick Links</h4>
              <ul className="space-y-4 text-[14px] font-medium">
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Our Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Our Fleet</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Popular Routes</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Contact Us</a></li>
              </ul>
            </div>

            {/* Col 3: Our Services */}
            <div>
              <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Our Services</h4>
              <ul className="space-y-4 text-[14px] font-medium">
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> One Way Taxi</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Round Trip Taxi</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Airport Transfer</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Local Rental</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Tour Packages</a></li>
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Top Routes</h4>
              <ul className="space-y-3.5 text-[14px] font-medium mb-8">
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Haridwar</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Dehradun</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Haldwani</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Rishikesh</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Shimla</a></li>
              </ul>
              
              <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Contact Us</h4>
              <ul className="space-y-4 text-[14px] font-medium">
                <li className="flex items-start">
                  <Phone className="w-[18px] h-[18px] mr-3 text-white flex-shrink-0 mt-0.5 fill-current" />
                  <a href={`tel:${CALL_NUMBER}`} className="text-white font-bold tracking-wide">73106 51940</a>
                </li>
                <li className="flex items-start">
                  <Mail className="w-[18px] h-[18px] mr-3 text-white flex-shrink-0 mt-0.5" />
                  <a href="mailto:info@urgenttaxis.com" className="text-white hover:opacity-80 transition-opacity">info@urgenttaxis.com</a>
                </li>
                <li className="flex items-start pr-4 sm:pr-0">
                  <MapPin className="w-[18px] h-[18px] mr-3 text-white flex-shrink-0 mt-1" />
                  <span className="text-white leading-relaxed text-[13px] sm:text-[14px] break-words">Shop No. 09, S. R. Complex, Railway Station Road, Masuri, Ghaziabad, Uttar Pradesh 201302</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center text-[13px] font-medium text-gray-500">
            <p className="mb-4 md:mb-0">© 2024 Urgent Taxis. All Rights Reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <span className="text-gray-700">|</span>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        <a 
          href={`tel:${CALL_NUMBER}`}
          className="bg-[#1e3a8a] hover:bg-[#152e73] text-white p-3 rounded-full shadow-2xl transition-transform transform hover:scale-110 flex items-center justify-center border-[3px] border-blue-100/50"
        >
          <Phone className="w-[20px] h-[20px] fill-current" />
        </a>
        <button 
          onClick={() => handleSimpleWhatsApp('Hi Urgent Taxis, I need some help.')}
          className="bg-[#00a859] hover:bg-[#00904d] text-white p-3 rounded-full shadow-2xl transition-transform transform hover:scale-110 flex items-center justify-center border-[3px] border-green-100/50"
        >
          <svg className="w-[24px] h-[24px] fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.888-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        </button>
      </div>
    </div>
  );
}
