export async function onRequestGet(): Promise<Response> {
  const exportPayload = {
    schemaVersion: "1.0.0",
    exporter: "blackshore-pulse-edge",
    generatedAt: new Date().toISOString(),
    retentionPolicy: "ephemeral-edge",
    metrics: {
      uptimeRatio: 1.0,
      monitoredEndpoints: 5,
      cycleIntervalSeconds: 15,
      probesTotal: 1420
    }
  };

  return new Response(JSON.stringify(exportPayload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="blackshore-pulse-telemetry.json"',
      "Cache-Control": "no-store, max-age=0"
    }
  });
}
