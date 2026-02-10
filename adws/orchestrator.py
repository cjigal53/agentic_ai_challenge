#!/usr/bin/env python3
"""Main orchestrator: Entry point for webhook and manual execution."""
import argparse
import logging
import sys
from pathlib import Path

from utils.config import load_config
from utils.github import get_issue, add_label, remove_label, add_comment, GitHubError
from full_cycle import run_full_cycle, save_state

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(Path(__file__).parent / "logs" / "workflow.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


def is_issue_processable(issue: dict) -> tuple[bool, str]:
    """Check if issue can be processed by the agent.

    Args:
        issue: GitHub issue dict

    Returns:
        Tuple of (processable: bool, reason: str)
    """
    # Check if issue is open
    if issue["state"].lower() != "open":
        return False, "Issue is not open"

    # Check if already being processed
    labels = [label["name"] for label in issue.get("labels", [])]
    config = load_config()

    if config["labels"]["processing"] in labels:
        return False, "Issue is already being processed"

    if config["labels"]["completed"] in labels:
        return False, "Issue was already completed"

    # Check if issue has enough information
    if not issue.get("body") or len(issue["body"].strip()) < 10:
        return False, "Issue body is too short or empty"

    return True, "OK"


def orchestrate(issue_number: int) -> int:
    """Orchestrate full workflow for an issue.

    Args:
        issue_number: GitHub issue number

    Returns:
        Exit code (0 = success, 1 = failure)
    """
    config = load_config()

    logger.info(f"{'=' * 60}")
    logger.info(f"ORCHESTRATOR: Issue #{issue_number}")
    logger.info(f"{'=' * 60}")

    try:
        # 1. Fetch and validate issue
        logger.info("Fetching issue from GitHub...")
        issue = get_issue(issue_number)

        logger.info(f"Issue: {issue['title']}")
        logger.info(f"State: {issue['state']}")
        logger.info(f"Labels: {[l['name'] for l in issue.get('labels', [])]}")

        # 2. Check if processable
        processable, reason = is_issue_processable(issue)

        if not processable:
            logger.warning(f"Issue not processable: {reason}")
            print(f"⚠️  Issue not processable: {reason}")
            return 0  # Not an error, just skip

        # 3. Add processing label and initial comment
        logger.info("Adding processing label...")
        try:
            add_label(issue_number, config["labels"]["processing"])
        except GitHubError as e:
            logger.warning(f"Failed to add label (non-critical): {e}")

        # Always add initial comment (even if label fails)
        try:
            add_comment(
                issue_number,
                "🤖 **Agentic AI Workflow Started**\n\n"
                "An autonomous agent is now processing this issue end-to-end.\n\n"
                "**Planned phases:**\n"
                "1. 📝 PLAN - Generate specification\n"
                "2. 🔨 BUILD - Implement code\n"
                "3. ✅ TEST - Write and run tests\n"
                "4. 🚀 COMMIT - Commit and close issue\n\n"
                "_This issue will be resolved automatically without human intervention._"
            )
        except GitHubError as e:
            logger.warning(f"Failed to add comment (non-critical): {e}")

        # 4. Run full cycle
        logger.info("Starting full cycle...")
        result = run_full_cycle(issue_number)

        # 5. Save state
        save_state(issue_number, result)

        # 6. Update labels based on result
        try:
            remove_label(issue_number, config["labels"]["processing"])

            if result["success"]:
                add_label(issue_number, config["labels"]["completed"])
                logger.info("Added completion label")
            else:
                add_label(issue_number, config["labels"]["needs_review"])
                add_comment(
                    issue_number,
                    f"❌ **Workflow failed at {result['phase']} phase**\n\n"
                    f"Error: {result['error']}\n\n"
                    f"Please review and fix manually."
                )
                logger.error("Added needs-review label")

        except GitHubError as e:
            logger.warning(f"Failed to update labels (non-critical): {e}")

        # 7. Return appropriate exit code
        if result["success"]:
            logger.info(f"{'=' * 60}")
            logger.info(f"✅ ORCHESTRATION COMPLETE")
            logger.info(f"{'=' * 60}")
            return 0
        else:
            logger.error(f"{'=' * 60}")
            logger.error(f"❌ ORCHESTRATION FAILED")
            logger.error(f"{'=' * 60}")
            return 1

    except Exception as e:
        logger.error(f"Orchestrator error: {e}", exc_info=True)

        # Try to add error label/comment
        try:
            add_label(issue_number, config["labels"]["needs_review"])
            add_comment(
                issue_number,
                f"❌ **Orchestrator error**\n\n```\n{str(e)}\n```\n\nPlease review manually."
            )
        except:
            pass

        return 1


def main():
    """CLI entry point."""
    parser = argparse.ArgumentParser(
        description="Orchestrate agentic workflow for GitHub issue"
    )
    parser.add_argument("issue_number", type=int, help="GitHub issue number")
    args = parser.parse_args()

    exit_code = orchestrate(args.issue_number)
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
