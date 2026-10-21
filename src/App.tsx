import React, { useState, useEffect } from 'react';
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
import { Heart, Sparkles, Gift, Camera, Mail } from 'lucide-react';
import { WEDDING_EVENT } from './utils/rsvp';

export default function App() {
  // Check if URL has ?autostart=1 to skip envelope directly (Ultra mode requirement)
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
  const [musicTrigger, setMusicTrigger] = useState(false);

  const handleOpenInvitation = () => {
    setEnvelopeOpen(false);
    setMusicTrigger(true);
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
    <div className="min-h-screen bg-wedding-linen font-sans-body pb-24 md:pb-12 text-[#2c332d] relative selection:bg-[#d8c2aa]">
      {/* Delicate floating background rose petals */}
      <PetalsEffect />

      {/* Romantic Audio Player */}
      <AudioPlayer autoPlayTrigger={musicTrigger} />

      {/* Interactive Envelope Initial Screen */}
      <EnvelopeModal
        isOpen={envelopeOpen}
        onOpenInvitation={handleOpenInvitation}
      />

      {/* Clean 3-zone Header & Mobile Navigation */}
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
        {/* Hero Section with Official Invitation Text and Countdown */}
        <HeroInvitation
          onOpenEnvelope={() => setEnvelopeOpen(true)}
          onNavigateRsvp={scrollToRsvp}
          onNavigatePadrinhos={() => setPadrinhosOpen(true)}
          onNavigateLocation={scrollToLocal}
        />

        {/* Feature Banner: Gift Registry / Pix & Collaborative Photos */}
        <section className="py-6 px-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quick Gift Box */}
            <div
              onClick={() => setGiftsOpen(true)}
              className="p-6 rounded-2xl bg-white/90 border border-[#e4d8c8] wedding-card-shadow cursor-pointer hover:border-[#b89b82] transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#f7f3ec] text-[#6d5b4a] group-hover:scale-110 transition-transform">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-cormorant text-xl font-semibold text-[#2c382c]">
                    Lista de Presentes & Pix
                  </h3>
                  <p className="text-xs text-[#786b5e]">
                    Cotas simbólicas de lua de mel e chave Pix dos noivos
                  </p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-wider text-[#3e533e] font-semibold underline shrink-0">
                Acessar
              </span>
            </div>

            {/* Quick Collaborative Album */}
            <div
              onClick={() => setAlbumOpen(true)}
              className="p-6 rounded-2xl bg-white/90 border border-[#e4d8c8] wedding-card-shadow cursor-pointer hover:border-[#b89b82] transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#f2ede4] text-[#486348] group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-cormorant text-xl font-semibold text-[#2c382c]">
                    Álbum por QR Code
                  </h3>
                  <p className="text-xs text-[#786b5e]">
                    Veja como compartilhar suas fotos no dia do casamento
                  </p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-wider text-[#3e533e] font-semibold underline shrink-0">
                Acessar
              </span>
            </div>
          </div>
        </section>

        {/* Event Details: Date, Time, Venue, Maps, Timeline */}
        <EventDetails />

        {/* RSVP Confirmation Section */}
        <RsvpSection />

        {/* Special Godparents Banner */}
        <section className="py-10 px-4 max-w-4xl mx-auto">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#faf6ef] via-[#f5eee3] to-[#faf6ef] border border-[#d9ccbe] text-center space-y-4 wedding-card-shadow">
            <div className="w-12 h-12 rounded-full bg-[#f0e7db] text-[#556955] flex items-center justify-center mx-auto shadow-inner">
              <Sparkles className="w-6 h-6 text-[#b58b6e]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#796b5c] font-semibold block">
                Área Especial Privada
              </span>
              <h3 className="font-serif-cormorant text-3xl font-semibold text-[#2c382c] mt-1">
                Você é Padrinho ou Madrinha?
              </h3>
              <p className="font-serif-cormorant text-base italic text-[#635548] max-w-md mx-auto mt-2">
                Preparamos um guia exclusivo com a paleta oficial de vestidos, dicas de terno e o horário especial de chegada às 14:15h.
              </p>
            </div>
            <button
              onClick={() => setPadrinhosOpen(true)}
              className="py-3 px-8 rounded-xl bg-[#3e533e] hover:bg-[#324532] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              Abrir Manual dos Padrinhos
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pt-12 pb-8 border-t border-[#e8ded1] text-center space-y-4">
        <div className="flex justify-center">
          <MonogramCrest size="sm" showSubtitle={false} />
        </div>
        <p className="font-serif-cormorant text-xl italic text-[#55473a]">
          "{WEDDING_EVENT.openingQuote}"
        </p>
        <p className="text-xs tracking-widest uppercase text-[#7d6f61]">
          Vitória & Kauã · 11 de Julho de 2027 · Chalé Enfesta
        </p>

        <div className="pt-4 flex items-center justify-center gap-4 text-xs text-[#8a7a6c]">
          <button
            onClick={() => setEnvelopeOpen(true)}
            className="hover:text-[#2c382c] underline transition-colors"
          >
            Reabrir Envelope
          </button>
          <span>·</span>
          <button
            onClick={() => setAdminOpen(true)}
            className="hover:text-[#2c382c] underline transition-colors"
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
