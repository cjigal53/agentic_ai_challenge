#!/bin/bash
# Start webhook listener and Cloudflare Tunnel for GitHub webhooks

set -e

# Get script directory (works even if called from elsewhere)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR/.."  # Go to project root

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  Agentic AI Challenge - Webhook Listener${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Check if webhook secret is set
if [ -z "$GITHUB_WEBHOOK_SECRET" ]; then
    echo -e "${YELLOW}⚠️  GITHUB_WEBHOOK_SECRET not set${NC}"
    echo "   Webhook signature verification will be disabled (INSECURE)"
    echo ""
    echo "   To set it:"
    echo "   export GITHUB_WEBHOOK_SECRET=\"your-secret-here\""
    echo ""
    read -p "Continue without secret? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check dependencies
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}❌ python3 not found${NC}"
    exit 1
fi

# Setup virtual environment
VENV_DIR="adws/venv"

if [ ! -d "$VENV_DIR" ]; then
    echo -e "${GREEN}📦 Creating virtual environment...${NC}"
    python3 -m venv "$VENV_DIR"
fi

# Activate virtual environment
echo -e "${GREEN}🔧 Activating virtual environment...${NC}"
source "$VENV_DIR/bin/activate"

# Install Python dependencies
echo -e "${GREEN}📦 Installing Python dependencies...${NC}"
pip install -q -r adws/requirements.txt

# Create logs directory
mkdir -p adws/logs

# Start webhook listener in background (using venv python)
echo -e "${GREEN}🚀 Starting webhook listener...${NC}"
python adws/webhook_listener.py &
LISTENER_PID=$!

# Give it a moment to start
sleep 2

# Check if listener is running
if ! kill -0 $LISTENER_PID 2>/dev/null; then
    echo -e "${YELLOW}❌ Webhook listener failed to start${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Webhook listener running (PID: $LISTENER_PID)${NC}"
echo -e "${GREEN}✅ Listening on http://localhost:5555${NC}"
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${YELLOW}ℹ️  Make sure your Cloudflare Tunnel is pointing to localhost:5555${NC}"
echo ""
echo -e "${YELLOW}GitHub webhook should be configured with:${NC}"
echo "  • Payload URL: https://your-tunnel-url/webhook"
echo "  • Content type: application/json"
echo "  • Secret: Your GITHUB_WEBHOOK_SECRET value"
echo "  • Events: Issues only"
echo ""
echo -e "${BLUE}Logs:${NC}"
echo "  • tail -f adws/logs/webhook.log"
echo "  • tail -f adws/logs/workflow.log"
echo ""
echo -e "${BLUE}Press Ctrl+C to stop${NC}"
echo ""

# Cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down...${NC}"
    kill $LISTENER_PID 2>/dev/null || true
    echo -e "${GREEN}✅ Stopped${NC}"
    exit 0
}

trap cleanup INT TERM

# Wait for listener
wait
