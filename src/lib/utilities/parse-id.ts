import { IdSchema } from '../validators/id';

/**
 * Parse a numeric id route param.
 *
 * @param id raw route param
 * @returns the id, or null when it isn't a plain positive integer that fits the database's
 *   `integer`
 */
export function parseId(id: string): number | null {
  const parsed = IdSchema.safeParse(/^\d+$/.test(id) ? Number(id) : NaN);
  return parsed.success ? parsed.data : null;
}
