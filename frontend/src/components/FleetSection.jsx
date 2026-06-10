// src/components/FleetSection.jsx
import React from 'react';
import fleetData from '../data/fleet.json';
import { Phone, MessageCircle } from 'lucide-react';
import { getCurrentLocationConfig } from '../lib/location';

export default function FleetSection() {
  const { phone, whatsapp, city } = getCurrentLocationConfig();

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Fleet</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {fleetData.map(vehicle => (
          <div key={vehicle.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow bg-white">
            <img src={vehicle.image} alt={vehicle.name} className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{vehicle.name}</h3>
            <p className="text-gray-600 mb-2">Seating: {vehicle.seating}</p>
            <p className="text-gray-600 mb-2">Luggage: {vehicle.luggage}</p>
            <p className="text-gray-600 mb-2">Starting fare: {vehicle.startingFare}</p>
            <div className="flex space-x-3 mt-4">
              <a href={`tel:${phone}`} className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                <Phone className="w-4 h-4 mr-1" /> Call
              </a>
              <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi, I need a taxi from ${city}')}`}
                 className="flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
