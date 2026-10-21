import React, { useState } from 'react';
import { Heart, Sparkles, ChevronDown, Music } from 'lucide-react';
import { MonogramCrest } from './MonogramCrest';
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
  const [hasOpened, setHasOpened] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSealClick = () => {
    if (isOpening || hasOpened) return;
    setIsOpening(true);

    // Sequence opening animation
    setTimeout(() => {
      setHasOpened(true);
      setIsOpening(false);
      onOpenInvitation();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Convite de Casamento com Envelope"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#262f27]/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-lg my-auto transition-all duration-700">
        {/* Envelope Container */}
        <div className="relative bg-[#f8f5ee] rounded-2xl p-6 sm:p-8 wedding-card-shadow border border-[#decbb7] overflow-hidden text-center">
          
          {/* Subtle gold foil border in the interior */}
          <div className="absolute inset-2 border border-[#d6be9f]/60 rounded-xl pointer-events-none" />
          <div className="absolute inset-3 border border-[#d6be9f]/30 rounded-lg pointer-events-none" />

          {/* Decorative Corner Flowers in SVG */}
          <div className="absolute top-3 left-3 w-8 h-8 opacity-40 pointer-events-none">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M4 4 C16 4, 24 12, 28 24 M4 4 C4 16, 12 24, 24 28" stroke="#688468" strokeWidth="1.2" />
              <circle cx="8" cy="8" r="3" fill="#d9b6a1" />
            </svg>
          </div>
          <div className="absolute top-3 right-3 w-8 h-8 opacity-40 pointer-events-none rotate-90">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M4 4 C16 4, 24 12, 28 24 M4 4 C4 16, 12 24, 24 28" stroke="#688468" strokeWidth="1.2" />
              <circle cx="8" cy="8" r="3" fill="#d9b6a1" />
            </svg>
          </div>

          {/* Opening Quote */}
          <div className="mb-4">
            <p className="font-serif-cormorant text-base sm:text-lg italic text-[#6a5e52] tracking-wide">
              "{WEDDING_EVENT.openingQuote}"
            </p>
          </div>

          {/* Monogram Crest with VK inside floral wreath */}
          <div className="my-2 flex justify-center">
            <MonogramCrest size="md" showSubtitle={false} />
          </div>

          {/* Couple Names */}
          <h1 className="font-serif-cormorant text-3xl sm:text-4xl text-[#2c382c] tracking-wider font-light uppercase mt-2">
            Vitória & Kauã
          </h1>

          <p className="font-sans-body text-xs tracking-[0.25em] text-[#7a6a57] uppercase mt-1 mb-6">
            11 de Julho de 2027 · 15h · Chalé Enfesta
          </p>

          {/* Interactive Envelope Flap & Wax Seal Button */}
          <div className="relative py-4 my-2 flex flex-col items-center">
            {/* Satin Ribbon Accent */}
            <div className="absolute top-1/2 left-0 right-0 h-3 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#d1b89d]/40 to-transparent pointer-events-none" />

            {/* Wax Seal Button */}
            <button
              onClick={handleSealClick}
              disabled={isOpening}
              className={`group relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#8d2c2c] via-[#752020] to-[#5a1616] text-[#f3dec7] flex flex-col items-center justify-center wax-seal-shadow transition-transform duration-300 ${
                isOpening ? 'scale-110 rotate-12' : 'hover:scale-105 active:scale-95 animate-gentle-float'
              }`}
              aria-label="Tocar no lacre de cera para abrir o convite"
            >
              {/* Outer seal pressed edge */}
              <div className="absolute inset-1 rounded-full border border-[#d6a57c]/40 pointer-events-none" />
              <div className="absolute inset-2 rounded-full border border-[#501313]/50 pointer-events-none" />

              {/* Inner Monogram */}
              <span className="font-serif-cormorant text-2xl sm:text-3xl italic font-semibold text-[#f8e5d3] drop-shadow-md">
                VK
              </span>
              <span className="font-serif-cormorant text-[10px] tracking-widest uppercase text-[#e4c2a5] opacity-90 mt-0.5">
                {isOpening ? 'Abrindo...' : 'Abrir'}
              </span>
            </button>

            {/* Tap instruction */}
            <p className="font-serif-cormorant text-sm italic text-[#7a6857] mt-4 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#b28b6d]" />
              <span>Toque no lacre para abrir o convite</span>
              <Sparkles className="w-3.5 h-3.5 text-[#b28b6d]" />
            </p>
          </div>

          {/* Quick open button */}
          <div className="mt-4 pt-4 border-t border-[#decbb7]/50">
            <button
              onClick={() => {
                onOpenInvitation();
              }}
              className="w-full py-3 px-6 rounded-xl bg-[#3e533e] hover:bg-[#344634] text-white font-sans-body text-xs sm:text-sm font-medium tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>Ver Convite Completo</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
