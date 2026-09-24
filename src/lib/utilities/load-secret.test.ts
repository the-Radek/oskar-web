import { afterEach, describe, expect, it, vi } from 'vitest';
import * as fs from 'node:fs';
import { loadSecret } from './load-secret';

vi.mock('node:fs', () => ({ readFileSync: vi.fn() }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('loadSecret', () => {
  it('reads and trims the file referenced by the env var', () => {
    vi.stubEnv('MY_SECRET_FILE', '/run/secrets/my_secret');
    vi.mocked(fs.readFileSync).mockReturnValue('s3cret\n');

    expect(loadSecret('MY_SECRET_FILE')).toBe('s3cret');
    expect(fs.readFileSync).toHaveBeenCalledWith('/run/secrets/my_secret', 'utf8');
  });

  it('returns an empty string when the env var is missing and errors are suppressed', () => {
    vi.stubEnv('MISSING_FILE', undefined);
    expect(loadSecret('MISSING_FILE')).toBe('');
  });

  it('throws when the env var is missing and touchy is true', () => {
    vi.stubEnv('MISSING_FILE', undefined);
    expect(() => loadSecret('MISSING_FILE', true)).toThrow();
  });
});
