import loadSecret from './load-secret';

/**
 * construct Postgres connection URL from environment variables
 * @param suppressError if true, do not throw error if the environment variable is missing
 * @returns the Postgres connection URL
 */
export default function postgresUrl(suppressError: boolean = false): string {
  const user = process.env['DB_USERNAME'];
  const password = loadSecret('DB_PASSWORD_FILE', suppressError);
  const host = process.env['DB_HOST'] || 'localhost';
  const database = process.env['DB_DATABASE'] || 'oskar';
  const port = process.env['DB_PORT'] || '5432';
  const schema = process.env['DB_SCHEMA'] || 'public';

  return `postgresql://${user}:${password}@${host}:${port}/${database}?schema=${schema}`;
}
