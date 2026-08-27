import { useEffect, useRef, useState } from 'react';

export interface ScrollState {
  /** 0–1 progress through the whole document. */
  progress: number;
  /** True once the page has scrolled past a small threshold. */
  scrolled: boolean;
  /** True while the landing section still fills most of the viewport. */
  atTop: boolean;
}

/**
 * Single rAF-throttled scroll subscription shared by the navbar and the
 * progress rail, so we never stack multiple listeners doing the same math.
 */
export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, scrolled: false, atTop: true });
  const frame = useRef(0);

  useEffect(() => {
    const measure = () => {
      frame.current = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setState({
        progress: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0,
        scrolled: y > 24,
        atTop: y < window.innerHeight * 0.6,
      });
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return state;
}
