# Style Guide Page Patch — v4 Progressive Disclosure
# Apply these changes to: src/pages/style-guide/index.astro

# ============================================================
# CHANGE 1: Fix the Style Guide hero — use neutral, not gradient
# ============================================================
# FIND:
#   <div class="page-hero page-hero--gradient">
#     <div class="eyebrow">REFERENCE</div>
#     <h1>Style Guide</h1>
#     <p class="subtitle">Living inventory of every component in the Chaos Portal design system (v3.5)</p>
#   </div>
#
# REPLACE WITH:
#   <div class="page-hero page-hero--neutral">
#     <div class="eyebrow eyebrow--neutral">REFERENCE</div>
#     <h1>Style Guide</h1>
#     <p class="subtitle">Living inventory of every component in the Chaos Portal design system (v4.0)</p>
#   </div>


# ============================================================
# CHANGE 2: Add TOC link for new Progressive Disclosure section
# ============================================================
# FIND:
#   <a href="#navigation" class="toc-grid__link">Navigation</a>
#
# AFTER THAT LINE, ADD:
#   <a href="#progressive-disclosure" class="toc-grid__link">Progressive Disclosure</a>


# ============================================================
# CHANGE 3: Add Neutral Hero demo to the Heroes section
# ============================================================
# FIND (in the heroes section):
#   <h3>Teal Hero</h3>
#   <div class="page-hero page-hero--teal">
#     <div class="eyebrow">VERTICAL</div>
#     <h1 style="font-size:1.75rem;">Teal Variant</h1>
#   </div>
#
# AFTER THAT BLOCK, ADD THE FOLLOWING:

<!-- START: Neutral Hero demo -->
NEUTRAL_HERO_HTML_START
      <h3>Neutral Hero (Meta pages)</h3>
      <div class="page-hero page-hero--neutral">
        <div class="eyebrow eyebrow--neutral">REFERENCE</div>
        <h1 style="font-size:1.75rem;">Neutral Variant</h1>
        <p class="subtitle">For Style Guide, Roadmap, and other system-level pages that aren't axis-specific.</p>
      </div>
      <div class="sg-type-details">
        <strong>Class:</strong> <code>page-hero--neutral</code> &nbsp;·&nbsp;
        <strong>Stripe color:</strong> <code>var(--border-accent)</code> (mid-gray) &nbsp;·&nbsp;
        <strong>Use when:</strong> Page is about the system itself, not about axis content
      </div>
NEUTRAL_HERO_HTML_END
<!-- END: Neutral Hero demo -->


# ============================================================
# CHANGE 4: Add Dimension Depth Scale to Colors section
# ============================================================
# FIND (in colors section):
#   <h3>Gradient Usage</h3>
#
# BEFORE THAT LINE, ADD:

<!-- START: Dimension depth scale -->
DEPTH_SCALE_HTML_START
      <h3>Dimension Depth Scale (Teal)</h3>
      <p>The 6 vertical dimensions use teal at increasing opacity to communicate analytical depth. Surface (D5) is lightest; Core (D0) is deepest. Same hue, no new colors.</p>
      <div class="sg-depth-strip">
        <div class="sg-depth-swatch" style="background:var(--dim-5);">D5</div>
        <div class="sg-depth-swatch" style="background:var(--dim-4);">D4</div>
        <div class="sg-depth-swatch" style="background:var(--dim-3);">D3</div>
        <div class="sg-depth-swatch" style="background:var(--dim-2);">D2</div>
        <div class="sg-depth-swatch" style="background:var(--dim-1);">D1</div>
        <div class="sg-depth-swatch" style="background:var(--dim-0);">D0</div>
      </div>
      <div class="sg-type-details">
        <strong>Variables:</strong> <code>--dim-5</code> (35%) through <code>--dim-0</code> (100%) &nbsp;·&nbsp;
        <strong>Usage:</strong> Border-left accent on dimension cards only &nbsp;·&nbsp;
        <strong>Rule:</strong> Never as background fill. Card surfaces stay <code>var(--surface)</code>.
      </div>

      <h3>Position Intensity Scale (Amber)</h3>
      <p>Clock positions use amber at varying intensity. Origin (12:00) is calm; Crisis (9:00) is maximum tension.</p>
      <div class="sg-depth-strip">
        <div class="sg-depth-swatch" style="background:var(--pos-12);">12:00</div>
        <div class="sg-depth-swatch" style="background:var(--pos-1);">1:00</div>
        <div class="sg-depth-swatch" style="background:var(--pos-3);">3:00</div>
        <div class="sg-depth-swatch" style="background:var(--pos-6);">6:00</div>
        <div class="sg-depth-swatch" style="background:var(--pos-9);">9:00</div>
        <div class="sg-depth-swatch" style="background:var(--pos-11);">11:00</div>
      </div>
      <div class="sg-type-details">
        <strong>Variables:</strong> <code>--pos-12</code> (35%) through <code>--pos-9</code> (100%) &nbsp;·&nbsp;
        <strong>Usage:</strong> Border-top accent on position cards &nbsp;·&nbsp;
        <strong>Pattern:</strong> Intensity mirrors story arc tension — low at origin, peak at crisis, easing on return.
      </div>
DEPTH_SCALE_HTML_END
<!-- END: Dimension depth scale -->


# ============================================================
# CHANGE 5: Add Progressive Disclosure section (NEW — insert before closing </div> of compass-content)
# ============================================================
# FIND (near end of file):
#   The last </div> before </PortalLayout> — this closes .compass-content
#
# BEFORE THAT CLOSING </div>, ADD:

<!-- START: Progressive Disclosure section -->
PROGRESSIVE_DISCLOSURE_HTML_START
    <hr/>

    <!-- ==================== PROGRESSIVE DISCLOSURE ==================== -->
    <div class="section" id="progressive-disclosure">
      <h2>Progressive Disclosure</h2>
      <p>Four interactive components that collapse content walls into navigable, scannable units. All share identical chrome — same borders, backgrounds, shadows, corners, and spacing. Only the behavior changes.</p>

      <div class="callout-info">
        <h4>The 10 Chrome Invariants</h4>
        <p>Every component below follows these rules: <code>1px solid var(--border)</code> borders · <code>var(--radius-md)</code> card corners · <code>var(--surface)</code> active background · <code>var(--shadow-card)</code> on expanded state · <code>0.2s ease</code> hover, <code>0.4s ease</code> state change · axis accent via border stripe only · 8px spacing scale · three text colors only.</p>
      </div>

      <!-- ===== TABS DEMO ===== -->
      <h3>Tabs</h3>
      <p>Switches between parallel content panels. Used inside accordions for sub-sections like <code>Overview · Frameworks · Questions · When to Use · Examples · Connections</code>.</p>

      <div class="tabs tabs--teal" id="demo-tabs">
        <div class="tabs__strip" role="tablist" aria-label="Demo tabs">
          <button class="tabs__tab" role="tab" aria-selected="true" aria-controls="demo-tab-0" id="demo-tabs-btn-0">Overview</button>
          <button class="tabs__tab" role="tab" aria-selected="false" aria-controls="demo-tab-1" id="demo-tabs-btn-1" tabindex="-1">Frameworks</button>
          <button class="tabs__tab" role="tab" aria-selected="false" aria-controls="demo-tab-2" id="demo-tabs-btn-2" tabindex="-1">Questions</button>
        </div>
        <div class="tabs__panel" role="tabpanel" id="demo-tab-0" aria-labelledby="demo-tabs-btn-0" aria-label="Overview">
          <p>This is the <strong>Overview</strong> panel. In production, this holds the dimension definition and contents summary. First tab is active by default.</p>
        </div>
        <div class="tabs__panel" role="tabpanel" id="demo-tab-1" aria-labelledby="demo-tabs-btn-1" aria-label="Frameworks" hidden>
          <p>This is the <strong>Frameworks</strong> panel. Lists applicable analytical frameworks for this dimension.</p>
        </div>
        <div class="tabs__panel" role="tabpanel" id="demo-tab-2" aria-labelledby="demo-tabs-btn-2" aria-label="Questions" hidden>
          <p>This is the <strong>Questions</strong> panel. Analysis questions to ask when working at this depth level.</p>
        </div>
      </div>

      <div class="sg-type-details">
        <strong>Markup:</strong> <code>.tabs.tabs--teal</code> (or <code>--amber</code>, <code>--blue</code>, <code>--gradient</code>) &nbsp;·&nbsp;
        <strong>Active indicator:</strong> 2px bottom border in accent color &nbsp;·&nbsp;
        <strong>Keyboard:</strong> Arrow keys navigate, Enter/Space activates &nbsp;·&nbsp;
        <strong>No-JS:</strong> All panels visible stacked
      </div>

      <h4>Amber Variant</h4>
      <div class="tabs tabs--amber" id="demo-tabs-amber">
        <div class="tabs__strip" role="tablist" aria-label="Amber demo tabs">
          <button class="tabs__tab" role="tab" aria-selected="true" aria-controls="demo-tab-amber-0" id="demo-tabs-amber-btn-0">Clock</button>
          <button class="tabs__tab" role="tab" aria-selected="false" aria-controls="demo-tab-amber-1" id="demo-tabs-amber-btn-1" tabindex="-1">Acts</button>
          <button class="tabs__tab" role="tab" aria-selected="false" aria-controls="demo-tab-amber-2" id="demo-tabs-amber-btn-2" tabindex="-1">Beats</button>
        </div>
        <div class="tabs__panel" role="tabpanel" id="demo-tab-amber-0" aria-labelledby="demo-tabs-amber-btn-0" aria-label="Clock">
          <p><strong>Clock measurement.</strong> 12-hour story positions mapped to narrative events.</p>
        </div>
        <div class="tabs__panel" role="tabpanel" id="demo-tab-amber-1" aria-labelledby="demo-tabs-amber-btn-1" aria-label="Acts" hidden>
          <p><strong>Act structure.</strong> Three-act, four-act, and five-act breakdowns.</p>
        </div>
        <div class="tabs__panel" role="tabpanel" id="demo-tab-amber-2" aria-labelledby="demo-tabs-amber-btn-2" aria-label="Beats" hidden>
          <p><strong>Beat markers.</strong> Granular story beats within acts.</p>
        </div>
      </div>

      <hr/>

      <!-- ===== EXPANDING CARDS DEMO — HORIZONTAL ===== -->
      <h3>Expanding Cards (Horizontal)</h3>
      <p>All cards visible as narrow strips. Click to expand. Shows the full set at a glance — no hidden content. Used for crosswalk dimensions, pattern cards, and templates.</p>

      <div class="expanding-cards expanding-cards--teal" id="demo-expanding-h">
        <div class="expanding-cards__card" aria-expanded="true" data-depth="5">
          <div class="expanding-cards__label">D5</div>
          <div class="expanding-cards__content">
            <h4 style="margin-top:0;">Surface · Expressive/Symbolic</h4>
            <p>What you directly see and hear. Observable phenomena — dialogue, visual composition, music, editing patterns. The most accessible layer of analysis.</p>
          </div>
        </div>
        <div class="expanding-cards__card" aria-expanded="false" data-depth="4">
          <div class="expanding-cards__label">D4</div>
          <div class="expanding-cards__content">
            <h4 style="margin-top:0;">Structural</h4>
            <p>How the story is organized. Act structure, scene sequences, plot architecture, pacing patterns.</p>
          </div>
        </div>
        <div class="expanding-cards__card" aria-expanded="false" data-depth="3">
          <div class="expanding-cards__label">D3</div>
          <div class="expanding-cards__content">
            <h4 style="margin-top:0;">Cognitive</h4>
            <p>How the story manages what the audience knows. Information control, suspense, irony, revelation timing.</p>
          </div>
        </div>
        <div class="expanding-cards__card" aria-expanded="false" data-depth="2">
          <div class="expanding-cards__label">D2</div>
          <div class="expanding-cards__content">
            <h4 style="margin-top:0;">Psychological</h4>
            <p>Interior experience of characters. Motivation, desire, fear, internal conflict, emotional architecture.</p>
          </div>
        </div>
        <div class="expanding-cards__card" aria-expanded="false" data-depth="1">
          <div class="expanding-cards__label">D1</div>
          <div class="expanding-cards__content">
            <h4 style="margin-top:0;">Archetypal</h4>
            <p>Universal patterns beneath the story. Mythic structures, collective unconscious, symbolic resonance.</p>
          </div>
        </div>
        <div class="expanding-cards__card" aria-expanded="false" data-depth="0">
          <div class="expanding-cards__label">D0</div>
          <div class="expanding-cards__content">
            <h4 style="margin-top:0;">Core</h4>
            <p>The irreducible center. What the story IS about at its deepest level. The question it asks of existence.</p>
          </div>
        </div>
      </div>

      <div class="sg-type-details">
        <strong>Markup:</strong> <code>.expanding-cards.expanding-cards--teal</code> &nbsp;·&nbsp;
        <strong>Depth scale:</strong> <code>data-depth="5"</code> through <code>"0"</code> sets accent stripe opacity &nbsp;·&nbsp;
        <strong>Chrome:</strong> Collapsed strips use <code>var(--surface-elevated)</code>, expanded card uses <code>var(--surface)</code> + <code>var(--shadow-card)</code> &nbsp;·&nbsp;
        <strong>Mobile:</strong> Automatically stacks vertical below 768px
      </div>

      <!-- ===== EXPANDING CARDS DEMO — VERTICAL ===== -->
      <h3>Expanding Cards (Vertical)</h3>
      <p>Same component, vertical orientation. Used <strong>only</strong> on the Vertical Axis page — direction reinforces the depth metaphor.</p>

      <div class="expanding-cards expanding-cards--vertical expanding-cards--teal" id="demo-expanding-v" style="max-height: 400px;">
        <div class="expanding-cards__card" aria-expanded="true" data-depth="5">
          <div class="expanding-cards__label">D5 — Surface</div>
          <div class="expanding-cards__content">
            <p>Observable phenomena — what literally appears, is said, shown, heard. Dialogue, mise-en-scène, soundtrack choices.</p>
          </div>
        </div>
        <div class="expanding-cards__card" aria-expanded="false" data-depth="4">
          <div class="expanding-cards__label">D4 — Structural</div>
          <div class="expanding-cards__content">
            <p>How the story is built. Act structure, scene design, plot architecture.</p>
          </div>
        </div>
        <div class="expanding-cards__card" aria-expanded="false" data-depth="3">
          <div class="expanding-cards__label">D3 — Cognitive</div>
          <div class="expanding-cards__content">
            <p>How the audience experiences information. Suspense, dramatic irony, revelation patterns.</p>
          </div>
        </div>
      </div>

      <div class="sg-type-details">
        <strong>Markup:</strong> <code>.expanding-cards.expanding-cards--vertical</code> &nbsp;·&nbsp;
        <strong>Rule:</strong> Vertical orientation ONLY on Vertical Axis pages. Everywhere else uses horizontal. &nbsp;·&nbsp;
        <strong>Why:</strong> Direction reinforces the depth metaphor the user is learning.
      </div>

      <hr/>

      <!-- ===== FLIP CARD DEMO ===== -->
      <h3>Flip Card</h3>
      <p>Two-sided card. Front shows summary, back shows details. Tap/click to flip. Used for axis descriptions, worked examples, and viewing protocols.</p>

      <div class="flip-card-strip">
        <div class="flip-card flip-card--teal" aria-expanded="false" id="demo-flip-1">
          <div class="flip-card__inner">
            <div class="flip-card__face flip-card__front">
              <h4 style="margin-top:0.5rem;">Vertical Axis</h4>
              <p style="margin-bottom:0.5rem;">Story depth — 6 dimensions from surface to core</p>
              <span class="flip-card__hint">↻ tap to flip</span>
            </div>
            <div class="flip-card__face flip-card__back">
              <p style="margin-top:0.5rem;"><strong>Dimensions:</strong> D5 Expressive → D4 Structural → D3 Cognitive → D2 Psychological → D1 Archetypal → D0 Core</p>
              <p style="margin-bottom:0.5rem;">Each layer reveals deeper analytical insight into story construction and meaning.</p>
              <span class="flip-card__hint">↻ tap to return</span>
            </div>
          </div>
        </div>

        <div class="flip-card flip-card--amber" aria-expanded="false" id="demo-flip-2">
          <div class="flip-card__inner">
            <div class="flip-card__face flip-card__front">
              <h4 style="margin-top:0.5rem;">Horizontal Axis</h4>
              <p style="margin-bottom:0.5rem;">Story timeline — clock positions tracking narrative progression</p>
              <span class="flip-card__hint">↻ tap to flip</span>
            </div>
            <div class="flip-card__face flip-card__back">
              <p style="margin-top:0.5rem;"><strong>Positions:</strong> 12:00 Origin → 3:00 Threshold → 6:00 Midpoint → 9:00 Crisis → 12:00 Return</p>
              <p style="margin-bottom:0.5rem;">Each position maps to structural beats across multiple frameworks simultaneously.</p>
              <span class="flip-card__hint">↻ tap to return</span>
            </div>
          </div>
        </div>
      </div>

      <div class="sg-type-details">
        <strong>Markup:</strong> <code>.flip-card.flip-card--teal</code> (or <code>--amber</code>, <code>--blue</code>) &nbsp;·&nbsp;
        <strong>Animation:</strong> <code>rotateY(180deg)</code>, 0.4s ease, perspective 1000px &nbsp;·&nbsp;
        <strong>Front:</strong> <code>var(--surface)</code> · <strong>Back:</strong> <code>var(--surface-elevated)</code> — flip feels like turning something over &nbsp;·&nbsp;
        <strong>No-JS:</strong> Both faces visible stacked
      </div>

      <hr/>

      <!-- ===== ENHANCED ACCORDION DEMO ===== -->
      <h3>Enhanced Accordion</h3>
      <p>Native <code>&lt;details&gt;</code> with unified styling. Supports expand/collapse all, hash routing, and nesting with Tabs or ExpandingCards inside.</p>

      <div class="accordion-controls">
        <button class="accordion-controls__btn" data-accordion-group="demo-acc" data-action="expand">Expand All</button>
        <button class="accordion-controls__btn" data-accordion-group="demo-acc" data-action="collapse">Collapse All</button>
      </div>

      <div class="accordion-item" data-accordion-group="demo-acc">
        <details>
          <summary class="accordion-toggle accordion-toggle--teal">
            <span class="accordion-toggle__icon accordion-toggle__icon--teal">↓</span>
            <span class="accordion-toggle__label">
              <span class="accordion-toggle__title">D5 — Surface / Expressive</span>
              <span class="accordion-toggle__meta">What you directly see and hear</span>
            </span>
            <span class="accordion-toggle__chevron">▾</span>
          </summary>
          <div class="accordion-body">
            <p>The most accessible layer. Observable phenomena — dialogue, visual composition, music, editing patterns. In production, this body would contain <strong>Tabs</strong> for sub-sections.</p>
          </div>
        </details>
      </div>

      <div class="accordion-item" data-accordion-group="demo-acc">
        <details>
          <summary class="accordion-toggle accordion-toggle--teal">
            <span class="accordion-toggle__icon accordion-toggle__icon--teal">↓</span>
            <span class="accordion-toggle__label">
              <span class="accordion-toggle__title">D4 — Structural</span>
              <span class="accordion-toggle__meta">How the story is organized</span>
            </span>
            <span class="accordion-toggle__chevron">▾</span>
          </summary>
          <div class="accordion-body">
            <p>Act structure, scene sequences, plot architecture, pacing patterns. Accordion body can nest any other component inside.</p>
          </div>
        </details>
      </div>

      <div class="accordion-item" data-accordion-group="demo-acc">
        <details>
          <summary class="accordion-toggle accordion-toggle--amber">
            <span class="accordion-toggle__icon accordion-toggle__icon--amber">→</span>
            <span class="accordion-toggle__label">
              <span class="accordion-toggle__title">Hero's Journey Framework</span>
              <span class="accordion-toggle__meta">Amber variant — horizontal axis content</span>
            </span>
            <span class="accordion-toggle__chevron">▾</span>
          </summary>
          <div class="accordion-body">
            <p>This shows the amber variant for horizontal axis content. Same chrome, different accent color.</p>
          </div>
        </details>
      </div>

      <div class="sg-type-details">
        <strong>Markup:</strong> Native <code>&lt;details&gt;</code> with <code>.accordion-toggle--teal</code> or <code>--amber</code> &nbsp;·&nbsp;
        <strong>Expand/Collapse:</strong> <code>.accordion-controls</code> buttons target <code>data-accordion-group</code> &nbsp;·&nbsp;
        <strong>Chrome:</strong> Closed = <code>var(--surface)</code>, Open = <code>var(--surface-inset)</code> body + 3px accent stripe
      </div>

      <hr/>

      <!-- ===== CHROME PROOF ===== -->
      <h3>Chrome Invariant Proof</h3>
      <p>Every component above shares these visual properties. The behavior changes; the frame doesn't.</p>

      <table>
        <thead>
          <tr><th>Property</th><th>Value</th><th>Applied to</th></tr>
        </thead>
        <tbody>
          <tr><td>Border</td><td><code>1px solid var(--border)</code></td><td>All cards, panels, containers</td></tr>
          <tr><td>Card radius</td><td><code>var(--radius-md)</code> = 6px</td><td>Tab panels, flip cards, expanding panels, accordion bodies</td></tr>
          <tr><td>Container radius</td><td><code>var(--radius-lg)</code> = 10px</td><td>Expanding cards wrapper, accordion group</td></tr>
          <tr><td>Active background</td><td><code>var(--surface)</code></td><td>Expanded card, active tab, flipped card front</td></tr>
          <tr><td>Inactive background</td><td><code>var(--surface-elevated)</code></td><td>Collapsed strip, flip card back, tab panel</td></tr>
          <tr><td>Active shadow</td><td><code>var(--shadow-card)</code></td><td>Expanded card, flipped card</td></tr>
          <tr><td>Hover shadow</td><td><code>var(--shadow-subtle)</code></td><td>All interactive elements on hover</td></tr>
          <tr><td>State transition</td><td><code>0.4s ease</code></td><td>Expand, flip, slide</td></tr>
          <tr><td>Hover transition</td><td><code>0.2s ease</code></td><td>Background, border, shadow</td></tr>
          <tr><td>Axis accent</td><td>Border stripe only (left or top)</td><td>Never background fill</td></tr>
        </tbody>
      </table>
    </div>
PROGRESSIVE_DISCLOSURE_HTML_END
<!-- END: Progressive Disclosure section -->


# ============================================================
# CHANGE 6: Add JavaScript for interactive demos
# ============================================================
# Add this <script> block AFTER the closing </style> tag at the bottom of the file:

SCRIPT_HTML_START
<script>
  // ===== TABS =====
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('[role="tab"]');
    const panels = tabGroup.querySelectorAll('[role="tabpanel"]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Deactivate all
        tabs.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
        });
        panels.forEach(p => p.hidden = true);

        // Activate clicked
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) panel.hidden = false;
      });

      // Keyboard navigation
      tab.addEventListener('keydown', (e) => {
        const tabsArray = Array.from(tabs);
        const index = tabsArray.indexOf(tab);
        let newIndex;

        if (e.key === 'ArrowRight') newIndex = (index + 1) % tabsArray.length;
        else if (e.key === 'ArrowLeft') newIndex = (index - 1 + tabsArray.length) % tabsArray.length;
        else return;

        e.preventDefault();
        tabsArray[newIndex].click();
        tabsArray[newIndex].focus();
      });
    });
  });

  // ===== EXPANDING CARDS =====
  document.querySelectorAll('.expanding-cards').forEach(deck => {
    const cards = deck.querySelectorAll('.expanding-cards__card');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (card.getAttribute('aria-expanded') === 'true') return;

        cards.forEach(c => c.setAttribute('aria-expanded', 'false'));
        card.setAttribute('aria-expanded', 'true');
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
        const cardsArray = Array.from(cards);
        const index = cardsArray.indexOf(card);
        const isVertical = deck.classList.contains('expanding-cards--vertical');
        const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
        const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
        let newIndex;

        if (e.key === nextKey) newIndex = (index + 1) % cardsArray.length;
        else if (e.key === prevKey) newIndex = (index - 1 + cardsArray.length) % cardsArray.length;
        else return;

        e.preventDefault();
        cardsArray[newIndex].click();
        cardsArray[newIndex].focus();
      });

      card.setAttribute('tabindex', '0');
    });
  });

  // ===== FLIP CARDS =====
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      const isFlipped = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', isFlipped ? 'false' : 'true');
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });

    card.setAttribute('tabindex', '0');
  });

  // ===== ACCORDION EXPAND/COLLAPSE ALL =====
  document.querySelectorAll('.accordion-controls__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.getAttribute('data-accordion-group');
      const action = btn.getAttribute('data-action');
      const items = document.querySelectorAll(`[data-accordion-group="${group}"] details`);

      items.forEach(details => {
        details.open = action === 'expand';
      });
    });
  });
</script>
SCRIPT_HTML_END
