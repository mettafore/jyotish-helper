---
name: deploy
description: Use when the user wants to deploy, ship, or push the Jyotish Helper app live to production (Vercel) — merges/pushes to main and runs the Vercel prod deploy.
---

# Deploy Jyotish Helper to production

Static site, Vercel project `web` (root dir `web/`), live at
https://web-pi-kohl-36.vercel.app. Deploy always builds from `main` — never
deploy an unmerged branch straight to prod.

## Steps

1. Confirm the branch is merged: `git status`, `git log --oneline -3` on
   `main`. If work is still on a feature branch, merge it first
   (fast-forward preferred, see AGENTS.md branch-deletion convention).
2. Run tests before deploying: `cd web && npx vitest run` — must be green.
3. Push `main` if not already: `git push origin main`.
4. Deploy: `cd web && vercel --prod --yes`.
   - `web/.vercel/` (project link) is gitignored. On a fresh clone, run
     `vercel link` once before this will work.
5. Confirm the printed `Production` / aliased URL matches
   `https://web-pi-kohl-36.vercel.app`.

## Versioning (optional, ask if unclear)

If this deploy corresponds to a notable release, tag and publish a GitHub
Release too (see AGENTS.md "Versioning") — don't do this for every trivial
deploy, only when the user wants a version bump:

```sh
gh release create vX.Y.Z --title "vX.Y.Z" --notes "..." --latest
```

## Notes

- Never force-push or skip tests to deploy faster.
- Don't deploy from a dirty working tree — check `git status` first.
