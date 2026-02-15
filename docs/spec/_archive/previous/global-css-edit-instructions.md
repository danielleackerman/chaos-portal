# global.css — Hero Gradient Fix
# Exact find-and-replace instructions

# ============================================================
# EDIT 1: Fix the gradient hero ribbon/white-edge bug
# ============================================================
# The ::before pseudo-element creates a thin white gap.
# Fix: use border-image instead (native border, no pseudo-element).
#
# FIND THIS ENTIRE BLOCK (around line ~280-295 in global.css):

.page-hero--gradient {
  border-left-color: transparent;
  background: var(--surface);
  background-image: radial-gradient(ellipse at 0% 50%, rgba(245, 158, 11, 0.04), transparent 60%),
                     radial-gradient(ellipse at 100% 50%, rgba(20, 184, 166, 0.04), transparent 60%);
}
.page-hero--gradient::before {
  content: "";
  position: absolute;
  left: -1px;
  top: -1px;
  bottom: -1px;
  width: 6px;
  background: linear-gradient(180deg, var(--semantic-h), var(--semantic-v));
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
  z-index: 1;
}

# REPLACE WITH:

.page-hero--gradient {
  border-left-color: var(--semantic-h); /* fallback */
  border-image-source: linear-gradient(180deg, var(--semantic-h), var(--semantic-v));
  border-image-slice: 1;
  background: var(--surface);
  background-image: radial-gradient(ellipse at 0% 50%, rgba(245, 158, 11, 0.04), transparent 60%),
                     radial-gradient(ellipse at 100% 50%, rgba(20, 184, 166, 0.04), transparent 60%);
}


# ============================================================
# EDIT 2: Add neutral hero variant + eyebrow color
# ============================================================
# FIND (after the .page-hero--purple line):

.page-hero--purple { border-left-color: var(--accent-purple); }

# AFTER THAT LINE, ADD:

.page-hero--neutral { border-left-color: var(--border-accent); }

# THEN FIND (after the .page-hero .eyebrow--purple line):

.page-hero .eyebrow--purple { color: var(--accent-purple); }

# AFTER THAT LINE, ADD:

.page-hero .eyebrow--neutral { color: var(--text-2); }


# ============================================================
# EDIT 3: Add dimension + position scale variables
# ============================================================
# FIND (in the :root block, after the existing variables):

  /* RADIUS */

# BEFORE THAT LINE, ADD:

  /* DIMENSION DEPTH SCALE (Vertical Axis — teal at increasing opacity) */
  --dim-5: rgba(20, 184, 166, 0.35);
  --dim-4: rgba(20, 184, 166, 0.48);
  --dim-3: rgba(20, 184, 166, 0.61);
  --dim-2: rgba(20, 184, 166, 0.74);
  --dim-1: rgba(20, 184, 166, 0.87);
  --dim-0: rgba(20, 184, 166, 1.00);

  /* POSITION INTENSITY SCALE (Horizontal Axis — amber at varying intensity) */
  --pos-12: rgba(245, 158, 11, 0.35);
  --pos-1:  rgba(245, 158, 11, 0.45);
  --pos-3:  rgba(245, 158, 11, 0.60);
  --pos-6:  rgba(245, 158, 11, 0.80);
  --pos-9:  rgba(245, 158, 11, 1.00);
  --pos-11: rgba(245, 158, 11, 0.45);

# ALSO ADD the dark mode equivalents. Find the .dark-mode block and add
# before the --shadow variables:

  --dim-5: rgba(20, 184, 166, 0.25);
  --dim-4: rgba(20, 184, 166, 0.38);
  --dim-3: rgba(20, 184, 166, 0.51);
  --dim-2: rgba(20, 184, 166, 0.64);
  --dim-1: rgba(20, 184, 166, 0.77);
  --dim-0: rgba(20, 184, 166, 0.90);

  --pos-12: rgba(245, 158, 11, 0.25);
  --pos-1:  rgba(245, 158, 11, 0.35);
  --pos-3:  rgba(245, 158, 11, 0.50);
  --pos-6:  rgba(245, 158, 11, 0.70);
  --pos-9:  rgba(245, 158, 11, 0.90);
  --pos-11: rgba(245, 158, 11, 0.35);


# ============================================================
# EDIT 4: Append all new component CSS
# ============================================================
# Copy the ENTIRE contents of css-patch-v4-progressive-disclosure.css
# and paste it at the END of global.css, BEFORE any @media queries.
#
# This adds: Tabs, ExpandingCards, FlipCard, enhanced accordion controls,
# and the Style Guide depth scale demo styles.
