import React, { useState } from 'react';
import { Mail, Check, Bell } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PreordersPage: React.FC = () => {
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
    <div className="min-h-screen bg-[#08090b] py-16 sm:py-24 px-4 sm:px-6 lg:px-8" id="preorders-page">
      {/* Background Graphic Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-red-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111317] border border-[#292c32] mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
          <span className="text-[11px] font-mono-spec uppercase tracking-widest text-zinc-300 font-medium">
            ScaleX Collector Store
          </span>
        </div>

        {/* Display: PREORDERS / COMING SOON */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
          PREORDERS
        </h1>

        <h2 className="mt-2 text-xl sm:text-2xl font-mono-spec font-bold text-[#e11d48] uppercase tracking-widest">
          COMING SOON
        </h2>

        {/* Text */}
        <p className="mt-6 text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-lg mx-auto">
          Upcoming releases will appear here once preorder details are available.
        </p>

        {/* Preorder alert form */}
        <div className="mt-10 p-6 rounded-xl bg-[#111317] border border-[#292c32] max-w-md mx-auto shadow-2xl">
          <div className="flex items-center justify-center gap-2 text-xs font-mono-spec text-zinc-300 mb-3">
            <Bell className="w-3.5 h-3.5 text-[#e11d48]" />
            <span className="font-semibold uppercase tracking-wider">Preorder Notifications</span>
          </div>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 p-3 rounded bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 text-xs font-mono-spec">
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
            No spam. We will only alert you when genuine preorder allocations open.
          </span>
        </div>
      </div>
    </div>
  );
};
