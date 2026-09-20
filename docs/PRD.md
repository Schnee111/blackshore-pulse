# Product Requirements Document (PRD)

## Project: Blackshore Pulse
**Status:** Approved  
**Version:** 1.0.0  
**Target Platform:** Cloudflare Pages + Edge Functions  

---

## 1. Executive Summary
Blackshore Pulse is a mission control edge telemetry dashboard engineered to monitor core services across the distributed infrastructure. The platform delivers instant visual status signals, concurrent probe latencies, uptime metrics, and edge health analytics in a dark obsidian tactile cockpit.

---

## 2. Monitored Services
Blackshore Pulse concurrently audits 5 critical services:
1. **monograph:** Production engineering monograph and developer showcase.
2. **thesis:** Academic research documentation and SLR platform.
3. **9router:** Distributed multi-provider AI model proxy gateway.
4. **sentinel:** Autonomous GitHub webhook receiver and automated code reviewer.
5. **mempalace:** Long-term episodic and semantic knowledge memory palace.

---

## 3. Key Functional Requirements
- **FR-1 Concurrent Edge Probes:** Cloudflare Pages Functions execute asynchronous HTTP probes with strict timeout budgets.
- **FR-2 Zero-Slop Visual Hierarchy:** Glassmorphic dark obsidian dashboard conforming strictly to `DESIGN.md` guidelines.
- **FR-3 Health Check API:** Lightweight JSON endpoint (`/api/health`) reporting edge node vitals.
- **FR-4 Telemetry API:** Core probe endpoint (`/api/pulse`) delivering structured probe payloads.
- **FR-5 Deterministic Builds:** Cloudflare Pages pipeline buildable with zero external runtime daemon requirements.

---

## 4. Non-Functional Requirements
- **Latency Budget:** Sub-100ms edge response for local probe evaluations.
- **Fail-Closed Safety:** Graceful error handling for offline or unreachable target probes.
- **Typography & Precision:** Monospaced tabular numerals (`JetBrains Mono`, `tnum`) for all numerical metrics.
- **Anti-Slop Hard Rule:** Total ban on em-dashes (`—`), generic purple gradients, and decorative emoji glyphs.
