# Progressive Disclosure Audit v4 — LOCKED
## Chaos Portal — Component Plan, Design Rules & Implementation Spec

---

## COMPONENT AUDITION RESULTS

| Component | Source | Verdict | Why |
|-----------|--------|---------|-----|
| Gooey Filter Tabs | danielpetho | **SKIP** | Requires Framer Motion + React. Safari SVG filter issues. Visual sugar that fights clarity-over-flash design philosophy. |
| Orbiting Skills | seraui | **PARK** | Decorative, not functional. Future Compass hero viz candidate, but doesn't collapse content. |
| Expanding Cards | vaib215 | **YES — CORE** | Horizontal panels that expand/shrink on click. Shows full set at a glance. Perfect for dimensions, frameworks, pattern cards. |
| Images Scrolling Animation | thanh | **SKIP** | Parallax scroll for images. Wrong for text-heavy analytical content. |
| Circular Flip Card Gallery | thanh | **YES — SPECIAL** | Cards in a circle that flip. Made for Story Circle / clock positions. Future Coordinate Picker prototype. |
| Accordion-03 | aliimam | **INSPIRE** | Good styling reference for polished `<details>` accordion animation. |

---

## DESIGN SYSTEM RULES FOR ALL COMPONENTS

These rules are non-negotiable. Every component follows them. This is what makes them feel like parts of one system instead of a junk drawer.

### The 10 Chrome Invariants

("Chrome" = the visual frame around content: borders, backgrounds, shadows, corners, colors. The decoration that ISN'T the text or the interaction behavior. All components share identical chrome. Only the motion/behavior changes between them.)

| # | Property | Value | Rule |
|---|----------|-------|------|
| 1 | **Border** | `1px solid var(--border)` | Every card, panel, and container. No exceptions. |
| 2 | **Border radius (cards)** | `var(--radius-md)` = 6px | All card-like elements: expanding panels, flip cards, tab panels, circle cards |
| 3 | **Border radius (containers)** | `var(--radius-lg)` = 10px | Outer wrappers only: accordion groups, expanding card containers, story circle frame |
| 4 | **Background** | `var(--surface)` or `var(--surface-elevated)` | No custom backgrounds. Active/expanded = `--surface`, collapsed/secondary = `--surface-elevated` |
| 5 | **Text colors** | `var(--text)`, `var(--text-2)`, `var(--text-3)` | Three levels only. Primary, secondary, tertiary. Never raw hex in components. |
| 6 | **Shadow** | `var(--shadow-subtle)` on hover, `var(--shadow-card)` on active/expanded | Never permanent shadow on inactive/collapsed elements |
| 7 | **Transition** | `all 0.2s ease` for hover states, `0.3–0.4s ease` for expand/flip/slide | Consistent motion speed. Nothing slower than 0.5s. Nothing instant. |
| 8 | **Axis color** | Teal (`--semantic-v`) for vertical content, Amber (`--semantic-h`) for horizontal | Applied as `border-left` or `border-top` accent stripe only. Never as background fill. |
| 9 | **Typography** | Same hierarchy everywhere | DM Serif Display for card titles. System sans for body. Georgia italic for editorial subheads. Monospace for coordinates. |
| 10 | **Spacing** | 8px scale only | `--space-xs` (8px) through `--space-xl` (64px). No arbitrary pixel values. |

### Axis Color Application

Components automatically get their color accent from the page context:

| Page context | Accent color | CSS variable |
|-------------|-------------|-------------|
| Vertical Axis, Dimension content | Teal | `--semantic-v` (#14B8A6) |
| Horizontal Axis, Position content | Amber | `--semantic-h` (#F59E0B) |
| Cross-axis pages (Intersection, Practical) | Gradient (amber→teal) | `--gradient-brand` |
| General/neutral (Orientation, Nav Protocols) | Info Blue | `--info-blue` (#3B82F6) |

The component accepts a `color` prop or class modifier. It ONLY changes the accent stripe color. Everything else stays identical.

### Dimension Depth Gradation (Teal Opacity Scale)

The 6 depth dimensions use a single hue (teal) at increasing saturation to communicate depth. Surface is lightest. Core is deepest. No new colors added to the palette.

```css
/* Dimension depth scale — append to global.css */
:root {
  --dim-5: rgba(20, 184, 166, 0.35);   /* D5 Surface — lightest, most accessible */
  --dim-4: rgba(20, 184, 166, 0.48);   /* D4 Structural */
  --dim-3: rgba(20, 184, 166, 0.61);   /* D3 Cognitive */
  --dim-2: rgba(20, 184, 166, 0.74);   /* D2 Psychological */
  --dim-1: rgba(20, 184, 166, 0.87);   /* D1 Archetypal */
  --dim-0: rgba(20, 184, 166, 1.00);   /* D0 Core — deepest, full saturation */
}

.dark-mode {
  --dim-5: rgba(20, 184, 166, 0.25);
  --dim-4: rgba(20, 184, 166, 0.38);
  --dim-3: rgba(20, 184, 166, 0.51);
  --dim-2: rgba(20, 184, 166, 0.64);
  --dim-1: rgba(20, 184, 166, 0.77);
  --dim-0: rgba(20, 184, 166, 0.90);
}
```

**Usage:** These only appear as the `border-left` or `border-top` accent color on dimension-specific cards. The card surface, text, and shadow stay the same across all dimensions. The deepening teal is the ONLY thing that changes.

### Position Intensity Gradation (Amber Opacity Scale)

Clock positions use amber at varying intensity. Origin (12:00) is lightest, Crisis (9:00) is most intense, mirroring story arc tension.

```css
:root {
  --pos-12: rgba(245, 158, 11, 0.35);  /* 12:00 Origin — calm */
  --pos-1:  rgba(245, 158, 11, 0.45);  /* 1:00 Catalyst approach */
  --pos-3:  rgba(245, 158, 11, 0.60);  /* 3:00 Threshold — commitment */
  --pos-6:  rgba(245, 158, 11, 0.80);  /* 6:00 Midpoint — revelation */
  --pos-9:  rgba(245, 158, 11, 1.00);  /* 9:00 Crisis — maximum intensity */
  --pos-11: rgba(245, 158, 11, 0.45);  /* 11:00 Return approach — easing */
}
```

---

## COMPONENT INVENTORY (5 components)

### Component 1: `<Tabs>`

**Purpose:** Switch between parallel content panels using a horizontal tab strip.

**Where used:** Inside dimension accordions (Vertical Axis), measurement systems (Horizontal Axis), note methods (Practical App), coordinate notation (Intersection Logic, Orientation).

**Instances across site:** ~25-30

**API:**
```astro
<Tabs id="d5-tabs" accent="teal" labels={["Overview", "Frameworks", "Questions", "When to Use", "Examples", "Connections"]}>
  <div slot="tab-0">...content...</div>
  <div slot="tab-1">...content...</div>
  <!-- etc -->
</Tabs>
```

**Behavior:**
- Horizontal tab strip, first tab active by default
- ARIA roles: `tablist`, `tab`, `tabpanel`
- Keyboard: left/right arrows move between tabs, Enter/Space activates
- Hash support: `#d5-tabs--questions` activates that tab on page load
- Mobile: tab strip scrolls horizontally (overflow-x: auto)
- No-JS fallback: all panels visible, stacked vertically

**Chrome (identical to all components):**
- Tab strip: sits on `var(--border)` bottom line
- Active tab: `border-bottom: 2px solid` using accent color (teal or amber)
- Inactive tabs: `var(--text-3)`, hover → `var(--text-2)`
- Panel: `var(--surface)` background, `var(--radius-md)` bottom corners
- Padding: `var(--space-sm)` inside panels
- No extra borders or shadows on panels — they inherit from parent container

---

### Component 2: `<details>` Accordion (enhanced)

**Purpose:** Collapse/expand content sections. Native HTML `<details>` element with unified styling and JS helpers.

**Where used:** Every Compass page.

**Instances across site:** ~60+

**What already exists:** Library pages use `<details>` with `.accordion-item` / `.accordion-toggle`. This gets unified and enhanced.

**Enhanced features:**
- Expand All / Collapse All buttons (grouped by `data-accordion-group`)
- Hash routing: `#d5-expressive` opens that accordion on page load
- TOC integration: clicking any TOC link auto-opens the target accordion
- Nesting support: accordion body can contain Tabs, ExpandingCards, or FlipCards

**Chrome:**
- Closed: `var(--surface)` background, `1px solid var(--border)`, `var(--radius-lg)` corners
- Open: top corners stay rounded, bottom corners on summary flatten, body gets `var(--surface-inset)` background
- Left accent stripe: 3px, uses axis color on open state
- Chevron: `var(--text-3)` → rotates 180° on open
- Hover: `var(--surface-elevated)` background, `var(--border-accent)` border
- Animation: `0.25s ease` chevron rotation, body reveal via CSS `@keyframes accordionReveal`

**No new Astro component needed.** Stays as native `<details>` + CSS classes + one shared JS helper script.

---

### Component 3: `<ExpandingCards>`

**Purpose:** A strip of cards all visible at once. Click one to expand it; others shrink to narrow labeled strips. Shows the full set at a glance while revealing one card's content at a time.

**Why this replaces CardCarousel:** Carousel hides cards behind swipe gestures. ExpandingCards shows ALL cards simultaneously — you never lose spatial awareness of where you are in the set.

**Orientation rule:**
- `orientation="vertical"` — ONLY on Vertical Axis page (dimensions D5→D0 stack top-to-bottom, reflecting depth)
- `orientation="horizontal"` — everywhere else (Story Structure crosswalks, Intersection Logic patterns, Practical App templates, Horizontal Axis positions)
- Cross-axis pages (Intersection Logic, Practical App) always default to horizontal

**Where used:**
- Vertical Axis: 6 dimensions as vertical expanding strip (1 instance)
- Story Structure: crosswalk D0-D5 inside each framework accordion (~15 instances)
- Intersection Logic: pattern cards grouped by position (~4 decks)
- Horizontal Axis: key position reference cards (1 instance)
- Practical Application: template previews with download buttons (1 instance)
- Vertical Axis: dimension characteristics summary (1 instance)

**Instances across site:** ~23 decks

**API:**
```astro
<ExpandingCards
  id="dimensions"
  orientation="vertical"
  accent="teal"
  defaultActive={0}
>
  <div slot="card-0" data-label="D5" data-title="Surface" data-depth="5">
    ...full dimension content...
  </div>
  <div slot="card-1" data-label="D4" data-title="Structural" data-depth="4">
    ...content...
  </div>
  <div slot="card-2" data-label="D3" data-title="Cognitive" data-depth="3">
    ...content...
  </div>
  <div slot="card-3" data-label="D2" data-title="Psychological" data-depth="2">
    ...content...
  </div>
  <div slot="card-4" data-label="D1" data-title="Archetypal" data-depth="1">
    ...content...
  </div>
  <div slot="card-5" data-label="D0" data-title="Core" data-depth="0">
    ...content...
  </div>
</ExpandingCards>
```

**Behavior:**
- All cards visible simultaneously as narrow labeled strips
- Click/tap one → smoothly expands, others shrink
- First card expanded by default (or via `defaultActive` prop)
- Keyboard: arrow keys move active card, Enter/Space toggles
- Hash support: `#dimensions--d2` expands card 3
- Mobile (<768px): vertical orientation always (regardless of prop), cards become mini-accordions
- No-JS fallback: all panels visible, stacked vertically

**Chrome:**
- **Collapsed strip:**
  - Horizontal: ~48-60px wide, label text rotated 90° (bottom-to-top)
  - Vertical: ~48-60px tall, label text horizontal
  - Background: `var(--surface-elevated)`
  - Left/top accent border: uses dimension depth variable (e.g., `var(--dim-3)` for D3)
  - Border: `1px solid var(--border)`
  - Cursor: pointer
  - Hover: `var(--surface)` background, `var(--shadow-subtle)`
- **Expanded card:**
  - `flex-grow: 1` (takes remaining space)
  - Background: `var(--surface)`
  - Shadow: `var(--shadow-card)`
  - Left/top accent border: 3px solid, uses depth/position variable at full value
  - Content fades in: `opacity 0→1, 0.3s ease` (delayed 0.1s after width transition starts)
- **Container:**
  - `display: flex` (row for horizontal, column for vertical)
  - `gap: 2px` (hairline gap between cards, not full spacing — they read as one unit)
  - Border-radius: `var(--radius-lg)` on outer container, `var(--radius-md)` on individual cards
  - `overflow: hidden` on container clips card corners cleanly
- **Transitions:**
  - Width/height: `0.4s ease`
  - Content opacity: `0.3s ease 0.1s` (starts after shape begins changing)
  - Background/shadow: `0.2s ease`

---

### Component 4: `<FlipCard>`

**Purpose:** Two-sided card. Front shows summary, back shows details. Click/tap to flip.

**Where used:**
- Orientation: axis descriptions (2 cards)
- Navigation Protocols: worked examples (~5 cards)
- Practical Application: viewing protocols (3 cards)

**Instances across site:** ~10

**API:**
```astro
<FlipCard id="vertical-axis-flip" accent="teal">
  <div slot="front">
    <h4>Vertical Axis</h4>
    <p>Story depth — 6 dimensions from surface to core</p>
  </div>
  <div slot="back">
    <p>D5 Expressive/Symbolic → D4 Structural → D3 Cognitive → D2 Psychological → D1 Archetypal → D0 Core</p>
    <ul>...framework list...</ul>
  </div>
</FlipCard>
```

**Behavior:**
- Click/tap toggles front ↔ back
- CSS 3D transform: `perspective(1000px)` on wrapper, `rotateY(180deg)` on flip
- Keyboard: Enter/Space flips
- ARIA: `aria-expanded` on wrapper, `aria-hidden` on non-visible face
- No-JS fallback: both faces visible, stacked (front then back)
- Works standalone or in a horizontal row (FlipCard strip)

**Chrome:**
- **Both faces:**
  - Background: `var(--surface)`
  - Border: `1px solid var(--border)`
  - Border-radius: `var(--radius-md)` (6px)
  - Consistent `min-height` to prevent layout jump on flip
  - Padding: `var(--space-sm)` (16px)
- **Front face:**
  - Top border accent: 3px solid using accent color
  - Content centered vertically
  - Small "tap to flip" hint icon (↻) in bottom-right, `var(--text-3)`
- **Back face:**
  - Same border treatment as front
  - Slightly different background: `var(--surface-elevated)` — so the flip feels like turning something over
  - Small "tap to return" hint icon (↻) in bottom-right
- **Flip animation:**
  - `transform: rotateY(180deg)`, `0.4s ease`
  - `backface-visibility: hidden` on both faces
  - Active card gets `var(--shadow-card)` during animation, settles to `var(--shadow-subtle)`

---

### Component 5: `<StoryCircle>`

**Purpose:** Clock positions arranged in an actual circle. Each position is a card that flips to reveal details. This is the Compass's first interactive "instrument" element.

**Where used:**
- Horizontal Axis page (primary home — hero interactive element)
- Could later evolve into Tier 1 Coordinate Picker

**Instances across site:** 1 (but it's a landmark component)

**API:**
```astro
<StoryCircle id="story-clock">
  <div slot="pos-12" data-label="12:00" data-title="Origin">
    ...position details...
  </div>
  <div slot="pos-3" data-label="3:00" data-title="Threshold">
    ...position details...
  </div>
  <div slot="pos-6" data-label="6:00" data-title="Midpoint">
    ...position details...
  </div>
  <div slot="pos-9" data-label="9:00" data-title="Crisis">
    ...position details...
  </div>
  <!-- additional positions as needed -->
</StoryCircle>
```

**Behavior:**
- Cards positioned in a circle using CSS (absolute positioning or CSS grid with `transform`)
- Click a position → card flips to show details (reuses FlipCard mechanics)
- Only one card flipped at a time
- Center shows: position name when selected, compass graphic when idle
- Keyboard: Tab between positions, Enter flips
- Hash support: `#pos-6` flips 6:00 on load
- Mobile (<768px): linearizes to horizontal scrollable row or 2×2 grid

**Chrome:**
- Position cards: `var(--radius-md)`, `1px solid var(--border)`
- Each card's accent uses position intensity variable (e.g., `var(--pos-6)`, `var(--pos-9)`)
- Circle container: no visible border — positions float in space
- Center element: `var(--surface-elevated)`, circular, contains label text
- Active/flipped card: `var(--shadow-card)`, amber accent intensifies
- Connecting lines between positions: `1px solid var(--border)`, subtle — can be hidden on mobile
- Same flip animation as FlipCard (0.4s ease, perspective 1000px, rotateY)

---

## PAGE-BY-PAGE APPLICATION

### I. Orientation (`/compass/orientation/`)
| Component | What | Accent |
|-----------|------|--------|
| FlipCard × 2 | Horizontal + Vertical axis descriptions | Amber / Teal respectively |
| Accordion × 1 | "How to Navigate" protocol | Info Blue |
| Tabs × 1 | Coordinate explanation: `Notation · Reading · Examples` | Info Blue |

### II. Horizontal Axis (`/compass/horizontal-axis/`)
| Component | What | Accent |
|-----------|------|--------|
| **StoryCircle** × 1 | Clock positions hero interactive | Amber (with position intensity scale) |
| Tabs × 1 | Measurement systems: `Clock · Acts · Beats · Runtime · Symmetry` | Amber |
| ExpandingCards × 1 (horizontal) | Key position detail cards | Amber (with position intensity scale) |
| Accordion × 3 | Movement patterns: Linear, Jump, Cyclical | Amber |

### IIA. Story Structure (`/compass/story-structure/`)
| Component | What | Accent |
|-----------|------|--------|
| Accordion × ~15 | One per framework (Hero's Journey, Chiastic, etc.) | Gradient (cross-axis page) |
| ExpandingCards × ~15 (horizontal) | D0-D5 crosswalk inside each framework accordion | Teal (with dimension depth scale) |

### III. Vertical Axis (`/compass/vertical-axis/`)
| Component | What | Accent |
|-----------|------|--------|
| **ExpandingCards × 1 (VERTICAL)** | 6 dimensions D5→D0 as vertical expanding strip | Teal (with dimension depth scale) |
| Tabs × 6 | Inside each expanded dimension: `Overview · Frameworks · Questions · When to Use · Examples · Connections` | Teal |
| ExpandingCards × 1 (horizontal) | Dimension Characteristics summary (6 mini cards) | Teal |
| Accordion × 2 | Vertical Movement Protocols + additional sections | Teal |

### IV. Intersection Logic (`/compass/intersection-logic/`)
| Component | What | Accent |
|-----------|------|--------|
| Tabs × 1 | Reading protocol: `Notation · Format · Examples` | Gradient |
| ExpandingCards × ~4 (horizontal) | Pattern cards grouped by clock position | Gradient |
| Accordion × ~5 | Common patterns | Gradient |

### V. Navigation Protocols (`/compass/navigation-protocols/`)
| Component | What | Accent |
|-----------|------|--------|
| Accordion × ~5 | One per analysis method | Info Blue |
| FlipCard × ~5 | Worked examples inside accordions | Info Blue |

### VI. Practical Application (`/compass/practical-application/`)
| Component | What | Accent |
|-----------|------|--------|
| ExpandingCards × 1 (horizontal) | Template previews + download PDF buttons | Gradient |
| Tabs × 1 | Note organization: `Spreadsheet · App · Mixed Media` | Gradient |
| FlipCard × 3 | Viewing protocols: First / Second / Third viewing | Gradient |
| ExpandingCards × 1 (horizontal) | Visual mapping technique diagrams | Gradient |

**Special:** Print stylesheet + PDF download for templates.

### VII. Implementation Guide (`/compass/implementation-guide/`)
| Component | What | Accent |
|-----------|------|--------|
| Accordion × ~12 | Parts I-VI + appendices A-D | Info Blue |

### Home Page (restructured)
**Row 1 — Primary:** Compass card + Library card (large)
**Row 2 — Tools:** Creativity Engine + Piano Matrix + Vocal Matrix (medium, with intro pages)

---

## WHERE EACH COMPONENT LIVES (summary grid)

| Page | Accordion | Tabs | ExpandingCards | FlipCard | StoryCircle |
|------|-----------|------|---------------|----------|-------------|
| I. Orientation | ✓ (1) | ✓ (1) | — | ✓ (2) | — |
| II. Horizontal | ✓ (3) | ✓ (1) | ✓ H (1) | — | ✓ (1) |
| IIA. Story Structure | ✓ (~15) | — | ✓ H (~15) | — | — |
| III. Vertical Axis | ✓ (2) | ✓ (6) | ✓ **V** (1) + ✓ H (1) | — | — |
| IV. Intersection | ✓ (~5) | ✓ (1) | ✓ H (~4) | — | — |
| V. Nav Protocols | ✓ (~5) | — | — | ✓ (~5) | — |
| VI. Practical App | — | ✓ (1) | ✓ H (2) | ✓ (3) | — |
| VII. Impl Guide | ✓ (~12) | — | — | — | — |
| Style Guide | ✓ | ✓ | ✓ H + ✓ V | ✓ | ✓ |

(H = horizontal orientation, V = vertical orientation)

---

## IMPLEMENTATION ORDER

| Priority | What | Deliverable |
|----------|------|-------------|
| **1** | Style Guide demos | Build all 5 components + dimension depth scale. Demo each in isolation. Prove they share chrome. |
| **2** | Vertical Axis | ExpandingCards vertical (dimensions) + Tabs (sub-sections) + Accordion |
| **3** | Story Structure | Accordion (frameworks) + ExpandingCards horizontal (crosswalks) |
| **4** | Horizontal Axis | StoryCircle (clock positions) + Tabs + ExpandingCards |
| **5** | Intersection Logic | Tabs + ExpandingCards (pattern cards) + Accordion |
| **6** | Navigation Protocols | Accordion + FlipCards |
| **7** | Orientation | FlipCards + Tabs + Accordion |
| **8** | Practical Application | ExpandingCards + FlipCards + Tabs + PDF/print |
| **9** | Home Page | Restructure cards + create 3 intro pages |
| **10** | Implementation Guide | Accordion only |

---

## FILE PLAN

```
src/
├── components/
│   └── ui/
│       ├── Tabs.astro              ← Tab strip + panels
│       ├── ExpandingCards.astro     ← Horizontal/vertical expand-shrink deck
│       ├── FlipCard.astro          ← Tap-to-flip two-sided card
│       └── StoryCircle.astro       ← Circular clock position gallery
├── scripts/
│   └── disclosure.js               ← Hash routing, expand/collapse, keyboard nav
├── styles/
│   └── global.css                  ← Add: dimension depth scale, position intensity scale,
│                                      tabs CSS, expanding cards CSS, flip card CSS,
│                                      story circle CSS, unified accordion enhancements
└── pages/
    ├── index.astro                 ← Home (restructured layout)
    ├── style-guide/index.astro     ← Component playground (ALL 5 demoed + chrome proof)
    ├── creativity-engine/index.astro ← NEW intro/field-guide page
    ├── piano-matrix/index.astro      ← NEW intro/field-guide page
    ├── vocal-matrix/index.astro      ← NEW intro/field-guide page
    └── compass/
        ├── orientation/
        ├── horizontal-axis/        ← Gets StoryCircle
        ├── story-structure/
        ├── vertical-axis/          ← Gets vertical ExpandingCards
        ├── intersection-logic/
        ├── navigation-protocols/
        ├── practical-application/  ← Gets PDF download + print stylesheet
        └── implementation-guide/
```

---

## SUMMARY

**5 components.** Tabs, Accordion, ExpandingCards, FlipCard, StoryCircle.

**1 design system.** All components share identical chrome (borders, backgrounds, shadows, corners, spacing, typography). The only things that change between components are behavior (expand vs. flip vs. tab vs. circle) and accent color (teal vs. amber vs. gradient vs. blue).

**Orientation matches meaning.** ExpandingCards run vertical on the Vertical Axis page, horizontal everywhere else. This isn't decoration — it reinforces the spatial metaphor the user is learning.

**Depth is communicated through opacity.** Teal deepens from D5 (40%) to D0 (100%). Amber intensifies from 12:00 (35%) to 9:00 (100%). No new colors. Same hues. Just deepening.

**Corners are soft rectangles.** 6px on cards, 10px on containers. Not circles. Not sharp. Already established in the design system. Every new component follows the same rule.

**ALL 8 Compass pages** get progressive disclosure. No exceptions.

**Home page** restructured: Compass + Library prominent, then Creativity Engine + Piano Matrix + Vocal Matrix with "coming soon" intro pages.

**Build order:** Style Guide demos first (prove the chrome, prove the components, prove the depth scale) → then Vertical Axis → Story Structure → everything else.

**No React. No Framer Motion. No external dependencies.** All Astro components + vanilla JS + CSS transitions.

**No auto-DOM surgery.** Every component wraps explicit markup. Content goes in slots.
