from pathlib import Path

import requests
from tqdm import tqdm
from bs4 import BeautifulSoup

from lib.utils import download, hq_image, open_json, save_json, image_dim


PATH = Path(__file__) / "../../public/taborova-hra"
CONFIG = Path(__file__) / "../../src/app/taborova-hra/page.config.json"
URL = "https://www.tabor-oskar.cz"


def page_walk(url=URL):
    response = requests.get(f"{url}/taborove-hry")
    list_page = BeautifulSoup(response.content, "html.parser")
    links = list_page.select("div.views-row > div:nth-child(1) > span:nth-child(1) > a:nth-child(1)")
    for link in tqdm(links):
        year, title = link.text.split(" - ", 1)
        response = requests.get(url + link["href"])
        yield year, title, BeautifulSoup(response.content, "html.parser")


def harvest(url, config, path):
    path = Path(path)
    path.mkdir(parents=True, exist_ok=True)
    metadata = open_json(config)
    size = 0
    for year, title, page in page_walk(url):
        txt = page.select_one("#md1")
        img = page.select_one("img.img-rounded")
        size += download(hq_image(img["src"]), path, f"{year}.jpg")
        width, height = image_dim(path / f"{year}.jpg")
        metadata |= {
            year: {
                "title": title,
                "description": txt.text,
                "image": {
                    "src": f"/taborova-hra/{year}.jpg",
                    "width": width,
                    "height": height,
                    "alt": img["alt"] or title,
                },
            }
        }
    save_json(config, metadata)
    print(f"Downloaded {size / 1_000_000:.3f}MB of image data")


if __name__ == "__main__":
    harvest(url=URL, config=CONFIG, path=PATH)
