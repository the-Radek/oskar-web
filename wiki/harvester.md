# Harvester

To harvest images and texts from old Oskar website ([www.tabor-oskar.cz](https://www.tabor-oskar.cz/)) there are Python scripts in `harvester/`.

## Setup virtal environment (recommended)

```sh
cd harvester
python -m venv .venv
```

## Install requirements

```sh
cd harvester
python -m pip install -r requirements.txt
```

## Reference

### gallery.py (deprecated)

To download all images from all articles.

- **PATH** path where to save images
- **URL** url of old Oskar website

### posts

Downloads all posts and saves them to database, additionaly downloads all images. Script will as for cookie, please provide authenticated cookie from browser.

- **PATH** path where to save images
- **URL** url of old Oskar website

### themed-game.py

To download texts and images of all themed games and save them to expected `config.json`.

- **PATH** path where to save images
- **CONFIG** path to the `config.json`
- **URL** url of old Oskar website
