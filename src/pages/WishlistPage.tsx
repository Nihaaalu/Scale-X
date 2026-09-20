import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ArrowLeft } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, navigateTo } = useStore();

  return (
    <div className="min-h-screen bg-[#0b0c10] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-6 border-b border-zinc-800 mb-8">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 text-xs font-mono-spec text-zinc-400 hover:text-white transition-colors mb-3 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Collector Wishlist
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono-spec bg-zinc-900 text-zinc-400 rounded border border-zinc-800">
              {wishlistProducts.length} Saved
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-400 font-light">
            Bookmark your favorite models once our first collection launches.
          </p>
        </div>

        {/* Empty State / Pre-launch information */}
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-zinc-950/40 border border-zinc-850 rounded-xl">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-heading font-bold text-white">Your Wishlist is Empty</h2>
          <p className="mt-2 text-sm text-zinc-400 font-light max-w-sm leading-relaxed">
            ScaleX is getting ready to launch its first collection. Once models and preorder allocations are released, you'll be able to bookmark them here.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="mt-6 px-6 py-3 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            Check Store Launch Status
          </button>
        </div>
      </div>
    </div>
  );
};
