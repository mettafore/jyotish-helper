---
name: run-dev-server
description: Use when the user wants to run, start, preview, or view the Jyotish Helper app locally in a browser — starts the Vite dev server and opens it.
---

# Run the Jyotish Helper dev server

Static frontend only, lives in `web/`. No backend to start.

## Steps

1. From repo root: `cd web && npm install` (only if `node_modules` is missing).
2. Start dev server in the background: `cd web && npm run dev`.
   - Vite prints the local URL, typically `http://localhost:5173`.
   - Run this with a backgrounded process (e.g. `run_in_background: true`) — it
     does not exit on its own.
3. Open that URL for the user (or tell them to open it) — do not guess a port,
   read it from the actual Vite output.
4. To stop: kill the background process.

## Notes

- If `transitions.json` / `degrees.json` look stale, regenerate first:
  `cd generator && uv run python -m jyotish_gen.build` (writes into
  `web/public/data/`). Not needed for routine UI work.
- Don't use `npm run preview` unless the user specifically wants to test the
  production build — `npm run dev` has HMR and is the default for iterating.
