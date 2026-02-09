# Setup Guide: Executable Agentic Workflows

This guide will help you set up the executable workflow system on your machine.

## Prerequisites

- ✅ Python 3.8+ (`python3 --version`)
- ✅ Claude CLI installed (`which claude`)
- ✅ GitHub CLI authenticated (`gh auth status`)
- ✅ Node.js + npm (for running tests)

## Installation

### 1. Install Python Dependencies

```bash
pip3 install -r adws/requirements.txt
```

### 2. Install Cloudflare Tunnel (for webhooks)

**macOS:**
```bash
brew install cloudflare/cloudflare/cloudflared
```

**Linux:**
```bash
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

**Verify:**
```bash
cloudflared --version
```

### 3. Configure Environment Variables

**For webhook security (recommended):**

```bash
# Generate a random secret
export GITHUB_WEBHOOK_SECRET=$(openssl rand -hex 32)

# Save it for later (GitHub webhook config)
echo $GITHUB_WEBHOOK_SECRET
```

**Add to your shell profile (~/.zshrc or ~/.bashrc):**
```bash
export GITHUB_WEBHOOK_SECRET="your-secret-here"
```

### 4. Configure GitHub Webhook

**Start the listener first:**
```bash
./adws/start_listener.sh
```

**Copy the Cloudflare Tunnel URL** shown in the output (e.g., `https://random.trycloudflare.com`)

**Configure webhook in GitHub:**

1. Go to your repo: `https://github.com/YOUR_USERNAME/agentic_ai_challenge/settings/hooks`
2. Click "Add webhook"
3. Fill in:
   - **Payload URL**: `https://random.trycloudflare.com/webhook` (your tunnel URL + /webhook)
   - **Content type**: `application/json`
   - **Secret**: Your `GITHUB_WEBHOOK_SECRET` value
   - **Which events?**: Select "Let me select individual events" → Check ONLY "Issues"
   - **Active**: ✓

4. Click "Add webhook"

**Test it:**
```bash
# In GitHub, create a test issue
gh issue create --title "Test: Webhook system" --body "Testing automated workflow"

# Check logs
tail -f adws/logs/webhook.log
tail -f adws/logs/workflow.log
```

## Usage

### Manual Execution (No Webhook)

Run the orchestrator directly for any issue:

```bash
python3 adws/orchestrator.py <issue_number>
```

**Example:**
```bash
# Process issue #42
python3 adws/orchestrator.py 42
```

### Automated Execution (Webhook)

1. **Start the listener:**
   ```bash
   ./adws/start_listener.sh
   ```

2. **Create an issue in GitHub:**
   - Via UI: Go to Issues → New Issue
   - Via CLI: `gh issue create --title "Feature: ..." --body "..."`

3. **Watch it process automatically:**
   ```bash
   # In another terminal
   tail -f adws/logs/workflow.log
   ```

4. **Check the results:**
   - Spec file created: `specs/issue-N-*.md`
   - Code implemented
   - Tests passing
   - Issue closed automatically

### Individual Phases

You can also run phases independently:

```bash
# PLAN phase only
python3 adws/plan.py 42

# BUILD phase (requires spec path)
python3 adws/build.py 42 specs/issue-42-feature.md

# TEST phase
python3 adws/test.py 42 specs/issue-42-feature.md

# COMMIT phase
python3 adws/commit.py 42
```

## Monitoring

### Logs

```bash
# Webhook events
tail -f adws/logs/webhook.log

# Workflow execution
tail -f adws/logs/workflow.log

# Combined
tail -f adws/logs/*.log
```

### State Files

Check workflow state:

```bash
# View state for issue #42
cat adws/state/issue-42.json
```

State includes:
- Success/failure status
- Last completed phase
- Error messages (if any)
- Commit SHA
- Test attempts

### GitHub Labels

The orchestrator adds labels to issues:

- 🤖 **agent-processing**: Currently being processed
- ✅ **auto-completed**: Successfully completed
- **needs-human-review**: Failed, requires manual intervention

## Troubleshooting

### Webhook not receiving events

1. **Check tunnel is running:**
   ```bash
   curl http://localhost:5000/health
   # Should return: {"status":"ok"}
   ```

2. **Check GitHub webhook delivery:**
   - Go to Settings → Webhooks → Your webhook
   - Click "Recent Deliveries"
   - Check response status (should be 202)

3. **Check logs:**
   ```bash
   tail -f adws/logs/webhook.log
   ```

### Claude CLI timeout

If Claude takes too long, increase timeout in `adws/config.yaml`:

```yaml
timeouts:
  claude_timeout_seconds: 900  # 15 minutes
```

### Tests failing repeatedly

The TEST phase retries up to 3 times. If still failing:

1. Check test output: `adws/logs/workflow.log`
2. Run tests manually: `npm test`
3. Check spec accuracy: `specs/issue-N-*.md`

### Commit fails

Check git status:

```bash
git status
git log --oneline -5
```

Common causes:
- Merge conflicts
- Uncommitted changes from previous run
- Permission issues

## Configuration

Edit `adws/config.yaml` to customize:

```yaml
github:
  repo: YOUR_USERNAME/agentic_ai_challenge

anthropic:
  model: claude-sonnet-4-5  # or claude-opus-4-6

paths:
  specs: specs/
  commands: .claude/commands/

timeouts:
  claude_timeout_seconds: 600
  max_retries: 3

labels:
  processing: "🤖 agent-processing"
  needs_review: "needs-human-review"
  completed: "✅ auto-completed"
```

## Security Notes

1. **Webhook Secret**: Always use `GITHUB_WEBHOOK_SECRET` to verify webhook authenticity
2. **Cloudflare Tunnel**: The free tunnel (`*.trycloudflare.com`) is public but temporary
3. **Local Only**: This system runs on your machine, not in the cloud
4. **Git Hooks**: Never skip git hooks (no `--no-verify`)
5. **Branch Protection**: Consider protecting `main` branch in production

## Performance

Expected execution times:
- PLAN phase: 30-60s
- BUILD phase: 60-120s
- TEST phase: 60-180s (with retries)
- COMMIT phase: 10-20s

**Total**: ~3-6 minutes per issue

## Next Steps

1. ✅ Test with a simple issue first
2. ✅ Verify spec generation quality
3. ✅ Check test coverage
4. ✅ Monitor commit messages format
5. ✅ Scale to more complex issues

---

For more details, see:
- [ADWs README](./README.md)
- [Plan-Build-Test Workflow](./plan-build-test.md)
- [Command Templates](../.claude/commands/)
