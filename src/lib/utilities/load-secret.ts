import * as fs from 'node:fs';

/**
 * load docker secret from file
 * @param name name of the environment variable which contains the path to the secret file
 * @throws if the environment variable is missing
 * @returns the secret
 */
export default function loadSecret(name: string) {
  const file = process.env[name];
  if (file === undefined) {
    throw new Error(`Invalid environment variable ${name}`);
  }
  return fs.readFileSync(file, 'utf8').trim();
}
