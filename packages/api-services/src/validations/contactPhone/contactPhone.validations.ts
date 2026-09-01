import type { ContactsPhoneNumber } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { filledLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const contactPhoneSchema = z.object<ZodShape<ContactsPhoneNumber>>({
	number: z.string().min(1),
	type: filledLookupSchema,
	primary: z.boolean().optional(),
});
