# Issue #15: Dark Mode Toggle with System Preference Support

## Issue
https://github.com/cjigal53/agentic_ai_challenge/issues/15

## Overview
Implement a theme toggle that allows users to manually control dark/light mode or follow system preferences. This enhances user experience by providing theme control while respecting user preferences.

## Requirements

### Theme Modes
1. **Light**: Force light theme regardless of system
2. **Dark**: Force dark theme regardless of system
3. **System** (default): Follow OS/browser preference

### User Interface
- Toggle button in app header
- Visual icons (sun/moon/auto)
- Smooth transitions
- Current theme indicator
- Accessible for keyboard and screen readers

### Technical Requirements
- Persist preference in localStorage
- No flash of wrong theme on load
- Detect system preference changes
- Update `<html>` class for Tailwind dark mode
- SSR-safe implementation

## Approach

### 1. Theme Hook (`lib/hooks/useTheme.ts`)

**State Management**:
```typescript
type Theme = 'light' | 'dark' | 'system'
const [theme, setTheme] = useState<Theme>('system')
const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
```

**Functions**:
- `loadTheme()`: Load from localStorage, default to 'system'
- `saveTheme(theme)`: Save to localStorage
- `detectSystemTheme()`: Use window.matchMedia
- `applyTheme()`: Update HTML class
- `handleSystemChange()`: Listen to system changes

**localStorage Key**: `theme-preference`

### 2. Theme Toggle Component (`components/ui/ThemeToggle.tsx`)

**UI Options**:
```
Option A - Cycle Button:
[🌙] → Click → [☀️] → Click → [💻] → Click → [🌙]

Option B - Dropdown:
[💻 ▼]
  ├─ ☀️ Light
  ├─ 🌙 Dark
  └─ 💻 System ✓
```

**Implementation**: Use simple cycle button for cleaner UX

**Icons**:
- Light: ☀️ Sun icon
- Dark: 🌙 Moon icon
- System: 💻 Monitor icon

### 3. Script Injection (Prevent Flash)

Add inline script in `app/layout.tsx` `<head>`:
```typescript
<script dangerouslySetInnerHTML={{__html: `
  (function() {
    const theme = localStorage.getItem('theme-preference') || 'system';
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const resolved = theme === 'system' ? systemTheme : theme;
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })();
`}} />
```

### 4. Integration

**Update `app/page.tsx`**:
- Add ThemeToggle in header section
- Position: Top right corner

**Styling**:
- Fixed position or in header container
- Subtle, not intrusive
- Smooth color transitions

## Acceptance Criteria

- [x] useTheme hook created with all functions
- [x] ThemeToggle component with cycle button
- [x] Three theme modes work correctly
- [x] Theme persists in localStorage
- [x] System preference detected
- [x] No flash on page load
- [x] Keyboard accessible (Tab + Enter)
- [x] Visual indicator of current theme
- [x] Smooth transitions
- [x] Tests for theme logic

## Testing Plan

### useTheme Hook Tests
1. Loads 'system' by default if no localStorage
2. Loads saved preference from localStorage
3. Detects system theme correctly
4. Applies theme to HTML element
5. Saves theme to localStorage on change
6. Responds to system preference changes

### ThemeToggle Component Tests
1. Renders correct icon for current theme
2. Cycles through themes on click
3. Updates theme via hook
4. Accessible with keyboard

### Integration Tests
1. No flash on initial load
2. Theme persists across page refresh
3. Theme applies to all components

## Implementation Notes

- Use `useEffect` for mounting/unmounting system listener
- Clean up `matchMedia` listener on unmount
- Test in both light and dark system modes
- Verify all Tailwind `dark:` classes work correctly
- Ensure SSR doesn't break (window checks)

## Success Criteria

✅ Toggle button visible in header
✅ All three modes functional
✅ No theme flash on load
✅ Preference persists
✅ System changes detected
✅ Smooth UX with transitions
✅ Fully accessible
