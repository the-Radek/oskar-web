import os, re, shutil
from pathlib import Path
from datetime import date

import requests, tqdm
from bs4 import BeautifulSoup


PATH = Path(__file__) / "../public/galerie"
URL = "https://www.tabor-oskar.cz"
PAGES_N = 75


def page_walk(url=URL):
    for i in tqdm.trange(PAGES_N):
        response = requests.get(f"{url}?page={i}")
        yield BeautifulSoup(response.content, "html.parser")


def news_walk(page, root=URL):
    news_list = page.select("div.media")
    for news in news_list:
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


def download(url, path="."):
    path = Path(path)
    fname = url.rsplit("/", 1)[-1].split("?", 1)[0]
    response = requests.get(url, stream=True)
    with open(path / fname, "wb") as fd:
        response.raw.decode_content = True
        shutil.copyfileobj(response.raw, fd)
    return os.path.getsize(path / fname)


def sanitize_file_name(string):
    return "".join(x for x in string.strip(". ") if x.isalnum() or x in " -_.()")


def harvest(url, path, threshold=1_000_000_000):
    i = 0
    size = 0
    for page in page_walk(url):
        for dt, title, subpage in news_walk(page, url):
            folder = Path(path) / dt.isoformat() / sanitize_file_name(title)
            folder.mkdir(parents=True, exist_ok=True)
            images = subpage.select_one(".node").select("img")
            for image in images:
                hq_src = image["src"].replace("/styles/large/public/", "/").replace("/styles/medium/public/", "/")
                size += download(hq_src, folder)
            i += 1
            if threshold and size > threshold:
                break
        if threshold and size > threshold:
            break


if __name__ == "__main__":
    harvest(url=URL, path=PATH, threshold=None)
