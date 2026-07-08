'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /**
   * Theme switch as a circular reveal: the new theme washes over the page
   * from the toggle itself, via the View Transition API. Plain instant
   * switch when the API is missing or reduced motion is set.
   */
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (
      !doc.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(next);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const root = document.documentElement;
    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.style.setProperty('--vt-r', `${r}px`);

    doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-[color,border-color,transform] duration-200 hover:border-primary hover:text-primary active:scale-90 motion-reduce:active:scale-100"
      aria-label={mounted && theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {mounted ? (
        <>
          <Moon className="h-[15px] w-[15px] dark:hidden" />
          <Sun className="hidden h-[15px] w-[15px] dark:block" />
        </>
      ) : (
        <span className="h-[15px] w-[15px]" />
      )}
    </button>
  );
}
