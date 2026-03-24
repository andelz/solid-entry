# solid-entry — App Concept Guide for Google Stitch

## What is this app?

**solid-entry** is a non-technical onboarding web app. Its job: take a curious but non-developer user from knowing nothing about Solid to having a working personal data pod and their first connected app — in under 5 minutes.

**Solid** is an open web standard where users own their data in one central place (a "pod"), and apps connect to it with permission — instead of each app siloing your data.

---

## Target User

Technically curious, but not a developer. They understand "cloud storage" and "login with Google" — but not WebIDs, RDF, or ACL policies. All technical terms are replaced with plain language (e.g., "your web address" instead of "WebID URI").

---

## Brand / Visual Language

- **Primary color:** Deep purple (`#5B21B6`)
- **Accent:** Emerald green (`#10B981`)
- **Background:** Off-white (`#FAFAFA`), cards in white (`#FFFFFF`)
- **Typography:** Inter (body), JetBrains Mono (code/URLs)
- **Radii:** Rounded corners throughout (6px–20px, full-pill badges)
- **Tone:** Calm, empowering, modern — like a well-designed SaaS onboarding, not a government portal

---

## App Screens (in order)

### 1. Landing Page

**Purpose:** Explain Solid, build trust, drive signup.

- Hero: Bold headline ("Your data, your rules") + two CTAs: "Get your pod" and "I already have a pod"
- Three value panels: **Store** (it's yours), **Connect** (apps ask permission), **Switch** (data travels with you)
- Comparison grid: "Today" (fragmented data silos) vs "With Solid" (one home, many apps)
- Final CTA section at the bottom

---

### 2. Onboarding Wizard (5 steps, linear flow)

**Step 1 — Concept** ("What is a pod?")
Two side-by-side diagrams: today's silo model vs the Solid pod model. Three bullets, one CTA.

**Step 2 — Provider** ("Find your perfect pod provider")
A short quiz (3 questions) that recommends the right pod host. Questions cover: managed vs self-hosted, custom domain yes/no, CLI comfort. Result: highlighted recommended provider + alternatives.

**Step 3 — Create** ("Create your pod at [Provider]")
Summary card for chosen provider. Optional pod name input with live URL preview. Primary button opens the provider's registration page in a new tab. Secondary: "I've already created it, continue."

**Step 4 — Callback** ("Connect to your pod")
Three states: loading spinner → sign-in prompt → success celebration. On success: confetti animation, "Your pod is ready!", and the user's WebID displayed.

**Step 5 — Explore** ("You're in!")
Shows up to 6 real files/folders from the user's pod. Skeleton loaders while fetching. Four buttons pointing to next destinations: App Gallery, Pod Browser, Profile, Home.

---

### 3. Pod Browser (`/pod`, logged-in only)

**Purpose:** Let users navigate and manage their pod files.

- Breadcrumb navigation trail
- File/folder grid with icons, names, sizes, and permission badges (public / shared / private)
- Actions: create folder, upload file, delete with confirmation
- Empty state: friendly illustration + link to App Gallery

---

### 4. App Gallery (`/apps`)

**Purpose:** Discover apps that work with Solid pods.

- Filterable by category tabs
- App cards with name, description, category badge
- Static curated list of 6 Solid apps (MVP)

---

### 5. Profile (`/profile`, logged-in only)

**Purpose:** View and edit the user's pod profile.

- "Your web address" (WebID) displayed with copy button
- Editable display name with save button
- Links to Pod Browser, App Gallery, Sign out

---

## Key UX Principles

1. **No jargon** — "pod" is OK, "RDF/ACL/WebID URI" is not
2. **Linear by default** — the wizard pushes users forward; no dead ends
3. **Celebrate progress** — confetti on pod connection success
4. **Graceful loading** — skeleton loaders, not blank screens
5. **Permission transparency** — files always show public/shared/private badge

---
