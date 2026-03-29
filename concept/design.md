# Obsidian Mono Design System

### 1. Overview & Creative North Star
**Creative North Star: The Brutalist Curator**

Obsidian Mono is a design system built on the principles of high-end editorial minimalism and architectural brutalism. It rejects the "app-like" standard of colorful icons and soft shadows in favor of aggressive typographic scales, a strictly monochromatic palette, and a focus on negative space. The goal is to create a digital environment that feels like a premium print magazine—intentional, quiet, and authoritative. 

The system breaks standard grids through intentional asymmetric spacing and uses high-contrast typography to drive the hierarchy, rather than relying on heavy containers or dividers.

### 2. Colors
The palette is rooted in deep charcoals and stark whites, utilizing the `monochrome` variant to ensure all secondary and tertiary accents remain within the grayscale spectrum.

- **Primary Role:** Solid black (`#262626`) or dark slate serves as the core brand anchor.
- **The "No-Line" Rule:** Sectioning is never achieved through 1px solid lines. Instead, boundaries are created through shifting background tones (e.g., `surface` to `surface_container_low`) or significant padding. 
- **Surface Hierarchy:** Depth is strictly flat-layered. The background (`#191919`) sits at the base, with `surface_container` used for card backgrounds and elevated components.
- **Glass & Gradient:** Navigation bars and headers must use `backdrop-blur-md` with 80-90% opacity rather than solid fills to maintain a sense of environmental continuity.

### 3. Typography
The typography system uses **Manrope** across all roles to maintain a unified, modern-geometric feel. The hierarchy is driven by extreme weight and scale shifts.

- **Display (Hero):** 3.75rem (60px), Extrabold, Tracking-tighter. This is the primary visual anchor of a screen.
- **Headlines/Titles:** 1.125rem (18px) to 1rem (16px), Bold. Used for content titles and card headings.
- **Labels (Micro-Copy):** 0.875rem (14px) and 0.625rem (10px). For metadata, labels use uppercase with wide tracking (`tracking-widest`) to create a distinct architectural look.
- **Body:** 1rem, Regular/Medium. Optimized for legibility with a `leading-snug` line height.

### 4. Elevation & Depth
Elevation in Obsidian Mono is achieved through **Tonal Layering** and transparency, not traditional drop shadows.

- **The Layering Principle:** Depth is conveyed by "stacking" dark surfaces. A `surface_container_low` card sits on a `background` base. 
- **Ambient Shadows:** While the system avoids traditional shadows, a subtle `box-shadow` with 0px blur may be used for specific floating action buttons if contrast is insufficient.
- **Glassmorphism:** Navigation and Header elements use a `backdrop-blur` of 12px to 20px to suggest a frosted obsidian layer floating over the content.
- **Ghost Borders:** If a separator is required, use `primary/5` (very low opacity) to create a "ghost line" that is felt rather than seen.

### 5. Components
- **Buttons:** Primary buttons are pill-shaped or rounded-xl with high-contrast fills. Secondary buttons use a circular `size-10` format with a subtle `outline-variant` border.
- **Cards:** Aspect-ratio locked (1:1 for featured, 16:9 for secondary). Imagery should be high-contrast or monochrome to match the theme.
- **Progress/Metadata:** Small caps, 10px font size, enclosed in a 1px border with minimal padding—reminiscent of technical documentation.
- **Navigation:** Fixed bottom bar using the "Glassmorphism" rule. Active states are indicated by filled icons; inactive states by 40% opacity.

### 6. Do's and Don'ts
**Do:**
- Use extreme white space between sections (Spacing level 3).
- Use `uppercase` and `tracking-widest` for all secondary headers.
- Lean into monochromatic imagery.

**Don't:**
- Use vibrant accent colors for anything other than critical errors.
- Use traditional "soft" drop shadows.
- Add borders to cards; let the background color shift do the work.
- Use more than one typeface; let Manrope's weights handle the expression.