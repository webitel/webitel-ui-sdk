import type { ContactsEmailAddress } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const contactEmailSchema = z.object<ZodShape<ContactsEmailAddress>>({
	email: z.string().min(1).email(),
	type: z.any(),
	primary: z.boolean().optional(),
});
