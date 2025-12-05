'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ShoppingBag, Search, Menu, User, X, LogOut, ChevronDown, Heart, LayoutDashboard } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import CartDrawer from './CartDrawer';
import { handleLogout } from '@/app/actions/auth';

interface NavbarProps {
  session?: any;
  itemCount?: number; // Kept for backward compatibility if needed, but we use store now
}

const Navbar = ({ session }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilter = searchParams?.get('filter');

  const { products, toggleCart } = useCart();
  const itemCount = products.length;

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
  }, [pathname]);

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
      ? pathname === path && currentFilter === filter
      : pathname === path && !currentFilter;

    return `text-sm font-semibold transition-colors flex items-center gap-1 ${isActive ? 'text-primary-600' : 'text-neutral-600 hover:text-primary-600'
      }`;
  };

  return (
    <>
      <CartDrawer />
      <div className="bg-brand text-white text-xs py-2 text-center font-medium tracking-wide">
        Free Shipping on Orders Over $150 — Shop Now
      </div>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-white py-6'
          }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative z-10">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/favicon.png"
              alt="AlizonStore Logo"
              width={32}
              height={32}
              className="group-hover:scale-110 transition-transform rounded-lg"
            />
            <span className="font-display font-bold text-xl md:text-2xl text-brand tracking-tight">AlizonStore</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={getLinkClass('/')}>Home</Link>
            <Link href="/catalogs" className={getLinkClass('/catalogs')}>Shop</Link>
            <Link href="/about" className={getLinkClass('/about')}>About</Link>
            <Link href="/contact" className={getLinkClass('/contact')}>Contact</Link>
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

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="w-8 h-8 flex shrink-0 rounded-full overflow-hidden border-2 border-brand">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        height={32}
                        width={32}
                        className="w-full h-full object-cover"
                        alt="User avatar"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand flex items-center justify-center text-white text-xs font-bold">
                        {session.user?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform hidden md:block ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    {/* Overlay for closing dropdown */}
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsUserMenuOpen(false)}
                    />

                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-neutral-100 py-2 z-40 animate-in slide-in-from-top-2">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-neutral-100">
                        <p className="font-semibold text-brand text-sm">{session.user?.name || 'User'}</p>
                        <p className="text-xs text-neutral-500 truncate">{session.user?.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        {session.user?.role === 'seller' && (
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                        )}
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          My Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          My Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Heart className="w-4 h-4" />
                          My Wishlist
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-neutral-100 pt-1">
                        <form action={handleLogout}>
                          <button
                            type="submit"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </form>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/sign-in" className="text-neutral-700 hover:text-brand transition-colors" aria-label="Login">
                <User className="w-6 h-6" />
              </Link>
            )}

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
              <Link href="/" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50">Home</Link>
              <Link href="/catalogs" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50">Shop</Link>
              <Link href="/about" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50">About Us</Link>
              <Link href="/contact" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50">Contact</Link>

              {session ? (
                <>
                  {/* User Info */}
                  <div className="py-3 border-b border-neutral-50">
                    <p className="font-bold text-brand text-base">{session.user?.name || 'User'}</p>
                    <p className="text-xs text-neutral-500">{session.user?.email}</p>
                  </div>

                  <Link href="/profile" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50 flex items-center justify-between">
                    My Profile <User className="w-5 h-5" />
                  </Link>
                  <Link href="/orders" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50 flex items-center justify-between">
                    My Orders <ShoppingBag className="w-5 h-5" />
                  </Link>
                  <Link href="/wishlist" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50 flex items-center justify-between">
                    My Wishlist <Heart className="w-5 h-5" />
                  </Link>

                  {session.user?.role === 'seller' && (
                    <Link href="/dashboard" className="text-lg font-bold text-primary-600 bg-primary-50 py-3 px-4 rounded-lg border-2 border-primary-200 flex items-center justify-between">
                      Dashboard <LayoutDashboard className="w-5 h-5" />
                    </Link>
                  )}

                  {/* Logout Button */}
                  <form action={handleLogout}>
                    <button
                      type="submit"
                      className="text-lg font-bold text-red-600 py-2 border-b border-neutral-50 flex items-center justify-between w-full text-left"
                    >
                      Logout <LogOut className="w-5 h-5" />
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/sign-in" className="text-lg font-bold text-neutral-800 py-2 border-b border-neutral-50 flex items-center justify-between">
                  Login / Register <User className="w-5 h-5" />
                </Link>
              )}

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

export default Navbar;
