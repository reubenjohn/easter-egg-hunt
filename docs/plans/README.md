# Easter Egg Hunt 2026 — Master Plan

[← Back to docs](../README.md) | [← CLAUDE.md](../../CLAUDE.md)

**Start time: TBD (estimated ~1 hour from now) | Total budget: 45 minutes**

## Phase Overview

```
T+00 ─── 02-Ideation (YOU ARE HERE) ──────────── T+05
              │ Ideas, game mechanics, tech stack
              ▼
T+05 ─── 03-WifeReview ──────────────────────── T+15
              │ Quick review, key decisions, refine
              ▼
T+15 ─── 04-GameRules ────────────────────────── T+18
              │ Claude writes final rules, scoring, tasks
              ▼
T+18 ─── 05-PhysicalPrep ────────────────────── T+20
              │ Egg prep checklist, supplies, day-of timeline
              ▼
T+20 ─── 06-WebsiteArchitecture ─────────────── T+22
              │ Site structure, design system, components
              ▼
T+22 ─── 07-WebsiteImplementation ───────────── T+37
              │ Build HTML/CSS/JS — the big phase
              ▼
T+37 ─── 08-Testing ─────────────────────────── T+40
              │ Playwright screenshots, mobile check
              ▼
T+40 ─── 09-InviteSend ──────────────────────── T+45
              │ Deploy to GH Pages, share URL
              ▼
T+45 ─── DONE — Invites sent!
```

## Phase Details

| # | Phase | Offset | Duration | Owner | Key Output |
|---|-------|--------|----------|-------|------------|
| 01 | Initial Context | Done | — | Reuben | Brainstorm transcript, reference notes |
| 02 | Ideation | T+00 | 5 min | Reuben + Claude | Game ideas, tech decisions, website content plan |
| 03 | Wife Review | T+05 | 10 min | Reuben + Wife | Decisions on names, rules, event details |
| 04 | Game Rules | T+15 | 3 min | Claude | Final rules doc, scoring, task list |
| 05 | Physical Prep | T+18 | 2 min | Claude | Egg prep checklist, supplies, print-ready tasks |
| 06 | Website Arch | T+20 | 2 min | Claude | Site map, design system, component plan |
| 07 | Website Build | T+22 | 15 min | Claude | All HTML/CSS/JS in `site/` folder |
| 08 | Testing | T+37 | 3 min | Claude | Playwright validation, screenshots |
| 09 | Invite Send | T+40 | 5 min | Claude + Reuben | GH Pages deploy, invite message |

**Total: 45 min | Buffer: built into phases 07 and 09**

## Critical Path

The bottleneck is **Phase 03 (Wife Review)** — everything after depends on decisions made there. To be respectful of her time, Phase 02 prepares:
- Pre-made suggestions she can approve/veto quickly
- A short list of only 7 decisions needed (see `02-Ideation/ExecutionOverview.md`)
- Everything else Claude decides autonomously

## Folder Index

| Folder | README | Key Files |
|--------|--------|-----------|
| [01-InitialContext/](01-InitialContext/README.md) | Voice brainstorm, references | [Brainstorming.md](01-InitialContext/Brainstorming.md), [HelpfulResources.md](01-InitialContext/HelpfulResources.md) |
| [02-Ideation/](02-Ideation/README.md) | Ideas, tech decisions | [GameMechanics.md](02-Ideation/GameMechanics.md), [TechDecisions.md](02-Ideation/TechDecisions.md), [WebsiteContent.md](02-Ideation/WebsiteContent.md), [ExecutionOverview.md](02-Ideation/ExecutionOverview.md) |
| `03-WifeReview/` | *(Created after wife review session)* | |
| `04-GameRules/` | Final rules, scoring, task list | |
| [05-PhysicalPrep/](05-PhysicalPrep/README.md) | Egg prep, supplies, day-of timeline | [EggPrepChecklist.md](05-PhysicalPrep/EggPrepChecklist.md), [SuppliesList.md](05-PhysicalPrep/SuppliesList.md), [DayOfTimeline.md](05-PhysicalPrep/DayOfTimeline.md) |
| [06-WebsiteArchitecture/](06-WebsiteArchitecture/README.md) | Site map, design system, components | [SiteMap.md](06-WebsiteArchitecture/SiteMap.md), [DesignSystem.md](06-WebsiteArchitecture/DesignSystem.md) |
| `07-WebsiteImplementation/` | Build plan (code goes in `site/`) | |
| `08-Testing/` | Test plan, Playwright scripts | |
| [09-InviteSend/](09-InviteSend/README.md) | Deploy checklist, invite message | [InviteMessage.md](09-InviteSend/InviteMessage.md), [DeployChecklist.md](09-InviteSend/DeployChecklist.md) |

## Parallel Work Opportunities

While **Phase 03** (wife review) is happening, Claude can pre-generate:
- Draft rules (Phase 04) based on current best guesses
- Website skeleton with placeholder names
- Task card templates

This way, after wife review, we only need to swap in final decisions rather than start from scratch.
