import { notFound } from 'next/navigation';

/**
 * Parse a numeric id route param, responding with 404 when it isn't a positive integer.
 *
 * @param id raw route param
 * @returns the id as a number
 */
export function parseId(id: string): number {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed < 1) notFound();
  return parsed;
}
