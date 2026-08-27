import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from './useMediaQuery';

interface AmbienceValue {
  /** Whether decorative background motion should run. */
  ambience: boolean;
  toggle: () => void;
  /** True when the OS-level reduced-motion preference is forcing ambience off. */
  locked: boolean;
}

const AmbienceContext = createContext<AmbienceValue>({
  ambience: true,
  toggle: () => {},
  locked: false,
});

const STORAGE_KEY = 'tm.ambience';

/**
 * A deliberate alternative to a light/dark switch: this site is committed to
 * one dark world, so the useful control is how *alive* that world is. Visitors
 * who find ambient motion distracting can still it without losing the design.
 */
export function AmbienceProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) setEnabled(stored === '1');
    } catch {
      // Private-mode storage failures are not worth surfacing.
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ ambience: enabled && !reduced, toggle, locked: reduced }),
    [enabled, reduced, toggle],
  );

  return <AmbienceContext.Provider value={value}>{children}</AmbienceContext.Provider>;
}

export function useAmbience(): AmbienceValue {
  return useContext(AmbienceContext);
}
