import type { APIRoute } from 'astro';

export const prerender = false;

interface TargetEndpoint {
  id: string;
  name: string;
  url: string;
  expectedStatus: number;
}

const TARGETS: TargetEndpoint[] = [
  { id: "monograph", name: "Monograph Showcase", url: "https://aeter.my.id", expectedStatus: 200 },
  { id: "thesis", name: "Thesis Knowledge Platform", url: "https://thesis.aeter.my.id", expectedStatus: 200 },
  { id: "weather", name: "Weather Dashboard API", url: "https://aeter.my.id/api/health", expectedStatus: 200 },
  { id: "sentinel", name: "Sentinel Webhook Endpoint", url: "https://aeter.my.id/api/github-webhook", expectedStatus: 200 },
  { id: "authgate", name: "Auth Gate Edge Node", url: "https://aeter.my.id/api/auth-gate", expectedStatus: 200 }
];

async function probeTarget(target: TargetEndpoint) {
  const start = performance.now();
  try {
    const res = await fetch(target.url, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
      headers: {
        "User-Agent": "BlackshorePulse/1.0.0"
      }
    });

    const latencyMs = Math.round(performance.now() - start);
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
    const latencyMs = Math.round(performance.now() - start);
    return {
      id: target.id,
      name: target.name,
      url: target.url,
      status: "critical",
      httpCode: 0,
      latencyMs,
      error: err?.message || "Connection refused or probe timed out",
      lastChecked: new Date().toISOString()
    };
  }
}

export const GET: APIRoute = async () => {
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
      error: "Promise unhandled execution error",
      lastChecked: new Date().toISOString()
    };
  });

  const operationalCount = services.filter((s) => s.status === "operational").length;
  const degradedCount = services.filter((s) => s.status === "degraded").length;
  const criticalCount = services.filter((s) => s.status === "critical").length;
  
  const operationalLatencies = services
    .filter((s) => s.status === "operational" || s.status === "degraded")
    .map((s) => s.latencyMs);

  const avgLatency = operationalLatencies.length
    ? Math.round(operationalLatencies.reduce((acc, curr) => acc + curr, 0) / operationalLatencies.length)
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
};
