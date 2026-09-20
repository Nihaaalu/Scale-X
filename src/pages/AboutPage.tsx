import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#08090b] text-white pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111317] border border-[#292c32] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
          <span className="text-[11px] font-mono-spec uppercase tracking-widest text-zinc-400 font-medium">
            ABOUT SCALEX
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
          Built for Collectors.
        </h1>

        {/* Copy */}
        <div className="mt-8 space-y-6 text-zinc-400 font-light text-base sm:text-lg leading-relaxed border-t border-[#292c32] pt-8">
          <p>
            ScaleX was started with one simple idea: make collecting easier by bringing everything collectors are looking for into one place.
          </p>
          <p>
            From everyday favorites to special collector pieces, ScaleX is built around the people who enjoy collecting, discovering, and displaying die-cast models.
          </p>
          <p>
            We are building ScaleX as a dedicated space for collectors, with more brands, models, and releases to come.
          </p>
        </div>

        {/* Information cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-[#292c32]">
          <div className="p-5 rounded-xl bg-[#111317] border border-[#292c32]">
            <span className="text-xs font-mono-spec uppercase tracking-widest text-[#e11d48] block mb-1">
              COLLECTOR FIRST
            </span>
            <span className="text-base font-bold text-white tracking-tight">
              Built for collectors.
            </span>
          </div>
          <div className="p-5 rounded-xl bg-[#111317] border border-[#292c32]">
            <span className="text-xs font-mono-spec uppercase tracking-widest text-[#e11d48] block mb-1">
              ONE PLACE
            </span>
            <span className="text-base font-bold text-white tracking-tight">
              Different models and brands, all in one place.
            </span>
          </div>
          <div className="p-5 rounded-xl bg-[#111317] border border-[#292c32]">
            <span className="text-xs font-mono-spec uppercase tracking-widest text-[#e11d48] block mb-1">
              COMING SOON
            </span>
            <span className="text-base font-bold text-white tracking-tight">
              More collections and releases are on the way.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
