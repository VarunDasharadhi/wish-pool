# wish-pool STATE

Git and any live dashboards outrank this file; check them before trusting a claim here.

This file holds only what is true right now. History and session narrative live in
`docs/journal/`, settled calls live in `DECISIONS.md`, gotcha detail lives in `docs/gotchas/`. It
is size-capped by `.githooks/pre-commit` (see `PROTOCOL.md`); move content out rather than
deleting it. Never describe uncommitted work here, `git status` covers that live and accurately.

## What this is

WishPool landing page plus an Airtable-backed waitlist signup capture (static site, no build
step; see `AGENTS.md` for the stack). No other repo depends on this or is depended on by it, as
far as tracked files show.

## Where the code stands

- On hold. Initial build and the Airtable wiring are both from May 2026 (`adadeb8` through
  `bd8628b`, 2026-05-09 to 2026-05-18). Then dormant until today: `283339b` (2026-09-10) removed
  placeholder social proof, a stats band, and a particle canvas from the landing page, and added
  `SESSION.md` to `.gitignore`.
- The branch of record for this work is `main`: 1 commit ahead of `origin/main` (`283339b`,
  unpushed). Whatever branch happens to be checked out at any moment is not a STATE.md fact,
  check `git branch --show-current` directly.
- No automated verification gate exists (see `AGENTS.md`); nothing to run for this docs-only task.

## Open and reserved for Varun

- Whether to push `283339b` to `origin/main`.
- No other open items found in tracked files.

## Environment facts

- Deploy target: Vercel. `api/subscribe.js` is written as a Vercel serverless function
  (`export default async function handler(req, res)` under `api/`); it does not run under
  `node serve.mjs`.
- Storage: Airtable base `app40Sptn1IA6WmBQ`, table `Table 1` (both read directly from
  `api/subscribe.js`, already public in that file).
- Live URL: not stated in any tracked file; unknown from what's in the repo.
- Env var name in use (no value): `AIRTABLE_TOKEN`, read by `api/subscribe.js`.

Last verified: 2026-09-10
