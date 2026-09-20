import React from 'react';
import { CATEGORIES } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';
import { SectionHeader } from '../components/SectionHeader';

export const CategoriesOverviewPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#08090b] py-12 sm:py-16" id="categories-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Planned Curation"
          title="Explore Categories"
          description="Collections currently being prepared for the ScaleX launch."
        />

        {/* Notice Banner */}
        <div className="mb-10 p-4 rounded-xl bg-[#111317] border border-[#292c32] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-spec">
          <div className="flex items-center gap-2.5 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
            <span>ScaleX is currently in pre-launch. All six categories represent planned collection lines.</span>
          </div>
          <span className="px-3 py-1 rounded bg-[#08090b] border border-[#292c32] text-zinc-300 text-[11px] uppercase tracking-wider">
            COMING SOON
          </span>
        </div>

        {/* 3x2 on desktop, 2x3 on tablet, 1x6 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};
