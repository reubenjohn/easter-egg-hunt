"""Browser tests for the homepage.

Takes screenshots and validates key elements are visible.

Run with:  uv run pytest tests/test_homepage.py -v
"""

from pathlib import Path

from playwright.sync_api import expect

SCREENSHOTS_DIR = Path(__file__).parent.parent / "screenshots"


def test_homepage_loads_and_displays_title(page, web_server):
    """Homepage loads, shows the correct title and heading."""
    page.goto(web_server)
    expect(page).to_have_title("Easter Egg Hunt 2026")
    expect(page.locator("h1")).to_have_text("Easter Egg Hunt 2026")
    expect(page.locator(".coming-soon")).to_be_visible()

    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    page.screenshot(path=str(SCREENSHOTS_DIR / "homepage.png"), full_page=True)


def test_homepage_has_animated_eggs(page, web_server):
    """Homepage shows three animated egg elements."""
    page.goto(web_server)
    eggs = page.locator(".egg")
    expect(eggs).to_have_count(3)

    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    page.screenshot(path=str(SCREENSHOTS_DIR / "homepage-eggs.png"), full_page=True)
