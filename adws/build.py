#!/usr/bin/env python3
"""BUILD phase: Implement code from specification."""
import argparse
import logging
import sys
from pathlib import Path

from utils.config import load_config, get_repo_root
from utils.github import add_comment, GitHubError
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


def run_build_phase(issue_number: int, spec_path: Path) -> None:
    """Execute BUILD phase for a GitHub issue.

    Args:
        issue_number: GitHub issue number
        spec_path: Path to specification file

    Raises:
        GitHubError: If GitHub operations fail
        ClaudeError: If Claude invocation fails
        PromptError: If prompt template issues
    """
    config = load_config()
    repo_root = get_repo_root()

    logger.info(f"=== BUILD PHASE: Issue #{issue_number} ===")

    # 1. Read spec file
    if not spec_path.exists():
        raise FileNotFoundError(f"Spec file not found: {spec_path}")

    logger.info(f"Reading spec from: {spec_path}")
    spec_content = spec_path.read_text()

    # 2. Render prompt template
    logger.info("Rendering BUILD prompt template...")
    prompt = render_prompt("build", {
        "ISSUE_NUMBER": issue_number,
        "SPEC_PATH": str(spec_path),
        "SPEC_CONTENT": spec_content
    })

    # 3. Invoke Claude to implement code
    logger.info("Invoking Claude to implement code...")
    try:
        # Claude will create/modify files directly
        # The response will contain a summary of changes
        response = invoke_claude_with_retry(prompt)
        logger.info("Build completed")
        logger.debug(f"Response: {response[:200]}...")
    except ClaudeError as e:
        logger.error(f"Claude invocation failed: {e}")
        raise

    # 4. Verify compilation (for TypeScript/Next.js)
    logger.info("Verifying TypeScript compilation...")
    import subprocess
    try:
        result = subprocess.run(
            ["npm", "run", "type-check"],
            capture_output=True,
            text=True,
            cwd=str(repo_root),
            timeout=120
        )
        if result.returncode != 0:
            logger.error(f"Type check failed:\n{result.stderr}")
            raise RuntimeError("TypeScript compilation failed")
        logger.info("Type check passed ✅")
    except subprocess.TimeoutExpired:
        logger.error("Type check timed out")
        raise RuntimeError("Type check timed out")
    except FileNotFoundError:
        logger.warning("npm not found, skipping type check")

    # 5. Add comment to GitHub issue
    logger.info("Adding comment to GitHub issue...")
    try:
        add_comment(
            issue_number,
            f"✅ **BUILD phase completed**\n\nCode implemented according to spec.\n\nNext: TEST phase"
        )
    except GitHubError as e:
        logger.warning(f"Failed to add comment (non-critical): {e}")

    logger.info(f"=== BUILD PHASE COMPLETE ===")


def main():
    """CLI entry point."""
    parser = argparse.ArgumentParser(description="BUILD phase: Implement code from spec")
    parser.add_argument("issue_number", type=int, help="GitHub issue number")
    parser.add_argument("spec_path", type=Path, help="Path to spec file")
    args = parser.parse_args()

    try:
        run_build_phase(args.issue_number, args.spec_path)
        print(f"✅ BUILD phase complete")
        sys.exit(0)
    except Exception as e:
        logger.error(f"BUILD phase failed: {e}", exc_info=True)
        print(f"❌ BUILD phase failed: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
