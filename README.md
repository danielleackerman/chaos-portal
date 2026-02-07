# 🧭 Chaos Portal

**A spatial navigation system for story analysis and creative frameworks.**

Chaos Portal is a reference environment for writers, analysts, and narrative theorists. It combines a two-axis coordinate system for mapping story structure with a curated library of 1,476 resources across music theory and storytelling.

### **[→ Explore the live site](https://danielleackerman.github.io/chaos-portal/)**

---

## 📐 Story Coordinate Compass

An eight-section framework that treats every story as navigable territory across two dimensions:

- **→ Horizontal Axis** — Story timeline position (clock positions, act structures, beat markers, symmetry points)
- **↓ Vertical Axis** — Story depth dimensions (six layers from surface expression to thematic core)

The Compass maps 15+ structural frameworks — Hero's Journey, Save the Cat, Dramatica, and others — into a unified coordinate space. It includes intersection logic for combining axes, navigation protocols for moving through analysis, and practical templates for real-world application.

Any moment in any story can be located at coordinates like `6:00 / Dimension 2` — the midpoint, examined through the psychological lens.

---

## 📚 Resource Library

A hand-curated collection organized across two domains:

- **🎵 Music Library** — 54 pages · 1,248 links — theory, composition tools, datasets, tuning systems, and reference
- **📖 Story Library** — 15 pages · 228 links — narrative craft, structural frameworks, character systems, and analytical tools

Every resource is searchable across all 81 pages, categorized by role (Theory, Tool, Dataset, Reference), and organized with accordion navigation for fast browsing.

---

## 🎨 Design System

The visual language is derived from the Compass coordinate system itself:

| | Color | Meaning |
|---|-------|---------|
| 🟡 | Signal Amber | Horizontal axis — story timeline, position, progression |
| 🟢 | Clarity Teal | Vertical axis — story depth, dimensions, layers |

Typography pairs DM Serif Display headings with Helvetica Neue body text. Dark mode supported.

---

## 🛠 Built With

- [Astro](https://astro.build/) — Static site generation
- [Pagefind](https://pagefind.app/) — Client-side search
- GitHub Pages — Automated deployment via CI/CD

---

## 💻 Local Development

```bash
npm install
npm run dev          # → http://localhost:4321/chaos-portal/
npm run build        # Build to ./dist
npm run preview      # Preview production build
```

## 📁 Project Structure

```
src/
├── data/library.js            # 1,476 links across 69 pages
├── layouts/PortalLayout.astro # Shared layout (header, nav, footer, dark mode)
├── pages/
│   ├── index.astro            # Home dashboard
│   ├── library/               # Music + Story resource libraries
│   └── compass/               # 8 Compass framework sections
└── styles/global.css          # Unified design system (v3.2)
```

---

## ✍️ Author

Created by Danielle Ackerman.

## 📄 License

All content and frameworks are original work. The Story Coordinate Compass and its associated analytical systems are proprietary. Code structure and build configuration are available for reference.
