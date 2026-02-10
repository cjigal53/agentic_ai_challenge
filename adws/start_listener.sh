#!/bin/bash
# Start webhook listener and Cloudflare Tunnel for GitHub webhooks

set -e

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

if ! command -v cloudflared &> /dev/null; then
    echo -e "${YELLOW}❌ cloudflared not found${NC}"
    echo "   Install: brew install cloudflare/cloudflare/cloudflared"
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
echo ""

# Start Cloudflare Tunnel
echo -e "${GREEN}🌐 Starting Cloudflare Tunnel...${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

cloudflared tunnel --url http://localhost:5555 &
CLOUDFLARED_PID=$!

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Copy the trycloudflare.com URL shown above"
echo "2. Go to GitHub repo Settings → Webhooks → Add webhook"
echo "3. Paste URL + /webhook (e.g., https://xxx.trycloudflare.com/webhook)"
echo "4. Content type: application/json"
echo "5. Secret: Use your GITHUB_WEBHOOK_SECRET value"
echo "6. Events: Select 'Issues' only"
echo "7. Active: ✓"
echo ""
echo -e "${BLUE}Press Ctrl+C to stop${NC}"
echo ""

# Cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down...${NC}"
    kill $LISTENER_PID 2>/dev/null || true
    kill $CLOUDFLARED_PID 2>/dev/null || true
    echo -e "${GREEN}✅ Stopped${NC}"
    exit 0
}

trap cleanup INT TERM

# Wait for both processes
wait
