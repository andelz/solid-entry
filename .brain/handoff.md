# Handoff — solid-entry

> This file is **overwritten** at the end of every session by `/wrap-up`.

## Last updated
2026-03-22

## What was done this session
- No new code changes this session — reviewed existing brain files and confirmed state
- Previous session completed the full MVP: Angular 21 app with all 5 onboarding steps, pod browser, app gallery, profile page, all core services, shared components, build passing cleanly

## Current state
- Branch: master
- In-progress PR / ticket: none
- Files actively being changed: none — initial implementation complete, all changes uncommitted (untracked new files + modified scaffold files)

## Open questions / blockers
- Auth flow not yet tested against a real Solid provider (solidcommunity.net). `step-provider` uses `ngModel` with signal via `$any(this).hosting` hack — consider switching to a `get/set` accessor pattern for cleaner binding.
- `ProfileService` uses hardcoded FOAF URIs for `bio`, `img`, `homepage` because `FOAF.bio` etc. don't exist on the `@inrupt/vocab-common-rdf` v1 type — worth checking if v2 adds them.
- Phase 2 features (file upload UI refinement, profile editor, ACL manager) not started.

## What to do next
1. Test the full auth flow end-to-end against `https://solidcommunity.net`
2. Fix `ngModel`/signal binding in `StepProviderComponent` — replace `$any(this).hosting` with getter/setter or a plain string property synced to the signal
3. Verify `@inrupt/vocab-common-rdf` exports for FOAF bio/img/homepage in installed version
4. Start Phase 2: pod file upload UI, profile editor, permission/ACL manager
