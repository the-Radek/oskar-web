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

### gallery.py

To download all images from all articles.

- **PATH** path where to save images
- **URL** url of old Oskar website
- **PAGES_N** number of pages with articles

### themed-game.py

To download texts and images of all themed games and save them to expected `config.json`.

- **PATH** path where to save images
- **CONFIG** path to the `config.json`
- **URL** url of old Oskar website
