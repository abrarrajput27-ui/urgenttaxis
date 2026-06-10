import { getCurrentLocationConfig } from '../lib/location';
const locationData = getCurrentLocationConfig();
const PHONE = locationData.phone;
const ADDRESS = locationData.address;
const CITY = locationData.city;
export default function ContactUs() {
  return (
    <div className="pt-10 max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6">We'd love to hear from you! Whether you have a question, need a quote, or want to give feedback, feel free to reach out.</p>
      <div className="space-y-4 text-left">
          <p><strong>Phone:</strong> <a href={`tel:${PHONE}`} className="text-blue-600 hover:underline">{PHONE.replace('+91', '+91 ')}</a></p>
          <p><strong>Email:</strong> <a href="mailto:info@urgenttaxis.com" className="text-blue-600 hover:underline">info@urgenttaxis.com</a></p>
          <p><strong>Address:</strong> {ADDRESS}</p>
      </div>
    </div>
  );
}
