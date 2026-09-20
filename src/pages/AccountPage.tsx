import React, { useState } from 'react';
import { User, Sparkles, ArrowLeft, Mail, Check, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountPage: React.FC = () => {
  const { navigateTo, addToast } = useStore();
  const [email, setEmail] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    addToast('Message Received', 'success', 'Thank you for reaching out to ScaleX. We will reply shortly.');
    setEmail('');
    setInquiry('');
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-mono-spec text-zinc-400 hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </button>

        {/* Main Card */}
        <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-8 sm:p-12 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-zinc-300 mb-6">
            <User className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 text-zinc-400 text-xs font-mono-spec border border-zinc-800 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Collector Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
            Account features are coming soon.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-xl">
            We are preparing the ScaleX collector dashboard where you will be able to manage preorder notifications, track upcoming release alerts, and view your orders once our store opens.
          </p>

          {/* Planned Features Teaser */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-850">
            <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
              <span className="text-xs font-mono-spec font-bold text-white block mb-1">
                Preorder Dashboard
              </span>
              <p className="text-[11px] text-zinc-400 font-light">
                Monitor scheduled releases, target ship dates, and tracking numbers in one place.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
              <span className="text-xs font-mono-spec font-bold text-white block mb-1">
                Release Alerts
              </span>
              <p className="text-[11px] text-zinc-400 font-light">
                Customize email notifications for your favorite scale model categories and castings.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
              <span className="text-xs font-mono-spec font-bold text-white block mb-1">
                Collector Support
              </span>
              <p className="text-[11px] text-zinc-400 font-light">
                Direct communication with our team regarding model availability and order status.
              </p>
            </div>
          </div>

          {/* Direct Collector Inquiries */}
          <div className="mt-10 p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
            <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-zinc-400" />
              <span>Contact Store Team</span>
            </h3>
            <p className="text-xs text-zinc-400 font-light mb-4">
              Have questions about upcoming releases, specific scale castings, or our store launch? Send us a note.
            </p>

            {sent ? (
              <div className="p-3.5 rounded bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs font-mono-spec flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Thank you! Your message has been received. We will get back to you soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address..."
                    className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-100 placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  placeholder="Your question or casting inquiry..."
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-100 placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-zinc-500 resize-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
