"""Fixtures for Playwright browser tests against the static site.

Launches a local HTTP server serving site/ and provides the base URL
to tests via the ``web_server`` fixture.

Run with:  uv run pytest tests/ -v
"""

from __future__ import annotations

import os
import subprocess
import sys
import time
import urllib.request

import pytest


@pytest.fixture(scope="session")
def web_server():
    """Launch a local HTTP server for the test session.

    Serves the site/ directory on http://127.0.0.1:3123.
    Yields the base URL. The server is torn down after all tests complete.
    """
    host = "127.0.0.1"
    port = 3123
    site_dir = os.path.join(os.path.dirname(__file__), "..", "site")
    site_dir = os.path.abspath(site_dir)

    proc = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(port), "--bind", host, "--directory", site_dir],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    base_url = f"http://{host}:{port}"
    for _ in range(15):
        if proc.poll() is not None:
            stdout = proc.stdout.read().decode()[-500:]
            stderr = proc.stderr.read().decode()[-500:]
            pytest.fail(
                f"HTTP server exited with code {proc.returncode}.\n"
                f"STDOUT: {stdout}\nSTDERR: {stderr}"
            )
        try:
            urllib.request.urlopen(base_url, timeout=1)
            break
        except Exception:
            time.sleep(0.5)
    else:
        proc.kill()
        proc.wait(timeout=5)
        pytest.fail("HTTP server did not start in time")

    yield base_url

    proc.kill()
    proc.wait(timeout=5)
