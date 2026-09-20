import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Heart, ShoppingBag, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = 'text-emerald-400';

        if (toast.type === 'wishlist') {
          Icon = Heart;
          iconColor = 'text-rose-400 fill-rose-400';
        } else if (toast.type === 'cart') {
          Icon = ShoppingBag;
          iconColor = 'text-zinc-200';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = 'text-red-400';
        }

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 p-3.5 rounded-lg bg-zinc-950/95 border border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200"
          >
            {toast.image ? (
              <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 p-1 shrink-0 flex items-center justify-center">
                <img src={toast.image} alt="" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="shrink-0">
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{toast.message}</p>
              {toast.subtext && (
                <p className="text-[11px] font-mono-spec text-zinc-400 truncate">{toast.subtext}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-zinc-500 hover:text-zinc-300 rounded transition-colors shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
