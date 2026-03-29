# Easter Egg Hunt 2026 -- Site Contributor Guide

Hey! This is the website for **Operation: Easter Egg -- The Skittelling!**
Everything you need to update lives in one file: `site/data/config.json`. Edit that, push, and the site updates itself.

---

## Quick Start

1. Edit `site/data/config.json` (see sections below)
2. `git add` your changes, `git commit`, `git push`
3. Site goes live at https://reubenjohn.github.io/easter-egg-hunt/ within ~2 minutes

---

## 1. Editing config.json

All site content is driven from **`site/data/config.json`**. You should almost never need to touch the HTML files directly.

### Config structure at a glance

| Section        | What it controls                                      |
|----------------|-------------------------------------------------------|
| `event`        | Title, subtitle, date/time, branding, currency name   |
| `venue`        | Park name, address, Google Maps links                 |
| `players`      | The 9 players: names, colors, titles, photos          |
| `steps`        | The "How It Works" steps on the main page             |
| `specialEggs`  | Special egg color guide (task eggs, power-up eggs)    |
| `rules`        | Game rules displayed on the main page                 |
| `tasks`        | Task card text for easy/medium/hard/extreme tiers     |
| `powerups`     | Power-up egg names and descriptions                   |

### Changing the event date/time

In the `"event"` section, update these fields:

```json
"date": "Sunday, April 5, 2026",
"timeRange": "10:00 AM &ndash; 1:00 PM CT",
"startISO": "2026-04-05T10:00:00",
"endISO": "2026-04-05T13:00:00"
```

- `date` and `timeRange` are display text (what people see on the invite).
- `startISO` and `endISO` are used for the countdown timer -- use `YYYY-MM-DDTHH:MM:SS` format.
- Note: `&ndash;` is an HTML dash. Keep that as-is for the en-dash to render correctly.

### Adding, editing, or removing players

Players live in the `"players"` array. Each player looks like this:

```json
{
  "id": "reuben",
  "name": "Reuben",
  "color": "#e53935",
  "colorName": "Red",
  "title": "Cherry Bunny",
  "photo": "img/players/placeholder.svg",
  "lightText": false
}
```

- **`id`** -- lowercase, no spaces. Used internally.
- **`name`** -- display name shown on the site.
- **`color`** -- hex color code for their egg color (e.g. `"#e53935"`).
- **`colorName`** -- human-readable color name (e.g. `"Red"`).
- **`title`** -- fun bunny nickname shown on their card.
- **`photo`** -- path to their photo (see "Adding Player Photos" below).
- **`lightText`** -- set to `true` if the player's color is very bright/light (like neon green or yellow), so that overlaid text switches to dark. Otherwise `false`.

To **add** a player: copy an existing entry, paste it at the end of the array, and fill in their details.
To **remove** a player: delete their entire `{ ... }` block (and the trailing comma on the entry before it, if it becomes the last one).

### Changing rules text

The `"rules"` array has objects with `icon`, `text`, and `detail`. Just edit the strings. Icons use HTML character codes (e.g. `&#9200;` for a clock). You can also use emoji directly.

### Adding or editing tasks

Tasks are grouped by difficulty in the `"tasks"` object:

```json
"tasks": {
  "easy":    { "reward": 1, "rewardText": "+1 Bonus Skittle",  "stars": 1, "items": ["..."] },
  "medium":  { "reward": 2, "rewardText": "+2 Bonus Skittles", "stars": 2, "items": ["..."] },
  "hard":    { "reward": 3, "rewardText": "+3 Bonus Skittles", "stars": 3, "items": ["..."] },
  "extreme": { "reward": 5, "rewardText": "+5 Bonus Skittles", "stars": 5, "items": ["..."] }
}
```

- To add a task: add a new string to the `"items"` array for the right difficulty tier.
- To remove a task: delete the string from `"items"`.
- `reward` is the numeric bonus, `rewardText` is the display label, `stars` controls the star rating shown on the card.

### Adding or editing power-ups

The `"powerups"` array works the same way. Each entry has `name`, `icon`, `description`, and `scoreBonus`.

---

## 2. Adding Player Photos

Photos go in the **`site/resources/`** folder.

**Currently have photos for:** Nikith, Shua, Rituja, Shantanu
**Still need photos for:** Reuben, Raina, Swathy, Jason, Shawn

To add a photo:

1. Drop the image file into `site/resources/` (e.g. `Raina.jpeg`).
2. In `config.json`, find the player and update their `"photo"` field:
   ```json
   "photo": "resources/Raina.jpeg"
   ```
   (Replace the `"img/players/placeholder.svg"` path.)
3. Commit and push both the image file and the updated config.json.

**Photo tips:**
- Photos are displayed in **egg-shaped frames**, so square or slightly-tall crops work best.
- Avoid wide/landscape shots -- faces may get clipped on the sides.
- JPEG or PNG, any reasonable size (they get scaled down by CSS).

---

## 3. Deploying

Just push to `master`:

```bash
git push
```

GitHub Actions auto-deploys the site. Changes go live at https://reubenjohn.github.io/easter-egg-hunt/ within about 2 minutes. No build step, no npm, nothing else needed.

---

## 4. Testing Locally

If you want to check your changes before pushing:

```bash
uv run pytest tests/ -v
```

This spins up a local server, runs Playwright browser tests, and validates that config.json data renders correctly on all pages. Screenshots are saved to the `screenshots/` folder so you can visually inspect.

To see the browser while tests run (useful for debugging):

```bash
uv run pytest tests/ -v --headed
```

You'll need [uv](https://docs.astral.sh/uv/) installed. The tests handle everything else (installing browsers, starting the server, etc.).

---

## 5. Page Overview

| File                | What it is                                             | Who sees it                    |
|---------------------|--------------------------------------------------------|--------------------------------|
| `index.html`        | Main invitation page -- share this link with players!  | Everyone                       |
| `scoring.html`      | Scoring board for tallying Skittles on game day        | Hosts only (not linked in nav) |
| `tasks-print.html`  | Printable task cards -- print and cut for physical eggs | Hosts only (for prep)          |

**Important:** `scoring.html` is intentionally not linked from the main page navigation. Don't share that URL with players before game day -- it would spoil the surprise!

---

## 6. Good to Know

- **Edit config, not HTML.** All content comes from `config.json`. The HTML/JS reads the config and renders everything dynamically.
- **Mobile-first.** Most players will pull up the site on their phones at the park, so the design is optimized for small screens first.
- **Player colors use hex codes.** If you're picking a new color, grab a hex value from any color picker (Google "color picker" works fine). Set `lightText: true` if the color is very bright.
- **HTML entities in config.** Some text uses HTML entities like `&ndash;` (en-dash) or `&#129370;` (emoji). These render as special characters on the page. Regular emoji (like the ones in task text) work fine too.
