import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Heart, Mail, Share2, Sparkles, Camera } from 'lucide-react';
import { MonogramCrest } from './MonogramCrest';
import { WEDDING_EVENT, getWeddingCountdown } from '../utils/rsvp';

interface HeroInvitationProps {
  onOpenEnvelope: () => void;
  onNavigateRsvp: () => void;
  onNavigatePadrinhos: () => void;
  onNavigateLocation: () => void;
}

export const HeroInvitation: React.FC<HeroInvitationProps> = ({
  onOpenEnvelope,
  onNavigateRsvp,
  onNavigatePadrinhos,
  onNavigateLocation
}) => {
  const [countdown, setCountdown] = useState(() =>
    getWeddingCountdown(WEDDING_EVENT.date)
  );
  const [copiedLink, setCopiedLink] = useState(false);

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

  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Delicate Top Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#f1ebe0] text-[#5b6a5b] text-xs font-sans-body tracking-widest uppercase mb-6 border border-[#dfd4c3]">
        <Sparkles className="w-3 h-3 text-[#b28b6d]" />
        <span>Convite Oficial de Casamento</span>
        <Sparkles className="w-3 h-3 text-[#b28b6d]" />
      </div>

      {/* Opening Quote */}
      <p className="font-serif-cormorant text-xl sm:text-2xl italic text-[#635649] tracking-wide max-w-xl mx-auto mb-6">
        "{WEDDING_EVENT.openingQuote}"
      </p>

      {/* Monogram Crest VK inside floral wreath */}
      <div className="my-4 flex justify-center">
        <MonogramCrest size="lg" showSubtitle={false} />
      </div>

      {/* Couple Names */}
      <h1 className="font-serif-cormorant text-4xl sm:text-6xl text-[#2c382c] tracking-widest font-normal uppercase mt-3">
        Vitória <span className="text-[#a88265] font-light">&</span> Kauã
      </h1>

      <p className="font-sans-body text-xs sm:text-sm tracking-[0.25em] text-[#786958] uppercase mt-2 mb-8">
        11 de Julho de 2027 · Chalé Enfesta
      </p>

      {/* Formal Invitation Card */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-10 border border-[#e4d8c8] wedding-card-shadow max-w-2xl mx-auto my-8">
        {/* Inner subtle frame */}
        <div className="absolute inset-2 border border-[#ebd8c5]/70 rounded-xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Paragraph 1 */}
          <p className="font-serif-cormorant text-lg sm:text-xl text-[#3b443c] leading-relaxed">
            {WEDDING_EVENT.invitationBody[0]}
          </p>

          {/* Paragraph 2 */}
          <p className="font-serif-cormorant text-base sm:text-lg italic text-[#665749]">
            {WEDDING_EVENT.invitationBody[1]}
          </p>

          {/* Date & Location Highlight */}
          <div className="py-4 my-2 border-y border-[#eddccb]">
            <p className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-[#2b382b] tracking-wide">
              {WEDDING_EVENT.invitationBody[2]}
            </p>
          </div>

          {/* Key Event Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left sm:text-center">
            <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#e9ded0] flex sm:flex-col items-center gap-2 sm:gap-1">
              <Calendar className="w-5 h-5 text-[#5e775e]" />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#7e7164]">Data</p>
                <p className="font-serif-cormorant text-base font-semibold text-[#2c382c]">11 de Julho, 2027</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#e9ded0] flex sm:flex-col items-center gap-2 sm:gap-1">
              <Clock className="w-5 h-5 text-[#5e775e]" />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#7e7164]">Horário</p>
                <p className="font-serif-cormorant text-base font-semibold text-[#2c382c]">15h (Pontual)</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#e9ded0] flex sm:flex-col items-center gap-2 sm:gap-1">
              <MapPin className="w-5 h-5 text-[#5e775e]" />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#7e7164]">Local</p>
                <p className="font-serif-cormorant text-base font-semibold text-[#2c382c]">Chalé Enfesta</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="my-10 max-w-xl mx-auto">
        <h3 className="font-serif-cormorant text-lg sm:text-xl text-[#594d40] italic mb-3">
          Contagem regressiva para o nosso sim
        </h3>
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          <div className="bg-white/90 p-3 sm:p-4 rounded-xl border border-[#e3d7c7] shadow-sm">
            <span className="block font-serif-cormorant text-2xl sm:text-4xl font-semibold text-[#324232] tabular-nums">
              {countdown.days}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#7b6d5f]">Dias</span>
          </div>
          <div className="bg-white/90 p-3 sm:p-4 rounded-xl border border-[#e3d7c7] shadow-sm">
            <span className="block font-serif-cormorant text-2xl sm:text-4xl font-semibold text-[#324232] tabular-nums">
              {countdown.hours.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#7b6d5f]">Horas</span>
          </div>
          <div className="bg-white/90 p-3 sm:p-4 rounded-xl border border-[#e3d7c7] shadow-sm">
            <span className="block font-serif-cormorant text-2xl sm:text-4xl font-semibold text-[#324232] tabular-nums">
              {countdown.minutes.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#7b6d5f]">Minutos</span>
          </div>
          <div className="bg-white/90 p-3 sm:p-4 rounded-xl border border-[#e3d7c7] shadow-sm">
            <span className="block font-serif-cormorant text-2xl sm:text-4xl font-semibold text-[#324232] tabular-nums">
              {countdown.seconds.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#7b6d5f]">Segundos</span>
          </div>
        </div>
      </div>

      {/* Romantic Photo Replacement */}
      <div className="my-10 max-w-xl mx-auto relative group">
        <div className="overflow-hidden rounded-2xl border-2 border-dashed border-[#cbbaa6] bg-[#faf6ef] p-10 sm:p-14 flex flex-col items-center justify-center text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#eee5d8] text-[#7d6c5c] flex items-center justify-center mb-3 shadow-inner">
            <Camera className="w-7 h-7 text-[#8f745e]" />
          </div>
          <span className="font-serif-cormorant text-3xl sm:text-4xl text-[#2c382c] font-semibold tracking-wide">
            Fotos aqui
          </span>
          <p className="font-serif-cormorant text-base italic text-[#78695c] mt-2">
            Espaço reservado para as fotos de Vitória & Kauã
          </p>
        </div>
        <div className="mt-3 text-center">
          <p className="font-serif-cormorant text-base italic text-[#635548]">
            "O amor não se vê com os olhos, mas com o coração."
          </p>
        </div>
      </div>

      {/* Main Action CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-4">
        <button
          onClick={onNavigateRsvp}
          className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-[#3e533e] hover:bg-[#324332] text-white text-xs sm:text-sm font-medium uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>Confirmar Presença (RSVP)</span>
        </button>

        <button
          onClick={onOpenEnvelope}
          className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white hover:bg-[#faf7f2] text-[#4a584a] border border-[#d6c7b3] text-xs sm:text-sm font-medium uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4 text-[#8a725e]" />
          <span>Ver Envelope</span>
        </button>

        <button
          onClick={handleShare}
          className="w-full sm:w-auto p-3.5 rounded-xl bg-white hover:bg-[#faf7f2] text-[#4a584a] border border-[#d6c7b3] text-xs font-medium uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
          title="Compartilhar Convite no WhatsApp"
          aria-label="Compartilhar convite no WhatsApp"
        >
          <Share2 className="w-4 h-4 text-[#4a584a]" />
          <span className="sm:hidden">{copiedLink ? 'Link Copiado!' : 'Compartilhar'}</span>
        </button>
      </div>

      {copiedLink && (
        <p className="text-xs text-[#4f684f] mt-2 animate-fade-in font-medium">
          Link do convite copiado com sucesso!
        </p>
      )}
    </section>
  );
};
