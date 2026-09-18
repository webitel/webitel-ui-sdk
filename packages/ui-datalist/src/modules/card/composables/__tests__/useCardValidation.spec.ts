import { useRegleSchema } from '@regle/schemas';
import { getQueueDefaults } from '@webitel/api-services/api';
import { QueueType } from '@webitel/api-services/enums';
import { queueSchema } from '@webitel/api-services/validations';
import { describe, expect, it } from 'vitest';
import { effectScope, ref } from 'vue';

import { nestedObjectSelfErrorsFromZod } from '../../utils/nestedObjectSchemaErrors';

/**
 * A card whose required-ness comes from a root `superRefine` — the queue, whose
 * rules depend on `type` — has to surface those issues on the field the issue
 * names. If it does not, `useCardSaveAction` aborts on `$validate()` while
 * `r$.$error` stays false, so the button looks enabled and the click does
 * nothing at all.
 *
 * The trap is a field seeded as `{}`: Regle treats any object value as nested
 * (`$fields`), then misfiles an object-level issue as `{ 0: [] }`. Feeding that
 * issue back under `$self` (see `nestedObjectSelfErrorsFromZod`) keeps `$error`
 * and the field helper text. Seeding `undefined` also works without `$self`.
 *
 * [WTEL-10140](https://webitel.atlassian.net/browse/WTEL-10140)
 * [WTEL-10408](https://webitel.atlassian.net/browse/WTEL-10408)
 */
describe('card validation of a root-level required rule', () => {
	const validateDraft = async (draft: Record<string, unknown>) => {
		const state = ref(draft);
		const externalErrors = ref(
			nestedObjectSelfErrorsFromZod(queueSchema, draft),
		);
		const scope = effectScope(true);
		// biome-ignore lint/suspicious/noExplicitAny: regle's inferred state type
		let r$: any;

		scope.run(() => {
			({ r$ } = useRegleSchema(state, queueSchema as never, {
				externalErrors: externalErrors as never,
			}));
		});

		const result = await r$.$validate();

		return {
			valid: result.valid,
			rootError: r$.$error,
			calendarErrors: r$.$fields?.calendar?.$errors,
			calendarSelfErrors: r$.$fields?.calendar?.$self?.$errors,
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

	it('reports an empty-object calendar on $self so the field stays invalid', async () => {
		const { valid, rootError, calendarSelfErrors } = await validateDraft({
			...getQueueDefaults(QueueType.PREVIEW_DIALER),
			name: 'a preview dialer',
			calendar: {},
		});

		expect(valid).toBe(false);
		expect(rootError).toBe(true);
		expect(calendarSelfErrors).toHaveLength(1);
	});
});
