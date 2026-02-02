# ADW: Automated Testing Workflow

## Overview
Autonomous testing workflow executed by AI agents to ensure code quality and verify requirements before deployment.

## Trigger
- After BUILD phase completes
- Before committing changes
- On-demand via `/test` command

## Workflow Phases

### Phase 1: Test Planning
**Agent Actions**:
1. Analyze spec document for acceptance criteria
2. Identify testable scenarios:
   - Happy paths (expected user flows)
   - Edge cases (boundary conditions)
   - Error conditions (invalid inputs)
   - Accessibility requirements
3. Determine test types needed:
   - Unit tests (pure functions, utilities)
   - Component tests (UI components)
   - Integration tests (user workflows)
   - Hook tests (React hooks)

**Output**: Test strategy aligned with spec

---

### Phase 2: Test Implementation
**Agent Actions**:
1. Create test files following naming convention:
   - `[component].test.tsx` for components
   - `[hook].test.ts` for hooks
   - `[utility].test.ts` for utilities

2. Write test cases using Jest + React Testing Library:
   ```typescript
   describe('Component/Feature', () => {
     it('should handle expected behavior', () => {
       // Test implementation
     });

     it('should handle edge case', () => {
       // Edge case test
     });

     it('should handle error condition', () => {
       // Error test
     });
   });
   ```

3. Include:
   - Setup and teardown (beforeEach, afterEach)
   - Mocks for external dependencies
   - Accessibility testing (aria-labels, roles)
   - User interaction simulation (clicks, typing)

**Standards**:
- ✅ Test file co-located with source or in `tests/`
- ✅ Descriptive test names
- ✅ Arrange-Act-Assert pattern
- ✅ No hardcoded values
- ✅ Proper cleanup

---

### Phase 3: Test Execution
**Agent Actions**:
1. Run full test suite:
   ```bash
   npm test
   ```

2. Monitor output for:
   - Pass/fail status
   - Code coverage
   - Performance issues
   - Console warnings/errors

3. If tests fail:
   - Analyze failure reason
   - Fix implementation OR fix test
   - Re-run until all pass

**Quality Gate**: All tests must pass before proceeding

---

### Phase 4: Test Verification
**Agent Actions**:
1. Verify coverage of acceptance criteria:
   - Map each criterion to test case(s)
   - Ensure no criterion is untested

2. Check test quality:
   - Tests are not trivial
   - Tests actually verify behavior
   - Tests would catch regressions

3. Document test results:
   ```
   Tests: 44 passing
   Test Suites: 7 passed, 7 total
   Coverage: Components, Hooks, Utilities
   ```

**Output**: Test report for commit message

---

### Phase 5: Continuous Testing
**Agent Actions**:
1. Ensure tests run on every commit
2. Fix any breaking changes immediately
3. Add tests for new features
4. Update tests for refactored code

**Monitoring**:
- Build status on Vercel
- Test results in CI/CD
- Console for runtime errors

---

## Test Types Implemented

### Component Tests
Test React components in isolation:
- **TaskForm.test.tsx**: Form validation, submission, character counter
- **TaskList.test.tsx**: Empty state, task rendering, prop handling
- **TaskItem.test.tsx**: Toggle, delete, styling, accessibility
- **ThemeToggle.test.tsx**: Theme cycling, icons, keyboard access

### Hook Tests
Test custom React hooks:
- **useTasks.test.ts**: CRUD operations, localStorage sync, state updates
- **useTheme.test.ts**: Theme switching, system detection, persistence

### Utility Tests
Test pure functions:
- **utils.test.ts**: Helper functions, data transformations

### Integration Tests
Test complete user workflows:
- **page.test.tsx**: Full page rendering, component integration

---

## Testing Tools

| Tool | Purpose |
|------|---------|
| **Jest** | Test runner and assertion library |
| **React Testing Library** | Component testing with user-centric queries |
| **@testing-library/jest-dom** | Custom matchers for DOM assertions |
| **jest-environment-jsdom** | Browser-like environment for tests |

---

## Test Patterns Used

### 1. Arrange-Act-Assert
```typescript
it('should add a task', () => {
  // Arrange
  const { result } = renderHook(() => useTasks());

  // Act
  act(() => {
    result.current.addTask({ title: 'Test', completed: false });
  });

  // Assert
  expect(result.current.tasks).toHaveLength(1);
});
```

### 2. User-Centric Testing
```typescript
it('should toggle theme on click', () => {
  render(<ThemeToggle />);
  const button = screen.getByRole('button');

  fireEvent.click(button);

  expect(button).toHaveAttribute('aria-label', expect.stringContaining('Dark'));
});
```

### 3. Async Handling
```typescript
it('should update localStorage', async () => {
  const { result } = renderHook(() => useTasks());

  act(() => {
    result.current.addTask({ title: 'Test', completed: false });
  });

  await waitFor(() => {
    expect(localStorage.getItem('todo-app-tasks')).toBeTruthy();
  });
});
```

---

## Test Coverage

### Current Metrics
- **Total Tests**: 44
- **Test Suites**: 7
- **Success Rate**: 100%
- **Components Covered**: 100% (all components tested)
- **Hooks Covered**: 100% (all hooks tested)

### Coverage by Feature
| Feature | Tests | Status |
|---------|-------|--------|
| Task Creation | 8 | ✅ |
| Task Toggle | 6 | ✅ |
| Task Deletion | 4 | ✅ |
| localStorage Persistence | 12 | ✅ |
| Dark Mode | 8 | ✅ |
| Theme System | 18 | ✅ |
| UI Components | 10 | ✅ |

---

## Quality Standards

### Test Must-Haves
✅ Clear, descriptive test names
✅ Tests verify actual behavior, not implementation
✅ No flaky tests (consistent results)
✅ Fast execution (< 5 seconds total)
✅ Isolated tests (no dependencies between tests)
✅ Proper cleanup (localStorage, DOM, mocks)

### Test Smells to Avoid
❌ Testing implementation details
❌ Tests that always pass
❌ Overly complex test setup
❌ Hard-coded test data
❌ Tests that depend on execution order

---

## Continuous Improvement

The agent continuously:
1. Adds tests for new features
2. Updates tests when refactoring
3. Fixes failing tests immediately
4. Improves test coverage
5. Removes obsolete tests

---

## Evidence of Autonomous Testing

Every commit with code changes includes:
- New or updated test files
- Test execution results
- "Tests: X passing" in commit message
- No manual test runs (all automated)

This workflow ensures quality through comprehensive automated testing, executed autonomously by AI agents without manual intervention.
