# Chaos Portal — Architecture Map

Working reference for the current repo layout, style system, and component inventory.

---

## Index

- [Repo Overview](#repo-overview)
- [Directory Tree](#directory-tree)
- [Styles System](#styles-system)
  - [Import Hub (global.css)](#import-hub)
  - [Tokens & Base](#tokens--base)
  - [Patterns](#patterns)
  - [Component Styles](#component-styles)
  - [Site Shell (remains in global.css)](#site-shell)
  - [Rules: Where to Put New CSS](#rules-where-to-put-new-css)
- [Components](#components)
  - [ExpandingCards](#expandingcards)
  - [Tabs](#tabs)
  - [FlipCard](#flipcard)
  - [CoordinatePicker](#coordinatepicker)
  - [Accordion (pattern, not component)](#accordion)
- [Pages](#pages)
- [Layout](#layout)
- [Style Guide](#style-guide)
- [Common Tasks](#common-tasks)
  - [Add a New Pattern](#add-a-new-pattern)
  - [Add a New Component + CSS](#add-a-new-component--css)
  - [Add a New Page](#add-a-new-page)
  - [Update Navigation](#update-navigation)
- [Decision Chart: Where Do I Put This?](#decision-chart-where-do-i-put-this)

---

## Repo Overview

**Chaos Portal** is a static Astro site deployed to GitHub Pages.

- **Framework:** Astro 5 (static output, no SSR)
- **Hosting:** `https://danielleackerman.github.io/chaos-portal/`
- **Base path:** `/chaos-portal` (set in `astro.config.mjs`)
- **Search:** Pagefind (runs post-build, indexes `dist/`)
- **Dependencies:** Astro + Pagefind only. No React, no Tailwind, no runtime frameworks.
- **Data:** `src/data/library.js` exports `NAV_DATA` (auto-generated link catalog for the Library section)

---

## Directory Tree

```
chaos-portal/
├── astro.config.mjs
├── package.json
├── docs/
│   ├── spec/                  # Design specs and audits
│   └── versioning/            # Version notes
├── src/
│   ├── components/
│   │   └── ui/                # Astro UI components (4 files)
│   ├── data/
│   │   └── library.js         # Library link catalog
│   ├── layouts/
│   │   └── PortalLayout.astro # Shared page shell
│   ├── pages/                 # File-based routing
│   │   ├── index.astro
│   │   ├── compass/           # 8 Compass content pages + sub-pages
│   │   ├── library/           # Music + Story link libraries
│   │   ├── roadmap/
│   │   └── style-guide/
│   └── styles/
│       ├── global.css         # ← Import hub + site shell
│       ├── tokens.css         # CSS custom properties
│       ├── base.css           # Reset + element defaults + typography
│       ├── patterns/          # CSS-only shared patterns (9 files)
│       └── components/        # CSS paired with Astro components (5 files)
└── dist/                      # Build output (git-ignored)
```

---

## Styles System

### Import Hub

`src/styles/global.css` is the single entry point. It is imported once, in `src/layouts/PortalLayout.astro`. Every page uses `PortalLayout`, so every page gets all styles.

**Import order inside `global.css`:**

```
1. tokens.css          — CSS custom properties (:root variables)
2. base.css            — Reset, element defaults, typography

3. patterns/layout.css       — Grids, wrappers, page shells
4. patterns/cards.css        — Card chrome (link-card, cat-card, compass-card, etc.)
5. patterns/content.css      — Table wrappers, checklists
6. patterns/hero.css         — Page hero variants
7. patterns/callouts.css     — Callout system
8. patterns/breadcrumb.css   — Breadcrumb nav
9. patterns/tags.css         — Inline tokens, status tags
10. patterns/section-nav.css — Section nav, prev/next, page-nav-card
11. patterns/dimension-card.css — Dimension cards, crosswalks, structural containers

12. components/tabs.css             — Tabs + pill tabs + mobile
13. components/accordion.css        — Accordion + controls
14. components/expanding-cards.css  — ExpandingCards + slotted variant + tabs-inside-cards
15. components/flip-card.css        — FlipCard + flip-card-strip grid
16. components/coordinate-picker.css — CoordinatePicker widget

[inline] Site shell CSS (header, sidebar, footer, search modal, back-to-top, animations)
```

Order matters: tokens first so variables resolve everywhere; patterns before components so component overrides win.

### Tokens & Base

| File | Contents |
|------|----------|
| `tokens.css` | All `:root` and `.dark-mode` custom properties: colors, typography tokens, spacing scale, radii, shadows, gradients, dimension depth scale (`--dim-0`…`--dim-5`), position intensity scale (`--pos-12`…`--pos-9`) |
| `base.css` | Universal reset (`*`), element defaults (`body`, `h1`–`h6`, `a`, `p`, `blockquote`, `code`, `hr`), base typography rules, eyebrow classes, element-level table styles (`table`, `th`, `td`, `thead`, `tbody`) |

### Patterns

Patterns are **CSS-only** — plain HTML with classes, no `.astro` component file. Documented in the Style Guide.

| File | Key selectors | Purpose |
|------|---------------|---------|
| `layout.css` | `.container`, `.content`, `.section`, `.card-grid`, `.toc-grid`, `.compass-content` | Page shells, grid systems, section wrappers, compass content wrapper |
| `cards.css` | `.link-card`, `.cat-card`, `.compass-card`, `.axis-box`, `.coming-card`, `.search-bar` | Shared card chrome (`:is()` grouping for bg/border/radius/transition) + individual card styling |
| `content.css` | `.table-wrap`, `.checklist`, `.compass-content table` | Scrollable table wrapper, checklists, compass-scoped table overrides |
| `hero.css` | `.page-hero`, `.page-hero--teal`, `--amber`, `--gradient`, `--neutral`, `--purple` | Page hero banner with axis-colored accent stripes |
| `callouts.css` | `.callout`, `.callout--vertical`, `--horizontal`, `--editorial`, `.callout-example`, `.callout-code` | Callout boxes (tip, warning, example, editorial, code) |
| `breadcrumb.css` | `.breadcrumb`, `.sep` | Breadcrumb trail |
| `tags.css` | `.token`, `.schema-label`, `.source-tag`, `.status-tag` | Inline code tokens, schema labels, status badges |
| `section-nav.css` | `.section-nav`, `.section-nav__link`, `.page-nav-card`, `.prev-next-nav` | Section-level navigation, prev/next links between pages |
| `dimension-card.css` | `.dimension-card`, `.dimension-number`, `.dimension-title`, `.crosswalk-dimension`, `.framework-def`, `.dimension-dimmed`, `.dimension-highlighted` | Vertical axis dimension cards, crosswalk blocks, framework definitions, coordinate picker highlight/dim |

### Component Styles

Each file pairs with one Astro component in `src/components/ui/`. Components have **no `<style>` blocks** — all CSS is external.

| CSS File | Astro Component | Key selectors |
|----------|----------------|---------------|
| `tabs.css` | `Tabs.astro` | `.tabs`, `.tabs__strip`, `.tabs__tab`, `.tabs__panel`, `.tabs--teal/amber/blue/gradient`, `.pill-tabs` |
| `accordion.css` | *(none — pattern)* | `.accordion-item`, `.accordion-toggle`, `.accordion-body`, `.accordion-controls` |
| `expanding-cards.css` | `ExpandingCards.astro` | `.expanding-cards`, `.expanding-cards--slotted`, `.expanding-cards__card`, `.expanding-cards--vertical/horizontal`, tabs-inside-cards overrides |
| `flip-card.css` | `FlipCard.astro` | `.flip-card`, `.flip-card__inner`, `.flip-card__front/back`, `.flip-card--teal/amber/blue/gradient`, `.flip-card-strip` |
| `coordinate-picker.css` | `CoordinatePicker.astro` | `.coord-picker`, `.coord-picker__controls`, `.coord-picker__select`, `.coord-picker__notation`, `.coord-picker__btn` |

> **Note:** Accordion has a CSS file in `components/` but no `.astro` component — it's a pure-HTML pattern using native `<details>`. The CSS is in `components/` because it includes JS-driven behavior (expand/collapse-all via `data-accordion-group`).

### Site Shell

The remaining CSS in `global.css` (after all `@import` lines) styles the site chrome shared by `PortalLayout.astro`:

- **Site header** — `.site-header`, `.site-brand`, `.site-nav`, `.theme-toggle`, `.global-search-trigger`
- **Sidebar** — `.sidebar-rail`, `.rail-icon`, `.page-sidebar`, `.sidebar-toc`, `.sidebar-siblings`
- **Footer** — `.site-footer`
- **Page content** — `.page-content`
- **Back to top** — `.back-to-top`
- **Search modal** — `.search-modal`, `.pagefind-ui` integration
- **Responsive** — `@media` overrides for site header and base typography
- **Animations** — `fadeIn` keyframes, `.animate-in`

These are tightly coupled to the layout and not shared across independent patterns.

### Rules: Where to Put New CSS

1. **New CSS variable?** → `tokens.css`
2. **Styling a bare HTML element (not a class)?** → `base.css`
3. **Reusable HTML recipe, CSS-only, no `.astro` file?** → `patterns/<name>.css`
4. **CSS for an `.astro` component?** → `components/<name>.css`
5. **One page only, demo scaffolding?** → Page-scoped `<style>` block (Style Guide only, currently)
6. **Always** add an `@import` line in `global.css` for any new file.
7. **Never** put shared CSS in a scoped `<style>` block.

---

## Components

All components live in `src/components/ui/`. Each is a `.astro` single-file component with markup + optional JS. No scoped `<style>` blocks.

### ExpandingCards

**File:** `src/components/ui/ExpandingCards.astro`
**CSS:** `src/styles/components/expanding-cards.css`
**Purpose:** Accordion-like panels that expand on click, showing all items at a glance. Supports `vertical` (stacked) and `horizontal` (rail) orientations.
**Used in:**
- `src/pages/compass/vertical-axis/expanding-cards.astro` — full-page D0–D5 dimension deck
- `src/pages/style-guide/index.astro` — demo specimens

### Tabs

**File:** `src/components/ui/Tabs.astro`
**CSS:** `src/styles/components/tabs.css`
**Purpose:** Mutually exclusive tab panels. Arrow-key navigation, Enter/Space activation, no-JS fallback stacks all panels. Accent variants: `teal`, `amber`, `blue`, `gradient`.
**Used in:**
- `src/pages/compass/vertical-axis/index.astro` — dimension tabs inside accordion
- `src/pages/compass/vertical-axis/expanding-cards.astro` — tabs inside expanding card panels

> The Style Guide demonstrates tabs via raw HTML + inline JS, not via the `<Tabs>` component.

### FlipCard

**File:** `src/components/ui/FlipCard.astro`
**CSS:** `src/styles/components/flip-card.css`
**Purpose:** Two-sided cards that flip on click/tap. `front`/`back` slots. Supports `horizontal` (rotateY) and `vertical` (rotateX) flip directions. Accent variants: `teal`, `amber`, `blue`, `gradient`.
**Used in:**
- `src/pages/style-guide/index.astro` — demo specimens

### CoordinatePicker

**File:** `src/components/ui/CoordinatePicker.astro`
**CSS:** `src/styles/components/coordinate-picker.css`
**Purpose:** Interactive widget with two `<select>` dropdowns (dimension + position) that outputs a coordinate notation string. Supports "Jump to section" and "Highlight dimension" actions.
**Used in:**
- `src/pages/compass/vertical-axis/index.astro`
- `src/pages/compass/vertical-axis/expanding-cards.astro`

### Accordion

**No `.astro` component** — accordion is a pure HTML pattern using native `<details>` + vanilla JS for expand/collapse-all.
**CSS:** `src/styles/components/accordion.css`
**Used in:** (as raw markup with `data-accordion-group`)
- `src/pages/compass/vertical-axis/index.astro`
- `src/pages/compass/vertical-axis/expanding-cards.astro`
- `src/pages/library/music/index.astro`
- `src/pages/library/story/index.astro`
- `src/pages/style-guide/index.astro`

---

## Pages

All pages use `PortalLayout` and are file-routed under `src/pages/`.

| Route | File | Notes |
|-------|------|-------|
| `/` | `index.astro` | Home — card grid with compass sections + library links |
| `/compass/` | `compass/index.astro` | Compass hub — links to all 8 sections |
| `/compass/orientation/` | `compass/orientation/index.astro` | Section I |
| `/compass/horizontal-axis/` | `compass/horizontal-axis/index.astro` | Section II |
| `/compass/story-structure/` | `compass/story-structure/index.astro` | Section IIA |
| `/compass/vertical-axis/` | `compass/vertical-axis/index.astro` | Section III — uses Tabs, CoordinatePicker, Accordion |
| `/compass/vertical-axis/expanding-cards` | `compass/vertical-axis/expanding-cards.astro` | Alt view — full ExpandingCards deck |
| `/compass/intersection-logic/` | `compass/intersection-logic/index.astro` | Section IV |
| `/compass/navigation-protocols/` | `compass/navigation-protocols/index.astro` | Section V |
| `/compass/practical-application/` | `compass/practical-application/index.astro` | Section VI |
| `/compass/implementation-guide/` | `compass/implementation-guide/index.astro` | Section VII |
| `/library/music/` | `library/music/index.astro` | Music link library — accordion categories |
| `/library/story/` | `library/story/index.astro` | Story link library — accordion categories |
| `/library/[...slug]` | `library/[...slug].astro` | Dynamic library sub-pages |
| `/roadmap/` | `roadmap/index.astro` | Implementation roadmap |
| `/style-guide/` | `style-guide/index.astro` | Living component & pattern inventory |

---

## Layout

**File:** `src/layouts/PortalLayout.astro`

Every page wraps its content with `<PortalLayout title="..." currentPage="...">`.

**Props:**
- `title` (string, required) — sets `<title>` and heading
- `currentPage` (string, optional) — highlights the active nav item (`'home'`, `'compass'`, `'library'`)

**Provides:**
- `<head>` with fonts (DM Serif Display), meta tags, Pagefind UI
- Site header with nav links (Home, Library, Compass) + search trigger + theme toggle
- Left icon rail + slide-out sidebar with TOC and compass section links
- `<slot />` for page content
- Footer
- Back-to-top button
- Inline JS for: theme toggle, sidebar open/close, back-to-top scroll, TOC scroll-spy, accordion expand/collapse-all, tabs keyboard nav

**CSS loading:** `import '../styles/global.css'` at line 2 — this is the sole import point for all styles.

---

## Style Guide

**File:** `src/pages/style-guide/index.astro`
**Route:** `/style-guide/`

### What it does

- Demonstrates every pattern and component with live specimens
- Documents usage rules, class names, and prop signatures
- Imports `ExpandingCards` and `FlipCard` components directly
- Renders tabs and accordion demos via raw HTML + inline JS (not via `<Tabs>` component)

### What it does NOT do

- Does **not** own shared CSS. Pattern/component styles live in `src/styles/patterns/` and `src/styles/components/`.
- Its `<style>` block contains **page-scoped demo scaffolding only**: `.sg-color-grid`, `.sg-color-card`, `.sg-swatch`, `.sg-type-specimen`, `.sg-type-details`, `.sg-depth-strip`, `.sg-depth-swatch`, `.chrome-proof-table`. These classes are used nowhere else.

### Adding a new pattern/component demo

1. Create the CSS file (see [Common Tasks](#common-tasks))
2. Add the `@import` in `global.css`
3. In `style-guide/index.astro`, add a new `<h4>` section with live HTML specimens
4. Include a `.sg-type-details` block documenting classes, props, variants

---

## Common Tasks

### Add a New Pattern

1. Create `src/styles/patterns/<name>.css`
2. Add `@import "./patterns/<name>.css";` in `global.css` (in the patterns block)
3. Use the classes in any page's HTML
4. Add a demo to the Style Guide

### Add a New Component + CSS

1. Create `src/components/ui/<Name>.astro` — markup, props, JS behavior
2. Create `src/styles/components/<name>.css` — all styling for the component
3. Add `@import "./components/<name>.css";` in `global.css` (in the components block)
4. **Do not** add a `<style>` block in the `.astro` file
5. Import and use in pages: `import Name from '../../components/ui/Name.astro'`
6. Add a demo to the Style Guide

### Add a New Page

1. Create `src/pages/<section>/index.astro`
2. Import and wrap with `PortalLayout`:
   ```astro
   ---
   import PortalLayout from '../../layouts/PortalLayout.astro';
   const base = import.meta.env.BASE_URL;
   ---
   <PortalLayout title="Page Title" currentPage="compass">
     <!-- content -->
   </PortalLayout>
   ```
3. Use existing pattern classes (`.compass-content`, `.page-hero`, `.breadcrumb`, etc.)
4. Import components as needed: `import Tabs from '../../components/ui/Tabs.astro'`

### Update Navigation

- **Top nav links** — edit `src/layouts/PortalLayout.astro`, find the `<nav class="site-nav">` block
- **Sidebar compass sections** — edit the `compassSections` array at the top of `PortalLayout.astro`
- **Style Guide TOC** — edit the `<nav class="toc-grid">` block in `src/pages/style-guide/index.astro`

---

## Decision Chart: Where Do I Put This?

```
Is it a CSS custom property (color, size, spacing)?
  → tokens.css

Is it styling a bare HTML element (table, h1, blockquote)?
  → base.css

Is it an .astro component with markup + behavior?
  │
  ├─ CSS → src/styles/components/<name>.css
  ├─ Component → src/components/ui/<Name>.astro
  └─ Import → @import in global.css (components block)
  │
  Examples: Tabs, ExpandingCards, FlipCard, CoordinatePicker

Is it reusable HTML + classes, no .astro file needed?
  │
  └─ CSS → src/styles/patterns/<name>.css
  │
  ├─ Layout/grid?        → patterns/layout.css
  ├─ Card shell?         → patterns/cards.css
  ├─ Content formatting? → patterns/content.css
  ├─ Hero variant?       → patterns/hero.css
  ├─ Callout variant?    → patterns/callouts.css
  ├─ Navigation?         → patterns/section-nav.css
  └─ New pattern?        → patterns/<new-name>.css + @import in global.css

Is it one-page demo scaffolding?
  └─ <style> block in that page (Style Guide only, currently)

Is it site shell (header, sidebar, footer)?
  └─ Stays in global.css (after the @import lines)
```

### Concrete examples from this repo

| Thing | Type | File |
|-------|------|------|
| `.page-hero--teal` | Pattern | `patterns/hero.css` |
| `.callout--editorial` | Pattern | `patterns/callouts.css` |
| `.dimension-card` | Pattern | `patterns/dimension-card.css` |
| `.compass-content` | Pattern (layout) | `patterns/layout.css` |
| `.table-wrap` | Pattern (content) | `patterns/content.css` |
| `.link-card` | Pattern (card) | `patterns/cards.css` |
| `.tabs`, `.tabs__tab` | Component style | `components/tabs.css` |
| `.expanding-cards` | Component style | `components/expanding-cards.css` |
| `.coord-picker` | Component style | `components/coordinate-picker.css` |
| `.flip-card` | Component style | `components/flip-card.css` |
| `.accordion-toggle` | Component style | `components/accordion.css` |
| `.sg-color-grid` | Page-scoped | `style-guide/index.astro <style>` |
| `.site-header` | Site shell | `global.css` (inline, after imports) |

### Common mistakes

- **Duplicate definitions.** Every selector gets one home file. If `.page-hero` is in `patterns/hero.css`, don't redefine it in a page `<style>` block. Responsive overrides go in the same file.
- **Shared CSS in a `<style>` block.** Only the Style Guide page has a `<style>` block, and only for `.sg-*` demo scaffolding. If a class is used on more than one page, it must live in a pattern or component file.
- **Forgetting the `@import`.** Creating a CSS file without adding the `@import` in `global.css` means the styles won't load.
- **Styling in the Style Guide.** The Style Guide *demonstrates* patterns — it does not *own* them. The real CSS lives in `patterns/` or `components/`. If you edit a pattern's appearance, edit the pattern file, not the Style Guide.
- **Scoped `<style>` in components.** Astro components must not have `<style>` blocks. All component CSS is external, in `src/styles/components/`.
