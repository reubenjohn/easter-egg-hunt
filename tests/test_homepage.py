"""Browser tests for all site pages.

Tests load player names and game data from config.json (single source of truth)
rather than hardcoding values. Takes screenshots and validates key elements.

Run with:  uv run pytest tests/ -v
"""

import json
from pathlib import Path

from playwright.sync_api import expect

SCREENSHOTS_DIR = Path(__file__).parent.parent / "screenshots"
CONFIG_PATH = Path(__file__).parent.parent / "site" / "data" / "config.json"


def load_config():
    """Load the shared game config."""
    return json.loads(CONFIG_PATH.read_text())


def _wait_for_config(page):
    """Wait until CONFIG.ready has fired and rendered dynamic content."""
    page.wait_for_function("() => window.CONFIG && window.CONFIG.data !== null")


# ──────────────────────────────────────────────
# HOMEPAGE TESTS
# ──────────────────────────────────────────────

def test_homepage_loads(page, web_server):
    """Homepage loads and shows the event title from config."""
    cfg = load_config()
    page.goto(web_server)
    _wait_for_config(page)
    expect(page.locator(f"text={cfg['event']['title']}")).to_be_visible()

    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    page.screenshot(path=str(SCREENSHOTS_DIR / "homepage.png"), full_page=True)


def test_homepage_hero_section(page, web_server):
    """Hero section shows branding, title, subtitle, and tagline from config."""
    cfg = load_config()
    page.goto(web_server)
    _wait_for_config(page)

    expect(page.locator(f"text={cfg['event']['title']}")).to_be_visible()
    expect(page.locator(f"text={cfg['event']['subtitle']}")).to_be_visible()
    expect(page.locator(f"text={cfg['event']['tagline']}")).to_be_visible()


def test_homepage_players_section(page, web_server):
    """Homepage shows all player names from config in the players grid."""
    cfg = load_config()
    page.goto(web_server)
    _wait_for_config(page)

    # Scroll to players section to trigger reveal
    page.locator("#players").scroll_into_view_if_needed()
    page.wait_for_timeout(300)

    for player in cfg["players"]:
        expect(page.locator(f".players-grid .player-name:text('{player['name']}')")).to_be_visible()

    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    page.screenshot(path=str(SCREENSHOTS_DIR / "homepage-players.png"), full_page=True)


def test_homepage_location_section(page, web_server):
    """Location section shows venue name and address from config."""
    cfg = load_config()
    page.goto(web_server)
    _wait_for_config(page)

    page.locator("#location").scroll_into_view_if_needed()
    page.wait_for_timeout(300)

    expect(page.locator(f"text={cfg['venue']['name']}")).to_be_visible()
    expect(page.locator(f"text={cfg['venue']['address']}")).to_be_visible()


def test_homepage_steps_section(page, web_server):
    """How It Works section renders all steps from config."""
    cfg = load_config()
    page.goto(web_server)
    _wait_for_config(page)

    page.locator("#how-it-works").scroll_into_view_if_needed()
    page.wait_for_timeout(300)

    step_cards = page.locator(".step-card")
    expect(step_cards).to_have_count(len(cfg["steps"]))


def test_homepage_special_eggs_section(page, web_server):
    """Special Eggs Guide renders task and power-up egg cards from config."""
    cfg = load_config()
    page.goto(web_server)
    _wait_for_config(page)

    page.locator("#special-eggs").scroll_into_view_if_needed()
    page.wait_for_timeout(300)

    # Grid cards: one per task difficulty + one per power-up
    difficulties = ["easy", "medium", "hard", "extreme"]
    task_count = sum(1 for d in difficulties if d in cfg["tasks"])
    powerup_count = len(cfg["powerups"])
    egg_cards = page.locator(".special-egg-grid-card")
    expect(egg_cards).to_have_count(task_count + powerup_count)


def test_homepage_rules_section(page, web_server):
    """Rules section renders all rules from config."""
    cfg = load_config()
    page.goto(web_server)
    _wait_for_config(page)

    page.locator("#rules").scroll_into_view_if_needed()
    page.wait_for_timeout(300)

    rule_cards = page.locator(".rule-card")
    expect(rule_cards).to_have_count(len(cfg["rules"]))


def test_homepage_footer(page, web_server):
    """Footer shows branding and year from config."""
    cfg = load_config()
    page.goto(web_server)
    _wait_for_config(page)

    page.locator("footer").scroll_into_view_if_needed()
    page.wait_for_timeout(300)

    expect(page.locator("#footerYear")).to_be_visible()
    expect(page.locator("#footerYear")).to_contain_text(str(cfg['event']['year']))


# ──────────────────────────────────────────────
# SCORING PAGE TESTS
# ──────────────────────────────────────────────

def test_scoring_page_loads(page, web_server):
    """Scoring page loads with all player names from config."""
    cfg = load_config()
    page.goto(f"{web_server}/scoring.html")
    _wait_for_config(page)

    for player in cfg["players"]:
        expect(page.locator(f"text={player['name']}").first).to_be_visible()

    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    page.screenshot(path=str(SCREENSHOTS_DIR / "scoring.png"), full_page=True)


def test_scoring_increment(page, web_server):
    """Scoring page increment button works."""
    page.goto(f"{web_server}/scoring.html")
    _wait_for_config(page)

    plus_buttons = page.locator("text=+")
    plus_buttons.first.click()
    plus_buttons.first.click()
    plus_buttons.first.click()

    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    page.screenshot(path=str(SCREENSHOTS_DIR / "scoring-incremented.png"), full_page=True)


def test_scoring_player_count(page, web_server):
    """Scoring page has correct number of player cards from config."""
    cfg = load_config()
    page.goto(f"{web_server}/scoring.html")
    _wait_for_config(page)

    player_cards = page.locator(".player-card")
    expect(player_cards).to_have_count(len(cfg["players"]))


# ──────────────────────────────────────────────
# TASKS PRINT PAGE TESTS
# ──────────────────────────────────────────────

def test_tasks_print_page_loads(page, web_server):
    """Printable tasks page loads with task and power-up cards from config."""
    cfg = load_config()
    page.goto(f"{web_server}/tasks-print.html")
    _wait_for_config(page)

    expect(page.locator("text=Print Cards").first).to_be_visible()

    SCREENSHOTS_DIR.mkdir(exist_ok=True)
    page.screenshot(path=str(SCREENSHOTS_DIR / "tasks-print.png"), full_page=True)


def test_tasks_print_card_count(page, web_server):
    """Tasks page has the right number of task + powerup cards from config."""
    cfg = load_config()
    page.goto(f"{web_server}/tasks-print.html")
    _wait_for_config(page)

    total_tasks = sum(len(cfg["tasks"][d]["items"]) for d in cfg["tasks"])
    total_powerups = len(cfg["powerups"])

    # Count non-empty cards
    cards = page.locator(".card:not(.card-empty)")
    expect(cards).to_have_count(total_tasks + total_powerups)


def test_tasks_print_has_all_difficulties(page, web_server):
    """Tasks page contains cards for each difficulty level."""
    cfg = load_config()
    page.goto(f"{web_server}/tasks-print.html")
    _wait_for_config(page)

    for difficulty in cfg["tasks"]:
        expected_count = len(cfg["tasks"][difficulty]["items"])
        cards = page.locator(f".card-{difficulty}")
        expect(cards).to_have_count(expected_count)


def test_config_json_valid(web_server):
    """Config JSON is valid and has required fields."""
    cfg = load_config()
    assert "event" in cfg
    assert "venue" in cfg
    assert "players" in cfg
    assert "steps" in cfg
    assert "specialEggs" in cfg
    assert "rules" in cfg
    assert "tasks" in cfg
    assert "powerups" in cfg

    assert len(cfg["players"]) > 0
    for player in cfg["players"]:
        assert "id" in player
        assert "name" in player
        assert "color" in player
        assert "photo" in player
