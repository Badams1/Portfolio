'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
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
