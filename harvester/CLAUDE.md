# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this directory
(`harvester/`). It supplements, not replaces, the root `CLAUDE.md`.

## What this is

A one-off/rerunnable Python migration tool that scrapes the camp's **old** Drupal site
(https://www.tabor-oskar.cz) and imports its content into the Next.js app in `../src` and `../public`.
It is not part of the Next.js build, has no relation to the app's TypeScript/npm tooling, and is
excluded from the CI Docker build trigger (see `../.github/workflows/deploy.yml` path filters).

Full script reference (args, env, per-script purpose) lives in `../wiki/harvester.md` — read that
before re-deriving script usage from source.

## Setup

```sh
cd harvester
python -m venv .venv
python -m pip install -r requirements.txt
```

## Structure

- `posts.py` — walks the old site's news pages (`gallery.py`'s `page_walk`/`news_walk`), downloads each
  post's images, converts the article HTML to Markdown (`markdownify`), and **POSTs to the live app's
  `/api/post/new`** via `lib/api.py`'s `add_post` — it does not write to the database directly. That
  endpoint requires an authenticated `ADMIN`-role session (see root `CLAUDE.md`'s Auth section); the
  script prompts interactively for a session cookie copied from a logged-in browser.
- `themed-game.py` — scrapes yearly "táborová hra" (camp game) pages and writes straight to
  `../src/app/taborova-hra/[year]/page.config.json` plus images to `../public/taborova-hra/` — no
  API/DB involved, since this content is static JSON consumed at build time.
- `gallery.py` (deprecated) — bulk image download only; superseded by `posts.py` for anything that
  also needs DB/API records.
- `lib/api.py`, `lib/db.py`, `lib/utils.py` — shared helpers (HTTP POST to the app API, direct DB
  access, download/image-dimension/JSON utilities respectively).

## Working conventions

- These scripts target a specific legacy site's HTML structure (CSS selectors like `.node`,
  `div.views-row`, `img.img-rounded`, `#md1`). If the old site's markup is unavailable for verification,
  treat selector changes as best-effort and flag the assumption rather than asserting correctness.
- `posts.py` and `themed-game.py` are idempotent-ish via `SKIP`/`SKIP_DT`/`SKIP_TITLE` (posts) or
  dict-merge into the existing config JSON (themed-game) — preserve that resumability when editing
  rather than assuming a clean re-run is safe.
- Output paths are computed relative to `harvester/` via `Path(__file__) / "../.."`, landing in the
  Next.js app's `public/`/`src/app/` — keep that relationship in mind when moving files.
