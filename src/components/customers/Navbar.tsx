'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ShoppingBag, Search, Menu, User, X, LogOut, ChevronDown, Heart, LayoutDashboard, Home, Store, Info, Phone } from 'lucide-react';
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
              className="fixed inset-0 bg-neutral-900/20 backdrop-blur-sm -z-10 md:hidden animate-in fade-in duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-neutral-100 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-5 duration-300">

              {/* Search Bar Area */}
              <div className="p-4 border-b border-neutral-100/50">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 group-hover:bg-neutral-100 focus:bg-white border-none ring-1 ring-neutral-200 focus:ring-2 focus:ring-primary/20 rounded-2xl text-base transition-all duration-300"
                  />
                  <Search className="w-5 h-5 text-neutral-400 group-hover:text-primary transition-colors absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Main Navigation */}
              <div className="p-3 space-y-1">
                <Link
                  href="/"
                  className="flex items-center gap-4 px-4 py-3.5 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 active:bg-neutral-100 transition-all border border-transparent hover:border-neutral-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-brand/5 flex items-center justify-center text-brand">
                    <Home className="w-5 h-5" />
                  </div>
                  <span className="text-base">Home</span>
                </Link>

                <Link
                  href="/catalogs"
                  className="flex items-center gap-4 px-4 py-3.5 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 active:bg-neutral-100 transition-all border border-transparent hover:border-neutral-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-brand/5 flex items-center justify-center text-brand">
                    <Store className="w-5 h-5" />
                  </div>
                  <span className="text-base">Shop</span>
                </Link>

                <Link
                  href="/about"
                  className="flex items-center gap-4 px-4 py-3.5 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 active:bg-neutral-100 transition-all border border-transparent hover:border-neutral-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-brand/5 flex items-center justify-center text-brand">
                    <Info className="w-5 h-5" />
                  </div>
                  <span className="text-base">About Us</span>
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center gap-4 px-4 py-3.5 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 active:bg-neutral-100 transition-all border border-transparent hover:border-neutral-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-brand/5 flex items-center justify-center text-brand">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-base">Contact</span>
                </Link>
              </div>

              {/* User Section */}
              <div className="p-3 mt-auto">
                {session ? (
                  <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-neutral-200/60">
                      <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-brand flex items-center justify-center text-white font-bold text-lg">
                        {session.user?.image ? (
                          <Image
                            src={session.user.image}
                            alt={session.user.name || 'User'}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          session.user?.name?.charAt(0) || 'U'
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-neutral-900 truncate">{session.user?.name || 'User'}</p>
                        <p className="text-xs text-neutral-500 truncate font-medium">{session.user?.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <Link
                        href="/profile"
                        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5 text-neutral-600" />
                        <span className="text-[10px] font-semibold text-neutral-600">Profile</span>
                      </Link>
                      <Link
                        href="/orders"
                        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ShoppingBag className="w-5 h-5 text-neutral-600" />
                        <span className="text-[10px] font-semibold text-neutral-600">Orders</span>
                      </Link>
                      <Link
                        href="/wishlist"
                        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Heart className="w-5 h-5 text-neutral-600" />
                        <span className="text-[10px] font-semibold text-neutral-600">Wishlist</span>
                      </Link>
                    </div>

                    {session.user?.role === 'seller' && (
                      <Link
                        href="/dashboard"
                        className="flex items-center justify-center gap-2 w-full p-3 bg-white border border-primary-100 text-primary-700 font-semibold rounded-xl text-sm mb-3 hover:bg-primary-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Seller Dashboard
                      </Link>
                    )}

                    <form action={handleLogout} className="mt-1">
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 w-full p-3 text-red-600 font-medium text-sm hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </form>
                  </div>
                ) : (
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center gap-2 w-full bg-brand text-white p-4 rounded-xl font-bold shadow-lg shadow-brand/20 active:scale-[0.98] transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    Login / Register
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Navbar;
