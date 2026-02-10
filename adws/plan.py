#!/usr/bin/env python3
"""PLAN phase: Generate specification from GitHub issue."""
import argparse
import logging
import sys
from pathlib import Path
import re

from utils.config import load_config, get_repo_root
from utils.github import get_issue, add_comment, GitHubError
from utils.claude import invoke_claude_with_retry, ClaudeError
from utils.prompts import render_prompt, PromptError

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(Path(__file__).parent / "logs" / "workflow.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug.

    Args:
        text: Text to slugify

    Returns:
        Slugified text (lowercase, hyphens, alphanumeric)
    """
    # Remove non-alphanumeric chars (except spaces and hyphens)
    text = re.sub(r'[^\w\s-]', '', text.lower())
    # Replace whitespace with hyphens
    text = re.sub(r'[-\s]+', '-', text)
    # Remove leading/trailing hyphens
    return text.strip('-')


def generate_spec_filename(issue_number: int, title: str) -> str:
    """Generate spec filename from issue number and title.

    Args:
        issue_number: Issue number
        title: Issue title

    Returns:
        Filename like "issue-42-add-dark-mode.md"
    """
    slug = slugify(title)
    # Limit slug length to avoid overly long filenames
    slug = slug[:50]
    return f"issue-{issue_number}-{slug}.md"


def run_plan_phase(issue_number: int) -> Path:
    """Execute PLAN phase for a GitHub issue.

    Args:
        issue_number: GitHub issue number

    Returns:
        Path to generated spec file

    Raises:
        GitHubError: If GitHub operations fail
        ClaudeError: If Claude invocation fails
        PromptError: If prompt template issues
    """
    config = load_config()
    repo_root = get_repo_root()

    logger.info(f"=== PLAN PHASE: Issue #{issue_number} ===")

    # 1. Fetch issue from GitHub
    logger.info("Fetching issue from GitHub...")
    issue = get_issue(issue_number)

    logger.info(f"Issue title: {issue['title']}")
    logger.info(f"Issue body preview: {issue['body'][:100]}...")

    # 2. Render prompt template
    logger.info("Rendering PLAN prompt template...")
    prompt = render_prompt("plan", {
        "ISSUE_NUMBER": issue_number,
        "ISSUE_TITLE": issue['title'],
        "ISSUE_BODY": issue['body']
    })

    # 3. Invoke Claude to generate spec
    logger.info("Invoking Claude to generate specification...")
    try:
        spec_content = invoke_claude_with_retry(prompt)
    except ClaudeError as e:
        logger.error(f"Claude invocation failed: {e}")
        raise

    # 4. Write spec to file
    spec_filename = generate_spec_filename(issue_number, issue['title'])
    spec_path = repo_root / config["paths"]["specs"] / spec_filename

    logger.info(f"Writing spec to: {spec_path}")
    spec_path.write_text(spec_content)

    # 5. Commit the spec
    logger.info("Committing spec file...")
    import subprocess
    try:
        subprocess.run(
            ["git", "add", str(spec_path)],
            check=True,
            cwd=str(repo_root)
        )
        subprocess.run(
            ["git", "commit", "-m", f"docs: Add spec for issue #{issue_number} (PLAN)"],
            check=True,
            cwd=str(repo_root)
        )
        logger.info("Spec committed successfully")
    except subprocess.CalledProcessError as e:
        logger.error(f"Git commit failed: {e}")
        raise

    # 6. Add comment to GitHub issue
    logger.info("Adding comment to GitHub issue...")
    try:
        add_comment(
            issue_number,
            f"✅ **Phase 1/4: PLAN - Completed**\n\n"
            f"**Agent Actions:**\n"
            f"- ✓ Analyzed issue requirements\n"
            f"- ✓ Generated specification document\n"
            f"- ✓ Committed spec: `{spec_filename}`\n\n"
            f"**Next:** Phase 2/4 - BUILD (implement code)\n\n"
            f"_Agent is continuing autonomously..._"
        )
    except GitHubError as e:
        logger.warning(f"Failed to add comment (non-critical): {e}")

    logger.info(f"=== PLAN PHASE COMPLETE: {spec_path} ===")
    return spec_path


def main():
    """CLI entry point."""
    parser = argparse.ArgumentParser(description="PLAN phase: Generate spec from issue")
    parser.add_argument("issue_number", type=int, help="GitHub issue number")
    args = parser.parse_args()

    try:
        spec_path = run_plan_phase(args.issue_number)
        print(f"✅ Spec generated: {spec_path}")
        sys.exit(0)
    except Exception as e:
        logger.error(f"PLAN phase failed: {e}", exc_info=True)
        print(f"❌ PLAN phase failed: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
