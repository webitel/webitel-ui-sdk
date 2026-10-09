import { useRegleSchema } from '@regle/schemas';
import { getQueueDefaults } from '@webitel/api-services/api';
import { QueueType } from '@webitel/api-services/enums';
import { getDefaultsFromZodSchema } from '@webitel/api-services/utils';
import {
	caseCloseFieldsChecks,
	caseSchema,
	queueSchema,
	resourceSchema,
} from '@webitel/api-services/validations';
import { describe, expect, it } from 'vitest';
import { effectScope, nextTick, ref } from 'vue';

/**
 * A card whose required-ness comes from a root `superRefine` — the queue, whose
 * rules depend on `type` — has to surface those issues on the field the issue
 * names. If it does not, `useCardSaveAction` aborts on `$validate()` while
 * `r$.$error` stays false, so the button looks enabled and the click does
 * nothing at all.
 *
 * The trap is a field seeded as `{}`: regle then files the issue under an index
 * of a collection nobody reads. Seeding `undefined` keeps the `$fields` entry
 * and the error.
 *
 * [WTEL-10140](https://webitel.atlassian.net/browse/WTEL-10140)
 */
describe('card validation of a root-level required rule', () => {
	const validateDraft = async (draft: Record<string, unknown>) => {
		const state = ref(draft);
		const scope = effectScope(true);
		// biome-ignore lint/suspicious/noExplicitAny: regle's inferred state type
		let r$: any;

		scope.run(() => {
			({ r$ } = useRegleSchema(state, queueSchema as never));
		});

		const result = await r$.$validate();

		return {
			valid: result.valid,
			rootError: r$.$error,
			calendarErrors: r$.$fields?.calendar?.$errors,
		};
	};

	it('reports the missing calendar of a preview dialer on the field', async () => {
		const { valid, rootError, calendarErrors } = await validateDraft({
			...getQueueDefaults(QueueType.PREVIEW_DIALER),
			name: 'a preview dialer',
		});

		expect(valid).toBe(false);
		// what keeps the save button from looking clickable
		expect(rootError).toBe(true);
		// what the calendar select renders
		expect(calendarErrors).toHaveLength(1);
	});

	it.each([
		QueueType.OUTBOUND_IVR_QUEUE,
		QueueType.OUTBOUND_JOB_QUEUE,
	])('reports a cleared calendar and schema of queue type %s on the fields', async (type) => {
		const state = ref({
			...getQueueDefaults(type),
			name: 'a queue',
			calendar: {},
			schema: {},
		});
		const scope = effectScope(true);
		// biome-ignore lint/suspicious/noExplicitAny: regle's inferred state type
		let r$: any;

		scope.run(() => {
			({ r$ } = useRegleSchema(state, queueSchema as never));
		});

		const result = await r$.$validate();

		expect(result.valid).toBe(false);
		expect(r$.$error).toBe(true);
		expect(r$.$fields.calendar.$error).toBe(true);
		expect(r$.$fields.calendar.$errors.id).toHaveLength(1);
		expect(r$.$fields.schema.$error).toBe(true);
		expect(r$.$fields.schema.$errors.id).toHaveLength(1);
	});

	it('accepts the same draft once the calendar is filled', async () => {
		const { valid, rootError } = await validateDraft({
			...getQueueDefaults(QueueType.PREVIEW_DIALER),
			name: 'a preview dialer',
			calendar: {
				id: '1',
				name: '24/7',
			},
		});

		expect(valid).toBe(true);
		expect(rootError).toBe(false);
	});
});

describe('card validation of the close reason on a new final case', () => {
	const caseCardSchema = caseSchema
		.passthrough()
		.check(...caseCloseFieldsChecks);

	it('reports the missing close reason on the field', async () => {
		const state = ref(getDefaultsFromZodSchema(caseCardSchema, {}) as never);
		const scope = effectScope(true);
		// biome-ignore lint/suspicious/noExplicitAny: regle's inferred state type
		let r$: any;

		scope.run(() => {
			({ r$ } = useRegleSchema(state, caseCardSchema as never, {
				autoDirty: true,
				syncState: {
					onValidate: true,
				},
			}));
		});
		await nextTick();

		(state.value as Record<string, unknown>).statusCondition = {
			id: '1',
			final: true,
		};
		await nextTick();

		const result = await r$.$validate();

		expect(result.valid).toBe(false);
		expect(r$.$fields.closeReason.$error).toBe(true);
		expect(r$.$fields.closeReason.$errors).toHaveLength(1);
		expect(r$.$fields.closeResult.$error).toBe(true);
	});
});

/**
 * [Claude] A required lookup cleared by the select becomes `{}`. regle builds a
 * nested status for it, so the required issue has to land on `id` — otherwise
 * the field shows no error and save stays enabled.
 *
 * [WTEL-10632](https://webitel.atlassian.net/browse/WTEL-10632)
 */
describe('card validation of a cleared required lookup', () => {
	it('reports a cleared resource gateway on the field', async () => {
		const state = ref({
			...getDefaultsFromZodSchema(resourceSchema, {}),
			name: 'a resource',
			gateway: {},
		});
		const scope = effectScope(true);
		// biome-ignore lint/suspicious/noExplicitAny: regle's inferred state type
		let r$: any;

		scope.run(() => {
			({ r$ } = useRegleSchema(state, resourceSchema as never));
		});

		const result = await r$.$validate();

		expect(result.valid).toBe(false);
		expect(r$.$error).toBe(true);
		expect(r$.$fields.gateway.$error).toBe(true);
		expect(r$.$fields.gateway.$errors.id).toHaveLength(1);
	});
});
