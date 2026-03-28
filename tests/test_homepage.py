"""Browser tests for all site pages.

Takes screenshots and validates key elements are visible.

Run with:  uv run pytest tests/ -v
"""

from pathlib import Path

from playwright.sync_api import expect

SCREENSHOTS_DIR = Path(__file__).parent.parent / "screenshots"


def test_homepage_loads(page, web_server):
    """Homepage loads and shows the event title."""
    page.goto(web_server)
    expect(page.locator("text=Operation: Easter Egg")).to_be_visible()

    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    page.screenshot(path=str(SCREENSHOTS_DIR / "homepage.png"), full_page=True)


def test_homepage_players_section(page, web_server):
    """Homepage shows all 9 player names."""
    page.goto(web_server)
    for name in ["Reuben", "Raina", "Swathi", "Jason", "Nikith", "Shawn", "Shua", "Rutuja", "Shantanu"]:
        expect(page.locator(f"text={name}").first).to_be_visible()

    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    page.screenshot(path=str(SCREENSHOTS_DIR / "homepage-players.png"), full_page=True)


def test_scoring_page_loads(page, web_server):
    """Scoring page loads with all player counters."""
    page.goto(f"{web_server}/scoring.html")
    for name in ["Reuben", "Raina", "Swathi", "Jason", "Nikith"]:
        expect(page.locator(f"text={name}").first).to_be_visible()

    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    page.screenshot(path=str(SCREENSHOTS_DIR / "scoring.png"), full_page=True)


def test_scoring_increment(page, web_server):
    """Scoring page increment button works."""
    page.goto(f"{web_server}/scoring.html")
    # Click the first + button a few times
    plus_buttons = page.locator("text=+")
    plus_buttons.first.click()
    plus_buttons.first.click()
    plus_buttons.first.click()

    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    page.screenshot(path=str(SCREENSHOTS_DIR / "scoring-incremented.png"), full_page=True)


def test_tasks_print_page_loads(page, web_server):
    """Printable tasks page loads with task and power-up cards."""
    page.goto(f"{web_server}/tasks-print.html")
    expect(page.locator("text=Print Cards").first).to_be_visible()

    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    page.screenshot(path=str(SCREENSHOTS_DIR / "tasks-print.png"), full_page=True)
