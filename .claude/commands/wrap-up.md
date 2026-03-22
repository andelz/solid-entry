---
description: End a session by updating the persistent brain files. Usage: /wrap-up
---

You are wrapping up a work session. Update the persistent brain files so the next session has full context.

## Step 1 — Determine the module

This is a single-package repo. Brain path: `.brain/`

## Step 2 — Gather session context

Run `git diff HEAD` and `git status` to see what changed this session.
Read the current `.brain/handoff.md` and `.brain/execution-plan.md` to understand previous state.

## Step 3 — Overwrite .brain/handoff.md

Write a new `handoff.md` using this structure:

```
# Handoff — solid-entry

> This file is overwritten at session end by /wrap-up.

## Last updated
<today's date>

## What was done this session
- <bullet list>

## Current state
- Branch: <branch>
- In-progress PR / ticket: <if known, else "none">
- Files actively being changed: <key files, or "none">

## Open questions / blockers
- <or "None">

## What to do next
1. <most important next step>
2. ...
```

## Step 4 — Update .brain/execution-plan.md

- Mark completed steps as `[x]`
- Mark started-but-unfinished steps as `[~]`
- Unblock steps whose dependencies are now met
- Add new steps or epics discovered this session
- Move fully completed epics to the "Completed epics" section

## Step 5 — Update .brain/architecture.md (only if structure changed)

Update only if: new routes added, new services/components created, API surface changed, new gotchas discovered.
Skip otherwise — note "(skipped) architecture.md — no structural changes" in the confirmation.

## Step 6 — Append to .brain/decisions.md (only if new decisions were made)

Append a new ADR entry (increment the number) if an architectural decision was made this session. Skip otherwise.

## Step 7 — Confirm

Print:

### Wrapped up: solid-entry

- ✓ handoff.md — <one-line summary of what was done>
- ✓ execution-plan.md — <X steps completed, Y unblocked>
- ✓ or (skipped) architecture.md — <reason>
- ✓ or (skipped) decisions.md — <reason>

Next session: /resume
