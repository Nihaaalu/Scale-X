import React, { useState } from 'react';
import { Check, Mail, Bell } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PreordersSection: React.FC = () => {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    addToast('Added to Preorder Notifications', 'success', 'We will alert you when initial preorders go live.');
    setEmail('');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#08090b] border-y border-[#292c32] relative overflow-hidden" id="preorders-section">
      {/* Subtle Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-[240px] sm:h-[300px] bg-red-600/[0.025] rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111317] border border-[#292c32] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
          <span className="text-[11px] font-mono-spec font-medium uppercase tracking-widest text-zinc-300">
            ScaleX Releases
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
          PREORDERS
        </h2>

        <div className="mt-1 text-sm font-mono-spec font-bold text-[#e11d48] uppercase tracking-widest">
          COMING SOON
        </div>

        {/* Supporting Message */}
        <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
          Upcoming releases will appear here once preorder details are available.
        </p>

        {/* Preorder alert form */}
        <div className="mt-8 max-w-md mx-auto">
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 text-xs font-mono-spec">
              <Check className="w-4 h-4" />
              <span>You're on the preorder notification list.</span>
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
                  placeholder="Enter email for preorder alerts..."
                  className="w-full pl-9 pr-3 py-2.5 bg-[#111317] border border-[#292c32] rounded text-xs text-zinc-100 placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-zinc-500"
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
        </div>
      </div>
    </section>
  );
};
