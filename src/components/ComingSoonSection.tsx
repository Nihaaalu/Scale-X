import React, { useState } from 'react';
import { Mail, Check, Bell, ArrowLeft, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ComingSoonProps {
  title?: string;
  eyebrow?: string;
  headline?: string;
  supportingText?: string;
  plannedHighlights?: string[];
  showBackHome?: boolean;
}

export const ComingSoonSection: React.FC<ComingSoonProps> = ({
  title = 'COMING SOON',
  eyebrow = 'ScaleX Store In Preparation',
  headline = 'Something worth collecting is on the way.',
  supportingText = 'ScaleX is preparing its first selection of die-cast models. Stay tuned for upcoming drops.',
  plannedHighlights = ['1:64 Scale Specialty', 'Curated Die-Cast Drops', 'Carefully Packed Deliveries'],
  showBackHome = true
}) => {
  const { navigateTo, addToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    addToast('You’re on the launch notification list', 'success', 'We will email you the moment our first drop goes live.');
    setEmail('');
  };

  return (
    <div className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#08090b] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Graphic Accents (Zero random stock photos) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-red-600/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[350px] bg-zinc-800/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111317] border border-[#292c32] mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
          <span className="text-[11px] font-mono-spec uppercase tracking-widest text-zinc-300 font-medium">
            {eyebrow}
          </span>
        </div>

        {/* Large Coming Soon Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
          {title}
        </h1>

        {/* Subtitle / Headline */}
        <h2 className="mt-4 text-lg sm:text-xl font-heading font-semibold text-zinc-200 tracking-tight">
          {headline}
        </h2>

        {/* Supporting Copy */}
        <p className="mt-3 text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-lg mx-auto">
          {supportingText}
        </p>

        {/* Planned highlights */}
        {plannedHighlights.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {plannedHighlights.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md bg-[#111317] border border-[#292c32] text-xs font-mono-spec text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Stay Updated Email Form */}
        <div className="mt-10 p-6 rounded-xl bg-[#111317] border border-[#292c32] max-w-md mx-auto shadow-2xl">
          <div className="flex items-center justify-center gap-2 text-xs font-mono-spec text-zinc-300 mb-3">
            <Bell className="w-3.5 h-3.5 text-[#e11d48]" />
            <span className="font-semibold uppercase tracking-wider">Get Notified at Launch</span>
          </div>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 p-3 rounded bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 text-xs font-mono-spec">
              <Check className="w-4 h-4" />
              <span>You're on the early launch list.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for drop alert..."
                  className="w-full pl-9 pr-3 py-2.5 bg-[#08090b] border border-[#292c32] rounded text-xs text-zinc-100 placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-zinc-500"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-colors active:scale-[0.98] cursor-pointer shrink-0"
              >
                Notify Me
              </button>
            </form>
          )}

          <span className="block mt-2.5 text-[11px] font-mono-spec text-zinc-400">
            No spam. We will only message when inventory goes live.
          </span>
        </div>

        {/* Optional Back to Home Link */}
        {showBackHome && (
          <div className="mt-8">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 text-xs font-mono-spec text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Home</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
