import React from 'react';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#08090b] text-white pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111317] border border-[#292c32] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
          <span className="text-[11px] font-mono-spec uppercase tracking-widest text-zinc-400 font-medium">
            Collector Community
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
          Contact Us
        </h1>

        {/* Informative description explaining connection purposes */}
        <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
          Connect with ScaleX for store updates, upcoming releases, preorder announcements, and general collector inquiries.
        </p>

        {/* Two Balanced Contact Blocks / Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* INSTAGRAM BLOCK */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111317] border border-[#292c32] flex flex-col justify-between hover:border-zinc-700 transition-colors shadow-xl">
            <div>
              <div className="text-xs font-mono-spec uppercase tracking-widest text-[#e11d48] font-semibold mb-2">
                Official Channel
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                INSTAGRAM
              </h2>
              <p className="mt-3 text-sm text-zinc-400 font-light leading-relaxed">
                Follow ScaleX for updates, new arrivals, and announcements.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#292c32]">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-zinc-200 text-zinc-950 font-mono-spec font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200 text-center shadow-md active:scale-98 cursor-pointer"
              >
                INSTAGRAM
              </a>
            </div>
          </div>

          {/* WHATSAPP COMMUNITY BLOCK */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111317] border border-[#292c32] flex flex-col justify-between hover:border-zinc-700 transition-colors shadow-xl">
            <div>
              <div className="text-xs font-mono-spec uppercase tracking-widest text-[#e11d48] font-semibold mb-2">
                Community Group
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                WHATSAPP COMMUNITY
              </h2>
              <p className="mt-3 text-sm text-zinc-400 font-light leading-relaxed">
                Join the ScaleX collector community for updates and release notifications.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#292c32]">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-[#181b22] hover:bg-[#20242e] text-white border border-[#292c32] hover:border-zinc-500 font-mono-spec font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200 text-center shadow-md active:scale-98 cursor-pointer"
              >
                WHATSAPP GROUP
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
