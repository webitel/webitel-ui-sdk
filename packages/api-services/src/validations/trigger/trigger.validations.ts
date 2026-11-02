import {
	type EngineTrigger,
	EngineTriggerObjectType,
	EngineTriggerType,
} from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { i18nIssue } from '../_shared/i18nIssue';
import { isFilled } from '../_shared/isFilled';
import {
	filledLookupSchema,
	flexibleLookupSchema,
} from '../_shared/lookup.validations';
import {
	type VariablePair,
	variablePairSchema,
} from '../_shared/variablePair.validations';

/** [Claude] the card's trigger: `variables` is the editable pair list, the api takes a map */
export type TriggerCard = Omit<EngineTrigger, 'variables'> & {
	variables?: VariablePair[];
};

/**
 * [Claude] Trigger card schema.
 *
 * A cron trigger runs on a schedule, so it needs the expression and its
 * timezone; an event trigger runs on an object's event, so it needs both of
 * those. Whether the expression is a valid cron is left to the app, which
 * has the cron parser.
 */
export const triggerSchema = z
	.object({
		id: z
			.union([
				z.string(),
				z.number(),
			])
			.optional(),
		name: z.string().min(1).default(''),
		description: z.string().optional().default(''),
		enabled: z.boolean().default(true),
		type: z.string().min(1).default(EngineTriggerType.Cron),
		// [Claude] `.prefault`, not `.default`: zod 4's `.default({})` would skip the required check
		schema: filledLookupSchema.prefault({}),
		// [Claude] an emptied number input gives `null`, which is allowed here
		timeout: z.number().min(0).nullable().optional().default(60),
		variables: z.array(variablePairSchema).default([]),
		expression: z.string().optional().default('0 */1 12 * * *'),
		timezone: flexibleLookupSchema.optional().default({}),
		object: z.string().optional().default(EngineTriggerObjectType.Cases),
		event: z.string().optional().default(''),
	})
	.passthrough()
	.superRefine((trigger, ctx) => {
		const requireField = (path: string, value: unknown) => {
			if (isFilled(value)) return;
			ctx.addIssue({
				code: 'custom',
				// [Claude] an object field gets a nested status in regle, so its issue goes on `id`
				path:
					path === 'timezone'
						? [
								path,
								'id',
							]
						: [
								path,
							],
				...i18nIssue('required'),
			});
		};

		if (trigger.type === EngineTriggerType.Cron) {
			requireField('expression', trigger.expression);
			requireField('timezone', trigger.timezone);
		}
		if (trigger.type === EngineTriggerType.Event) {
			requireField('object', trigger.object);
			requireField('event', trigger.event);
		}
	});
