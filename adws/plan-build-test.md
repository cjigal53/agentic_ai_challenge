# ADW: Plan → Build → Test Workflow

## Overview
Complete agentic workflow for implementing features from GitHub issues, following the three-phase approach taught in the Agentic AI course.

## Trigger
- New GitHub issue created with feature request
- Developer invokes `/feature` command or similar

## Phases

### Phase 1: PLAN
**Objective**: Thoroughly understand requirements and create detailed specification before writing code.

**Agent Actions**:
1. Read and analyze GitHub issue
2. Research existing codebase patterns
3. Create specification document in `specs/issue-N-feature-name.md`
4. Define:
   - Requirements and acceptance criteria
   - Technical approach and architecture
   - Files to create/modify
   - Test strategy
5. Commit spec with message: `docs: Add spec for [feature] (Issue #N - PLAN)`

**Deliverable**: Detailed spec document in `specs/`

**Human Involvement**: Review and approve spec if needed

---

### Phase 2: BUILD
**Objective**: Implement the feature according to the specification.

**Agent Actions**:
1. Follow approach defined in spec
2. Create/modify files as planned:
   - Components
   - Hooks
   - Types
   - Utilities
3. Apply project conventions:
   - TypeScript strict mode
   - Tailwind CSS for styling
   - Proper error handling
4. Verify code compiles without errors
5. Stage changes for next phase

**Deliverable**: Working implementation

**Human Involvement**: Minimal - agent works autonomously

---

### Phase 3: TEST
**Objective**: Verify implementation meets all requirements through automated testing.

**Agent Actions**:
1. Create test files:
   - Unit tests for logic
   - Component tests for UI
   - Integration tests for workflows
2. Write comprehensive test cases covering:
   - Happy paths
   - Edge cases
   - Error conditions
   - Accessibility
3. Execute test suite: `npm test`
4. Fix any failing tests
5. Verify all acceptance criteria from spec are met
6. Commit with message including test results:
   ```
   feat: [Feature description] (Issue #N)

   [Implementation details]

   Tests: X passing

   Resolves #N

   Co-Authored-By: Claude Code <noreply@anthropic.com>
   ```

**Deliverable**: Passing test suite + commit

**Human Involvement**: Review results, approve PR if needed

---

## Tools Used
- **GitHub CLI** (`gh`) - Issue management
- **Git** - Version control
- **Jest + React Testing Library** - Testing
- **Next.js** - Build system
- **Claude Code** - Autonomous agent execution

## Success Criteria
- ✅ Spec document created and committed
- ✅ Implementation follows spec exactly
- ✅ All tests pass
- ✅ Issue closed with reference to commit
- ✅ Commit shows Co-Authored-By: Claude Code

## Example Usage

```bash
# Human creates issue
gh issue create --title "Add dark mode toggle" --body "..."

# Agent executes workflow
/feature 15

# Result: Issue #15 resolved with spec, implementation, tests
```

## Issues Resolved with this Workflow
- Issue #8: Initial project setup
- Issue #9: Task type definitions and state management
- Issue #10: Task list display component
- Issue #11: Task creation form with validation
- Issue #12: Task completion toggle
- Issue #13: Task deletion with confirmation
- Issue #14: localStorage persistence
- Issue #15: Dark mode toggle with system preference

## Evidence
Every commit in this project shows:
1. Clear phase indication (PLAN/BUILD/TEST)
2. Reference to spec document
3. Test results included
4. Co-authorship with Claude Code
5. Issue resolution

This workflow demonstrates true autonomous agent development, not just AI-assisted coding.
