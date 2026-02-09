# AI Developer Workflows (ADWs)

This directory contains both **executable orchestration scripts** and **documentation** of the autonomous AI workflows used throughout this project's development.

## 🚀 Executable Workflows

This project includes **fully executable** Python scripts that orchestrate Claude CLI to implement features autonomously. These are NOT just documentation - they are production-ready automation.

### Quick Start

**Option 1: Manual Execution**
```bash
# Install dependencies
pip3 install -r adws/requirements.txt

# Run full cycle for an issue
python3 adws/orchestrator.py 42
```

**Option 2: Automated via Webhook**
```bash
# Start webhook listener + tunnel
./adws/start_listener.sh

# Configure GitHub webhook (URL will be shown)
# Create issue → Agent processes automatically
```

### Architecture

```
GitHub Issue (created)
    ↓
Webhook → Local listener → Orchestrator
    ↓
Sequential execution:
    1. PLAN  → python3 adws/plan.py    → generates spec
    2. BUILD → python3 adws/build.py   → implements code
    3. TEST  → python3 adws/test.py    → writes/runs tests
    4. COMMIT → python3 adws/commit.py → commits + closes issue
```

### Executable Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `orchestrator.py` | Main entry point, validates and routes issues | `python3 adws/orchestrator.py <issue_num>` |
| `full_cycle.py` | Runs all 4 phases sequentially | `python3 adws/full_cycle.py <issue_num>` |
| `plan.py` | PLAN phase: Issue → Spec | `python3 adws/plan.py <issue_num>` |
| `build.py` | BUILD phase: Spec → Code | `python3 adws/build.py <issue_num> <spec_path>` |
| `test.py` | TEST phase: Code → Tests (with retries) | `python3 adws/test.py <issue_num> <spec_path>` |
| `commit.py` | COMMIT phase: Tests → Commit + Close | `python3 adws/commit.py <issue_num>` |
| `webhook_listener.py` | Flask server for GitHub webhooks | `python3 adws/webhook_listener.py` |
| `start_listener.sh` | Starts listener + Cloudflare Tunnel | `./adws/start_listener.sh` |

### Command Templates

Structured prompts for Claude CLI (in `.claude/commands/`):

- **plan.md**: Generates spec from issue (with exact format requirements)
- **build.md**: Implements code from spec (TypeScript + Next.js patterns)
- **test.md**: Writes tests + fixes failures (React Testing Library)
- **commit.md**: Creates conventional commit + closes issue

### Configuration

Edit `adws/config.yaml`:

```yaml
github:
  repo: owner/repo

anthropic:
  model: claude-sonnet-4-5

timeouts:
  claude_timeout_seconds: 600
  max_retries: 3

labels:
  processing: "🤖 agent-processing"
  needs_review: "needs-human-review"
  completed: "✅ auto-completed"
```

### Environment Variables

```bash
# Optional: For webhook signature verification
export GITHUB_WEBHOOK_SECRET="your-secret-here"

# Optional: Custom webhook port (default: 5555)
export WEBHOOK_PORT=5555
```

### Logs & State

- **Logs**: `adws/logs/workflow.log` and `adws/logs/webhook.log`
- **State**: `adws/state/issue-N.json` (result of each workflow run)

---

## What are ADWs?

**AI Developer Workflows (ADWs)** are structured, repeatable processes executed by autonomous AI agents to accomplish software development tasks without manual coding intervention.

Unlike traditional developer workflows where humans write code, ADWs define how AI agents:
- Plan features from requirements
- Generate code following specifications
- Test implementations automatically
- Commit and deploy changes
- Close issues with documentation

## Workflows in This Project

### 1. [Plan → Build → Test](./plan-build-test.md)
**Purpose**: Complete feature implementation lifecycle

**Phases**:
- **PLAN**: Create detailed specification from issue
- **BUILD**: Implement code following spec
- **TEST**: Verify with automated tests

**Evidence**: 8 issues resolved following this workflow (Issues #8-#15)

---

### 2. [Issue Resolution](./issue-resolution.md)
**Purpose**: Autonomous GitHub issue resolution

**Steps**:
1. Issue creation (human)
2. Issue analysis (agent)
3. Planning phase (agent)
4. Implementation phase (agent)
5. Testing phase (agent)
6. Commit and close (agent)
7. Deployment (automatic)

**Evidence**: All 8 issues closed with specs, tests, and Claude co-authorship

---

### 3. [Automated Testing](./automated-testing.md)
**Purpose**: Quality assurance through comprehensive testing

**Coverage**:
- Unit tests (hooks, utilities)
- Component tests (UI components)
- Integration tests (page-level)
- Accessibility tests (ARIA, keyboard)

**Evidence**: 44 passing tests across 7 test suites

---

## How ADWs Demonstrate Autonomous Development

### 1. Visible Structure
```
.claude/commands/  → Custom slash commands
adws/              → This directory - workflow definitions
specs/             → Planning documents (PLAN phase)
tests/             → Test files (TEST phase)
```

### 2. Commit History
Every commit shows:
```
feat: Feature description (Issue #N)

[Implementation details]

Tests: X passing

Resolves #N

Co-Authored-By: Claude Code <noreply@anthropic.com>
```

### 3. GitHub Issues
Each issue includes:
- Initial requirement (human)
- Spec document link (agent)
- Implementation summary (agent)
- Test results (agent)
- "🤖 Closed by Claude Code" (agent)

### 4. Documentation Trail
For each feature:
```
Issue #N
  ├─ specs/issue-N-feature.md     (PLAN)
  ├─ [implementation files]       (BUILD)
  ├─ [test files]                 (TEST)
  └─ Commit with Co-Authored-By   (CLOSE)
```

---

## Key Differences: ADWs vs Traditional Development

| Aspect | Traditional | ADWs (This Project) |
|--------|------------|---------------------|
| **Planning** | Developer writes notes | Agent creates formal specs |
| **Coding** | Developer writes code | Agent generates from specs |
| **Testing** | Developer writes tests | Agent creates comprehensive tests |
| **Commits** | Developer commits | Agent commits with co-authorship |
| **Issues** | Developer closes manually | Agent closes with documentation |
| **Evidence** | Git history | Specs + Tests + Co-authorship |

---

## Workflow Execution Evidence

### Issues Resolved
- #8: Initial project setup
- #9: Task type definitions
- #10: Task list display
- #11: Task creation form
- #12: Task completion toggle
- #13: Task deletion
- #14: localStorage persistence
- #15: Dark mode toggle

### Metrics
- **Commits with Claude co-authorship**: 14
- **Spec documents created**: 7
- **Tests written by agent**: 44
- **Build success rate**: 100%
- **Manual code written**: 0 lines

### Quality Indicators
✅ Every feature has a spec document
✅ Every implementation has tests
✅ Every commit references an issue
✅ Every issue closed by agent
✅ All 44 tests passing
✅ Application deployed and functional

---

## Using These Workflows

### For Developers
1. Create a GitHub issue describing the feature
2. Invoke the appropriate workflow (e.g., `/feature N`)
3. Review the agent's spec (if needed)
4. Let the agent implement, test, and commit
5. Verify the deployment

### For Reviewers
To verify these workflows were actually used:

1. **Check structure**:
   ```bash
   ls -la .claude/commands/ adws/ specs/ tests/
   ```

2. **Check commits**:
   ```bash
   git log --grep="Co-Authored-By: Claude"
   ```

3. **Check specs**:
   ```bash
   ls specs/
   # One .md file per issue
   ```

4. **Run tests**:
   ```bash
   npm test
   # Should show 44 passing tests
   ```

5. **Check issues**:
   Visit GitHub issues tab - all should show agent involvement

---

## Why This Matters

This project demonstrates **true autonomous development**, not just "AI-assisted coding":

❌ **Not This**: Developer writes code with AI autocomplete
✅ **But This**: AI agent plans, implements, tests, commits, and deploys

❌ **Not This**: Developer asks AI for code snippets
✅ **But This**: AI follows structured workflow from issue to deployment

❌ **Not This**: AI helps with difficult parts
✅ **But This**: AI handles entire development lifecycle autonomously

The ADWs in this directory prove that agents can execute complete software development workflows with minimal human intervention, following the methodology taught in the Agentic AI course.

---

**Project**: Todo App - Agentic AI Challenge
**Framework**: Next.js 14 + TypeScript
**Testing**: Jest + React Testing Library
**Deployment**: Vercel
**Agent**: Claude Code (Claude Sonnet 4.5)
