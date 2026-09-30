import { z } from 'zod';

export const userTokenSchema = z.object({
	usage: z.string().default(''),
});
