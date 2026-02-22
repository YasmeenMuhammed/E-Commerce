'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    name: 'Sarah M.',
    verified: true,
    rating: 5,
    review: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: '2',
    name: 'Alex K.',
    verified: true,
    rating: 5,
    review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: '3',
    name: 'James L.',
    verified: true,
    rating: 5,
    review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: '4',
    name: 'Mooen',
    verified: true,
    rating: 5,
    review: "The quality and attention to detail in every piece is exceptional. Shop.co has become my go-to destination for all my fashion needs.",
  },
];

export default function HappyCustomers() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-4xl lg:text-5xl font-black">OUR HAPPY CUSTOMERS</h2>
          
          <div className="hidden sm:flex gap-3">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrolling Reviews */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden">
            <div className="flex gap-5 animate-scroll-testimonials hover:pause">
              {[...testimonials, ...testimonials].map((item, index) => (
                <div key={index} className="flex-shrink-0 w-[350px] lg:w-[400px]">
                  <div className="border border-gray-200 rounded-[20px] p-7 bg-white hover:border-gray-300 transition-colors">
                    
                    <div className="flex gap-1 mb-4">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-bold text-xl">{item.name}</h3>
                      {item.verified && (
                        <CheckCircle className="w-6 h-6 text-green-500 fill-green-500" />
                      )}
                    </div>

                    <p className="text-gray-600 text-base leading-relaxed">
                      {item.review}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-testimonials {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-testimonials {
          animation: scroll-testimonials 30s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}