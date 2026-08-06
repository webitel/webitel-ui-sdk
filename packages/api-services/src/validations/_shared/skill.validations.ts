import { z } from 'zod';

export const skillSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
});
