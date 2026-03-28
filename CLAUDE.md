# Easter Egg Hunt 2026

## Project Overview

Planning and executing an Easter egg hunt party with friends. The end product is a static website (invitation, rules, animations, scoring) plus printable task cards for physical eggs.

See [docs/plans/README.md](docs/plans/README.md) for timeline and deadlines.

## Key Facts

- **Players:** 7 total (Reuben + wife + 5 friends)
- **Eggs:** 10 colors, dozens per color. Each player assigned one color.
- **Hiding:** Reuben hides wife's eggs, wife hides Reuben's eggs. Both randomly hide remaining players' eggs.
- **Scoring:** Each egg contains 1-3 Skittles. Find your color's eggs → count Skittles → most wins.
- **Prizes:** Winner gets chocolate bunny. Everyone gets consolation prize (Reese's/M&M carrot-shaped).
- **Special eggs:** Two reserved colors for task eggs (embarrassing challenges for bonus Skittles) and power-up eggs (score multipliers/bonuses).
- **Possible trading system** at the end for tasks/power-ups.
- **Venue:** A park (already scouted, lots of hiding spots).

## Documentation & Plans

All docs use **hierarchical progressive disclosure** via README.md files:

- [docs/README.md](docs/README.md) — Entry point, navigation hub for all documentation
- [docs/plans/README.md](docs/plans/README.md) — Master plan with timeline, phase overview, folder index
- Each phase folder has its own `README.md` summarizing its files

**Start at [docs/plans/README.md](docs/plans/README.md)** and drill down. Phase folders are sequential:

1. [01-InitialContext](docs/plans/01-InitialContext/README.md) — Voice transcript brainstorm, reference projects
2. [02-Ideation](docs/plans/02-Ideation/README.md) — Ideas, suggestions, game mechanics, tech decisions
3. `03-WifeReview/` — Joint review with wife → refine/revamp all plans
4. `04-GameRules/` — Final rules, scoring, special mechanics
5. `05-PhysicalPrep/` — Egg prep checklist, task card printouts, supplies
6. `06-WebsiteArchitecture/` — Tech stack, site structure, hosting (GH Pages?)
7. `07-WebsiteImplementation/` — Build the static site
8. `08-Testing/` — Playwright validation, screenshots
9. `09-InviteSend/` — Final review, share URL with players

## Tech Stack (see [TechDecisions.md](docs/plans/02-Ideation/TechDecisions.md))

- **Website:** Static HTML/CSS/JS in `site/` folder
- **Hosting:** GitHub Pages — https://reubenjohn.github.io/easter-egg-hunt/
- **Repo:** https://github.com/reubenjohn/easter-egg-hunt
- **Deployment:** Auto-deploy on push to master via `.github/workflows/pages.yml`
- **Testing:** Playwright (reference setup in `~/workspace/theact`)

## Commands

```bash
git push                             # Deploy site (auto via GitHub Actions)
# Playwright commands TBD
```

## Contributing to CLAUDE.md

- Keep this file as a navigation hub — details go in `docs/plans/` folders
- No absolute paths except the reference project
- Update this file whenever phases complete or key decisions change
