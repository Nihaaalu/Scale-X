import React, { useState } from 'react';
import { Mail, Check, Bell } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Newsletter: React.FC = () => {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    addToast('Subscribed to ScaleX Collector Bulletin', 'success', 'You will receive priority launch alerts.');
    setEmail('');
  };

  return (
    <section className="py-16 bg-[#08090b] border-b border-[#292c32]" id="newsletter-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#111317] border border-[#292c32] flex items-center justify-center text-[#e11d48] mx-auto mb-4">
          <Bell className="w-5 h-5" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
          Stay in the Loop
        </h2>
        <p className="mt-2 text-sm text-zinc-400 font-light max-w-md mx-auto">
          Get notified when our first 1:64 scale selection and upcoming preorder drops go live.
        </p>

        {subscribed ? (
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-mono-spec">
            <Check className="w-4 h-4" />
            <span>You're on the priority notification roster.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address..."
                className="w-full pl-10 pr-4 py-3 bg-[#111317] border border-[#292c32] rounded text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono-spec transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-colors active:scale-[0.98] cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        <span className="block mt-3 text-[11px] font-mono-spec text-zinc-500">
          No marketing spam. Only launch and preorder updates.
        </span>
      </div>
    </section>
  );
};
