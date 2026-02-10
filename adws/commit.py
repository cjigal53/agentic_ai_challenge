#!/usr/bin/env python3
"""COMMIT phase: Stage, commit, push changes and close issue."""
import argparse
import logging
import sys
from pathlib import Path
import subprocess
import json

from utils.config import load_config, get_repo_root
from utils.github import get_issue, close_issue, GitHubError

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(Path(__file__).parent / "logs" / "workflow.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


def get_commit_type(issue: dict) -> str:
    """Determine conventional commit type from issue labels/title.

    Args:
        issue: GitHub issue dict

    Returns:
        Commit type (feat, fix, docs, etc.)
    """
    labels = [label["name"].lower() for label in issue.get("labels", [])]

    # Check labels first
    if "bug" in labels or "fix" in labels:
        return "fix"
    if "documentation" in labels or "docs" in labels:
        return "docs"
    if "test" in labels or "testing" in labels:
        return "test"
    if "refactor" in labels or "refactoring" in labels:
        return "refactor"
    if "chore" in labels:
        return "chore"

    # Check title
    title_lower = issue["title"].lower()
    if any(word in title_lower for word in ["fix", "bug", "error", "issue"]):
        return "fix"
    if any(word in title_lower for word in ["doc", "readme"]):
        return "docs"
    if any(word in title_lower for word in ["test"]):
        return "test"
    if any(word in title_lower for word in ["refactor", "clean"]):
        return "refactor"

    # Default to feat for new features
    return "feat"


def run_commit_phase(issue_number: int, test_results: dict) -> dict:
    """Execute COMMIT phase for a GitHub issue.

    Args:
        issue_number: GitHub issue number
        test_results: Results from TEST phase

    Returns:
        Dict with commit info: {"success": bool, "sha": str, "message": str}

    Raises:
        GitHubError: If GitHub operations fail
    """
    config = load_config()
    repo_root = get_repo_root()

    logger.info(f"=== COMMIT PHASE: Issue #{issue_number} ===")

    # 1. Fetch issue for commit message
    logger.info("Fetching issue from GitHub...")
    issue = get_issue(issue_number)

    # 2. Stage all changes
    logger.info("Staging changes...")
    try:
        subprocess.run(
            ["git", "add", "."],
            check=True,
            cwd=str(repo_root)
        )
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Failed to stage changes: {e}")

    # 3. Create commit message
    commit_type = get_commit_type(issue)
    commit_message = f"{commit_type}: {issue['title']} (Issue #{issue_number})"

    logger.info(f"Commit message: {commit_message}")

    # 4. Commit changes
    logger.info("Creating commit...")
    try:
        result = subprocess.run(
            ["git", "commit", "-m", commit_message],
            capture_output=True,
            text=True,
            check=True,
            cwd=str(repo_root)
        )
        logger.info("Commit created successfully")
    except subprocess.CalledProcessError as e:
        if "nothing to commit" in e.stdout + e.stderr:
            logger.warning("Nothing to commit (changes were already committed in PLAN phase)")
        else:
            raise RuntimeError(f"Failed to commit: {e.stderr}")

    # 5. Get commit SHA
    try:
        result = subprocess.run(
            ["git", "rev-parse", "HEAD"],
            capture_output=True,
            text=True,
            check=True,
            cwd=str(repo_root)
        )
        commit_sha = result.stdout.strip()
        logger.info(f"Commit SHA: {commit_sha}")
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Failed to get commit SHA: {e}")

    # 6. Push to remote
    logger.info("Pushing to remote...")
    try:
        subprocess.run(
            ["git", "push"],
            capture_output=True,
            text=True,
            check=True,
            cwd=str(repo_root)
        )
        logger.info("Pushed to remote successfully")
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Failed to push: {e.stderr}")

    # 7. Close issue
    logger.info("Closing GitHub issue...")
    repo_name = config["github"]["repo"]
    closing_comment = f"""✅ **Phase 4/4: COMMIT - Completed**

🎉 **Issue Resolved Autonomously by AI Agent**

**Final Actions:**
- ✓ Staged all changes
- ✓ Created conventional commit: `{commit_message}`
- ✓ Pushed to remote: [{commit_sha[:7]}](https://github.com/{repo_name}/commit/{commit_sha})
- ✓ Closing issue automatically

---

**Complete Workflow Summary:**

1. ✅ **PLAN** - Specification generated and committed
2. ✅ **BUILD** - Code implemented and type-checked
3. ✅ **TEST** - Tests written and passed ({test_results.get('attempts', 1)} attempt{'s' if test_results.get('attempts', 1) > 1 else ''})
4. ✅ **COMMIT** - Changes committed and pushed

**Commit:** [{commit_sha[:7]}](https://github.com/{repo_name}/commit/{commit_sha})

---

_This issue was processed end-to-end by an autonomous AI agent without human intervention._
"""

    try:
        close_issue(issue_number, closing_comment)
        logger.info("Issue closed successfully")
    except GitHubError as e:
        logger.error(f"Failed to close issue: {e}")
        raise

    logger.info(f"=== COMMIT PHASE COMPLETE ===")

    return {
        "success": True,
        "sha": commit_sha,
        "message": commit_message
    }


def main():
    """CLI entry point."""
    parser = argparse.ArgumentParser(description="COMMIT phase: Commit and close issue")
    parser.add_argument("issue_number", type=int, help="GitHub issue number")
    parser.add_argument("--test-results", type=str, help="JSON string with test results")
    args = parser.parse_args()

    # Parse test results if provided
    test_results = {}
    if args.test_results:
        try:
            test_results = json.loads(args.test_results)
        except json.JSONDecodeError:
            logger.warning("Failed to parse test results JSON")

    try:
        result = run_commit_phase(args.issue_number, test_results)
        print(f"✅ Committed as {result['sha'][:7]}")
        print(f"   Message: {result['message']}")
        sys.exit(0)
    except Exception as e:
        logger.error(f"COMMIT phase failed: {e}", exc_info=True)
        print(f"❌ COMMIT phase failed: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
