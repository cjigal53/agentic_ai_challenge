# Master Claude Code
## The Complete Guide for Everyone

**Version 1.0, January 2026** — *by Aakash Gupta*

---

## 1: Why Claude Code Changes Everything

### From Assistant to Operating System

Claude Code transforms AI from a chat tool you visit into an operating system layer that runs across your entire workflow. **The difference? Instead of asking someone for help and having a capable teammate who can actually execute.**

**Before (Chat window):**
- ❌ Chat window
- ❌ Upload limits
- ❌ Sessions expire
- ❌ You do everything

**After (Claude Code):**
→ Full system access
→ All files, any size
→ Hours-long tasks
→ AI teammates

**Links:**
- [How to Use Claude for Work](https://example.com)
- [Guide to Claude Cowork](https://example.com)

---

## 2: What Claude Code Can Do

### Full File System Access

Read, write, create, organize any file on your computer. No upload limits, no restrictions. Import: "Non-codeers can ring bash commands via hours of manual 'uploads'."

### MCP Connections (200+ Tools)

Connect to GitHub, Notion, Slack, Jira, databases, APIs—Claude works inside your existing stack. Like "having an intern with access to the tool ecosystem"

**Links:**
- [Basic Guide](https://example.com)
- [Advanced Guide](https://example.com)

### Tool & Command Execution

Run shell commands, execute scripts, manage Git, install packages—all through natural language. Impact: "Non-coders running bash commands without learning syntax."

### Autonomous Multi-Agent Work

Subprocess work in parallel, checkpoints let you rewind, background tasks run while you work. Impact: "Delegate like you have 5 junior employees"

---

## 3: The Claude Code Workflow

### Analyze & Research
- Synthesize customer feedback
- Competitive analysis
- Extract insights from documents
- Read old summarize files

### Plan & Decide
- Draft PRDs from notes
- Create roadmap
- Priorities
- Generate strategy options
- Build decision frameworks

### Create & Execute
- Generate presentations
- Write code/prototypes
- Create reports and docs
- Build dashboards

### Scale & Repeat
- Set up recurring workflows
- Connect tools via MCP
- Create reusable skills
- Schedule and batch tasks

**For Product Managers:**
PRD from meeting transcript → Jira tickets auto-created → Slack summary posted → Dashboard updated

**Links:**
- [AI PRD Guide](https://example.com)
- [AI Roadmap Guide](https://example.com)

---

## 4: Getting Started

### Recommended Setup Path:

**Best Experience: Use with Cursor**
1. Download Cursor (cursor.com)
2. Open your project folder in Cursor
3. Open terminal inside Cursor (View → Terminal)
4. Type `claude` and press Enter
5. Authenticate via browser popup

### Requirements Checklist:
- macOS 13+, Ubuntu 20+, or Windows 10+ (WSL/Git Bash)
- Claude Pro ($20/mo), Max ($100-200/mo), or API credits

### Alternative: Direct Terminal

**Mac/Linux:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows (PowerShell):**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Then navigate to your folder:**
```bash
cd ~/your-project-folder
```

**Links:**
- [How to Use Claude Code Like a Pro](https://example.com)
- [Official Setup Docs](https://example.com)

---

## 5: Connect Everything (MCP)

### What is MCP?

**Model Context Protocol**—an open standard that connects Claude to your tools. Think of it as USB-C for AI: one protocol, hundreds of connections.

### Developer Tools
- 🔗 GitHub
- 🏗️ SENTRY
- 📈 Linear
- 🦊 GitLab

### Productivity
- 📝 Notion
- 💬 Slack
- 📧 Get Product Discovery
- 🗂️ Filesystem

### Data & Research
- 🐘 ClickHouse
- 🐘 PostgreSQL
- 🦁 brave

### Communication
- ✉️ Gmail
- ✍️ Typefully
- 📝 Buffer
- 💬 discord

### Quick Add Command:
```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

**Links:**
- [PM Operating System](https://example.com)
- [Anthropic MCP Servers](https://example.com)
- [MCPso Collection](https://example.com)

---

## 6: Essential Commands

### Why Commands?

Commands give you precise control. Instead of typing long instructions, one command triggers everything.

### Slash Commands (type `/` in Claude Code)

| Command | What It Does |
|---------|-------------|
| `/help` | Show all available commands |
| `/clear` | Reset context (use between tasks!) |
| `/compact` | Compress conversation to save tokens |
| `/model` | Switch between Opus/Sonnet/Haiku |
| `/mcp` | Check MCP server connections |
| `/doctor` | Diagnose installation issues |
| `/config` | Open settings |

### File References (type `@` to reference)

| Syntax | Example |
|--------|---------|
| `@filename` | `@report.csv` |
| `@folder/` | `@data/` |
| `file.log` | Autocomplete paths |

### Keyboard Shortcuts

| Action | Keys |
|--------|------|
| Cancel/Stop | Esc |
| Rewind checkpoint | Esc twice |
| Paste image | Ctrl+V (not Cmd+V on Mac) |
| Run shell directly | Start with ! |

**Links:**
- [Prompt Engineering Guide](https://example.com)
- [Anthropic Best Practices](https://example.com)

---

## 7: Skills & CLAUDE.md

### Claude Skills (Reusable Automations)

Task-specific instruction packages that Claude auto-loads based on context.

### Folder Structure:
```
~/.claude/skills/
├── custom-skill/
│   ├── SKILL.md
│   └── prd-generator/
│       └── SKILL.md
└── data-cleaner/
    └── SKILL.md
```

### Built-in Skills:
- **docx** — Word documents
- **xlsx** — Spreadsheets
- **pptx** — Presentations
- **pdf** — PDF processing

**Links:**
- [Claude Skills Tutorial](https://example.com)
- [Steal 6 of My Claude Skills](https://example.com)
- [Context Engineering](https://example.com)

### CLAUDE.md (Project Memory)

A markdown file that gives permanent context about your project.

**Example CLAUDE.md:**
```markdown
# Project: Analytics Dashboard
- npm run build
- npm start
- npm test
- Use TypeScript
- Follow existing patterns
- API: https://api.example.com
- Main data source: /data/analytics.csv
- Deploy: npm run vercel
```

**Where to place:**
- **Global:** ~/.claude/CLAUDE.md
- **Project:** ./.claude/CLAUDE.md

---

## 8: Prompting Techniques

| Technique | When to Use |
|-----------|-------------|
| **Be Specific** | Always. "Clean this CSV" → "Remove rows where column B is empty. Group all email" |
| **Give Examples** | When output format matters. Show 1-2 examples of what you want. |
| **Chain Steps** | Complex tasks. "First analyze, then summarize, then create action items" |
| **Self Correct** | Quality matters. "Double-check your answer and fix any mistakes" |
| **Assign Roles** | Expertise needed. "Act as a data analyst reviewing this dataset" |
| **Use Actual Data** | Between unrelated tasks to reset context |

**Links:**
- [Prompt Engineering](https://example.com)
- [ChatGPT for PMs (techniques apply)](https://example.com)

### Pro Pattern: Checkpoint + Iterate

1. Ask Claude to make a plan first
2. Review the plan before execution
3. Let it create checkpoints
4. Rewind (Esc twice) if something goes wrong
5. Iterate with specific feedback

---

## 9: Resources & Further Learning

### Official Docs:

- **Setup Guide:** [code.claude.com/docs/en/setup](https://code.claude.com/docs/en/setup)
- **MCP Reference:** [code.claude.com/docs/en/mcp](https://code.claude.com/docs/en/mcp)
- **Best Practices:** [anthropic.com/news/claude-code-best-practices](https://anthropic.com/news/claude-code-best-practices)

### From Product Growth:

- **Claude Code Guide:** [How to Use Claude Code Like a Pro](https://example.com)
- **Skills Deep Dive:** [Claude Skills Tutorial](https://example.com)
- **Downloadable Toolkit:** [Steal 6 of My Claude Skills](https://example.com)
- **AI Agents Guide:** [AI Agents for PMs](https://example.com)
- **Prompting Guide:** [Prompt Engineering](https://example.com)

### Pricing Quick Reference:

| Plan | Monthly | Best For |
|------|---------|----------|
| Pro | $20 | Light usage, short tasks |
| Max | $100 | Daily users, larger projects |
| Max 20x | $200 | Power users, heavy automation |
| API | Pay-per-use | CI/CD, enterprise pipelines |

---

**For more details, visit [news.aakashg.com](https://news.aakashg.com) 🚀**

Check out 'Product Growth' on Apple, Spotify, YouTube | Join 200,000+ subscribers

*— Aakash Gupta*
