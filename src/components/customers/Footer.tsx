'use client';

import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSuccessMessage('Thank you for subscribing!');
    setEmail('');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
             <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-brand font-bold text-lg">A</div>
                 <span className="font-display font-bold text-xl">AlizonStore</span>
             </div>
             <p className="text-neutral-400 text-sm leading-relaxed">
               Making premium fashion accessible. Designed for the modern individual who values style and comfort.
             </p>
             <div className="flex gap-4 pt-2">
               <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
               <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
               <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
             </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-primary">Shop</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="/catalogs?filter=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/catalogs?filter=popular" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="/catalogs?category=men" className="hover:text-white transition-colors">Men</Link></li>
              <li><Link href="/catalogs?category=women" className="hover:text-white transition-colors">Women</Link></li>
              <li><Link href="/catalogs?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-primary">Help</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="#" className="hover:text-white transition-colors">Customer Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Delivery Details</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-primary">Stay in the Loop</h3>
            <p className="text-neutral-400 text-sm mb-4">Subscribe for exclusive offers and new arrivals.</p>
            <form onSubmit={handleSubscribe} noValidate>
              <div className="flex gap-2">
                <div className="relative flex-1">
                   <input 
                     type="email" 
                     placeholder="Enter your email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     aria-invalid={!!error}
                     aria-describedby="email-error"
                     className={`w-full bg-neutral-800 border-2 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent text-white transition-colors ${error ? 'border-red-500 focus:ring-red-500/50' : 'border-neutral-700/50 focus:ring-primary/50'}`}
                   />
                   <Mail className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              {error && <p id="email-error" className="text-red-400 text-xs mt-2">{error}</p>}
              {successMessage && <p className="text-green-400 text-xs mt-2">{successMessage}</p>}
              <button type="submit" className="mt-3 w-full bg-primary hover:bg-primary-600 text-brand font-semibold py-2 rounded-lg transition-colors text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 text-center text-neutral-500 text-xs">
          © {new Date().getFullYear()} AlizonStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
