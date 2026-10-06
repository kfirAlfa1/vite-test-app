# Agent notes

## Running the app here
- Frontend-only project: Vite + React + TS + Tailwind. No backend, database, or external service, so **no credentials/secrets are required**.
- Use `docker compose -f docker-compose.base44.yml up -d --build`. The only service is `web` (`node:22`) running the Vite dev server from the bind-mounted source; host port **3000** maps to container **8080**.
- `node_modules` lives in a named Docker volume, and dependencies are installed by the service start command (`npm install --no-package-lock`) on every container start. The repo has **no lockfile** committed.
- Vite is pinned as `^5.4.1` and resolves to a 5.4.x release that supports `server.allowedHosts`; `vite.config.ts` sets `host: true` + `allowedHosts: true` so the proxied preview hostname is accepted. Without this, the preview origin gets "Blocked request" errors.

## Verify it works
- `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/` should return `200` and the HTML should reference `/@vite/client` (proves the dev server, not a prebuilt bundle, is serving).
- Home page renders a card titled "Vite Test App" with a `Counter` (+ / −) component; the counter starts at 0.
