import React from 'react';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ComingSoonSection } from '../components/ComingSoonSection';

export const ProductDetailsPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="min-h-screen bg-[#0b0c10] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-mono-spec text-zinc-400 hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Store Status</span>
        </button>
      </div>

      <ComingSoonSection
        title="Collection In Preparation"
        eyebrow="Individual Listings Coming Soon"
        headline="ScaleX is getting ready to launch its first collection."
        supportingText="Our catalog and individual casting specifications are currently being prepared. Stay tuned for upcoming die-cast releases."
        plannedHighlights={[
          'Detailed Casting Specs',
          'Scale Accuracy (1:64 Focus)',
          'High-Fidelity Packaging',
          'Collector Release Alerts'
        ]}
      />
    </div>
  );
};
