import React from 'react';

/**
 * Authentic brand icons for African Mobile Money networks,
 * international card schemes, and official banking partners.
 */

export const MtnMomoLogo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <svg
    viewBox="0 0 120 40"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="MTN MoMo"
  >
    {/* Yellow Background Pill */}
    <rect width="120" height="40" rx="10" fill="#FFCC00" />
    
    {/* MTN Oval Badge */}
    <ellipse cx="32" cy="20" rx="20" ry="13" fill="#000000" />
    <ellipse cx="32" cy="20" rx="18.5" ry="11.5" fill="#FFCC00" />
    <ellipse cx="32" cy="20" rx="17" ry="10" fill="#000000" />
    <text
      x="32"
      y="24"
      textAnchor="middle"
      fill="#FFCC00"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="11"
      letterSpacing="0.5"
    >
      MTN
    </text>

    {/* MoMo text with signature styling */}
    <text
      x="62"
      y="25"
      fill="#002B49"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="16"
      letterSpacing="-0.5"
    >
      Mo<tspan fill="#EB1829">Mo</tspan>
    </text>
  </svg>
);

export const AirtelMoneyLogo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <svg
    viewBox="0 0 130 40"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Airtel Money"
  >
    {/* Red Background Pill */}
    <rect width="130" height="40" rx="10" fill="#E40000" />

    {/* Airtel Wave icon */}
    <path
      d="M18 28C14.5 28 12 25.5 12 22C12 16.5 16.5 12 22 12C26 12 29 14.5 29.5 18C27 18 25 19.5 25 22C25 24 26.5 25.5 28.5 25.5C29 25.5 29.5 25.4 30 25.2C29.2 26.9 27.2 28 25 28C23.5 28 22.2 27.4 21.3 26.5C20.5 27.5 19.3 28 18 28Z"
      fill="#FFFFFF"
    />

    {/* airtel money typography */}
    <text
      x="38"
      y="21"
      fill="#FFFFFF"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="800"
      fontSize="13"
      letterSpacing="-0.2"
    >
      airtel
    </text>
    <text
      x="38"
      y="31"
      fill="#FFD2D2"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="700"
      fontSize="9.5"
      letterSpacing="0.8"
    >
      MONEY
    </text>
  </svg>
);

export const MpesaLogo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <svg
    viewBox="0 0 120 40"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="M-PESA"
  >
    {/* White pill with green border */}
    <rect width="120" height="40" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
    
    {/* Green Accent Ribbon */}
    <rect x="0" y="0" width="8" height="40" rx="4" fill="#008542" />

    {/* Red Box for 'M-' */}
    <rect x="14" y="9" width="30" height="22" rx="4" fill="#E60000" />
    <text
      x="29"
      y="25"
      textAnchor="middle"
      fill="#FFFFFF"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="13"
    >
      M-
    </text>

    {/* Green 'PESA' */}
    <text
      x="49"
      y="26"
      fill="#008542"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="16"
      letterSpacing="0.5"
    >
      PESA
    </text>
  </svg>
);

export const OrangeMoneyLogo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <svg
    viewBox="0 0 130 40"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Orange Money"
  >
    {/* Black Pill */}
    <rect width="130" height="40" rx="10" fill="#000000" />
    
    {/* Orange Square */}
    <rect x="10" y="10" width="20" height="20" rx="3" fill="#FF7900" />

    <text
      x="37"
      y="21"
      fill="#FFFFFF"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="700"
      fontSize="12"
    >
      orange
    </text>
    <text
      x="37"
      y="31"
      fill="#FF7900"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="800"
      fontSize="9.5"
      letterSpacing="0.8"
    >
      MONEY
    </text>
  </svg>
);

export const WaveLogo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <svg
    viewBox="0 0 110 40"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Wave Mobile Money"
  >
    {/* Sky Blue Pill */}
    <rect width="110" height="40" rx="10" fill="#1DC3F2" />
    
    {/* Penguin silhouette */}
    <circle cx="23" cy="20" r="11" fill="#FFFFFF" />
    <circle cx="23" cy="18" r="8" fill="#1DC3F2" />
    <circle cx="21" cy="16" r="1.5" fill="#FFFFFF" />
    <path d="M23 18L27 19L23 20Z" fill="#FFA500" />
    <path d="M19 25C19 23 27 23 27 25Z" fill="#FFA500" />

    {/* Wave Text */}
    <text
      x="42"
      y="26"
      fill="#FFFFFF"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="17"
      letterSpacing="-0.5"
    >
      wave
    </text>
  </svg>
);

export const UbaBankLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg
    viewBox="0 0 135 44"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="United Bank for Africa (UBA)"
  >
    {/* Red UBA Card Base */}
    <rect width="135" height="44" rx="8" fill="#D71920" />
    
    {/* UBA Bold Initials */}
    <text
      x="14"
      y="27"
      fill="#FFFFFF"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="20"
      letterSpacing="1.5"
    >
      UBA
    </text>

    {/* Africa's Global Bank divider & subline */}
    <line x1="72" y1="10" x2="72" y2="34" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" />
    
    <text
      x="78"
      y="20"
      fill="#FFFFFF"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="700"
      fontSize="7.5"
      letterSpacing="0.5"
    >
      United Bank
    </text>
    <text
      x="78"
      y="29"
      fill="#FFD2D2"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="600"
      fontSize="6.5"
      letterSpacing="0.4"
    >
      for Africa
    </text>
  </svg>
);

export const VisaLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
  <svg
    viewBox="0 0 60 38"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Visa"
  >
    <rect width="60" height="38" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
    <path
      d="M24.8 25.2L27.4 12.8H31.6L29 25.2H24.8ZM43.4 13.1C42.5 12.8 41.2 12.5 39.6 12.5C35.3 12.5 32.3 14.6 32.3 17.7C32.3 20 34.4 21.2 36 21.9C37.6 22.7 38.2 23.2 38.2 23.9C38.2 25 36.9 25.5 35.6 25.5C34 25.5 33.1 25.2 32.1 24.7L31.5 24.4L30.9 27.5C31.8 27.9 33.5 28.3 35.3 28.3C39.9 28.3 42.9 26.2 42.9 22.9C42.9 20.9 41.5 19.3 39 18.2C37.5 17.5 36.6 17 36.6 16.3C36.6 15.6 37.4 14.9 39.1 14.9C40.4 14.9 41.5 15.2 42.2 15.5L42.6 15.7L43.4 13.1ZM54 21.2L55.8 12.8H52.1C51.2 12.8 50.5 13.3 50.1 14.1L44.8 25.2H49.2L50.1 22.8H55.4L55.9 25.2H59.8L56.4 12.8H52.4L54 21.2ZM51.3 19.8L53 15.1L54 19.8H51.3ZM20.4 12.8L16.4 22.7L15.9 20.4C15.2 18 13 14.7 10.3 13.3L13.9 25.2H18.3L24.8 12.8H20.4Z"
      fill="#1A1F71"
    />
    <path d="M13.6 12.8H7.3L7.2 13C12.4 14.3 16.8 17.9 18.2 22.8L16.7 14.4C16.4 13.3 15.2 12.8 13.6 12.8Z" fill="#F7B600" />
  </svg>
);

export const MastercardLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
  <svg
    viewBox="0 0 60 38"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Mastercard"
  >
    <rect width="60" height="38" rx="6" fill="#141414" />
    <circle cx="24" cy="19" r="11" fill="#EB001B" />
    <circle cx="36" cy="19" r="11" fill="#F79E1B" fillOpacity="0.9" />
    <path
      d="M30 11.8C32.3 13.6 33.8 16.1 33.8 19C33.8 21.9 32.3 24.4 30 26.2C27.7 24.4 26.2 21.9 26.2 19C26.2 16.1 27.7 13.6 30 11.8Z"
      fill="#FF5F00"
    />
  </svg>
);

export const ApplePayLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
  <svg
    viewBox="0 0 60 38"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Apple Pay"
  >
    <rect width="60" height="38" rx="6" fill="#000000" />
    {/* Apple Logo */}
    <path
      d="M20.2 15.8C19.7 16.4 18.9 16.9 18.1 16.8C18 16 18.3 15.2 18.8 14.6C19.3 14 20.2 13.5 20.9 13.5C21 14.3 20.7 15.1 20.2 15.8ZM20.9 17C19.8 17 19.3 16.4 18.5 16.4C17.7 16.4 17.1 17 16.1 17C15 17 14 16 14 14.4C14 12.1 15.5 11 16.8 11C17.6 11 18.2 11.5 18.7 11.5C19.2 11.5 19.9 11 20.8 11C21.2 11 22.3 11.2 23 12.1C22.4 12.5 22 13.2 22 14.1C22 15.3 23 15.7 23.1 15.8C22.6 16.9 21.8 18 20.9 17Z"
      fill="#FFFFFF"
      transform="translate(-3, 3)"
    />
    {/* Pay text */}
    <text
      x="25"
      y="23"
      fill="#FFFFFF"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="600"
      fontSize="13"
      letterSpacing="-0.3"
    >
      Pay
    </text>
  </svg>
);

export const GooglePayLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
  <svg
    viewBox="0 0 60 38"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Google Pay"
  >
    <rect width="60" height="38" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
    {/* Google G */}
    <path
      d="M21.5 19.2C21.5 18.6 21.4 18 21.3 17.5H16.5V19.8H19.3C19.2 20.6 18.7 21.3 18 21.8V23.4H19.9C21 22.4 21.5 21 21.5 19.2Z"
      fill="#4285F4"
    />
    <path
      d="M16.5 24.3C17.9 24.3 19 23.8 19.9 23.4L18 21.8C17.5 22.1 17 22.3 16.5 22.3C15.1 22.3 14 21.4 13.6 20.1H11.7V21.7C12.6 23.5 14.4 24.3 16.5 24.3Z"
      fill="#34A853"
    />
    <path
      d="M13.6 20.1C13.5 19.8 13.4 19.4 13.4 19C13.4 18.6 13.5 18.2 13.6 17.9V16.3H11.7C11.3 17.1 11.1 18 11.1 19C11.1 20 11.3 20.9 11.7 21.7L13.6 20.1Z"
      fill="#FBBC04"
    />
    <path
      d="M16.5 15.7C17.3 15.7 18 16 18.6 16.5L20 15.1C19.1 14.2 17.9 13.7 16.5 13.7C14.4 13.7 12.6 14.5 11.7 16.3L13.6 17.9C14 16.6 15.1 15.7 16.5 15.7Z"
      fill="#EA4335"
    />
    {/* Pay text */}
    <text
      x="24"
      y="23"
      fill="#5F6368"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="700"
      fontSize="13"
      letterSpacing="-0.3"
    >
      Pay
    </text>
  </svg>
);

export const WhatsAppBrandLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
  <svg
    viewBox="0 0 36 36"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="WhatsApp"
  >
    <circle cx="18" cy="18" r="18" fill="#25D366" />
    <path
      d="M26.2 21.6C25.8 21.4 23.8 20.4 23.4 20.2C23.1 20.1 22.8 20 22.6 20.4C22.3 20.8 21.7 21.6 21.5 21.8C21.3 22 21.1 22.1 20.7 21.9C20.3 21.7 19 21.3 17.5 19.9C16.3 18.8 15.5 17.5 15.3 17.1C15.1 16.7 15.3 16.5 15.5 16.3C15.7 16.1 15.9 15.8 16.1 15.6C16.3 15.4 16.4 15.2 16.5 15C16.6 14.8 16.6 14.6 16.5 14.4C16.4 14.2 15.8 12.6 15.5 12C15.2 11.4 15 11.5 14.8 11.5C14.6 11.5 14.3 11.5 14.1 11.5C13.8 11.5 13.5 11.6 13.2 11.9C12.9 12.2 12.1 13 12.1 14.6C12.1 16.2 13.3 17.7 13.5 17.9C13.7 18.1 15.8 21.3 19 22.7C19.8 23 20.4 23.2 20.8 23.4C21.6 23.6 22.3 23.6 22.8 23.5C23.4 23.4 24.7 22.7 25 21.9C25.3 21.1 25.3 20.4 25.2 20.2C25.1 20.1 24.9 20 24.5 19.8L26.2 21.6Z"
      fill="#FFFFFF"
    />
  </svg>
);
