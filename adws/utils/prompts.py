"""Prompt template loader and renderer."""
import logging
from pathlib import Path
from typing import Dict, Any

from .config import load_config

logger = logging.getLogger(__name__)


class PromptError(Exception):
    """Raised when prompt operations fail."""
    pass


def load_prompt_template(template_name: str) -> str:
    """Load a prompt template from .claude/commands/.

    Args:
        template_name: Template filename without .md extension

    Returns:
        Template content as string

    Raises:
        PromptError: If template doesn't exist
    """
    config = load_config()
    template_path = Path(config["paths"]["commands"]) / f"{template_name}.md"

    if not template_path.exists():
        raise PromptError(f"Prompt template not found: {template_path}")

    with open(template_path, "r") as f:
        content = f.read()

    logger.info(f"Loaded prompt template: {template_name}")
    return content


def render_prompt(template_name: str, variables: Dict[str, Any]) -> str:
    """Load and render a prompt template with variables.

    Args:
        template_name: Template filename without .md extension
        variables: Dict of variables to substitute (e.g., {"ISSUE_NUMBER": 42})

    Returns:
        Rendered prompt as string

    Raises:
        PromptError: If template doesn't exist or rendering fails
    """
    template = load_prompt_template(template_name)

    try:
        # Simple variable substitution
        rendered = template
        for key, value in variables.items():
            placeholder = f"${key}"
            rendered = rendered.replace(placeholder, str(value))

        logger.info(f"Rendered prompt template: {template_name}")
        logger.debug(f"Variables: {variables}")

        return rendered

    except Exception as e:
        raise PromptError(f"Failed to render template {template_name}: {e}") from e
