/**
 * Prisma filter for rows the public site may show.
 */
export const visible = { published: true, deletedAt: null };

/**
 * Turns the row's `createdAt` into an ISO string, so it can be sent to the browser.
 */
export function serialize<T extends { createdAt: Date }>({ createdAt, ...row }: T) {
  return { ...row, createdAt: createdAt.toISOString() };
}
