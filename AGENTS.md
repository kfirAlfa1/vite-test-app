# AGENTS.md

## What this project is

Frontend-only Vite + React 18 + TypeScript + Tailwind app. **No backend, no
database, no external services and no credentials required.**

## Running it (Base44 sandbox)

```sh
docker compose -f docker-compose.base44.yml up -d --build
```

- Plain `node:22-bookworm` image, repo bind-mounted at `/app` — the app runs
  **from source** through Vite's dev server, so edits hot-reload in the preview.
- Host port **3000** -> container port **8080** (8080 is the project's own Vite
  port from `vite.config.ts`; the README refers to it as well).
- `npm install` runs on every container start because **no lockfile is
  committed**. Dependencies are kept in the `web_node_modules` named volume, not
  in the repo, so the sandbox checkout stays clean.
- Vite's config sets `server.host: true` and `server.allowedHosts: true`. The
  latter is required: the preview proxy forwards `Host:
  3000-<sandbox-id>.$BASE44_SANDBOX_HOST_DOMAIN`, which Vite would otherwise
  reject with 403 "Blocked request".
- `CHOKIDAR_USEPOLLING=true` keeps hot reload reliable over bind mounts.

## Verifying it works

- `curl -sS http://localhost:3000/` returns the HTML shell including
  `/@vite/client` and `/src/main.tsx`.
- `curl -sS http://localhost:3000/src/main.tsx` returns **transformed,
  unhashed source** (proof the dev server, not a prebuilt bundle, is serving).
- The page shows "Vite Test App" with a counter (− / + buttons).

## Notes and quirks

- `vite.config.ts` is ESM-typed (`"type": "module"` in package.json) but uses
  `__dirname`; Vite loads the config through its own bundler, so this works.
- `npm run build` (`tsc -b && vite build`) is not part of the dev setup; there
  is no CI or deployment config in the repo.
