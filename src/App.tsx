import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CinematicIntro } from './components/CinematicIntro';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { PreordersPage } from './pages/PreordersPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentPage } = useStore();

  const [isWebsiteRevealed, setIsWebsiteRevealed] = useState(false);

  // Staggered reveal states for floating hero elements
  const [revealLogo, setRevealLogo] = useState(false);
  const [revealNav, setRevealNav] = useState(false);
  const [revealActions, setRevealActions] = useState(false);
  const [revealHeadline, setRevealHeadline] = useState(false);
  const [revealButton, setRevealButton] = useState(false);

  const hasUnlockedScrollRef = useRef(false);

  // Lock scroll on mount during the single intro video pass
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // When intro video ends:
  // - Background video & dark overlay take over behind UI
  // - Floating UI reveals smoothly
  // - Scrolling unlocks
  // - Intro NEVER loops or returns
  const handleIntroEnd = useCallback(() => {
    // 1. Make UI container visible
    setIsWebsiteRevealed(true);

    // 2. Staggered sequence:
    // Transition begins (t=0)
    // -> logo fades in (t=200ms)
    // -> navigation tabs fade in (t=380ms)
    // -> profile/cart icons fade in (t=550ms)
    // -> centered headline fades in (t=750ms)
    // -> centered button fades in (t=1000ms)
    // -> normal scrolling unlocked (t=1500ms)
    setTimeout(() => {
      setRevealLogo(true);
    }, 200);

    setTimeout(() => {
      setRevealNav(true);
    }, 380);

    setTimeout(() => {
      setRevealActions(true);
    }, 550);

    setTimeout(() => {
      setRevealHeadline(true);
    }, 750);

    setTimeout(() => {
      setRevealButton(true);
    }, 1000);

    setTimeout(() => {
      if (!hasUnlockedScrollRef.current) {
        hasUnlockedScrollRef.current = true;
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }, 1500);
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            revealHeadline={revealHeadline}
            revealButton={revealButton}
          />
        );
      case 'shop':
      case 'categories':
      case 'category-view':
        // Category browsing now seamlessly lives inside the ShopPage
        return <ShopPage />;
      case 'preorders':
        return <PreordersPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'product-details':
        return <ProductDetailsPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'account':
        return <AccountPage />;
      default:
        return (
          <HomePage
            revealHeadline={revealHeadline}
            revealButton={revealButton}
          />
        );
    }
  };

  // Only the Home page starts with the floating hero video at the very top.
  // Other pages (Shop, Preorders, Account, Wishlist) must start below the sticky header.
  const isHomePage = currentPage === 'home';

  return (
    <div className="relative min-h-screen bg-[#08090b] text-[#e2e8f0]">
      {/* 1. Cinematic Video Layer: Two separate video elements (Intro: single play, Background: continuous loop) */}
      <CinematicIntro onIntroEnd={handleIntroEnd} />

      {/* 2. Main Website Experience (Revealed progressively after intro video ends) */}
      <div
        id="scalex-main-website"
        className={`relative z-10 flex flex-col min-h-screen text-[#e2e8f0] transition-opacity duration-700 ease-out ${
          isWebsiteRevealed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Floating Top Navigation (At top of hero: uncontained floating; On scroll or non-home: glassy sticky header) */}
        <Navbar
          isRevealed={isWebsiteRevealed}
          revealLogo={revealLogo}
          revealNav={revealNav}
          revealActions={revealActions}
        />

        {/* 
          Main Content Area:
          - On the Home page, content starts at top=0 because the Hero video overlay sits directly beneath the floating nav.
          - On all other pages (Shop, Preorders, etc.), content is cleanly padded with pt-24 sm:pt-28 so it begins cleanly below the header bar without overlapping or being hidden behind the sticky header.
        */}
        <main className={`flex-1 relative z-10 ${isHomePage ? '' : 'pt-24 sm:pt-28'}`}>
          {renderCurrentPage()}
        </main>

        {/* Global Footer */}
        <div className="relative z-10 bg-[#08090b]">
          <Footer />
        </div>

        {/* Interactive Overlays */}
        <CartDrawer />
        <SearchOverlay />
        <CheckoutModal />
        <ToastContainer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary fallbackTitle="ScaleX Showroom">
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </ErrorBoundary>
  );
}
