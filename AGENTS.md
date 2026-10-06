# AGENTS.md

## Running this app (Base44 dev environment)

```sh
docker compose -f docker-compose.base44.yml up -d --build
```

- Single service `web`: `node:22` with the repo bind-mounted at `/app`, running
  Vite's dev server on container port 3000 (mapped to host 3000).
- `node_modules` lives in a named Docker volume; dependencies are installed on
  container startup from `package.json` (there is no lockfile committed).
- No database, no backend, no environment variables or secrets are required.

## Things worth knowing

- There is no `package-lock.json` in this repo, so startup uses `npm install`
  (not `npm ci`). If one is ever committed, switch the startup command to
  `npm ci` for reproducible installs.
- `vite.config.ts` sets `server.allowedHosts: true`. Vite's Host-header check
  rejects the proxied preview hostname otherwise, and the page fails with
  "Blocked request. This host is not allowed." Keep this in place.
- The dev server port is passed on the compose command line (`--port 3000`),
  which overrides the `8080` in `vite.config.ts`. `npm run dev` alone still
  serves 8080 locally, as the README describes.

## Verifying it works

- `curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:3000/` → `200`.
- `docker compose -f docker-compose.base44.yml ps` → `web` healthy.
- The served HTML references `/src/main.tsx` (unhashed source modules), which
  confirms the live dev server is serving the cloned source, not a built bundle.
