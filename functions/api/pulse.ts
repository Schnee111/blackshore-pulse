interface TargetEndpoint {
  id: string;
  name: string;
  url: string;
  expectedStatus: number;
}

const TARGETS: TargetEndpoint[] = [
  { id: "monograph", name: "Monograph Showcase", url: "https://aeter.my.id", expectedStatus: 200 },
  { id: "thesis", name: "Thesis Knowledge Platform", url: "https://thesis.aeter.my.id", expectedStatus: 200 },
  { id: "9router", name: "9router AI Gateway", url: "http://127.0.0.1:20128/health", expectedStatus: 200 },
  { id: "sentinel", name: "Sentinel Webhook Receiver", url: "http://127.0.0.1:8798/api/github-webhook", expectedStatus: 200 },
  { id: "mempalace", name: "MemPalace L2 Knowledge Engine", url: "http://127.0.0.1:18800/api/status", expectedStatus: 200 }
];

async function probeTarget(target: TargetEndpoint) {
  const start = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(target.url, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "User-Agent": "BlackshorePulse/1.0.0"
      }
    });
    clearTimeout(timeoutId);

    const latencyMs = Date.now() - start;
    const isOperational = res.status === target.expectedStatus || (res.status >= 200 && res.status < 400);

    return {
      id: target.id,
      name: target.name,
      url: target.url,
      status: isOperational ? "operational" : "degraded",
      httpCode: res.status,
      latencyMs,
      lastChecked: new Date().toISOString()
    };
  } catch (err: any) {
    const latencyMs = Date.now() - start;
    return {
      id: target.id,
      name: target.name,
      url: target.url,
      status: "critical",
      httpCode: 0,
      latencyMs,
      error: err?.message || "Connection refused or timed out",
      lastChecked: new Date().toISOString()
    };
  }
}

export async function onRequestGet(): Promise<Response> {
  const probePromises = TARGETS.map((target) => probeTarget(target));
  const results = await Promise.allSettled(probePromises);

  const services = results.map((r, i) => {
    if (r.status === "fulfilled") {
      return r.value;
    }
    return {
      id: TARGETS[i].id,
      name: TARGETS[i].name,
      url: TARGETS[i].url,
      status: "critical",
      httpCode: 0,
      latencyMs: 3000,
      error: "Promise unhandled failure",
      lastChecked: new Date().toISOString()
    };
  });

  const operationalCount = services.filter((s) => s.status === "operational").length;
  const degradedCount = services.filter((s) => s.status === "degraded").length;
  const criticalCount = services.filter((s) => s.status === "critical").length;
  
  const validLatencies = services.filter((s) => s.latencyMs > 0).map((s) => s.latencyMs);
  const avgLatency = validLatencies.length
    ? Math.round(validLatencies.reduce((acc, curr) => acc + curr, 0) / validLatencies.length)
    : 0;

  const payload = {
    timestamp: new Date().toISOString(),
    summary: {
      total: services.length,
      operational: operationalCount,
      degraded: degradedCount,
      critical: criticalCount,
      avgLatencyMs: avgLatency
    },
    services
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, max-age=0"
    }
  });
}
