import z from 'zod';

export const dateSchema = z
  .string()
  .refine((value) => !isNaN(Date.parse(value)), 'Invalid date')
  .transform((value) => new Date(value));
