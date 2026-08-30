"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element first comes into view.
 *
 * IntersectionObserver never fires in a background tab, which would leave
 * animated content stuck at its zero state permanently for anyone who opens the
 * page in a new tab and switches to it later. The timeout is the failsafe, not
 * a nicety. Reduced-motion skips straight to the settled state.
 */
export function useReveal<T extends HTMLElement>(failsafeMs = 1600) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);

    const t = window.setTimeout(() => setShown(true), failsafeMs);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [failsafeMs]);

  return { ref, shown };
}

/** Counts a number up once revealed, honouring reduced-motion. */
export function useCountUp(target: number, shown: boolean, ms = 900) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!shown) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      // ease-out cubic — decisive at the start, settles gently
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, shown, ms]);

  return v;
}
