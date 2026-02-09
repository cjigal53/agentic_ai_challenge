#!/usr/bin/env python3
"""Webhook listener for GitHub issue events."""
import hmac
import hashlib
import os
import subprocess
import threading
import logging
from pathlib import Path

from flask import Flask, request, jsonify

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(Path(__file__).parent / "logs" / "webhook.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# GitHub webhook secret (set via environment variable)
SECRET = os.environ.get('GITHUB_WEBHOOK_SECRET', '').encode()

if not SECRET:
    logger.warning("GITHUB_WEBHOOK_SECRET not set - webhook signature verification disabled")


def verify_signature(payload_body: bytes, signature_header: str) -> bool:
    """Verify GitHub webhook signature.

    Args:
        payload_body: Request body as bytes
        signature_header: X-Hub-Signature-256 header value

    Returns:
        True if signature is valid, False otherwise
    """
    if not SECRET:
        logger.warning("Signature verification skipped (no secret configured)")
        return True  # Allow requests if no secret is configured

    if not signature_header:
        logger.error("No signature header provided")
        return False

    # GitHub signature format: "sha256=<hash>"
    try:
        hash_algorithm, github_signature = signature_header.split('=')
    except ValueError:
        logger.error("Invalid signature format")
        return False

    if hash_algorithm != 'sha256':
        logger.error(f"Unsupported hash algorithm: {hash_algorithm}")
        return False

    # Compute expected signature
    mac = hmac.new(SECRET, msg=payload_body, digestmod=hashlib.sha256)
    expected_signature = mac.hexdigest()

    # Compare signatures (constant-time comparison)
    is_valid = hmac.compare_digest(expected_signature, github_signature)

    if not is_valid:
        logger.error("Signature verification failed")

    return is_valid


def process_issue_in_background(issue_number: int) -> None:
    """Run orchestrator for an issue in background.

    Args:
        issue_number: GitHub issue number
    """
    logger.info(f"Processing issue #{issue_number} in background...")

    try:
        # Get absolute path to orchestrator
        orchestrator_path = Path(__file__).parent / "orchestrator.py"

        # Run orchestrator
        result = subprocess.run(
            ["python3", str(orchestrator_path), str(issue_number)],
            capture_output=True,
            text=True,
            cwd=str(Path(__file__).parent.parent)  # Run from repo root
        )

        if result.returncode == 0:
            logger.info(f"Issue #{issue_number} processed successfully")
        else:
            logger.error(f"Issue #{issue_number} processing failed: {result.stderr}")

    except Exception as e:
        logger.error(f"Error processing issue #{issue_number}: {e}", exc_info=True)


@app.route('/webhook', methods=['POST'])
def webhook():
    """Handle GitHub webhook events."""
    # Verify signature
    signature = request.headers.get('X-Hub-Signature-256')

    if not verify_signature(request.data, signature):
        logger.error("Webhook signature verification failed")
        return jsonify({'error': 'Invalid signature'}), 401

    # Parse payload
    payload = request.json

    if not payload:
        logger.error("Empty webhook payload")
        return jsonify({'error': 'Empty payload'}), 400

    # Log event type
    event_type = request.headers.get('X-GitHub-Event')
    logger.info(f"Received webhook: {event_type}")

    # Handle issue events
    if event_type == 'issues':
        action = payload.get('action')
        issue = payload.get('issue', {})
        issue_number = issue.get('number')

        logger.info(f"Issue event: action={action}, number={issue_number}")

        # Process only newly opened issues
        if action == 'opened' and issue_number:
            logger.info(f"New issue #{issue_number}: {issue.get('title')}")

            # Start processing in background thread
            thread = threading.Thread(
                target=process_issue_in_background,
                args=(issue_number,),
                daemon=True
            )
            thread.start()

            return jsonify({
                'status': 'processing',
                'issue': issue_number,
                'message': f'Issue #{issue_number} queued for processing'
            }), 202

        else:
            logger.info(f"Ignoring issue action: {action}")
            return jsonify({
                'status': 'ignored',
                'reason': f'Action "{action}" is not processed'
            }), 200

    # Ignore other event types
    else:
        logger.info(f"Ignoring event type: {event_type}")
        return jsonify({
            'status': 'ignored',
            'reason': f'Event type "{event_type}" is not processed'
        }), 200


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'ok'}), 200


def main():
    """Start webhook listener."""
    port = int(os.environ.get('WEBHOOK_PORT', '5000'))

    logger.info("=" * 60)
    logger.info("GitHub Webhook Listener Starting")
    logger.info("=" * 60)
    logger.info(f"Port: {port}")
    logger.info(f"Secret configured: {'Yes' if SECRET else 'No (INSECURE)'}")
    logger.info("")
    logger.info("Waiting for webhook events...")
    logger.info("=" * 60)

    app.run(host='0.0.0.0', port=port, debug=False)


if __name__ == '__main__':
    main()
