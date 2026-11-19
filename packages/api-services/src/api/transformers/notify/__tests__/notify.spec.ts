import { AxiosError, type AxiosResponse } from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createI18n } from 'vue-i18n';

import { config, setConfig } from '../../../../config/config';
import notify from '../notify.transformer';

// [Claude] https://webitel.atlassian.net/browse/WTEL-11052
describe('notify', () => {
	const $emit = vi.fn();

	beforeEach(() => {
		config.eventBus = {
			$emit,
		};
	});

	afterEach(() => {
		config.eventBus = null;
		config.i18n = null;
		$emit.mockReset();
	});

	it('shows a localized connection error instead of the raw network error', () => {
		setConfig({
			i18n: createI18n({
				legacy: false,
				locale: 'uk',
				messages: {},
			}),
		});

		notify(new AxiosError('Network Error', AxiosError.ERR_NETWORK));

		expect($emit).toHaveBeenCalledWith('notification', {
			type: 'error',
			text: 'Помилка з’єднання',
		});
	});

	it('falls back to english connection error without i18n', () => {
		notify(new AxiosError('Network Error', AxiosError.ERR_NETWORK));

		expect($emit).toHaveBeenCalledWith('notification', {
			type: 'error',
			text: 'Connection error',
		});
	});

	it('keeps the server message when there is a response', () => {
		const error = new AxiosError('Request failed', 'ERR_BAD_REQUEST');
		error.response = {
			data: {
				detail: 'user already exists',
			},
		} as AxiosResponse;

		notify(error);

		expect($emit).toHaveBeenCalledWith('notification', {
			type: 'error',
			text: 'user already exists',
		});
	});
});
