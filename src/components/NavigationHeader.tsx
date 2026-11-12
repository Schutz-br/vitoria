import React from 'react';
import { Mail, MapPin, Heart, Camera, Shield, Gift, Lock, Sparkles } from 'lucide-react';

interface NavigationHeaderProps {
  onOpenEnvelope: () => void;
  onOpenPadrinhos: () => void;
  onOpenAlbum: () => void;
  onOpenAdmin: () => void;
  onOpenGifts: () => void;
  onScrollToLocal: () => void;
  onScrollToRsvp: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  onOpenEnvelope,
  onOpenPadrinhos,
  onOpenAlbum,
  onOpenAdmin,
  onOpenGifts,
  onScrollToLocal,
  onScrollToRsvp
}) => {
  return (
    <>
      {/* Desktop & Mobile Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e8dfd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-serif-cormorant text-2xl font-bold tracking-wider text-[#3d2752] whitespace-nowrap shrink-0 hover:text-[#785396] transition-colors"
          >
            Vitória & Kauã
          </a>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-[#664f7a] font-semibold">
            <button
              onClick={onOpenEnvelope}
              className="hover:text-[#885fa8] transition-colors whitespace-nowrap shrink-0"
            >
              Envelope
            </button>
            <button
              onClick={onScrollToLocal}
              className="hover:text-[#885fa8] transition-colors whitespace-nowrap shrink-0"
            >
              Localização
            </button>
            <button
              onClick={onScrollToRsvp}
              className="hover:text-[#885fa8] transition-colors whitespace-nowrap shrink-0"
            >
              Confirmar Presença
            </button>
            <button
              onClick={onOpenAlbum}
              className="hover:text-[#885fa8] transition-colors whitespace-nowrap shrink-0"
            >
              Álbum QR Code
            </button>
            <button
              onClick={onOpenPadrinhos}
              className="hover:text-[#885fa8] transition-colors whitespace-nowrap shrink-0"
            >
              Padrinhos
            </button>
            <button
              onClick={onOpenGifts}
              className="hover:text-[#885fa8] transition-colors whitespace-nowrap shrink-0"
            >
              Presentes & Pix
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenAdmin}
              className="px-3.5 py-2 text-xs font-semibold text-[#543b6d] hover:text-[#3d2454] bg-[#f5edfa] hover:bg-[#ebdef3] rounded-xl border border-[#d8c2ea] transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs"
              title="Acesso dos noivos ao painel de convidados"
              aria-label="Abrir Painel dos Noivos"
            >
              <Lock className="w-3.5 h-3.5 text-[#885ea8]" />
              <span>Painel dos Noivos</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Ergonomic Thumb Bar */}
      <nav
        aria-label="Navegação rápida móvel"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e5d4f2] shadow-lg"
      >
        <div className="grid grid-cols-5 items-center h-16 px-1">
          <button
            onClick={onOpenEnvelope}
            className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] text-[#69527d] active:text-[#3e2752]"
            aria-label="Abrir envelope"
          >
            <Mail className="w-5 h-5 text-[#8862a6]" />
            <span className="text-[10px] font-medium tracking-tight mt-1">Envelope</span>
          </button>

          <button
            onClick={onScrollToLocal}
            className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] text-[#69527d] active:text-[#3e2752]"
            aria-label="Ver local do evento"
          >
            <MapPin className="w-5 h-5 text-[#8862a6]" />
            <span className="text-[10px] font-medium tracking-tight mt-1">Local</span>
          </button>

          <button
            onClick={onScrollToRsvp}
            className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] text-[#5e387f] font-semibold"
            aria-label="Confirmar presença RSVP"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#885fa8] to-[#6c4391] text-white flex items-center justify-center shadow-xs">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 text-[#633a85]">RSVP</span>
          </button>

          <button
            onClick={onOpenAlbum}
            className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] text-[#69527d] active:text-[#3e2752]"
            aria-label="Álbum de fotos QR Code"
          >
            <Camera className="w-5 h-5 text-[#8862a6]" />
            <span className="text-[10px] font-medium tracking-tight mt-1">Fotos</span>
          </button>

          <button
            onClick={onOpenPadrinhos}
            className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] text-[#69527d] active:text-[#3e2752]"
            aria-label="Manual dos padrinhos"
          >
            <Sparkles className="w-5 h-5 text-[#8862a6]" />
            <span className="text-[10px] font-medium tracking-tight mt-1">Padrinhos</span>
          </button>
        </div>
      </nav>
    </>
  );
};
