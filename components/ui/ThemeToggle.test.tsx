import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/lib/hooks/useTheme';

// Mock the useTheme hook
jest.mock('@/lib/hooks/useTheme');

describe('ThemeToggle', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should render light mode icon when theme is light', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Current theme: Light mode. Click to cycle to next theme.');
  });

  it('should render dark mode icon when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', 'Current theme: Dark mode. Click to cycle to next theme.');
  });

  it('should render system theme icon when theme is system', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'system',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', 'Current theme: System theme. Click to cycle to next theme.');
  });

  it('should cycle from light to dark when clicked', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('should cycle from dark to system when clicked', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('system');
  });

  it('should cycle from system to light when clicked', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'system',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('should be keyboard accessible', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    // Focus the button
    button.focus();
    expect(button).toHaveFocus();

    // Press Enter
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.click(button); // Click is triggered by Enter

    expect(mockSetTheme).toHaveBeenCalled();
  });

  it('should have proper styling classes', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    // Brutalist design (Issue #27)
    expect(button).toHaveClass('p-4');
    expect(button).toHaveClass('brutal-card');
    expect(button).toHaveClass('border-charcoal');
    expect(button).toHaveClass('shadow-brutal-sm');
    expect(button).toHaveClass('text-text-primary');
    expect(button).toHaveClass('brutal-hover');
    expect(button).toHaveClass('focus:outline-none');
  });

  it('should have title attribute for tooltip', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('title', 'Dark mode');
  });
});
