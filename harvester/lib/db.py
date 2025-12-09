import os
from pathlib import Path
import psycopg
import dotenv

ADMIN_ID = "cmintk4al0000loo1v5xlgkib"


dotenv.load_dotenv("../.env")


def db_connect():
    dbname = os.getenv("DB_NAME", "oskar")
    user = os.getenv("DB_USER", "oskar")
    password = open(Path("..") / os.getenv("DB_PASSWORD_FILE", "./secrets/db_password")).read().strip()
    host = os.getenv("DB_HOST", "localhost")
    port = os.getenv("DB_PORT", "5432")

    return psycopg.connect(f"dbname={dbname} user={user} password={password} host={host} port={port}")


def add_post(conn, dt, title, content):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO "Post" (title, content, "authorId", "createdAt")
            VALUES (%s, %s, %s, %s)
            RETURNING id;
            """,
            (title, content, ADMIN_ID, dt),
        )
        return cur.fetchone()["id"]


def add_image(conn, dt, image, post_id=None):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO "Image" (src, alt, width, height, "authorId", "createdAt")
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (image["src"], image["alt"], image["width"], image["height"], ADMIN_ID, dt),
        )
        image_id = cur.fetchone()["id"]
        if post_id is not None:
            cur.execute(
                """
                INSERT INTO "_ImageToPost" ("A", "B")
                VALUES (%s, %s)
                ON CONFLICT DO NOTHING;
                """,
                (image_id, post_id),
            )
        return image_id
