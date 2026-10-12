# harvester

Python, scrapes the old Oskar site (`www.tabor-oskar.cz`, Drupal) into this repo's DB and `public/`. Usage/CLI args: `wiki/harvester.md`. This file = code structure notes.

## Files

- `gallery.py` — deprecated, dumb image dump.
- `posts.py` — main scraper. Walks news pages (`page_walk`/`news_walk`), downloads images to `public/galerie/<yyyymmdd>/`, markdown-ifies article HTML, posts each article via `lib/api.py` (HTTP, needs a running dev server + admin session cookie) — NOT `lib/db.py`.
- `themed-game.py` — scrapes yearly "táborová hra" pages into `src/assets/game/<year>.jpg` + writes `src/app/taborova-hra/[year]/page.config.json`. Runs standalone, no server/DB needed.
- `lib/api.py` — posts scraped content to `POST /api/post/new` (prompts for session cookie, paste from browser devtools after logging in as admin).
- `lib/db.py` — direct Postgres writes, alternate path to `lib/api.py`. `ADMIN_ID` is hardcoded to a specific user id — check it's still valid before use.
- `lib/utils.py` — shared: `download`, `image_dim`, `sanitize_file_name`, `next_file_index` (next numeric filename in a folder), json helpers.

## Notes

- Image URLs from the old site get upgraded from `/styles/{large,medium}/public/` thumbnails to originals via `hq_image`/string replace — keep this when adding new scrapers.
- Scripts assume CWD = `harvester/` (paths are relative, e.g. `../../public`).
- `.env` is loaded via `dotenv.load_dotenv("../.env")` in `lib/db.py` — i.e. the repo root `.env`, not one inside `harvester/`.
