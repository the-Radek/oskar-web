import re
from pathlib import Path
from datetime import date

import requests
from tqdm import tqdm
from bs4 import BeautifulSoup

from lib.utils import capitalize_title, download, sanitize_file_name


PATH = Path(__file__) / "../../public/galerie"
URL = "https://www.tabor-oskar.cz"


def page_walk(url=URL):
    response = requests.get(f"{url}")
    title_page = BeautifulSoup(response.content, "html.parser")
    last_page_url = title_page.select_one(".pager-last > a:nth-child(1)")["href"]
    last_page_num = int(re.search(r".*page=(\d+)", last_page_url).group(1))
    for i in tqdm(range(last_page_num, -1, -1), desc="Pages"):
        response = requests.get(f"{url}?page={i}")
        yield BeautifulSoup(response.content, "html.parser")


def news_walk(page, root=URL):
    news_list = page.select("div.media")
    for news in tqdm(reversed(news_list), desc=f"News", leave=False):
        link = news.select_one("div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > a:nth-child(1)")
        title = capitalize_title(link.text.strip())
        response = requests.get(root + link["href"])
        matched = re.match(r"^\s*(?P<day>\d{1,2})\s*\.\s*(?P<month>\d{1,2})\s*\.\s*(?P<year>\d{4})", title)
        if not matched:
            matched = re.match(r"^\s*(?P<day>\d{1,2})\s*\.\s*(?P<month>\d{1,2})\s*\.", title)
        if not matched:
            img = news.select_one(
                "div:nth-child(1) > span:nth-child(2) > span:nth-child(1) > a:nth-child(1) > img:nth-child(1)"
            )
            matched = re.search(r".*/promo-foto/(?P<month>\d{2})(?P<day>\d{2})(?P<year>\d{4})/.*", img["src"])
        else:
            title = title[matched.end() :].lstrip()
        dt = None
        if matched:
            if "year" in matched.re.groupindex:
                dt = f"{int(matched.group('year')):04d}-{int(matched.group('month')):02d}-{int(matched.group('day')):02d}"
            else:
                dt = f"-{int(matched.group('month')):02d}-{int(matched.group('day')):02d}"
        yield dt, title or "Aktualita", BeautifulSoup(response.content, "html.parser")


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
                size += download(hq_src, folder)[0]
            i += 1
            if threshold and size > threshold:
                break
        if threshold and size > threshold:
            break


if __name__ == "__main__":
    harvest(url=URL, path=PATH, threshold=None)
