#!/usr/bin/env bash
# Dev server helper — starts/stops a local HTTP server for the site.
# Usage:
#   ./scripts/dev-server.sh start   # Start server on port 8826
#   ./scripts/dev-server.sh stop    # Stop server
#   ./scripts/dev-server.sh status  # Check if running

PORT=8826
PIDFILE="/tmp/easter-egg-hunt-dev-server.pid"
SITE_DIR="$(cd "$(dirname "$0")/../site" && pwd)"

case "${1:-status}" in
    start)
        if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
            echo "Dev server already running (PID $(cat "$PIDFILE")) at http://localhost:$PORT"
            exit 0
        fi
        cd "$SITE_DIR" || exit 1
        python3 -m http.server "$PORT" &>/dev/null &
        echo $! > "$PIDFILE"
        echo "Dev server started at http://localhost:$PORT (PID $!)"
        ;;
    stop)
        if [ -f "$PIDFILE" ]; then
            PID=$(cat "$PIDFILE")
            if kill -0 "$PID" 2>/dev/null; then
                kill "$PID"
                echo "Dev server stopped (PID $PID)"
            else
                echo "Dev server not running (stale PID file)"
            fi
            rm -f "$PIDFILE"
        else
            echo "No dev server PID file found"
        fi
        ;;
    status)
        if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
            echo "Dev server running (PID $(cat "$PIDFILE")) at http://localhost:$PORT"
        else
            echo "Dev server not running"
            rm -f "$PIDFILE" 2>/dev/null
        fi
        ;;
    *)
        echo "Usage: $0 {start|stop|status}"
        exit 1
        ;;
esac
