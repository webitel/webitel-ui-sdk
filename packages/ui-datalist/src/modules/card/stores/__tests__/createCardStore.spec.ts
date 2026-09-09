import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod/v4';

import { createCardStore } from '../createCardStore';

const cardStoreOf = (namespace: string) =>
	createCardStore({
		namespace,
		apiModule: {
			get: vi.fn(),
			add: vi.fn(),
			update: vi.fn(),
		},
		standardValidationSchema: z.object({
			name: z.string().optional(),
		}),
	});

/*
 The lists of a card's nested tabs live in stores shared by every card of their
 kind, so the card that filled them is the one that has to empty them.

 [WTEL-10350](https://webitel.atlassian.net/browse/WTEL-10350)
 */
describe('createCardStore nested lists', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it('empties every registered list on reset', () => {
		const store = cardStoreOf('cases/card')();
		const lists = [
			{
				$reset: vi.fn(),
			},
			{
				$reset: vi.fn(),
			},
		];

		for (const list of lists) store.registerNestedList(list);
		store.$reset();

		for (const list of lists) expect(list.$reset).toHaveBeenCalledOnce();
	});

	it('forgets them, so the next card resets only its own', () => {
		const store = cardStoreOf('contacts/card')();
		const list = {
			$reset: vi.fn(),
		};

		store.registerNestedList(list);
		store.$reset();
		store.$reset();

		expect(list.$reset).toHaveBeenCalledOnce();
	});

	it('registers a list once, however many times its tab is mounted', () => {
		const store = cardStoreOf('queues/card')();
		const list = {
			$reset: vi.fn(),
		};

		store.registerNestedList(list);
		store.registerNestedList(list);
		store.$reset();

		expect(list.$reset).toHaveBeenCalledOnce();
	});
});
