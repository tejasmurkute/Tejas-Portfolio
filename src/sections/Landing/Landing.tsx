import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '@/data/site';
import { useAmbience } from '@/hooks/useAmbience';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { scrollToSection } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import { SocialLinks } from '@/components/SocialLinks/SocialLinks';

// `three` is ~30% of the JS on this page; keep it out of the critical path.
const PlanetScene = lazy(() => import('@/components/PlanetScene/PlanetScene'));

const EASE = [0.16, 1, 0.3, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE },
});

export function Landing() {
  const { ambience } = useAmbience();
  // Below `sm` the WebGL canvas costs more than it adds — the composition
  // there is typographic, with the CSS aura standing in for the planet.
  const showPlanet = useMediaQuery('(min-width: 640px)');

  return (
    <section
      id="landing"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16 outline-none"
    >
      {/* Planet — sits behind everything, never intercepts pointer events. */}
      {showPlanet && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <Suspense fallback={null}>
            <PlanetScene still={!ambience} />
          </Suspense>
        </div>
      )}

      {/* Small violet body drifting near the top-right, mirroring the reference. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 1.1, ease: EASE }}
        className="pointer-events-none absolute right-[18%] top-[24%] z-0 hidden lg:block"
      >
        <div className="relative size-4">
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-accent-bright to-accent-deep" />
          <div className="absolute -inset-3 rounded-full bg-accent/25 blur-lg" />
        </div>
      </motion.div>

      {/* Vertical social rail */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden items-center md:flex">
        <div className="pointer-events-auto pl-2 lg:pl-5">
          <SocialLinks delay={1.15} />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 1.6, ease: EASE }}
            className="mx-auto mt-4 h-16 w-px origin-top bg-linear-to-b from-line-strong to-transparent"
          />
        </div>
      </div>

      <div className="shell relative z-10 w-full">
        <div className="max-w-3xl md:pl-12 lg:pl-16">
          {/* Eyebrow */}
          <motion.div {...rise(0.35)} className="flex items-center gap-3">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            <span className="meta text-ink-dim">Hi, I&rsquo;m</span>
          </motion.div>

          {/* Name */}
          <h1 className="display mt-5 text-[clamp(2.9rem,10.5vw,8rem)] leading-[0.92]">
            <motion.span {...rise(0.5)} className="block text-ink">
              {PROFILE.firstName}
            </motion.span>
            <motion.span {...rise(0.62)} className="block">
              <span className="accent-text">{PROFILE.lastName}.</span>
            </motion.span>
          </h1>

          {/* Tagline */}
          <motion.p
            {...rise(0.82)}
            className="mt-7 max-w-lg font-display text-[clamp(1.05rem,2.4vw,1.6rem)] leading-[1.35] font-light text-ink-dim"
          >
            I build digital experiences
            <br className="hidden sm:block" /> that make an impact.
          </motion.p>

          {/* Supporting copy */}
          <motion.p
            {...rise(0.95)}
            className="mt-6 max-w-md text-[0.9rem] leading-relaxed text-ink-mute"
          >
            {PROFILE.intro}
          </motion.p>

          {/* Actions */}
          <motion.div {...rise(1.1)} className="mt-10 flex flex-wrap items-center gap-3">
            <Button variant="primary" arrow="right" onClick={() => scrollToSection('projects')}>
              Explore my work
            </Button>
            <Button variant="outline" arrow="up-right" onClick={() => scrollToSection('contact')}>
              Let&rsquo;s connect
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer strip: scroll cue + status metadata */}
      <div className="shell relative z-10 mt-16 flex w-full items-end justify-between gap-6 lg:mt-24">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          onClick={() => scrollToSection('home')}
          className="group flex items-center gap-4 md:pl-12 lg:pl-16"
        >
          <span className="meta transition-colors duration-500 group-hover:text-ink-dim">
            Scroll to explore
          </span>
          <span className="relative h-9 w-px overflow-hidden bg-line-strong">
            <span
              className="absolute inset-x-0 top-0 h-3 bg-linear-to-b from-transparent to-accent"
              style={{ animation: 'scroll-travel 2.4s cubic-bezier(0.4,0,0.2,1) infinite' }}
            />
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.7 }}
          className="hidden flex-col items-end gap-2 text-right sm:flex"
        >
          <span className="meta text-ink-faint">18.5204° N &nbsp;73.8567° E</span>
          <span className="meta flex items-center gap-2 text-ink-mute">
            <span className="size-1 rounded-full bg-emerald-400/80" />
            Available for work
          </span>
        </motion.div>
      </div>
    </section>
  );
}
