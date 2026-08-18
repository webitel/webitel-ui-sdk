import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { createMemoryHistory, createRouter, type Router } from 'vue-router';

import { tableFiltersStoreBody } from '../createTableFiltersStore';

const routes = [
	{
		path: '/cases',
		name: 'cases',
		component: {
			template: '<div />',
		},
	},
];

const namespace = 'cases';

describe('tableFiltersStoreBody', () => {
	let router: Router;
	let runWithRouter: <T>(fn: () => T) => T;

	beforeEach(async () => {
		localStorage.clear();
		sessionStorage.clear();

		router = createRouter({
			history: createMemoryHistory(),
			routes,
		});

		const app = createApp({});
		app.use(router);

		await router.push('/cases');
		await router.isReady();

		runWithRouter = (fn) => app.runWithContext(fn);
	});

	const setUpStore = async () => {
		const store = tableFiltersStoreBody(namespace);
		await runWithRouter(() => store.setupPersistence());
		return store;
	};

	it('starts with no filters', () => {
		const store = tableFiltersStoreBody(namespace);

		expect(store.filtersList.value).toEqual([]);
	});

	it('adds, updates and deletes a filter', () => {
		const store = tableFiltersStoreBody(namespace);

		store.addFilter({
			name: 'status',
			value: 'open',
		});
		expect(store.hasFilter('status')).toBe(true);

		store.updateFilter({
			name: 'status',
			value: 'closed',
		});
		expect(store.filtersManager.getFilter('status')?.value).toBe('closed');

		store.deleteFilter({
			name: 'status',
		});
		expect(store.hasFilter('status')).toBe(false);
	});

	it('keeps searchMode', () => {
		const store = tableFiltersStoreBody(namespace);

		store.updateSearchMode('subject');

		expect(store.searchMode.value).toBe('subject');
	});

	describe('persistence', () => {
		it('restores filters from the route query', async () => {
			await router.push({
				name: 'cases',
				query: {
					filters: JSON.stringify({
						status_val: 'open',
					}),
				},
			});

			const store = await setUpStore();

			expect(store.filtersManager.getFilter('status')?.value).toBe('open');
		});

		it('writes an added filter into the route query', async () => {
			const store = await setUpStore();

			store.addFilter({
				name: 'status',
				value: 'open',
			});
			await new Promise((resolve) => setTimeout(resolve));

			expect(router.currentRoute.value.query.filters).toContain('open');
		});

		it('stores filters under the store namespace, not a shared key', async () => {
			const store = await setUpStore();

			store.addFilter({
				name: 'status',
				value: 'open',
			});
			await new Promise((resolve) => setTimeout(resolve));

			expect(sessionStorage.getItem(`${namespace}/filters`)).toContain('open');
			expect(sessionStorage.getItem('/filters')).toBeNull();
		});

		it('keeps searchMode out of the route query', async () => {
			const store = await setUpStore();

			store.updateSearchMode('subject');
			await new Promise((resolve) => setTimeout(resolve));

			expect(router.currentRoute.value.query.searchMode).toBeUndefined();
			expect(localStorage.getItem(`${namespace}/searchMode`)).toBe('subject');
		});
	});

	describe('syncPersistence', () => {
		it('publishes the applied filters', async () => {
			const store = await setUpStore();
			store.addFilter({
				name: 'status',
				value: 'open',
			});
			await new Promise((resolve) => setTimeout(resolve));
			await router.push('/cases');

			await runWithRouter(() => store.syncPersistence());

			expect(router.currentRoute.value.query.filters).toContain('open');
		});

		it('publishes nothing while no filter is applied', async () => {
			const store = await setUpStore();

			await runWithRouter(() => store.syncPersistence());

			expect(router.currentRoute.value.query).toEqual({});
		});
	});
});
