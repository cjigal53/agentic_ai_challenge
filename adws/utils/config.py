"""Configuration loader for ADW orchestration."""
import os
from pathlib import Path
from typing import Any, Dict

import yaml


def load_config() -> Dict[str, Any]:
    """Load configuration from config.yaml.

    Returns:
        Dict containing configuration values

    Raises:
        FileNotFoundError: If config.yaml doesn't exist
        yaml.YAMLError: If config.yaml is malformed
    """
    config_path = Path(__file__).parent.parent / "config.yaml"

    if not config_path.exists():
        raise FileNotFoundError(f"Config file not found: {config_path}")

    with open(config_path, "r") as f:
        config = yaml.safe_load(f)

    # Resolve relative paths to absolute paths from project root
    project_root = Path(__file__).parent.parent.parent

    for key in ["specs", "commands", "logs", "state"]:
        if key in config["paths"]:
            rel_path = config["paths"][key]
            config["paths"][key] = str(project_root / rel_path)

    return config


def get_repo_root() -> Path:
    """Get the repository root directory.

    Returns:
        Path to repository root
    """
    return Path(__file__).parent.parent.parent
