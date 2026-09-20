import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroProps {
  revealHeadline?: boolean;
  revealButton?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  revealHeadline = true,
  revealButton = true,
}) => {
  const { navigateTo } = useStore();

  return (
    <section
      id="hero-section"
      className="relative min-h-[100dvh] h-screen w-full flex flex-col items-center justify-center bg-transparent select-none px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
        {/* Main Headline: Centered Horizontally & Vertically */}
        <h1
          className={`text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-heading font-extrabold text-white tracking-tight leading-[1.08] text-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] transition-all duration-800 ease-out ${
            revealHeadline
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[15px]'
          }`}
        >
          Your Next Scale<br />
          Model Awaits.
        </h1>

        {/* Explore Collections Button: Centered Horizontally Directly Below Headline */}
        <div
          className={`mt-8 sm:mt-10 flex justify-center transition-all duration-800 ease-out ${
            revealButton
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[15px]'
          }`}
        >
          <button
            onClick={() => navigateTo('categories')}
            id="hero-explore-collections-btn"
            className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-mono-spec font-bold text-xs uppercase tracking-[0.2em] rounded border border-white/25 hover:border-white/50 backdrop-blur-md transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(225,29,72,0.35)] active:scale-[0.98] cursor-pointer"
          >
            <span>EXPLORE COLLECTIONS</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:text-[#e11d48] group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </section>
  );
};
