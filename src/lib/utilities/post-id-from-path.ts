import { IdSchema } from '../validators/id';

/**
 * The post id out of a post detail path (`/clanky/3`), or undefined for any other path or an id
 * the database can't hold.
 *
 * @param path pathname, possibly with a query string, or null
 */
export function postIdFromPath(path: string | null): number | undefined {
  const match = path?.match(/^\/clanky\/(\d+)\/?(?:[?#]|$)/);
  const id = IdSchema.safeParse(match ? Number(match[1]) : NaN);
  return id.success ? id.data : undefined;
}
