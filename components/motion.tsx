'use client';

import { useEffect, useRef, useState } from 'react';

/* ----------------------------------------------------------------------------
   The site's motion engine — deliberately tiny.

   One IntersectionObserver drives every scroll reveal: elements marked
   [data-reveal] / [data-reveal-stagger] get `.in` when they enter the
   viewport; globals.css does the rest. Hidden states are gated behind an
   `html.js` class (set inline in layout.tsx), so with JS disabled the page
   is simply static. With prefers-reduced-motion, everything reveals
   immediately.

   A second observer watches a 1px sentinel at the top of the document to
   toggle the sticky header's scrolled shadow.
---------------------------------------------------------------------------- */

export function ScrollFX() {
  const sentinelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;

    // Sticky-header shadow: appears once the top sentinel scrolls away.
    let headerIO: IntersectionObserver | undefined;
    if (sentinelRef.current) {
      headerIO = new IntersectionObserver(([entry]) => {
        root.toggleAttribute('data-scrolled', !entry.isIntersecting);
      });
      headerIO.observe(sentinelRef.current);
    }

    // Scroll reveals: one-shot, unobserved after firing.
    const els = Array.from(
      document.querySelectorAll('[data-reveal], [data-reveal-stagger]'),
    );
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      els.forEach((el) => el.classList.add('in'));
      return () => headerIO?.disconnect();
    }

    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          el.classList.add('in');
          io.unobserve(el);
          // Once the transition (≤400ms) + max stagger (350ms) is over,
          // shed the reveal attributes so elements return to their base
          // styles — hover transitions, no stale transition-delay.
          timers.push(
            window.setTimeout(() => {
              el.removeAttribute('data-reveal');
              el.removeAttribute('data-reveal-stagger');
            }, 850),
          );
        }
      },
      { rootMargin: '0px 0px -7% 0px', threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      headerIO?.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <span
      ref={sentinelRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-px w-px"
    />
  );
}

/* ----------------------------------------------------------------------------
   Metric — "9s → 0.25s" performs its own optimization. When scrolled into
   view, the right-hand number ticks down from the slow value to the fast
   one. Renders the plain string on the server and in every fallback path
   (unparseable metric, reduced motion, no JS).
---------------------------------------------------------------------------- */

const METRIC_RE = /^(\d+(?:\.\d+)?)s → (\d+(?:\.\d+)?)s$/;
const COUNT_MS = 550;

export function Metric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [ticking, setTicking] = useState<string | null>(null);
  const match = METRIC_RE.exec(value);

  useEffect(() => {
    if (!match || !ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const from = parseFloat(match[1]);
    const to = parseFloat(match[2]);
    let raf = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / COUNT_MS);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          if (p < 1) {
            setTicking((from + (to - from) * eased).toFixed(2) + 's');
            raf = requestAnimationFrame(tick);
          } else {
            setTicking(null); // settle on the exact authored value
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // match is derived from `value`, which is stable page content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!match) return <span>{value}</span>;

  return (
    <span ref={ref} className="tabular-nums">
      {match[1]}s → {ticking ?? `${match[2]}s`}
    </span>
  );
}
