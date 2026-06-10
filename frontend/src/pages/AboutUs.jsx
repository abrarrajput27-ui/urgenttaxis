import React, { useEffect } from 'react';
import { getCurrentLocationConfig } from '../lib/location';
import { Phone, MapPin, Award, Shield, Users, Clock } from 'lucide-react';
import ReactGA from 'react-ga4';
import defaultRouteImg from '../assets/images/hero-bg.webp';

export default function AboutUs() {
  const currentLocation = getCurrentLocationConfig();
  const CITY = currentLocation.city;
  const PHONE = currentLocation.phone;
  const ADDRESS = currentLocation.address;
  const displayPhone = PHONE.replace('+91', '+91 ');

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/about" });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-[#0B132B] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${defaultRouteImg})` }}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4">About Urgent Taxis {CITY}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-medium">
            Your trusted local and outstation taxi service partner operating directly out of our {CITY} branch.
          </p>
          <div className="w-24 h-1 bg-[#1877F2] mx-auto rounded-full mt-6"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed text-lg space-y-6">
          <p>
            Welcome to <strong>Urgent Taxis {CITY}</strong>, the leading provider of premium cab services, airport transfers, and outstation trips in the region. Directly operating from our branch at <span className="font-semibold text-gray-900">{ADDRESS}</span>, we are committed to serving the residents and visitors of {CITY} with safe, comfortable, and reliable transportation options.
          </p>
          <p>
            Whether you need a quick one-way drop to Delhi, a spiritual journey to Haridwar, a round-trip family vacation to the hills of Nainital or Mussoorie, or a local rental within {CITY}, we ensure you get the best vehicle at the most competitive pricing.
          </p>
          <p>
            Our local dispatch team operates 24/7 to monitor and coordinate your rides. With a verified fleet of Sedans, Ertigas, Innova Crystas, and Tempo Travellers, we guarantee a punctual, stress-free travel experience.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">Why Travel With Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-950 text-lg mb-1.5">Safe & Sanitized Fleet</h3>
                <p className="text-gray-600 text-sm">Every vehicle undergoes strict sanitation procedures before pickup, driven by vetted, experienced professionals.</p>
              </div>
            </div>

            <div className="flex items-start bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-green-100 text-green-600 p-3 rounded-full mr-4">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-950 text-lg mb-1.5">24/7 Punctual Pickups</h3>
                <p className="text-gray-600 text-sm">We value your time. Our local drivers are trained to reach your location before the scheduled departure.</p>
              </div>
            </div>

            <div className="flex items-start bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full mr-4">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-950 text-lg mb-1.5">Transparent Fares</h3>
                <p className="text-gray-600 text-sm">Get clear pricing details upfront. No hidden booking charges, no surprise driver costs.</p>
              </div>
            </div>

            <div className="flex items-start bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-full mr-4">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-950 text-lg mb-1.5">Local {CITY} Experts</h3>
                <p className="text-gray-600 text-sm">Drivers are local residents who are intimately familiar with highway conditions and local sightseeing spots.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Branch CTA */}
        <div className="mt-16 bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-black mb-3">Ready to Book in {CITY}?</h3>
            <p className="text-blue-100 mb-6 text-sm md:text-base">Get in touch with our {CITY} booking center today for custom travel packages or instant taxi dispatch.</p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href={`tel:${PHONE}`} 
                className="bg-white text-blue-900 hover:bg-gray-100 transition-colors font-black px-6 py-3.5 rounded-xl flex items-center justify-center text-sm md:text-base shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2 fill-current" /> Call {displayPhone}
              </a>
              <div className="flex items-center text-blue-100 text-xs md:text-sm">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Branch: {ADDRESS}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
