# Solid Pod Onboarding App — Build Plan
## Project Overview
A web application that dramatically reduces the friction of getting started with [Solid]
(https://solidproject.org). The app guides a non-technical user from zero knowledge to a working pod with
at least one app connected, in under 5 minutes.
**Target user:** Technically curious but not a developer. Understands concepts like "cloud storage" and
"login with Google" but has never heard of WebID or RDF.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Angular 17+ (standalone components) | Strong typing, DI, routing built-in |
| Styling | Plain CSS (per-component `.css` files) | No utility framework dependencies |
| Solid Auth | `@inrupt/solid-authn-browser` | Official Inrupt OIDC library |
| Solid Data | `@inrupt/solid-client` | Read/write pod data |
| Solid Vocab | `@inrupt/vocab-common-rdf` | RDF term helpers |
| Animation | CSS transitions & `@keyframes` only | No JS animation libraries |
| State | Angular Signals + Services | Native Angular, no extra libs |
| Icons | Inline SVG sprites | Zero dependency |

---

## Project Scaffold
```bash
ng new solid-onboarding --routing --style=css --standalone
cd solid-onboarding
npm install @inrupt/solid-authn-browser @inrupt/solid-client @inrupt/vocab-common-rdf
```

---

## Application Structure
```
src/
app/

core/
services/
auth.service.ts # Session management, login/logout
pod.service.ts # Pod read/write operations
profile.service.ts # WebID profile helpers
acl.service.ts # ACL/permission helpers
guards/
auth.guard.ts # Redirect to /onboarding if not logged in
models/
provider.model.ts
solid-app.model.ts
quiz.model.ts
data/
providers.data.ts # Static provider registry
apps-registry.data.ts # Curated Solid app list
features/
landing/
landing.component.ts
landing.component.html
landing.component.css
onboarding/
onboarding.component.ts # Wizard shell with step routing
onboarding.component.html
onboarding.component.css
steps/
step-concept/
step-concept.component.ts
step-concept.component.html
step-concept.component.css
step-provider/
step-provider.component.ts
step-provider.component.html
step-provider.component.css
step-create/
step-create.component.ts
step-create.component.html
step-create.component.css
step-callback/
step-callback.component.ts
step-callback.component.html
step-callback.component.css

step-explore/
step-explore.component.ts
step-explore.component.html
step-explore.component.css
pod-browser/
pod-browser.component.ts
pod-browser.component.html
pod-browser.component.css
file-card/
file-card.component.ts
file-card.component.html
file-card.component.css
app-gallery/
app-gallery.component.ts
app-gallery.component.html
app-gallery.component.css
app-card/
app-card.component.ts
app-card.component.html
app-card.component.css

profile/
profile.component.ts
profile.component.html
profile.component.css

shared/
components/
step-progress/
step-progress.component.ts
step-progress.component.html
step-progress.component.css
webid-display/
webid-display.component.ts
webid-display.component.html
webid-display.component.css
permission-badge/
permission-badge.component.ts
permission-badge.component.html
permission-badge.component.css
confirm-dialog/

confirm-dialog.component.ts
confirm-dialog.component.html
confirm-dialog.component.css
pipes/
file-icon.pipe.ts # Maps content-type to icon name
file-size.pipe.ts # Formats bytes to human-readable
styles/
global.css # CSS variables, reset, base typography
layout.css # Grid and flex utilities (hand-written)
components.css # Shared component base styles
```

---

## Routing
```typescript
// app.routes.ts
export const routes: Routes = [
{ path: '', loadComponent: () => import('./features/landing/landing.component') },
{
path: 'onboarding',
loadComponent: () => import('./features/onboarding/onboarding.component'),
children: [
{ path: '', redirectTo: 'concept', pathMatch: 'full' },

{ path: 'concept', loadComponent: () => import('./features/onboarding/steps/step-concept/step-
concept.component') },

{ path: 'provider', loadComponent: () => import('./features/onboarding/steps/step-provider/step-
provider.component') },

{ path: 'create', loadComponent: () => import('./features/onboarding/steps/step-create/step-
create.component') },

{ path: 'callback', loadComponent: () => import('./features/onboarding/steps/step-callback/step-
callback.component') },

{ path: 'explore', loadComponent: () => import('./features/onboarding/steps/step-explore/step-
explore.component') },

]
},
{ path: 'pod', loadComponent: () => import('./features/pod-browser/pod-browser.component'),
canActivate: [authGuard] },
{ path: 'apps', loadComponent: () => import('./features/app-gallery/app-gallery.component') },
{ path: 'profile', loadComponent: () => import('./features/profile/profile.component'), canActivate:
[authGuard] },

{ path: '**', redirectTo: '' }
];
```

---

## Feature Breakdown

### 1. Landing Page (`/`)
**Goal:** Establish the mental model in 30 seconds.

- Hero section with tagline: *"Your data, your rules. A home for everything you create online."*
- 3-panel explainer using CSS Grid (animated with `@keyframes` fade-in on scroll via
`IntersectionObserver`):
1. **Store** — Your data lives in your pod, not inside apps
2. **Connect** — Apps ask your pod for permission
3. **Switch** — Move to a new app any time, data comes with you
- CTA: "Get your pod" → `/onboarding`
- Secondary CTA: "I already have a pod" → triggers login flow
**Copy guidance:** Never use "RDF", "Turtle", "WebID URI", or "ACL" on this page. Use "your web address",
"your data home", "permission".

---

### 2. Onboarding Wizard (`/onboarding`)

A step-by-step flow with a persistent `<app-step-progress>` bar at the top. The wizard shell uses `<router-
outlet>` for child steps, with forward/back controls managed by `OnboardingService`.

#### Step 1 — What Is a Pod? (`/onboarding/concept`)
- Pure HTML/CSS SVG diagram comparing app-silo model vs. Solid pod model
- 3 plain-English bullet points
- Single "Got it, let's go →" button advancing to Step 2
- Animate diagram panels in with CSS `@keyframes slideInUp`
#### Step 2 — Choose Your Provider (`/onboarding/provider`)
**Quiz — 3 questions rendered as styled radio button groups:**
| Question | Option A | Option B |

|---|---|---|
| Hosting preference | Managed for me | I'll self-host |
| Custom domain? | No, keep it simple | Yes, I have a domain |
| Command-line comfort | Not really | Yes |
On "Next", compute recommendation from `providers.data.ts` and display a single highlighted
`ProviderCard` plus 1–2 alternatives. Persist selection to `OnboardingService`.
**Provider model:**
```typescript
// core/models/provider.model.ts
export interface Provider {
id: string;
name: string;
url: string;
registrationUrl: string;
oidcIssuer: string;
description: string;
selfHosted: boolean;
customDomain: boolean;
difficulty: 'easy' | 'medium' | 'advanced';
tags: string[];
logoUrl: string;
}
```

Initial providers: **solidcommunity.net**, **use.id**, **trinpod.us**, **redpencil.io** (self-host), **CSS / Community Solid Server** (advanced self-host).

> **Note:** `inrupt.net` (PodSpaces) was deprecated — replaced with `use.id`. Verify all provider registration URLs are live before launch.
#### Step 3 — Create Your Pod (`/onboarding/create`)
- Display selected provider card
- Plain-English explanation of what happens next
- Vanity URL preview field: user types desired pod name, preview updates live (e.g.
`https://[input].solidcommunity.net/`)
- "Create my pod at [Provider] →" opens provider registration in a new tab
- "I've already created it, continue →" advances to Step 4
#### Step 4 — Connect & Verify (`/onboarding/callback`)
- `ngOnInit` reads auth state from `AuthService` (already resolved by `APP_INITIALIZER`)
- If already logged in, immediately render success state — no additional redirect handling needed here
- "Sign in to your pod" button triggers login via `AuthService`

- **Loading state** (shown while `APP_INITIALIZER` is settling on initial page load, or briefly after button click before redirect):
  - Spinner (CSS `@keyframes` rotating ring) centered in the step panel
  - Text: "Checking your pod connection…"
  - Use a `checking = signal<boolean>(true)` that flips to `false` once `AuthService.session()` is non-null or the initializer has settled

- **Success state:**

- CSS confetti effect (pure CSS `@keyframes` — falling colored shapes using `::before`/`::after` pseudo-elements on up to 20 `<span>` tags — cap at 20 to avoid layout jank)

- Display: "🎉 Welcome, [name]! Your pod is ready."
- Show WebID as "your web address" with a copy-to-clipboard button
- **Error state:** Descriptive message + retry button
#### Step 5 — Explore Your Pod (`/onboarding/explore`)
- Minimal pod file browser showing top-level containers
- "Connect your first app →" CTA to `/apps`
- "View your profile →" secondary link

---

### 3. Pod File Browser (`/pod`)
**Goal:** Make the pod feel like a familiar file manager.
**Layout:** Two-column CSS Grid — sidebar (folder tree) + main panel (resource grid).
- Sidebar: recursive container tree built from `getContainedResourceUrlAll()`
- Main panel: `<app-file-card>` grid — each card shows:
- Inline SVG icon (by content type)
- Resource name (strip full URL to filename)
- Last modified date
- `<app-permission-badge>` (Public / Private / Shared)
- Breadcrumb navigation using Angular Router params
- Toolbar: New Folder, Upload File, Copy URL, Delete (with `<app-confirm-dialog>`)
- Skeleton loader: CSS animated `background: linear-gradient` shimmer on placeholder cards while
fetching
- Empty state: centred illustration + "Your pod is empty. Connect an app to get started."

**Implementation notes:**
- Use `getSolidDataset()`, `getContainedResourceUrlAll()`, `isContainer()` from `@inrupt/solid-client`
- Use `getResourceAcl()` to derive permission badge value
- Filter out internal Solid metadata files (`.acl`, `.meta`) from the displayed list
- All pod calls go through `PodService` — never call `@inrupt` directly from components

---

### 4. App Gallery (`/apps`)

**Goal:** Show users what they can *do* with a pod.
- Filter tabs: All / Productivity / Social / Health / Finance / Developer — styled as a plain `<nav>` with CSS
active state
- Responsive CSS Grid of `<app-app-card>` components

**App model:**
```typescript
// core/models/solid-app.model.ts
export interface SolidApp {
id: string;
name: string;
tagline: string;
url: string;
logoUrl: string;
category: string;
dataAccess: DataPermission[];
openSource: boolean;
status: 'stable' | 'beta' | 'experimental';
}
export interface DataPermission {
container: string; // e.g. "/contacts/"
description: string; // e.g. "Your contacts list"
access: 'read' | 'write' | 'read/write';
}
```

- Each card: logo, name, tagline, category badge, permission chips, "Open App" button
- Expandable "What will this app access?" section using `<details>`/`<summary>` HTML elements — no JS
needed
- No auth required to browse
**Initial apps:** Penny (finance), Mashlib / Data Browser, Solid Focus (tasks), Media Kraken (movies),
Darcy Social, GraphMetrix.

---

### 5. WebID Profile (`/profile`)
- Display WebID URL in a styled `<code>` block with copy button
- Profile fields from WebID document: name, photo, bio, website
- Edit form using Angular Reactive Forms — writes back via `ProfileService` using `@inrupt/solid-client`

- "Share your WebID" section with copy button and an SVG QR code (generate client-side with `qrcode` npm package — **Phase 2 only**, omit from MVP to keep the dependency count down)
- `<details>` element for "What is a WebID?" explainer

---

## Core Services

### AuthService (`core/services/auth.service.ts`)
```typescript
import { Injectable, signal } from '@angular/core';
import {
login, logout, handleIncomingRedirect,
getDefaultSession, Session
} from '@inrupt/solid-authn-browser';
import { getPodUrlAll } from '@inrupt/solid-client';
@Injectable({ providedIn: 'root' })
export class AuthService {
session = signal<Session | null>(null);
webId = signal<string | null>(null);
podUrl = signal<string | null>(null);
async initialize(): Promise<void> {
await handleIncomingRedirect({ restorePreviousSession: true });
const s = getDefaultSession();
this.session.set(s);
if (s.info.isLoggedIn && s.info.webId) {
this.webId.set(s.info.webId);
// Use getPodUrlAll() — derivePodUrl() string-replace is unreliable across providers
const podUrls = await getPodUrlAll(s.info.webId, { fetch: s.fetch });
this.podUrl.set(podUrls[0] ?? null);
}
}
async loginWithProvider(oidcIssuer: string): Promise<void> {
await login({
oidcIssuer,
redirectUrl: `${window.location.origin}/onboarding/callback`,
clientName: 'Solid Onboarding',
});
}
async logout(): Promise<void> {
await logout();
this.session.set(null);
this.webId.set(null);
this.podUrl.set(null);
}
}
```

Call `authService.initialize()` in `APP_INITIALIZER` so auth state is ready before any route renders.

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: AuthService) => () => auth.initialize(),
      deps: [AuthService],
      multi: true,
    },
  ],
};
```

> **Important:** `APP_INITIALIZER` factories must return a function that returns a `Promise` (or `Observable`). The router will not resolve any route until all initializers settle, so `handleIncomingRedirect()` — and therefore the OIDC callback — is guaranteed to complete before `step-callback` renders.
### PodService (`core/services/pod.service.ts`)
Wraps `@inrupt/solid-client` calls. All methods return typed Observables (wrap promises with `from()`).
Key methods:
- `listContainer(url: string): Observable<ResourceInfo[]>`
- `readResource(url: string): Observable<string>`
- `createContainer(url: string): Observable<void>`
- `uploadFile(containerUrl: string, file: File): Observable<void>`
- `deleteResource(url: string): Observable<void>`
- `getPermissions(url: string): Observable<'public' | 'private' | 'shared'>`
  - Use `getResourceAcl()` where available; catch 403/404 ACL fetch failures and fall back to `'private'` — not all pods support WAC (e.g. ESS uses ACP instead)
### OnboardingService (`core/services/onboarding.service.ts`)

> Moved to `core/services/` to match its `providedIn: 'root'` scope. Do not place root-scoped services inside a feature folder — it implies feature-level lifetime but delivers app-level lifetime, which is misleading.

```typescript
@Injectable({ providedIn: 'root' })
export class OnboardingService {
  steps = ['concept', 'provider', 'create', 'callback', 'explore'];
  currentStep = signal<number>(0);
  selectedProvider = signal<Provider | null>(null);
  quizAnswers = signal<QuizAnswers | null>(null);
  desiredPodName = signal<string>('');
}
```

---

## Global CSS Architecture

```css
/* styles/global.css */
:root {
--color-primary: #5B21B6;
--color-primary-light: #7C3AED;
--color-accent: #10B981;
--color-danger: #EF4444;
--color-bg: #FAFAFA;
--color-surface: #FFFFFF;
--color-border: #E5E7EB;
--color-text: #111827;
--color-text-muted: #6B7280;

--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-full: 9999px;
--shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
--shadow-md: 0 4px 16px rgba(0,0,0,0.10);
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
font-family: var(--font-sans);
background: var(--color-bg);
color: var(--color-text);
line-height: 1.6;
}
```

All component `.css` files use these variables — no magic numbers.

---

## Auth Guard

```typescript
// core/guards/auth.guard.ts
export const authGuard: CanActivateFn = () => {
const auth = inject(AuthService);
const router = inject(Router);
if (auth.session()?.info.isLoggedIn) return true;
return router.createUrlTree(['/onboarding']);
};
```

---

## Error Handling Standards
Centralise in a shared `ErrorService`. Map common Solid errors to user-friendly messages:
| HTTP Status | User message |
|---|---|
| 401 | "You need to sign in to access this." |
| 403 | "You don't have permission to access this resource." |
| 404 | "This resource doesn't exist in your pod." |
| Network error | "Can't reach your pod right now. Check your connection." |
Display errors via a top-of-page `<app-error-banner>` component, not alert dialogs.

### ErrorService (`core/services/error.service.ts`)
```typescript
@Injectable({ providedIn: 'root' })
export class ErrorService {
  readonly error = signal<string | null>(null);

  handle(err: unknown): void {
    if (err instanceof Response || (err as any)?.status) {
      const status = (err as any).status;
      const messages: Record<number, string> = {
        401: 'You need to sign in to access this.',
        403: "You don't have permission to access this resource.",
        404: "This resource doesn't exist in your pod.",
      };
      this.error.set(messages[status] ?? 'Something went wrong. Please try again.');
    } else if (err instanceof TypeError) {
      // fetch() throws TypeError on network failure
      this.error.set("Can't reach your pod right now. Check your connection.");
    } else {
      this.error.set('Something went wrong. Please try again.');
    }
  }

  clear(): void {
    this.error.set(null);
  }
}
```
All `PodService` and `ProfileService` methods must pipe errors through `ErrorService.handle()`. The `<app-error-banner>` component reads `errorService.error()` and renders when non-null.

---

## Accessibility Requirements
- All interactive elements keyboard navigable
- `aria-label` on all icon-only buttons
- Visible `:focus-visible` ring on all focusable elements (defined in `global.css`)
- Color is never the only state indicator — always pair with icon or text
- `role="status"` on loading indicators
- Minimum contrast ratio 4.5:1 for all text

---

## Environment Configuration
```typescript
// src/environments/environment.ts

export const environment = {
production: false,
defaultOidcIssuer: 'https://solidcommunity.net',
appName: 'Solid Onboarding',
appUrl: 'http://localhost:4200',
};
```

---

## MVP Scope vs. Future Phases
### MVP (build first)
- [ ] Landing page with explainer panels
- [ ] Onboarding wizard — all 5 steps
- [ ] `AuthService` with OIDC login/logout
- [ ] Pod file browser (read-only, top 2 levels)
- [ ] App gallery (static data, no auth required)
### Phase 2
- [ ] Pod file browser: upload, create folder, delete
- [ ] WebID profile viewer and editor
- [ ] Permission/ACL visual manager
- [ ] Improved provider quiz recommendation algorithm
### Phase 3
- [ ] Self-hosting wizard (Docker Compose generator for CSS)
- [ ] App connection flow (initiate auth from gallery)
- [ ] Multi-pod support
- [ ] Notifications when apps write new data to pod

---

## Key Dependencies
```json
{
"@angular/core": "^17.x",
"@inrupt/solid-authn-browser": "^2.x",
"@inrupt/solid-client": "^2.x",
"@inrupt/vocab-common-rdf": "^1.x",
"qrcode": "^1.x"
}

```

---

## Getting Started — Instructions for Claude Code
1. Scaffold: `ng new solid-onboarding --routing --style=css --standalone`

2. Install Solid deps: `npm install @inrupt/solid-authn-browser @inrupt/solid-client @inrupt/vocab-
common-rdf qrcode`

3. Create `src/styles/global.css` with CSS variables first — all components depend on these
4. Register `APP_INITIALIZER` in `app.config.ts` to call `AuthService.initialize()` on startup
5. Build in this order:
- Global styles + shared components (`StepProgress`, `PermissionBadge`)
- Landing page
- Onboarding wizard shell + Steps 1–3 (no auth needed to build/test)
- `AuthService` + Step 4 (test against `solidcommunity.net`)
- Pod file browser (read-only first)
- App gallery
6. Test the full auth flow against `https://solidcommunity.net`
7. All `@inrupt/*` calls must go through services — never import them directly in components