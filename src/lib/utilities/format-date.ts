/**
 * Format a date for display, Czech long style (e.g. "13. července 2026").
 *
 * @param date date to format
 * @returns formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('cs-CZ', { dateStyle: 'long' }).format(date);
}
