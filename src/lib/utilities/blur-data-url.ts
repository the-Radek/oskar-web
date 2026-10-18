import { stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BLUR_WIDTH = 10;

const cache = new Map<string, { mtimeMs: number; dataUrl: Promise<string> }>();

interface Options {
  immutable?: boolean;
}

/**
 * Tiny base64 JPEG of an image from public/, for next/image's `blurDataURL`.
 *
 * Next only generates blur placeholders for static imports, not for runtime `src`s. The result is
 * memoized per process and, unless immutable, regenerated when the file's modification time
 * changes. Failures (missing or unreadable file) are never cached.
 *
 * @param src site-relative path of the image, e.g. `/galerie/20240101/001.jpg`
 * @param options.immutable the file never changes, so a cached value is returned without
 *   checking the file system
 * @returns a `data:` URL, or undefined when src is remote, escapes public/ or can't be read
 */
export async function getBlurDataURL(src: string, options?: Options): Promise<string | undefined> {
  const { immutable = false } = options || {};
  const file = path.join(PUBLIC_DIR, src);
  if (!src.startsWith('/') || !file.startsWith(PUBLIC_DIR + path.sep)) return undefined;

  try {
    const cached = cache.get(src);
    if (immutable && cached) return await cached.dataUrl;

    const { mtimeMs } = await stat(file);
    if (cached?.mtimeMs === mtimeMs) return await cached.dataUrl;

    const dataUrl = sharp(file)
      .rotate()
      .resize(BLUR_WIDTH)
      .jpeg({ quality: 50 })
      .toBuffer()
      .then((buffer) => `data:image/jpeg;base64,${buffer.toString('base64')}`);
    cache.set(src, { mtimeMs, dataUrl });
    return await dataUrl;
  } catch {
    cache.delete(src);
    return undefined;
  }
}

/**
 * Adds `blurDataURL` to an image-like object (see `getBlurDataURL`; assumes public, immutable files).
 */
export async function withBlurDataURL<T extends { src: string }>(image: T) {
  return { ...image, blurDataURL: await getBlurDataURL(image.src, { immutable: true }) };
}
