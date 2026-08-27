import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Orbit } from 'lucide-react';
import { NAV_ITEMS, PROFILE, ALL_SECTION_IDS } from '@/data/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollState } from '@/hooks/useScrollState';
import { useAmbience } from '@/hooks/useAmbience';
import { cn, scrollToSection } from '@/utils/cn';
import { MobileMenu } from './MobileMenu';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { progress, scrolled } = useScrollState();
  const active = useActiveSection(ALL_SECTION_IDS);
  const { ambience, toggle, locked } = useAmbience();

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: EASE }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-700',
          scrolled
            ? 'border-b border-line bg-void/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        {/* Scroll progress — a hairline, not a candy bar. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r from-accent via-accent-bright to-azure"
          style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
        />

        <nav className="shell flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          {/* Monogram */}
          <button
            onClick={() => go('home')}
            className="group relative flex items-center gap-2.5 text-left"
            aria-label="Back to top"
          >
            <span className="font-display text-[1.05rem] font-bold tracking-tight text-ink transition-colors duration-500 group-hover:text-accent-bright">
              {PROFILE.initials}
            </span>
            <span
              aria-hidden
              className="hidden h-3.5 w-px bg-line-strong sm:block"
            />
            <span className="meta hidden transition-colors duration-500 group-hover:text-ink-dim sm:block">
              Portfolio
            </span>
          </button>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            <AnimatePresence mode="wait" initial={false}>
                <motion.ul
                  key="full-nav"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex items-center"
                >
                  {NAV_ITEMS.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => go(item.id)}
                          aria-current={isActive ? 'true' : undefined}
                          className={cn(
                            'group relative px-3.5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-colors duration-400 xl:px-4',
                            isActive ? 'text-ink' : 'text-ink-mute hover:text-ink-dim',
                          )}
                        >
                          {item.label}
                          {isActive && (
                            <motion.span
                              layoutId="nav-indicator"
                              transition={{ duration: 0.5, ease: EASE }}
                              className="absolute inset-x-3 -bottom-px h-px bg-accent xl:inset-x-3.5"
                            >
                              <span className="absolute -inset-y-1 inset-x-0 bg-accent/45 blur-[5px]" />
                            </motion.span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            {/* Ambience control — the site's one "visual setting". */}
            <button
              onClick={toggle}
              disabled={locked}
              aria-pressed={ambience}
              title={
                locked
                  ? 'Ambient motion is off because your system requests reduced motion'
                  : ambience
                    ? 'Turn ambient motion off'
                    : 'Turn ambient motion on'
              }
              className={cn(
                'group relative flex size-9 items-center justify-center rounded-full border transition-all duration-500',
                'disabled:cursor-not-allowed disabled:opacity-35',
                ambience
                  ? 'border-accent/35 text-accent-bright'
                  : 'border-line text-ink-faint hover:border-line-strong hover:text-ink-mute',
              )}
            >
              <span className="sr-only">Toggle ambient motion</span>
              <Orbit
                className={cn('size-[15px]', ambience && 'animate-[orbit-slow_14s_linear_infinite]')}
                strokeWidth={1.5}
              />
              {ambience && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-accent/10 blur-md"
                />
              )}
            </button>

            {/* Mobile trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex size-9 items-center justify-center rounded-full border border-line text-ink-dim transition-colors duration-400 hover:border-line-strong hover:text-ink lg:hidden"
              aria-label="Open navigation"
              aria-expanded={menuOpen}
            >
              <Menu className="size-[17px]" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} onGo={go} />
    </>
  );
}
