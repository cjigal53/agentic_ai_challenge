# Agentic AI Development Workflow

This document explains the complete agentic workflow used in this project.

## Overview

This project follows the **Plan → Build → Test** cycle learned in the Agentic AI course, with all development driven by autonomous AI agents.

## The Three Phases

### 1. 📋 PLAN Phase

**Objective**: Thoroughly plan the feature before writing any code.

**Steps**:
1. Read and understand the GitHub issue
2. Create a detailed spec document in `specs/`
3. Define requirements and acceptance criteria
4. Document technical approach
5. Plan test strategy

**Deliverable**: `specs/issue-N-feature-name.md`

**Why**: Planning prevents rework and ensures complete understanding before implementation.

---

### 2. 🔨 BUILD Phase

**Objective**: Implement the feature according to the spec.

**Steps**:
1. Follow the approach defined in spec
2. Create components, utilities, types as planned
3. Write clean, typed, documented code
4. Follow project conventions and best practices
5. Verify code compiles without errors

**Deliverable**: Working implementation

**Why**: Building from a spec ensures focused, efficient implementation.

---

### 3. ✅ TEST Phase

**Objective**: Verify the implementation meets all requirements.

**Steps**:
1. Write unit tests for utilities and functions
2. Write component tests for UI
3. Write integration tests for workflows
4. Execute test suite
5. Fix any failing tests
6. Verify all acceptance criteria from spec are met

**Deliverable**: Passing test suite

**Why**: Testing ensures quality and catches issues before deployment.

---

## Agentic Workflow Tools

### Custom Commands

Located in `.claude/commands/`:

- **`/feature <issue>`** - Complete plan → build → test cycle for a feature
- **`/setup <type>`** - Initial project setup with testing
- **`/test <file>`** - Run tests for specific file/feature

### Specifications

Located in `specs/`:

- One spec per feature
- Links to GitHub issue
- Complete technical planning
- Acceptance criteria checklist

### Tests

Located in `tests/`:

- Unit tests for logic
- Component tests for UI
- Integration tests for workflows
- Test utilities and helpers

---

## Commit Conventions

Every commit in this project:

1. **Has a clear type**: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`
2. **References the issue**: `Resolves #N` or `Refs #N`
3. **Links to spec**: "Following spec in specs/issue-N-*.md"
4. **Shows AI collaboration**: `Co-Authored-By: Claude Code <noreply@anthropic.com>`
5. **Includes test status**: "Tests: X passing"

Example:
```
feat: Add task creation form with validation

Following spec in specs/issue-4-task-creation.md

- Implemented TaskForm component with validation
- Added character counter and error messages
- Form resets after submission

Tests: 12 passing

Resolves #4

Co-Authored-By: Claude Code <noreply@anthropic.com>
```

---

## Why This Workflow Matters

1. **Quality**: Planning + testing ensures high-quality code
2. **Clarity**: Specs document decisions and approach
3. **Traceability**: Every feature has issue → spec → implementation → tests
4. **Collaboration**: Clear AI involvement at every step
5. **Learning**: Demonstrates complete agentic AI process

---

## For Reviewers

To verify the agentic workflow:

1. **Check structure**: `.claude/`, `specs/`, `tests/` directories exist
2. **Read specs**: Each feature has a detailed planning document
3. **Review commits**: Every commit shows plan → build → test cycle
4. **Run tests**: `npm test` shows comprehensive test coverage
5. **Check issues**: GitHub issues link to specs and show AI involvement

This project demonstrates real agentic AI development, not just "AI-assisted coding."
