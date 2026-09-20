import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const payload = {
    status: "healthy",
    runtime: "cloudflare-pages-functions",
    timestamp: new Date().toISOString(),
    edgeRegion: "sin-edge-01",
    version: "1.0.0"
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, max-age=0"
    }
  });
};
