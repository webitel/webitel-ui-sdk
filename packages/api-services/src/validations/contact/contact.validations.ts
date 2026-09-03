import type { WebitelContactsContact } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const contactSchema = z.object<ZodShape<WebitelContactsContact>>({
	name: z
		.object({
			commonName: z.string().min(1),
		})
		.passthrough()
		.optional(),
	timezones: z.any().optional(),
	managers: z.any().optional(),
	groups: z.any().optional(),
	labels: z.any().optional(),
	about: z.string().nullish(),
	user: z.any().nullish(),
});
