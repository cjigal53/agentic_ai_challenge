# Example: Automated Issue Processing

This document shows an example of how the executable workflow system processes a GitHub issue from start to finish.

## Step 1: Create Issue

**Via GitHub UI or CLI:**
```bash
gh issue create \
  --title "feat: Add export to CSV button" \
  --body "Allow users to export their todo list to a CSV file. Should include columns: Title, Status, Created Date."
```

**Issue created: #42**

---

## Step 2: Webhook Triggers

```log
[2025-02-09 19:45:01] Received webhook: issues
[2025-02-09 19:45:01] Issue event: action=opened, number=42
[2025-02-09 19:45:01] New issue #42: feat: Add export to CSV button
[2025-02-09 19:45:01] Processing issue #42 in background...
```

---

## Step 3: Orchestrator Starts

```log
============================================================
ORCHESTRATOR: Issue #42
============================================================
Fetching issue from GitHub...
Issue: feat: Add export to CSV button
State: open
Labels: []
Adding processing label...
Starting full cycle...
```

**GitHub shows:**
- Label: `🤖 agent-processing`
- Comment: "🤖 **Agentic workflow started** - The agent is now processing this issue."

---

## Step 4: PLAN Phase

```log
=== PLAN PHASE: Issue #42 ===
Fetching issue from GitHub...
Issue title: feat: Add export to CSV button
Rendering PLAN prompt template...
Invoking Claude to generate specification...
Writing spec to: /Users/carlos/Desarrollo/agentic_ai_challenge/specs/issue-42-add-export-to-csv-button.md
Committing spec file...
Adding comment to GitHub issue...
=== PLAN PHASE COMPLETE ===
```

**Output: `specs/issue-42-add-export-to-csv-button.md`**

```markdown
# Issue #42: Add export to CSV button

## Overview
Add a feature to export the todo list to a CSV file for backup or external processing.

## Problem Statement
Users cannot export their todo data. They need a way to download their tasks as a CSV file.

## Proposed Solution
Add an "Export to CSV" button that generates a CSV file with columns: Title, Status, Created Date.

## Technical Requirements
- Button in the UI (near the "Add Task" button)
- Generate CSV with proper formatting
- Trigger browser download
- Include all tasks (completed and incomplete)

## Implementation Details
### Components to Create/Modify
- **Path:** `components/features/TodoList.tsx`
  - Purpose: Main todo list component
  - Changes: Add export button and handler

- **Path:** `lib/export.ts`
  - Purpose: CSV generation utility
  - Changes: Create new utility to convert tasks to CSV

### Dependencies
None (use browser APIs)

## Acceptance Criteria
- [ ] Export button is visible in the UI
- [ ] Clicking button downloads a CSV file
- [ ] CSV includes columns: Title, Status, Created Date
- [ ] CSV includes all tasks
- [ ] File name is "tasks-YYYY-MM-DD.csv"

## Testing Strategy
- **Unit Tests:** Test CSV generation function with sample data
- **Integration Tests:** Test button click triggers download

## Edge Cases
- Empty task list → CSV with headers only
- Special characters in titles → Properly escaped
- Date formatting → ISO 8601 format

## Out of Scope
- Import from CSV
- Other export formats (JSON, Excel)
```

**GitHub shows:**
- Comment: "✅ **PLAN phase completed** - Specification generated: `issue-42-add-export-to-csv-button.md`"

---

## Step 5: BUILD Phase

```log
=== BUILD PHASE: Issue #42 ===
Reading spec from: specs/issue-42-add-export-to-csv-button.md
Rendering BUILD prompt template...
Invoking Claude to implement code...
Build completed
Verifying TypeScript compilation...
Type check passed ✅
Adding comment to GitHub issue...
=== BUILD PHASE COMPLETE ===
```

**Files created/modified:**

1. `lib/export.ts` (new):
```typescript
export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

export function exportToCSV(tasks: Task[]): void {
  const headers = ['Title', 'Status', 'Created Date']

  const rows = tasks.map(task => [
    escapeCSV(task.title),
    task.completed ? 'Completed' : 'Incomplete',
    task.createdAt.toISOString()
  ])

  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `tasks-${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

function escapeCSV(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}
```

2. `components/features/TodoList.tsx` (modified):
```typescript
import { exportToCSV } from '@/lib/export'

// ... existing code ...

<button
  onClick={() => exportToCSV(tasks)}
  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
>
  Export to CSV
</button>
```

**GitHub shows:**
- Comment: "✅ **BUILD phase completed** - Code implemented according to spec."

---

## Step 6: TEST Phase

```log
=== TEST PHASE: Issue #42 ===
Reading spec from: specs/issue-42-add-export-to-csv-button.md
Running npm test...
Tests failed ❌
Invoking Claude to fix tests...
Claude attempted to fix issues
Running npm test...
Tests passed ✅
Tests passed after 2 attempts ✅
```

**Test file created: `lib/export.test.ts`**

```typescript
import { exportToCSV } from './export'

describe('exportToCSV', () => {
  it('should generate CSV with headers', () => {
    const tasks = []
    // Mock document.createElement and test CSV generation
    // ... test implementation
  })

  it('should include all tasks', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false, createdAt: new Date() },
      { id: '2', title: 'Task 2', completed: true, createdAt: new Date() }
    ]
    // ... test implementation
  })

  it('should escape special characters', () => {
    const tasks = [
      { id: '1', title: 'Task with, comma', completed: false, createdAt: new Date() }
    ]
    // ... test implementation
  })
})
```

**GitHub shows:**
- Comment: "✅ **TEST phase completed** - All tests passed after 2 attempt(s)."

---

## Step 7: COMMIT Phase

```log
=== COMMIT PHASE: Issue #42 ===
Fetching issue from GitHub...
Staging changes...
Commit message: feat: Add export to CSV button (Issue #42)
Creating commit...
Commit created successfully
Commit SHA: a3f89e2c1d45678b9012345678901234567890ab
Pushing to remote...
Pushed to remote successfully
Closing GitHub issue...
Issue closed successfully
=== COMMIT PHASE COMPLETE ===
```

**Commit created:**
```
commit a3f89e2c1d45678b9012345678901234567890ab
Author: Carlos <carlos@example.com>
Date:   Sun Feb 9 19:47:32 2025

    feat: Add export to CSV button (Issue #42)
```

**GitHub shows:**
- Issue closed
- Label: `✅ auto-completed`
- Comment:
  ```
  ✅ **Issue completed successfully**

  **Summary:**
  - Tests passed after 2 attempt(s)
  - Commit: [a3f89e2](https://github.com/cjigal53/agentic_ai_challenge/commit/a3f89e2)

  **Workflow phases:**
  1. ✅ PLAN - Specification generated
  2. ✅ BUILD - Code implemented
  3. ✅ TEST - All tests passing
  4. ✅ COMMIT - Changes pushed

  Automatically closed by agentic workflow.
  ```

---

## Step 8: Verification

**Check the deployment:**
```bash
# Visit the Vercel deployment
open https://agentic-ai-challenge.vercel.app

# Or check locally
npm run dev
# Navigate to the app and click "Export to CSV"
```

**Check the files:**
```bash
# Spec created
cat specs/issue-42-add-export-to-csv-button.md

# Code implemented
cat lib/export.ts

# Tests passing
npm test
```

**Check the commit:**
```bash
git log -1 --stat

# Shows:
# feat: Add export to CSV button (Issue #42)
#
# lib/export.ts                       | 35 ++++++++++++++++++++++++++++++++++
# lib/export.test.ts                  | 42 +++++++++++++++++++++++++++++++++++++++++
# components/features/TodoList.tsx    |  8 +++++++-
# 3 files changed, 84 insertions(+), 1 deletion(-)
```

---

## Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Webhook received | 0s | ✅ |
| Orchestrator start | 2s | ✅ |
| PLAN | 45s | ✅ |
| BUILD | 80s | ✅ |
| TEST (attempt 1) | 60s | ❌ |
| TEST (attempt 2) | 55s | ✅ |
| COMMIT | 12s | ✅ |
| **Total** | **~4 minutes** | ✅ |

---

## State File

**`adws/state/issue-42.json`:**
```json
{
  "success": true,
  "phase": "COMMIT",
  "error": null,
  "spec_path": "/Users/carlos/Desarrollo/agentic_ai_challenge/specs/issue-42-add-export-to-csv-button.md",
  "commit_sha": "a3f89e2c1d45678b9012345678901234567890ab",
  "test_attempts": 2
}
```

---

## Result

✅ **Fully automated** from issue creation to deployment:

- ✅ Issue created by human
- ✅ Spec generated by agent
- ✅ Code implemented by agent
- ✅ Tests written by agent
- ✅ Tests fixed by agent (retry)
- ✅ Commit created by agent
- ✅ Issue closed by agent
- ✅ Deployed automatically (Vercel)

**Human intervention: ZERO**

The only human action was creating the initial issue. Everything else was autonomous.
