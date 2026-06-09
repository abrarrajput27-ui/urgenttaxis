import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, CreditCard, HelpCircle, ArrowRight, Link as LinkIcon, MessageCircle, Info, ShieldCheck, Users, Star, ThumbsUp } from 'lucide-react';
import { fareData, calculateFare } from '../data/fareData';
import { googleReviews } from '../data/googleReviews';
import { VEHICLE_RATES } from '../lib/pricingRules';

const RouteSEOContent = ({ data, onOpenLeadForm }) => {
  const location = useLocation();
  const currentFareData = fareData[location.pathname];

  if (!data) return null;

  return (
    <section className="bg-white py-16 border-t border-gray-100 pb-24 md:pb-16">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{data.heading}</h2>
          <div className="w-24 h-1 bg-[#1877F2] mx-auto rounded-full mb-6"></div>
          
          {/* Customer Count Badge */}
          <div className="inline-flex items-center justify-center bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-sm font-semibold text-gray-700 shadow-sm">
            <Users className="w-4 h-4 text-[#1877F2] mr-2" />
            10,000+ Happy Customers
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100 flex flex-col items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-[#1877F2] mb-2" />
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">Verified Drivers</span>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100 flex flex-col items-center justify-center">
            <Clock className="w-6 h-6 text-[#00a859] mb-2" />
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">24x7 Support</span>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100 flex flex-col items-center justify-center">
            <CreditCard className="w-6 h-6 text-[#fbbf24] mb-2" />
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">Transparent Pricing</span>
          </div>
          <div className="bg-red-50 p-4 rounded-xl text-center border border-red-100 flex flex-col items-center justify-center">
            <ThumbsUp className="w-6 h-6 text-red-500 mb-2" />
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">No Hidden Charges</span>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100 flex items-start hover:shadow-md transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full mr-4 text-[#1877F2]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Distance</p>
              <p className="text-2xl font-bold text-gray-900">{currentFareData ? currentFareData.distance : data.distance}</p>
            </div>
          </div>
          <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100 flex items-start hover:shadow-md transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full mr-4 text-[#1877F2]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Estimated Travel Time</p>
              <p className="text-2xl font-bold text-gray-900">{currentFareData ? currentFareData.travelTime : data.travelTime}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Fare Table */}
        {currentFareData && (
          <div className="mb-14 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <CreditCard className="w-6 h-6 mr-3 text-[#1877F2]" /> {currentFareData.route} Taxi Fare
              </h3>
              <p className="text-sm text-gray-500 font-medium mt-2 md:mt-0">
                <span className="w-2 h-2 inline-block bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                Fare Last Updated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-4">
              <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
                    <th className="px-3 sm:px-6 py-4 border-b border-gray-200 font-bold">Vehicle Type</th>
                    <th className="px-3 sm:px-6 py-4 border-b border-gray-200 font-bold hidden sm:table-cell">Capacity</th>
                    <th className="px-3 sm:px-6 py-4 border-b border-gray-200 font-bold text-center">Distance</th>
                    <th className="px-3 sm:px-6 py-4 border-b border-gray-200 font-bold text-right text-[#00a859]">Our Offer Fare</th>
                    <th className="px-3 sm:px-6 py-4 border-b border-gray-200 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {['Sedan', 'Ertiga', 'Innova', 'Innova Crysta', 'Traveller 12', 'Urbania 12'].map((type) => {
                    const calcInfo = calculateFare(location.pathname, type);
                    if(!calcInfo) return null;

                    const distanceStr = currentFareData ? currentFareData.distance : data.distance;
                    const routeName = currentFareData ? currentFareData.route : data.title;
                    const waMessage = `Hi, I am looking for a ${type} taxi for ${routeName}. What's the best discounted fare?`;

                    return (
                      <tr key={type} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 sm:px-6 py-4 text-gray-900 font-bold text-sm sm:text-base">{type}</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-600 font-medium hidden sm:table-cell">{calcInfo.seats} Pax</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-600 font-medium text-center text-sm sm:text-base">{distanceStr}</td>
                        <td className="px-3 sm:px-6 py-4 text-[#00a859] font-black text-right text-base sm:text-lg">₹{calcInfo.fare}</td>
                        <td className="px-3 sm:px-6 py-4 text-center">
                          <a 
                            href={`https://wa.me/918595066033?text=${encodeURIComponent(waMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#25D366] hover:bg-[#128C7E] text-white text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 px-2 sm:px-3 rounded-md transition-colors shadow-sm"
                          >
                            Get Discount
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start mb-6 text-sm text-yellow-800">
              <Info className="w-5 h-5 mr-3 flex-shrink-0 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Fare Calculation Disclaimer</p>
                <p>The taxi fare displayed above is estimated for one-way drops. Toll tax & state tax are extra as per actuals. Driver allowance is applicable per day based on vehicle type. Final fare may vary slightly based on exact pickup/drop locations.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
               <button 
                onClick={onOpenLeadForm}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-full transition-colors shadow-md"
              >
                Get Custom Quote
              </button>
              <a 
                href={`https://wa.me/918595066033?text=Hi,%20I%20want%20to%20know%20the%20exact%20fare%20for%20a%20taxi%20from%20${currentFareData.route.replace(' ', '%20')}.`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1877F2] hover:bg-[#155fc2] text-white font-bold py-3 px-6 rounded-full transition-colors shadow-md"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
              </a>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Points */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-5">Common Pickup & Drop Points</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-sm uppercase tracking-wider">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Pickups
                </h4>
                <ul className="space-y-2">
                  {data.pickupPoints.map((pt, i) => (
                    <li key={i} className="text-gray-600 flex items-start">
                      <ArrowRight className="w-4 h-4 text-gray-400 mr-2 mt-1 flex-shrink-0" /> {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-sm uppercase tracking-wider">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> Drops
                </h4>
                <ul className="space-y-2">
                  {data.dropPoints.map((pt, i) => (
                    <li key={i} className="text-gray-600 flex items-start">
                      <ArrowRight className="w-4 h-4 text-gray-400 mr-2 mt-1 flex-shrink-0" /> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-[#1e3a8a] text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Why Choose Urgent Taxis?</h3>
            <ul className="space-y-4">
              {data.whyChooseUs.map((reason, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-blue-50 font-medium leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Route Specific Reviews */}
        <div className="mb-16 bg-gray-50 rounded-2xl p-8 border border-gray-100">
           <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What Passengers Say About This Route</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {googleReviews.slice(0, 2).map((review, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex text-[#fbbf24] space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <img src={review.img} alt={review.name} className="w-8 h-8 rounded-full object-cover mr-3" />
                      <div>
                        <p className="font-bold text-xs text-gray-900">{review.name}</p>
                        <p className="text-[10px] text-gray-500">{review.loc}</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 opacity-80" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Long Content / SEO Text */}
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed mb-16">
          {data.content.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-2xl mb-4">{section.title}</h3>
              <p>{section.body}</p>
            </div>
          ))}
        </div>

        {/* Route Specific Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-900 to-[#1e3a8a] rounded-3xl p-8 md:p-12 text-center border border-blue-800 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"%3E%3C/circle%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"3\"%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")' }}></div>
          
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">Book {currentFareData ? currentFareData.route : data.heading} Taxi Now</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg relative z-10">Get the best fare and confirm your ride instantly. Our dispatch team is ready 24/7.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button 
              onClick={onOpenLeadForm}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#fbbf24] hover:bg-[#f5b000] text-gray-900 font-black py-4 px-8 rounded-full transition-transform transform hover:scale-105 shadow-xl"
            >
              Get Instant Quote
            </button>
            <a 
              href={`https://wa.me/918595066033?text=Hi,%20I%20want%20to%20book%20a%20taxi%20for%20${currentFareData ? currentFareData.route.replace(' ', '%20') : ''}.`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#00a859] hover:bg-[#00904d] text-white font-bold py-4 px-8 rounded-full transition-transform transform hover:scale-105 shadow-xl"
            >
              <MessageCircle className="w-6 h-6 mr-3" /> WhatsApp Booking
            </a>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center">
            <HelpCircle className="w-7 h-7 mr-3 text-[#1877F2]" /> Frequently Asked Questions
          </h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors shadow-sm">
                <h4 className="font-bold text-gray-900 text-lg mb-3 pr-8">{faq.q}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Routes */}
        <div className="border-t border-gray-100 pt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More Taxi Routes</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {data.relatedRoutes.map((route, idx) => (
              <Link 
                key={idx} 
                to={route.path}
                className="bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 text-gray-700 hover:text-[#1877F2] font-medium py-3 px-6 rounded-full transition-colors flex items-center"
              >
                <LinkIcon className="w-4 h-4 mr-2" /> {route.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default RouteSEOContent;