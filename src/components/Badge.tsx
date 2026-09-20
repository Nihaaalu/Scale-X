import React from 'react';
import { ProductStatus } from '../types';

interface BadgeProps {
  status?: ProductStatus | string;
  variant?: 'status' | 'scale' | 'brand' | 'category';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status = 'New', variant = 'status', className = '' }) => {
  if (variant === 'scale') {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-mono-spec font-medium tracking-wider bg-zinc-900/90 text-zinc-300 border border-zinc-700/80 backdrop-blur-md rounded ${className}`}>
        {status}
      </span>
    );
  }

  if (variant === 'brand') {
    return (
      <span className={`inline-flex items-center text-[11px] font-semibold uppercase tracking-wider text-zinc-400 ${className}`}>
        {status}
      </span>
    );
  }

  // Status variants
  let badgeColor = 'bg-zinc-800 text-zinc-200 border-zinc-700';

  switch (status) {
    case 'New':
      badgeColor = 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 shadow-sm shadow-emerald-950';
      break;
    case 'Limited':
      badgeColor = 'bg-amber-950/80 text-amber-300 border-amber-700/60 shadow-sm shadow-amber-950';
      break;
    case 'Preorder':
      badgeColor = 'bg-red-950/80 text-red-300 border-red-700/60 shadow-sm shadow-red-950';
      break;
    case 'Best Seller':
      badgeColor = 'bg-rose-950/80 text-rose-300 border-rose-700/60 shadow-sm shadow-rose-950';
      break;
    case 'Out of Stock':
      badgeColor = 'bg-zinc-900 text-zinc-500 border-zinc-800';
      break;
    default:
      badgeColor = 'bg-zinc-800/90 text-zinc-300 border-zinc-700';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase rounded-sm border backdrop-blur-sm ${badgeColor} ${className}`}>
      {status}
    </span>
  );
};
