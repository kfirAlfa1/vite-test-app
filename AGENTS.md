# Base44 Setup Notes

## Stack
- Vite 5 + React 18 + TypeScript + Tailwind CSS. Frontend only — no backend, database, or external services.
- No lockfile is committed; `npm install` runs on container startup and resolves from `package.json`.

## Running
- `docker compose -f docker-compose.base44.yml up -d --build`
- Dev server (Vite) listens inside the container on port 8080; host port 3000 is mapped to it.
- Source is bind-mounted at `/app`, so edits are picked up by Vite HMR.

## Sandbox-specific overrides
- `vite.config.ts` enables `server.watch.usePolling` only when `BASE44_PREVIEW_MODE === "1"`, because bind-mounted directories in the sandbox don't always deliver filesystem events. Unset/other values keep the original native-watch behavior.
- The dev command forces `--host 0.0.0.0` so the preview proxy can reach the server.

## Verifying
- `curl http://localhost:3000/` should return the `index.html` shell.
- The app renders a centered card with a working increment/decrement counter.
