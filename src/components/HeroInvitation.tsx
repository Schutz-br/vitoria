import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Heart,
  Mail,
  Share2,
  Sparkles,
  Gift,
  Camera,
  Play,
  Pause,
  Volume2,
  MessageCircle,
  Check,
  Copy,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { MonogramCrest } from './MonogramCrest';
import { WEDDING_EVENT, getWeddingCountdown } from '../utils/rsvp';

interface HeroInvitationProps {
  onOpenEnvelope: () => void;
  onNavigateRsvp: () => void;
  onNavigatePadrinhos: () => void;
  onNavigateLocation: () => void;
  onOpenGifts: () => void;
  onOpenAlbum: () => void;
  isPlayingMusic?: boolean;
  onToggleMusic?: () => void;
}

export const HeroInvitation: React.FC<HeroInvitationProps> = ({
  onOpenEnvelope,
  onNavigateRsvp,
  onNavigatePadrinhos,
  onNavigateLocation,
  onOpenGifts,
  onOpenAlbum,
  isPlayingMusic = false,
  onToggleMusic
}) => {
  const [countdown, setCountdown] = useState(() =>
    getWeddingCountdown(WEDDING_EVENT.date)
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getWeddingCountdown(WEDDING_EVENT.date));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'Casamento Vitória & Kauã',
      text: 'Entre flores e promessas, florescemos juntos. Você é nosso convidado especial!',
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(WEDDING_EVENT.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const openWhatsAppDuvidas = () => {
    const text = encodeURIComponent(
      'Olá Vitória e Kauã! Estou com uma dúvida sobre o casamento de vocês no dia 11 de Julho de 2027.'
    );
    window.open(`https://wa.me/5521987654321?text=${text}`, '_blank');
  };

  // July 2027 Calendar Generation (July 1, 2027 is a Thursday)
  // Days of week: D(0), S(1), T(2), Q(3), Q(4), S(5), S(6)
  // July 1 = Thursday (index 4)
  // July 11 = Sunday (index 0 of week 2)
  const daysInJuly = 31;
  const startDayOfWeek = 4; // Thursday
  const calendarCells = [];
  // Empty padding cells before 1st
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInJuly; d++) {
    calendarCells.push(d);
  }

  return (
    <section className="relative pt-8 pb-16 px-4 sm:px-6 max-w-2xl mx-auto text-center overflow-hidden">
      
      {/* Decorative Lavender Floral Corner Sprays (Video style) */}
      <div className="absolute -top-4 -left-6 w-32 h-32 sm:w-44 sm:h-44 pointer-events-none opacity-80 z-10">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          {/* Lavender sprigs and leaves */}
          <path d="M10 10 C40 40, 60 90, 80 140" stroke="#7e9c7e" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 10 C60 20, 110 50, 150 90" stroke="#7e9c7e" strokeWidth="1.8" strokeLinecap="round" />
          {/* Lilac blossoms */}
          <circle cx="30" cy="35" r="7" fill="#bfa3db" opacity="0.9" />
          <circle cx="45" cy="25" r="6" fill="#d8c2ea" opacity="0.85" />
          <circle cx="55" cy="48" r="8" fill="#9b7ec4" opacity="0.9" />
          <circle cx="75" cy="42" r="6.5" fill="#cbb3e3" opacity="0.85" />
          <circle cx="95" cy="65" r="7" fill="#8f6ebd" opacity="0.9" />
          <circle cx="42" cy="75" r="8" fill="#a889cf" opacity="0.85" />
          <circle cx="65" cy="100" r="7" fill="#9c7fc4" opacity="0.9" />
          <circle cx="28" cy="58" r="5" fill="#f0e2fa" />
          {/* Golden leaves */}
          <path d="M50 30 Q70 20 80 35 Q60 45 50 30 Z" fill="#d4af37" opacity="0.6" />
          <path d="M70 70 Q90 60 100 75 Q80 85 70 70 Z" fill="#d4af37" opacity="0.55" />
        </svg>
      </div>

      <div className="absolute -top-4 -right-6 w-32 h-32 sm:w-44 sm:h-44 pointer-events-none opacity-80 z-10 transform scale-x-[-1]">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <path d="M10 10 C40 40, 60 90, 80 140" stroke="#7e9c7e" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 10 C60 20, 110 50, 150 90" stroke="#7e9c7e" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="30" cy="35" r="7" fill="#bfa3db" opacity="0.9" />
          <circle cx="45" cy="25" r="6" fill="#d8c2ea" opacity="0.85" />
          <circle cx="55" cy="48" r="8" fill="#9b7ec4" opacity="0.9" />
          <circle cx="75" cy="42" r="6.5" fill="#cbb3e3" opacity="0.85" />
          <circle cx="95" cy="65" r="7" fill="#8f6ebd" opacity="0.9" />
          <circle cx="42" cy="75" r="8" fill="#a889cf" opacity="0.85" />
          <circle cx="65" cy="100" r="7" fill="#9c7fc4" opacity="0.9" />
          <circle cx="28" cy="58" r="5" fill="#f0e2fa" />
          <path d="M50 30 Q70 20 80 35 Q60 45 50 30 Z" fill="#d4af37" opacity="0.6" />
        </svg>
      </div>

      {/* 1. "APERTE O PLAY" - Inline Audio Player Box (Exact as video 0:03) */}
      <div className="relative z-20 mb-8 pt-2">
        <div
          onClick={onToggleMusic}
          className="inline-flex flex-col items-center cursor-pointer group transition-transform active:scale-95"
        >
          <span className="font-serif-cormorant text-xs sm:text-sm tracking-widest text-[#79638c] uppercase mb-1.5 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#b08bb6]" />
            <span>Aperte o play</span>
            <Sparkles className="w-3.5 h-3.5 text-[#b08bb6]" />
          </span>

          <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#9878b8] via-[#855ea8] to-[#b395d1] text-white shadow-lg lavender-glow-shadow group-hover:scale-105 transition-all">
            {isPlayingMusic ? (
              <Pause className="w-6 h-6 fill-white text-white" />
            ) : (
              <Play className="w-6 h-6 fill-white text-white ml-1" />
            )}
            {isPlayingMusic && (
              <span className="absolute -inset-1 rounded-full border-2 border-[#bfa5db]/80 animate-ping opacity-75" />
            )}
          </div>

          <span className="font-serif-cormorant text-xs italic text-[#6a547a] mt-1.5 tracking-wider">
            {isPlayingMusic ? 'Tocando: Trilha Romântica' : 'Música dos Noivos'}
          </span>
        </div>
      </div>

      {/* 2. Couple Monogram Crest with Lavender Watercolor (User Reference 1) */}
      <div className="my-3 flex justify-center relative z-20">
        <MonogramCrest size="lg" showSubtitle={false} />
      </div>

      {/* 3. "CASAMENTO" & Couple Names (Video Style) */}
      <div className="mt-2 mb-4 relative z-20">
        <span className="font-serif-cormorant text-xs sm:text-sm tracking-[0.35em] text-[#86689e] uppercase font-semibold block mb-1">
          Casamento
        </span>
        <h1 className="font-script-vibes text-5xl sm:text-7xl text-[#46315c] tracking-normal drop-shadow-xs my-1">
          Vitória <span className="text-[#c5a059] font-light">&</span> Kauã
        </h1>
      </div>

      {/* 4. Verse Quote (Colossenses 3:14) */}
      <div className="my-6 max-w-lg mx-auto relative z-20">
        <p className="font-serif-cormorant text-base sm:text-lg italic text-[#614d73] uppercase tracking-wide leading-relaxed">
          "Acima de tudo, porém, revistam-se do amor, que é o elo perfeito."
        </p>
        <span className="font-sans-body text-[11px] tracking-widest uppercase text-[#967da8] block mt-1">
          Colossenses 3:14
        </span>
      </div>

      {/* 5. Date & Time Highlight Banner (Exact 3-column framed box as in Video 0:04) */}
      <div className="my-8 relative z-20">
        <div className="text-center mb-3">
          <span className="font-serif-cormorant text-xs sm:text-sm tracking-[0.2em] text-[#715685] uppercase font-semibold">
            Convidamos você para a cerimônia de nosso casamento
          </span>
        </div>

        <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 sm:p-6 border-2 border-[#d9c7ea] shadow-md lavender-glow-shadow max-w-lg mx-auto">
          {/* Framed Inner Box */}
          <div className="border border-[#e8dcee] rounded-xl p-4 sm:p-5 flex items-center justify-around text-center divide-x divide-[#e2d5eb]">
            <div className="flex-1 px-2">
              <span className="font-serif-cormorant text-xl sm:text-2xl font-bold text-[#3c2850] block">
                DOMINGO
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#79628d]">
                Dia da Semana
              </span>
            </div>

            <div className="flex-1 px-2">
              <span className="font-serif-cormorant text-2xl sm:text-3xl font-extrabold text-[#7a4e9b] block">
                11.07
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#79628d]">
                Julho
              </span>
            </div>

            <div className="flex-1 px-2">
              <span className="font-serif-cormorant text-xl sm:text-2xl font-bold text-[#3c2850] block">
                Às 15:00h
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#79628d]">
                Pontual
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2 text-center border-t border-[#f0e6f7]">
            <span className="font-serif-cormorant text-2xl font-bold tracking-[0.25em] text-[#9375b0]">
              2027
            </span>
          </div>
        </div>
      </div>

      {/* 6. Heartfelt Invitation Message (Video Style) */}
      <div className="my-8 max-w-lg mx-auto text-center space-y-4 relative z-20">
        <p className="font-serif-cormorant text-base sm:text-lg text-[#4a3958] leading-relaxed">
          O nosso casamento será um momento muito especial, em que celebraremos oficialmente a nossa união e o amor que nos trouxe até aqui.
        </p>
        <p className="font-serif-cormorant text-base sm:text-lg italic text-[#634e75]">
          A cerimônia será realizada no <strong>Chalé Enfesta</strong>, em um momento reservado exclusivamente aos nossos familiares e amigos queridos.
        </p>
        <p className="font-serif-cormorant text-base sm:text-lg text-[#4a3958] leading-relaxed">
          Depois, queremos celebrar esse amor junto de vocês, compartilhando nossa felicidade e festejando com muita alegria.
        </p>
      </div>

      {/* 7. Altar Photo & Schedule Badges (User Reference 2 Altar Image & Video 0:18) */}
      <div className="my-10 relative z-20 max-w-lg mx-auto">
        <div className="bg-white/95 rounded-2xl overflow-hidden border border-[#dfd2eb] shadow-xl lavender-glow-shadow">
          {/* Real Altar Photo uploaded by the user */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden group">
            <img
              src="/assets/images/chale_enfesta_altar.jpeg"
              alt="Altar da Cerimônia no Chalé Enfesta"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a1b38]/70 via-transparent to-transparent flex items-end p-5">
              <div className="text-white text-left">
                <span className="text-[10px] uppercase tracking-widest text-[#e8dbf7] font-semibold">
                  Espaço da Cerimônia & Festa
                </span>
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold">
                  Chalé Enfesta
                </h3>
              </div>
            </div>
          </div>

          {/* Time & Venue Badges (Video 0:18) */}
          <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#eddff5]">
            <div className="pt-2 sm:pt-0">
              <span className="text-2xl block mb-1">💍</span>
              <h4 className="font-serif-cormorant text-xl font-bold text-[#3c2a4f]">
                CASAMENTO
              </h4>
              <p className="font-serif-cormorant text-base font-semibold text-[#8659a8]">
                15:00h
              </p>
              <p className="text-xs text-[#6e5a80] mt-1">
                Chalé Enfesta · R. 1º de Maio, 42
              </p>
              <p className="text-[11px] text-[#8e7a9e]">
                Parque Paulista, Duque de Caxias - RJ
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-4">
              <span className="text-2xl block mb-1">🥂</span>
              <h4 className="font-serif-cormorant text-xl font-bold text-[#3c2a4f]">
                RECEPÇÃO
              </h4>
              <p className="font-serif-cormorant text-base font-semibold text-[#8659a8]">
                16:15h
              </p>
              <p className="text-xs text-[#6e5a80] mt-1">
                Lounge, Jardim & Gastronomia
              </p>
              <p className="text-[11px] text-[#8e7a9e]">
                No próprio Chalé Enfesta
              </p>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="p-4 bg-[#fcf9fe] border-t border-[#f0e6f7] flex items-center justify-center gap-3">
            <button
              onClick={onNavigateLocation}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#7a5999] to-[#684687] hover:from-[#6c4a8a] hover:to-[#5a3a78] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Ver Rotas & Mapas</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8. SAVE THE DATE - Arch-Framed Calendar Card with Floral Accent (Exact Video 0:21 - 0:24) */}
      <div className="my-10 relative z-20 max-w-sm sm:max-w-md mx-auto">
        <div className="bg-white/95 rounded-t-[110px] rounded-b-3xl p-6 sm:p-8 border-2 border-[#d9c7ea] shadow-xl text-center relative overflow-hidden lavender-glow-shadow">
          
          {/* Top-Right Floral Watercolor Cluster on Arch (Video style 0:21) */}
          <div className="absolute -top-2 -right-2 w-28 h-28 pointer-events-none opacity-85 z-10">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <path d="M120 0 C90 20 60 45 40 80" stroke="#7e9c7e" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="95" cy="20" r="7" fill="#bfa3db" opacity="0.9" />
              <circle cx="80" cy="35" r="8" fill="#9b7ec4" opacity="0.9" />
              <circle cx="65" cy="50" r="6" fill="#d8c2ea" opacity="0.85" />
              <circle cx="50" cy="68" r="5" fill="#a889cf" opacity="0.9" />
              <circle cx="108" cy="35" r="4" fill="#f0e2fa" />
              <path d="M85 15 Q100 8 108 20 Q92 28 85 15 Z" fill="#d4af37" opacity="0.6" />
            </svg>
          </div>

          {/* Arched Inner Border Line */}
          <div className="absolute inset-2.5 rounded-t-[98px] rounded-b-2xl border border-[#e8dcee] pointer-events-none" />

          <div className="pt-4">
            <span className="font-serif-cormorant text-xs sm:text-sm tracking-[0.32em] uppercase text-[#8869a1] font-bold block">
              Save the Date
            </span>
            <div className="w-8 h-0.5 bg-[#caa9e3] mx-auto mt-1 mb-4 rounded-full" />
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-[11px] sm:text-xs font-bold text-[#7e6794] uppercase pb-2 border-b border-[#f0e6f7]">
            <span>D</span>
            <span>S</span>
            <span>T</span>
            <span>Q</span>
            <span>Q</span>
            <span>S</span>
            <span>S</span>
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 pt-3 text-xs sm:text-sm">
            {calendarCells.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-8 sm:h-9" />;
              }
              const isWeddingDay = day === 11;
              return (
                <div
                  key={`day-${day}`}
                  className={`h-8 sm:h-9 flex items-center justify-center rounded-lg font-serif-cormorant transition-all relative ${
                    isWeddingDay
                      ? 'bg-gradient-to-tr from-[#9878b8] to-[#6d4b8e] text-white font-bold shadow-md scale-110 z-10'
                      : 'text-[#443254] hover:bg-[#f6effc]'
                  }`}
                >
                  {isWeddingDay && (
                    <span className="absolute -top-1.5 -right-1 text-xs animate-bounce">
                      ❤️
                    </span>
                  )}
                  <span className={isWeddingDay ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'}>
                    {day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Month & Year Banner (Video 0:22) */}
          <div className="mt-5 pt-3 border-t border-[#f0e6f7] flex items-center justify-center gap-2 text-xs sm:text-sm text-[#715a85] font-serif-cormorant font-bold tracking-[0.25em] uppercase">
            <span>✦</span>
            <span>Julho · 2027</span>
            <span>✦</span>
          </div>
        </div>
      </div>

      {/* 9. Live Countdown Timer */}
      <div className="my-8 max-w-lg mx-auto relative z-20">
        <h4 className="font-serif-cormorant text-lg text-[#614a75] italic mb-3">
          Contagem regressiva para o nosso sim
        </h4>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          <div className="bg-white/95 p-3 rounded-2xl border border-[#e1d5ec] shadow-sm">
            <span className="block font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#453059] tabular-nums">
              {countdown.days}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#79638c]">Dias</span>
          </div>
          <div className="bg-white/95 p-3 rounded-2xl border border-[#e1d5ec] shadow-sm">
            <span className="block font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#453059] tabular-nums">
              {countdown.hours.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#79638c]">Horas</span>
          </div>
          <div className="bg-white/95 p-3 rounded-2xl border border-[#e1d5ec] shadow-sm">
            <span className="block font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#453059] tabular-nums">
              {countdown.minutes.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#79638c]">Minutos</span>
          </div>
          <div className="bg-white/95 p-3 rounded-2xl border border-[#e1d5ec] shadow-sm">
            <span className="block font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#453059] tabular-nums">
              {countdown.seconds.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#79638c]">Segundos</span>
          </div>
        </div>
      </div>

      {/* 10. "CLIQUE PARA INTERAGIR" - Circular Outline Interactive Buttons (Video 0:24 - 0:27) */}
      <div className="my-12 relative z-20">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 sm:w-16 h-[1px] bg-[#d9c7ea]" />
          <span className="font-serif-cormorant text-sm sm:text-base tracking-[0.25em] text-[#785c8f] uppercase font-bold">
            Clique para interagir
          </span>
          <div className="w-10 sm:w-16 h-[1px] bg-[#d9c7ea]" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
          {/* Button 1: Localização */}
          <button
            onClick={onNavigateLocation}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#d9c7ea] shadow-sm hover:shadow-md transition-all group active:scale-95"
          >
            <div className="w-14 h-14 rounded-full border-2 border-[#caa9e3] bg-[#f8f3fc] text-[#7a5399] flex items-center justify-center mb-2 group-hover:bg-[#7a5399] group-hover:text-white group-hover:border-[#7a5399] transition-all shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="font-serif-cormorant text-sm font-semibold text-[#3d2952]">
              Localização
            </span>
            <span className="text-[10px] text-[#7e6991]">Chalé Enfesta</span>
          </button>

          {/* Button 2: Confirmar Presença (RSVP) */}
          <button
            onClick={onNavigateRsvp}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#d9c7ea] shadow-sm hover:shadow-md transition-all group active:scale-95"
          >
            <div className="w-14 h-14 rounded-full border-2 border-[#caa9e3] bg-[#f8f3fc] text-[#7a5399] flex items-center justify-center mb-2 group-hover:bg-[#7a5399] group-hover:text-white group-hover:border-[#7a5399] transition-all shadow-xs">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <span className="font-serif-cormorant text-sm font-semibold text-[#3d2952]">
              Confirmar
            </span>
            <span className="text-[10px] text-[#7e6991]">Presença (RSVP)</span>
          </button>

          {/* Button 3: Presentes & Pix */}
          <button
            onClick={onOpenGifts}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#d9c7ea] shadow-sm hover:shadow-md transition-all group active:scale-95"
          >
            <div className="w-14 h-14 rounded-full border-2 border-[#caa9e3] bg-[#f8f3fc] text-[#7a5399] flex items-center justify-center mb-2 group-hover:bg-[#7a5399] group-hover:text-white group-hover:border-[#7a5399] transition-all shadow-xs">
              <Gift className="w-6 h-6" />
            </div>
            <span className="font-serif-cormorant text-sm font-semibold text-[#3d2952]">
              Presentes
            </span>
            <span className="text-[10px] text-[#7e6991]">Lista & Pix</span>
          </button>

          {/* Button 4: Padrinhos */}
          <button
            onClick={onNavigatePadrinhos}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#d9c7ea] shadow-sm hover:shadow-md transition-all group active:scale-95"
          >
            <div className="w-14 h-14 rounded-full border-2 border-[#caa9e3] bg-[#f8f3fc] text-[#7a5399] flex items-center justify-center mb-2 group-hover:bg-[#7a5399] group-hover:text-white group-hover:border-[#7a5399] transition-all shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-serif-cormorant text-sm font-semibold text-[#3d2952]">
              Padrinhos
            </span>
            <span className="text-[10px] text-[#7e6991]">Manual Exclusivo</span>
          </button>
        </div>
      </div>

      {/* 11. Gift & Pix Box (Video 0:27 - 0:29) */}
      <div className="my-10 p-6 rounded-3xl bg-white/95 border-2 border-[#ded1eb] text-center shadow-lg lavender-glow-shadow max-w-lg mx-auto relative z-20">
        <p className="font-serif-cormorant text-base sm:text-lg text-[#4a3958] leading-relaxed mb-4">
          Sua presença é nosso maior presente. Mas caso queira nos presentear, disponibilizamos nossa lista de presentes e chave Pix abaixo:
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleCopyPix}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-[#9878b8] to-[#7a559e] hover:from-[#8968a8] hover:to-[#6c488e] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            {copiedPix ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
            <span>{copiedPix ? 'Chave Pix Copiada!' : 'Chave Pix'}</span>
          </button>

          <button
            onClick={onOpenGifts}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#faf6fe] hover:bg-[#f3eafb] text-[#5e4178] border border-[#d8c3ea] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs active:scale-95 flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4 text-[#9b78bd]" />
            <span>Cotas de Lua de Mel</span>
          </button>
        </div>

        {copiedPix && (
          <p className="text-xs text-emerald-700 font-medium mt-2 animate-fade-in">
            Chave Pix ({WEDDING_EVENT.pixKey}) copiada com sucesso!
          </p>
        )}
      </div>

      {/* 12. "DÚVIDAS" - WhatsApp Direct Button (Video 0:29 - 0:31) */}
      <div className="my-8 text-center relative z-20 max-w-md mx-auto">
        <span className="font-serif-cormorant text-xs sm:text-sm text-[#79638c] italic block mb-2">
          Em caso de dúvidas clique no ícone abaixo:
        </span>

        <button
          onClick={openWhatsAppDuvidas}
          className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-white hover:bg-[#faf7fd] text-[#553b6f] border-2 border-[#d5c2e8] shadow-md hover:shadow-lg transition-all active:scale-95 font-serif-cormorant text-base font-bold tracking-wide"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366]" />
          <span>Dúvidas</span>
          <ChevronDown className="w-4 h-4 text-[#9878b8] -rotate-90 ml-1" />
        </button>
      </div>

      {/* 13. Closing "Esperamos vocês!" & Requested Biblical Verse: Rute 1:16b (Prompt requirement) */}
      <div className="my-12 pt-6 text-center space-y-4 relative z-20 max-w-lg mx-auto">
        <h2 className="font-script-vibes text-5xl sm:text-6xl text-[#654682] drop-shadow-xs">
          Esperamos vocês!
        </h2>

        {/* User requested exact quote: "Porque aonde quer que tu fores irei eu, e onde quer que pousares, ali pousarei eu. Rute 1:16b" */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#fbf8fe] via-[#f7f0fc] to-[#fbf8fe] border border-[#e1d5ec] shadow-sm">
          <p className="font-serif-cormorant text-lg sm:text-xl italic text-[#4b355e] leading-relaxed">
            "{WEDDING_EVENT.closingVerse || 'Porque aonde quer que tu fores irei eu, e onde quer que pousares, ali pousarei eu.'}"
          </p>
          <p className="font-sans-body text-xs uppercase tracking-widest text-[#9375ab] font-bold mt-2">
            {WEDDING_EVENT.verseReference || 'Rute 1:16b'}
          </p>
        </div>

        <p className="text-xs tracking-[0.25em] uppercase text-[#886f99]">
          Vitória & Kauã · 11 de Julho de 2027 · Chalé Enfesta
        </p>

        {/* Action button row */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={onNavigateRsvp}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#7a5999] via-[#654385] to-[#7a5999] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Confirmar Minha Presença</span>
          </button>

          <button
            onClick={onOpenEnvelope}
            className="py-3 px-5 rounded-xl bg-white hover:bg-[#faf7fd] text-[#553b6f] border border-[#d6c3e8] text-xs font-semibold uppercase tracking-wider shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4 text-[#9878b8]" />
            <span>Reabrir Envelope</span>
          </button>

          <button
            onClick={handleShare}
            className="p-3 rounded-xl bg-white hover:bg-[#faf7fd] text-[#553b6f] border border-[#d6c3e8] text-xs font-semibold shadow-xs transition-all active:scale-95"
            title="Compartilhar Convite"
            aria-label="Compartilhar convite no WhatsApp"
          >
            <Share2 className="w-4 h-4 text-[#9878b8]" />
          </button>
        </div>

        {copiedLink && (
          <p className="text-xs text-[#527e52] mt-2 animate-fade-in font-medium">
            Link do convite copiado para compartilhar!
          </p>
        )}
      </div>

    </section>
  );
};
