# Phase 06 — Website Architecture

[<- Back to Master Plan](../README.md) | [<- Previous: 05-PhysicalPrep](../05-PhysicalPrep/README.md)

Retroactive documentation of the site architecture as built. The website is a static HTML/CSS/JS site hosted on GitHub Pages, with all game data driven from a single `config.json` file.

## Files

| File | Description |
|------|-------------|
| [SiteMap.md](SiteMap.md) | Page inventory, per-page breakdown, config.json schema, and how data flows from config to rendered content |
| [DesignSystem.md](DesignSystem.md) | Color palette, typography, component patterns (player cards, egg shapes, animations), responsive breakpoints |

## Architecture at a Glance

```
Browser Request
     |
     v
GitHub Pages (static files from site/)
     |
     +-- index.html ............. Main invitation & rules (public)
     |      +-- css/style.css
     |      +-- js/config.js ----> data/config.json (fetched at runtime)
     |      +-- js/main.js
     |
     +-- scoring.html ........... Post-game Skittle counter (unlinked)
     |      +-- css/scoring.css
     |      +-- js/config.js ----> data/config.json
     |      +-- js/scoring.js
     |
     +-- tasks-print.html ....... Printable task card grid (unlinked)
            +-- css/tasks-print.css
            +-- js/config.js ----> data/config.json
```

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Static HTML/CSS/JS, no framework** | Fastest to build under time constraints, zero build step, instant deploy. No React/Vue/MkDocs overhead for what is essentially a party invitation. |
| **Config-driven rendering** | All game data (players, rules, steps, tasks, power-ups, event details) lives in `data/config.json`. Pages fetch this at runtime and render DOM dynamically. Changing a player name or adding a rule means editing one JSON file, not three HTML files. |
| **Shared config loader (`js/config.js`)** | A thin IIFE that fetches `config.json`, exposes `CONFIG.ready(callback)`, and resolves base path relative to the script location. All three pages use the same loader. |
| **Scoring page unlinked** | `scoring.html` is not linked from `index.html` or the nav. Security through obscurity -- players should not see the scoring interface before the event. The URL is shared only on event day. |
| **GitHub Pages hosting** | Free, auto-deploys on push to master via `.github/workflows/pages.yml`. The workflow uploads the `site/` folder as a Pages artifact. No DNS, no server, no HTTPS config needed. |
| **Mobile-first responsive design** | Players will open the invite on their phones. All layouts start from small screens and scale up. Hamburger nav at 768px, grid adjustments at 640px and 480px. |
| **localStorage for scoring state** | The scoring page persists scores and power-up usage in `localStorage` under key `easterEggScoring_v1`. This survives page reloads during the event without needing a backend. |
| **Print stylesheet for task cards** | `tasks-print.html` uses `@media print` to hide screen-only UI and render a 4x3 card grid sized for US Letter paper (2.5in x 3.5in cards). One click to print, cut, and stuff into eggs. |
| **Playwright testing** | Tests in `tests/` use `pytest-playwright` via `uv`. A local server serves `site/` during test runs, and tests take screenshots for visual validation. |

## File Inventory

```
site/
+-- index.html              Main page (~330 lines, ~12KB)
+-- scoring.html            Scoring page (~72 lines, ~3KB)
+-- tasks-print.html        Print page (~144 lines, ~5.5KB)
+-- data/
|   +-- config.json         Single source of truth (~115 lines)
+-- css/
|   +-- style.css           Main styles (1119 lines) -- hero, nav, players, steps, rules, prizes, specials, footer
|   +-- scoring.css         Scoring styles (768 lines) -- player grid, power-ups, modals, celebration, confetti
|   +-- tasks-print.css     Print styles (330 lines) -- card grid, difficulty color schemes, @media print
+-- js/
|   +-- config.js           Shared config loader (51 lines)
|   +-- main.js             Floating eggs, nav toggle, scroll reveal, active nav (116 lines)
|   +-- scoring.js          Score state, power-ups, egg swap modal, winner celebration, confetti (358 lines)
+-- img/players/
|   +-- placeholder.svg     Default player avatar
+-- resources/
    +-- Nikith.jpeg         Player photos (uploaded by players)
    +-- Shua.jpeg
    +-- Rituja.jpeg
    +-- Shantanu.jpeg
```

## Deployment Pipeline

1. Push to `master` branch
2. GitHub Actions workflow (`.github/workflows/pages.yml`) triggers
3. Workflow uploads `site/` folder as a Pages artifact
4. GitHub Pages serves the artifact at `https://reubenjohn.github.io/easter-egg-hunt/`

No build step, no bundling, no compilation. The `site/` folder is deployed as-is.

## Testing

```bash
uv run pytest tests/ -v              # Headless Playwright tests with screenshots
uv run pytest tests/ -v --headed     # Visible browser for debugging
```

Tests serve `site/` on a local HTTP server, navigate to each page, and capture screenshots for visual regression.

**Next phase ->** [07-WebsiteImplementation](../07-WebsiteImplementation/README.md)
