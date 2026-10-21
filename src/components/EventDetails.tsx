import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, Car, Sparkles, Clock, Camera } from 'lucide-react';
import { WEDDING_EVENT } from '../utils/rsvp';

export const EventDetails: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const fullAddress = `${WEDDING_EVENT.venueName}, ${WEDDING_EVENT.address} – ${WEDDING_EVENT.neighborhood}, ${WEDDING_EVENT.city}, CEP ${WEDDING_EVENT.cep}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Chalé Enfesta, R. 1º de Maio, 42, Parque Paulista, Duque de Caxias - RJ'
  )}`;

  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(
    'Chalé Enfesta R 1 de Maio 42 Duque de Caxias'
  )}`;

  return (
    <section id="local" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#726456] font-medium mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#b28b6d]" />
          <span>Localização & Detalhes</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl text-[#2c382c] tracking-wide font-normal">
          Onde o Nosso Sonho Acontece
        </h2>
        <p className="font-serif-cormorant text-base italic text-[#6a5e52] mt-1">
          Um refúgio verde encantador para vivermos momentos inesquecíveis.
        </p>
      </div>

      {/* Venue Card */}
      <div className="bg-white/90 rounded-2xl overflow-hidden border border-[#e5d9ca] wedding-card-shadow">
        {/* Venue Photo Replacement */}
        <div className="relative h-56 sm:h-64 w-full bg-[#f6f1e8] border-b border-[#e5d9ca] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-[#eadecd] text-[#716152] flex items-center justify-center mb-3 shadow-inner">
            <Camera className="w-6 h-6 text-[#8a725e]" />
          </div>
          <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-semibold text-[#2c382c] tracking-wide">
            Fotos aqui
          </h3>
          <span className="text-xs uppercase tracking-widest text-[#7b6d5e] mt-2 font-medium">
            Espaço de Cerimônia & Recepção · {WEDDING_EVENT.venueName}
          </span>
        </div>

        {/* Address & Fast Navigation */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#eee3d5]">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#f2ede4] text-[#4f684f] shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-base text-[#2c382c]">{WEDDING_EVENT.venueName}</p>
                <p className="text-sm text-[#5d5144]">
                  {WEDDING_EVENT.address} – {WEDDING_EVENT.neighborhood}
                </p>
                <p className="text-sm text-[#7a6d5f]">
                  {WEDDING_EVENT.city} · CEP {WEDDING_EVENT.cep}
                </p>
              </div>
            </div>

            <button
              onClick={copyAddress}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f7f4ee] hover:bg-[#ede5d8] border border-[#d8c8b4] text-xs font-medium text-[#465346] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#3e533e]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Endereço Copiado!' : 'Copiar Endereço'}</span>
            </button>
          </div>

          {/* Direct Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#3e533e] hover:bg-[#324332] text-white text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-[0.99]"
            >
              <Navigation className="w-4 h-4" />
              <span>Abrir no Google Maps</span>
            </a>

            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-white hover:bg-[#faf7f2] border border-[#d8c9b6] text-[#3e533e] text-xs sm:text-sm font-medium transition-all active:scale-[0.99]"
            >
              <Car className="w-4 h-4 text-[#4f684f]" />
              <span>Abrir no Waze</span>
            </a>
          </div>

          {/* Timeline of the Day */}
          <div className="pt-4">
            <h4 className="font-serif-cormorant text-xl text-[#2c382c] font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8a705a]" />
              <span>Cronograma da Celebração</span>
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-4 p-3 rounded-xl bg-[#faf7f2] border border-[#ede3d5]">
                <span className="font-serif-cormorant text-lg font-semibold text-[#486048] shrink-0 tabular-nums">
                  14:15h
                </span>
                <div>
                  <p className="font-medium text-sm text-[#2c382c]">Chegada dos Padrinhos & Família</p>
                  <p className="text-xs text-[#716556]">Alinhamento do cortejo e primeiras fotos oficiais no chalé.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-xl bg-[#faf7f2] border border-[#ede3d5]">
                <span className="font-serif-cormorant text-lg font-semibold text-[#486048] shrink-0 tabular-nums">
                  14:45h
                </span>
                <div>
                  <p className="font-medium text-sm text-[#2c382c]">Acolhida dos Convidados</p>
                  <p className="text-xs text-[#716556]">Música suave, welcome drinks refrescantes e acomodação no jardim.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-xl bg-[#f2ebe0] border border-[#dfd3c1]">
                <span className="font-serif-cormorant text-lg font-bold text-[#324532] shrink-0 tabular-nums">
                  15:00h
                </span>
                <div>
                  <p className="font-semibold text-sm text-[#242e24]">Início Pontual da Cerimônia</p>
                  <p className="text-xs text-[#635547]">O momento mais esperado: a entrada dos noivos e a troca dos votos.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-xl bg-[#faf7f2] border border-[#ede3d5]">
                <span className="font-serif-cormorant text-lg font-semibold text-[#486048] shrink-0 tabular-nums">
                  16:15h
                </span>
                <div>
                  <p className="font-medium text-sm text-[#2c382c]">Recepção, Brinde & Gastronomia</p>
                  <p className="text-xs text-[#716556]">Coquetel especial, sabores selecionados pelos noivos e muita celebração.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-xl bg-[#faf7f2] border border-[#ede3d5]">
                <span className="font-serif-cormorant text-lg font-semibold text-[#486048] shrink-0 tabular-nums">
                  18:00h
                </span>
                <div>
                  <p className="font-medium text-sm text-[#2c382c]">Bolo dos Noivos & Pista de Dança</p>
                  <p className="text-xs text-[#716556]">Abertura da pista de dança para curtirmos juntos até a noite!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Helpful Tips Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#faf8f4] border border-[#e8ded0]">
              <h5 className="font-semibold text-xs uppercase tracking-wider text-[#6b5d4f] mb-1">Traje Sugerido</h5>
              <p className="text-sm text-[#3a443a]">
                <strong>Passeio Completo ou Esporte Fino:</strong> Vestidos florais ou em tons suaves, ternos ou camisas elegantes. O branco é exclusivo da noiva!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#faf8f4] border border-[#e8ded0]">
              <h5 className="font-semibold text-xs uppercase tracking-wider text-[#6b5d4f] mb-1">Estacionamento & Chegada</h5>
              <p className="text-sm text-[#3a443a]">
                Estacionamento amplo e gratuito no Chalé Enfesta. Para quem for de aplicativo, o local tem acesso direto via Uber e 99.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
