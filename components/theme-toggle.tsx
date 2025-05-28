'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-6 right-6 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 rounded-full w-12 h-12 hover:bg-blue-50 dark:hover:bg-blue-900/20"
    >
      <Moon className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:rotate-90 dark:scale-0 text-gray-700 dark:text-gray-300" />
      <Sun className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-yellow-500 dark:text-yellow-400" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 