import React from 'react';
import carDzire from '../assets/images/car-dzire.png';
import carErtiga from '../assets/images/car-ertiga.png';
import carInnova from '../assets/images/car-innova.png';
import carCrysta from '../assets/images/car-crysta.png';
import carTraveller from '../assets/images/car-traveller.png';

// Updated fleet categories with correct vehicle names and price tiers (plain & hill)
const fleetCategories = [
  {
    title: 'Sedan – Maruti Dzire / Toyota Etios (or similar: Aura, Amaze)',
    image: carDzire, // placeholder image
    description: 'Compact and fuel‑efficient sedan for city rides and short inter‑city trips.',
    plainRate: '₹ 1,200',
    hillRate: '₹ 1,500',
  },
  {
    title: 'MPV – Maruti Ertiga',
    image: carErtiga,
    description: 'Spacious seven‑seater ideal for family outings and group travel.',
    plainRate: '₹ 2,000',
    hillRate: '₹ 2,400',
  },
  {
    title: 'MUV – Toyota Innova',
    image: carInnova,
    description: 'Robust multi‑utility vehicle suitable for varied terrains and larger groups.',
    plainRate: '₹ 2,500',
    hillRate: '₹ 3,000',
  },
  {
    title: 'SUV – Toyota Crysta',
    image: carCrysta,
    description: 'Luxury SUV offering comfort and power for long journeys and hill routes.',
    plainRate: '₹ 3,200',
    hillRate: '₹ 3,800',
  },
  {
    title: 'Hatchback – Maruti Swift (or similar)',
    image: carDzire, // placeholder image
    description: 'Compact hatchback perfect for quick city trips and easy parking.',
    plainRate: '₹ 1,000',
    hillRate: '₹ 1,300',
  },
  {
    title: 'Other – Toyota Traveller',
    image: carTraveller,
    description: 'Large capacity vehicle for group travel, weddings, and corporate outings.',
    plainRate: '₹ 4,000',
    hillRate: '₹ 4,500',
  },
];

export default function Fleet() {
  return (
    <div className="pt-10 max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Our Fleet</h1>
      <p className="text-lg text-gray-700 mb-6">
        Explore our range of well‑maintained vehicles, each with transparent plain and hill rates.
      </p>
      <ul className="list-none space-y-6 mx-auto max-w-[800px]">
        {fleetCategories.map((cat, idx) => (
          <li key={idx} className="flex flex-col md:flex-row items-center bg-gray-50 p-4 rounded-lg shadow-sm">
            <img src={cat.image} alt={cat.title} className="w-32 h-20 object-cover mr-4 rounded" />
            <div className="text-left">
              <strong className="block text-xl text-[#1e3b8a] mb-1">{cat.title}</strong>
              <span className="block text-gray-600 mb-1">{cat.description}</span>
              <span className="block text-gray-800">Plain Rate: <span className="font-medium text-[#006400]">{cat.plainRate}</span></span>
              <span className="block text-gray-800">Hill Rate: <span className="font-medium text-[#b00020]">{cat.hillRate}</span></span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
