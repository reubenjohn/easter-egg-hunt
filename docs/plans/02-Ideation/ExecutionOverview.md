# Execution Overview — Phase Plan

[← Back to Phase 02](README.md) | [← Back to Master Plan](../README.md)

This document details what goes in each phase folder and what decisions need human input.

For timeline and phase overview, see [Master Plan](../README.md) (single source of truth).

## What Goes in Each Phase Document

### [04-GameRules/](../README.md)
- `FinalRules.md` — Complete, unambiguous rules (an agent could run the game from this alone)
- `ScoringSystem.md` — Point values, power-up effects, tie-breakers
- `TaskList.md` — All task egg contents with difficulty ratings

### [05-PhysicalPrep/](../README.md)
- `EggPrepChecklist.md` — How many eggs per color, Skittle counts, assembly instructions
- `SuppliesList.md` — Everything needed (bags, whistle, markers, etc.)
- `Timeline.md` — Prep schedule for Reuben & wife day-of

### [06-WebsiteArchitecture/](../README.md)
- `SiteMap.md` — Pages, sections, navigation
- `DesignSystem.md` — Colors, fonts, animations, mobile breakpoints
- `ComponentBreakdown.md` — What each HTML/JS file does

### [07-WebsiteImplementation/](../README.md)
- `BuildPlan.md` — Exact file-by-file build order
- Implementation happens in `site/` folder at project root

### [08-Testing/](../README.md)
- `TestPlan.md` — What to test, expected screenshots
- Playwright test scripts

### [09-InviteSend/](../README.md)
- `DeployChecklist.md` — GitHub Pages setup steps
- `InviteMessage.md` — Copy-paste message template for group chat

## Key Decision Points Needing Human Input

These are the ONLY things that need Reuben/wife decisions (everything else Claude can decide):

1. **Player names** — need all 7 names for the website
2. **Event name** — pick from suggestions or custom (see [WebsiteContent.md](WebsiteContent.md) for ideas)
3. **Park name & time** — for the invitation
4. **Gold/Silver colors** — confirm which 2 colors from the kit are for specials (see [GameMechanics.md](GameMechanics.md))
5. **Trading: yes/no** — recommend yes (see [GameMechanics.md](GameMechanics.md) trading section)
6. **Player photos** — include or skip? (see [WebsiteContent.md](WebsiteContent.md))
7. **Any rules vetoes** — anything that doesn't work for your group?
