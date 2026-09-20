# System Architecture & Edge API Contracts

## 1. High-Level Architecture

```
[ Client Browser / Mission Control ]
                │
                │ HTTP GET /api/pulse
                ▼
[ Cloudflare Pages Function: /api/pulse.ts ]
    ├── Probe monograph   (https://aeter.my.id)
    ├── Probe thesis      (https://thesis.aeter.my.id)
    ├── Probe 9router     (http://127.0.0.1:20128/v1/models or public proxy)
    ├── Probe sentinel    (http://127.0.0.1:8798/api/github-webhook)
    └── Probe mempalace   (http://127.0.0.1:18800 or synthetic heartbeats)
                │
                ▼
      [ Aggregate JSON Payload ]
```

---

## 2. Edge API Contracts

### Endpoint 1: Edge Health Check
- **Path:** `/api/health`
- **Method:** `GET`
- **Response Format:** `application/json`
- **Schema:**
```json
{
  "status": "healthy",
  "runtime": "cloudflare-pages",
  "timestamp": "2026-09-20T14:15:00.000Z",
  "edgeRegion": "sin"
}
```

### Endpoint 2: Concurrent Telemetry Probe
- **Path:** `/api/pulse`
- **Method:** `GET`
- **Response Format:** `application/json`
- **Schema:**
```json
{
  "timestamp": "2026-09-20T14:15:00.000Z",
  "summary": {
    "total": 5,
    "operational": 5,
    "degraded": 0,
    "critical": 0,
    "avgLatencyMs": 42.4
  },
  "services": [
    {
      "id": "monograph",
      "name": "Monograph Core",
      "url": "https://aeter.my.id",
      "status": "operational",
      "httpCode": 200,
      "latencyMs": 38,
      "lastChecked": "2026-09-20T14:15:00.000Z"
    }
  ]
}
```

---

## 3. Reliability & Fallback Strategies
1. **Parallel Execution:** Probes execute via `Promise.allSettled()` to guarantee that one failing or slow endpoint cannot block other probe evaluations.
2. **Per-Probe Timeout:** Strict 3000ms timeout per probe via `AbortSignal.timeout(3000)`.
3. **Fail-Safe Classification:** Any unhandled network rejection automatically resolves to `critical` or `degraded` with structured error details instead of crashing the edge function.
