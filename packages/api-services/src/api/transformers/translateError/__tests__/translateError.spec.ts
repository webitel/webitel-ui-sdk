import { afterEach, describe, expect, it } from 'vitest';
import { createI18n } from 'vue-i18n';

import { config, setConfig } from '../../../../config/config';
import translateError from '../translateError.transformer';

const reservedFieldError = () => ({
	response: {
		data: {
			id: 'contacts.search.filters.reserved_field',
			detail:
				"contacts: field 'list' has a reserved name and cannot be used in filters; rename it",
		} as {
			id: string;
			detail: string;
			translation?: string;
		},
	},
});

describe('translateError', () => {
	afterEach(() => {
		config.i18n = null;
	});

	it('translates contacts reserved field error with the field code', () => {
		setConfig({
			i18n: createI18n({
				legacy: false,
				locale: 'uk',
			}),
		});

		expect(translateError(reservedFieldError()).response.data.translation).toBe(
			'Поле "list" має зарезервоване ім\'я. Перейменуйте його в розділі Персоналізація, щоб увімкнути фільтрацію',
		);
	});
});
