#!/usr/bin/env bash
set -e

echo "[SMOKE QA] Starting local Cloudflare Pages runtime smoke test..."

# 1. Start wrangler pages dev on port 8792
PORT=8792
pnpm exec wrangler pages dev dist --port $PORT > /tmp/wrangler-smoke.log 2>&1 &
SERVER_PID=$!

cleanup() {
  kill $SERVER_PID 2>/dev/null || true
}
trap cleanup EXIT

# 2. Wait for server readiness
echo "[SMOKE QA] Waiting for runtime to bind to port $PORT..."
for i in {1..30}; do
  if curl -s "http://127.0.0.1:$PORT/api/health" >/dev/null 2>&1; then
    echo "[SMOKE QA] Server online after ${i} attempts."
    break
  fi
  sleep 0.5
done

# 3. Assert /api/health
HEALTH_RESP=$(curl -sf "http://127.0.0.1:$PORT/api/health")
echo "[SMOKE QA] /api/health response: $HEALTH_RESP"
echo "$HEALTH_RESP" | grep -q '"status": "healthy"' || { echo "[SMOKE QA FAIL] /api/health did not return healthy status"; exit 1; }

# 4. Assert /api/pulse returns JSON
PULSE_RESP=$(curl -sf "http://127.0.0.1:$PORT/api/pulse")
echo "$PULSE_RESP" | grep -q '"services":' || { echo "[SMOKE QA FAIL] /api/pulse did not return services payload"; exit 1; }
echo "[SMOKE QA] /api/pulse returned valid JSON telemetry."

# 5. Assert /api/export
EXPORT_RESP=$(curl -sf "http://127.0.0.1:$PORT/api/export")
echo "$EXPORT_RESP" | grep -q '"schemaVersion":' || { echo "[SMOKE QA FAIL] /api/export did not return valid export JSON"; exit 1; }
echo "[SMOKE QA] /api/export returned valid JSON export."

echo "[SMOKE QA PASS] All API endpoints verified in active Cloudflare runtime with zero errors."
