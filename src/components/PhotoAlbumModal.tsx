import React, { useState } from 'react';
import { X, QrCode, Upload, Camera, Image as ImageIcon, Heart, Download } from 'lucide-react';
import { PhotoItem } from '../types/wedding';

interface PhotoAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_PHOTOS: PhotoItem[] = [];

export const PhotoAlbumModal: React.FC<PhotoAlbumModalProps> = ({ isOpen, onClose }) => {
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const stored = localStorage.getItem('vk_wedding_photos_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter((p: PhotoItem) => !p.url.includes('/src/assets/images/'));
        }
      }
    } catch {}
    return INITIAL_PHOTOS;
  });

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [guestName, setGuestName] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = event => {
      const result = event.target?.result as string;
      const newPhoto: PhotoItem = {
        id: 'p-' + Date.now(),
        url: result,
        caption: caption.trim() || 'Foto enviada com carinho no grande dia!',
        author: guestName.trim() || 'Convidado Especial',
        timestamp: 'Agora há pouco'
      };

      const updated = [newPhoto, ...photos];
      setPhotos(updated);
      try {
        // Save to localStorage (limit to last 15 photos to respect browser quota)
        localStorage.setItem('vk_wedding_photos_v2', JSON.stringify(updated.slice(0, 15)));
      } catch {}

      setIsUploading(false);
      setUploadSuccess(true);
      setCaption('');
      setTimeout(() => setUploadSuccess(false), 3000);
    };

    reader.readAsDataURL(file);
  };

  // QR Code SVG representation for live scanning by other guests
  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://casamentovitoriaekaua.com';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Álbum de Fotos por QR Code"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl my-auto bg-white rounded-2xl shadow-2xl border border-[#e2d6c7] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#f8f5ee] border-b border-[#e5d9cc] shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#3e533e] text-white">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-cormorant text-xl font-semibold text-[#2c382c]">
                Álbum Colaborativo de Fotos
              </h3>
              <p className="text-[11px] text-[#716353]">Compartilhe seus cliques no dia do casamento</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Fechar álbum de fotos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* QR Code Feature Card */}
          <div className="p-6 rounded-2xl bg-[#faf7f2] border border-[#e6dacf] flex flex-col md:flex-row items-center gap-6">
            {/* QR Code Container */}
            <div className="p-3 bg-white rounded-2xl shadow-md border border-[#e0d3c3] flex flex-col items-center shrink-0">
              <div className="w-36 h-36 bg-[#f4eee4] rounded-xl flex items-center justify-center p-2 relative">
                {/* SVG QR Code Illustration */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#3e533e]" fill="currentColor">
                  {/* Outer position markers */}
                  <rect x="5" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="12" y="12" width="14" height="14" rx="2" fill="currentColor" />

                  <rect x="67" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="74" y="12" width="14" height="14" rx="2" fill="currentColor" />

                  <rect x="5" y="67" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="12" y="74" width="14" height="14" rx="2" fill="currentColor" />

                  {/* QR Pattern dots */}
                  <rect x="42" y="10" width="8" height="8" rx="1" />
                  <rect x="54" y="18" width="6" height="6" rx="1" />
                  <rect x="42" y="28" width="8" height="6" rx="1" />
                  <rect x="12" y="44" width="8" height="8" rx="1" />
                  <rect x="26" y="44" width="8" height="6" rx="1" />
                  <rect x="42" y="44" width="16" height="16" rx="2" fill="#882c2c" />
                  <rect x="68" y="44" width="8" height="8" rx="1" />
                  <rect x="82" y="44" width="8" height="8" rx="1" />
                  <rect x="42" y="68" width="8" height="8" rx="1" />
                  <rect x="56" y="68" width="8" height="8" rx="1" />
                  <rect x="42" y="82" width="8" height="8" rx="1" />
                  <rect x="68" y="68" width="12" height="6" rx="1" />
                  <rect x="74" y="80" width="14" height="10" rx="1" />
                </svg>
                {/* Center VK badge */}
                <span className="absolute font-serif-cormorant text-[10px] font-bold text-white bg-[#7a2828] px-1 py-0.5 rounded shadow-xs">
                  VK
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#7e6d5e] font-semibold mt-2">
                Aponte a câmera do celular
              </span>
            </div>

            {/* Explanatory Text */}
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[11px] uppercase tracking-widest text-[#776757] font-semibold">
                No Dia do Casamento · 11.07.2027
              </span>
              <h4 className="font-serif-cormorant text-2xl text-[#2c382c] font-semibold">
                Fotografe e compartilhe em tempo real!
              </h4>
              <p className="text-xs sm:text-sm text-[#5d4f41] leading-relaxed">
                Este QR Code estará impresso nas mesas e no lounge do <strong>Chalé Enfesta</strong>. 
                Ao apontar a câmera do seu celular, você poderá enviar fotos e vídeos que tirou durante a festa direto para o álbum dos noivos!
              </p>
              <p className="text-xs text-[#7d6f61] italic">
                Vitória & Kauã terão todas as lembranças sob a perspectiva mais especial: a sua.
              </p>
            </div>
          </div>

          {/* Guest Photo Upload Area */}
          <div className="p-5 rounded-2xl bg-white border border-[#e6dacf] space-y-4">
            <h4 className="font-serif-cormorant text-xl text-[#2c382c] font-semibold flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#4f684f]" />
              <span>Enviar Foto Agora do Celular</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Seu nome..."
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-[#d8c9b6] text-xs focus:ring-2 focus:ring-[#819e81]"
              />
              <input
                type="text"
                placeholder="Legenda da foto ou recado..."
                value={caption}
                onChange={e => setCaption(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-[#d8c9b6] text-xs focus:ring-2 focus:ring-[#819e81]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <label className="w-full sm:w-auto flex-1 cursor-pointer py-3 px-4 rounded-xl bg-[#faf7f2] hover:bg-[#f0e9df] border-2 border-dashed border-[#d2c3b0] text-center transition-colors">
                <span className="text-xs font-medium text-[#4b5a4b] flex items-center justify-center gap-2">
                  <Camera className="w-4 h-4 text-[#8a715a]" />
                  <span>{isUploading ? 'Processando imagem...' : 'Escolher foto do celular / tirar foto'}</span>
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {uploadSuccess && (
                <span className="text-xs text-emerald-700 font-medium">
                  Foto adicionada com sucesso ao álbum!
                </span>
              )}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div>
            <h4 className="font-serif-cormorant text-xl text-[#2c382c] font-semibold mb-3">
              Galeria de Momentos {photos.length > 0 && `(${photos.length})`}
            </h4>

            {photos.length === 0 ? (
              <div className="py-12 px-6 rounded-2xl border-2 border-dashed border-[#d8cbbd] bg-[#faf7f2] text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#eee5d8] text-[#856e5a] flex items-center justify-center mb-3 shadow-inner">
                  <Camera className="w-7 h-7 text-[#8e735e]" />
                </div>
                <p className="font-serif-cormorant text-3xl font-semibold text-[#2c382c]">
                  Fotos aqui
                </p>
                <p className="text-xs sm:text-sm text-[#7a6b5c] max-w-sm mx-auto mt-2">
                  As fotos compartilhadas pelos convidados e pelo casal aparecerão aqui.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {photos.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPhoto(p)}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={p.url}
                      alt={p.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 text-white">
                      <p className="text-[11px] font-medium line-clamp-1">{p.caption}</p>
                      <span className="text-[9px] text-[#f4dcc6]">{p.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Visualização em Tela Cheia da Foto"
            className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
          >
            <div className="relative max-w-2xl w-full text-center">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 p-1"
                aria-label="Fechar visualização"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] mx-auto rounded-xl shadow-2xl object-contain"
              />
              <div className="mt-3 text-white">
                <p className="font-serif-cormorant text-lg italic">{selectedPhoto.caption}</p>
                <p className="text-xs text-gray-400 mt-0.5">Por {selectedPhoto.author} · {selectedPhoto.timestamp}</p>
              </div>
            </div>
          </div>
        )}

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
