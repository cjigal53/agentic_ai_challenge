import { renderHook, act, waitFor } from '@testing-library/react';
import { useTheme, Theme, ResolvedTheme } from './useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  describe('Initial theme loading', () => {
    it('should default to system theme when no preference is stored', () => {
      const { result } = renderHook(() => useTheme());
      expect(result.current.theme).toBe('system');
    });

    it('should load light theme from localStorage', async () => {
      localStorage.setItem('theme-preference', 'light');
      const { result } = renderHook(() => useTheme());

      await waitFor(() => {
        expect(result.current.theme).toBe('light');
        expect(result.current.resolvedTheme).toBe('light');
      });
    });

    it('should load dark theme from localStorage', async () => {
      localStorage.setItem('theme-preference', 'dark');
      const { result } = renderHook(() => useTheme());

      await waitFor(() => {
        expect(result.current.theme).toBe('dark');
        expect(result.current.resolvedTheme).toBe('dark');
      });
    });

    it('should load system theme from localStorage', async () => {
      localStorage.setItem('theme-preference', 'system');
      const { result } = renderHook(() => useTheme());

      await waitFor(() => {
        expect(result.current.theme).toBe('system');
      });
    });
  });

  describe('Theme setting', () => {
    it('should set light theme', async () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('light');
      });

      await waitFor(() => {
        expect(result.current.theme).toBe('light');
        expect(result.current.resolvedTheme).toBe('light');
        expect(localStorage.getItem('theme-preference')).toBe('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
    });

    it('should set dark theme', async () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('dark');
      });

      await waitFor(() => {
        expect(result.current.theme).toBe('dark');
        expect(result.current.resolvedTheme).toBe('dark');
        expect(localStorage.getItem('theme-preference')).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
    });

    it('should set system theme', async () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('system');
      });

      await waitFor(() => {
        expect(result.current.theme).toBe('system');
        expect(localStorage.getItem('theme-preference')).toBe('system');
      });
    });
  });

  describe('Theme cycling', () => {
    it('should cycle through themes correctly', async () => {
      const { result } = renderHook(() => useTheme());

      // Start with light
      act(() => {
        result.current.setTheme('light');
      });

      await waitFor(() => {
        expect(result.current.theme).toBe('light');
      });

      // Cycle to dark
      act(() => {
        result.current.setTheme('dark');
      });

      await waitFor(() => {
        expect(result.current.theme).toBe('dark');
      });

      // Cycle to system
      act(() => {
        result.current.setTheme('system');
      });

      await waitFor(() => {
        expect(result.current.theme).toBe('system');
      });
    });
  });

  describe('DOM class application', () => {
    it('should add dark class when dark theme is set', async () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('dark');
      });

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
    });

    it('should remove dark class when light theme is set', async () => {
      // First set dark
      document.documentElement.classList.add('dark');

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('light');
      });

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
    });
  });

  describe('System preference detection', () => {
    it('should resolve system theme based on media query', async () => {
      // Mock matchMedia to return dark preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('system');
      });

      await waitFor(() => {
        expect(result.current.theme).toBe('system');
        expect(result.current.resolvedTheme).toBe('dark');
      });
    });

    it('should listen for system preference changes', async () => {
      let mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null;

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false, // Start with light
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn((event, listener) => {
            if (event === 'change') {
              mediaQueryListener = listener;
            }
          }),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('system');
      });

      await waitFor(() => {
        expect(result.current.theme).toBe('system');
      });

      // Simulate system preference change to dark
      if (mediaQueryListener) {
        act(() => {
          mediaQueryListener?.({ matches: true } as MediaQueryListEvent);
        });

        await waitFor(() => {
          expect(result.current.resolvedTheme).toBe('dark');
        });
      }
    });
  });

  describe('localStorage persistence', () => {
    it('should persist theme changes to localStorage', async () => {
      const { result } = renderHook(() => useTheme());

      const themes: Theme[] = ['light', 'dark', 'system'];

      for (const theme of themes) {
        act(() => {
          result.current.setTheme(theme);
        });

        await waitFor(() => {
          expect(localStorage.getItem('theme-preference')).toBe(theme);
        });
      }
    });

    it('should persist across hook remounts', async () => {
      const { result: firstMount } = renderHook(() => useTheme());

      act(() => {
        firstMount.current.setTheme('dark');
      });

      await waitFor(() => {
        expect(firstMount.current.theme).toBe('dark');
      });

      // Unmount and remount
      const { result: secondMount } = renderHook(() => useTheme());

      await waitFor(() => {
        expect(secondMount.current.theme).toBe('dark');
        expect(secondMount.current.resolvedTheme).toBe('dark');
      });
    });
  });
});
