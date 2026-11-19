import { AxiosError, type AxiosResponse } from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { config } from '../../../../config/config';
import { notifyServerError } from '../notify.transformer';

// [Claude] https://webitel.atlassian.net/browse/WTEL-11052
describe('notifyServerError', () => {
	const $emit = vi.fn();

	beforeEach(() => {
		config.eventBus = {
			$emit,
		};
	});

	afterEach(() => {
		config.eventBus = null;
		$emit.mockReset();
	});

	it('stays silent for a network error without a server response', () => {
		const error = new AxiosError('Network Error', AxiosError.ERR_NETWORK);

		expect(notifyServerError(error)).toBe(error);
		expect($emit).not.toHaveBeenCalled();
	});

	it('notifies with the server message when there is a response', () => {
		const error = new AxiosError('Request failed', 'ERR_BAD_REQUEST');
		error.response = {
			data: {
				detail: 'user already exists',
			},
		} as AxiosResponse;

		expect(notifyServerError(error)).toBe(error);
		expect($emit).toHaveBeenCalledWith('notification', {
			type: 'error',
			text: 'user already exists',
		});
	});
});
