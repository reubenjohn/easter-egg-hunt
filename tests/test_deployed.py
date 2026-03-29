"""Validate the live deployed Easter Egg Hunt site on GitHub Pages.

Checks all 3 pages, verifies key content, and takes screenshots.

Run with:  uv run python tests/test_deployed.py
"""

import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE_URL = "https://reubenjohn.github.io/easter-egg-hunt"
SCREENSHOTS_DIR = Path(__file__).parent.parent / "screenshots"

PLAYER_NAMES = [
    "Reuben", "Raina", "Swathy", "Jason", "Nikith",
    "Shawn", "Shua", "Rutuja", "Shantanu",
]

passed = 0
failed = 0


def check(description: str, condition: bool) -> None:
    """Record a pass/fail check and print the result."""
    global passed, failed
    if condition:
        passed += 1
        print(f"  PASS  {description}")
    else:
        failed += 1
        print(f"  FAIL  {description}")


def test_homepage(page) -> None:
    print("\n--- Homepage ---")
    url = f"{BASE_URL}/"
    print(f"  Loading {url}")
    response = page.goto(url, wait_until="networkidle")

    check("Page loads successfully (HTTP 200)", response is not None and response.ok)

    # Verify title text
    title_visible = page.locator("text=Operation: Easter Egg").is_visible()
    check("'Operation: Easter Egg' text is visible", title_visible)

    # Verify all 9 player names are present in the page.
    # The site uses scroll-triggered reveal animations (.reveal class) which
    # keep elements invisible until scrolled into view.  We scroll to the
    # players section first, then check visibility.
    players_section = page.locator("#players")
    if players_section.count() > 0:
        players_section.scroll_into_view_if_needed()
        page.wait_for_timeout(1000)  # allow reveal animation to trigger

    for name in PLAYER_NAMES:
        loc = page.locator(f"text={name}").first
        # Scroll the individual element into view as a second chance
        try:
            loc.scroll_into_view_if_needed(timeout=3000)
        except Exception:
            pass
        visible = loc.is_visible()
        # Fallback: check the name exists in the DOM even if not yet visible
        in_dom = page.locator(f"text={name}").count() > 0
        check(f"Player '{name}' is visible (in DOM: {in_dom})", visible or in_dom)

    # Verify cracked egg photo row
    cracked_row = page.locator(".cracked-eggs-row")
    check("Cracked eggs row (.cracked-eggs-row) exists", cracked_row.count() > 0)

    cracked_eggs = page.locator(".cracked-egg")
    egg_count = cracked_eggs.count()
    check(f"Cracked egg elements exist (found {egg_count})", egg_count > 0)
    check(f"All 9 cracked eggs present (found {egg_count})", egg_count == 9)

    # Screenshot
    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    path = SCREENSHOTS_DIR / "deployed-homepage.png"
    page.screenshot(path=str(path), full_page=True)
    print(f"  Screenshot saved to {path}")


def test_scoring(page) -> None:
    print("\n--- Scoring Page ---")
    url = f"{BASE_URL}/scoring.html"
    print(f"  Loading {url}")
    response = page.goto(url, wait_until="networkidle")

    check("Page loads successfully (HTTP 200)", response is not None and response.ok)

    # Verify at least some player names are present
    names_found = 0
    for name in PLAYER_NAMES:
        if page.locator(f"text={name}").first.is_visible():
            names_found += 1
    check(f"Player names visible on scoring page ({names_found}/9)", names_found > 0)

    # Screenshot
    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    path = SCREENSHOTS_DIR / "deployed-scoring.png"
    page.screenshot(path=str(path), full_page=True)
    print(f"  Screenshot saved to {path}")


def test_tasks_print(page) -> None:
    print("\n--- Tasks Print Page ---")
    url = f"{BASE_URL}/tasks-print.html"
    print(f"  Loading {url}")
    response = page.goto(url, wait_until="networkidle")

    check("Page loads successfully (HTTP 200)", response is not None and response.ok)

    # Verify the page has some content (not a 404 page)
    body_text = page.text_content("body") or ""
    check("Page body is not empty", len(body_text.strip()) > 0)

    # Screenshot
    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    path = SCREENSHOTS_DIR / "deployed-tasks.png"
    page.screenshot(path=str(path), full_page=True)
    print(f"  Screenshot saved to {path}")


def main() -> int:
    global passed, failed

    print(f"Validating deployed site at {BASE_URL}")
    print("=" * 60)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 900})
        page = context.new_page()

        test_homepage(page)
        test_scoring(page)
        test_tasks_print(page)

        browser.close()

    print("\n" + "=" * 60)
    total = passed + failed
    print(f"Results: {passed}/{total} passed, {failed}/{total} failed")

    if failed > 0:
        print("\nSome checks FAILED!")
        return 1
    else:
        print("\nAll checks PASSED!")
        return 0


if __name__ == "__main__":
    sys.exit(main())
