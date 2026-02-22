import React from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Instagram, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-60">
      {/* Newsletter Section */}
      <div className="bg-black text-white rounded-3xl mx-4 sm:mx-4 lg:mx-10 xl:mx-14 -mb-12 relative z-10">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-10 py-2 sm:py-10 lg:py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-xl xl:text-[20px] font-bold leading-tight text-center lg:text-left lg:max-w-md xl:max-w-lg">
              STAY UPTO DATE ABOUT
              <br />
              OUR LATEST OFFERS
            </h2>
            
            {/* Form */}
            <div className="w-full lg:w-auto lg:min-w-87.5">
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-12 h-12 bg-white text-gray-900 rounded-full border-0 placeholder:text-gray-400"
                  />
                </div>
                <Button 
                  className="w-full h-12 bg-white text-black hover:bg-gray-100 rounded-full font-medium"
                >
                  Subscribe to ShopMart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-50 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-8 lg:pb-12">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <h3 className="text-3xl sm:text-[32px] font-bold text-black">
                  SHOP MART
                </h3>
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-62.5">
Everything You Need, All in One Place.
From fashion to electronics — discover quality, style, and unbeatable prices.
              </p>
              
              {/* Social Icons */}
              <div className="flex gap-3">
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-black" />
                </Link>
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-white" fill="currentColor" />
                </Link>
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-black" />
                </Link>
                <Link
                  href="#"
                  aria-label="Github"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Github className="w-4 h-4 text-black" />
                </Link>
              </div>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-black font-medium text-base tracking-[3px] uppercase mb-6">
                COMPANY
              </h4>
              <ul className="space-y-4">
                {['About', 'Features', 'Works', 'Career'].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-black transition-colors text-base"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Column */}
            <div>
              <h4 className="text-black font-medium text-base tracking-[3px] uppercase mb-6">
                HELP
              </h4>
              <ul className="space-y-4">
                {['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-black transition-colors text-base"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ Column */}
            <div>
              <h4 className="text-black font-medium text-base tracking-[3px] uppercase mb-6">
                FAQ
              </h4>
              <ul className="space-y-4">
                {['Account', 'Manage Deliveries', 'Orders', 'Payments'].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-black transition-colors text-base"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-black font-medium text-base tracking-[3px] uppercase mb-6">
                RESOURCES
              </h4>
              <ul className="space-y-4">
                {['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-black transition-colors text-base"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 text-sm text-center sm:text-left">
                Shop.Mart © 2000-2026, All Rights Reserved
              </p>
              
              {/* Payment Icons */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-blue-800">VISA</span>
                </div>
                <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  </div>
                </div>
                <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-blue-600">PayPal</span>
                </div>
                <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-black"> Pay</span>
                </div>
                <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-gray-700">G Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}