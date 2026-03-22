# solid-entry — Claude Code Guide

## Project overview

A non-technical onboarding app that guides a user from zero to a working [Solid](https://solidproject.org) pod and first connected app in under 5 minutes.

**Target user:** Technically curious but not a developer.
**Dev server:** `npm start` → http://localhost:3107
**Build:** `npm run build`

---

## Critical rules

1. **Never import `@inrupt/*` in components.** All Solid I/O goes through `AuthService`, `PodService`, or `ProfileService`.
2. **`APP_INITIALIZER` handles OIDC.** `AuthService.initialize()` is called before any route renders — `StepCallbackComponent` only reads `auth.isLoggedIn()`, never calls `handleIncomingRedirect()` directly.
3. **Signals, not Subjects.** State is `signal()` / `computed()`. Observables are only used for async pod calls in services.
4. **Plain CSS.** Component styles use CSS variables from `src/styles.scss`. No utility classes, no magic numbers.
5. **No copy for non-technical users should say "RDF", "Turtle", "WebID URI", or "ACL".** Use "your web address", "your data home", "permission" instead.

---

## Persistent brain (session memory)

The brain lives in `.brain/` at the project root:

```
.brain/
  architecture.md      ← routes, services, patterns, gotchas
  decisions.md         ← ADRs: why things are the way they are
  handoff.md           ← last session state (overwritten by /wrap-up)
  execution-plan.md    ← in-progress work and dependency graph
```

**Two slash commands manage the lifecycle:**
- `/resume` — start of session: reads the brain and gives a structured briefing
- `/wrap-up` — end of session: updates all four brain files

**Always start a session with `/resume` and end it with `/wrap-up`.**

---

## MVP scope (Phase 1 — complete)

- [x] Landing page with explainer panels
- [x] Onboarding wizard — all 5 steps
- [x] `AuthService` with OIDC login/logout
- [x] Pod file browser (read + write)
- [x] App gallery (static data)

## Phase 2 (next)

- [ ] Profile viewer and editor (bio, photo, website)
- [ ] ACL/permission visual manager
- [ ] Pod browser: replace `prompt()` with modal for folder creation

## Phase 3

- [ ] Self-hosting wizard
- [ ] App connection flow from gallery
- [ ] Multi-pod support
