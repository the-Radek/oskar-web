import * as fs from 'node:fs';

/**
 * Load secret like password from file.
 *
 * @param name name of the environment variable which contains the path to the secret file
 * @param touchy if true, throws error if the environment variable is missing
 * @throws if the environment variable is missing
 * @returns the secret
 */
export function loadSecret(name: string, touchy: boolean = false): string {
  const file = process.env[name];
  if (file === undefined) {
    if (touchy) throw new Error(`Invalid environment variable ${name}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8').trim();
}
