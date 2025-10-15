import re
from pathlib import Path
from datetime import date

import requests
from tqdm import tqdm, trange
from bs4 import BeautifulSoup

from lib.utils import download, sanitize_file_name


PATH = Path(__file__) / "../../public/galerie"
URL = "https://www.tabor-oskar.cz"
PAGES_N = 75


def page_walk(url=URL):
    for i in trange(PAGES_N, desc="Pages"):
        response = requests.get(f"{url}?page={i}")
        yield BeautifulSoup(response.content, "html.parser")


def news_walk(page, root=URL):
    news_list = page.select("div.media")
    for news in tqdm(news_list, desc=f"News", leave=False):
        link = news.select_one("div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > a:nth-child(1)")
        img = news.select_one(
            "div:nth-child(1) > span:nth-child(2) > span:nth-child(1) > a:nth-child(1) > img:nth-child(1)"
        )
        search_obj = re.search(r".*/promo-foto/(\d{2})(\d{2})(\d{4})/.*", img["src"])
        if not search_obj:
            raise ValueError
        dt = date(int(search_obj.group(3)), int(search_obj.group(1)), int(search_obj.group(2)))
        response = requests.get(root + link["href"])
        yield dt, link.text, BeautifulSoup(response.content, "html.parser")


def harvest(url, path, threshold=1_000_000_000):
    i = 0
    size = 0
    for page in page_walk(url):
        for dt, title, subpage in news_walk(page, url):
            folder = Path(path) / dt.isoformat() / sanitize_file_name(title)
            folder.mkdir(parents=True, exist_ok=True)
            images = subpage.select_one(".node").select("img")
            for image in tqdm(images, desc=f"Images for {title}", leave=False):
                hq_src = image["src"].replace("/styles/large/public/", "/").replace("/styles/medium/public/", "/")
                size += download(hq_src, folder)
            i += 1
            if threshold and size > threshold:
                break
        if threshold and size > threshold:
            break


if __name__ == "__main__":
    harvest(url=URL, path=PATH, threshold=None)
