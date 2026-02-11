'use client';

import { useTheme, Theme } from '@/lib/hooks/useTheme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'dark':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case 'system':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light': return 'Light mode';
      case 'dark': return 'Dark mode';
      case 'system': return 'System theme';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-4 brutal-card border-charcoal shadow-brutal-sm
                 text-text-primary brutal-hover
                 transition-all duration-150
                 focus:outline-none"
      aria-label={`Current theme: ${getLabel()}. Click to cycle to next theme.`}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  );
}
