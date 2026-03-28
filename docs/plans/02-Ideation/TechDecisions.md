# Tech Decisions — Website & Tooling

## Goal

A shareable URL that players open on their phones showing: invitation, rules, player profiles, cute animations, and a post-game Skittle counter.

## Option A: Plain Static HTML/CSS/JS (RECOMMENDED)

- Single `index.html` + CSS + JS (or a few pages)
- Zero build step, instant deploy to GitHub Pages
- Full creative control for animations (CSS animations, confetti.js, etc.)
- Counter/scoring page = simple JS tap-to-increment per player
- **Pros:** Fastest to build, no dependencies, easiest to debug with Playwright
- **Cons:** No markdown rendering, manual HTML

## Option B: MkDocs + GitHub Pages

- Markdown-based, familiar from theact
- Material theme has nice styling out of the box
- **Pros:** Fast content writing, theact has working setup to reference
- **Cons:** Harder to customize with animations/interactive scoring, overkill for a fun party invite

## Option C: Single-page React/Vue app

- **Pros:** Component model, easier state for scoring
- **Cons:** Way overkill, build step, time pressure makes this risky

## Recommendation: Option A

Given the tight time constraint, plain HTML/CSS/JS is the clear winner. We can:
- Use a single `index.html` with sections (anchor-linked)
- CSS animations for egg/bunny theming
- A separate `scoring.html` for the post-game counter
- A separate `tasks-print.html` for printable task slips (hidden from players)
- Host on GitHub Pages (free, instant)

## Hosting Plan

1. Create a `site/` folder in this repo with the static files
2. Enable GitHub Pages from the `main` branch `/site` folder (or use `gh-pages` branch)
3. Share the URL: `https://<username>.github.io/easter-egg-hunt/`

## Playwright Testing

- Reference: theact's Playwright setup
- Use Playwright to:
  - Open each page, take screenshots for validation
  - Test the tap counter works
  - Verify mobile responsiveness (players will use phones)

## Printable Task Cards

- `tasks-print.html` — grid of small cards, each with one task + bonus value
- Styled for cutting out (dotted border lines)
- Print → cut → fold → stuff in gold eggs

## File Structure (Proposed)

```
site/
├── index.html          # Main invite + rules page
├── scoring.html        # Post-game Skittle counter
├── tasks-print.html    # Printable task slips (not linked from main site)
├── css/
│   └── style.css       # Shared styles, animations
├── js/
│   ├── main.js         # Animations, confetti, interactivity
│   └── scoring.js      # Tap counter logic
└── img/
    ├── eggs/           # Egg graphics per color
    ├── players/        # Player photos (if provided)
    └── bunny.svg       # Prize graphic
```

## Open Questions

1. Do you have a GitHub repo created yet, or should I initialize one?
2. Do you have player photos to include, or skip that for now?
3. Any color scheme/theme preference beyond Easter pastels?
4. Should the scoring page be password-protected or just unlinked?
