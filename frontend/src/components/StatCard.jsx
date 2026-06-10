import React from 'react';

/**
 * Reusable stat/benefit card component.
 * Props:
 *   - icon: React element (already styled for size/color)
 *   - value: string or number to display (large)
 *   - label: string – short description under the value
 *   - bgColor: background color for the icon circle (defaults to primary blue)
 */
export default function StatCard({ icon, value, label, bgColor = '#1E40AF' }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-2 py-4">
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full mb-2"
        style={{ backgroundColor: bgColor }}
        aria-label={label}
      >
        {React.cloneElement(icon, { className: 'w-5 h-5 text-white' })}
      </div>
      <h3 className="font-bold text-[15px] sm:text-[17px] text-[#1E40AF] leading-tight">
        {value}
      </h3>
      <p className="text-[11px] sm:text-[13px] font-medium text-gray-800 leading-snug mt-1">
        {label}
      </p>
    </div>
  );
}
