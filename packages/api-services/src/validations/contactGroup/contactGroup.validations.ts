import type { ContactsGroup } from '@webitel/api-services/gen/models';
import { ContactsGroupType } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import {
	lookupSchema,
	requiredLookupSchema,
} from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

const baseSchema = {
	name: z.string().min(1),
	description: z.string().optional(),
	enabled: z.boolean().optional(),
	type: z.string().optional(),
};

const staticSchema = z.object<ZodShape<ContactsGroup>>({
	...baseSchema,
	defaultGroup: lookupSchema.optional(),
});

const dynamicSchema = z.object<ZodShape<ContactsGroup>>({
	...baseSchema,
	defaultGroup: requiredLookupSchema,
});

export const contactGroupSchema = z.discriminatedUnion('type', [
	staticSchema.extend({
		type: z.literal(ContactsGroupType.Static),
	}),
	dynamicSchema.extend({
		type: z.literal(ContactsGroupType.Dynamic),
	}),
]);
