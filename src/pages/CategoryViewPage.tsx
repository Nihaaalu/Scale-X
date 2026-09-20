import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, Mail, Check, Bell } from 'lucide-react';

export const CategoryViewPage: React.FC = () => {
  const { selectedCategorySlug, navigateTo, addToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Find category object or fallback
  const category = CATEGORIES.find((c) => c.slug === selectedCategorySlug) || CATEGORIES[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    addToast(
      `Subscribed to ${category.name} alerts`,
      'success',
      `We'll email you when our first ${category.name} models arrive.`
    );
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#08090b] pb-20" id="category-view-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Back navigation */}
        <button
          onClick={() => navigateTo('categories')}
          className="inline-flex items-center gap-2 text-xs font-mono-spec text-zinc-400 hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ALL CATEGORIES</span>
        </button>

        {/* Category Showcase Card with Supplied Asset */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#111317] border border-[#292c32] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Category Info */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08090b] border border-[#292c32] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
                <span className="text-[10px] font-mono-spec uppercase tracking-widest text-zinc-300 font-medium">
                  COMING SOON
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
                {category.name}
              </h1>

              <p className="mt-4 text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-xl">
                {category.description}
              </p>

              {/* Highlights */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {category.featuredHighlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-2.5 py-1 rounded bg-[#08090b] border border-[#292c32] text-[11px] font-mono-spec text-zinc-400"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* Supplied Asset Showcase Frame */}
            <div className="lg:col-span-5 flex items-center justify-center p-8 rounded-xl bg-[#08090b] border border-[#292c32] min-h-[220px]">
              <img
                src={category.image}
                alt={category.name}
                className="max-h-36 max-w-[85%] object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        </div>

        {/* Category Notification Block */}
        <div className="mt-8 p-8 sm:p-10 rounded-2xl bg-[#111317] border border-[#292c32] text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08090b] border border-[#292c32] text-zinc-300 text-xs font-mono-spec mb-4">
            <Bell className="w-3.5 h-3.5 text-[#e11d48]" />
            <span>Category Launch In Preparation</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            The {category.name} collection is coming soon.
          </h2>

          <p className="mt-3 text-sm text-zinc-400 font-light max-w-lg mx-auto leading-relaxed">
            We are curating casting lines and preparing store allocations for this series. Subscribe below to be notified the moment models in this category become available.
          </p>

          {/* Subscribe Form */}
          <div className="mt-8 max-w-md mx-auto">
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 text-xs font-mono-spec">
                <Check className="w-4 h-4" />
                <span>You'll be notified when {category.name} models launch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for category alerts..."
                    className="w-full pl-9 pr-3 py-2.5 bg-[#08090b] border border-[#292c32] rounded text-xs text-zinc-100 placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-colors active:scale-[0.98] cursor-pointer shrink-0"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
