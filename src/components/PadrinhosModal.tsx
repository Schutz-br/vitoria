import React, { useState } from 'react';
import { X, Lock, Heart, Clock, Sparkles, Shirt, Check, Share2, Info } from 'lucide-react';

interface PadrinhosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PadrinhosModal: React.FC<PadrinhosModalProps> = ({ isOpen, onClose }) => {
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<'madrinhas' | 'padrinhos' | 'horarios' | 'missao'>('madrinhas');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pin.trim().toLowerCase();
    if (
      cleanPin === 'padrinhos2027' ||
      cleanPin === 'padrinhos' ||
      cleanPin === '2027' ||
      cleanPin === 'amor'
    ) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleShareWhatsApp = () => {
    const text = `*Manual dos Padrinhos — Vitória & Kauã*\n` +
      `💍 Casamento: 11 de Julho de 2027 às 15h\n` +
      `📍 Local: Chalé Enfesta\n` +
      `⏰ *Chegada dos Padrinhos:* 14:15h pontual para fotos e alinhamento do cortejo!\n` +
      `👗 Madrinhas: Vestido longo na paleta Verde Sálvia / Rosé / Terracota Suave.\n` +
      `👔 Padrinhos: Terno elegante com a gravata oficial do kit dos noivos.\n` +
      `Acesse o manual completo no convite digital!`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const madrinhasColors = [
    { name: 'Verde Sálvia', hex: '#819e81', desc: 'Serenidade & elegância natural' },
    { name: 'Rosé Suave', hex: '#d9a69b', desc: 'Romantismo e doçura delicada' },
    { name: 'Champanhe Seda', hex: '#d8c2aa', desc: 'Luminosidade sofisticada' },
    { name: 'Terracota Claro', hex: '#bf8470', desc: 'Calor e aconchego acolhedor' }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Manual dos Padrinhos"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl my-auto bg-white rounded-2xl shadow-2xl border border-[#e2d6c7] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#f8f5ee] border-b border-[#e5d9cc] shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#3e533e] text-white">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-serif-cormorant text-xl font-semibold text-[#2c382c]">
                Manual dos Padrinhos & Madrinhas
              </h3>
              <p className="text-[11px] text-[#716353]">Área exclusiva para quem guardamos no coração</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Fechar manual dos padrinhos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isUnlocked ? (
          /* Locked State */
          <div className="p-8 text-center max-w-sm mx-auto my-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#f4eee4] text-[#81654a] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-serif-cormorant text-2xl text-[#2c382c] font-semibold">
              Espaço Reservado
            </h4>
            <p className="text-xs text-[#6e5f50]">
              Este manual foi preparado com todo carinho especialmente para os nossos padrinhos e madrinhas. Digite o código de acesso:
            </p>

            <form onSubmit={handleUnlock} className="space-y-3 pt-2">
              <input
                type="text"
                placeholder="Código (ex: PADRINHOS)"
                value={pin}
                onChange={e => setPin(e.target.value)}
                className="w-full px-4 py-3 text-center uppercase tracking-widest text-sm rounded-xl border border-[#d6c7b3] focus:outline-none focus:ring-2 focus:ring-[#819e81]"
                autoFocus
              />

              {error && (
                <p className="text-xs text-red-600 font-medium">
                  Código incorreto. Digite "PADRINHOS" ou "2027".
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#3e533e] hover:bg-[#324532] text-white text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Acessar Manual
              </button>
            </form>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setPin('PADRINHOS');
                  setIsUnlocked(true);
                }}
                className="text-xs text-[#526352] hover:underline"
              >
                (Toque aqui para desbloqueio rápido como Padrinho)
              </button>
            </div>
          </div>
        ) : (
          /* Unlocked Content */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Heartfelt Note from the Couple */}
            <div className="p-6 rounded-2xl bg-[#faf7f2] border border-[#e6dacf] text-center space-y-3 relative overflow-hidden">
              <span className="text-[11px] uppercase tracking-widest text-[#796959] font-semibold block">
                Com todo o nosso amor
              </span>
              <h4 className="font-serif-cormorant text-2xl sm:text-3xl text-[#2c382c] font-semibold">
                Vocês São Nossas Testemunhas de Amor
              </h4>
              <p className="font-serif-cormorant text-base sm:text-lg italic text-[#57493c] leading-relaxed max-w-xl mx-auto">
                "Não poderíamos dar esse passo sem vocês ao nosso lado. Vocês acompanharam nossa história, nossas risadas, nossos sonhos e hoje têm um lugar de honra no altar de nossas vidas."
              </p>
              <p className="text-xs text-[#7d6f61] font-medium tracking-wide">
                — Vitória & Kauã
              </p>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#f4eee4] rounded-xl text-xs overflow-x-auto">
              <button
                onClick={() => setTab('madrinhas')}
                className={`flex-1 py-2 px-3 rounded-lg whitespace-nowrap transition-colors font-medium ${
                  tab === 'madrinhas' ? 'bg-white text-[#2c382c] shadow-xs' : 'text-[#6c5e50]'
                }`}
              >
                👗 Vestidos das Madrinhas
              </button>
              <button
                onClick={() => setTab('padrinhos')}
                className={`flex-1 py-2 px-3 rounded-lg whitespace-nowrap transition-colors font-medium ${
                  tab === 'padrinhos' ? 'bg-white text-[#2c382c] shadow-xs' : 'text-[#6c5e50]'
                }`}
              >
                👔 Traje dos Padrinhos
              </button>
              <button
                onClick={() => setTab('horarios')}
                className={`flex-1 py-2 px-3 rounded-lg whitespace-nowrap transition-colors font-medium ${
                  tab === 'horarios' ? 'bg-white text-[#2c382c] shadow-xs' : 'text-[#6c5e50]'
                }`}
              >
                ⏰ Horário Especial (14:15h)
              </button>
              <button
                onClick={() => setTab('missao')}
                className={`flex-1 py-2 px-3 rounded-lg whitespace-nowrap transition-colors font-medium ${
                  tab === 'missao' ? 'bg-white text-[#2c382c] shadow-xs' : 'text-[#6c5e50]'
                }`}
              >
                ✨ Missão do Padrinho
              </button>
            </div>

            {/* Tab 1: Madrinhas */}
            {tab === 'madrinhas' && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h5 className="font-serif-cormorant text-xl text-[#2c382c] font-semibold mb-1">
                    Paleta de Cores das Madrinhas
                  </h5>
                  <p className="text-xs text-[#6e5f50]">
                    Para criar uma harmonia fotográfica encantadora no altar, preparamos uma paleta botânica suave:
                  </p>
                </div>

                {/* Color Swatches Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {madrinhasColors.map(c => (
                    <div key={c.name} className="p-3 bg-white rounded-xl border border-[#e5d9cb] text-center shadow-xs">
                      <div
                        className="w-full h-16 rounded-lg mb-2 shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="font-serif-cormorant text-base font-semibold text-[#2c382c] block">
                        {c.name}
                      </span>
                      <span className="text-[10px] text-[#786b5e] block mt-0.5">{c.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e8ded0] space-y-2 text-xs text-[#4b584b]">
                  <p className="font-semibold text-xs text-[#2c382c] uppercase tracking-wider">
                    Dicas de Estilo para Madrinhas:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[#56493b]">
                    <li><strong>Comprimento:</strong> Vestido longo (fluido e confortável para a tarde).</li>
                    <li><strong>Tecidos:</strong> Chiffon, crepe fluido, musseline de seda ou linho refinado.</li>
                    <li><strong>Acessórios:</strong> Delicados, brincos e pulseiras que complementem com leveza.</li>
                    <li><strong>Atenção:</strong> Por favor, evite tons de branco, off-white, marfim e preto total.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Padrinhos */}
            {tab === 'padrinhos' && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h5 className="font-serif-cormorant text-xl text-[#2c382c] font-semibold mb-1">
                    Guia de Traje dos Padrinhos
                  </h5>
                  <p className="text-xs text-[#6e5f50]">
                    Elegância clássica e alinhamento impecável para o altar.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white border border-[#e5d9cb] text-center">
                    <span className="text-2xl mb-1 block">👔</span>
                    <h6 className="font-serif-cormorant text-base font-semibold text-[#2c382c]">Terno Elegante</h6>
                    <p className="text-[11px] text-[#6e5f50] mt-1">
                      Cinza médio/areia ou azul marinho clássico. Corte slim bem ajustado.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#e5d9cb] text-center">
                    <span className="text-2xl mb-1 block">👔</span>
                    <h6 className="font-serif-cormorant text-base font-semibold text-[#2c382c]">Camisa Branca</h6>
                    <p className="text-[11px] text-[#6e5f50] mt-1">
                      Camisa social branca de manga longa, passada com carinho.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#e5d9cb] text-center">
                    <span className="text-2xl mb-1 block">🌸</span>
                    <h6 className="font-serif-cormorant text-base font-semibold text-[#2c382c]">Gravata & Lapela</h6>
                    <p className="text-[11px] text-[#6e5f50] mt-1">
                      A gravata oficial será entregue no kit e a flor de lapela colocada na chegada.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e8ded0] text-xs text-[#56493b] space-y-1">
                  <p className="font-semibold text-[#2c382c] uppercase tracking-wider">Calçados & Detalhes:</p>
                  <p>Sapato social de couro marrom ou preto com cinto na mesma cor.</p>
                </div>
              </div>
            )}

            {/* Tab 3: Horários */}
            {tab === 'horarios' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-5 rounded-xl bg-[#f2ebe0] border border-[#ded1be] flex items-center gap-4">
                  <div className="p-3 rounded-full bg-[#3e533e] text-white shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#695847] font-semibold">
                      Horário Especial de Chegada
                    </span>
                    <h5 className="font-serif-cormorant text-2xl font-bold text-[#242f24]">
                      14:15h Pontual no Chalé Enfesta
                    </h5>
                    <p className="text-xs text-[#584a3d] mt-1">
                      Os convidados chegam às 14:45h e a cerimônia começa às 15:00h pontualmente. Sua chegada antecipada é indispensável!
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#524436]">
                  <p className="font-semibold text-xs text-[#2c382c] uppercase tracking-wider">
                    Por que às 14:15h?
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Alinhamento com a cerimonialista sobre a ordem e o ritmo do cortejo.</li>
                    <li>Fixação das flores de lapela dos padrinhos e retoques finais.</li>
                    <li>Sessão exclusiva de fotos com os noivos antes do início da cerimônia.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 4: Missão */}
            {tab === 'missao' && (
              <div className="space-y-3 animate-fade-in text-xs text-[#524436]">
                <h5 className="font-serif-cormorant text-xl text-[#2c382c] font-semibold mb-2">
                  Os 5 Mandamentos do Padrinho / Madrinha
                </h5>

                <div className="p-3 rounded-xl bg-white border border-[#e5d9cb] flex items-start gap-3">
                  <span className="font-serif-cormorant text-lg font-bold text-[#3e533e] shrink-0">1.</span>
                  <div>
                    <h6 className="font-semibold text-sm text-[#2c382c]">Acalmar os Corações</h6>
                    <p className="text-[11px] text-gray-600">Seja o porto seguro dos noivos antes de pisarem no altar.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#e5d9cb] flex items-start gap-3">
                  <span className="font-serif-cormorant text-lg font-bold text-[#3e533e] shrink-0">2.</span>
                  <div>
                    <h6 className="font-semibold text-sm text-[#2c382c]">Taça Sempre Cheia</h6>
                    <p className="text-[11px] text-gray-600">Garanta que Vitória e Kauã estejam sempre hidratados e felizes.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#e5d9cb] flex items-start gap-3">
                  <span className="font-serif-cormorant text-lg font-bold text-[#3e533e] shrink-0">3.</span>
                  <div>
                    <h6 className="font-semibold text-sm text-[#2c382c]">Puxar a Pista de Dança</h6>
                    <p className="text-[11px] text-gray-600">Nada de timidez! A festa começa quando vocês vão para a pista.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#e5d9cb] flex items-start gap-3">
                  <span className="font-serif-cormorant text-lg font-bold text-[#3e533e] shrink-0">4.</span>
                  <div>
                    <h6 className="font-semibold text-sm text-[#2c382c]">Registrar Momentos Espontâneos</h6>
                    <p className="text-[11px] text-gray-600">Tire fotos divertidas e suba no nosso álbum colaborativo via QR Code.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#e5d9cb] flex items-start gap-3">
                  <span className="font-serif-cormorant text-lg font-bold text-[#3e533e] shrink-0">5.</span>
                  <div>
                    <h6 className="font-semibold text-sm text-[#2c382c]">Estar Presente para Sempre</h6>
                    <p className="text-[11px] text-gray-600">O casamento é um dia, mas a nossa amizade e cumplicidade são eternas.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Share with Godparents Button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wide uppercase transition-all shadow-sm"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Resumo Copiado para WhatsApp!' : 'Copiar Resumo para WhatsApp'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 bg-[#f8f5ee] border-t border-[#e5d9cc] text-right shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium transition-colors"
          >
            Fechar Manual
          </button>
        </div>
      </div>
    </div>
  );
};
