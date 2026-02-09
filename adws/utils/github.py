"""GitHub operations using gh CLI."""
import json
import logging
import subprocess
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)


class GitHubError(Exception):
    """Raised when GitHub operations fail."""
    pass


def run_gh_command(args: list[str]) -> str:
    """Run a gh CLI command and return output.

    Args:
        args: Command arguments (e.g., ["issue", "view", "123"])

    Returns:
        Command output as string

    Raises:
        GitHubError: If command fails
    """
    try:
        result = subprocess.run(
            ["gh"] + args,
            capture_output=True,
            text=True,
            check=True,
            timeout=30
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        raise GitHubError(f"gh command failed: {e.stderr}") from e
    except subprocess.TimeoutExpired as e:
        raise GitHubError(f"gh command timed out: {' '.join(args)}") from e


def get_issue(issue_number: int) -> Dict[str, Any]:
    """Get issue details from GitHub.

    Args:
        issue_number: Issue number to fetch

    Returns:
        Dict with issue data (title, body, labels, etc.)

    Raises:
        GitHubError: If issue doesn't exist or API call fails
    """
    try:
        output = run_gh_command([
            "issue", "view", str(issue_number),
            "--json", "number,title,body,labels,state,url"
        ])
        issue = json.loads(output)
        logger.info(f"Fetched issue #{issue_number}: {issue['title']}")
        return issue
    except json.JSONDecodeError as e:
        raise GitHubError(f"Failed to parse issue data: {e}") from e


def add_comment(issue_number: int, comment: str) -> None:
    """Add a comment to an issue.

    Args:
        issue_number: Issue number
        comment: Comment text (supports markdown)

    Raises:
        GitHubError: If comment fails
    """
    try:
        run_gh_command([
            "issue", "comment", str(issue_number),
            "--body", comment
        ])
        logger.info(f"Added comment to issue #{issue_number}")
    except GitHubError as e:
        logger.error(f"Failed to add comment to issue #{issue_number}: {e}")
        raise


def add_label(issue_number: int, label: str) -> None:
    """Add a label to an issue.

    Args:
        issue_number: Issue number
        label: Label to add

    Raises:
        GitHubError: If label operation fails
    """
    try:
        run_gh_command([
            "issue", "edit", str(issue_number),
            "--add-label", label
        ])
        logger.info(f"Added label '{label}' to issue #{issue_number}")
    except GitHubError as e:
        logger.error(f"Failed to add label to issue #{issue_number}: {e}")
        raise


def remove_label(issue_number: int, label: str) -> None:
    """Remove a label from an issue.

    Args:
        issue_number: Issue number
        label: Label to remove

    Raises:
        GitHubError: If label operation fails
    """
    try:
        run_gh_command([
            "issue", "edit", str(issue_number),
            "--remove-label", label
        ])
        logger.info(f"Removed label '{label}' from issue #{issue_number}")
    except GitHubError as e:
        logger.error(f"Failed to remove label from issue #{issue_number}: {e}")
        raise


def close_issue(issue_number: int, comment: Optional[str] = None) -> None:
    """Close an issue with optional comment.

    Args:
        issue_number: Issue number
        comment: Optional closing comment

    Raises:
        GitHubError: If close operation fails
    """
    try:
        if comment:
            add_comment(issue_number, comment)

        run_gh_command([
            "issue", "close", str(issue_number)
        ])
        logger.info(f"Closed issue #{issue_number}")
    except GitHubError as e:
        logger.error(f"Failed to close issue #{issue_number}: {e}")
        raise
