# Decisions — solid-entry

Architectural decisions and rationale. Each entry: **date · decision · why**.

---

## ADR-001 · Angular 21 standalone components, no NgModules
**Date:** pre-setup
**Decision:** All components are standalone (no `@NgModule`). Lazy routes use `loadComponent`.
**Why:** Reduces boilerplate, aligns with Angular 17+ recommended approach, enables fine-grained lazy loading per route/step.
**Consequence:** No shared module barrel — each component explicitly imports what it needs.

---

## ADR-002 · Plain CSS per component, no utility framework
**Date:** pre-setup
**Decision:** Component styles live in `.css` files; global tokens in `src/styles.scss`.
**Why:** Zero dependency on Tailwind/Bootstrap; keeps the bundle lean for a demo/onboarding app. Token system (`--color-primary`, `--radius-md`, etc.) provides consistency without a framework.
**Consequence:** More CSS to write by hand; compensated by the small component surface area.

---

## ADR-003 · Angular Signals for all reactive state
**Date:** pre-setup
**Decision:** Use `signal()` and `computed()` throughout — no BehaviorSubject or RxJS state management.
**Why:** Native Angular 21 primitive; no extra imports; simpler mental model for a small app.
**Consequence:** Services expose signals directly (e.g. `auth.isLoggedIn()`). Observables are only used for async pod calls (PodService returns `Observable` wrapping `from(promise)`).

---

## ADR-004 · APP_INITIALIZER handles OIDC redirect, not component ngOnInit
**Date:** pre-setup
**Decision:** `AuthService.initialize()` (which calls `handleIncomingRedirect()`) is registered as `APP_INITIALIZER`.
**Why:** Router waits for all initializers to settle, so by the time `StepCallbackComponent` renders, the auth state is already resolved. Avoids a race condition where the component renders before the OIDC callback is processed.
**Consequence:** `StepCallbackComponent` only reads `auth.isLoggedIn()` — it never calls `handleIncomingRedirect()` itself.

---

## ADR-005 · getPodUrlAll() instead of WebID string manipulation
**Date:** pre-setup
**Decision:** Use `getPodUrlAll(webId, { fetch })` from `@inrupt/solid-client` to resolve the pod URL.
**Why:** The `/profile/card#me` string-replace convention only works for some providers (NSS). ESS, CSS, and use.id may use different WebID structures.
**Consequence:** Pod URL resolution is async; falls back to convention derivation on network error to stay usable offline/dev.

---

## ADR-006 · All @inrupt/* calls go through services, never components
**Date:** pre-setup
**Decision:** Components never import from `@inrupt/*`. All Solid I/O is in `AuthService`, `PodService`, `ProfileService`.
**Why:** Keeps components testable without Solid mocks; centralises error handling in `ErrorService`; makes provider swaps a one-file change.
**Consequence:** Components are thin — they call service methods and bind to service signals/Observables.

---

## ADR-007 · WAC permissions with fallback for non-WAC pods
**Date:** pre-setup
**Decision:** `PodService.getPermissions()` catches 403/404 on ACL fetch and returns `'private'` as fallback.
**Why:** Not all Solid pods support WAC (Web Access Control) — ESS uses ACP instead. Crashing on ACL unavailability would break the pod browser for many users.
**Consequence:** Permission badge shows `Private` conservatively when ACL is unavailable; no false "Public" labels.

<!-- Add new decisions below -->
