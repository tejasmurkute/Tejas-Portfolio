import { useEffect, useRef } from 'react';
import { useAmbience } from '@/hooks/useAmbience';

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  /** 0 = far (barely moves), 1 = near (full parallax). */
  depth: number;
  twinkle: number;
  phase: number;
}

interface Meteor {
  x: number;
  y: number;
  len: number;
  speed: number;
  life: number;
  maxLife: number;
  angle: number;
}

const MAX_DPR = 2;

/**
 * Procedural starfield.
 *
 * Deliberately canvas-2D rather than WebGL: it is a few hundred 1px rects per
 * frame, which costs less than the shader pipeline it would take to draw the
 * same thing, and it leaves the GPU budget for the landing planet. Stars are
 * drawn as rects, not arcs — `arc()` at this count is measurably slower and at
 * 1–2px nobody can tell the difference.
 */
export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // `ambience` already folds in the OS reduced-motion preference.
  const { ambience } = useAmbience();
  const still = !ambience;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let nextMeteorAt = 6000;
    let raf = 0;
    let running = true;
    let start = performance.now();

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area but is capped so a 4K monitor doesn't get
      // punished for its pixel count.
      const count = Math.min(260, Math.round((width * height) / 7600));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * width,
          // Stars occupy 1.6 viewports so parallax never exposes an empty band.
          y: Math.random() * height * 1.6,
          r: depth > 0.82 ? 1.5 : depth > 0.5 ? 1 : 0.8,
          alpha: 0.16 + depth * 0.5,
          depth,
          // Only the nearer third twinkles; the rest stay dead still.
          twinkle: depth > 0.66 ? 0.5 + Math.random() * 0.8 : 0,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const spawnMeteor = () => {
      meteor = {
        x: width * (0.15 + Math.random() * 0.7),
        y: height * (0.05 + Math.random() * 0.35),
        len: 90 + Math.random() * 120,
        speed: 0.9 + Math.random() * 0.7,
        life: 0,
        maxLife: 1400 + Math.random() * 600,
        angle: Math.PI * 0.18 + Math.random() * 0.1,
      };
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const scroll = window.scrollY;

      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        // Parallax: far stars are nearly pinned, near stars drift with scroll.
        const y = (s.y - scroll * (0.04 + s.depth * 0.16)) % (height * 1.6);
        const wrapped = y < 0 ? y + height * 1.6 : y;
        if (wrapped > height + 4) continue;

        const a = s.twinkle
          ? s.alpha * (0.55 + 0.45 * Math.sin(t * s.twinkle + s.phase))
          : s.alpha;

        ctx.globalAlpha = a;
        // Nearest stars pick up a faint violet cast, so the field reads as
        // atmosphere rather than white noise.
        ctx.fillStyle = s.depth > 0.9 ? '#cbb6ff' : '#ffffff';
        ctx.fillRect(s.x, wrapped, s.r, s.r);
      }

      // Rare, very faint meteor. Adds life without becoming a "space theme".
      if (!still) {
        if (!meteor && now - start > nextMeteorAt) {
          spawnMeteor();
          nextMeteorAt = now - start + 14000 + Math.random() * 16000;
        }
        if (meteor) {
          meteor.life += 16;
          const p = meteor.life / meteor.maxLife;
          if (p >= 1) {
            meteor = null;
          } else {
            const travel = meteor.speed * meteor.life * 0.22;
            const hx = meteor.x + Math.cos(meteor.angle) * travel;
            const hy = meteor.y + Math.sin(meteor.angle) * travel;
            const tx = hx - Math.cos(meteor.angle) * meteor.len;
            const ty = hy - Math.sin(meteor.angle) * meteor.len;
            // Fade in and out so it never "pops".
            const fade = Math.sin(p * Math.PI) * 0.5;
            const grad = ctx.createLinearGradient(tx, ty, hx, hy);
            grad.addColorStop(0, 'rgba(185,162,255,0)');
            grad.addColorStop(1, `rgba(219,209,255,${fade})`);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(hx, hy);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      if (running && !still) raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      build();
      if (still) draw(performance.now());
    };

    // Stop burning frames on a hidden tab.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!still) {
        running = true;
        start = performance.now() - 1;
        raf = requestAnimationFrame(draw);
      }
    };

    build();
    if (still) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [still]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base wash — keeps the void from reading as flat #000. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0b0a18_0%,#050509_45%,#030305_100%)]" />

      {/* Two atmospheric pools. CSS blur is far cheaper than painting these
          into the canvas, and they need to sit behind the stars. */}
      <div
        className="aura -left-[18%] top-[6%] size-[46rem] bg-[#3a1d8f]/20"
        style={{ animation: 'breathe 16s ease-in-out infinite' }}
      />
      <div
        className="aura -right-[14%] top-[52%] size-[38rem] bg-[#1a3a8f]/15"
        style={{ animation: 'breathe 21s ease-in-out infinite 3s' }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Vertical measure lines — the engineering-lab scaffold. */}
      <div className="measure-lines">
        <span style={{ left: '3.5rem' }} />
        <span style={{ left: '25%' }} />
        <span style={{ left: '50%' }} />
        <span style={{ left: '75%' }} />
        <span style={{ right: '3.5rem' }} />
      </div>
    </div>
  );
}
