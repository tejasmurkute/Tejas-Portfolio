import { useId } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { useAmbience } from '@/hooks/useAmbience';
import { useIsTouch } from '@/hooks/useMediaQuery';
import { PortraitPlaceholder } from './PortraitPlaceholder';

interface PortraitProps {
  src?: string;
  alt: string;
  /** `floating` tilts and orbits (Home); `framed` sits square behind an offset rule (About). */
  variant?: 'floating' | 'framed';
  className?: string;
  children?: ReactNode;
}

/**
 * The portrait is treated as a physical object in the scene rather than an
 * `<img>` on a page: it has a frame, a light source, an orbit and a caption.
 */
export function Portrait({
  src,
  alt,
  variant = 'floating',
  className,
  children,
}: PortraitProps) {
  const uid = useId().replace(/:/g, '');
  const { ambience } = useAmbience();
  const isTouch = useIsTouch();
  const interactive = ambience && !isTouch;

  // Pointer tilt, spring-damped so it never snaps.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 90, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 90, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const floating = variant === 'floating';

  return (
    <div
      className={cn('relative', className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1200 }}
    >
      {/* Orbital path — a single thin ellipse, slowly turning */}
      {floating && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[126%] w-[126%] -translate-x-1/2 -translate-y-1/2"
          style={ambience ? { animation: 'orbit-slow 46s linear infinite' } : undefined}
        >
          <div className="absolute inset-0 rounded-[50%] border border-accent/16 [transform:rotateX(72deg)]" />
          <div className="absolute inset-[8%] rounded-[50%] border border-white/6 [transform:rotateX(68deg)_rotateZ(28deg)]" />
        </div>
      )}

      {/* Violet key light behind the subject */}
      <div
        aria-hidden
        className={cn(
          'aura -z-10',
          floating
            ? 'left-[10%] top-[6%] size-[72%] bg-accent/28'
            : 'left-[-8%] top-[10%] size-[62%] bg-accent/22',
        )}
      />

      {/* Offset rule behind the frame — the "printed plate" feel */}
      {!floating && (
        <div
          aria-hidden
          className="absolute -bottom-4 -right-4 h-full w-full border border-accent/25 sm:-bottom-5 sm:-right-5"
        />
      )}

      <motion.div
        style={
          interactive
            ? { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }
            : undefined
        }
        className={cn(
          'group relative aspect-[4/5] overflow-hidden border border-line-strong bg-surface',
          floating && 'rotate-[-2.2deg] shadow-[0_40px_120px_-40px_rgba(109,59,245,0.55)]',
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.035]"
          />
        ) : (
          <PortraitPlaceholder uid={uid} />
        )}

        {/* Colour grade — unifies a dropped-in photo with the site palette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-transparent to-transparent opacity-70"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-linear-to-br from-accent/25 to-azure/15"
        />

        {/* Corner ticks */}
        <span aria-hidden className="absolute left-3 top-3 size-3 border-l border-t border-white/25" />
        <span aria-hidden className="absolute right-3 top-3 size-3 border-r border-t border-white/25" />
        <span aria-hidden className="absolute bottom-3 left-3 size-3 border-b border-l border-white/25" />
        <span aria-hidden className="absolute bottom-3 right-3 size-3 border-b border-r border-white/25" />
      </motion.div>

      {children}
    </div>
  );
}
