# Blackshore Pulse

> Realtime Edge Telemetry and Mission Control Dashboard for Blackshore Infrastructure.

[![CI/CD Pipeline](https://github.com/Schnee111/blackshore-pulse/actions/workflows/deploy.yml/badge.svg)](https://github.com/Schnee111/blackshore-pulse/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Design System: Obsidian Glass](https://img.shields.io/badge/Design-Deep_Obsidian-0D0F14.svg)](docs/DESIGN.md)

---

## Overview

Blackshore Pulse is a lightweight, edge-native telemetry mission control dashboard. Built on Astro 5, Tailwind CSS, and Cloudflare Pages Functions, it continuously probes core distributed endpoints across the Blackshore ecosystem and visualizes latency trends, availability states, and system health in real time.

All metrics are updated via zero-cost edge function calls with fallback protections, sub-3000ms timeout boundaries, and concurrent promise isolation.

---

## Architecture and Data Flow

```text
[ Browser Client ]
        |
        | 1. HTTP GET / (Astro SSR / Hybrid Client)
        v
[ Cloudflare Pages Edge Runtime ]
        |
        +---> /api/pulse  ---> [ Concurrent HTTP Probes ]
        |                             +---> Monograph (schnee.web.id)
        |                             +---> Thesis Portal (thesis.schnee.web.id)
        |                             +---> 9router Gateway (9router.aeter.my.id)
        |                             +---> Sentinel Webhook (aeter.my.id)
        |                             +---> MemPalace L2 Vault
        |
        +---> /api/export ---> Raw JSON Telemetry Snapshot
        +---> /api/health ---> Edge Self-Diagnostics (HTTP 200)
```

---

## Features

- **Realtime Service Matrix:** Probes and aggregates health status across 5 production services with dynamic SVG latency sparklines.
- **Edge Concurrent Probing:** Leverages `Promise.allSettled()` and `AbortSignal.timeout(3000)` inside Cloudflare Pages Functions to guarantee zero unhandled edge exceptions.
- **Strict Anti-Slop Visual Identity:** Designed against `docs/DESIGN.md` using the Deep Obsidian canvas palette (`#0D0F14`), 78% frosted glass panels (`rgba(22, 25, 33, 0.78)`), and monospaced tabular numerals (`JetBrains Mono`).
- **Telemetry Export:** Instant JSON snapshots via `/api/export` for external logging and monitoring integrations.

---

## Quickstart

### Prerequisites

- Node.js 20+
- pnpm 9+

### Local Development

```bash
# Clone the repository
git clone https://github.com/Schnee111/blackshore-pulse.git
cd blackshore-pulse

# Install dependencies
pnpm install

# Start local development server with Cloudflare platform bindings
pnpm run dev
```

### Production Build & Static Diagnostics

```bash
# Typecheck and build Astro application
pnpm run build

# Preview build locally
pnpm run preview
```

---

## API Reference

| Endpoint | Method | Response | Description |
|---|---|---|---|
| `/api/pulse` | GET | JSON | Executes concurrent probes across all target services and returns live latencies. |
| `/api/export` | GET | JSON | Snapshot of active cluster health status and metrics. |
| `/api/health` | GET | JSON | Edge self-health status check returning HTTP 200. |

---

## Design System

Blackshore Pulse follows the design tokens defined in [`docs/DESIGN.md`](docs/DESIGN.md):

- **Substrate Canvas:** `#0D0F14`
- **Surface Panels:** `rgba(22, 25, 33, 0.78)` with 20px blur and `rgba(255, 255, 255, 0.08)` hairline borders
- **Status Accents:** Emerald (`#2E9E6B`), Amber (`#D99A2B`), Rose (`#D4553F`)
- **Dials:** Variance 6, Motion 4, Density 7

---

## License

This project is licensed under the MIT License. Copyright (c) 2026 Muhammad Daffa Maarif (Schnee111).
