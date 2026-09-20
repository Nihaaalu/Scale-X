import React from 'react';
import { PackageCheck, Crosshair, Sparkles, HelpCircle } from 'lucide-react';

export const WhyScaleX: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Curated Models',
      description: 'A thoughtful selection of iconic castings, racing legends, and enthusiast favorites from popular die-cast brands.'
    },
    {
      icon: PackageCheck,
      title: 'Carefully Packed',
      description: 'Shipped in rigid outer boxes with proper interior cushioning so cards and packaging arrive in collector condition.'
    },
    {
      icon: Crosshair,
      title: 'Collector Focused',
      description: 'Built for scale hobbyists, display enthusiasts, and anyone who appreciates automotive details and die-cast design.'
    },
    {
      icon: HelpCircle,
      title: 'Reliable Experience',
      description: 'Straightforward order tracking, prompt customer support, and honest communication from die-cast fans like you.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#08090b] border-b border-[#292c32]" id="why-scalex-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
            <span className="text-[11px] font-mono-spec font-medium uppercase tracking-widest text-zinc-400">
              About The Store
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Built for Die-Cast Enthusiasts
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#111317] border border-[#292c32] hover:border-zinc-700 transition-all duration-300 flex flex-col group shadow-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-[#08090b] border border-[#292c32] flex items-center justify-center text-zinc-400 group-hover:text-[#e11d48] group-hover:border-red-950 transition-colors mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-bold text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
