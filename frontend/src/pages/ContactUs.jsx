import { getCurrentLocationConfig } from '../lib/location';

const locationData = getCurrentLocationConfig();
const PHONE = locationData.phone;
const ADDRESS = locationData.address;
const CITY = locationData.city;

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export default function ContactUs() {
  return (
    <div className="pt-10 max-w-3xl mx-auto text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6">We'd love to hear from you! Whether you have a question, need a quote, or want to give feedback, feel free to reach out.</p>
      <div className="space-y-4 text-left bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100 max-w-lg mx-auto">
          <p><strong>Phone:</strong> <a href={`tel:${PHONE}`} className="text-blue-600 hover:underline">{PHONE.replace('+91', '+91 ')}</a></p>
          <p><strong>Email:</strong> <a href="mailto:info@urgenttaxis.com" className="text-blue-600 hover:underline">info@urgenttaxis.com</a></p>
          <p><strong>Address:</strong> {ADDRESS}</p>
          
          <div className="pt-6 border-t border-gray-200 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Follow Us</h3>
            <a 
              href="https://www.instagram.com/urgent.taxis" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-gray-700 hover:text-[#E1306C] transition-colors font-medium text-sm"
            >
              <InstagramIcon className="w-5 h-5 mr-2 text-[#E1306C]" /> @urgent.taxis on Instagram
            </a>
          </div>
      </div>
    </div>
  );
}
