# Issue #27: feat: change look and feel...again

## Overview
Complete visual redesign of the Todo App using the frontend-design skill to create a distinctive, production-grade interface that moves away from the current futuristic glassmorphism aesthetic. This redesign will introduce a completely new visual language while maintaining all existing functionality.

## Problem Statement
The current futuristic dark theme with glassmorphism, neon accents (cyan/violet), and deep blacks (#0B0F14) has been in place and needs a fresh, distinctive look. The user wants to explore a different aesthetic direction using the frontend-design skill to generate creative, polished code that avoids generic AI design patterns.

## Proposed Solution
Replace the current futuristic/cyberpunk aesthetic with a completely different design system. The frontend-design skill will be used to create a distinctive, production-grade interface with:

- **New Color Palette**: Move away from deep blacks and neon accents
- **New Visual Style**: Replace glassmorphism with a different aesthetic approach
- **New Typography Hierarchy**: Different font choices and text styling
- **New Component Styling**: Redesigned cards, buttons, inputs, and interactive elements
- **Maintained Functionality**: All features (add, toggle, delete, persistence, theme toggle) remain unchanged
- **Same Accessibility**: WCAG AA compliance maintained
- **Same Responsiveness**: Mobile-first approach preserved

## Technical Requirements
- Use frontend-design skill to generate distinctive visual design
- Replace all Tailwind utility classes with new design system
- Update `globals.css` with new CSS variables and utility classes
- Update `tailwind.config.ts` with new color palette and design tokens
- Modify all component styling without changing their logic
- Maintain all existing TypeScript types and interfaces
- Keep all props, hooks, and state management unchanged
- Preserve all accessibility attributes and ARIA labels
- Ensure all existing tests pass without modification

## Implementation Details

### Files to Modify

#### 1. Design System Foundation
- **Path:** `tailwind.config.ts`
  - Purpose: Define new color palette, spacing, and design tokens
  - Changes: Replace current futuristic colors (deep-black, neon-cyan, neon-violet) with new palette; update spacing, borderRadius, shadows

- **Path:** `app/globals.css`
  - Purpose: Define CSS variables and utility classes
  - Changes: Replace glassmorphism utilities with new visual style utilities; update :root and .dark theme variables

#### 2. Layout Components
- **Path:** `app/page.tsx`
  - Purpose: Main page layout
  - Changes: Update className attributes with new design system; maintain structure and logic

- **Path:** `app/layout.tsx`
  - Purpose: Root layout and metadata
  - Changes: Update font choices if needed; maintain theme script and structure

#### 3. Feature Components
- **Path:** `components/features/TaskForm.tsx`
  - Purpose: Task creation form
  - Changes: Redesign input fields, labels, button styling; maintain validation logic and state

- **Path:** `components/features/TaskItem.tsx`
  - Purpose: Individual task display
  - Changes: Redesign card layout, checkbox, delete button; maintain toggle/delete handlers

- **Path:** `components/features/TaskList.tsx`
  - Purpose: Task list container
  - Changes: Update empty state design and list styling; maintain rendering logic

#### 4. UI Components
- **Path:** `components/ui/ThemeToggle.tsx`
  - Purpose: Theme switcher button
  - Changes: Redesign button styling; maintain theme cycle logic

### Design Constraints from frontend-design Skill
- Create production-grade, distinctive interfaces
- Avoid generic AI aesthetics (no excessive gradients, no overuse of purple/blue)
- Use creative, polished styling
- Maintain high design quality
- Consider modern design trends (Brutalism, Neo-brutalism, Bauhaus, Swiss Design, etc.)

### Dependencies
No new dependencies required. All changes use existing:
- Next.js 14
- React 18
- TypeScript 5
- Tailwind CSS 3
- Existing component structure

## Acceptance Criteria
- [ ] Visual design is completely different from current futuristic/glassmorphism aesthetic
- [ ] Design is distinctive and production-grade (not generic)
- [ ] All color references updated (no deep-black, neon-cyan, neon-violet)
- [ ] All glassmorphism effects replaced with new visual style
- [ ] Task form includes styled inputs, labels, button with new design
- [ ] Task items display with new card design, checkbox, and delete button
- [ ] Empty state has new visual design
- [ ] Theme toggle button has new styling
- [ ] All existing functionality works identically (add, toggle, delete, persistence)
- [ ] Theme toggle cycles through light/dark/system correctly
- [ ] All existing tests pass without modification
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] WCAG AA accessibility maintained (contrast ratios, focus states)
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors

## Testing Strategy

### Unit Tests
- **Existing tests must pass**: All tests in `components/features/TaskForm.test.tsx`, `components/features/TaskList.test.tsx`, `components/ui/ThemeToggle.test.tsx`, and `app/page.test.tsx` must pass without modification
- Tests validate functionality, not styling, so visual changes should not break them

### Integration Tests
- **Manual browser testing**: Verify visual appearance across different screen sizes
- **Theme switching**: Test light/dark/system theme modes render with new design
- **Task CRUD operations**: Create, toggle, delete tasks with new UI

### Manual Testing Steps
1. Start dev server: `npm run dev`
2. Verify new visual design loads correctly
3. Create multiple tasks with titles and descriptions
4. Toggle tasks as completed/incomplete
5. Delete tasks and confirm deletion
6. Switch between light/dark/system themes
7. Test responsive behavior on mobile, tablet, desktop viewports
8. Verify keyboard navigation and focus states
9. Test with screen reader to ensure accessibility
10. Check browser console for errors

### Accessibility Testing
- Use axe DevTools to verify WCAG AA compliance
- Test keyboard navigation (Tab, Enter, Space)
- Verify focus indicators are visible
- Check color contrast ratios meet 4.5:1 minimum
- Test with screen reader (VoiceOver on macOS)

## Edge Cases
- **Very long task titles**: Should wrap or truncate gracefully with new design
- **Very long descriptions**: Should display properly within new card design
- **Empty task list**: New empty state design should be clear and attractive
- **System theme switching**: New design should adapt when OS theme changes
- **Rapid theme toggling**: Visual transitions should be smooth
- **Many tasks (50+)**: List should scroll smoothly with new styling
- **Tasks with no description**: Layout should adapt with new design

## Out of Scope
- Adding new features or functionality
- Changing component structure or logic
- Modifying state management or hooks
- Adding animations or complex transitions (unless part of new design system)
- Changing task data structure or localStorage schema
- Adding new dependencies or libraries
- Modifying tests or test structure
- Changing build configuration
- Backend or API changes (this is a frontend-only app)
- Performance optimization (unless visual changes cause issues)

## Implementation Notes
- Use the frontend-design skill to generate the new visual design direction
- Maintain separation of concerns: only change className attributes and CSS, not logic
- Keep existing component props interfaces unchanged
- Preserve all ARIA labels and accessibility attributes
- Test thoroughly to ensure no regressions in functionality
- Document the new design system in comments if significantly different
