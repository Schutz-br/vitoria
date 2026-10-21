import React, { useState } from 'react';
import { Heart, CheckCircle2, XCircle, Send, MessageSquare, Plus, Trash2, Sparkles, Share2 } from 'lucide-react';
import { saveRSVP, buildWhatsAppRSVPLink } from '../utils/rsvp';
import { GuestRSVP } from '../types/wedding';

interface RsvpSectionProps {
  onRsvpSubmitted?: (newEntry: GuestRSVP) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onRsvpSubmitted }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<boolean>(true);
  const [companions, setCompanions] = useState<string[]>([]);
  const [companionInput, setCompanionInput] = useState('');
  const [dietary, setDietary] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEntry, setSubmittedEntry] = useState<GuestRSVP | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddCompanion = () => {
    if (!companionInput.trim()) return;
    setCompanions([...companions, companionInput.trim()]);
    setCompanionInput('');
  };

  const handleRemoveCompanion = (index: number) => {
    setCompanions(companions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor, informe seu nome completo.');
      return;
    }

    if (!phone.trim()) {
      setErrorMsg('Por favor, informe seu WhatsApp para mantermos contato.');
      return;
    }

    setIsSubmitting(true);

    const newEntry = saveRSVP({
      name: name.trim(),
      phone: phone.trim(),
      attending,
      adultsCount: attending ? 1 + companions.length : 0,
      childrenCount: 0,
      companions: attending ? companions : [],
      dietaryRestrictions: attending ? dietary.trim() : '',
      message: message.trim()
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedEntry(newEntry);
      if (onRsvpSubmitted) onRsvpSubmitted(newEntry);
    }, 400);
  };

  const handleResetForm = () => {
    setName('');
    setPhone('');
    setAttending(true);
    setCompanions([]);
    setDietary('');
    setMessage('');
    setSubmittedEntry(null);
  };

  const whatsAppLink = submittedEntry
    ? buildWhatsAppRSVPLink({
        guestName: submittedEntry.name,
        attending: submittedEntry.attending,
        companions: submittedEntry.companions,
        dietaryRestrictions: submittedEntry.dietaryRestrictions,
        message: submittedEntry.message
      })
    : '';

  return (
    <section id="rsvp" className="py-12 px-4 sm:px-6 max-w-2xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#786a5b] font-medium mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#b28b6d]" />
          <span>Confirmação de Presença</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl text-[#2c382c] tracking-wide font-normal">
          Você Estará Conosco?
        </h2>
        <p className="font-serif-cormorant text-base italic text-[#6a5e52] mt-1 max-w-md mx-auto">
          Sua presença tornará o nosso dia completo. Por favor, confirme até 01 de Junho de 2027.
        </p>
      </div>

      <div className="bg-white/95 rounded-2xl p-6 sm:p-8 border border-[#e6dacf] wedding-card-shadow relative overflow-hidden">
        {/* Subtle decorative edge */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d9beaa] via-[#819e81] to-[#d9beaa]" />

        {submittedEntry ? (
          /* Confirmation Success Screen */
          <div className="text-center py-6 space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#f0f5f0] text-[#416241] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="font-serif-cormorant text-xs uppercase tracking-widest text-[#7a6d5f]">
                Confirmação Registrada
              </span>
              <h3 className="font-serif-cormorant text-3xl text-[#2c382c] font-semibold mt-1">
                {submittedEntry.attending
                  ? 'Que alegria ter você conosco!'
                  : 'Sentiremos sua falta!'}
              </h3>
              <p className="font-serif-cormorant text-base italic text-[#625648] mt-2 max-w-sm mx-auto">
                {submittedEntry.attending
                  ? 'Sua presença já está confirmada na nossa lista de convidados para o dia 11 de Julho de 2027.'
                  : 'Agradecemos de coração pelo carinho e pelas boas energias enviadas para nós!'}
              </p>
            </div>

            {/* Confirmation Summary Card */}
            <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e8ded0] text-left max-w-md mx-auto text-sm space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-[#e9e0d4]">
                <span className="text-xs uppercase tracking-wider text-[#796d60]">Convidado(a):</span>
                <span className="font-semibold text-[#2c382c]">{submittedEntry.name}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#e9e0d4]">
                <span className="text-xs uppercase tracking-wider text-[#796d60]">Status:</span>
                <span className={`font-semibold ${submittedEntry.attending ? 'text-[#3e5e3e]' : 'text-[#874242]'}`}>
                  {submittedEntry.attending ? 'Confirmado' : 'Não comparecerá'}
                </span>
              </div>
              {submittedEntry.attending && submittedEntry.companions.length > 0 && (
                <div className="flex justify-between items-start pb-2 border-b border-[#e9e0d4]">
                  <span className="text-xs uppercase tracking-wider text-[#796d60]">Acompanhantes:</span>
                  <span className="font-medium text-[#2c382c] text-right">
                    {submittedEntry.companions.join(', ')} ({submittedEntry.companions.length + 1} pessoas no total)
                  </span>
                </div>
              )}
              {submittedEntry.message && (
                <div className="pt-1">
                  <span className="text-xs uppercase tracking-wider text-[#796d60] block mb-0.5">Mensagem:</span>
                  <p className="text-xs italic text-[#4b584b]">"{submittedEntry.message}"</p>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Send Button */}
            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs sm:text-sm tracking-wide uppercase shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Enviar pelo WhatsApp dos Noivos</span>
              </a>

              <button
                onClick={handleResetForm}
                className="text-xs text-[#736555] hover:text-[#2c382c] underline transition-colors"
              >
                Editar ou enviar nova confirmação
              </button>
            </div>
          </div>
        ) : (
          /* Form Mode */
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center font-medium">
                {errorMsg}
              </div>
            )}

            {/* Attendance Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#524538] mb-2 text-center">
                Você poderá comparecer?
              </label>
              <div className="grid grid-cols-2 gap-3 p-1 bg-[#f4eee6] rounded-xl">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`py-3 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    attending
                      ? 'bg-white text-[#2f422f] shadow-sm font-semibold'
                      : 'text-[#6f6153] hover:text-[#2c382c]'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${attending ? 'text-[#446244]' : 'text-gray-400'}`} />
                  <span>Sim, confirmo!</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`py-3 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    !attending
                      ? 'bg-white text-[#833838] shadow-sm font-semibold'
                      : 'text-[#6f6153] hover:text-[#2c382c]'
                  }`}
                >
                  <XCircle className={`w-4 h-4 ${!attending ? 'text-[#833838]' : 'text-gray-400'}`} />
                  <span>Não poderei ir</span>
                </button>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="rsvp-name" className="block text-xs font-semibold uppercase tracking-wider text-[#55473a] mb-1.5">
                Seu Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                placeholder="Ex: Mariana Silva"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#faf8f4] border border-[#d9ccbd] text-sm text-[#2c382c] placeholder-[#9f9181] focus:outline-none focus:ring-2 focus:ring-[#819e81] focus:border-transparent transition-all"
              />
            </div>

            {/* WhatsApp Phone */}
            <div>
              <label htmlFor="rsvp-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#55473a] mb-1.5">
                Seu WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                id="rsvp-phone"
                type="tel"
                required
                placeholder="Ex: (21) 98765-4321"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#faf8f4] border border-[#d9ccbd] text-sm text-[#2c382c] placeholder-[#9f9181] focus:outline-none focus:ring-2 focus:ring-[#819e81] focus:border-transparent transition-all"
              />
            </div>

            {/* Companions (Only if attending) */}
            {attending && (
              <div className="space-y-3 pt-2 border-t border-[#ede3d6]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#55473a]">
                    Acompanhantes
                  </label>
                  <span className="text-xs text-[#7e7062]">
                    Total com você: {1 + companions.length} pessoa(s)
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nome do acompanhante..."
                    value={companionInput}
                    onChange={e => setCompanionInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCompanion();
                      }
                    }}
                    className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-[#faf8f4] border border-[#d9ccbd] text-sm text-[#2c382c] placeholder-[#9f9181] focus:outline-none focus:ring-2 focus:ring-[#819e81]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCompanion}
                    className="px-3 py-2.5 rounded-xl bg-[#f2ede4] hover:bg-[#e6decb] text-[#3e533e] font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar</span>
                  </button>
                </div>

                {companions.length > 0 && (
                  <ul className="space-y-1.5 pt-1">
                    {companions.map((comp, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#faf7f2] border border-[#ede3d5] text-xs text-[#3b473b]"
                      >
                        <span className="font-medium">{idx + 1}. {comp}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCompanion(idx)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title="Remover acompanhante"
                          aria-label={`Remover acompanhante ${comp}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Dietary Notes */}
                <div className="pt-2">
                  <label htmlFor="rsvp-dietary" className="block text-xs font-semibold uppercase tracking-wider text-[#55473a] mb-1.5">
                    Restrições Alimentares (Opcional)
                  </label>
                  <input
                    id="rsvp-dietary"
                    type="text"
                    placeholder="Ex: Vegetariano, celíaco, alergia a frutos do mar..."
                    value={dietary}
                    onChange={e => setDietary(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f4] border border-[#d9ccbd] text-sm text-[#2c382c] placeholder-[#9f9181] focus:outline-none focus:ring-2 focus:ring-[#819e81]"
                  />
                </div>
              </div>
            )}

            {/* Loving message to the couple */}
            <div className="pt-2 border-t border-[#ede3d6]">
              <label htmlFor="rsvp-message" className="block text-xs font-semibold uppercase tracking-wider text-[#55473a] mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#886e57]" />
                <span>Mensagem de Carinho aos Noivos (Opcional)</span>
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                placeholder="Deixe seus votos, carinho ou uma lembrança especial para Vitória & Kauã..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f4] border border-[#d9ccbd] text-sm text-[#2c382c] placeholder-[#9f9181] focus:outline-none focus:ring-2 focus:ring-[#819e81]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-[#3e533e] hover:bg-[#324532] text-white text-xs sm:text-sm font-medium tracking-wider uppercase transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{isSubmitting ? 'Registrando Presença...' : 'Confirmar Minha Presença'}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
