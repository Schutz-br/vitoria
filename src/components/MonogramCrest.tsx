import React from 'react';

interface MonogramCrestProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const MonogramCrest: React.FC<MonogramCrestProps> = ({
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-44 h-44',
    xl: 'w-56 h-56'
  };

  const fontSizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl'
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center select-none`}>
        {/* Botanical circular wreath SVG */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full text-[#628262] transition-transform duration-700 hover:rotate-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer delicate ring */}
          <circle
            cx="100"
            cy="100"
            r="88"
            stroke="#c8b49a"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            opacity="0.8"
          />
          <circle
            cx="100"
            cy="100"
            r="82"
            stroke="#a7bca7"
            strokeWidth="0.6"
            opacity="0.6"
          />

          {/* Left floral branch */}
          <path
            d="M 100 16 C 50 18, 16 55, 18 100 C 19 145, 55 182, 100 184"
            stroke="#537353"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Right floral branch */}
          <path
            d="M 100 16 C 150 18, 184 55, 182 100 C 181 145, 145 182, 100 184"
            stroke="#537353"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Leaves and flower buds left */}
          <g fill="#6f916f" opacity="0.85">
            <ellipse cx="64" cy="32" rx="7" ry="3.5" transform="rotate(-30 64 32)" />
            <ellipse cx="40" cy="56" rx="8" ry="3.8" transform="rotate(-50 40 56)" />
            <ellipse cx="25" cy="90" rx="8" ry="4" transform="rotate(-75 25 90)" />
            <ellipse cx="28" cy="125" rx="8" ry="3.8" transform="rotate(-110 28 125)" />
            <ellipse cx="48" cy="156" rx="7.5" ry="3.5" transform="rotate(-135 48 156)" />
            <ellipse cx="78" cy="176" rx="7" ry="3.5" transform="rotate(-160 78 176)" />
          </g>

          {/* Leaves and flower buds right */}
          <g fill="#6f916f" opacity="0.85">
            <ellipse cx="136" cy="32" rx="7" ry="3.5" transform="rotate(30 136 32)" />
            <ellipse cx="160" cy="56" rx="8" ry="3.8" transform="rotate(50 160 56)" />
            <ellipse cx="175" cy="90" rx="8" ry="4" transform="rotate(75 175 90)" />
            <ellipse cx="172" cy="125" rx="8" ry="3.8" transform="rotate(110 172 125)" />
            <ellipse cx="152" cy="156" rx="7.5" ry="3.5" transform="rotate(135 152 156)" />
            <ellipse cx="122" cy="176" rx="7" ry="3.5" transform="rotate(160 122 176)" />
          </g>

          {/* Subtle rose gold floral berry accents */}
          <g fill="#d8b49e">
            <circle cx="50" cy="42" r="2.5" />
            <circle cx="30" cy="72" r="2.8" />
            <circle cx="22" cy="108" r="2.5" />
            <circle cx="38" cy="142" r="2.6" />
            <circle cx="62" cy="168" r="2.5" />
            
            <circle cx="150" cy="42" r="2.5" />
            <circle cx="170" cy="72" r="2.8" />
            <circle cx="178" cy="108" r="2.5" />
            <circle cx="162" cy="142" r="2.6" />
            <circle cx="138" cy="168" r="2.5" />
          </g>

          {/* Small ribbon bow or leaves at bottom */}
          <path
            d="M 92 182 Q 100 177 108 182 Q 100 188 92 182 Z"
            fill="#b59379"
          />
        </svg>

        {/* Monogram letters V & K with floral crown styling */}
        <div className="relative z-10 flex items-center justify-center space-x-1">
          <span
            className={`font-serif-cormorant font-normal tracking-normal text-[#2c382c] ${fontSizeClasses[size]} drop-shadow-sm`}
            style={{ fontStyle: 'italic' }}
          >
            V
          </span>
          <span className="font-serif-cormorant text-xs md:text-sm text-[#b59379] italic font-light mx-0.5">
            &
          </span>
          <span
            className={`font-serif-cormorant font-normal tracking-normal text-[#2c382c] ${fontSizeClasses[size]} drop-shadow-sm`}
            style={{ fontStyle: 'italic' }}
          >
            K
          </span>
        </div>
      </div>

      {showSubtitle && (
        <div className="mt-2 text-center">
          <h2 className="font-serif-cormorant text-2xl sm:text-3xl tracking-widest text-[#2c382c] font-normal uppercase">
            Vitória & Kauã
          </h2>
          <p className="font-sans-body text-xs tracking-[0.25em] text-[#7d6f60] uppercase mt-0.5">
            11 · 07 · 2027
          </p>
        </div>
      )}
    </div>
  );
};
