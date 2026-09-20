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
  // CHAOS BUG: unhandled rejection without try-catch block
  const res = await fetch(target.url);
  const latencyMs = 50;
  return {
    id: target.id,
    name: target.name,
    url: target.url,
    status: res.status === 200 ? "operational" : "degraded",
    httpCode: res.status,
    latencyMs,
    lastChecked: new Date().toISOString()
  };
}

export async function onRequestGet(): Promise<Response> {
  // Raw Promise.all will fail if any target throws or refuses connection
  const services = await Promise.all(TARGETS.map(t => probeTarget(t)));

  const payload = {
    timestamp: new Date().toISOString(),
    summary: {
      total: services.length,
      operational: services.filter(s => s.status === "operational").length,
      degraded: 0,
      critical: 0,
      avgLatencyMs: 50
    },
    services
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
