import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ScaleXLogo } from './ScaleXLogo';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { PageRoute } from '../types';

interface NavbarProps {
  isRevealed?: boolean;
  revealLogo?: boolean;
  revealNav?: boolean;
  revealActions?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  isRevealed = true,
  revealLogo = true,
  revealNav = true,
  revealActions = true,
}) => {
  const { currentPage, navigateTo, cartCount, setIsCartOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to transition from floating clear elements to a docked glass capsule
  useEffect(() => {
    const handleScroll = () => {
      // If we are on home page, change to pill when scrolled past 60px
      // On non-home pages, always keep the refined glass look for solid legibility
      if (currentPage !== 'home') {
        setIsScrolled(true);
      } else {
        setIsScrolled(window.scrollY > 60);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Exactly in requested order: HOME | ABOUT | SHOP | PREORDERS | CONTACT US
  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'HOME', route: 'home' },
    { label: 'ABOUT', route: 'about' },
    { label: 'SHOP', route: 'shop' },
    { label: 'PREORDERS', route: 'preorders' },
    { label: 'CONTACT US', route: 'contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="scalex-header-bar"
      className={`fixed top-0 inset-x-0 z-40 w-full transition-all duration-500 ease-out pointer-events-none ${
        isRevealed ? 'opacity-100' : 'opacity-0'
      } ${
        isScrolled
          ? 'py-2.5 sm:py-3'
          : 'py-5 sm:py-7'
      }`}
    >
      <div
        className={`mx-auto transition-all duration-500 ease-out pointer-events-auto ${
          isScrolled
            ? 'w-[95%] sm:w-[92%] max-w-5xl rounded-2xl bg-[#0a0a0c]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.5)] px-4 sm:px-6 py-2 sm:py-2.5'
            : 'w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-14 bg-transparent border border-transparent shadow-none py-0'
        }`}
      >
        <div className="relative w-full flex items-center justify-between">
          {/* ========================================================= */}
          {/* LEFT: ScaleX Brand Logo (Independent on the left)        */}
          {/* ========================================================= */}
          <div
            className={`flex items-center shrink-0 z-10 transition-all duration-700 ease-out ${
              revealLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[15px]'
            }`}
          >
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center cursor-pointer focus:outline-none transition-transform duration-300 hover:opacity-90 active:scale-98 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
              id="navbar-brand-logo"
              aria-label="ScaleX Home"
            >
              <ScaleXLogo variant="navbar" />
            </button>
          </div>

          {/* ========================================================= */}
          {/* CENTER: Navigation Tabs (HOME | ABOUT | SHOP | PREORDERS | CONTACT US) */}
          {/* Absolutely centered on md+ screens; single line, no wrapping */}
          {/* ========================================================= */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center justify-center gap-1.5 lg:gap-3.5 xl:gap-5 absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-out flex-nowrap whitespace-nowrap ${
              revealNav ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[15px]'
            }`}
          >
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.route ||
                (link.route === 'shop' && (currentPage === 'categories' || currentPage === 'category-view'));

              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`relative px-2.5 lg:px-3 py-1.5 text-[11px] lg:text-xs font-mono-spec font-bold tracking-wider lg:tracking-widest uppercase transition-colors duration-200 cursor-pointer select-none whitespace-nowrap shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] ${
                    isActive
                      ? 'text-white'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  <span className="whitespace-nowrap inline-block">{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-2.5 right-2.5 lg:left-3 lg:right-3 h-[2px] bg-[#e11d48] rounded-full shadow-[0_0_10px_rgba(225,29,72,0.9)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ========================================================= */}
          {/* RIGHT: Profile & Cart Icons (Independent on the right)   */}
          {/* ========================================================= */}
          <div
            className={`flex items-center gap-2 sm:gap-3 shrink-0 z-10 transition-all duration-700 ease-out ${
              revealActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[15px]'
            }`}
          >
            {/* Profile icon */}
            <button
              onClick={() => handleNavClick('account')}
              aria-label="Account Profile"
              className={`p-2 rounded-xl text-white/90 hover:text-white transition-all duration-200 cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95 ${
                currentPage === 'account' ? 'text-white bg-white/10' : 'hover:bg-white/10'
              }`}
            >
              <User className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Cart icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative p-2 text-white/90 hover:text-white rounded-xl transition-all duration-200 cursor-pointer flex items-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95 hover:bg-white/10"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#e11d48] text-white font-mono-spec text-[9px] font-bold flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 text-white/90 hover:text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 max-w-sm ml-auto rounded-2xl bg-[#0a0a0c]/85 backdrop-blur-2xl border border-white/[0.1] shadow-[0_16px_40px_rgba(0,0,0,0.7)] px-5 py-4 transition-all pointer-events-auto">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.route ||
                (link.route === 'shop' && (currentPage === 'categories' || currentPage === 'category-view'));

              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-mono-spec font-bold tracking-widest uppercase text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] shadow-[0_0_6px_rgba(225,29,72,0.9)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
