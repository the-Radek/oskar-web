import { describe, expect, it } from 'vitest';
import { getBlurDataURL } from './blur-data-url';

describe('getBlurDataURL', () => {
  it('returns a small JPEG data URL for an image in public/', async () => {
    const url = await getBlurDataURL('/logo/oskar.png');
    expect(url).toMatch(/^data:image\/jpeg;base64,/);
    expect(url!.length).toBeLessThan(2000);
  });

  it('returns the memoized value on repeated calls', async () => {
    expect(await getBlurDataURL('/logo/oskar.png')).toBe(await getBlurDataURL('/logo/oskar.png'));
  });

  it('returns a cached value without checking the file system when immutable', async () => {
    const first = await getBlurDataURL('/logo/oskar.png');
    expect(await getBlurDataURL('/logo/oskar.png', { immutable: true })).toBe(first);
  });

  it('does not cache failures', async () => {
    await getBlurDataURL('/missing.jpg', { immutable: true });
    expect(await getBlurDataURL('/missing.jpg', { immutable: true })).toBeUndefined();
  });

  it.each(['/missing.jpg', 'https://example.com/a.jpg', 'logo/oskar.png', '/../package.json'])(
    'returns undefined for %s',
    async (src) => {
      expect(await getBlurDataURL(src)).toBeUndefined();
    },
  );
});
