import React from 'react';
export default function Fleet() {
  return (
    <div className="pt-10 max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Our Fleet</h1>
      <p className="text-lg text-gray-700 mb-6">Explore our range of well‑maintained vehicles designed to suit every travel need.</p>
      <ul className="list-disc list-inside text-left mx-auto max-w-[600px] space-y-3">
        <li><strong>Sedan:</strong> Comfortable for city rides and small groups.</li>
        <li><strong>SUV:</strong> Spacious and ideal for families or groups up to 6.</li>
        <li><strong>Luxury:</strong> Premium rides for special occasions.</li>
        <li><strong>Mini Van:</strong> Perfect for larger groups and luggage.</li>
        <li><strong>Auto Rickshaw:</strong> Quick and economical short trips.</li>
      </ul>
    </div>
  );
}
