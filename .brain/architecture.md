# Architecture — solid-entry

## Overview
A non-technical onboarding web app that guides a user from zero to a working Solid pod and first connected app in under 5 minutes. Built with Angular 21 standalone components, all Solid I/O routed through services.

**Root:** `src/app/`
**Build:** `npm run build` (or `npx ng build`)
**Dev server:** `npm start` → http://localhost:3107
**Test:** `npm test`

---

## Route map

| Path | Component | Auth required |
|------|-----------|---------------|
| `/` | `LandingComponent` | No |
| `/onboarding` | `OnboardingComponent` (shell) | No |
| `/onboarding/concept` | `StepConceptComponent` | No |
| `/onboarding/provider` | `StepProviderComponent` | No |
| `/onboarding/create` | `StepCreateComponent` | No |
| `/onboarding/callback` | `StepCallbackComponent` | No |
| `/onboarding/explore` | `StepExploreComponent` | No |
| `/pod` | `PodBrowserComponent` | Yes (`authGuard`) |
| `/apps` | `AppGalleryComponent` | No |
| `/profile` | `ProfileComponent` | Yes (`authGuard`) |

---

## Core services

| Service | Responsibility |
|---------|---------------|
| `AuthService` | OIDC login/logout via `@inrupt/solid-client-authn-browser`; `isLoggedIn`, `webId`, `podUrl` signals; `initialize()` called by `APP_INITIALIZER` before any route renders |
| `PodService` | All `@inrupt/solid-client` pod I/O (list, upload, delete, permissions); returns Observables wrapping promises |
| `OnboardingService` | Wizard state: selected provider, quiz answers, desired pod name, current step index |
| `ProfileService` | WebID profile read/write via `@inrupt/solid-client` |
| `ErrorService` | Central error signal; `handle(err)` maps HTTP status → friendly message; displayed by `ErrorBannerComponent` |

---

## Key patterns

- **`APP_INITIALIZER`** calls `AuthService.initialize()` → `handleIncomingRedirect()` settles before any route renders, so `StepCallbackComponent` just reads `auth.isLoggedIn()` — no second redirect call needed.
- **Never import `@inrupt/*` in components.** All Solid calls go through `PodService` / `ProfileService` / `AuthService`.
- **`getPodUrlAll(webId)`** is used instead of string-replacing the WebID — provider-agnostic pod URL resolution. Falls back to convention derivation on network error.
- **Signals everywhere** (`signal`, `computed`) — no BehaviorSubjects or RxJS state management.
- **Plain CSS per-component** — no utility framework. CSS variables defined in `src/styles.scss` (`:root` block), no magic numbers in component CSS.
- **Lazy-loaded routes** — every feature component is `loadComponent: () => import(...)`, including all 5 onboarding steps.
- **`authGuard`** redirects to `/onboarding` if not logged in.
- **WAC permissions fallback** — `PodService.getPermissions()` catches ACL 403/404 (pods without WAC support) and returns `'private'`.

---

## Shared components

| Component | Location |
|-----------|----------|
| `StepProgressComponent` | `shared/components/step-progress/` |
| `PermissionBadgeComponent` | `shared/components/permission-badge/` |
| `WebidDisplayComponent` | `shared/components/webid-display/` |
| `ErrorBannerComponent` | `shared/components/error-banner/` (in `app.html`) |
| `ConfirmDialogComponent` | `shared/components/confirm-dialog/` |
| `FileIconPipe` | `shared/pipes/file-icon.pipe.ts` |
| `FileSizePipe` | `shared/pipes/file-size.pipe.ts` |

---

## Static data

| File | Contents |
|------|----------|
| `core/data/providers.data.ts` | 5 Solid providers + `recommendProvider()` quiz logic |
| `core/data/apps-registry.data.ts` | 6 curated Solid apps + `APP_CATEGORIES` |

---

## Installed Solid dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@inrupt/solid-client-authn-browser` | ^3.1.1 | OIDC login/logout, session fetch |
| `@inrupt/solid-client` | ^3.0.0 | Pod read/write, ACL, profile |
| `@inrupt/vocab-common-rdf` | ^1.0.5 | FOAF/RDF term helpers |

> Note: the plan used `@inrupt/solid-authn-browser` (old name) — actual package is `@inrupt/solid-client-authn-browser`.

---

## i18n / assets

No i18n currently. Assets (favicon) in `public/`. No image assets — app uses inline SVG and emoji icons throughout.
