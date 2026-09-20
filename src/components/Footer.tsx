import React from 'react';
import { PackageCheck, Crosshair } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ScaleXLogo } from './ScaleXLogo';

export const Footer: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <footer className="bg-[#08090b] border-t border-[#292c32] text-zinc-400 text-xs" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <ScaleXLogo variant="footer" />
            </div>

            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              ScaleX is an independent specialty store preparing to offer curated die-cast model cars and scale editions from established brands for collectors and enthusiasts.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-[11px] font-mono-spec text-zinc-400">
              <span className="flex items-center gap-1.5">
                <PackageCheck className="w-3.5 h-3.5 text-[#e11d48]" /> Carefully Packed Shipments
              </span>
              <span className="flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-[#e11d48]" /> Dedicated to Die-Cast Hobbyists
              </span>
            </div>
          </div>

          {/* Store Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">
              Store
            </h4>
            <ul className="space-y-2 font-mono-spec text-xs">
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Shop Status (Coming Soon)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Explore Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('preorders')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Preorders Coming Soon
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Launch Preparation
                </button>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">
              Help & Support
            </h4>
            <ul className="space-y-2 font-mono-spec text-xs">
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Store Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Packaging Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Collector FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 font-mono-spec text-xs">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  About ScaleX
                </button>
              </li>
              <li>
                <a
                  href="#instagram"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors block cursor-pointer"
                >
                  Instagram @ScaleXStore
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#292c32] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-spec text-zinc-500">
          <p>© 2026 ScaleX. All rights reserved.</p>
          <p className="text-zinc-500 text-center sm:text-right">
            ScaleX is an independent retailer preparing for launch. Brand names and trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};
