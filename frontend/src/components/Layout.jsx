import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentLocationConfig } from '../lib/location';
import { 
  Phone, Mail, ChevronDown, ChevronRight, MapPin, Menu, X 
} from 'lucide-react';
import ReactGA from 'react-ga4';

import logoImg from '../assets/images/logo.jpg';
import StickyMobileBar from './StickyMobileBar';
import FloatingQuoteWidget from './FloatingQuoteWidget';
import { routesData } from '../data/routesData';
import LeadCapturePopup from './LeadCapturePopup';

const locationData = getCurrentLocationConfig();

// Social Icons
const FacebookIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const InstagramIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const TwitterIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>;
const YoutubeIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const location = useLocation();
  const currentLocation = getCurrentLocationConfig();
  const phone = currentLocation.phone;
  const whatsapp = currentLocation.whatsapp;
  const address = currentLocation.address;
  const city = currentLocation.city;
  const displayPhone = phone.replace('+91', '+91 ');

  // SEO title and meta description
  useEffect(() => {
    const isRoutePage = !!routesData[location.pathname];
    const isBlogPost = location.pathname.startsWith('/blog/');
    if (!isRoutePage && !isBlogPost) {
      document.title = currentLocation.seoTitle || 'Urgent Taxis';
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', currentLocation.seoDescription || '');
      } else if (currentLocation.seoDescription) {
        const metaTag = document.createElement('meta');
        metaTag.name = 'description';
        metaTag.content = currentLocation.seoDescription;
        document.head.appendChild(metaTag);
      }
    }
  }, [currentLocation, location.pathname]);

  const handlePhoneClick = () => {
    ReactGA.event({ category: "Contact", action: "phone_call_click" });
  };

  const handleSimpleWhatsApp = (message) => {
    ReactGA.event({ category: "Contact", action: "whatsapp_click", label: "Direct WhatsApp Button" });
    const fullMessage = `${message}\n\nFrom ${city} (${window.location.hostname})`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(fullMessage)}`, '_blank');
  };

  // Nav link style helper
  const isActive = (path) => location.pathname === path;

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen pb-32 md:pb-24">
      
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
              <a href="https://www.facebook.com/p/Urgent-Taxis-100094316769562/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
              </a>
              <a href="https://www.instagram.com/urgent.taxis" target="_blank" rel="noopener noreferrer" className="hover:opacity-80" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
              </a>
              <a href="https://www.youtube.com/@urgenttaxis" target="_blank" rel="noopener noreferrer" className="hover:opacity-80" aria-label="YouTube">
                <YoutubeIcon className="w-4 h-4 text-[#FF0000]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <header className="bg-white sticky top-0 z-50 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 h-[85px] flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 cursor-pointer">
            <Link to="/">
              <img src={logoImg} alt="Urgent Taxis" className="h-[55px] md:h-[65px] w-auto mix-blend-multiply" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8 items-center h-full ml-12">
            <div className="h-full flex flex-col justify-center relative">
              <Link to="/" className={`${isActive('/') ? 'text-[#3b82f6]' : 'text-[#334155] hover:text-[#3b82f6]'} font-bold text-[14px]`}>Home</Link>
              {isActive('/') && <div className="absolute bottom-[24px] left-0 w-full h-[2px] bg-[#3b82f6]"></div>}
            </div>
            <div className="h-full flex flex-col justify-center relative">
              <Link to="/services" className={`${isActive('/services') ? 'text-[#3b82f6]' : 'text-[#334155] hover:text-[#3b82f6]'} font-bold text-[14px] flex items-center transition-colors`}>Services <ChevronDown className="w-4 h-4 ml-1 text-gray-400" /></Link>
              {isActive('/services') && <div className="absolute bottom-[24px] left-0 w-full h-[2px] bg-[#3b82f6]"></div>}
            </div>
            <div className="h-full flex flex-col justify-center relative">
              <Link to="/routes" className={`${isActive('/routes') ? 'text-[#3b82f6]' : 'text-[#334155] hover:text-[#3b82f6]'} font-bold text-[14px] transition-colors`}>Routes</Link>
              {isActive('/routes') && <div className="absolute bottom-[24px] left-0 w-full h-[2px] bg-[#3b82f6]"></div>}
            </div>
            <div className="h-full flex flex-col justify-center relative">
              <Link to="/fleet" className={`${isActive('/fleet') ? 'text-[#3b82f6]' : 'text-[#334155] hover:text-[#3b82f6]'} font-bold text-[14px] transition-colors`}>Fleet</Link>
              {isActive('/fleet') && <div className="absolute bottom-[24px] left-0 w-full h-[2px] bg-[#3b82f6]"></div>}
            </div>
            <div className="h-full flex flex-col justify-center relative">
              <Link to="/about" className={`${isActive('/about') ? 'text-[#3b82f6]' : 'text-[#334155] hover:text-[#3b82f6]'} font-bold text-[14px] transition-colors`}>About Us</Link>
              {isActive('/about') && <div className="absolute bottom-[24px] left-0 w-full h-[2px] bg-[#3b82f6]"></div>}
            </div>
            <div className="h-full flex flex-col justify-center relative">
              <Link to="/blog" className={`${location.pathname.startsWith('/blog') ? 'text-[#3b82f6]' : 'text-[#334155] hover:text-[#3b82f6]'} font-bold text-[14px] transition-colors`}>Blog</Link>
              {location.pathname.startsWith('/blog') && <div className="absolute bottom-[24px] left-0 w-full h-[2px] bg-[#3b82f6]"></div>}
            </div>
            <div className="h-full flex flex-col justify-center relative">
              <Link to="/contact" className={`${isActive('/contact') ? 'text-[#3b82f6]' : 'text-[#334155] hover:text-[#3b82f6]'} font-bold text-[14px] transition-colors`}>Contact Us</Link>
              {isActive('/contact') && <div className="absolute bottom-[24px] left-0 w-full h-[2px] bg-[#3b82f6]"></div>}
            </div>
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
                <a href={`tel:${phone}`} onClick={handlePhoneClick} className="font-black text-[18px] text-[#1e3a8a] leading-tight tracking-wide">{displayPhone}</a>
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
           <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-blue-600 font-bold border-b border-gray-50">Home</Link>
           <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Services</Link>
           <Link to="/routes" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Routes</Link>
           <Link to="/fleet" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Fleet</Link>
           <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">About Us</Link>
           <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Blog</Link>
           <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Contact Us</Link>
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 mt-2">
               <span className="text-sm font-bold text-gray-500">Follow Us:</span>
               <div className="flex space-x-3">
                 <a href="https://www.facebook.com/p/Urgent-Taxis-100094316769562/" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white p-2 rounded-full hover:opacity-80 transition" aria-label="Facebook">
                   <FacebookIcon className="w-[16px] h-[16px]" />
                 </a>
                 <a href="https://www.instagram.com/urgent.taxis" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white p-2 rounded-full hover:opacity-80 transition" aria-label="Instagram">
                   <InstagramIcon className="w-[16px] h-[16px]" />
                 </a>
                 <a href="https://www.youtube.com/@urgenttaxis" target="_blank" rel="noopener noreferrer" className="bg-[#FF0000] text-white p-2 rounded-full hover:opacity-80 transition" aria-label="YouTube">
                   <YoutubeIcon className="w-[16px] h-[16px]" />
                 </a>
               </div>
            </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#0B132B] text-gray-400 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 mb-16 items-start">
            
            {/* Col 1: Brand */}
            <div className="pr-0 lg:pr-4 h-full">
              <div className="mb-6">
                <Link to="/">
                  <img src={logoImg} alt="Urgent Taxis" className="h-[45px] w-auto rounded-md mix-blend-lighten" />
                </Link>
              </div>
              <p className="text-[14px] text-gray-400 mb-8 font-medium leading-[1.8]">
                Your reliable travel partner for outstation trips, local rentals and airport transfers across India.
              </p>
              <div className="flex space-x-3">
                <a href="https://www.facebook.com/p/Urgent-Taxis-100094316769562/" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white p-2.5 rounded-full hover:opacity-80 transition" aria-label="Facebook">
                  <FacebookIcon className="w-[15px] h-[15px]" />
                </a>
                <a href="https://www.instagram.com/urgent.taxis" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white p-2.5 rounded-full hover:opacity-80 transition" aria-label="Instagram">
                  <InstagramIcon className="w-[15px] h-[15px]" />
                </a>
                <a href="https://www.youtube.com/@urgenttaxis" target="_blank" rel="noopener noreferrer" className="bg-[#FF0000] text-white p-2.5 rounded-full hover:opacity-80 transition" aria-label="YouTube">
                  <YoutubeIcon className="w-[15px] h-[15px]" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Quick Links</h4>
              <ul className="space-y-4 text-[14px] font-medium">
                <li><Link to="/" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> About Us</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Our Services</Link></li>
                <li><Link to="/fleet" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Our Fleet</Link></li>
                <li><Link to="/routes" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Popular Routes</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Contact Us</Link></li>
              </ul>
            </div>

            {/* Col 3: Our Services */}
            <div>
              <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Our Services</h4>
              <ul className="space-y-4 text-[14px] font-medium">
                <li><Link to="/services" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Round Trip Outstation</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Airport Transfer</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Local Rental</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Tour Packages</Link></li>
              </ul>
            </div>

            {/* Col 4: Top Routes */}
            <div>
              <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Top Routes</h4>
              <ul className="space-y-3.5 text-[14px] font-medium mb-8">
                <li><Link to="/delhi-to-haldwani-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Haldwani</Link></li>
                <li><Link to="/delhi-to-nainital-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Nainital</Link></li>
                <li><Link to="/delhi-to-ramnagar-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Ramnagar</Link></li>
                <li><Link to="/ghaziabad-taxi-service" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Ghaziabad Taxi</Link></li>
                <li><Link to="/noida-taxi-service" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Noida Taxi</Link></li>
              </ul>
            </div>
              
            {/* Col 5: Contact Us */}
            <div>
              <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Contact Us</h4>
              <ul className="space-y-4 text-[14px] font-medium">
                <li className="flex items-start">
                  <Phone className="w-[18px] h-[18px] mr-3 text-white flex-shrink-0 mt-0.5 fill-current" />
                  <a href={`tel:${phone}`} onClick={handlePhoneClick} className="text-white font-bold tracking-wide">{displayPhone}</a>
                </li>
                <li className="flex items-start">
                  <Mail className="w-[18px] h-[18px] mr-3 text-white flex-shrink-0 mt-0.5" />
                  <a href="mailto:info@urgenttaxis.com" className="text-white hover:opacity-80 transition-opacity">info@urgenttaxis.com</a>
                </li>
                <li className="flex items-start pr-4 sm:pr-0">
                  <MapPin className="w-[18px] h-[18px] mr-3 text-white flex-shrink-0 mt-1" />
                  <span className="text-white leading-relaxed text-[13px] sm:text-[14px] break-words">{address}</span>
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
      <div className="hidden md:flex fixed bottom-6 lg:bottom-[120px] right-6 lg:right-[40px] flex-col space-y-3 z-[30]">
        <a 
          href={`tel:${phone}`} onClick={handlePhoneClick}
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

      <StickyMobileBar onOpenLeadForm={() => setIsLeadFormOpen(true)} />
      <FloatingQuoteWidget onOpenLeadForm={() => setIsLeadFormOpen(true)} />
      <LeadCapturePopup isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} routeName="General" initialPickup={currentLocation.city} />
    </div>
  );
}
