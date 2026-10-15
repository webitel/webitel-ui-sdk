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

const requiredNameCardStoreOf = (namespace: string) =>
	createCardStore({
		namespace,
		apiModule: {
			get: vi.fn(() =>
				Promise.resolve({
					id: '1',
					name: '',
				}),
			),
			add: vi.fn(),
			update: vi.fn(),
		},
		standardValidationSchema: z.object({
			name: z.string().min(1),
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

describe('createCardStore validation on initialize', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it('shows the errors of a new card right away', async () => {
		const store = requiredNameCardStoreOf('lookups/new/card')();

		await store.initialize({
			itemId: 'new',
		});

		expect(store.validationSchema.r$.$fields.name.$error).toBe(true);
	});

	it('leaves an existing card untouched', async () => {
		const store = requiredNameCardStoreOf('lookups/existing/card')();

		await store.initialize({
			itemId: '1',
		});

		expect(store.validationSchema.r$.$fields.name.$dirty).toBe(false);
	});
});
