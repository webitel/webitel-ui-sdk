import { getQueueDefaults } from '@webitel/api-services/api';
import { QueueType } from '@webitel/api-services/enums';
import { queueSchema } from '@webitel/api-services/validations';
import { describe, expect, it } from 'vitest';

import { nestedObjectSelfErrorsFromZod } from '../nestedObjectSchemaErrors';

describe('nestedObjectSelfErrorsFromZod', () => {
	it('maps a required empty-object lookup onto $self', () => {
		const errors = nestedObjectSelfErrorsFromZod(queueSchema, {
			...getQueueDefaults(QueueType.PREVIEW_DIALER),
			name: 'a preview dialer',
			calendar: {},
		});

		expect(errors.calendar?.$self).toHaveLength(1);
	});

	it('leaves an optional empty-object lookup alone', () => {
		const errors = nestedObjectSelfErrorsFromZod(queueSchema, {
			...getQueueDefaults(QueueType.INBOUND_QUEUE),
			name: 'an inbound queue',
			calendar: {},
		});

		expect(errors).toEqual({});
	});

	it('ignores a missing lookup (undefined) — Regle already surfaces that', () => {
		const errors = nestedObjectSelfErrorsFromZod(queueSchema, {
			...getQueueDefaults(QueueType.PREVIEW_DIALER),
			name: 'a preview dialer',
			calendar: undefined,
		});

		expect(errors).toEqual({});
	});
});
