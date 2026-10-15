import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import eventBus from '../eventBus';
import { reloadOnStaleChunk } from '../reloadOnStaleChunk';

describe('reloadOnStaleChunk', () => {
	const reload = vi.fn();
	const originalLocation = window.location;

	beforeEach(() => {
		Object.defineProperty(window, 'location', {
			value: {
				...originalLocation,
				reload,
			},
			writable: true,
		});
		sessionStorage.clear();
		reload.mockClear();
	});

	afterEach(() => {
		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	reloadOnStaleChunk();

	const firePreloadError = () => {
		const event = new Event('vite:preloadError', {
			cancelable: true,
		});
		window.dispatchEvent(event);
		return event;
	};

	it('reloads page and prevents error on stale chunk', () => {
		const event = firePreloadError();
		expect(reload).toHaveBeenCalledTimes(1);
		expect(event.defaultPrevented).toBe(true);
	});

	it('notifies instead of reload if page was just reloaded', () => {
		const emit = vi.spyOn(eventBus, '$emit');
		firePreloadError();
		const event = firePreloadError();
		expect(reload).toHaveBeenCalledTimes(1);
		expect(event.defaultPrevented).toBe(false);
		expect(emit).toHaveBeenCalledWith(
			'notification',
			expect.objectContaining({
				type: 'error',
			}),
		);
	});
});
