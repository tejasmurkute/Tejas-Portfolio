import { useState, useEffect } from 'react';
import { TextLoop } from '@/components/core/text-loop';
import { WaveformLoader } from './WaveformLoader';
import { LightRays } from '@/components/LightRays/LightRays';

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  // Phase 0: blank (clean stillness on first load)
  // Phase 1: words (Tejas . -> Engineer . -> Builder .)
  // Phase 2: loading (WaveformLoader with converging dots)
  // Phase 3: exit (smooth dissolve into portfolio)
  // Phase 4: done (unmounted)
  const [phase, setPhase] = useState<'blank' | 'words' | 'loading' | 'exit' | 'done'>('blank');

  // Initial blank pause before text sequence begins
  useEffect(() => {
    if (phase === 'blank') {
      const timer = setTimeout(() => {
        setPhase('words');
      }, 500); // 500ms initial stillness pause
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Lock body scroll while preloader is active
  useEffect(() => {
    if (phase !== 'done' && phase !== 'exit') {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [phase]);

  // Phase 3: Final exit transition (opacity & scale settle into website)
  useEffect(() => {
    if (phase === 'exit') {
      const timer = setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === 'done') {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] select-none overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        phase === 'exit' ? 'opacity-0 scale-[1.01] pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
      }`}
      style={{ willChange: 'opacity, transform' }}
    >
      {/* LightRays WebGL background active immediately across the entire intro */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#8b5cf6"
          raysSpeed={0.7}
          lightSpread={0.85}
          rayLength={1.6}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.04}
          distortion={0.03}
          pulsating={false}
          fadeDistance={0.9}
        />
      </div>

      <div className="relative z-10 flex h-36 w-full items-center justify-center px-6 text-center">
        {/* Phase 1: TextLoop sequence (Tejas . -> Engineer . -> Builder .) */}
        {phase === 'words' && (
          <TextLoop
            loop={false}
            interval={2.2}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            variants={{
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              exit: { y: -20, opacity: 0 },
            }}
            onComplete={() => {
              // Triggered only after Builder . finishes its full exit animation
              setPhase('loading');
            }}
            className="font-display text-[clamp(2.6rem,8.5vw,5.5rem)] font-medium tracking-tight text-ink drop-shadow-[0_0_30px_rgba(139,92,246,0.35)]"
          >
            <span>Tejas .</span>
            <span>Engineer .</span>
            <span>Builder .</span>
          </TextLoop>
        )}

        {/* Phase 2: Custom Ultra-Minimal Waveform Loader */}
        {phase === 'loading' && (
          <WaveformLoader onComplete={() => setPhase('exit')} />
        )}
      </div>
    </div>
  );
}
