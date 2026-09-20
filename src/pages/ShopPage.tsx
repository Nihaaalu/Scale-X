import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';

export const ShopPage: React.FC = () => {
  const { selectedCategorySlug, addToast } = useStore();
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(
    selectedCategorySlug || CATEGORIES[0].slug
  );
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) return;
    setIsSubmitted(true);
    addToast(
      'Notification Saved',
      'success',
      "You'll be the first to know when ScaleX collections go live."
    );
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#08090b] pb-24" id="shop-page">
      {/* Category Navigation / Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-[11px] font-mono-spec uppercase tracking-widest text-[#e11d48] font-semibold mb-1">
                Category Navigation
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                Browse Collections
              </h2>
            </div>
            <span className="text-xs font-mono-spec text-zinc-400">
              Select a series to preview planned allocations
            </span>
          </div>

          {/* Category Selector Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pt-6 pb-2">
            {CATEGORIES.map((cat) => {
              const isSelected = cat.slug === activeCategorySlug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategorySlug(cat.slug)}
                  type="button"
                  className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono-spec font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-white text-zinc-950 border-white shadow-lg'
                      : 'bg-[#111317] text-zinc-400 hover:text-white border-[#292c32] hover:border-zinc-600'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-5 h-5 object-contain"
                  />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimal Centered Coming Soon Section with Email Notification Form */}
        <div className="py-20 sm:py-28 flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111317] border border-[#292c32] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
            <span className="text-[10px] font-mono-spec uppercase tracking-widest text-zinc-400 font-medium">
              ScaleX Catalog
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            COMING SOON
          </h3>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light max-w-md">
            Be the first to know when ScaleX collections go live.
          </p>

          {/* Clean Email Notification Form */}
          <div className="mt-8 w-full">
            {isSubmitted ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-mono-spec">
                ✓ You&apos;re on the list! We&apos;ll notify you when collections launch.
              </div>
            ) : (
              <form
                onSubmit={handleNotifySubmit}
                className="flex flex-col sm:flex-row items-center gap-2.5 w-full"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full sm:flex-1 bg-[#111317] border border-[#292c32] rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e11d48] font-mono-spec transition-colors"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-mono-spec font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer shrink-0 active:scale-98 shadow-md"
                >
                  NOTIFY ME
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
