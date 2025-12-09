from pathlib import Path

from tqdm import tqdm
from markdownify import markdownify

from lib.api import add_post
from lib.utils import download, image_dim, next_file_index
from gallery import page_walk, news_walk


PATH_PUBLIC = Path(__file__) / "../../public"
PATH = PATH_PUBLIC / "galerie"
URL = "https://www.tabor-oskar.cz"


def harvest(url, path, threshold=1_000_000_000):
    size = 0
    prev_dt = None
    for page in page_walk(url):
        for dt, title, subpage in news_walk(page, url):
            if not dt:
                dt = prev_dt
            else:
                if dt.startswith("-"):
                    year = prev_dt.lsplit("-", 1)[0]
                    dt = f"{year}{dt}"
                prev_dt = dt
            folder = Path(path) / dt.replace("-", "")
            folder.mkdir(parents=True, exist_ok=True)
            file_idx = next_file_index(folder)
            article = subpage.select_one(".node")
            images_el = article.select("img")
            images = []
            for img in tqdm(images_el, desc=f"Images for {title}", leave=False):
                hq_src = img["src"].replace("/styles/large/public/", "/").replace("/styles/medium/public/", "/")
                alt = img.get("alt", title) or title
                img.decompose()
                try:
                    new_size, src = download(hq_src, folder, stem=f"{file_idx:03d}", content="image")
                except ValueError as e:
                    tqdm.write(str(e))
                    continue
                width, height = image_dim(src)
                image_data = {
                    "src": Path(src).relative_to(PATH_PUBLIC).as_posix(),
                    "alt": alt,
                    "width": width,
                    "height": height,
                    "published": False,
                    "createdAt": dt,
                }
                images.append(image_data)
                size += new_size
                file_idx += 1
            content = markdownify(str(article), heading_style="ATX")
            post = {
                "title": title,
                "content": content,
                "published": False,
                "createdAt": dt,
            }
            add_post(post, images)
            if threshold and size > threshold:
                break
        if threshold and size > threshold:
            break


if __name__ == "__main__":
    harvest(url=URL, path=PATH, threshold=None)
