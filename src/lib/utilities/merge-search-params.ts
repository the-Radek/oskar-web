type ParamValue = string | number | boolean | null | undefined;

/**
 * Merge updates into a copy of the given search params.
 * Keys set to null or an empty string are removed.
 *
 * @param searchParams current search params, left untouched
 * @param updates keys to set or remove
 * @returns sorted query string, without the leading "?"
 */
export function mergeSearchParams(
  searchParams: URLSearchParams,
  updates: Record<string, ParamValue>,
): string {
  const params = new URLSearchParams(searchParams);

  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === '') {
      params.delete(key);
    } else if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  params.sort();
  return params.toString();
}
