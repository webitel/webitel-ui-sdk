import { z } from 'zod';
import type { ContactEntity } from '../../api/clients/сontacts/types/ContactEntity.types';
import type { ZodShape } from '../types';

export const contactSchema = z.object<ZodShape<ContactEntity>>({
	name: z.string().optional(),
	timezones: z.array(z.any()).optional(),
	managers: z.array(z.any()).optional(),
	groups: z.array(z.any()).optional(),
	labels: z.array(z.any()).optional(),
	about: z.string().nullish(),
	user: z.any().nullish(),
});
