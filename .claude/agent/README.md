# Persistent Brain — solid-entry

## The problem it solves

Claude Code sessions start with no memory of previous work. Without the brain system, every session begins with re-reading files to re-establish context. The persistent brain captures that context once and reloads it instantly via `/resume`.

---

## Brain file structure

All four files live in `.brain/` at the project root:

| File | Purpose | Updated by |
|------|---------|------------|
| `architecture.md` | Routes, services, key patterns, known gotchas | `/wrap-up` (only when structure changes) |
| `decisions.md` | ADR log — why things are the way they are | `/wrap-up` (only when new decisions are made) |
| `handoff.md` | Last session state: what was done, current branch, open questions, next steps | `/wrap-up` (overwrites every session) |
| `execution-plan.md` | Epic/step dependency graph with `[ ]` / `[~]` / `[x]` / `[!]` status | `/wrap-up` (updates step status each session) |

---

## Workflow

```
Start of session:  /resume
  → reads all 4 brain files
  → prints: where we left off, unblocked next steps, blockers

... do work ...

End of session:  /wrap-up
  → runs git diff/status
  → overwrites handoff.md
  → updates execution-plan.md step status
  → conditionally updates architecture.md and decisions.md
  → confirms what changed
```

---

## Seeded modules

| Module | Brain path | Seeded |
|--------|-----------|--------|
| `solid-entry` (whole repo) | `.brain/` | ✓ 2026-03-22 |

This is a single-package repo, so one brain covers everything.

---

## Rolling out to additional modules

If the project grows into a monorepo or gains separate packages, create a `.brain/` inside each new package and run `/wrap-up <module-name>` after the first session to populate it. Update the module map in `.claude/commands/resume.md` and `.claude/commands/wrap-up.md`.
