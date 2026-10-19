import { cache } from 'react';
import { prisma } from '../../prisma';
import type { ImageYear } from './types';

/**
 * Years with published images, newest first. Same filter as `visible`, same UTC years as the
 * feed groups by (`createdAt` is stored as UTC without a zone).
 */
export const getImageYears = cache(async () => {
  return prisma.$queryRaw<ImageYear[]>`
    SELECT EXTRACT(YEAR FROM "createdAt")::int AS year, COUNT(*)::int AS count
    FROM "Image"
    WHERE "published" = true AND "deletedAt" IS NULL
    GROUP BY 1
    ORDER BY 1 DESC`;
});
