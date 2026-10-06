# Base44 Dev Environment

## Overview
Vite + React + TypeScript + Tailwind app. No backend, no database, no external services.

## Running
```sh
docker compose -f docker-compose.base44.yml up -d
```
- Web entry point: host port 3000 → container port 8080
- Vite dev server with HMR (live reload)
- No lockfile; `npm install` runs on container startup
- No secrets required

## Verification
- `curl http://localhost:3000/` should return 200 with Vite's HMR client injected
- Healthcheck: `GET /` via node fetch
