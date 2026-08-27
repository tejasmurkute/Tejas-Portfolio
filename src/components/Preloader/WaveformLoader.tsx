import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface WaveformLoaderProps {
  onComplete: () => void;
}

export function WaveformLoader({ onComplete }: WaveformLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId: number;
    let isSiteLoaded = document.readyState === 'complete';

    const handleLoad = () => {
      isSiteLoaded = true;
    };

    if (!isSiteLoaded) {
      window.addEventListener('load', handleLoad);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Physical dimensions of the canvas
    const CANVAS_WIDTH = 260;
    const CANVAS_HEIGHT = 48;
    const CENTER_X = CANVAS_WIDTH / 2;
    const CENTER_Y = CANVAS_HEIGHT / 2;

    // Fixed width between endpoint dots
    const TOTAL_WIDTH = 164;
    const START_X = CENTER_X - TOTAL_WIDTH / 2;
    const END_X = CENTER_X + TOTAL_WIDTH / 2;
    const BASE_MAX_AMPLITUDE = 6.5;

    // Setup high-DPI canvas
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(CANVAS_WIDTH * dpr);
    canvas.height = Math.floor(CANVAS_HEIGHT * dpr);
    canvas.style.width = `${CANVAS_WIDTH}px`;
    canvas.style.height = `${CANVAS_HEIGHT}px`;
    ctx.scale(dpr, dpr);

    // Timeline stage milestones (ms)
    // Stage 1: Left -> Right (0 to 1500ms)
    // Stage 2: Right -> Left (1500 to 2900ms)
    // Stage 3: Left -> Center (2900 to 3800ms)
    // Stage 4: Center Collapse to Straight Line (3800 to 4250ms)
    // Stage 5: Straight-Line Pause (4250 to 4450ms)
    // Stage 6: Dots Converge to Center (4450 to 4850ms)
    // Stage 7: Settle at Center & Transition (4850 to 4950ms)
    const T1 = 1500;
    const T2 = 2900;
    const T3 = 3800;
    const T4 = 4250;
    const T5 = 4450;
    const T6 = 4850;
    const T_TOTAL = 4950;

    const startTime = performance.now();
    let lastTime = startTime;
    let wavePhaseAccumulator = 0;
    let hasCompleted = false;

    const render = (now: number) => {
      const elapsed = now - startTime;
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Continuous motion state variables
      let packetCenter = 0.15;
      let currentAmplitude = BASE_MAX_AMPLITUDE;
      let glowFactor = 1.0;
      let oscFrequencyMultiplier = 1.0;

      let currentLeftDotX = START_X;
      let currentRightDotX = END_X;
      let dotOpacity = 1.0;
      let dotScale = 1.0;

      if (elapsed < T1) {
        // Stage 1: Left (0.15) -> Right (0.85)
        const p = elapsed / T1;
        const ease = 0.5 - 0.5 * Math.cos(Math.PI * p);
        packetCenter = 0.15 + (0.85 - 0.15) * ease;
        currentAmplitude = BASE_MAX_AMPLITUDE;
        glowFactor = 1.0;
        oscFrequencyMultiplier = 1.0;
      } else if (elapsed < T2) {
        // Stage 2: Right (0.85) -> Left (0.20)
        const p = (elapsed - T1) / (T2 - T1);
        const ease = 0.5 - 0.5 * Math.cos(Math.PI * p);
        packetCenter = 0.85 - (0.85 - 0.20) * ease;
        currentAmplitude = BASE_MAX_AMPLITUDE * (1 - 0.1 * p);
        glowFactor = 1.0 - 0.1 * p;
        oscFrequencyMultiplier = 1.0 - 0.12 * p;
      } else if (elapsed < T3) {
        // Stage 3: Left (0.20) -> Center (0.50)
        const p = (elapsed - T2) / (T3 - T2);
        const ease = 0.5 - 0.5 * Math.cos(Math.PI * p);
        packetCenter = 0.20 + (0.50 - 0.20) * ease;
        currentAmplitude = BASE_MAX_AMPLITUDE * 0.9 * (1 - 0.55 * p);
        glowFactor = 0.9 - 0.45 * p;
        oscFrequencyMultiplier = 0.88 - 0.3 * p;
      } else if (elapsed < T4) {
        // Stage 4: Center collapse into straight line
        const p = (elapsed - T3) / (T4 - T3);
        packetCenter = 0.50;
        const decay = Math.max(0, 1 - p * p);
        currentAmplitude = BASE_MAX_AMPLITUDE * 0.4 * decay;
        glowFactor = 0.45 * decay;
        oscFrequencyMultiplier = 0.58 * decay;
      } else if (elapsed < T5) {
        // Stage 5: Brief straight line hold
        packetCenter = 0.50;
        currentAmplitude = 0;
        glowFactor = 0;
        oscFrequencyMultiplier = 0;
      } else if (elapsed < T6) {
        // Stage 6: The 2 endpoint dots glide smoothly inward towards the center
        packetCenter = 0.50;
        currentAmplitude = 0;
        glowFactor = 0;
        oscFrequencyMultiplier = 0;

        const p = (elapsed - T5) / (T6 - T5);
        // Smooth exponential ease-in-out contraction
        const ease = 0.5 - 0.5 * Math.cos(Math.PI * p);

        currentLeftDotX = START_X + (CENTER_X - START_X) * ease;
        currentRightDotX = END_X - (END_X - CENTER_X) * ease;

        // When dots get very close, slight pulse in glow
        dotScale = 1.0 + Math.sin(p * Math.PI) * 0.25;
      } else {
        // Stage 7: Dots merged at center point, trigger site reveal
        currentLeftDotX = CENTER_X;
        currentRightDotX = CENTER_X;
        currentAmplitude = 0;
        glowFactor = 0;

        const p = Math.min((elapsed - T6) / (T_TOTAL - T6), 1);
        dotOpacity = Math.max(0, 1 - p * 1.5);

        if (elapsed >= T_TOTAL && isSiteLoaded && !hasCompleted) {
          hasCompleted = true;
          onCompleteRef.current();
          return;
        }
      }

      // Continuous phase integration
      if (!prefersReducedMotion) {
        wavePhaseAccumulator += dt * 4.2 * oscFrequencyMultiplier;
      }

      const activeSpan = Math.max(0, currentRightDotX - currentLeftDotX);

      // 1. Draw straight baseline wire between the current dot positions
      if (activeSpan > 0.5) {
        ctx.beginPath();
        ctx.moveTo(currentLeftDotX, CENTER_Y);
        ctx.lineTo(currentRightDotX, CENTER_Y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * dotOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 2. Draw localized waveform if amplitude > 0 (during stages 1-4)
      if (currentAmplitude > 0.05 && activeSpan > 20) {
        const SIGMA = 0.13;
        const STEPS = 140;
        const points: { x: number; y: number }[] = [];

        for (let i = 0; i <= STEPS; i++) {
          const u = i / STEPS;
          const x = currentLeftDotX + u * activeSpan;

          // Boundary taper
          const boundaryTaper = Math.pow(Math.sin(u * Math.PI), 1.2);

          // Gaussian packet envelope
          const distFromCenter = (u - packetCenter) / SIGMA;
          const packetEnvelope = Math.exp(-0.5 * distFromCenter * distFromCenter);
          const env = packetEnvelope * boundaryTaper;

          // Wave equation
          const phase = u * 19.5 - wavePhaseAccumulator;
          const wave = Math.sin(phase) * 0.85 + Math.sin(phase * 0.5 + 0.4) * 0.25;

          const y = CENTER_Y - wave * env * currentAmplitude;
          points.push({ x, y });
        }

        // Build continuous path
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }

        const grad = ctx.createLinearGradient(currentLeftDotX, 0, currentRightDotX, 0);
        const centerPos = Math.max(0.01, Math.min(0.99, packetCenter));
        const spread = 0.22;
        const leftEdge = Math.max(0, centerPos - spread);
        const rightEdge = Math.min(1, centerPos + spread);

        grad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
        if (leftEdge > 0.05) {
          grad.addColorStop(leftEdge, 'rgba(255, 255, 255, 0.15)');
        }
        grad.addColorStop(centerPos, `rgba(255, 255, 255, ${0.98 * glowFactor})`);
        if (rightEdge < 0.95) {
          grad.addColorStop(rightEdge, 'rgba(255, 255, 255, 0.15)');
        }
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.12)');

        // Pass 1: Soft glow
        if (glowFactor > 0.1) {
          ctx.save();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.3;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowColor = `rgba(255, 255, 255, ${0.5 * glowFactor})`;
          ctx.shadowBlur = 4.5 * glowFactor;
          ctx.stroke();
          ctx.restore();
        }

        // Pass 2: Sharp foreground stroke
        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 0;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Draw endpoint micro-dots (glide inwards toward center in Stage 6)
      if (dotOpacity > 0.01) {
        const dotRadius = 1.4 * dotScale;
        ctx.save();
        ctx.shadowBlur = 3 * dotScale;
        ctx.shadowColor = `rgba(255, 255, 255, ${0.6 * dotOpacity})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${dotOpacity})`;

        if (activeSpan > 1) {
          // Left Dot
          ctx.beginPath();
          ctx.arc(currentLeftDotX, CENTER_Y, dotRadius, 0, Math.PI * 2);
          ctx.fill();

          // Right Dot
          ctx.beginPath();
          ctx.arc(currentRightDotX, CENTER_Y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Merged single point in center
          ctx.beginPath();
          ctx.arc(CENTER_X, CENTER_Y, dotRadius * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-3.5 select-none pointer-events-none"
    >
      {/* Small subtle text above loading bar */}
      <span className="font-mono text-[0.625rem] tracking-[0.24em] uppercase text-ink-mute/75">
        getting you in
      </span>
      <canvas ref={canvasRef} className="block" />
    </motion.div>
  );
}
