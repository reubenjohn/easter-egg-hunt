# Website Content — Confirmed Plan

[← Back to Phase 02](README.md) | [← Master Plan](../README.md)

---

## Event Identity

- **Event name (CONFIRMED):** "Operation: Easter Egg — The Skittelling!"
- **Branding:** "R&R" (Reuben & Raina) signature throughout — footer tagline, header accent, subtle watermark, etc.
- **Color scheme (CONFIRMED):** Pastel Easter colors (soft pink, lavender, mint, sky blue, butter yellow)

---

## Main Page Sections (index.html)

### 1. Hero / Invitation
- Big playful header: **"Operation: Easter Egg — The Skittelling!"**
- Date, time, park name & address (see Location below)
- Embedded Google Maps iframe showing the park + a directions link
- Cute egg/bunny animation (CSS keyframes — bouncing eggs, hopping bunny)
- "You've been invited!" message
- R&R branding accent in header area

### 2. Location
- **Park (CONFIRMED, may change):** Garibaldi (Giuseppe) Park — 1520 W Polk St, Chicago IL 60607
- **Backup option (TBD):** Arrigo Park (final decision pending)
- Embedded `<iframe>` Google Maps showing the park
- "Get Directions" link below the map

### 3. The Players
- Grid of 9 player cards
- **Players (CONFIRMED):** Reuben, Raina, Swathy, Jason, Nikith, Shawn, Shua, Rutuja, Shantanu
- Each card: name, assigned egg color (colored border/background)
- **Player photos (CONFIRMED):** Will be provided as `Reuben.jpg`, `Swathy.png`, etc. in `site/img/players/`
  - Use **placeholder SVGs** for now until real photos arrive
  - **Photos displayed inside egg shapes** on the player cards!
  - Explore showing player photos in other places too (scoreboard, winner screen, etc.)
- Fun titles like "The Egg-splorer" or "Bunny Boss" (or just names — TBD)

### 4. How It Works
- Visual step-by-step:
  1. Find eggs of YOUR color
  2. Grab any gold (task) or silver (power-up) eggs you see
  3. Return when the whistle blows
  4. Trade phase (5 min)
  5. Reveal power-ups → adjust scores
  6. Count your Skittles
  7. Open task eggs → perform for bonus points!
  8. Winner crowned!

### 5. Rules
- Boundaries (describe the park area)
- Time limit: 15 minutes
- No hiding eggs you find (no sabotage!)
- Must return when whistle blows
- Special eggs: explained with gold/silver color callout

### 6. Prizes
- **Prizes are a SURPRISE (CONFIRMED)** — do NOT show prize details on the website
- Teaser text only: **"Amazing prizes await the champion egg hunter!"**
- Keep it mysterious and fun

### ~~7. Fun Name Ideas~~ — REMOVED
> Event name is decided: "Operation: Easter Egg — The Skittelling!"

### ~~8. What to Bring~~ — REMOVED
> Section removed — TBD whether baskets will be provided to players.

---

## Scoring Page (scoring.html → hidden/unlinked)

- **Access (CONFIRMED):** Hidden/unlinked path — e.g., `/scoring.html` or a hash-based route
  - No password needed, security through obscurity only
  - Do NOT link to this page from the main site navigation
- Player columns (one per player), each with their assigned egg color
- Player photos inside egg shapes on the scoreboard too
- Tap "+" to increment Skittle count
- Tap "-" to decrement (mistakes)
- Running total displayed prominently
- "Apply Power-Up" buttons (double, +5, etc.)
- Final "Crown the Winner!" button with confetti animation

### Winner Screen
- **Winner celebration (CONFIRMED):** Show the winner's photo jumping/bouncing around the screen
- Confetti animation (confetti.js)
- Celebration animation with the winner's egg-shaped photo

---

## Printable Tasks Page (tasks-print.html)

- 4x3 grid of task cards per printed page
- Each card has:
  - Task description
  - Difficulty stars (1-3)
  - Bonus Skittles value
  - Small egg icon
  - Dotted cut line border
- Print 2-3 pages depending on total task count

---

## Creative Touches

- Easter pastel color palette (soft pink, lavender, mint, sky blue, butter yellow) — CONFIRMED
- Floating egg CSS animation in the background
- Confetti.js on the scoring page when winner is announced
- Winner photo bounce/jump celebration animation
- Responsive/mobile-first (everyone will view on phones at the park)
- Optional: egg-cracking sound effect on tap (scoring page)
- R&R branding in footer, header accent, and throughout the site
- Player photos in egg-shaped frames wherever they appear

---

## Decision Status Summary

| Item | Status |
|------|--------|
| Event name | CONFIRMED — "Operation: Easter Egg — The Skittelling!" |
| Player count | CONFIRMED — 9 players |
| Player list | CONFIRMED — Reuben, Raina, Swathy, Jason, Nikith, Shawn, Shua, Rutuja, Shantanu |
| Park | CONFIRMED — Garibaldi (Giuseppe) Park (may change to Arrigo Park) |
| Google Maps embed | CONFIRMED |
| Player photos | CONFIRMED — egg-shaped frames, placeholders for now |
| Winner screen | CONFIRMED — photo bounce/celebration animation |
| R&R branding | CONFIRMED |
| Prizes on site | CONFIRMED — hidden, tease only |
| Scoring page access | CONFIRMED — hidden/unlinked, no password |
| Color scheme | CONFIRMED — pastel Easter colors |
| Fun Name Ideas section | REMOVED — name decided |
| What to Bring section | REMOVED — baskets TBD |
| Fun player titles | TBD |
| Exact event date/time | TBD |
| Final park choice | TBD (Garibaldi vs Arrigo) |
| Player count | CONFIRMED — 9 players |
