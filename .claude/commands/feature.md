# /feature Command

Custom command for implementing features following the agentic workflow: Plan → Build → Test

## Usage

```
/feature <issue-number>
```

## What This Command Does

1. **PLAN Phase**
   - Reads the GitHub issue
   - Creates detailed spec document in `specs/`
   - Documents approach, components, and acceptance criteria

2. **BUILD Phase**
   - Implements the feature according to spec
   - Follows TypeScript and Next.js best practices
   - Creates necessary components and utilities

3. **TEST Phase**
   - Writes comprehensive tests
   - Executes test suite
   - Verifies all acceptance criteria are met

4. **COMMIT Phase**
   - Creates commit with proper message
   - Links to issue and spec
   - Includes Co-Authored-By: Claude Code

## Example

```bash
# Implement feature from issue #3
/feature 3
```

This will:
1. Create `specs/issue-3-feature-name.md`
2. Implement the feature
3. Write tests in `tests/`
4. Commit with "feat: Feature name (Resolves #3)"
5. Close issue with implementation summary
