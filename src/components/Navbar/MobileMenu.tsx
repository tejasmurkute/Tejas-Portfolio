import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { NAV_ITEMS, PROFILE, SOCIALS } from '@/data/site';
import { cn } from '@/utils/cn';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  active: string;
  onGo: (id: string) => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({ open, onClose, active, onGo }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock scroll, restore focus, and wire Escape while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panelRef.current) return;
      // Simple focus trap: the overlay covers the whole screen, so tabbing
      // out of it would land on invisible content behind.
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      opener?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-[70] flex flex-col bg-void/96 backdrop-blur-2xl lg:hidden"
        >
          {/* Atmosphere so the overlay belongs to the same world as the page */}
          <div
            aria-hidden
            className="aura -right-1/4 top-[-10%] size-[32rem] bg-accent-deep/25"
          />

          <div className="shell relative flex h-16 items-center justify-between">
            <span className="font-display text-[1.05rem] font-bold tracking-tight">
              {PROFILE.initials}
            </span>
            <button
              onClick={onClose}
              className="flex size-9 items-center justify-center rounded-full border border-line text-ink-dim"
              aria-label="Close navigation"
            >
              <X className="size-[17px]" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="shell relative flex flex-1 flex-col justify-center">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.55, delay: 0.06 + i * 0.045, ease: EASE }}
                    className="border-b border-line last:border-b-0"
                  >
                    <button
                      onClick={() => onGo(item.id)}
                      className="group flex w-full items-baseline gap-4 py-4 text-left"
                    >
                      <span
                        className={cn(
                          'meta w-6 shrink-0 transition-colors duration-300',
                          isActive ? 'text-accent' : 'text-ink-faint',
                        )}
                      >
                        {item.index}
                      </span>
                      <span
                        className={cn(
                          'display text-[1.85rem] transition-colors duration-300',
                          isActive ? 'text-ink' : 'text-ink-mute group-hover:text-ink-dim',
                        )}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <span className="ml-auto size-1.5 self-center rounded-full bg-accent shadow-[0_0_10px_2px] shadow-accent/50" />
                      )}
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="shell relative flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line py-6"
          >
            {SOCIALS.filter((s) => s.icon !== 'instagram' && s.icon !== 'twitter').map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer noopener"
                className="meta transition-colors duration-300 hover:text-accent-bright"
              >
                {s.label}
              </a>
            ))}
            <span className="meta ml-auto text-ink-faint">{PROFILE.location}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
