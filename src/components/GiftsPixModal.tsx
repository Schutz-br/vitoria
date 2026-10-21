import React, { useState } from 'react';
import { X, Gift, Copy, Check, Heart, Sparkles, Send } from 'lucide-react';
import { WEDDING_EVENT } from '../utils/rsvp';

interface GiftsPixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GIFT_QUOTAS = [
  { id: '1', title: 'Um brinde dos noivos à beira-mar', value: 'R$ 50', desc: 'Para celebrar o pôr do sol na lua de mel' },
  { id: '2', title: 'Jantar romântico à luz de velas', value: 'R$ 120', desc: 'Com vinho especial e sobremesa dos noivos' },
  { id: '3', title: 'Passeio de barco dos recém-casados', value: 'R$ 200', desc: 'Navegando por águas cristalinas' },
  { id: '4', title: 'Café da manhã dos sonhos na cama', value: 'R$ 80', desc: 'Começando o dia com muito mimo e afeto' },
  { id: '5', title: 'Cota de Amor Livre', value: 'Qualquer Valor', desc: 'Seu carinho do tamanho que seu coração desejar' }
];

export const GiftsPixModal: React.FC<GiftsPixModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [selectedQuota, setSelectedQuota] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(WEDDING_EVENT.pixKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Lista de Presentes e Pix dos Noivos"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl my-auto bg-white rounded-2xl shadow-2xl border border-[#e2d6c7] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#f8f5ee] border-b border-[#e5d9cc] shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#3e533e] text-white">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-cormorant text-xl font-semibold text-[#2c382c]">
                Lista de Presentes & Cotas de Lua de Mel
              </h3>
              <p className="text-[11px] text-[#716353]">O maior presente é compartilhar este dia com você</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Fechar lista de presentes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="text-center space-y-2 max-w-lg mx-auto">
            <span className="text-[11px] uppercase tracking-widest text-[#796959] font-semibold">
              Gesto de Carinho
            </span>
            <h4 className="font-serif-cormorant text-2xl text-[#2c382c] font-semibold">
              Nosso Lar & Nossa Lua de Mel
            </h4>
            <p className="font-serif-cormorant text-base italic text-[#5f5142]">
              "Sua presença é o nosso presente mais precioso. Mas, se desejar nos presentear de forma simbólica, criamos cotas da nossa viagem dos sonhos!"
            </p>
          </div>

          {/* Pix Key Card */}
          <div className="p-6 rounded-2xl bg-[#faf7f2] border border-[#e6dacf] text-center space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#7b6d5f] font-semibold block">
              Chave Pix Oficial dos Noivos
            </span>

            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#d6c7b3] shadow-xs max-w-full">
              <span className="font-mono text-sm sm:text-base font-semibold text-[#2c382c] select-all truncate">
                {WEDDING_EVENT.pixKey}
              </span>
              <button
                onClick={handleCopyPix}
                className="p-1.5 rounded-lg text-[#3e533e] hover:bg-[#f2ede4] transition-colors shrink-0"
                title="Copiar Chave Pix"
                aria-label="Copiar chave Pix dos noivos"
              >
                {copiedKey ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="text-xs text-[#716353] space-y-0.5">
              <p>Tipo de Chave: <strong>{WEDDING_EVENT.pixType}</strong></p>
              <p>Favorecido: <strong>{WEDDING_EVENT.pixRecipient}</strong> · Banco: <strong>{WEDDING_EVENT.pixBank}</strong></p>
            </div>

            {copiedKey && (
              <p className="text-xs text-emerald-700 font-semibold animate-fade-in">
                Chave Pix copiada com sucesso para a área de transferência!
              </p>
            )}
          </div>

          {/* Quotas Grid */}
          <div>
            <h5 className="font-serif-cormorant text-xl text-[#2c382c] font-semibold mb-3">
              Cotas Simbólicas de Lua de Mel
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GIFT_QUOTAS.map(q => (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuota(q.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedQuota === q.id
                      ? 'bg-[#f4f7f4] border-[#819e81] shadow-sm'
                      : 'bg-white border-[#e5d9cb] hover:border-[#bfae99]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h6 className="font-serif-cormorant text-base font-semibold text-[#2c382c]">{q.title}</h6>
                    <span className="font-sans-body text-xs font-bold text-[#3e533e] bg-[#f2ede4] px-2 py-0.5 rounded-md">
                      {q.value}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#716353] mt-1">{q.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#f8f5ee] border-t border-[#e5d9cc] text-right shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
