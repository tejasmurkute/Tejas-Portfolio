import { useEffect, useRef, useState } from 'react';

/**
 * Tracks which section owns the viewport's reading line.
 *
 * IntersectionObserver thresholds behave badly here because the sections have
 * wildly different heights — a short Contact section would never out-score a
 * tall Projects grid. Instead we pick the last section whose top has crossed a
 * fixed line at 42% of the viewport, which is how a reader actually perceives
 * "where am I". Scroll work is rAF-throttled and read-only, so it stays cheap.
 */
export function useActiveSection(ids: string[], offsetRatio = 0.42): string {
  const [active, setActive] = useState(ids[0] ?? '');
  const frame = useRef(0);

  useEffect(() => {
    const measure = () => {
      frame.current = 0;
      const line = window.innerHeight * offsetRatio;

      // Bottom of the document: the final section always wins, otherwise a
      // short last section can never become active.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1] ?? '');
        return;
      }

      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
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
  }, [ids, offsetRatio]);

  return active;
}
