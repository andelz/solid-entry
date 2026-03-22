# Execution Plan — solid-entry

> This file is **updated** at the end of every session by `/wrap-up`.

## Status legend
- `[ ]` pending
- `[~]` in progress
- `[x]` done
- `[!]` blocked (reason noted inline)

---

## Active work

## Epic: MVP — Initial implementation  [branch: master]

### Steps
- [x] Fix plan/onboarding.md (7 issues: derivePodUrl, APP_INITIALIZER, OnboardingService location, loading state, WAC fallback, provider list, ErrorService)
- [x] Install Solid dependencies (`@inrupt/solid-client-authn-browser`, `@inrupt/solid-client`, `@inrupt/vocab-common-rdf`)
- [x] Global styles + CSS variables (`src/styles.scss`)
- [x] Core models (`provider.model.ts`, `solid-app.model.ts`, `quiz.model.ts`)
- [x] Static data (`providers.data.ts`, `apps-registry.data.ts`)
- [x] Core services (`AuthService`, `PodService`, `OnboardingService`, `ProfileService`, `ErrorService`)
- [x] Auth guard (`authGuard` functional guard)
- [x] Shared components (`StepProgress`, `PermissionBadge`, `WebidDisplay`, `ErrorBanner`, `ConfirmDialog`)
- [x] Shared pipes (`FileIconPipe`, `FileSizePipe`)
- [x] `app.config.ts` with `APP_INITIALIZER` + routing
- [x] Landing page (`/`)
- [x] Onboarding wizard shell + steps 1–3 (concept, provider, create)
- [x] Onboarding steps 4–5 (callback, explore)
- [x] Pod file browser (`/pod`)
- [x] App gallery (`/apps`)
- [x] Profile page (`/profile`)
- [x] Build passes cleanly

---

## Epic: Polish & auth testing  [branch: master]

### Steps
- [ ] Test full OIDC auth flow against `solidcommunity.net`
- [ ] Fix `ngModel`/signal binding in `StepProviderComponent` (replace `$any(this)` hack with getter/setter)
- [ ] Verify `@inrupt/vocab-common-rdf` FOAF property names for bio/img/homepage
- [ ] Check pod browser on a real pod (verify container listing, breadcrumbs, permissions)
- [ ] Responsive layout pass (mobile breakpoints)

---

## Epic: Phase 2 features  [branch: tbd]

### Steps
- [ ] Pod browser: file upload progress indicator
- [ ] Pod browser: create folder via modal (replace `prompt()`)
- [ ] WebID profile viewer (photo, bio, website display)
- [ ] Profile editor: bio field + save
- [ ] ACL/permission visual manager
- [ ] Improved provider quiz recommendation (more providers)

---

## Epic: Phase 3 features  [branch: tbd]

### Steps
- [ ] Self-hosting wizard (Docker Compose generator for CSS)
- [ ] App connection flow (initiate auth from app gallery)
- [ ] Multi-pod support
- [ ] Notifications when apps write new data

---

## Completed epics

- **MVP — Initial implementation** — all steps done 2026-03-22
