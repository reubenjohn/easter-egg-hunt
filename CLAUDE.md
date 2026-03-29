# Easter Egg Hunt 2026

## Project Overview

Planning and executing an Easter egg hunt party with friends. The end product is a static website (invitation, rules, animations, scoring) plus printable task cards for physical eggs.

See [docs/plans/README.md](docs/plans/README.md) for timeline and deadlines.

## Key Facts

- **Event name:** "Operation: Easter Egg - The Skittelling!"
- **Date:** Sunday, March 29, 2026 | 5:00 PM – 7:00 PM CT
- **Players:** 9 total — Reuben (Blue), Raina (Lime Green), Swathy (Purple), Jason (Yellow), Nikith (Sky Blue), Shaun (Red), Shua (Hot Pink), Rutuja (Light Pink), Shantanu (Orange)
- **Eggs:** 200 in kit (10 colors × 20). 15 eggs per player (135 total) + 25 special + 40 spare shells.
- **Hunt duration:** 30 minutes
- **Hiding:** Reuben hides wife's eggs, wife hides Reuben's eggs. Both randomly hide remaining players' eggs.
- **Scoring:** Each egg contains 1-3 Skittles (8×1 + 4×2 + 3×3 = 25 per player). Find your color's eggs → count Skittles → most wins.
- **Prizes:** Winner gets chocolate bunny. Everyone gets consolation prize (Reese's/M&M carrot-shaped).
- **Special eggs:** Green-top eggs are tasks (15 total, 4 difficulties). Pink-top eggs are power-ups (5 types × 2 each = 10 eggs). Bottom colors identify type/difficulty.
- **Trading:** Yes, task eggs only.
- **Venue:** Garibaldi (Giuseppe) Park - 1520 W Polk St, Chicago IL 60607
- **Website:** https://reubenjohn.github.io/easter-egg-hunt/
- **Branding:** R&R (Reuben & Raina) branding throughout

## Documentation & Plans

All docs use **hierarchical progressive disclosure** via README.md files:

- [docs/README.md](docs/README.md) — Entry point, navigation hub for all documentation
- [docs/plans/README.md](docs/plans/README.md) — Master plan with timeline, phase overview, folder index
- Each phase folder has its own `README.md` summarizing its files

**Start at [docs/plans/README.md](docs/plans/README.md)** and drill down. Phase folders are sequential:

1. [01-InitialContext](docs/plans/01-InitialContext/README.md) — Voice transcript brainstorm, reference projects ✅
2. [02-Ideation](docs/plans/02-Ideation/README.md) — Ideas, suggestions, game mechanics, tech decisions ✅
3. `03-WifeReview/` — Joint review with wife → decisions finalized (no separate folder; decisions applied directly) ✅
4. `04-GameRules/` — Final rules live in `site/data/config.json` (single source of truth) ✅
5. [05-PhysicalPrep](docs/plans/05-PhysicalPrep/README.md) — Egg prep checklist, task card printouts, supplies ✅
6. [06-WebsiteArchitecture](docs/plans/06-WebsiteArchitecture/README.md) — Tech stack, site structure, hosting ✅
7. `07-WebsiteImplementation/` — Static site built in `site/` (4 pages: index, prep, scoring, tasks-print) ✅
8. `08-Testing/` — Playwright tests in `tests/` (18 tests) ✅
9. [09-InviteSend](docs/plans/09-InviteSend/README.md) — Deployed, invites sent ✅

## Tech Stack (see [TechDecisions.md](docs/plans/02-Ideation/TechDecisions.md))

- **Website:** Static HTML/CSS/JS in `site/` folder
- **Hosting:** GitHub Pages — https://reubenjohn.github.io/easter-egg-hunt/
- **Repo:** https://github.com/reubenjohn/easter-egg-hunt
- **Deployment:** Auto-deploy on push to master via `.github/workflows/pages.yml`
- **Testing:** pytest-playwright via uv (pattern from `~/workspace/theact`)

## MCP Servers

- **Playwright MCP** (`.mcp.json`): Browser automation via `@playwright/mcp`. Provides tools like `browser_navigate`, `browser_snapshot`, `browser_take_screenshot`, etc. Runs headless Chromium. Use for interactive site debugging. For automated test suites, use `uv run pytest` instead.

## Commands

```bash
git push                             # Deploy site (auto via GitHub Actions)
uv run pytest tests/ -v              # Run Playwright tests (serves site/ locally, takes screenshots)
uv run pytest tests/ -v --headed     # Run tests with visible browser
./scripts/dev-server.sh start        # Start local dev server on port 8826
./scripts/dev-server.sh stop         # Stop local dev server
./scripts/dev-server.sh status       # Check if dev server is running
```

## Contributing to CLAUDE.md

- Keep this file as a navigation hub — details go in `docs/plans/` folders
- No absolute paths except the reference project
- Update this file whenever phases complete or key decisions change
