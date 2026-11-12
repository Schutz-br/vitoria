import React, { useState } from 'react';
import { NavigationHeader } from './components/NavigationHeader';
import { EnvelopeModal } from './components/EnvelopeModal';
import { HeroInvitation } from './components/HeroInvitation';
import { EventDetails } from './components/EventDetails';
import { RsvpSection } from './components/RsvpSection';
import { PadrinhosModal } from './components/PadrinhosModal';
import { PhotoAlbumModal } from './components/PhotoAlbumModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { GiftsPixModal } from './components/GiftsPixModal';
import { AudioPlayer } from './components/AudioPlayer';
import { PetalsEffect } from './components/PetalsEffect';
import { MonogramCrest } from './components/MonogramCrest';
import { Sparkles, Gift, Camera } from 'lucide-react';
import { WEDDING_EVENT } from './utils/rsvp';

export default function App() {
  // Check if URL has ?autostart=1 or ?opened=1 to skip envelope directly
  const [envelopeOpen, setEnvelopeOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') !== '1' && params.get('opened') !== '1';
    }
    return true;
  });

  const [padrinhosOpen, setPadrinhosOpen] = useState(false);
  const [albumOpen, setAlbumOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [giftsOpen, setGiftsOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [musicTrigger, setMusicTrigger] = useState(false);

  const handleOpenInvitation = () => {
    setEnvelopeOpen(false);
    setMusicTrigger(true);
    setIsPlayingMusic(true);
  };

  const handleToggleMusic = () => {
    setIsPlayingMusic(!isPlayingMusic);
  };

  const scrollToLocal = () => {
    const el = document.getElementById('local');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRsvp = () => {
    const el = document.getElementById('rsvp');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-wedding-linen font-sans-body pb-24 md:pb-12 text-[#2f223d] relative selection:bg-[#d8c2ea]">
      {/* Floating lilac, lavender & rose petals */}
      <PetalsEffect />

      {/* Romantic Audio Player */}
      <AudioPlayer
        autoPlayTrigger={musicTrigger}
        isPlayingExternal={isPlayingMusic}
        onTogglePlayExternal={handleToggleMusic}
      />

      {/* Interactive Envelope with Ribbon Bow (matching video reference) */}
      <EnvelopeModal
        isOpen={envelopeOpen}
        onOpenInvitation={handleOpenInvitation}
      />

      {/* Clean Header & Mobile Navigation with Lavender Theme */}
      <NavigationHeader
        onOpenEnvelope={() => setEnvelopeOpen(true)}
        onOpenPadrinhos={() => setPadrinhosOpen(true)}
        onOpenAlbum={() => setAlbumOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenGifts={() => setGiftsOpen(true)}
        onScrollToLocal={scrollToLocal}
        onScrollToRsvp={scrollToRsvp}
      />

      {/* Main Content Area */}
      <main className="relative z-20">
        {/* Full-Feature Digital Wedding Invitation (Video layout) */}
        <HeroInvitation
          onOpenEnvelope={() => setEnvelopeOpen(true)}
          onNavigateRsvp={scrollToRsvp}
          onNavigatePadrinhos={() => setPadrinhosOpen(true)}
          onNavigateLocation={scrollToLocal}
          onOpenGifts={() => setGiftsOpen(true)}
          onOpenAlbum={() => setAlbumOpen(true)}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={handleToggleMusic}
        />

        {/* Feature Cards: Gift Registry / Pix & Collaborative Photos */}
        <section className="py-6 px-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quick Gift Box */}
            <div
              onClick={() => setGiftsOpen(true)}
              className="p-6 rounded-3xl bg-white/95 border border-[#dfd0eb] shadow-md hover:border-[#b395d1] transition-all group flex items-center justify-between cursor-pointer lavender-glow-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-[#f5ecfa] text-[#785196] group-hover:scale-110 transition-transform">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-cormorant text-xl font-bold text-[#3d2752]">
                    Lista de Presentes & Pix
                  </h3>
                  <p className="text-xs text-[#735e85]">
                    Cotas simbólicas de lua de mel e chave Pix oficial
                  </p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-wider text-[#795099] font-bold underline shrink-0">
                Acessar
              </span>
            </div>

            {/* Quick Collaborative Album */}
            <div
              onClick={() => setAlbumOpen(true)}
              className="p-6 rounded-3xl bg-white/95 border border-[#dfd0eb] shadow-md hover:border-[#b395d1] transition-all group flex items-center justify-between cursor-pointer lavender-glow-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-[#f5ecfa] text-[#785196] group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-cormorant text-xl font-bold text-[#3d2752]">
                    Álbum por QR Code
                  </h3>
                  <p className="text-xs text-[#735e85]">
                    Envie e veja as fotos tiradas no dia da celebração
                  </p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-wider text-[#795099] font-bold underline shrink-0">
                Acessar
              </span>
            </div>
          </div>
        </section>

        {/* Event Details: Date, Time, Altar Photo, Maps, Timeline */}
        <EventDetails />

        {/* RSVP Confirmation Section */}
        <RsvpSection />

        {/* Special Godparents Banner */}
        <section className="py-10 px-4 max-w-4xl mx-auto">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#faf5fe] via-[#f4eafb] to-[#faf5fe] border border-[#d8c3ea] text-center space-y-4 shadow-lg lavender-glow-shadow">
            <div className="w-14 h-14 rounded-full bg-[#eee0f8] text-[#785196] flex items-center justify-center mx-auto shadow-inner">
              <Sparkles className="w-7 h-7 text-[#9b78bd]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#7c638f] font-semibold block">
                Área Exclusiva
              </span>
              <h3 className="font-serif-cormorant text-3xl font-bold text-[#3b2550] mt-1">
                Você é Padrinho ou Madrinha?
              </h3>
              <p className="font-serif-cormorant text-base sm:text-lg italic text-[#5f4773] max-w-md mx-auto mt-2">
                Preparamos um guia exclusivo com a paleta oficial (Lavanda, Lilás Suave, Rosé & Champanhe), traje dos padrinhos e o horário especial de chegada às 14:15h.
              </p>
            </div>
            <button
              onClick={() => setPadrinhosOpen(true)}
              className="py-3 px-8 rounded-xl bg-gradient-to-r from-[#7a5999] via-[#654385] to-[#7a5999] hover:from-[#6c4c87] hover:to-[#583975] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              Abrir Manual dos Padrinhos
            </button>
          </div>
        </section>
      </main>

      {/* Footer with Monogram & Requested Rute 1:16b Biblical Verse */}
      <footer className="pt-12 pb-8 border-t border-[#e2d5eb] text-center space-y-4 bg-white/50 backdrop-blur-xs">
        <div className="flex justify-center">
          <MonogramCrest size="sm" showSubtitle={false} />
        </div>

        {/* Requested Quote */}
        <div className="max-w-md mx-auto px-4">
          <p className="font-serif-cormorant text-xl italic text-[#4b355e] leading-relaxed">
            "{WEDDING_EVENT.closingVerse || 'Porque aonde quer que tu fores irei eu, e onde quer que pousares, ali pousarei eu.'}"
          </p>
          <p className="font-sans-body text-xs uppercase tracking-widest text-[#9375ab] font-bold mt-1">
            {WEDDING_EVENT.verseReference || 'Rute 1:16b'}
          </p>
        </div>

        <p className="text-xs tracking-widest uppercase text-[#7e6991]">
          Vitória & Kauã · 11 de Julho de 2027 · Chalé Enfesta
        </p>

        <div className="pt-4 flex items-center justify-center gap-4 text-xs text-[#8c749e]">
          <button
            onClick={() => setEnvelopeOpen(true)}
            className="hover:text-[#432d56] underline transition-colors"
          >
            Reabrir Envelope
          </button>
          <span>·</span>
          <button
            onClick={() => setAdminOpen(true)}
            className="hover:text-[#432d56] underline transition-colors"
          >
            Acesso dos Noivos (Painel)
          </button>
        </div>
      </footer>

      {/* Modals */}
      <PadrinhosModal
        isOpen={padrinhosOpen}
        onClose={() => setPadrinhosOpen(false)}
      />

      <PhotoAlbumModal
        isOpen={albumOpen}
        onClose={() => setAlbumOpen(false)}
      />

      <AdminPanelModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      <GiftsPixModal
        isOpen={giftsOpen}
        onClose={() => setGiftsOpen(false)}
      />
    </div>
  );
}
