import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryLogoShowcase } from '../components/CategoryLogoShowcase';
import { WhyScaleX } from '../components/WhyScaleX';
import { ChildhoodSection } from '../components/ChildhoodSection';
import { Newsletter } from '../components/Newsletter';

interface HomePageProps {
  revealHeadline?: boolean;
  revealButton?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  revealHeadline = true,
  revealButton = true,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* 1. Cinematic Hero Section with Translucent Darkened Video Backdrop */}
      <Hero
        revealHeadline={revealHeadline}
        revealButton={revealButton}
      />

      {/* Subsequent Sections with Solid Deep Neutral Background (#08090b) */}
      <div className="relative z-10 bg-[#08090b] shadow-[0_-30px_60px_rgba(8,9,11,0.9)]">
        {/* 2. Horizontal Category Logo Showcase / Marquee */}
        <CategoryLogoShowcase />

        {/* 3. Brand Value Pillars */}
        <WhyScaleX />

        {/* 4. Editorial Story Section */}
        <ChildhoodSection />

        {/* 5. Collector Updates Newsletter */}
        <Newsletter />
      </div>
    </div>
  );
};
