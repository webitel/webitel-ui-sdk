import type { ContactsVariable } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const variableSchema = z.object<ZodShape<ContactsVariable>>({
	key: z.string().min(1),
	value: z.string().min(1),
});
