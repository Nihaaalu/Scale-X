import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const ChildhoodSection: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#08090b] border-b border-[#292c32]" id="brand-story-section">
      {/* Precision radial lighting accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#111317] border border-[#292c32] relative overflow-hidden shadow-2xl">
          {/* Subtle Red Top Edge Pinstripe Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e11d48] to-transparent opacity-80" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]"></span>
            <span className="text-[11px] font-mono-spec font-medium uppercase tracking-widest text-zinc-400">
              The ScaleX Ethos
            </span>
          </div>

          {/* Core Message Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight leading-[1.2]">
            “Some things from childhood deserve a place in adulthood.”
          </h2>

          {/* Supporting Copy */}
          <p className="mt-6 text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-2xl">
            Whether you keep a model sealed, open it, display it, or simply enjoy having it around, collecting is about the memories attached to the cars.
          </p>

          <div className="mt-8 flex items-center gap-4 justify-center sm:justify-start">
            <button
              onClick={() => navigateTo('categories')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-all active:scale-[0.98] cursor-pointer"
              id="brand-story-explore-btn"
            >
              <span>EXPLORE COLLECTIONS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
