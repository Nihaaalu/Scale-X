import React from 'react';

interface ScaleXLogoProps {
  className?: string;
  variant?: 'navbar' | 'mobile' | 'footer';
  alt?: string;
}

export const ScaleXLogo: React.FC<ScaleXLogoProps> = ({
  className = '',
  variant = 'navbar',
  alt = 'ScaleX'
}) => {
  // Target desktop width: ~150px (target 145–160px) with native ~3.5:1 ratio (43px height)
  // Target mobile width: ~122px (target 115–130px) with native ~3.5:1 ratio (35px height)
  const sizeClasses =
    variant === 'mobile'
      ? 'w-[122px] h-[35px]'
      : variant === 'footer'
      ? 'w-[160px] h-[46px]'
      : 'w-[122px] sm:w-[150px] h-[35px] sm:h-[43px]';

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center shrink-0 select-none ${sizeClasses} ${className}`}
      title="ScaleX"
    >
      {/*
        The uploaded logo is a 1254x1254 square PNG containing horizontal ScaleX artwork
        centered at 54% vertical position with ~3.5:1 aspect ratio.
        With object-cover and object-position: center 54%, the square image frames the
        horizontal artwork cleanly without stretching, distortion, or square canvas borders.
      */}
      <img
        src="/image/logo.png"
        alt={alt}
        className="w-full h-full object-cover pointer-events-none select-none block"
        style={{ objectPosition: 'center 54%' }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
