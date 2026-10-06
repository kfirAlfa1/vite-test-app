# Working notes for agents

## Running the app

- The dev environment is `docker-compose.base44.yml` (do not use any other compose file).
  `docker compose -f docker-compose.base44.yml up -d --build`
- Single service `web`: `node:22-bookworm`, repo bind-mounted at `/app`, dependencies
  installed into the `web_node_modules` named volume on startup (`npm install`), then
  Vite dev server on container port 8080.
- Host port 3000 maps to container port 8080 (Vite's configured port). The preview
  entry point is always host port 3000.
- There is no lockfile in the repo, so `npm install` (not `npm ci`) is used.
- The dev command execs `./node_modules/.bin/vite` directly rather than `npm run dev`.
  Going through the npm wrapper made every container restart print `npm error signal
  SIGTERM` (npm forwards the signal to vite and reports it as a failure), which reads
  as a service error. Do not reintroduce `npm run dev` in the command.

## Notes / gotchas

- Vite must bind `0.0.0.0` — passed on the CLI (`--host 0.0.0.0`). `vite.config.ts`
  has `server.host: true` as well; the CLI flag wins.
- **`server.allowedHosts: true` in `vite.config.ts` is required.** `npm install`
  resolves vite to 5.4.x (>= 5.4.12), which enforces a Host-header allowlist and
  returns `403 Blocked request` for the preview proxy host without it. The platform's
  `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (`.e2b.app`) is NOT sufficient: Vite's
  `additionalAllowedHosts` does exact string matching only, so a leading-dot wildcard
  never matches `3000-<sandbox id>.e2b.app`. Do not "simplify" this back to the env var.
- No database, backend or external services. No secrets required.
- Editing `src/**` hot-reloads via Vite. Editing `package.json` requires a service
  restart to re-run the install step (`docker compose -f docker-compose.base44.yml
  restart web`).
