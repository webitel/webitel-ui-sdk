import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { createMemoryHistory, createRouter, type Router } from 'vue-router';

import { tablePaginationStoreBody } from '../createTablePaginationStore';

const routes = [
	{
		path: '/cases',
		name: 'cases',
		component: {
			template: '<div />',
		},
	},
];

describe('tablePaginationStoreBody', () => {
	let router: Router;
	let runWithRouter: <T>(fn: () => T) => T;

	beforeEach(async () => {
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
		const store = tablePaginationStoreBody();
		await runWithRouter(() => store.setupPersistence());
		return store;
	};

	it('starts on the first page with the default size', () => {
		const store = tablePaginationStoreBody();

		expect(store.page.value).toBe(1);
		expect(store.size.value).toBe(10);
	});

	it('updates page and size', () => {
		const store = tablePaginationStoreBody();

		store.updatePage(3);
		store.updateSize(20);

		expect(store.page.value).toBe(3);
		expect(store.size.value).toBe(20);
	});

	it('resets to the defaults', () => {
		const store = tablePaginationStoreBody();
		store.updatePage(3);
		store.updateSize(20);
		store.next.value = true;

		store.$reset();

		expect(store.page.value).toBe(1);
		expect(store.size.value).toBe(10);
		expect(store.next.value).toBe(false);
	});

	describe('persistence', () => {
		it('restores page and size from the route query', async () => {
			await router.push({
				name: 'cases',
				query: {
					page: '3',
					size: '20',
				},
			});

			const store = await setUpStore();

			expect(store.page.value).toBe(3);
			expect(store.size.value).toBe(20);
		});

		it('writes a changed page into the route query', async () => {
			const store = await setUpStore();

			store.updatePage(3);
			await new Promise((resolve) => setTimeout(resolve));

			expect(router.currentRoute.value.query.page).toBe('3');
		});
	});

	describe('syncPersistence', () => {
		it('publishes state the user changed', async () => {
			const store = await setUpStore();
			store.updatePage(3);
			await router.push('/cases');

			await runWithRouter(() => store.syncPersistence());

			expect(router.currentRoute.value.query.page).toBe('3');
		});

		it('publishes nothing while the state is still default', async () => {
			const store = await setUpStore();

			await runWithRouter(() => store.syncPersistence());

			expect(router.currentRoute.value.query).toEqual({});
		});

		it('does not overwrite a value already in the query', async () => {
			const store = await setUpStore();
			store.updatePage(3);
			/* let the watcher settle, so its write cannot land after the push below */
			await new Promise((resolve) => setTimeout(resolve));
			await router.push({
				name: 'cases',
				query: {
					page: '5',
				},
			});

			await runWithRouter(() => store.syncPersistence());

			expect(router.currentRoute.value.query.page).toBe('5');
		});
	});
});
