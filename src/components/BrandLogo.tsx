import React from 'react';

interface BrandLogoProps {
  variant?: 'mark' | 'full';
  className?: string;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  className = '',
  light = false,
}) => {
  if (variant === 'mark') {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-white shadow-xs border border-amber-300/80 overflow-hidden flex items-center justify-center">
          <img
            src="/assets/aistudio/sadaqah_logo_fa323d09.jpeg"
            alt="Sadaqah Africa Emblem"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-white shadow-xs border border-amber-300/80 overflow-hidden shrink-0 flex items-center justify-center">
        <img
          src="/assets/aistudio/sadaqah_logo_fa323d09.jpeg"
          alt="Sadaqah Africa Charity Organization Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="leading-none text-left">
        <div className="flex items-center gap-2">
          <span className={`block font-serif font-black tracking-tight text-base sm:text-lg ${light ? 'text-white' : 'text-[#0A2E0F]'}`}>
            SADAQAH AFRICA
          </span>
          <span className="font-arabic text-xs font-bold text-[#E59A14] opacity-90 hidden sm:inline" dir="rtl">
            صَدَقَة إِفْرِيقْيَا
          </span>
        </div>
        <span className="block text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#E59A14] mt-1">
          Charity Organization
        </span>
      </div>
    </div>
  );
};
