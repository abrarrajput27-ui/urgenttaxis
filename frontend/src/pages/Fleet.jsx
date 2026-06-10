import React, { useEffect } from 'react';
import { getCurrentLocationConfig } from '../lib/location';
import { Phone, MessageCircle, Star, Shield, Award, Users } from 'lucide-react';
import ReactGA from 'react-ga4';

import carDzire from '../assets/images/car-dzire.png';
import carErtiga from '../assets/images/car-ertiga.png';
import carInnova from '../assets/images/car-innova.png';
import carCrysta from '../assets/images/car-crysta.png';
import carTraveller from '../assets/images/car-traveller.png';
import defaultRouteImg from '../assets/images/hero-bg.webp';

const fleetCards = [
  {
    title: "Maruti Swift",
    subtitle: "Hatchback or Similar (Swift, WagonR, i10)",
    image: carDzire,
    seating: "4 Seater",
    ac: "AC",
    luggage: "1 Bag",
    plainRate: "₹10/km",
    hillRate: "₹13/km",
    description: "Compact hatchback perfect for quick city trips and budget outstation travel."
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
    description: "Comfort sedan ideal for family trips, airport drops, and business commutes."
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
    description: "Spacious seven-seater family car for outstation tours and group travel."
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
    description: "Spacious and reliable multi-utility vehicle for all terrains and longer journeys."
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
    description: "Premium class luxury SUV offering unmatched comfort, safety, and suspension."
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
    description: "Large capacity premium force traveller for family events, tours, and large groups."
  }
];

export default function Fleet() {
  const currentLocation = getCurrentLocationConfig();
  const displayPhone = currentLocation.phone.replace('+91', '+91 ');

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/fleet" });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      {/* Hero Header */}
      <div className="bg-[#0B132B] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${defaultRouteImg})` }}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="bg-blue-600/30 text-blue-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/20">
            Comfort & Premium Travel
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-4">
            Our Taxi Fleet in {currentLocation.city}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-medium">
            Explore our range of well-maintained and clean vehicles. From economical hatchbacks to luxury SUVs, we have the perfect ride for your journey.
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mt-6"></div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 pt-12">
        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {fleetCards.map((car, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
              {/* Image */}
              <div className="h-[200px] w-full bg-gray-50/50 flex items-center justify-center p-6 relative">
                <img 
                  src={car.image} 
                  alt={car.title} 
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{car.title}</h3>
                  <p className="text-blue-600 text-xs font-semibold mb-4">{car.subtitle}</p>
                  
                  {/* Specs */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2.5 py-1 rounded-full">{car.seating}</span>
                    <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2.5 py-1 rounded-full">{car.ac}</span>
                    <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2.5 py-1 rounded-full">{car.luggage}</span>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">{car.description}</p>
                </div>

                <div>
                  {/* Pricing display */}
                  <div className="grid grid-cols-2 gap-2 mb-6 text-center text-xs font-bold">
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-2.5 text-blue-900">
                      <span className="block text-[10px] text-gray-400 uppercase font-semibold mb-0.5">Plain Rate</span>
                      {car.plainRate}
                    </div>
                    <div className="bg-green-50/50 border border-green-100 rounded-xl p-2.5 text-green-900">
                      <span className="block text-[10px] text-gray-400 uppercase font-semibold mb-0.5">Hill Rate</span>
                      {car.hillRate}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <a 
                      href={`tel:${currentLocation.phone}`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2.5 rounded-xl transition-colors text-center text-xs flex items-center justify-center shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5 mr-1" /> Call Now
                    </a>
                    <a 
                      href={`https://wa.me/${currentLocation.whatsapp}?text=` + encodeURIComponent("Hi Urgent Taxis, I am interested in booking the " + car.title + " from " + currentLocation.city + ". Please share details.")}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#00a859] hover:bg-[#00904d] text-white font-bold py-2.5 rounded-xl transition-colors text-center text-xs flex items-center justify-center shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Terms */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Terms & Conditions</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <ul className="space-y-3.5 text-gray-600 text-sm font-medium text-left max-w-xl mx-auto">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2.5 mt-2 flex-shrink-0"></span>
              <span>All fares are calculated on per-kilometer basis.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2.5 mt-2 flex-shrink-0"></span>
              <span>State tax, toll tax, and parking charges are extra as per actuals.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2.5 mt-2 flex-shrink-0"></span>
              <span>Driver allowance (DA) is applicable separately for outstation trips.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2.5 mt-2 flex-shrink-0"></span>
              <span>For hill routes, specialized mountain drivers are assigned.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
