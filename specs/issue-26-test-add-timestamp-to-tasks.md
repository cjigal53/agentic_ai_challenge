Perfecto. Ahora tengo TODO el contexto que necesito. Veo que:

1. Ya existe `createdAt` en el tipo `Task` (línea 10 de types.ts)
2. Ya se muestra en `TaskItem.tsx` (líneas 64-66) con `toLocaleDateString()`
3. El issue pide mejorarlo a formato relativo/absoluto

Voy a crear el spec siguiendo EXACTAMENTE el formato del issue-25:

# Issue #26: Add timestamp to tasks

## Overview
Enhance task timestamps to display user-friendly relative time ("2 hours ago") for recent tasks and absolute dates ("Feb 10, 2026") for older tasks, improving time context awareness for users.

## Problem Statement
Currently, all task timestamps display absolute dates using `toLocaleDateString()` regardless of how recent the task is. This makes it harder to quickly assess task age at a glance. Recent tasks would benefit from relative time display ("2 hours ago", "5 minutes ago") while older tasks are better served by absolute dates.

## Proposed Solution
Implement a smart timestamp formatter that:
- Shows relative time for tasks created within the last 24 hours ("2 hours ago", "just now")
- Shows absolute dates for tasks older than 24 hours ("Feb 10, 2026")
- Updates automatically without requiring page refresh (for active sessions)
- Handles edge cases like future dates, invalid dates, and very old tasks

## Technical Requirements
- Create utility function for timestamp formatting logic
- Update TaskItem component to use new formatter
- Maintain existing createdAt Date type (no data migration needed)
- Support internationalization (use browser locale)
- Keep existing timestamp styling and position
- No new external dependencies
- Maintain existing test coverage

## Implementation Details

### Components to Create/Modify

#### 1. Utility Functions

- **Path:** `lib/utils.ts`
  - Purpose: Add timestamp formatting utility
  - Changes:
    - Add `formatTaskTimestamp(date: Date): string` function
    - Logic:
      - Calculate time difference between now and createdAt
      - If < 1 minute: return "just now"
      - If < 60 minutes: return "X minutes ago"
      - If < 24 hours: return "X hours ago"
      - If >= 24 hours: return formatted date using `toLocaleDateString()`
    - Handle edge cases:
      - Invalid date: return "Invalid date"
      - Future date: return formatted date (no negative time)
      - Very old dates: return formatted date
    - Use singular/plural correctly ("1 hour ago" vs "2 hours ago")

- **Path:** `lib/utils.test.ts`
  - Purpose: Comprehensive tests for timestamp formatter
  - Changes:
    - Add test suite for `formatTaskTimestamp`
    - Test cases:
      - "just now" for < 1 minute
      - "X minutes ago" for 1-59 minutes
      - "X hours ago" for 1-23 hours
      - Absolute date for >= 24 hours
      - Singular vs plural forms
      - Invalid Date handling
      - Future date handling
    - Use Jest fake timers for consistent time-based testing

#### 2. Component Updates

- **Path:** `components/features/TaskItem.tsx`
  - Purpose: Display smart timestamps instead of raw dates
  - Changes:
    - Import `formatTaskTimestamp` from `@/lib/utils`
    - Replace line 64-66:
      ```tsx
      // OLD:
      <p className="text-xs text-text-secondary/60 mt-3">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
      
      // NEW:
      <p className="text-xs text-text-secondary/60 mt-3">
        Created: {formatTaskTimestamp(task.createdAt)}
      </p>
      ```
    - Add "Created:" prefix for clarity
    - Keep all existing styling and className
    - Maintain position below task description

- **Path:** `components/features/TaskItem.test.tsx`
  - Purpose: Update tests to handle new timestamp format
  - Changes:
    - Import `formatTaskTimestamp` and mock if needed
    - Update snapshot tests if they include timestamps
    - Add test case: "renders timestamp with 'Created:' prefix"
    - Verify timestamp calls formatting utility
    - Test with both relative and absolute timestamp scenarios

### Dependencies
No new dependencies required. Using:
- Built-in JavaScript Date object
- Existing Intl.DateTimeFormat (browser API)
- Jest for testing (already installed)

## Acceptance Criteria

### Functionality
- [ ] Tasks created < 1 minute ago show "just now"
- [ ] Tasks created 1-59 minutes ago show "X minutes ago" with correct singular/plural
- [ ] Tasks created 1-23 hours ago show "X hours ago" with correct singular/plural
- [ ] Tasks created >= 24 hours ago show absolute date (e.g., "Feb 10, 2026")
- [ ] "Created:" prefix visible before all timestamps
- [ ] Existing tasks in localStorage display correct timestamps
- [ ] Invalid dates handled gracefully with fallback message
- [ ] Future dates display absolute format (no negative time)

### Visual Design
- [ ] Timestamp position unchanged (below description, line 64)
- [ ] Timestamp styling unchanged (text-xs, text-text-secondary/60, mt-3)
- [ ] No layout shift or visual regressions
- [ ] Timestamp readable in both light and dark modes

### Testing
- [ ] All new utility tests pass
- [ ] All existing TaskItem tests pass
- [ ] Code coverage maintained or improved
- [ ] No console errors or warnings

### Code Quality
- [ ] Function documented with JSDoc comments
- [ ] TypeScript types properly defined
- [ ] Follows existing code style and patterns
- [ ] No magic numbers (use named constants for thresholds)

## Testing Strategy

### Unit Tests
- **lib/utils.test.ts:**
  - Test `formatTaskTimestamp` with various time differences
  - Mock current time using Jest fake timers
  - Test edge cases: invalid dates, future dates, very old dates
  - Verify singular/plural forms
  - Test locale-specific date formatting

- **components/features/TaskItem.test.tsx:**
  - Test timestamp renders with "Created:" prefix
  - Test component with recently created task (relative time)
  - Test component with old task (absolute date)
  - Verify formatting utility is called with correct date

### Integration Testing
Manual verification:
1. Create new task → verify shows "just now"
2. Wait 5 minutes → verify updates to "5 minutes ago"
3. Wait 2 hours → verify updates to "2 hours ago"
4. Load app with 2-day-old task → verify shows absolute date
5. Test in different locales (browser language settings)

### Manual Testing
1. **Fresh Tasks:**
   - Create task
   - Verify "just now" appears immediately
   - Wait and verify it updates (may require reload depending on implementation)

2. **Existing Tasks:**
   - Load app with tasks from various times
   - Verify correct format based on age
   - Check tasks from yesterday, last week, last month

3. **Edge Cases:**
   - Create task, set system clock back → verify no negative time
   - Import task with invalid date → verify fallback message
   - Test in different timezones

4. **Cross-browser:**
   - Test date formatting in Chrome, Safari, Firefox
   - Verify locale-specific formats work correctly

## Edge Cases

### Time-based Edge Cases
- **Just now threshold:** Tasks < 60 seconds show "just now" (not "0 minutes ago")
- **Boundary transitions:** 59 minutes → 1 hour, 23 hours → absolute date
- **Midnight crossover:** Task from yesterday at 11:59 PM vs today at 12:01 AM
- **DST transitions:** Handle daylight saving time changes correctly

### Data Edge Cases
- **Invalid Date:** Task with corrupted createdAt → show "Invalid date" fallback
- **Future dates:** Clock skew or manual date change → show absolute date, no "in X minutes"
- **Very old dates:** Tasks from years ago → show absolute date normally
- **Missing createdAt:** Shouldn't happen (type enforces it), but handle gracefully if it does

### Locale Edge Cases
- **Different date formats:** US (MM/DD/YYYY) vs EU (DD/MM/YYYY) vs ISO (YYYY-MM-DD)
- **12h vs 24h time:** Respect user locale preference
- **Language:** "minutes ago" should respect browser language (future i18n consideration)

### Performance Edge Cases
- **Many tasks:** 100+ tasks rendering timestamps shouldn't cause performance issues
- **Rapid creation:** Creating multiple tasks in quick succession shows correct relative times
- **Memory leaks:** If auto-refresh implemented, ensure intervals cleaned up properly

## Out of Scope

### Explicitly Excluded (Not in Issue #26)
- **Auto-refresh of timestamps:** Timestamps won't update live without page reload
  - Implementing this would require intervals/timers and cleanup logic
  - Would need to address performance concerns with many tasks
  - Can be addressed in future issue if desired
- **Custom date format selection:** User preference for date format not included
- **Time of day display:** No "3:45 PM" time component for recent tasks
- **Internationalization (i18n):** Using browser locale only, no i18n library
- **Relative time for dates > 24h:** "2 days ago", "1 week ago" not included per requirements
  - Spec clearly states only < 24h uses relative time
- **Timezone display:** No explicit timezone indicator
- **Calendar integration:** No calendar popover or date picker
- **Edit timestamp:** Users cannot modify createdAt (it's immutable)
- **Sort by date:** Task ordering not affected (separate feature)

### Future Considerations (Not This Issue)
- Live timestamp updates with auto-refresh every 60 seconds
- Extended relative time ("2 days ago", "1 week ago", "3 months ago")
- Tooltip showing exact datetime on hover
- Internationalization with i18n library (react-intl, i18next)
- User preference for date format
- Task update timestamp (updatedAt field)
- Timestamp in task list view (currently only in TaskItem)
- Due dates and deadline tracking
- Time tracking or duration features