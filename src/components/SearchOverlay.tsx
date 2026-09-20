import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Global key listener for Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  // Filter planned categories and themes by search query
  const trimmed = query.trim().toLowerCase();
  const matchingCategories = CATEGORIES.filter((c) => {
    if (!trimmed) return true;
    return (
      c.name.toLowerCase().includes(trimmed) ||
      c.description.toLowerCase().includes(trimmed) ||
      c.featuredHighlights.some((h) => h.toLowerCase().includes(trimmed))
    );
  });

  const handleSelectCategory = (categorySlug: string) => {
    setIsSearchOpen(false);
    navigateTo('category-view', { categorySlug });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-200"
      />

      <div className="relative min-h-screen flex items-start justify-center pt-16 sm:pt-24 px-4 pb-8">
        <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Search Bar Input */}
          <div className="relative flex items-center px-4 border-b border-zinc-800 bg-zinc-900/60">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search planned series and categories (e.g. Hot Wheels, Mini GT, Kaido House)..."
              className="w-full py-4 px-3 bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none font-mono-spec"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-zinc-500 hover:text-zinc-300 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-zinc-800 text-[10px] font-mono-spec text-zinc-500">
              <span className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">ESC</span>
            </div>
          </div>

          {/* Pre-launch notification notice */}
          <div className="px-4 py-2.5 bg-zinc-900/40 border-b border-zinc-850 flex items-center justify-between text-xs font-mono-spec text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              ScaleX is in pre-launch. Showing planned collection categories.
            </span>
            <span className="text-zinc-300 font-semibold">Store Coming Soon</span>
          </div>

          {/* Results: Planned Series */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
            <div className="text-[11px] font-mono-spec uppercase tracking-wider text-zinc-500 px-2 mb-2">
              {trimmed ? `Planned Categories (${matchingCategories.length})` : 'Explore Planned Series'}
            </div>

            {matchingCategories.length === 0 ? (
              <div className="py-12 text-center text-zinc-400 font-light text-sm">
                No planned series matched <strong className="text-white">"{query}"</strong>.
              </div>
            ) : (
              matchingCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleSelectCategory(category.slug)}
                  className="group flex items-center gap-3.5 p-3 rounded-lg hover:bg-zinc-900/80 border border-transparent hover:border-zinc-800 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 bg-zinc-900 rounded border border-zinc-800 shrink-0 overflow-hidden relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover filter brightness-[0.7] group-hover:scale-108 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-spec uppercase text-zinc-400">
                        COMING SOON
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white truncate">
                      {category.name}
                    </h4>
                    <span className="text-[11px] text-zinc-500 truncate block">
                      {category.shortDescription}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono-spec text-zinc-400 group-hover:text-white flex items-center gap-1">
                      <span>View Status</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
