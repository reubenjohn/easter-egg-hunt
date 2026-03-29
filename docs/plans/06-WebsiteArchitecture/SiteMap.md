# Site Map & Config Schema

[<- Back to Phase 06 README](README.md)

## Page Inventory

### 1. `index.html` -- Main Invitation & Rules

**URL:** https://reubenjohn.github.io/easter-egg-hunt/

The public-facing page. This is the URL shared with all 9 players. It contains everything they need to know before the event.

| Section | Anchor | Content Source | Description |
|---------|--------|---------------|-------------|
| Navigation | `#navbar` | `cfg.event.branding` | Fixed top nav with brand, section links, hamburger toggle on mobile |
| Hero | `#hero` | `cfg.event.*` | Full-viewport landing with animated eggs, title, tagline, date, Google Calendar / ICS download buttons |
| Location | `#location` | `cfg.venue.*` | Embedded Google Map, park name, address, "Get Directions" link |
| Players | `#players` | `cfg.players[]` | 3-column grid of player cards -- photo in hatching-egg frame, name, color badge, title |
| How It Works | `#how-it-works` | `cfg.steps[]` | 8-step numbered card list with icons and descriptions |
| Special Eggs | `#special-eggs` | `cfg.specialEggs[]` | Visual guide to two-tone egg color meanings (easy/medium/hard/extreme tasks, power-ups) |
| Rules | `#rules` | `cfg.rules[]` | Auto-fit grid of rule cards with icons |
| Prizes | `#prizes` | *(hardcoded)* | Mystery teaser -- deliberately vague to build anticipation |
| Footer | `#siteFooter` | `cfg.event.*` | R&R branding with heartbeat animation, tagline, year |

**Scripts loaded:** `js/config.js`, `js/main.js`, plus an inline `<script>` that calls `CONFIG.ready()` to render all dynamic sections.

**Calendar integration:** The hero section generates both a Google Calendar URL and a downloadable `.ics` file on the fly from `cfg.event.startISO`, `cfg.event.endISO`, `cfg.event.timezone`, and `cfg.venue.*`.

### 2. `scoring.html` -- Post-Game Skittle Counter

**URL:** https://reubenjohn.github.io/easter-egg-hunt/scoring.html (intentionally unlinked)

Used on event day by the hosts to tally Skittles in real time. Not visible to players before the event.

| Component | Description |
|-----------|-------------|
| Header | Sticky, with "Reset All Scores" button |
| Player Grid | 3-column grid of player cards, each with: egg-shaped photo, name, score display, +/- tap buttons, power-up buttons |
| Power-ups per player | Double Down (+5), Bonus Haul (+5), Egg Swap (opens modal) -- each usable once |
| Egg Swap Modal | Select target player, enter Skittle transfer amount, confirm |
| Crown the Winner | Button at bottom -- finds highest score, shows celebration overlay |
| Winner Celebration | Full-screen dark overlay with confetti animation, winner photo, name, score. Handles ties. |
| Reset Confirm | Modal confirmation before clearing all data |

**State management:** All scores and power-up usage are stored in `localStorage` under key `easterEggScoring_v1`. State is validated on load against current config (handles player additions/removals).

**Scripts loaded:** `js/config.js`, `js/scoring.js`.

### 3. `tasks-print.html` -- Printable Task & Power-Up Cards

**URL:** https://reubenjohn.github.io/easter-egg-hunt/tasks-print.html (intentionally unlinked)

A utility page for the hosts. Renders all task and power-up cards from config in a printable 4x3 grid layout sized for US Letter paper.

| Component | Description |
|-----------|-------------|
| Screen header | Title, card count summary, "Print Cards" button (hidden during print) |
| Card grid | 12 cards per page (4 columns x 3 rows), auto-paginated with `page-break-after` |
| Task cards | Colored by difficulty -- all-pink (easy), pink/white (medium), pink/purple (hard), all-purple (extreme). Each shows difficulty label, star rating, reward text, task description, R&R branding footer |
| Power-up cards | Gold gradient background, power-up icon, name, description |
| Empty cards | Grid fillers for alignment when the last page has fewer than 12 cards |

**Card sizing:** 2.5in x 3.5in (standard playing card size), with dashed cut lines and decorative corner elements.

**Scripts loaded:** `js/config.js`, plus an inline `<script>` that calls `CONFIG.ready()`.

---

## Config Schema (`data/config.json`)

The config file is the single source of truth. Every page fetches it at runtime via `js/config.js`.

### Top-Level Structure

```
{
  "event": { ... },        // Event metadata, branding, dates
  "venue": { ... },        // Park name, address, map URLs
  "players": [ ... ],      // Player roster (9 entries)
  "steps": [ ... ],        // "How It Works" step list (8 entries)
  "specialEggs": [ ... ],  // Two-tone egg guide (5 entries)
  "rules": [ ... ],        // Game rules (7 entries)
  "tasks": { ... },        // Task cards by difficulty
  "powerups": [ ... ]      // Power-up card definitions (5 entries)
}
```

### `event` Object

| Field | Type | Used By | Example |
|-------|------|---------|---------|
| `title` | string | index hero, tasks-print | `"Operation: Easter Egg"` |
| `subtitle` | string | index hero | `"The Skittelling!"` |
| `tagline` | string | index hero, calendar details | `"You've been summoned to the meadow!"` |
| `date` | string | index hero | `"Sunday, April 5, 2026"` |
| `timeRange` | string | index hero | `"10:00 AM &ndash; 1:00 PM CT"` |
| `startISO` | string | calendar generation | `"2026-04-05T10:00:00"` |
| `endISO` | string | calendar generation | `"2026-04-05T13:00:00"` |
| `timezone` | string | calendar generation | `"America/Chicago"` |
| `year` | number | tasks-print footer, site footer | `2026` |
| `branding` | string | nav, hero, task cards, footer | `"R&R"` |
| `brandingFull` | string | *(available, not currently rendered)* | `"Reuben & Raina"` |
| `footerTagline` | string | index footer | `"An R&R Production &mdash; Hopping into Spring!"` |
| `currency` | string | *(available, not currently rendered)* | `"Skittles"` |

### `venue` Object

| Field | Type | Used By |
|-------|------|---------|
| `name` | string | index location card, calendar |
| `address` | string | index location card, calendar |
| `mapEmbedUrl` | string | index embedded Google Map iframe |
| `directionsUrl` | string | index "Get Directions" button, calendar |

### `players[]` Array

Each entry represents one player. Order in the array determines display order on all pages.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique key, used for localStorage state keys |
| `name` | string | Display name |
| `color` | string | Hex color for egg, card accents, badge background |
| `colorName` | string | Human-readable color name shown below badge |
| `title` | string | Fun bunny title shown on badge (e.g., "Cherry Bunny") |
| `photo` | string | Relative path to photo (placeholder SVG or uploaded JPEG) |
| `lightText` | boolean | If true, badge text uses dark brown instead of white (for light-colored badges like Neon Green, Yellow) |

### `steps[]` Array

8 entries, each with `icon` (HTML entity), `text`, and `detail`. Rendered as numbered cards on `index.html`.

### `specialEggs[]` Array

5 entries describing two-tone egg color combinations. Each has `topColor`, `bottomColor` (hex or `"rainbow"`), `label`, and `desc`. The `"rainbow"` value triggers a CSS linear-gradient built from all player colors.

### `rules[]` Array

7 entries, each with `icon` (HTML entity), `text`, and `detail`. Rendered as a card grid on `index.html`.

### `tasks` Object

Keyed by difficulty level (`easy`, `medium`, `hard`, `extreme`). Each difficulty contains:

| Field | Type | Description |
|-------|------|-------------|
| `reward` | number | Bonus Skittles for completion |
| `rewardText` | string | Display label (e.g., "+3 Bonus Skittles") |
| `stars` | number | Star rating shown on printed card |
| `items` | string[] | Array of task descriptions |

**Current counts:** 5 easy + 5 medium + 4 hard + 3 extreme = 17 task cards.

### `powerups[]` Array

5 entries. Each has `name`, `icon`, `description`, and `scoreBonus` (used by scoring.js for automatic point addition).

---

## Data Flow

```
config.json
    |
    |  fetched by js/config.js
    v
CONFIG.ready(callback)
    |
    +---> index.html inline <script>
    |       Renders: nav brand, hero, location, players grid,
    |       steps, special eggs, rules, footer
    |
    +---> scoring.js
    |       Reads players[] to build scoring grid
    |       Uses player IDs as localStorage keys
    |       References powerups for button labels
    |
    +---> tasks-print.html inline <script>
            Reads tasks{} and powerups[] to generate
            printable card grid
```

No page hardcodes game data. Adding a player, changing a rule, or tweaking a task description is a single edit to `config.json`.
