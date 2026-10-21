import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<any>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize Web Audio synth for dreamy romantic wedding harp/piano chords
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
        gainNodeRef.current = audioCtxRef.current.createGain();
        gainNodeRef.current.gain.value = volume;
        gainNodeRef.current.connect(audioCtxRef.current.destination);
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Romantic harmonic notes (frequencies in Hz) - Canon in D / Romantic Wedding Progression
  const melodyNotes = [
    // D major chord
    293.66, 369.99, 440.00, 587.33,
    // A major chord
    220.00, 277.18, 329.63, 440.00,
    // B minor chord
    246.94, 293.66, 369.99, 493.88,
    // F# minor chord
    185.00, 220.00, 277.18, 369.99,
    // G major chord
    196.00, 246.94, 293.66, 392.00,
    // D major chord
    146.83, 220.00, 293.66, 369.99,
    // G major chord
    196.00, 246.94, 293.66, 392.00,
    // A major chord
    220.00, 277.18, 329.63, 440.00
  ];

  const playRomanticTone = (freq: number) => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      // Sine wave with soft harmonic overtone for warm music-box / harp texture
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
      // Gentle attack
      noteGain.gain.exponentialRampToValueAtTime(0.08 * (isMuted ? 0 : volume), ctx.currentTime + 0.05);
      // Long gentle decay
      noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

      osc.connect(noteGain);
      noteGain.connect(gainNodeRef.current);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.9);
    } catch {
      // Audio fallback safe
    }
  };

  const startMusic = () => {
    initAudio();
    setIsPlaying(true);
    setHasInteracted(true);

    let noteIdx = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Initial note
    playRomanticTone(melodyNotes[0]);
    noteIdx = 1;

    intervalRef.current = setInterval(() => {
      playRomanticTone(melodyNotes[noteIdx % melodyNotes.length]);
      noteIdx++;
    }, 450);
  };

  const pauseMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.value = nextMuted ? 0 : volume;
    }
  };

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (autoPlayTrigger && !hasInteracted && !isPlaying) {
      startMusic();
    }
  }, [autoPlayTrigger]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <div className="fixed top-18 sm:top-20 right-3.5 z-30 flex items-center">
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#e2d8cb] shadow-md transition-all">
        <button
          onClick={togglePlay}
          className="flex items-center gap-1.5 text-xs font-medium text-[#465446] hover:text-[#2c382c] transition-colors focus:outline-none"
          title={isPlaying ? 'Pausar música romântica' : 'Tocar música romântica'}
          aria-label={isPlaying ? 'Pausar música do casamento' : 'Tocar música do casamento'}
        >
          <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#f2ede4] text-[#4f684f]">
            {isPlaying ? (
              <Pause className="w-3 h-3 text-[#3e533e]" />
            ) : (
              <Play className="w-3 h-3 text-[#3e533e] ml-0.5" />
            )}
            {isPlaying && (
              <span className="absolute -inset-0.5 rounded-full border border-[#819e81]/60 animate-ping opacity-60" />
            )}
          </span>
          <span className="hidden sm:inline font-serif-cormorant text-sm italic tracking-wide">
            {isPlaying ? 'Música tocando...' : 'Trilha dos Noivos'}
          </span>
        </button>

        <button
          onClick={toggleMute}
          className="p-1 text-[#786b5e] hover:text-[#2c382c] transition-colors"
          title={isMuted ? 'Ativar som' : 'Silenciar'}
          aria-label="Controle de volume da música"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};
