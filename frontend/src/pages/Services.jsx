import React from 'react';
export default function Services() {
  return (
    <div className="pt-10 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Our Services</h1>
      <p className="text-lg text-gray-700 mb-6">Urgent Taxis offers a range of reliable transportation solutions across India.</p>
      <ul className="list-disc list-inside text-left space-y-3 mx-auto max-w-[600px]">
        <li><strong>Outstation Taxi:</strong> Comfortable rides for long distances with transparent fare calculation.</li>
        <li><strong>Airport Transfers:</strong> Punctual pickups and drop‑offs at all major airports.</li>
        <li><strong>Local Rentals:</strong> Hourly or daily rentals for city travel.</li>
        <li><strong>Tour Packages:</strong> Customized itineraries for group tours and sightseeing.</li>
        <li><strong>Corporate Bookings:</strong> Dedicated fleet and priority support for businesses.</li>
      </ul>
    </div>
  );
}
