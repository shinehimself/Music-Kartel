import React from 'react';

interface BackgroundBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'giant';
  opacity?: string;
  position?: 'center' | 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
  variant?: 'light' | 'dark' | 'color';
}

export const BackgroundBadge: React.FC<BackgroundBadgeProps> = ({
  className = '',
  size = 'lg',
  opacity = 'opacity-[0.05]',
  position = 'top-right',
  variant = 'color',
}) => {
  const sizeMap = {
    sm: 'w-36 h-36 md:w-44 md:h-44',
    md: 'w-52 h-52 md:w-64 md:h-64',
    lg: 'w-72 h-72 md:w-96 md:h-96',
    xl: 'w-96 h-96 md:w-[28rem] md:h-[28rem]',
    giant: 'w-[24rem] h-[24rem] sm:w-[32rem] sm:h-[32rem] lg:w-[40rem] lg:h-[40rem]',
  };

  const posMap = {
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/4 -translate-y-1/4 sm:translate-x-12 sm:-translate-y-12',
    'bottom-right': 'bottom-0 right-0 translate-x-1/6 translate-y-1/6 sm:translate-x-10 sm:translate-y-10',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/6 translate-y-1/6 sm:-translate-x-10 sm:translate-y-10',
    'top-left': 'top-0 left-0 -translate-x-1/4 -translate-y-1/4 sm:-translate-x-12 sm:-translate-y-12',
  };

  const filterStyle = variant === 'dark'
    ? 'brightness-0 invert'
    : variant === 'light'
    ? 'grayscale contrast-125'
    : 'mix-blend-multiply';

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none select-none z-0 overflow-hidden ${posMap[position]} ${className}`}
    >
      <div className={`relative ${sizeMap[size]} flex items-center justify-center`}>
        {/* Soft background halo */}
        <div className="absolute inset-0 rounded-full bg-radial from-amber-400/20 via-emerald-400/10 to-transparent blur-2xl opacity-60" />

        {/* The Official Sadaqah Africa Emblem */}
        <img
          src="/assets/aistudio/sadaqah_logo_fa323d09.jpeg"
          alt=""
          className={`w-full h-full object-contain ${opacity} ${filterStyle} transition-all duration-700`}
        />
      </div>
    </div>
  );
};
