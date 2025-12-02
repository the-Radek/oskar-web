from pathlib import Path

import dotenv
from tqdm import tqdm
from markdownify import markdownify

from lib.db import add_image, add_post, db_connect
from lib.utils import download, image_dim, next_file_index
from gallery import page_walk, news_walk


dotenv.load_dotenv("../.env")

PATH = Path(__file__) / "../../public/galerie"
URL = "https://www.tabor-oskar.cz"


def harvest(url, path, threshold=1_000_000_000):
    conn = db_connect()
    i = 0
    size = 0
    for page in page_walk(url):
        for dt, title, subpage in news_walk(page, url):
            folder = Path(path) / dt.isoformat()
            folder.mkdir(parents=True, exist_ok=True)
            file_idx = next_file_index(folder)
            article = subpage.select_one(".node")
            content = markdownify(str(article), heading_style="ATX")
            images = article.select("img")
            post_id = add_post(conn, dt, title, content)
            for image in tqdm(images, desc=f"Images for {title}", leave=False):
                hq_src = image["src"].replace("/styles/large/public/", "/").replace("/styles/medium/public/", "/")
                new_size, src = download(hq_src, folder, stem=f"{file_idx:03d}")
                width, height = image_dim(src)
                image_data = {
                    "src": Path(src).relative_to("../public").as_posix(),
                    "alt": image.get("alt", title),
                    "width": width,
                    "height": height,
                }
                add_image(conn, dt, image_data, post_id)
                size += new_size
                file_idx += 1
            i += 1
            if threshold and size > threshold:
                break
        if threshold and size > threshold:
            break


if __name__ == "__main__":
    harvest(url=URL, path=PATH, threshold=None)
