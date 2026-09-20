import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionText?: string;
  onActionClick?: () => void;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  actionText,
  onActionClick,
  align = 'left',
  className = ''
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12 ${align === 'center' ? 'text-center md:text-center md:items-center' : ''} ${className}`}>
      <div className={align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}>
        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]"></span>
            <span className="text-[11px] font-mono-spec font-medium uppercase tracking-widest text-zinc-400">
              {eyebrow}
            </span>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionText && onActionClick && (
        <button
          onClick={onActionClick}
          className="group inline-flex items-center gap-1.5 text-xs font-mono-spec font-bold tracking-wider uppercase text-zinc-300 hover:text-white transition-colors duration-200 self-start md:self-end pb-1 border-b border-[#292c32] hover:border-[#e11d48] cursor-pointer"
        >
          <span>{actionText}</span>
          <span className="transform transition-transform duration-200 group-hover:translate-x-1 text-[#e11d48]">→</span>
        </button>
      )}
    </div>
  );
};
