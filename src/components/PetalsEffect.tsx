import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const PetalsEffect: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(true);

  // Generate deterministic petal parameters
  const petals = Array.from({ length: 18 }).map((_, i) => {
    const left = (i * 5.5 + (i % 3) * 2) % 96;
    const duration = 7 + (i % 6) * 1.5;
    const delay = (i * 0.7) % 8;
    const size = 12 + (i % 4) * 4;
    const isBlush = i % 2 === 0;

    return {
      id: i,
      left: `${left}%`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      width: `${size}px`,
      height: `${size * 0.75}px`,
      color: isBlush ? '#f7d6cb' : '#fcedea',
      opacity: 0.65 + (i % 3) * 0.1
    };
  });

  return (
    <>
      {enabled && (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
          {petals.map(p => (
            <div
              key={p.id}
              className="petal-particle"
              style={{
                left: p.left,
                animationDuration: p.animationDuration,
                animationDelay: p.animationDelay,
                opacity: p.opacity
              }}
            >
              <svg
                width={p.width}
                height={p.height}
                viewBox="0 0 30 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 2 C22 -2, 29 6, 28 14 C27 20, 18 22, 15 20 C12 22, 3 20, 2 14 C1 6, 8 -2, 15 2 Z"
                  fill={p.color}
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* Floating subtle toggle button in bottom left */}
      <div className="fixed bottom-20 left-4 z-30 sm:bottom-6">
        <button
          onClick={() => setEnabled(!enabled)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs transition-all shadow-sm backdrop-blur-sm ${
            enabled
              ? 'bg-white/80 text-[#556955] border border-[#e2d8cb] hover:bg-white'
              : 'bg-white/50 text-[#8f8577] border border-transparent hover:bg-white/80'
          }`}
          title={enabled ? 'Pausar efeito de pétalas' : 'Ativar efeito de pétalas'}
          aria-label={enabled ? 'Pausar pétalas' : 'Ativar pétalas'}
        >
          <Sparkles className="w-3 h-3 text-[#c2967f]" />
          <span className="hidden xs:inline font-serif-cormorant text-xs italic">
            {enabled ? 'Pétalas ativas' : 'Pétalas'}
          </span>
        </button>
      </div>
    </>
  );
};
