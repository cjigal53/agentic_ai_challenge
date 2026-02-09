"""Claude CLI wrapper for invoking the agent."""
import logging
import subprocess
from pathlib import Path
from typing import Optional

from .config import load_config

logger = logging.getLogger(__name__)


class ClaudeError(Exception):
    """Raised when Claude CLI operations fail."""
    pass


def invoke_claude(
    prompt: str,
    timeout: Optional[int] = None,
    cwd: Optional[Path] = None
) -> str:
    """Invoke Claude CLI with a prompt.

    Args:
        prompt: The prompt to send to Claude
        timeout: Timeout in seconds (default from config)
        cwd: Working directory (default: repo root)

    Returns:
        Claude's response

    Raises:
        ClaudeError: If Claude invocation fails
    """
    config = load_config()

    if timeout is None:
        timeout = config["timeouts"]["claude_timeout_seconds"]

    if cwd is None:
        from .config import get_repo_root
        cwd = get_repo_root()

    try:
        logger.info("Invoking Claude CLI...")
        logger.debug(f"Prompt preview: {prompt[:200]}...")

        result = subprocess.run(
            ["claude", "-p", prompt],
            capture_output=True,
            text=True,
            check=True,
            timeout=timeout,
            cwd=str(cwd)
        )

        output = result.stdout.strip()
        logger.info(f"Claude response received ({len(output)} chars)")
        logger.debug(f"Response preview: {output[:200]}...")

        return output

    except subprocess.CalledProcessError as e:
        error_msg = f"Claude CLI failed with exit code {e.returncode}"
        if e.stderr:
            error_msg += f": {e.stderr}"
        logger.error(error_msg)
        raise ClaudeError(error_msg) from e

    except subprocess.TimeoutExpired as e:
        error_msg = f"Claude CLI timed out after {timeout}s"
        logger.error(error_msg)
        raise ClaudeError(error_msg) from e

    except FileNotFoundError as e:
        error_msg = "Claude CLI not found. Is it installed?"
        logger.error(error_msg)
        raise ClaudeError(error_msg) from e


def invoke_claude_with_retry(
    prompt: str,
    max_retries: Optional[int] = None,
    timeout: Optional[int] = None
) -> str:
    """Invoke Claude with retry logic.

    Args:
        prompt: The prompt to send to Claude
        max_retries: Max retry attempts (default from config)
        timeout: Timeout in seconds (default from config)

    Returns:
        Claude's response

    Raises:
        ClaudeError: If all retries fail
    """
    config = load_config()

    if max_retries is None:
        max_retries = config["timeouts"]["max_retries"]

    last_error = None

    for attempt in range(max_retries):
        try:
            return invoke_claude(prompt, timeout=timeout)
        except ClaudeError as e:
            last_error = e
            logger.warning(f"Attempt {attempt + 1}/{max_retries} failed: {e}")
            if attempt < max_retries - 1:
                logger.info("Retrying...")

    raise ClaudeError(f"All {max_retries} attempts failed. Last error: {last_error}")
