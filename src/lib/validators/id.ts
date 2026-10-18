import z from 'zod';

/** Largest value of a Postgres `integer` column; anything above makes Prisma throw. */
export const MAX_ID = 2_147_483_647;

export const IdSchema = z.number().int().min(1).max(MAX_ID);
