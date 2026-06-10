import { getCurrentLocationConfig } from '../lib/location';

const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function ContactUs() {
  const locationData = getCurrentLocationConfig();
  const PHONE = locationData.phone;
  const WHATSAPP = locationData.whatsapp;
  const ADDRESS = locationData.address;
  const CITY = locationData.city;

  return (
    <div className="pt-12 max-w-6xl mx-auto px-4 pb-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Contact Urgent Taxis {CITY}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">We are here to assist you 24/7. Get in touch with our local branch in {CITY} for bookings, quotes, or support.</p>
        <div className="w-24 h-1 bg-[#1877F2] mx-auto rounded-full mt-6"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        
        {/* Left Column: Contact Details */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">Branch Details</h2>
            
            <div className="flex items-start">
              <div className="bg-blue-50 text-blue-600 p-3.5 rounded-full mr-4 shadow-sm flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.145-.44.02-9.27.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Phone Number</p>
                <a href={`tel:${PHONE}`} className="text-xl font-bold text-blue-600 hover:text-blue-700">{PHONE.replace('+91', '+91 ')}</a>
                <p className="text-xs text-gray-400 font-medium mt-1">Available 24x7 for direct bookings</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-50 text-green-600 p-3.5 rounded-full mr-4 shadow-sm flex-shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.888-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">WhatsApp Booking</p>
                <a 
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi Urgent Taxis, I am looking to book a taxi from ${CITY}.\n\nFrom ${CITY} (${window.location.hostname})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-[#0aa63f] hover:text-[#088c34] flex items-center"
                >
                  {PHONE.replace('+91', '+91 ')} <span className="ml-2 bg-[#25D366]/10 text-[#25D366] text-[10px] font-black px-2 py-0.5 rounded uppercase">Online</span>
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-red-50 text-red-500 p-3.5 rounded-full mr-4 shadow-sm flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Address</p>
                <p className="text-gray-700 font-semibold leading-relaxed">{ADDRESS}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-slate-50 text-slate-600 p-3.5 rounded-full mr-4 shadow-sm flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Official Email</p>
                <a href="mailto:info@urgenttaxis.com" className="text-gray-700 font-bold hover:underline">info@urgenttaxis.com</a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-100 mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Follow Us</h3>
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/p/Urgent-Taxis-100094316769562/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#1877F2] text-white p-2.5 rounded-full hover:opacity-85 transition-opacity"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/urgent.taxis" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white p-2.5 rounded-full hover:opacity-85 transition-opacity"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@urgenttaxis" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#FF0000] text-white p-2.5 rounded-full hover:opacity-85 transition-opacity"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          
        </div>

        {/* Right Column: Google Maps Embed */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl min-h-[400px]">
          <iframe 
            src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full min-h-[400px] border-0"
            allowFullScreen=""
            loading="lazy"
            title={`${CITY} Office Location`}
          ></iframe>
        </div>

      </div>
    </div>
  );
}
