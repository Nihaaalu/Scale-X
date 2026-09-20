import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Category } from '../types';
import { useStore } from '../context/StoreContext';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, className = '' }) => {
  const { navigateTo } = useStore();

  const handleClick = () => {
    navigateTo('category-view', { categorySlug: category.slug });
  };

  return (
    <div
      onClick={handleClick}
      id={`category-card-${category.slug}`}
      className={`group relative flex flex-col justify-between p-6 rounded-xl bg-[#111317] border border-[#292c32] hover:border-red-600/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-black/60 active:scale-[0.99] ${className}`}
    >
      {/* Top Bar: COMING SOON Badge & Status */}
      <div className="flex items-center justify-between z-10 mb-4">
        <span className="px-2.5 py-1 rounded text-[10px] font-mono-spec font-medium uppercase tracking-widest bg-[#08090b] text-zinc-300 border border-[#292c32] group-hover:border-red-950/80 group-hover:text-white transition-colors">
          COMING SOON
        </span>
        <span className="w-2 h-2 rounded-full bg-[#292c32] group-hover:bg-[#e11d48] transition-colors" />
      </div>

      {/* Center: Supplied Category Image Asset */}
      <div className="my-3 flex items-center justify-center py-4 px-2 min-h-[150px] relative overflow-hidden">
        {/* Subtle radial glow highlight behind asset */}
        <div className="absolute inset-0 bg-radial from-white/[0.03] to-transparent rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="max-h-24 sm:max-h-28 max-w-[82%] object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] transform transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-105"
        />
      </div>

      {/* Bottom Content Area */}
      <div className="mt-4 pt-4 border-t border-[#292c32]/80 flex flex-col z-10">
        <h3 className="text-lg sm:text-xl font-heading font-bold text-white tracking-tight group-hover:text-white transition-colors">
          {category.name}
        </h3>

        <p className="mt-1.5 text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {category.shortDescription}
        </p>

        {/* Explore → Action with Red Accent on Hover */}
        <div className="mt-4 flex items-center gap-1.5 text-xs font-mono-spec font-semibold text-zinc-400 group-hover:text-[#e11d48] transition-colors">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};
