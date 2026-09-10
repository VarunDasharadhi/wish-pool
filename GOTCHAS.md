# GOTCHAS

One line each, added the moment something burns a session.

This file is an index, not an archive. It is read by every session at startup and is size-capped
(see `.githooks/pre-commit`), so anything needing more than a line or two lives in
`docs/gotchas/<slug>.md` with a pointer left here. Every gotcha is still listed, so nothing gets
rediscovered the hard way; you only pay for the detail when it is actually relevant.

## Gotchas

- Local dev (`node serve.mjs`) has no `/api/*` routing, so a form submit against it 404s on
  `/api/subscribe` and never reaches Airtable. See `AGENTS.md`'s Stack and run commands section.
