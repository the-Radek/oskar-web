/**
 * Strip markdown syntax and truncate to a plain-text excerpt.
 *
 * @param markdown source markdown text
 * @param length max length before truncating, on a word boundary
 * @returns plain text, truncated with an ellipsis if it exceeded length
 */
export function excerpt(markdown: string, length = 200): string {
  const plain = markdown
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)]\([^)]*\)/g, '$1')
    .replace(/[#<>*_`~-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= length) return plain;
  return plain.slice(0, plain.lastIndexOf(' ', length)) + '…';
}
