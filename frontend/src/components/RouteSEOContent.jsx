import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, CreditCard, HelpCircle, ArrowRight, Link as LinkIcon, MessageCircle } from 'lucide-react';

const RouteSEOContent = ({ data }) => {
  if (!data) return null;

  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{data.heading}</h2>
          <div className="w-24 h-1 bg-[#1877F2] mx-auto rounded-full"></div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100 flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4 text-[#1877F2]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Distance</p>
              <p className="text-2xl font-bold text-gray-900">{data.distance}</p>
            </div>
          </div>
          <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100 flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4 text-[#1877F2]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Estimated Travel Time</p>
              <p className="text-2xl font-bold text-gray-900">{data.travelTime}</p>
            </div>
          </div>
        </div>

        {/* Fare Table */}
        <div className="mb-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <CreditCard className="w-6 h-6 mr-3 text-[#1877F2]" /> Estimated Taxi Fares
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 border-b border-gray-200 font-bold">Vehicle Type</th>
                  <th className="px-6 py-4 border-b border-gray-200 font-bold">Seating Capacity</th>
                  <th className="px-6 py-4 border-b border-gray-200 font-bold text-right">Estimated Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.fares.map((fare, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-semibold">{fare.car}</td>
                    <td className="px-6 py-4 text-gray-600">{fare.seats} Pax</td>
                    <td className="px-6 py-4 text-[#00a859] font-bold text-right">{fare.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-right">* Fares are estimated and subject to change based on actual pickup/drop points and tolls.</p>
        </div>

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

        {/* Long Content / SEO Text */}
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed mb-16">
          {data.content.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-2xl mb-4">{section.title}</h3>
              <p>{section.body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-50 to-[#e6f7ec] rounded-2xl p-8 md:p-12 text-center border border-green-100 mb-16 shadow-sm">
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Ready to Book Your Ride?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Skip the waiting. Connect directly with our dispatch team on WhatsApp for instant booking confirmation and fare locks.</p>
          <a 
            href="https://wa.me/918595066033?text=Hi,%20I%20want%20to%20book%20a%20taxi." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#00a859] hover:bg-[#00904d] text-white font-bold py-4 px-8 rounded-full transition-transform transform hover:scale-105 shadow-xl shadow-green-500/20"
          >
            <MessageCircle className="w-6 h-6 mr-3" /> Book Now on WhatsApp
          </a>
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
