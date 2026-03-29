# Deploy Checklist

[← Back to Phase 09](README.md)

Step-by-step verification that the site is live and working before sending invites.

## 1. Push to Master

```bash
# Make sure you're on master with everything committed
git status                  # Should be clean, or stage & commit remaining changes
git push origin master      # Triggers GitHub Actions auto-deploy
```

- [ ] `git status` shows a clean working tree (or only untracked files you intend to ignore)
- [ ] `git push` completed without errors

## 2. Verify GitHub Actions

```bash
# Check the latest workflow run
gh run list --limit 3
```

Or visit: https://github.com/reubenjohn/easter-egg-hunt/actions

- [ ] Latest workflow run shows **green checkmark** (success)
- [ ] Workflow name matches `pages.yml` deployment
- [ ] No failed steps in the run log

If the workflow failed:
1. Click into the failed run to see the error log
2. Fix the issue locally, commit, push again
3. Re-check until green

## 3. Verify Live Site — All 4 Pages

Open each page and confirm it loads fully:

| Page | URL | What to Check |
|------|-----|---------------|
| Home | https://reubenjohn.github.io/easter-egg-hunt/ | Hero section, player cards, rules, event details |
| Prep | https://reubenjohn.github.io/easter-egg-hunt/prep.html | Egg prep checklist, stats, assembly instructions |
| Scoring | https://reubenjohn.github.io/easter-egg-hunt/scoring.html | Scoring UI renders, interactive elements work |
| Task Cards | https://reubenjohn.github.io/easter-egg-hunt/tasks-print.html | Printable layout, all task cards visible |

- [ ] Home page loads completely
- [ ] Prep page loads completely
- [ ] Scoring page loads completely
- [ ] Task Cards page loads completely
- [ ] No 404 errors on any page
- [ ] No broken images (check browser console for failed resource loads)
- [ ] No JavaScript errors in the browser console

## 4. Content Accuracy Check

On the home page, verify:

- [ ] Event name: "Operation: Easter Egg — The Skittelling!"
- [ ] Date: Sunday, March 29, 2026
- [ ] Time: 5:00 PM – 7:00 PM CT
- [ ] Venue: Garibaldi (Giuseppe) Park - 1520 W Polk St, Chicago IL 60607
- [ ] All 9 players listed with correct names
- [ ] Player photos/avatars load without broken images
- [ ] R&R branding is present

## 5. Mobile Test

Test on an actual phone if possible. Otherwise use Chrome DevTools:

```
Chrome → F12 → Toggle Device Toolbar (Ctrl+Shift+M) → Select a phone model
```

- [ ] Pages load on mobile viewport
- [ ] Text is readable without horizontal scrolling
- [ ] Player cards stack properly
- [ ] Navigation/links are tappable (large enough touch targets)
- [ ] Images scale correctly
- [ ] No content overflows the screen

## 6. Run Automated Tests (Optional but Recommended)

```bash
cd /home/reuben/workspace/easter-egg-hunt
uv run pytest tests/ -v
```

- [ ] All Playwright tests pass
- [ ] Review screenshots in test output for visual regressions

## 7. Final Go / No-Go

| Check | Status |
|-------|--------|
| Code pushed & Actions green | |
| All 4 pages load on desktop | |
| Content is accurate | |
| Mobile looks good | |
| Automated tests pass | |

**All checks pass?** Proceed to [InviteMessage.md](InviteMessage.md) and send the invite!

**Something failed?** Fix it, push again, and restart from Step 1.
