import { z } from 'zod';

export const lookupSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
});

export const requiredLookupSchema = z.object({
	id: z.string().min(1),
	name: z.string().optional(),
});
