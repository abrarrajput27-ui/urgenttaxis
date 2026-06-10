import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * FAQAccordion component
 * Props:
 * - faqs: Array<{question: string, answer: string}>
 */
export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Inject JSON-LD schema on mount
  React.useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, [faqs]);

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border-b border-gray-200 pb-3">
          <button
            className="w-full flex justify-between items-center text-left text-gray-800 font-medium"
            onClick={() => toggle(idx)}
          >
            <span>{faq.question}</span>
            {openIndex === idx ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {openIndex === idx && (
            <div className="mt-2 text-gray-600 leading-relaxed" style={{ transition: 'max-height 0.3s ease' }}>
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
