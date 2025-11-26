import * as fs from 'node:fs';

/**
 * load docker secret from file
 * @param name name of the environment variable which contains the path to the secret file
 * @param suppressError if true, do not throw error if the environment variable is missing
 * @throws if the environment variable is missing
 * @returns the secret
 */
export function loadSecret(name: string, suppressError: boolean = false): string {
  const file = process.env[name];
  if (file === undefined) {
    if (suppressError) return '';
    throw new Error(`Invalid environment variable ${name}`);
  }
  return fs.readFileSync(file, 'utf8').trim();
}
