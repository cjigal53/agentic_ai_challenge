#!/usr/bin/env python3
"""Full cycle orchestrator: PLAN → BUILD → TEST → COMMIT."""
import argparse
import logging
import sys
from pathlib import Path
import json

from utils.config import get_repo_root
from plan import run_plan_phase
from build import run_build_phase
from test import run_test_phase
from commit import run_commit_phase

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(Path(__file__).parent / "logs" / "workflow.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


def run_full_cycle(issue_number: int) -> dict:
    """Execute full workflow cycle for a GitHub issue.

    Args:
        issue_number: GitHub issue number

    Returns:
        Dict with results: {
            "success": bool,
            "phase": str,  # Last completed phase
            "error": str,  # Error message if failed
            "spec_path": str,
            "commit_sha": str,
            "test_attempts": int
        }
    """
    result = {
        "success": False,
        "phase": None,
        "error": None,
        "spec_path": None,
        "commit_sha": None,
        "test_attempts": 0
    }

    try:
        # Phase 1: PLAN
        logger.info(f"Starting full cycle for issue #{issue_number}")
        logger.info("=" * 60)

        logger.info("Phase 1/4: PLAN")
        spec_path = run_plan_phase(issue_number)
        result["phase"] = "PLAN"
        result["spec_path"] = str(spec_path)
        logger.info(f"PLAN complete: {spec_path}")

        # Phase 2: BUILD
        logger.info("=" * 60)
        logger.info("Phase 2/4: BUILD")
        run_build_phase(issue_number, spec_path)
        result["phase"] = "BUILD"
        logger.info("BUILD complete")

        # Phase 3: TEST
        logger.info("=" * 60)
        logger.info("Phase 3/4: TEST")
        test_results = run_test_phase(issue_number, spec_path)
        result["phase"] = "TEST"
        result["test_attempts"] = test_results["attempts"]

        if not test_results["success"]:
            result["error"] = f"Tests failed after {test_results['attempts']} attempts"
            logger.error(result["error"])
            return result

        logger.info("TEST complete")

        # Phase 4: COMMIT
        logger.info("=" * 60)
        logger.info("Phase 4/4: COMMIT")
        commit_result = run_commit_phase(issue_number, test_results)
        result["phase"] = "COMMIT"
        result["commit_sha"] = commit_result["sha"]
        logger.info("COMMIT complete")

        # Success!
        result["success"] = True
        logger.info("=" * 60)
        logger.info(f"✅ Full cycle complete for issue #{issue_number}")
        logger.info(f"   Commit: {result['commit_sha'][:7]}")
        logger.info(f"   Tests: {result['test_attempts']} attempt(s)")

        return result

    except Exception as e:
        result["error"] = str(e)
        logger.error(f"Full cycle failed at {result['phase']} phase: {e}", exc_info=True)
        return result


def save_state(issue_number: int, result: dict) -> None:
    """Save workflow state to file.

    Args:
        issue_number: GitHub issue number
        result: Result dict from run_full_cycle
    """
    state_dir = Path(__file__).parent / "state"
    state_dir.mkdir(exist_ok=True)

    state_file = state_dir / f"issue-{issue_number}.json"

    with open(state_file, "w") as f:
        json.dump(result, f, indent=2)

    logger.info(f"State saved to: {state_file}")


def main():
    """CLI entry point."""
    parser = argparse.ArgumentParser(description="Execute full workflow cycle")
    parser.add_argument("issue_number", type=int, help="GitHub issue number")
    parser.add_argument("--save-state", action="store_true", help="Save state to file")
    args = parser.parse_args()

    result = run_full_cycle(args.issue_number)

    if args.save_state:
        save_state(args.issue_number, result)

    if result["success"]:
        print(f"\n✅ Full cycle complete!")
        print(f"   Phase: {result['phase']}")
        print(f"   Spec: {result['spec_path']}")
        print(f"   Commit: {result['commit_sha'][:7]}")
        print(f"   Tests: {result['test_attempts']} attempt(s)")
        sys.exit(0)
    else:
        print(f"\n❌ Full cycle failed at {result['phase']} phase", file=sys.stderr)
        print(f"   Error: {result['error']}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
