import { useState, useEffect } from 'react';
import { TextLoop } from '@/components/core/text-loop';
import { WaveformLoader } from './WaveformLoader';
import { LightRays } from '@/components/LightRays/LightRays';
import { PageTransition } from '@/components/PageTransition/PageTransition';

interface PreloaderProps {
  onComplete?: () => void;
  onRevealStart?: () => void;
}

export function Preloader({ onComplete, onRevealStart }: PreloaderProps) {
  // Phase 0: blank
  // Phase 1: words
  // Phase 2: loading
  // Phase 3: wipe-in (purple screen slides up from bottom)
  // Phase 4: wipe-out (purple screen slides up and out, revealing homepage)
  // Phase 5: done
  const [phase, setPhase] = useState<'blank' | 'words' | 'loading' | 'wipe-in' | 'wipe-out' | 'done'>('blank');

  useEffect(() => {
    if (phase === 'blank') {
      const timer = setTimeout(() => setPhase('words'), 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'done' && phase !== 'wipe-out') {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [phase]);

  // Handle the purple wipe timing
  useEffect(() => {
    if (phase === 'wipe-in') {
      const timer = setTimeout(() => {
        setPhase('wipe-out');
      }, 2600); // Wait for screen (1s) + text delay (1.0s) + text duration + short pause
      return () => clearTimeout(timer);
    }
    if (phase === 'wipe-out') {
      const timer = setTimeout(() => {
        setPhase('done');
        onRevealStart?.();
        onComplete?.();
      }, 1000); // wait for slide-out
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete, onRevealStart]);

  if (phase === 'done') return null;

  // The base container becomes transparent during wipe-out so we can see the homepage behind the purple screen
  const isWipingOut = phase === 'wipe-out';

  return (
    <div className={`fixed inset-0 z-[9999] select-none ${isWipingOut ? 'pointer-events-none' : 'pointer-events-auto bg-[#000000]'}`}>
      
      {/* 
        The original black screen content (LightRays, Text, Waveform).
        We hide it instantly when wipe-out begins because the purple screen is fully covering it.
      */}
      {!isWipingOut && (
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
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
                onComplete={() => setPhase('loading')}
                className="font-display text-[clamp(2.6rem,8.5vw,5.5rem)] font-medium tracking-tight text-ink drop-shadow-[0_0_30px_rgba(139,92,246,0.35)]"
              >
                <span>Tejas .</span>
                <span>Engineer .</span>
                <span>Builder .</span>
              </TextLoop>
            )}

            {phase === 'loading' && (
              <WaveformLoader onComplete={() => setPhase('wipe-in')} />
            )}
          </div>
        </div>
      )}

      {/* The Purple Wipe Screen (Extracted to reusable component) */}
      <PageTransition 
        status={
          phase === 'wipe-in' ? 'wipe-in' : 
          phase === 'wipe-out' ? 'wipe-out' : 'hidden'
        }
      />

    </div>
  );
}
