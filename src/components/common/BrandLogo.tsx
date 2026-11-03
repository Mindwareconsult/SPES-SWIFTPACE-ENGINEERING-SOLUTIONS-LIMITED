import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'full';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  displayMode?: 'standard' | 'badge' | 'icon-only';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'light',
  showSubtitle = true,
  size = 'md',
  displayMode = 'standard'
}) => {
  const isLight = variant === 'light';
  const [imgError, setImgError] = useState(false);

  // Fallback path if direct root /logo.peg fails in some browser context
  const logoSrc = imgError ? '/assets/spes_logo.jpeg' : '/logo.peg';

  // Size configurations for standard layout
  const dimensions = {
    sm: { icon: 'w-9 h-9', imgH: 'h-8', textTitle: 'text-sm sm:text-base', textSub: 'text-[9px]' },
    md: { icon: 'w-11 h-11', imgH: 'h-10', textTitle: 'text-base sm:text-lg', textSub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', imgH: 'h-12', textTitle: 'text-xl sm:text-2xl', textSub: 'text-xs' },
    xl: { icon: 'w-20 h-20', imgH: 'h-18', textTitle: 'text-2xl sm:text-3xl', textSub: 'text-sm' }
  }[size];

  // Full Signboard Badge Mode (Ideal for Login, Footers, and Credentials)
  if (displayMode === 'badge') {
    const badgeWidths = {
      sm: 'max-w-[200px]',
      md: 'max-w-[260px]',
      lg: 'max-w-[340px]',
      xl: 'max-w-[440px]'
    }[size];

    return (
      <Link to="/" className={`inline-block group focus:outline-none ${className}`}>
        <div className={`relative rounded-2xl overflow-hidden bg-white/95 p-1.5 border border-[#12BCEB]/40 shadow-xl shadow-[#040D1E]/80 group-hover:border-[#12BCEB] group-hover:shadow-cyan-950/40 transition-all duration-300 ${badgeWidths}`}>
          <img
            src={logoSrc}
            alt="SPES Swiftpace Engineering Solutions Limited Official Logo"
            className="w-full h-auto object-contain rounded-xl"
            onError={() => setImgError(true)}
          />
        </div>
      </Link>
    );
  }

  // Icon Only Mode
  if (displayMode === 'icon-only') {
    return (
      <Link to="/" className={`inline-flex items-center group focus:outline-none ${className}`}>
        <div className={`relative ${dimensions.icon} rounded-xl overflow-hidden bg-white p-1 border border-white/20 shadow-md group-hover:border-[#12BCEB] transition-all flex items-center justify-center`}>
          <img
            src={logoSrc}
            alt="SPES Swiftpace Official Logo"
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        </div>
      </Link>
    );
  }

  // Standard Mode: Logo Image + Crisp Typographic Hierarchy
  return (
    <Link to="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
      {/* Official SPES 3D Emblem Container */}
      <div className={`relative ${dimensions.icon} flex-shrink-0 flex items-center justify-center rounded-xl bg-white p-1 border border-white/30 shadow-lg shadow-[#06152F]/80 group-hover:border-[#12BCEB] group-hover:scale-105 transition-all duration-300`}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-[#12BCEB]/10 rounded-xl blur-[2px] group-hover:bg-[#12BCEB]/25 transition-all"></div>
        
        {/* Logo Image */}
        <img
          src={logoSrc}
          alt="SPES Swiftpace Engineering Solutions Logo"
          className="w-full h-full object-contain relative z-10"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Typography Hierarchy */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`font-display-luxury font-black tracking-wider ${dimensions.textTitle} ${isLight ? 'text-white' : 'text-[#06152F]'} group-hover:text-[#12BCEB] transition-colors`}>
            SPES
          </span>
          <span className={`font-sans font-extrabold tracking-widest text-[10px] sm:text-xs uppercase px-1.5 py-0.5 rounded ${isLight ? 'bg-[#082657] text-[#12BCEB] border border-[#12BCEB]/30' : 'bg-[#06152F] text-white'}`}>
            SWIFTPACE
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`font-bold tracking-wider uppercase ${dimensions.textSub} text-[#078A43]`}>
              ENGINEERING SOLUTIONS LIMITED
            </span>
            <span className="text-[9px] font-mono text-slate-400 opacity-80 hidden sm:inline">
              RC:8978524
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

