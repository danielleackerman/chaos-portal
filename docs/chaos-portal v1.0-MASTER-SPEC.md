# chaos-portal v1.0-MASTER-SPEC

 - Version 1.0 | Synthesized from: repo audit, v1.0 merged audits, component plan, persona spec
- Status: NORTH STAR + ROADMAP + REFERENCE
- For: Advanced Beginner Vibe-Coder operating as Human Governor

*This document is a living reference. It is the north star and the ground truth. When in doubt about what to build next, return here.*

---

## TABLE OF CONTENTS

[[#HOW TO USE THIS DOCUMENT]]

[[#PART 1 HONEST CURRENT STATE]]
- [[#What exists and genuinely works]]
- [[#What the gap is]]
- [[#What is deliberately not broken]]

[[#PART 2 THE NORTH STAR]]
- [[#What this portal becomes]]
- [[#The three inspiration targets feel not copy]]
- [[#What success looks like for a user]]
- [[#What success looks like for the builder]]

[[#PART 3 THE ARCHITECTURE YOU HAVE BUILT — PRESERVE THIS]]
- [[#The CSS architecture do not reorganize]]
- [[#The component contracts what each component expects]]
- [[#The Chrome Invariants every component follows these]]

[[#PART 4 THE SYSTEM MAP]]
- [[#Three layers that must not be confused]]
- [[#Current navigation vs target navigation]]

[[#PART 5 THE INTERACTIVE TOOLS TO BUILD]]
- [[#TOOL 0 COMPLETE THE COMPONENT DEPLOYMENT]]
- [[#TOOL 1 COORDINATE PICKER ENHANCEMENT]]
- [[#TOOL 2 THE STORY CIRCLE COMPONENT]]
- [[#TOOL 3 THE RELATIONSHIP FINDER]]
- [[#TOOL 4 HUB NODE SYSTEM]]
- [[#TOOL 5 THE MOMENT WORKBENCH]]

[[#PART 6 THE CONTENT DATABASE]]
- [[#For the Relationship Finder required before Tool 3 interface is built]]
- [[#For the Story Circle required before Tool 2 interface is built]]
- [[#For the Workbench example bank required before Tool 5 is usable]]

[[#PART 7 EXECUTION PRINCIPLES FOR YOUR LEVEL]]
- [[#Your actual job]]
- [[#The four questions to ask after every build]]
- [[#When to stop and re-spec]]
- [[#The sequence rule]]
- [[#What to bring to every build session]]
- [[#The anti-patterns that will waste your time]]

[[#PART 8 WHAT YOU ARE NOT BUILDING YET]]

[[#PART 9 GLOSSARY OF DEFINED TERMS]]

[[#PART 10 VERSION RECORD]]

---

## HOW TO USE THIS DOCUMENT

This document is three things at once.

**As a North Star:** Read Part 2 when you feel lost about what you're building. It describes what "done" looks and feels like. Return here before starting any new build session.

**As a Roadmap:** Read Part 5 in order. The tools are sequenced. Do not skip ahead. Each tool is a prerequisite for the one after it.

**As a Reference:** When you sit down with an AI to build something, bring the relevant section from this document. Your job is to translate the section into a prompt. The AI's job is to execute it. Your job is to judge whether the outcome matches what is described here — not whether the code looks right, but whether the thing works the way a human would need it to work.

**The one rule that governs everything:** You do not review code. You review outcomes. If the tool does what it is supposed to do for the user who needs it, the build succeeded. If it doesn't, the spec was incomplete or the execution was wrong — your job is to figure out which.

---

## PART 1: HONEST CURRENT STATE

### What exists and genuinely works

The foundation of this project is real and solid. Do not let anyone — including yourself — talk you into throwing it away or starting over.

**The design system is complete and correct.** `global.css` is a clean import hub. Tokens flow from `tokens.css` → `base.css` → `patterns/` → `components/`. The 10 Chrome Invariants from the v3.7 UI audit are reflected in the actual code. Signal Amber (`#F59E0B`) and Clarity Teal (`#14B8A6`) are applied with semantic logic: amber for horizontal axis (timeline position), teal for vertical axis (story depth). The dimension depth scale (teal at increasing opacity D5→D0) and position intensity scale (amber by story arc intensity) exist as CSS variables and are in use. Dark mode works. The typography hierarchy is correct. This is a professional-grade design system. Protect it.

**Five Astro components exist and work:**
- `Tabs.astro` — tab strip for switching between parallel content panels
- `ExpandingCards.astro` — horizontal panels that expand/shrink on click; supports both inline content and slotted content
- `FlipCard.astro` — card that flips to reveal back content; intended for Story Circle / clock positions
- `CoordinatePicker.astro` — MVP coordinate selector using dropdowns; functional but not yet the visual instrument it needs to become
- `Accordion` — implemented as a CSS pattern with `<details>` elements, not a separate component file

**The Vertical Axis page is the proof of concept.** At 995 lines, it demonstrates that Tabs inside Accordions inside a page layout works — each of the six dimensions gets an accordion item containing a tab strip with seven tabs (Overview, Framework References, Contents, Analysis Questions, Use When, Connections, Examples). This is the pattern to replicate. It also has an alternate view (`expanding-cards.astro`) that renders the same six dimensions as ExpandingCards. Both work.

**The Library is operational.** `src/data/library.js` exports `NAV_DATA` — a curated catalog of 1,476 resources across music theory and narrative craft. Pagefind provides working site-wide search. This is the substrate. It does not need to be rebuilt.

**Eight Compass pages exist** covering the full intellectual framework: Orientation, Horizontal Axis, Story Structure, Vertical Axis, Intersection Logic, Navigation Protocols, Practical Application, and Implementation Guide.

### What the gap is

The site describes a coordinate system. It does not function as one.

Every Compass page except Vertical Axis delivers content as a long vertical scroll. The components that exist — Tabs, ExpandingCards, FlipCard — are deployed on one page and demonstrated in the Style Guide, but they have not been applied to the other seven Compass pages. The design system is built. The components are built. The content is written. The gap is that the content has not been delivered through the components.

There is a second, deeper gap: the site has no interactive tools. The CoordinatePicker exists as a dropdown form. It outputs notation. It does not highlight content, jump to sections, connect to examples, or function as the instrument the framework promises. The **Relationship Finder**, the **Story Circle**, the **Hub Node system**, and the **Moment Workbench** do not exist yet. These are the tools that transform the portal from a reading experience into an analytical instrument.

**The diagnosis in one sentence:** The intellectual system is complete. The presentation system is built. The deployment of the presentation system across the content is 12% done. The interactive tools are 0% done.

### What is deliberately not broken

The mobile scaffold exists (`v1.7.3-mobile-css-scaffold.md`). The site does not break on mobile. Do not touch the responsive scaffold until the desktop experience is complete.

The Library is not the problem. Do not reorganize the Library.

The `#` placeholder links in the Compass pages (cross-links that go nowhere) are a known issue and a low priority. Fix them after the interactive tools exist.

---

## PART 2: THE NORTH STAR

### What this portal becomes

A public-facing, interactive, map-like creative portal where a user can select a coordinate in a story (a moment in time × a depth of analysis), navigate to the relevant frameworks and analytical questions, compare concepts across narrative systems, and understand how ideas in one framework relate to ideas in another — without being misled into false equivalences.

The feeling it creates: a user opens the portal, selects a clock position and a dimension, and the portal assembles the relevant intellectual territory for them. The site stops being a document they read and becomes an instrument they use.

### The three inspiration targets (feel, not copy)

**Dramatica Narrative Platform** (`platform.dramatica.com`) — dashboard feel, structured navigation, portal energy. The sense that you are operating a tool, not reading an article.

**Music Maps** (`musicmaps.app/lab`) — conceptual exploration, map/atlas feeling, discovery-oriented. The sense that knowledge is spatial and you can navigate it.

**OpenClaw** (`openclaws.io`) — tool-forward, modern product aesthetic, clarity and action. The sense that clicking something does something useful.

### What success looks like for a user

A user analyzing a story can:
1. Select a story position (e.g., 6:00 — the midpoint) and a depth dimension (e.g., D2 — Psychological)
2. See the coordinate displayed (`[6:00 / D2]`) and immediately understand what analytical territory that represents
3. Navigate to the frameworks and analytical questions relevant to that coordinate
4. Search for a concept (e.g., "Shadow") and find where it appears across all six dimensions
5. Compare two concepts from different frameworks (e.g., Jung's Shadow vs. Dramatica's Antagonist) and receive an honest similarity score with an explanation of where they align and where they diverge
6. Do all of the above without a cognitive load that exceeds the intellectual work of the analysis itself

### What success looks like for the builder

You have succeeded when:
- A person who has never seen the site can navigate from the home page to a specific analytical coordinate in under 60 seconds without asking for help
- The Relationship Finder returns similarity scores that feel accurate to someone who knows both frameworks being compared
- A user discovers a framework they did not know through the cross-linking system
- The portal prevents false equivalences — it does not let users flatten distinct frameworks into identical meanings
- You can add a new framework to the Relationship Finder database without rebuilding anything

---

## PART 3: THE ARCHITECTURE YOU HAVE BUILT — PRESERVE THIS

### The CSS architecture (do not reorganize)

```
src/styles/
  global.css              ← import hub only; no styles live here
  tokens.css              ← all CSS variables (colors, spacing, typography, shadows, radii)
  base.css                ← element defaults and baseline typography
  patterns/               ← CSS-only reusable patterns (no Astro components)
    layout.css
    cards.css
    content.css
    hero.css
    callouts.css
    breadcrumb.css
    tags.css
    section-nav.css
    dimension-card.css
  components/             ← component-specific CSS (paired with .astro files)
    tabs.css
    accordion.css
    expanding-cards.css
    flip-card.css
    coordinate-picker.css
```

**The governing rule:** Styles live in external CSS files. No `<style>` blocks inside `.astro` files. No scoped styles. No `data-astro-cid` surprises. When a new component is built, it gets a CSS file in `components/` and that file gets imported into `global.css`.

### The component contracts (what each component expects)

**`<Tabs>`** — Accepts an `id`, an `accent` color (`"amber"` or `"teal"`), and a `labels` array. Content goes in named slots (`slot="tab-0"`, `slot="tab-1"`, etc.). The tab count must match the labels array length.

**`<ExpandingCards>`** — Two modes: (1) inline mode with `items` prop (array of objects with `id`, `label`, `title`, `description`); (2) slotted mode with `cards` prop (array of objects with `id`, `label`, and optional `depth`/`position`) where content goes in named slots. Accepts `orientation` (`"horizontal"` or `"vertical"`) and `defaultActive` (the `id` of the card open by default).

**`<FlipCard>`** — Front and back content in named slots. Accepts accent color. Has not yet been deployed to any content page. Reserved for Story Circle / clock position cards on the Horizontal Axis page.

**`<CoordinatePicker>`** — Currently a dropdown form. Outputs notation text. _Needs enhancement per Part 5, Tool 1._

**Accordion** — Implemented as a CSS pattern using `<details>` / `<summary>` elements with classes `accordion-item`, `accordion-toggle`, `accordion-body`. Supports `data-accordion-group` for expand/collapse all controls. Not a separate `.astro` file — it is markup + CSS.

### The Chrome Invariants (every component follows these)

Every component uses the same visual frame. Only interaction behavior differs between components.

| Property | Value |
|---|---|
| Border | `1px solid var(--border)` |
| Border radius (cards) | `var(--radius-md)` = 6px |
| Border radius (containers) | `var(--radius-lg)` = 10px |
| Background | `var(--surface)` or `var(--surface-elevated)` |
| Text | `var(--text)`, `var(--text-2)`, `var(--text-3)` only |
| Shadow | `var(--shadow-subtle)` on hover; `var(--shadow-card)` on active |
| Transition | `all 0.2s ease` for hover; `0.3–0.4s ease` for expand/flip/slide |
| Axis color | Teal for vertical content; Amber for horizontal content |
| Typography | DM Serif Display for card titles; system sans for body; monospace for coordinates |
| Spacing | 8px scale only (`--space-xs` through `--space-xl`) |

---

## PART 4: THE SYSTEM MAP

### Three layers that must not be confused

**Layer 1 — Modules** (where the substance and tools live)
- **Library** — the substrate; 1,476 curated resources; everything not to be lost; feeds the Atlas
- **Compass** — the coordinate system; the stable grammar of the portal; where definitions live; the thing that makes this portal unique
- **Creativity Engine** — the orchestration layer (future); consumes Library + Compass; outputs sessions, maps, prompts
- **Matrices** — Piano Matrix, Vocal Matrix (future); practice tools that produce repeated action

**Layer 2 — Surfaces** (presentation views that pull from modules without duplicating them)
- **Field Guide** — the on-ramp; "How to use this portal," vocabulary, "Start here"; clean, instructional, stable; high authority; the page people bookmark
- **Atlas** — the curated map; selective and opinionated; the Compass sections, the top frameworks, the Bridge pages; where taste and direction are visible; the destination you send people to
- **Workbench** — the active laboratory; prototypes, experiments, tools-in-use; where the Creativity Engine lives as a use-case; where drafts are allowed

**Layer 3 — Functions** (content-role labels that apply inside any page or section)
- 🔍 **Orientation** — "What is this? How do I use it?"
- 🧠 **Depth** — canonical, long-form, theory, foundational
- 🛠 **Application** — steps, workflows, templates, "do the thing"
- ✨ **Signal** — taste, exemplars, "this matters," inspirational anchors
- 🧩 **Bridge** — cross-domain connectors (music ↔ story; Jung ↔ Dramatica)

**The governing rule:** Surfaces pull from modules. Surfaces do not duplicate content — they offer different views of the same content. The Library is the warehouse. The Atlas is the showroom. The Field Guide is the tour. The Workbench is the studio. The Compass is the map.

### Current navigation vs. target navigation

**Current nav:** Home / Library / Compass / Search / Dark Mode

**Target nav (when surfaces are built):** Start Here (Field Guide) / Atlas / Compass / Library / Workbench / Tools

This navigation change is a Phase 3 concern. Do not rebuild the nav until the interactive tools exist. The current nav is correct for the current state.

---

## PART 5: THE INTERACTIVE TOOLS TO BUILD

The tools are ordered by dependency. Each tool is buildable only after the preceding ones exist or are running in parallel. Do not attempt Tool 3 before Tool 1 is stable.

---

### TOOL 0: COMPLETE THE COMPONENT DEPLOYMENT
**Priority: Do this first. It is not a new build — it is applying what already exists.**

**What this is:** The seven Compass pages that are currently flat vertical scroll need the components applied to them. This is not a redesign. It is applying the established patterns from the Vertical Axis page to the pages that don't have them yet.

**What done looks like:** Each Compass page uses the right components for its content type. Reading 1,400 lines of flat text is replaced by reading 150 lines of primary content with 1,250 lines of secondary content available on demand through tabs and accordions.

**Component assignments per page:**

*Orientation (`/compass/orientation/`)*
- FlipCard × 2 — front face describes the axis concept, back face shows the key frameworks and notation examples. One for Horizontal Axis (amber accent), one for Vertical Axis (teal accent).
- Accordion × 1 — "How to Navigate" protocol with expand/collapse sections
- Tabs × 1 — Coordinate explanation in three tabs: Notation / Reading / Examples
- Accent color for neutral content: Gray (not Info Blue — the UI audit explicitly flagged this change)

*Horizontal Axis (`/compass/horizontal-axis/`)*
- Story Circle component (see Tool 2) — the clock positions as an interactive circular layout. This is the flagship interaction for this page.
- ExpandingCards for the "Which Frameworks at Which Position" section — one card per key clock position
- Tabs inside each card — same seven-tab pattern from Vertical Axis
- Accordion for "Horizontal Movement Patterns" reference section

*Story Structure (`/compass/story-structure/`)*
- Accordion per structural framework (Hero's Journey, Story Circle, Act Structure, etc.) — this page has the most content and the most to gain from progressive disclosure
- Tabs inside each accordion — Framework Overview / Structural Function / Dimension Crosswalk / Examples
- The six-dimension crosswalk section becomes a Tabs strip (one tab per dimension)

*Intersection Logic (`/compass/intersection-logic/`)*
- ExpandingCards for "Intersection Signatures" — one card per key coordinate intersection
- Tabs for the "Cross-Reference System" section
- Accordion for "Common Intersection Patterns"
- Gradient accent (amber→teal) throughout — this is the cross-axis page

*Navigation Protocols (`/compass/navigation-protocols/`)*
- Accordion × ~5 — one per analysis method (Surface-to-Core, Core-to-Surface, Position-Anchor, etc.)
- FlipCard × ~5 — worked examples inside or adjacent to accordions; front shows the protocol, back shows a concrete example
- Gray accent throughout

*Practical Application (`/compass/practical-application/`)*
- Accordion for each template category (Scene Log, Multi-Film Comparison, Dimension Analysis Worksheet, etc.)
- Tabs inside the Logging Templates section — one tab per template format
- Gradient accent

*Implementation Guide (`/compass/implementation-guide/`)*
- Accordion × ~12 — one per part and appendix (Parts I–XI, Appendices A–E)
- This page is reference material; accordion is the right pattern for reference material the user dips into rather than reads linearly
- Gray accent

**Acceptance condition for Tool 0:** Every Compass page is navigable without reading more than two screenfuls of continuous text. Every page uses components from the established design system. No new CSS is written. No existing content is removed or shortened.

---

### TOOL 1: COORDINATE PICKER ENHANCEMENT
**Priority: High. This is "the first moment where the portal stops being a scroll and starts being a device."**

**What this is:** The existing CoordinatePicker currently uses two dropdowns and outputs a notation string. This tool enhances it to function as a spatial instrument — a visual dual-axis selector that outputs notation, displays a description of the selected coordinate, and navigates the user to the relevant content.

**What done looks like:** A user opens the Vertical Axis page (or any Compass page). A compact instrument is visible near the top. The user selects a clock position and a depth dimension — either by clicking visual buttons representing the 13 positions and 6 dimensions, or by using the existing dropdowns as a fallback. The instrument outputs the coordinate notation in monospace (`[6:00 / D2]`). Below the notation, two lines appear: (1) the name of the selected position (e.g., "Midpoint / Find Point / Revelation") and (2) the name of the selected dimension (e.g., "Psychological Dimension 2 — Emotional & Affective States"). A "Go to Section" button scrolls the page to the relevant accordion item for that dimension (on the Vertical Axis page) or the relevant position card (on the Horizontal Axis page).

**What this does not do (not in scope):** It does not connect to an example bank. It does not highlight content on the page. It does not save anything. It does not require a database. Those are Tool 4 and Tool 5 concerns.

**Data it needs to function:**
- 13 clock positions: labels (`12:00`, `1:00`, ... `12:00`) + descriptive names (`Origin / Return`, `Need becomes conscious`, `Threshold / Go Point`, etc.)
- 6 dimensions: labels (`D0`–`D5`) + full names + one-sentence descriptions
- A mapping from each dimension label to its anchor ID on the Vertical Axis page (e.g., `D2` → `#d2-details`)

**Acceptance condition:** A user can select any coordinate combination and within 2 seconds see the notation displayed, read a one-sentence description of that coordinate, and click to navigate to the relevant section of the page.

---

### TOOL 2: THE STORY CIRCLE COMPONENT
**Priority: Medium-High. This is the flagship interaction for the Horizontal Axis page.**

**What this is:** A new visual component that renders the 13 clock positions as a circular layout — a clock face with position markers — rather than a list or a dropdown. This is the component the UI audit identified as "YES — SPECIAL" (Circular Flip Card Gallery, for clock positions). It is the visual proof that the horizontal axis is a circle, not a line.

**What done looks like:** On the Horizontal Axis page, a circular diagram renders with 13 labeled markers at clock positions. Each marker shows the position label (`6:00`) and the one-word summary of that position (`Revelation`). Clicking or tapping a position marker (1) highlights that marker, (2) updates the CoordinatePicker to the selected position, (3) scrolls to or reveals a card showing the key frameworks and analytical questions for that position.

**Visual design:** The clock face uses amber at the position intensity scale — position `9:00` (Crisis) renders at full amber saturation; position `12:00` (Origin) renders at the lightest amber. This encodes narrative tension into the visual without words.

**What this does not do (not in scope):** It does not animate a "journey" around the circle. It does not connect to user data. It does not display two stories simultaneously. Those are Phase 3 concerns.

**Acceptance condition:** The Story Circle renders correctly on desktop (minimum 600px width). Clicking any position marker does at minimum one of the three behaviors described above. On mobile (below 600px), the Story Circle gracefully degrades to the dropdown CoordinatePicker.

---

### TOOL 3: THE RELATIONSHIP FINDER
**Priority: High. This is the most intellectually distinct tool in the portal — the one no other site has.**

**What this is:** A cross-system concept lookup and comparison tool. A user enters or selects a concept from one narrative framework. The tool returns related concepts from other frameworks with a similarity score and an honest explanation of where frameworks align and where they diverge. It prevents false equivalences — the core problem it solves.

**The problem it solves precisely:** Users working with multiple analytical systems (Jung, Dramatica, Enneagram, etc.) need to understand how concepts relate across frameworks without losing the unique value of each system. "Shadow" in Jung is not the same as "Antagonist" in Dramatica. They are related but distinct. This tool makes that distinction visible and actionable.

**Database structure (what needs to be built before the interface):**

The database is the most important part of this tool. The interface is secondary. Build the database first.

*Concepts Table — one record per concept:*
```
Concept ID         (unique string, e.g., "jung-shadow")
Concept Name       (display name, e.g., "Shadow")
Primary Dimension  (0–5)
Source Framework   (e.g., "Jungian Psychology")
Short Definition   (1–2 sentences, plain language)
Narrative Function (what work it does in a story)
Hub Node Status    (true/false — see Hub Node criteria in Part 6)
```

*Relationships Table — one record per pair of related concepts:*
```
Concept A ID
Concept B ID
Relationship Type   (one of four: Equivalent / Resonant / Contrasts / Complements)
Similarity Score    (integer 0–100)
Overlap Description (where they align — 2–3 sentences)
Distinction Notes   (where they differ — 2–3 sentences)
Usage Guidance      (when to use A vs. B)
```

*Frameworks Table — one record per framework:*
```
Framework ID
Framework Name
Primary Author / Source
Best Used For      (one sentence)
Dimensions Covered (list of 0–5)
Related Frameworks (list of Framework IDs)
```

**Similarity score definitions (these are non-negotiable; they prevent false equivalences):**
- 80–100%: **Equivalent** — near-identical concept in a different terminological system; safe to use interchangeably in most contexts
- 50–79%: **Resonant** — meaningfully similar but distinct; useful to read alongside each other; do not substitute one for the other
- 30–49%: **Partial** — share a family resemblance but serve different functions; read both; note the distinctions
- 0–29%: **Minimal** — appear similar on the surface but are structurally different; use caution when cross-referencing

**Worked example (the canonical test case):**
- Concept A: Jung — Shadow
- Concept B: Dramatica — Antagonist
- Similarity Score: 40 (Partial)
- Overlap: Both represent an opposing force. Both can be externalized as a character or force in the story.
- Distinction: Shadow is internal and psychological — it is the repressed self-aspect the protagonist has not integrated. Antagonist is functional and structural — it is the role that serves the story's argument by opposing the Protagonist. A Shadow can become a protagonist's own recognized and integrated self; an Antagonist almost never does. The Antagonist is about plot architecture; the Shadow is about character psychology.
- Usage Guidance: Use the Shadow lens when analyzing character interiority, self-deception, and transformation arcs. Use the Antagonist lens when analyzing plot structure, ensemble balance, and the story's central argument.

**Minimum viable database size for launch:** 50 concepts across 5 frameworks (Jung, Dramatica, Enneagram, Campbell/Hero's Journey, Save the Cat or Story Grid). 80 relationship records (not every concept pairs with every other concept — only map the relationships that are genuinely instructive).

**The user interface:**

*Primary flow — concept lookup:*
1. User types a concept name or selects a framework from a dropdown
2. If a framework is selected, the tool shows all concepts in that framework
3. User selects a concept
4. Tool displays: the concept's full definition, its primary dimension, its Hub Node status (if any), and all related concepts with similarity scores

*Secondary flow — framework comparison:*
1. User selects Framework A and Framework B
2. Tool displays a list of all mapped concept pairs between the two frameworks, ordered by similarity score descending
3. User can filter to show only Equivalent, Resonant, Partial, or Minimal relationships

*Search:*
- User types a concept name
- Autocomplete suggests matching concepts from any framework
- Selecting a suggestion triggers the primary lookup flow

**What this does not do (not in scope for v1):** User accounts. Saving comparisons. Community-submitted relationships. AI-generated relationship scores. These are Phase 3 concerns.

**Acceptance condition:** A user searching for "Shadow" sees: its Jungian definition, its primary dimension (D2), its Hub Node status (yes — 5 dimensions), and at minimum 3 related concepts from other frameworks with similarity scores and distinction notes. The similarity scores feel accurate to someone who knows Jung and at least one other compared framework. The tool does not suggest that any two concepts are equivalent when they are not.

---

### TOOL 4: HUB NODE SYSTEM
**Priority: Medium. Depends on the Relationship Finder database existing.**

**What this is:** A visual treatment and navigation system for concepts that appear across three or more dimensions. Hub nodes are the connective tissue of the portal — the concepts that, when understood, illuminate multiple dimensions simultaneously.

**Hub Node criteria (a concept qualifies when it meets all three):**
1. Appears in 3 or more of the 6 dimensions with a distinct, non-trivial function in each
2. Has high analytical utility — knowing this concept makes the user better at analysis
3. Requires cross-dimensional understanding to grasp fully — it cannot be understood from one dimension alone

**The four confirmed Hub Nodes from the audit (these must be in the system at launch):**

*Shadow*
- Primary Dimension: D2 (Psychological)
- Also appears in: D0 (repressed problem, denied truth), D1 (underworld descent myths, dark twin archetype), D3 (projection bias, splitting, confirmation bias), D5 (mirror imagery, dark doubles, visual inversion)
- Hub status: 5 dimensions

*Recognition (Anagnorisis)*
- Primary Dimension: D4 (Structural)
- Also appears in: D0 (core realization about the problem), D2 (identity shift moment), D3 (pattern recognition, belief revision)
- Hub status: 4 dimensions

*Threshold*
- Primary Dimension: D1 (Archetypal)
- Also appears in: D0 (point of no return, irreversible choice), D4 (structural turning point, act break)
- Hub status: 3 dimensions

*Voice*
- Primary Dimension: D5 (Expressive Surface)
- Also appears in: D2 (character identity expression), D3 (rhetorical authority, ethos)
- Hub status: 3 dimensions

**Visual treatment:**
- Hub Node entries in the Relationship Finder display a special badge showing the number of dimensions the concept spans
- On dimension pages, Hub Node concepts are marked with a distinct visual indicator (filled circle ● notation)
- Clicking a Hub Node indicator anywhere on the site navigates to the Hub Node's master entry in the Relationship Finder

**Hub Node master entry format:**
```
[CONCEPT NAME]

Primary Dimension: [D#] — [Dimension Name]
Hub Status: [N] dimensions

Primary Definition:
[Core explanation in the primary dimension context — 2–4 sentences]

Cross-Dimensional Presence:
- Dimension [X]: [Function/meaning in this dimension — 1–2 sentences]
- Dimension [Y]: [Function/meaning in this dimension — 1–2 sentences]
- Dimension [Z]: [Function/meaning in this dimension — 1–2 sentences]

See Also:
- Related frameworks: [list]
- Contrasts with: [list]

Story Examples:
- [Concrete film/novel/story instance 1 — one sentence]
- [Concrete film/novel/story instance 2]
```

**Acceptance condition:** All four confirmed Hub Nodes have master entries. On the Vertical Axis page, at least Shadow and Recognition are marked with their Hub Node indicators. The Hub Node indicator links to the correct master entry. A user who does not know what a Hub Node is can understand the concept from the indicator treatment alone without reading an explanation.

---

### TOOL 5: THE MOMENT WORKBENCH
**Priority: Lower — Phase 2. Do not build this until Tools 1–4 are stable.**

**What this is:** A working surface where a user can analyze a specific story moment using the coordinate system. The user selects a clock position and one or more dimensions, and the portal assembles the relevant analytical framework for that coordinate — the questions to ask, the frameworks that apply, the analytical pattern to look for.

**What done looks like:** A user selects `[6:00 / D2]`. The Workbench displays: the coordinate definition, the Psychological Dimension 2 analytical questions for that story position, the frameworks most relevant at this coordinate (Enneagram — disintegration points; Jung — Shadow integration failure; Dramatica — Protagonist ethical reversal), and a template the user can fill in with their own analysis notes. The user can add the coordinate to a "plot map" — a collection of analyzed moments for one story.

**What this does not do in Phase 2:** Cloud storage. User accounts. Sharing. Export. In Phase 2, the Workbench uses browser `localStorage` only — the plot map persists on that device and browser but does not sync or save permanently.

**The example bank:** The Workbench depends on a curated set of pre-analyzed story moments with coordinates already populated. The example bank is the content that makes the Workbench immediately useful on first use. Minimum 10 worked examples at launch, each with a coordinate, a story reference, and a 2–3 sentence analysis note per dimension.

**Acceptance condition:** A user can select a coordinate, see the relevant analytical framework assembled, and fill in analysis notes. The notes persist for that browser session. The example bank contains at least 10 worked examples a user can view and learn from.

---

## PART 6: THE CONTENT DATABASE

The interactive tools depend on structured data. Before building any tool interface, the data must exist. This section specifies the data that needs to be created — as JSON files living in `src/data/`, not in any external database.

### For the Relationship Finder (required before Tool 3 interface is built)

Five frameworks minimum for v1 launch:

- **D0 (Core):** Dramatica (problem typologies, value polarities, premise arguments), Truby (moral argument)
- **D1 (Archetypal):** Campbell/Hero's Journey, Propp's morphology, Jung archetypes applied to narrative
- **D2 (Psychological):** Enneagram applied to character, Jungian psychology, defense mechanisms applied to character behavior
- **D3 (Cognitive):** Logical fallacies as character belief patterns, rhetorical modes (ethos/pathos/logos), cognitive biases in character decision-making
- **D4 (Structural):** Dramatica structure functions, Save the Cat beats, Story Grid obligatory scenes, Harmon Story Circle
- **D5 (Surface):** Trope categories as analytical anchors, visual symbolism (color, threshold imagery, light/dark), genre surface conventions

### For the Story Circle (required before Tool 2 interface is built)

13 position objects, each containing:
- Short label: `"12:00"`
- Position name: `"Origin / Return"`
- Phase summary (one sentence)
- Key story function (two sentences)
- Frameworks most active at this position (2–4 names)

### For the Workbench example bank (required before Tool 5 is usable)

10 story moment objects, each containing:
- Story title and medium
- Scene description (one sentence)
- Primary coordinate: position + dimension
- Analysis note per selected dimension (2–3 sentences each)

---

## PART 7: EXECUTION PRINCIPLES FOR YOUR LEVEL

These are the operating rules for a vibe-coder working with AI as the implementation agent. They are adapted from the Dark Factory Engineer competencies for an advanced beginner — someone who understands the concepts, can read code to check if it does what it should, but does not write code from scratch.

### Your actual job

You are the one human in the loop. Your job is judgment, not implementation.

**Before a build session:** Read the relevant section of this spec. Know what you want the outcome to be — not what the code should look like, but what a user would experience.

**During a build session:** Describe what you want in terms of user behavior and outcomes. "When the user clicks a clock position, it should highlight and scroll to the relevant section" is a good brief. "Use a `click` event listener on `data-position` attributes to call `scrollIntoView()`" is not your job to specify.

**After a build session:** Test the thing as a user. Does it do what you described? Is anything broken? You are not reviewing the code — you are reviewing the outcome.

### The four questions to ask after every build

1. Does this solve the problem I described?
2. Does this break anything that was working before?
3. Does this match the design system? (Chrome Invariants applied, no new colors, no arbitrary spacing)
4. Does a person who hasn't seen this before understand how to use it without explanation?

### When to stop and re-spec

Stop and return to this document when:
- You are three messages into a back-and-forth about why something doesn't work and you don't understand the problem
- The AI is adding features that weren't in the spec or removing things that were
- The outcome looks functional but feels wrong to use
- The scope is creeping

Re-spec means: come back to this document, find the relevant section, tighten the description of what done looks like, and start the build session again with the tighter brief.

### The sequence rule

Build in this order. Skipping causes rework.

```
Tool 0 (Component Deployment)
  → Tool 1 (CoordinatePicker Enhancement)
    → Content Database (JSON files)
      → Tool 2 (Story Circle) ←→ Tool 3 (Relationship Finder) [parallel OK]
        → Tool 4 (Hub Node System)
          → Tool 5 (Moment Workbench)
```

### What to bring to every build session

- The relevant section of this spec (copy it into the conversation)
- The current state of the file being modified (the actual code, not a description of it)
- The acceptance condition from this spec
- A statement of what specifically you are building today — not the whole tool, just the next piece

### The anti-patterns that will waste your time

**Building the interface before the data exists.** A Relationship Finder with no relationship data is a search box that returns nothing. Build the JSON files first.

**Rebuilding what works.** The design system is correct. The Vertical Axis page works. Improve things that don't work yet.

**Scope creep within a session.** If you start a session to build the Story Circle and the AI suggests also adding tooltips, animation, and a dark mode variant — stop. Build the Story Circle. The other things get their own sessions.

**Accepting an output because it looks right.** An accordion that opens and closes is not a success. An accordion that opens, closes, renders correct content, works on mobile, and matches the Chrome Invariants is a success.

**Fixing code you don't understand.** If you can't read the AI's fix well enough to know what it does, ask for a plain language explanation before accepting it. If the explanation doesn't make sense, the fix is wrong.

---

## PART 8: WHAT YOU ARE NOT BUILDING YET

These items appear in the audit documents and are correct north star material. They are not v1 scope.

**Not yet:**
- User accounts and saved analyses (requires backend; Supabase when ready)
- PDF export of analyses
- Community-submitted templates or relationship mappings
- AI-assisted analysis prompts at each coordinate
- Heat maps of story activity distribution
- Comparative analysis slider (two stories simultaneously)
- The full tri-pane cockpit layout (left sidebar + center content + right rail) — this becomes the layout when the Workbench exists; it is overhead without the Workbench
- Field Guide, Atlas, and Workbench as distinct navigation destinations — these become real when there is content to put in each surface
- Bridge pages connecting music and story domains — correct and important; they come after the Compass tools are complete

**The line:** Everything in Part 5 is v1. Everything in this section is v2. The line is drawn at: does this require a backend, user accounts, or content that doesn't exist yet?

**Tools that exist as named architecture positions only — no interaction-level spec yet:

**Creativity Engine (Songwriting Dashboard)**
- The orchestration layer of the portal. Described as the system that consumes Library + Compass and outputs sessions, maps, prompts, and plans. Folder structure is sketched (workflows/, prompts/, templates/, integrations/). Intended to eventually include songwriting sessions, composing sessions, analysis sessions, and prompt recipes. At v1, it gets a "Coming Soon" intro page on the home page with the description "Generative prompts and combinatorial creativity tools." No interaction-level spec exists. This is a Phase 3 tool.
**Piano Exercise Matrix**
- A practice tool described as a "product/sub-app with datasets, UI, and logging." Folder structure sketched: index.md, library.md, practice-plans.md, data/schema.md. Intended to contain practice patterns, chord maps, and keyboard exercises. Connects to Library (as reference backing) and Compass (as a coordinate lens for practice). At v1, it gets a "Coming Soon" intro page. No interaction-level spec exists. This is a Phase 3 tool.
**Vocal Exercise Matrix**
- Mirrors the Piano Matrix in structure and treatment. Same folder pattern. Intended to contain vocal warmups, range exercises, and technique drills. At v1, a "Coming Soon" intro page. No interaction-level spec exists. This is a Phase 3 tool.

---

## PART 9: GLOSSARY OF DEFINED TERMS

**Accordion** — A disclosure pattern using `<details>` / `<summary>` HTML elements. Classes: `accordion-item`, `accordion-toggle`, `accordion-body`. Not a separate Astro component. Controlled by `data-accordion-group` for expand/collapse all.

**Chrome Invariants** — The 10 fixed visual properties every component shares. See Part 3, Chrome Invariants table.

**Compass** — The coordinate system module. 8 sections (`/compass/orientation/` through `/compass/implementation-guide/`) defining the intellectual framework. The stable grammar.

**Coordinate** — A specific intersection of Story Timeline Position and Story Depth Dimension in the format `[Position / Dimension]`. Example: `[6:00 / D2]`.

**Hub Node** — A concept appearing with a distinct, non-trivial function in 3 or more of the 6 Story Depth Dimensions. Currently confirmed: Shadow (5D), Recognition (4D), Threshold (3D), Voice (3D).

**Library** — The substrate module. 1,476 curated resources in `src/data/library.js`. Not to be reorganized.

**Module** — One of four substance/tool systems: Library, Compass, Creativity Engine, Matrices. Modules hold the truth. Surfaces present it.

**Relationship Finder** — Tool 3. Cross-system concept lookup and comparison tool returning similarity scores (0–100) for concept pairs across frameworks.

**Similarity Score** — Integer 0–100 expressing how closely two concepts from different frameworks overlap. 80–100: Equivalent. 50–79: Resonant. 30–49: Partial. 0–29: Minimal. Scores below 80 require a Distinction Note.

**Story Circle** — Tool 2. Circular visual component for the 13 clock positions on the Horizontal Axis page.

**Story Depth Dimension** — One of 6 analytical depths. D0: Core. D1: Archetypal. D2: Psychological. D3: Cognitive. D4: Structural. D5: Surface.

**Story Timeline Position** — One of 13 points on the horizontal axis: 12:00 through 12:00 (return).

**Surface** — One of three presentation views: Field Guide, Atlas, Workbench. Surfaces pull from modules without duplicating content.

**Workbench** — Tool 5. The moment analysis working surface. Also a future navigation destination.

---

## PART 10: VERSION RECORD

**v1.0** — Initial synthesis. Covers current state through Tool 5. Synthesized from: live repo audit (v1.7.3), merged audits document (11,221 lines), UI audit 4b component plan, PERSONA_SPEC.md, SPEC_TEMPLATE.md, ORG_CHART.md.

**Update this document when:**
- A tool from Part 5 reaches its acceptance condition (mark it complete with date)
- A Hub Node is added or confirmed list changes
- Navigation architecture changes (update Part 4)
- A new framework is added to the Relationship Finder database (update Part 6)
- A new anti-pattern is discovered in the wild (add it to Part 7)

---

*This document is a living reference. It is the north star and the ground truth. When in doubt about what to build next, return here.*
