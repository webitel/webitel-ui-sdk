import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createReactiveNowStore } from '../ReactiveNowStore';

describe('createReactiveNowStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('ticks now every second once started', () => {
		const useNowStore = createReactiveNowStore();
		const store = useNowStore();

		const initial = store.now;
		store.startWatcher();

		vi.advanceTimersByTime(3000);

		expect(store.now).toBeGreaterThan(initial);
	});

	it('stops ticking once stopped', () => {
		const useNowStore = createReactiveNowStore();
		const store = useNowStore();

		store.startWatcher();
		store.stopWatcher();

		const afterStop = store.now;
		vi.advanceTimersByTime(3000);

		expect(store.now).toBe(afterStop);
	});

	it('does not stack intervals when started twice', () => {
		const useNowStore = createReactiveNowStore();
		const store = useNowStore();

		store.startWatcher();
		store.startWatcher();

		const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');
		store.startWatcher();

		expect(setIntervalSpy).not.toHaveBeenCalled();
	});
});
