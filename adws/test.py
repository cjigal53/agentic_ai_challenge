#!/usr/bin/env python3
"""TEST phase: Write and run tests for implemented code."""
import argparse
import logging
import sys
from pathlib import Path
import subprocess

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


def run_tests(repo_root: Path) -> tuple[bool, str]:
    """Run npm test and return result.

    Args:
        repo_root: Repository root path

    Returns:
        Tuple of (success: bool, output: str)
    """
    logger.info("Running npm test...")
    try:
        result = subprocess.run(
            ["npm", "test", "--", "--passWithNoTests"],
            capture_output=True,
            text=True,
            cwd=str(repo_root),
            timeout=300  # 5 minutes
        )

        success = result.returncode == 0
        output = result.stdout + result.stderr

        if success:
            logger.info("Tests passed ✅")
        else:
            logger.error("Tests failed ❌")

        return success, output

    except subprocess.TimeoutExpired:
        logger.error("Tests timed out")
        return False, "Tests timed out after 5 minutes"
    except FileNotFoundError:
        logger.error("npm not found")
        return False, "npm not found"


def run_test_phase(issue_number: int, spec_path: Path) -> dict:
    """Execute TEST phase for a GitHub issue.

    Args:
        issue_number: GitHub issue number
        spec_path: Path to specification file

    Returns:
        Dict with test results: {"success": bool, "output": str, "attempts": int}

    Raises:
        GitHubError: If GitHub operations fail
        ClaudeError: If Claude invocation fails
        PromptError: If prompt template issues
    """
    config = load_config()
    repo_root = get_repo_root()
    max_retries = config["timeouts"]["max_retries"]

    logger.info(f"=== TEST PHASE: Issue #{issue_number} ===")

    # 1. Read spec file
    if not spec_path.exists():
        raise FileNotFoundError(f"Spec file not found: {spec_path}")

    logger.info(f"Reading spec from: {spec_path}")
    spec_content = spec_path.read_text()

    # 2. Run tests (attempt 1)
    success, output = run_tests(repo_root)

    if success:
        logger.info("Tests passed on first attempt ✅")
        return {"success": True, "output": output, "attempts": 1}

    # 3. Tests failed - ask Claude to fix (with retries)
    for attempt in range(2, max_retries + 2):  # Attempts 2, 3, 4
        logger.warning(f"Tests failed. Attempt {attempt}/{max_retries + 1}")
        logger.info("Invoking Claude to fix tests...")

        # Render prompt with test failure info
        prompt = render_prompt("test", {
            "ISSUE_NUMBER": issue_number,
            "SPEC_PATH": str(spec_path),
            "SPEC_CONTENT": spec_content,
            "TEST_OUTPUT": output,
            "ATTEMPT": attempt
        })

        try:
            # Ask Claude to fix the tests or implementation
            response = invoke_claude_with_retry(prompt)
            logger.info("Claude attempted to fix issues")
            logger.debug(f"Response: {response[:200]}...")
        except ClaudeError as e:
            logger.error(f"Claude invocation failed: {e}")
            # Continue to run tests anyway - maybe partial fix worked
            pass

        # Run tests again
        success, output = run_tests(repo_root)

        if success:
            logger.info(f"Tests passed after {attempt} attempts ✅")
            return {"success": True, "output": output, "attempts": attempt}

    # All attempts failed
    logger.error(f"Tests failed after {max_retries + 1} attempts")
    return {"success": False, "output": output, "attempts": max_retries + 1}


def main():
    """CLI entry point."""
    parser = argparse.ArgumentParser(description="TEST phase: Write and run tests")
    parser.add_argument("issue_number", type=int, help="GitHub issue number")
    parser.add_argument("spec_path", type=Path, help="Path to spec file")
    args = parser.parse_args()

    try:
        result = run_test_phase(args.issue_number, args.spec_path)

        if result["success"]:
            print(f"✅ Tests passed after {result['attempts']} attempt(s)")

            # Add comment to GitHub issue
            try:
                add_comment(
                    args.issue_number,
                    f"✅ **Phase 3/4: TEST - Completed**\n\n"
                    f"**Agent Actions:**\n"
                    f"- ✓ Analyzed acceptance criteria\n"
                    f"- ✓ {'Wrote tests for new code' if result['attempts'] == 1 else 'Wrote tests and fixed issues'}\n"
                    f"- ✓ Executed test suite\n"
                    f"- ✓ All tests passed ({result['attempts']} attempt{'s' if result['attempts'] > 1 else ''})\n\n"
                    f"**Next:** Phase 4/4 - COMMIT (commit and close issue)\n\n"
                    f"_Agent is continuing autonomously..._"
                )
            except GitHubError as e:
                logger.warning(f"Failed to add comment (non-critical): {e}")

            sys.exit(0)
        else:
            print(f"❌ Tests failed after {result['attempts']} attempts", file=sys.stderr)
            print(f"Test output:\n{result['output']}", file=sys.stderr)

            # Add comment to GitHub issue
            try:
                add_comment(
                    args.issue_number,
                    f"❌ **TEST phase failed**\n\nTests failed after {result['attempts']} attempts.\n\nPlease review manually."
                )
            except GitHubError as e:
                logger.warning(f"Failed to add comment (non-critical): {e}")

            sys.exit(1)

    except Exception as e:
        logger.error(f"TEST phase failed: {e}", exc_info=True)
        print(f"❌ TEST phase failed: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
