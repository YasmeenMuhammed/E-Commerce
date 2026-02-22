'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';


// Counter animation hook
const useCounter = (end: number, duration: number = 2000, shouldStart: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (end - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);

  return count;
};

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger counter animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const brandsCount = useCounter(200, 2000, isVisible);
  const productsCount = useCounter(2000, 2500, isVisible);
  const customersCount = useCounter(30000, 3000, isVisible);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#F2F0F1] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/HomePicture.jpg"
          alt="Fashion models"
          fill
          className="object-contain object-center"
          priority
          quality={100}
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F2F0F1]/95 via-[#F2F0F1]/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-12 lg:py-0">
          {/* Left Content */}
          <div className="flex-1 w-full lg:w-1/2 pt-8 lg:pt-0">
            {/* Main Heading */}
            <div className="relative mb-6 lg:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[64px] font-black leading-tight mb-4">
                
                <br />
                Shop Smart
                <br />
                Live Better
              </h1>
              
              {/* Decorative sparkles */}
              <Sparkles 
                className="absolute -top-4 right-12 sm:right-24 w-12 h-12 sm:w-16 sm:h-16 text-black animate-pulse" 
                fill="currentColor"
              />
              <Sparkles 
                className="absolute top-32 -right-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 text-black animate-pulse"
                fill="currentColor"
                style={{ animationDelay: '0.5s' }}
              />
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base mb-6 lg:mb-8 max-w-[545px] leading-relaxed">
              Browse through our diverse range of meticulously crafted garments, designed
              to bring out your individuality and cater to your sense of style.
            </p>

            {/* CTA Button */}
            <Button 
              size="lg"
              className="w-full sm:w-auto h-12 sm:h-[52px] px-12 sm:px-[54px] bg-black hover:bg-gray-800 text-white rounded-full text-base font-medium transition-all duration-300 hover:scale-105 mb-8 lg:mb-12"
            >
             <Link href="/products">Shop Now</Link>  
            </Button>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-12">
              <div className="flex-shrink-0">
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl sm:text-4xl font-bold text-black ">
                    {brandsCount}+
                  </h3>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  International Brands
                </p>
              </div>

              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>

              <div className="flex-shrink-0">
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl sm:text-4xl font-bold text-black">
                    {productsCount.toLocaleString()}+
                  </h3>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  High-Quality Products
                </p>
              </div>

              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>

              <div className="flex-shrink-0">
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl sm:text-4xl font-bold text-black">
                    {customersCount.toLocaleString()}+
                  </h3>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Image space (image is now background) */}
          <div className="flex-1 w-full lg:w-1/2 hidden lg:block"></div>
        </div>
      </div>

      {/* Brand Marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-black py-8 lg:py-10 overflow-hidden mt-20">
        <div className="relative">
          {/* Infinite scroll animation */}
          <div className="flex animate-marquee">
            {/* First set of brands */}
            <div className="flex items-center justify-around min-w-full px-8 gap-8 sm:gap-12 lg:gap-16">
              <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold whitespace-nowrap">
                VERSACE
              </div>
              <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold whitespace-nowrap">
                ZARA
              </div>
              <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold whitespace-nowrap">
                GUCCI
              </div>
              <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold whitespace-nowrap">
                PRADA
              </div>
              <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold whitespace-nowrap">
                Calvin Klein
              </div>
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center justify-around min-w-full px-8 gap-8 sm:gap-12 lg:gap-16">
              <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold whitespace-nowrap">
                VERSACE
              </div>
              <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold whitespace-nowrap">
                ZARA
              </div>
              <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold whitespace-nowrap">
                GUCCI
              </div>
              <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold whitespace-nowrap">
                PRADA
              </div>
              <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold whitespace-nowrap">
                Calvin Klein
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      
    </section>

  );
}