import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Services from './pages/Services';
import Fleet from './pages/Fleet';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import AdminDashboard from './pages/AdminDashboard';
import RoutesPage from './pages/Routes';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin routes without Layout */}
          <Route path="/admin/leads" element={<AdminDashboard />} />
          
          {/* Public routes wrapped in Layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/routes" element={<RoutesPage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/fleet" element={<Fleet />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                
                {/* Fallback to Home for dynamically matched SEO routes (like /delhi-to-haldwani-taxi) */}
                <Route path="*" element={<Home />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
