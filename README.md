# Chaos Portal

A polished beta portal for creative frameworks — story analysis, music theory, and the bridges between them.

Built with [Astro](https://astro.build/) for static deployment on GitHub Pages.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:4321/chaos-portal/` in your browser.

## Build & Deploy

```bash
npm run build    # Outputs to ./dist
npm run preview  # Preview built site
```

### GitHub Pages Deployment

1. Push to GitHub
2. Go to **Settings → Pages → Source** → Select **GitHub Actions**
3. The workflow at `.github/workflows/deploy.yml` will auto-deploy on push to `main`
4. **Update `astro.config.mjs`** with your actual GitHub username and repo name:

```js
export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',
  base: '/YOUR_REPO_NAME',
});
```

## Architecture

```
src/
├── data/library.js          # All 1,476 links across 69 pages (auto-generated)
├── layouts/PortalLayout.astro # Shared layout with header, nav, footer, dark mode
├── pages/
│   ├── index.astro           # Home dashboard
│   ├── library/
│   │   ├── music/index.astro # Music library with accordion nav
│   │   ├── story/index.astro # Story library with accordion nav
│   │   └── [...slug].astro   # Dynamic route → 69 individual resource pages
│   └── compass/
│       ├── index.astro       # Compass overview with section cards
│       └── [section]/        # 8 ported Compass section pages
└── styles/global.css         # Design system extending Compass CSS tokens
```

## Content

- **Music Library**: 54 pages, 1,248 links (theory, tools, datasets, reference)
- **Story Library**: 15 pages, 228 links (craft, tools, reference)
- **Story Compass**: 8 complete sections of the coordinate framework

## Adding Content

To add new links, edit `src/data/library.js`. Each page entry has:

```js
{
  title: "Page Title",
  role: "Theory",
  scope: "Description of scope",
  total: 36,
  links: [
    { t: "Link Title", u: "https://example.com" },
    // ...
  ]
}
```

## Design System

Extends the Story Coordinate Compass CSS tokens:

| Token | Value | Purpose |
|-------|-------|---------|
| `--semantic-h` | `#F59E0B` | Horizontal axis / Music (amber) |
| `--semantic-v` | `#14B8A6` | Vertical axis / Story (teal) |
| `--accent-purple` | `#8B5CF6` | Compass module |
| `--accent-green` | `#10B981` | Status/success |

Dark mode is default. Toggle persists via `localStorage`.
