import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, User, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { toggleCart, itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentFilter = searchParams.get('filter');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Helper for active link styling
  const getLinkClass = (path: string, filter?: string) => {
    const isActive = filter 
      ? location.pathname === path && currentFilter === filter
      : location.pathname === path && !currentFilter;
      
    return `text-sm font-semibold transition-colors flex items-center gap-1 ${
      isActive ? 'text-primary-600' : 'text-neutral-600 hover:text-primary-600'
    }`;
  };

  return (
    <>
      <div className="bg-brand text-white text-xs py-2 text-center font-medium tracking-wide">
        Free Shipping on Orders Over $150 — Shop Now
      </div>
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-white py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative z-10">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-brand font-bold text-lg group-hover:rotate-12 transition-transform">
               A
             </div>
             <span className="font-display font-bold text-xl md:text-2xl text-brand tracking-tight">AlizonStore</span>
          </Link>

          {/* Desktop Nav - Trendy & Attractive Labels (No Emojis) */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/catalog" className={getLinkClass('/catalog')}>Shop</Link>
            <Link to="/catalog?filter=new" className={getLinkClass('/catalog', 'new')}>
              New Drops
            </Link>
            <Link to="/catalog?filter=popular" className={getLinkClass('/catalog', 'popular')}>
              Best Sellers
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden sm:flex relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-neutral-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary w-32 focus:w-48 transition-all duration-300"
              />
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <Link to="/login" className="text-neutral-700 hover:text-brand transition-colors hidden sm:block" aria-label="Login">
              <User className="w-6 h-6" />
            </Link>
            
            <button 
              onClick={toggleCart} 
              className="relative text-neutral-700 hover:text-brand transition-colors p-1"
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-brand text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-neutral-700 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu & Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-neutral-900/50 backdrop-blur-[2px] -z-10 md:hidden transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-neutral-100 shadow-2xl py-6 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2 max-h-[80vh] overflow-y-auto">
               <Link to="/" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50">Home</Link>
               <Link to="/catalog" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50">Shop All</Link>
               <Link to="/catalog?filter=new" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50 flex items-center justify-between">
                 New Drops
               </Link>
               <Link to="/catalog?filter=popular" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50 flex items-center justify-between">
                 Best Sellers
               </Link>
               <Link to="/login" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50 flex items-center justify-between">
                 Login / Register <User className="w-5 h-5" />
               </Link>
               <div className="relative mt-2">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full pl-10 pr-4 py-3 bg-neutral-100 rounded-xl text-base"
                  />
                  <Search className="w-5 h-5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
               </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;