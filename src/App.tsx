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

  // Staggered reveal states for hero elements (over ~5 seconds after 4s initial delay)
  // 1. Heading
  const [revealHeadline, setRevealHeadline] = useState(false);
  // 2. Logo
  const [revealLogo, setRevealLogo] = useState(false);
  // 3. Navigation Tabs (one-by-one)
  const [revealedNavTabs, setRevealedNavTabs] = useState<{ [key: string]: boolean }>({
    home: false,
    about: false,
    shop: false,
    preorders: false,
    contact: false,
  });
  // 4. Icons (Account, then Cart)
  const [revealAccountIcon, setRevealAccountIcon] = useState(false);
  const [revealCartIcon, setRevealCartIcon] = useState(false);
  // 5. CTA Button
  const [revealButton, setRevealButton] = useState(false);
  // 6. Fade background to black after all elements settled + 1s wait
  const [fadeBackgroundToBlack, setFadeBackgroundToBlack] = useState(false);

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

  // When intro reaches 4s mark:
  // After 4s delay, spread the entire UI reveal across ~5 seconds:
  // 1. First: Hero Heading (at 0ms)
  // 2. Next: Logo (at 600ms)
  // 3. Next: Nav Tabs one-by-one:
  //    - HOME (at 1200ms)
  //    - ABOUT (at 1700ms)
  //    - SHOP (at 2200ms)
  //    - PREORDERS (at 2700ms)
  //    - CONTACT US (at 3200ms)
  // 4. Next: Icons:
  //    - Account icon (at 3700ms)
  //    - Cart icon (at 4200ms)
  // 5. Finally: CTA Button ("EXPLORE COLLECTIONS →") (at 4800ms)
  // -> Unlock scroll (at 5200ms)
  const handleIntroEnd = useCallback(() => {
    // 0. Container becomes active
    setIsWebsiteRevealed(true);

    // 1. First: HERO HEADING
    setTimeout(() => {
      setRevealHeadline(true);
    }, 100);

    // 2. Next: LOGO
    setTimeout(() => {
      setRevealLogo(true);
    }, 700);

    // 3. Next: NAVIGATION TABS (One by one)
    // HOME
    setTimeout(() => {
      setRevealedNavTabs((prev) => ({ ...prev, home: true }));
    }, 1300);

    // ABOUT
    setTimeout(() => {
      setRevealedNavTabs((prev) => ({ ...prev, about: true }));
    }, 1800);

    // SHOP
    setTimeout(() => {
      setRevealedNavTabs((prev) => ({ ...prev, shop: true }));
    }, 2300);

    // PREORDERS
    setTimeout(() => {
      setRevealedNavTabs((prev) => ({ ...prev, preorders: true }));
    }, 2800);

    // CONTACT US
    setTimeout(() => {
      setRevealedNavTabs((prev) => ({ ...prev, contact: true }));
    }, 3300);

    // 4. Next: ICONS
    // Account icon
    setTimeout(() => {
      setRevealAccountIcon(true);
    }, 3800);

    // Cart icon
    setTimeout(() => {
      setRevealCartIcon(true);
    }, 4300);

    // 5. Finally: CTA BUTTON ("EXPLORE COLLECTIONS →")
    setTimeout(() => {
      setRevealButton(true);
    }, 4850);

    // 6. After the FINAL element has completely appeared (4850ms + 1200ms = 6050ms):
    //    Wait exactly 1 second (1000ms), during which everything remains fully visible and settled.
    //    At 7050ms, fade the BACKGROUND to black over exactly 2 seconds (2000ms).
    setTimeout(() => {
      setFadeBackgroundToBlack(true);
    }, 7050);

    // Unlock page scroll cleanly once sequence and background fade complete
    setTimeout(() => {
      if (!hasUnlockedScrollRef.current) {
        hasUnlockedScrollRef.current = true;
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }, 9100);
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

  const isHomePage = currentPage === 'home';

  return (
    <div className="relative min-h-screen bg-[#08090b] text-[#e2e8f0]">
      {/* 1. Cinematic Video Layer */}
      <CinematicIntro
        onIntroEnd={handleIntroEnd}
        fadeToBlack={fadeBackgroundToBlack}
      />

      {/* 2. Main Website Experience (Progressively revealed over ~5s after 4s initial delay) */}
      <div
        id="scalex-main-website"
        className={`relative z-10 flex flex-col min-h-screen w-full max-w-full text-[#e2e8f0] transition-opacity duration-[1200ms] ease-out ${
          isWebsiteRevealed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Floating Top Navigation */}
        <Navbar
          isRevealed={isWebsiteRevealed}
          revealLogo={revealLogo}
          revealedNavTabs={revealedNavTabs}
          revealAccountIcon={revealAccountIcon}
          revealCartIcon={revealCartIcon}
        />

        {/* Main Content Area */}
        <main className={`flex-1 relative z-10 w-full max-w-full ${isHomePage ? '' : 'pt-24 sm:pt-28'}`}>
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
