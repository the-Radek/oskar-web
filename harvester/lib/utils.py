import os, re, shutil, json
from pathlib import Path

import requests
from PIL import Image


def hq_image(src):
    return src.replace("/styles/large/public/", "/").replace("/styles/medium/public/", "/")


def lstrip_date(string):
    return re.sub(r"^\s*\d{1,2}\.\s*\d{1,2}\.\s*\d{4}\s*", "", string)


def sanitize_file_name(string):
    return "".join(x for x in lstrip_date(string).strip(". ") if x.isalnum() or x in " -_.()").replace(" ", "_").lower()


def download(url, path=".", fname=None, stem=None, content=None):
    response = requests.get(url, stream=True)
    content_type = response.headers.get("Content-Type", "").lower()
    if content and content not in content_type:
        raise ValueError(f"URL does not point to correct content type: {url} ({content_type})")
    path = Path(path)
    if fname is None:
        fname = url.rsplit("/", 1)[-1].split("?", 1)[0]
        if stem is not None:
            ext = content_type.rsplit("/", 1)[-1].split(";", 1)[0]
            fname = f"{stem}.{ext}"
    with open(path / fname, "wb") as fd:
        response.raw.decode_content = True
        shutil.copyfileobj(response.raw, fd)
    return os.path.getsize(path / fname), path / fname


def image_dim(fname):
    with Image.open(fname) as img:
        return img.size


def open_json(path):
    with open(path, "r", encoding="utf-8") as fd:
        return json.load(fd)


def save_json(path, data):
    with open(path, "w", encoding="utf-8") as fd:
        json.dump(data, fd, ensure_ascii=False, indent=2)


def next_file_index(path):
    largest = 0
    for p in Path(path).iterdir():
        if p.is_file() and p.stem.isdecimal() and int(p.stem) > largest:
            largest = int(p.stem)
    return largest + 1
