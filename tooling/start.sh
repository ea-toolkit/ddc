#!/bin/bash

# DDC Knowledge Base Viewer - Startup Script
# This script starts both backend and frontend servers
#
# Usage:
#   ./start.sh                          # Uses default domain-knowledge/ path
#   DDC_KNOWLEDGE_BASE_PATH=/path/to/kb ./start.sh  # Custom knowledge base

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting DDC Knowledge Base Viewer..."
echo ""

# Check if we're in the right directory
if [ ! -d "$SCRIPT_DIR/backend" ] || [ ! -d "$SCRIPT_DIR/frontend" ]; then
    echo "Error: backend/ and frontend/ directories not found"
    exit 1
fi

# Default knowledge base path: sibling domain-knowledge/ or env var
if [ -z "$DDC_KNOWLEDGE_BASE_PATH" ]; then
    DDC_KNOWLEDGE_BASE_PATH="$SCRIPT_DIR/../domain-knowledge"
fi
export DDC_KNOWLEDGE_BASE_PATH

echo "Knowledge base: $DDC_KNOWLEDGE_BASE_PATH"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend
echo "Starting Backend..."

# Check if venv exists
if [ ! -d "$SCRIPT_DIR/backend/venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv "$SCRIPT_DIR/backend/venv"
fi

# Install dependencies if needed
if [ ! -f "$SCRIPT_DIR/backend/venv/bin/python3" ]; then
    echo "Error: Virtual environment not properly created"
    exit 1
fi

echo "Installing/updating Python dependencies..."
"$SCRIPT_DIR/backend/venv/bin/python3" -m pip install -q --upgrade pip
"$SCRIPT_DIR/backend/venv/bin/python3" -m pip install -q -r "$SCRIPT_DIR/backend/requirements.txt"

# Start backend in background
"$SCRIPT_DIR/backend/venv/bin/python3" "$SCRIPT_DIR/backend/run.py" > "$SCRIPT_DIR/backend.log" 2>&1 &
BACKEND_PID=$!
echo "Backend started (PID: $BACKEND_PID) - logs in $SCRIPT_DIR/backend.log"

# Start frontend
echo "Starting Frontend..."

# Check if node_modules exists
if [ ! -d "$SCRIPT_DIR/frontend/node_modules" ]; then
    echo "Installing Node.js dependencies..."
    cd "$SCRIPT_DIR/frontend"
    npm install
fi

# Start frontend in background
cd "$SCRIPT_DIR/frontend"
npm run dev > "$SCRIPT_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo "Frontend started (PID: $FRONTEND_PID) - logs in $SCRIPT_DIR/frontend.log"

echo ""
echo "DDC Knowledge Base Viewer is running!"
echo ""
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user interrupt
wait