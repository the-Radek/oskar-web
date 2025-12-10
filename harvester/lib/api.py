import requests


URL = "http://localhost:3000/api/post/new"
cookie = None


def api_init():
    global cookie
    if cookie is None:
        cookie = input("Enter session cookie: ").strip()


def add_post(post, images):
    global cookie
    if cookie is None:
        cookie = input("Enter session cookie: ").strip()

    headers = {"Cookie": cookie}

    data = {"post": post, "images": images}

    response = requests.post(URL, headers=headers, json=data)

    if response.status_code != 201:
        raise Exception("Failed to add post:", response.text)
