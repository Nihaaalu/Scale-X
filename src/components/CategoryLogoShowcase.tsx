import React, { useRef, useEffect } from 'react';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';

export const CategoryLogoShowcase: React.FC = () => {
  const { navigateTo } = useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Interaction tracking: user manual dragging/swiping
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Filter out 'hot-wheels-team-transport' specifically from the Brands marquee
  // Kept: Hot Wheels, Hot Wheels RLC, Mini GT, Kaido House, CCA
  const brandCategories = CATEGORIES.filter(
    (cat) => cat.slug !== 'hot-wheels-team-transport'
  );

  // Continuous auto-scroll loop with requestAnimationFrame
  // CRITICAL REQUIREMENT: Auto-scroll must NEVER pause when mouse cursor enters or remains over the section.
  // Scrolling only pauses during active manual mouse dragging or touch swiping, and resumes immediately.
  useEffect(() => {
    let animationFrameId: number;
    const scrollSpeed = 0.55; // Pixels per frame - very slow, continuous linear movement

    const step = () => {
      const el = scrollContainerRef.current;
      if (el && !isDraggingRef.current) {
        // Half the total scroll width represents one full set of the duplicated items
        const halfWidth = el.scrollWidth / 2;
        el.scrollLeft += scrollSpeed;

        // Seamless infinite loop: when reaching the midpoint, silently wrap to start
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle category item click
  const handleCategoryClick = (categorySlug: string) => {
    // If the user was actively dragging/swiping, don't trigger the click
    if (hasMovedRef.current) return;
    navigateTo('shop', { categorySlug });
  };

  // Mouse / Pointer Drag Handlers (Manual dragging still allowed)
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftStartRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Drag sensitivity
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }
    el.scrollLeft = scrollLeftStartRef.current - walk;

    // Handle seamless infinite wrap during drag
    const halfWidth = el.scrollWidth / 2;
    if (el.scrollLeft >= halfWidth) {
      el.scrollLeft -= halfWidth;
      scrollLeftStartRef.current -= halfWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += halfWidth;
      scrollLeftStartRef.current += halfWidth;
    }
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      // Immediately allow auto-scroll to continue
      setTimeout(() => {
        hasMovedRef.current = false;
      }, 50);
    }
  };

  // Touch Handlers for Mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.touches[0].pageX - el.offsetLeft;
    scrollLeftStartRef.current = el.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }
    el.scrollLeft = scrollLeftStartRef.current - walk;

    const halfWidth = el.scrollWidth / 2;
    if (el.scrollLeft >= halfWidth) {
      el.scrollLeft -= halfWidth;
      scrollLeftStartRef.current -= halfWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += halfWidth;
      scrollLeftStartRef.current += halfWidth;
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 50);
  };

  // Duplicate items 4 times to ensure an uninterrupted, seamless horizontal loop across any screen size
  const displayItems = [
    ...brandCategories,
    ...brandCategories,
    ...brandCategories,
    ...brandCategories,
  ];

  return (
    <section
      id="brands-showcase-section"
      className="relative w-full py-10 sm:py-12 md:py-14 flex flex-col justify-center bg-[#08090b] border-y border-[#181a20] overflow-hidden select-none"
      aria-label="Brands Showcase"
    >
      {/* Subtle edge fade masks for seamless horizontal flow */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 md:w-40 bg-gradient-to-r from-[#08090b] via-[#08090b]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 md:w-40 bg-gradient-to-l from-[#08090b] via-[#08090b]/80 to-transparent z-10 pointer-events-none" />

      {/* Horizontal Scrollable Row (Vertically stacked items: Large Logo above Name, continuously auto-scrolling) */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex items-center gap-16 sm:gap-20 md:gap-28 lg:gap-32 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing px-8 sm:px-16 w-full py-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {displayItems.map((cat, idx) => (
          <button
            key={`${cat.id}-${idx}`}
            onClick={() => handleCategoryClick(cat.slug)}
            type="button"
            className="group shrink-0 flex flex-col items-center justify-center cursor-pointer focus:outline-none transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label={`Browse ${cat.name}`}
          >
            {/* Brand Logo Asset (~1.6x larger, preserved aspect ratio, visually dominant) */}
            <div className="h-20 sm:h-24 md:h-28 lg:h-32 flex items-center justify-center transition-all duration-300 opacity-90 group-hover:opacity-100 drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)]">
              <img
                src={cat.image}
                alt={cat.name}
                loading="eager"
                draggable={false}
                className="max-h-full max-w-[170px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[280px] object-contain select-none pointer-events-none filter drop-shadow-[0_6px_18px_rgba(0,0,0,0.85)]"
              />
            </div>

            {/* Desktop only: Brand Name (Directly underneath logo with increased vertical gap, clearly readable) */}
            <span className="hidden md:block mt-4 font-mono-spec font-medium text-xs lg:text-[13px] tracking-widest uppercase text-zinc-400 group-hover:text-zinc-200 transition-colors duration-200 text-center whitespace-nowrap">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
