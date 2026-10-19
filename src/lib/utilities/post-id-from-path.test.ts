import { describe, expect, it } from 'vitest';
import { postIdFromPath } from './post-id-from-path';

describe('postIdFromPath', () => {
  it.each([
    ['/clanky/3', 3],
    ['/clanky/3/', 3],
    ['/clanky/12?page=2', 12],
    ['/clanky/12#top', 12],
  ])('reads the id from %s', (path, id) => {
    expect(postIdFromPath(path)).toBe(id);
  });

  it.each([
    null,
    '',
    '/',
    '/clanky',
    '/clanky/abc',
    '/clanky/3/extra',
    '/galerie/3',
    '/x/clanky/3',
    '/clanky/0',
    '/clanky/84848489489',
  ])('ignores %j', (path) => {
    expect(postIdFromPath(path)).toBeUndefined();
  });
});
