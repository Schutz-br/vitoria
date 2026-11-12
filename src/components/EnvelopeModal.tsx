import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { WEDDING_EVENT } from '../utils/rsvp';

interface EnvelopeModalProps {
  isOpen: boolean;
  onOpenInvitation: () => void;
  onClose?: () => void;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({
  isOpen,
  onOpenInvitation
}) => {
  const [isOpening, setIsOpening] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Opening animation sequence
    setTimeout(() => {
      setIsOpening(false);
      onOpenInvitation();
    }, 750);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Convite de Casamento com Envelope Realista"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#faf6fa] sm:bg-[#1a1024]/75 sm:backdrop-blur-md overflow-hidden selection:bg-[#d8c2ea]"
    >
      {/* Phone container: 100% full-screen on mobile, centered iPhone frame on desktop */}
      <div
        className={`relative w-full h-[100dvh] sm:h-[840px] sm:max-h-[94vh] sm:max-w-[410px] sm:rounded-[44px] overflow-hidden shadow-2xl transition-all duration-700 sm:border-[8px] sm:border-[#2b1f36] sm:ring-1 sm:ring-white/20 flex flex-col justify-between ${
          isOpening
            ? 'scale-105 opacity-0 -translate-y-12 sm:scale-95'
            : 'scale-100 opacity-100'
        }`}
        style={{
          background: 'linear-gradient(180deg, #fffdfc 0%, #faf3f8 40%, #f4e9f3 100%)'
        }}
      >
        {/* Subtle Luxury Linen Texture & Soft Lavender/Blush Ambient Glow */}
        <div className="absolute inset-0 bg-wedding-linen opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-[#eedff8]/40 via-transparent to-[#9476b5]/15 pointer-events-none" />

        {/* Golden & Lavender Double Inner Border Frame */}
        <div className="absolute inset-3 sm:inset-3.5 rounded-[28px] sm:rounded-[34px] border border-[#d8be9f]/75 pointer-events-none" />
        <div className="absolute inset-4 sm:inset-4.5 rounded-[24px] sm:rounded-[30px] border border-[#d2b8ea]/45 pointer-events-none" />

        {/* Speaker notch / top phone speaker bar for realism on desktop */}
        <div className="hidden sm:block absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#1a1024] rounded-full z-40 pointer-events-none" />

        {/* TOP HALF: THE TRIANGULAR ENVELOPE FLAP */}
        <div className="relative z-20 w-full pt-7 sm:pt-9 px-4 flex flex-col items-center">
          
          {/* SVG Envelope Flap Background with Soft Drop Shadow (Envelope Colors: Warm Blush-Lavender Ivory) */}
          <div className="absolute top-0 left-0 right-0 h-[370px] sm:h-[400px] pointer-events-none overflow-visible">
            <svg
              viewBox="0 0 400 325"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="envelopeFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fffefd" />
                  <stop offset="65%" stopColor="#faf2f7" />
                  <stop offset="100%" stopColor="#efe1ee" />
                </linearGradient>
                <linearGradient id="flapGoldEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d9be9f" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#c59b4c" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#d9be9f" stopOpacity="0.3" />
                </linearGradient>
                <filter id="flapShadow" x="-10%" y="0%" width="120%" height="135%">
                  <feDropShadow dx="0" dy="12" stdDeviation="9" floodColor="#66446b" floodOpacity="0.14" />
                </filter>
              </defs>
              {/* Triangular Flap Shape meeting right at the bow knot */}
              <polygon
                points="0,0 400,0 200,322"
                fill="url(#envelopeFlapGrad)"
                stroke="url(#flapGoldEdge)"
                strokeWidth="1.2"
                filter="url(#flapShadow)"
              />
            </svg>
          </div>

          {/* 1. COUPLE FLORAL MONOGRAM "VK" (User Request: "coloque o vk florido") */}
          <div
            onClick={handleOpen}
            className="relative z-30 cursor-pointer pt-2 group flex flex-col items-center"
            title="Clique para abrir o convite"
          >
            {/* The Official Floral VK Watercolor Monogram Crest */}
            <div className="w-44 h-44 sm:w-52 sm:h-52 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="/assets/images/vk_lavender_crest.jpeg"
                alt="Brasão Floral Oficial VK — Vitória & Kauã"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 86%)',
                  maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 86%)'
                }}
                className="w-full h-full object-contain mix-blend-multiply select-none pointer-events-none"
              />
            </div>
          </div>

          {/* 2. "CLIQUE PARA ABRIR" & Golden Heart (In Envelope Colors) */}
          <div
            onClick={handleOpen}
            className="relative z-30 cursor-pointer -mt-2 pb-2 text-center group"
          >
            <p className="font-serif-cormorant tracking-[0.36em] text-xs sm:text-[13px] uppercase text-[#6f4b82] font-bold">
              Clique para
            </p>
            <p className="font-serif-cormorant tracking-[0.36em] text-xs sm:text-[13px] uppercase text-[#6f4b82] font-bold mt-0.5">
              Abrir
            </p>
            <div className="flex justify-center items-center mt-1 text-[#c59b4c]">
              <Heart className="w-3.5 h-3.5 fill-[#c59b4c] text-[#a57e34] animate-pulse" />
            </div>
          </div>

        </div>

        {/* MIDDLE: THE SATIN RIBBON BAND & VOLUMINOUS BOW (Meeting Flap Tip Exactly at the Knot) */}
        <div
          onClick={handleOpen}
          className="relative z-30 w-full -mt-7 sm:-mt-9 mb-auto py-2 cursor-pointer group flex flex-col items-center justify-center select-none"
          title="Toque no laço para abrir o convite"
        >
          {/* Horizontal Satin Ribbon Band spanning edge-to-edge behind the bow */}
          <div className="absolute top-1/2 left-0 right-0 h-9 sm:h-11 -translate-y-1/2 satin-ribbon-lavender border-y border-[#dfcbaf] shadow-xs pointer-events-none flex items-center justify-center">
            <div className="w-full h-[1px] bg-white/80" />
            <div className="absolute bottom-1 w-full h-[1px] bg-[#cca878]/35" />
          </div>

          {/* Photorealistic Satin Ribbon Bow Asset with Real Alpha Transparency */}
          <div className="relative z-30 w-72 sm:w-80 transition-transform duration-300 group-hover:scale-105 group-active:scale-95 drop-shadow-[0_10px_18px_rgba(95,65,35,0.22)]">
            <img
              src="/assets/images/satin_ribbon_bow.png"
              alt="Laço de fita de cetim do convite"
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
          </div>

          <p className="font-serif-cormorant text-xs sm:text-sm italic text-[#72547d] mt-1 tracking-wider opacity-85 group-hover:opacity-100 transition-opacity">
            {isOpening ? 'Desatando o laço...' : 'Toque no laço para desatar'}
          </p>
        </div>

        {/* BOTTOM HALF: CLEAN LUXURIOUS ENVELOPE BASE (Video Style) */}
        <div className="relative z-20 pb-6 px-6 text-center">
          <p className="font-serif-cormorant text-xs tracking-[0.28em] uppercase text-[#886997] font-semibold">
            Vitória & Kauã · 11 de Julho de 2027
          </p>
        </div>

      </div>
    </div>
  );
};


