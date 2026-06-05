import re

with open('c:/Users/91859/Desktop/Antigravity Work/Urgent Taxis/frontend/src/App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Imports
code = code.replace(
    "import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';\nimport { Helmet, HelmetProvider } from 'react-helmet-async';"
)

# 2. Main Component Declaration
home_declaration = """// NOTE: This is a temporary CSR SEO routing implementation.
// For full SSR support (for platforms that do not execute JS), this can later be upgraded to Next.js.
function Home() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1);
    const sectionIds = ['services', 'routes', 'fleet', 'about', 'blog', 'contact'];
    if (sectionIds.includes(path)) {
       const el = document.getElementById(path);
       if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (location.hash) {
       const el = document.getElementById(location.hash.substring(1));
       if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
       window.scrollTo(0,0);
    }
  }, [location]);

  const getRouteData = (path) => {
    const data = {
      h1: <>Book Trusted <br/><span className="text-[#1e3b8a]">Taxi</span> in Seconds</>,
      subtitle: <>One Way <span className="mx-1.5 md:mx-2 font-light">|</span> Round Trip <span className="mx-1.5 md:mx-2 font-light">|</span> Airport Transfers</>,
      title: "Urgent Taxis - Book Trusted Taxi in Seconds",
      desc: "Book affordable outstation taxis, airport transfers, and local rentals. Urgent Taxis - your reliable travel partner."
    };

    switch(path) {
      case '/delhi-to-haldwani-taxi':
        data.h1 = <>Delhi to Haldwani <br/><span className="text-[#1e3b8a]">Taxi Service</span></>;
        data.subtitle = "Book affordable one-way and round-trip taxi from Delhi to Haldwani with Urgent Taxis.";
        data.title = "Delhi to Haldwani Taxi Service | Urgent Taxis";
        data.desc = data.subtitle;
        break;
      case '/delhi-to-nainital-taxi':
        data.h1 = <>Delhi to Nainital <br/><span className="text-[#1e3b8a]">Taxi Service</span></>;
        data.subtitle = "Comfortable outstation cab booking from Delhi to Nainital with verified drivers.";
        data.title = "Delhi to Nainital Taxi Service | Urgent Taxis";
        data.desc = data.subtitle;
        break;
      case '/ghaziabad-taxi-service':
        data.h1 = <>Taxi Service in <br/><span className="text-[#1e3b8a]">Ghaziabad</span></>;
        data.subtitle = "Book local, airport, outstation and one-way taxi service in Ghaziabad.";
        data.title = "Ghaziabad Taxi Service | Urgent Taxis";
        data.desc = data.subtitle;
        break;
      case '/delhi-to-ramnagar-taxi':
        data.h1 = <>Delhi to Ramnagar <br/><span className="text-[#1e3b8a]">Taxi Service</span></>;
        data.subtitle = "Book comfortable and safe outstation taxi from Delhi to Ramnagar.";
        data.title = "Delhi to Ramnagar Taxi Service | Urgent Taxis";
        data.desc = data.subtitle;
        break;
      case '/delhi-airport-to-haldwani-taxi':
        data.h1 = <>Delhi Airport to <br/><span className="text-[#1e3b8a]">Haldwani Taxi</span></>;
        data.subtitle = "Direct and affordable airport transfer from Delhi IGI Airport to Haldwani.";
        data.title = "Delhi Airport to Haldwani Taxi | Urgent Taxis";
        data.desc = data.subtitle;
        break;
      case '/noida-taxi-service':
        data.h1 = <>Taxi Service in <br/><span className="text-[#1e3b8a]">Noida</span></>;
        data.subtitle = "Book reliable local, outstation, and airport taxi service in Noida.";
        data.title = "Noida Taxi Service | Urgent Taxis";
        data.desc = data.subtitle;
        break;
      case '/services':
      case '/routes':
      case '/fleet':
      case '/about':
      case '/blog':
      case '/contact':
        data.title = `${path.substring(1).charAt(0).toUpperCase() + path.substring(2)} | Urgent Taxis`;
        break;
    }
    return data;
  };

  const routeData = getRouteData(location.pathname);
  const canonicalUrl = `https://urgenttaxis.com${location.pathname === '/' ? '' : location.pathname}`;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);"""
code = code.replace("export default function App() {\n  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);", home_declaration)

# 3. Helmet block
helmet_block = """  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <Helmet>
        <title>{routeData.title}</title>
        <meta name="description" content={routeData.desc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={routeData.title} />
        <meta property="og:description" content={routeData.desc} />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={routeData.title} />
        <meta property="twitter:description" content={routeData.desc} />
      </Helmet>"""
code = code.replace('  return (\n    <div className="font-sans text-gray-800 bg-white min-h-screen">', helmet_block)

# 4. H1 and Subtitle
h1_target = """              <h1 className="text-[36px] md:text-[44px] lg:text-[52px] xl:text-[56px] font-black text-[#0f172a] leading-[1.1] mb-4 tracking-tight">
                Book Trusted <br/><span className="text-[#1e3b8a]">Taxi</span> in Seconds
              </h1>
              
              <p className="text-[15px] md:text-[18px] lg:text-[20px] text-gray-600 font-medium mb-10">
                One Way <span className="mx-1.5 md:mx-2 font-light">|</span> Round Trip <span className="mx-1.5 md:mx-2 font-light">|</span> Airport Transfers
              </p>"""
h1_replacement = """              <h1 className="text-[36px] md:text-[44px] lg:text-[52px] xl:text-[56px] font-black text-[#0f172a] leading-[1.1] mb-4 tracking-tight">
                {routeData.h1}
              </h1>
              
              <p className="text-[15px] md:text-[18px] lg:text-[20px] text-gray-600 font-medium mb-10">
                {routeData.subtitle}
              </p>"""
code = code.replace(h1_target, h1_replacement)

# 5. Desktop Nav
nav_target = """          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8 items-center h-full ml-12">
            <div className="h-full flex flex-col justify-center relative">
              <a href="#" className="text-[#3b82f6] font-bold text-[14px]">Home</a>
              <div className="absolute bottom-[24px] left-0 w-full h-[2px] bg-[#3b82f6]"></div>
            </div>
            <a href="#services" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] flex items-center transition-colors">Services <ChevronDown className="w-4 h-4 ml-1 text-gray-400" /></a>
            <a href="#routes" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">Routes</a>
            <a href="#fleet" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">Fleet</a>
            <a href="#about" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">About Us</a>
            <a href="#blog" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">Blog</a>
            <a href="#contact" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">Contact Us</a>
          </nav>"""
nav_replacement = """          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8 items-center h-full ml-12">
            <div className="h-full flex flex-col justify-center relative">
              <Link to="/" className="text-[#3b82f6] font-bold text-[14px]">Home</Link>
              <div className="absolute bottom-[24px] left-0 w-full h-[2px] bg-[#3b82f6]"></div>
            </div>
            <Link to="/services" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] flex items-center transition-colors">Services <ChevronDown className="w-4 h-4 ml-1 text-gray-400" /></Link>
            <Link to="/routes" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">Routes</Link>
            <Link to="/fleet" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">Fleet</Link>
            <Link to="/about" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">About Us</Link>
            <Link to="/blog" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">Blog</Link>
            <Link to="/contact" className="text-[#334155] hover:text-[#3b82f6] font-bold text-[14px] transition-colors">Contact Us</Link>
          </nav>"""
code = code.replace(nav_target, nav_replacement)

# 6. Mobile Nav
mobile_nav_target = """      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white px-4 pt-2 pb-6 border-b border-gray-100 shadow-sm absolute w-full z-40">
           <a href="#" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-blue-600 font-bold border-b border-gray-50">Home</a>
           <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Services</a>
           <a href="#routes" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Routes</a>
           <a href="#fleet" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Fleet</a>
           <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">About Us</a>
           <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Blog</a>
           <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold">Contact Us</a>
        </div>
      )}"""
mobile_nav_replacement = """      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white px-4 pt-2 pb-6 border-b border-gray-100 shadow-sm absolute w-full z-40">
           <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-blue-600 font-bold border-b border-gray-50">Home</Link>
           <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Services</Link>
           <Link to="/routes" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Routes</Link>
           <Link to="/fleet" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Fleet</Link>
           <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">About Us</Link>
           <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold border-b border-gray-50">Blog</Link>
           <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-700 font-bold">Contact Us</Link>
        </div>
      )}"""
code = code.replace(mobile_nav_target, mobile_nav_replacement)

# 7. Quick Links in Footer
quick_links_target = """            {/* Col 2: Quick Links */}
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
            </div>"""
quick_links_replacement = """            {/* Col 2: Quick Links */}
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
            </div>"""
code = code.replace(quick_links_target, quick_links_replacement)

# 8. Top Routes in Footer
top_routes_target = """            {/* Col 4: Top Routes */}
            <div>
              <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Top Routes</h4>
              <ul className="space-y-3.5 text-[14px] font-medium mb-8">
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Haridwar</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Dehradun</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Haldwani</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Rishikesh</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Shimla</a></li>
              </ul>
            </div>"""
top_routes_replacement = """            {/* Col 4: Top Routes */}
            <div>
              <h4 className="text-white font-bold text-[18px] mb-6 tracking-wide">Top Routes</h4>
              <ul className="space-y-3.5 text-[14px] font-medium mb-8">
                <li><Link to="/delhi-to-haldwani-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Haldwani</Link></li>
                <li><Link to="/delhi-to-nainital-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Nainital</Link></li>
                <li><Link to="/delhi-to-ramnagar-taxi" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Delhi to Ramnagar</Link></li>
                <li><Link to="/ghaziabad-taxi-service" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Ghaziabad Taxi</Link></li>
                <li><Link to="/noida-taxi-service" className="hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2 opacity-50" /> Noida Taxi</Link></li>
              </ul>
            </div>"""
code = code.replace(top_routes_target, top_routes_replacement)

# 9. App wrapper
app_wrapper = """}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
"""
code = code.replace("}\n", "}\n\n" + app_wrapper, 1) # Only replace the last brace? No, replace at end
# Safer way to replace last brace
code = code.rstrip()
if code.endswith('}'):
    code = code[:-1] + app_wrapper

with open('c:/Users/91859/Desktop/Antigravity Work/Urgent Taxis/frontend/src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
