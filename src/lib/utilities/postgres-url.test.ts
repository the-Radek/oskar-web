import { afterEach, describe, expect, it, vi } from 'vitest';
import * as fs from 'node:fs';
import { postgresUrl } from './postgres-url';

vi.mock('node:fs', () => ({ readFileSync: vi.fn() }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('postgresUrl', () => {
  it('builds a connection string from env vars, defaulting host/db/port/schema', () => {
    vi.stubEnv('DB_USERNAME', 'oskar');
    vi.stubEnv('DB_PASSWORD_FILE', '/run/secrets/db_password');
    vi.mocked(fs.readFileSync).mockReturnValue('secretpw');

    expect(postgresUrl()).toBe('postgresql://oskar:secretpw@localhost:5432/oskar?schema=public');
  });

  it('honors explicit host/database/port/schema overrides', () => {
    vi.stubEnv('DB_USERNAME', 'oskar');
    vi.stubEnv('DB_PASSWORD_FILE', '/run/secrets/db_password');
    vi.stubEnv('DB_HOST', 'db');
    vi.stubEnv('DB_DATABASE', 'oskar_test');
    vi.stubEnv('DB_PORT', '5433');
    vi.stubEnv('DB_SCHEMA', 'app');
    vi.mocked(fs.readFileSync).mockReturnValue('pw');

    expect(postgresUrl()).toBe('postgresql://oskar:pw@db:5433/oskar_test?schema=app');
  });
});
