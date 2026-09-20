# Verification & Engineering Playbook

This document records the exact non-interactive commands used to verify, test, and build Blackshore Pulse.

---

## 1. Local Development & Verification Gates

### Install Dependencies
```bash
pnpm install
```

### Build Verification Gate (Deterministic)
```bash
pnpm run build
```

### Pre-Push Hygiene Gate
```bash
test -z "$(git status --porcelain)"
```

### Local Typecheck & Lint
```bash
pnpm run check
```

---

## 2. API Contract Tests
- `GET /api/health` -> HTTP 200 `{ "status": "healthy" }`
- `GET /api/pulse` -> HTTP 200 `{ "summary": { ... }, "services": [ ... ] }`

---

## 3. Disaster Recovery Protocol
To revert a faulty pull request merge commit cleanly:
```bash
git fetch origin main
git checkout main
git revert -m 1 <MERGE_COMMIT_SHA>
pnpm run build
git push origin main
```
