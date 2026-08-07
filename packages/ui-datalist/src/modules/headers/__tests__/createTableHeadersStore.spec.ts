import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { createMemoryHistory, createRouter, type Router } from 'vue-router';

import type { DatalistTableHeader } from '../../types/tableStore.types';
import { tableHeadersStoreBody } from '../createTableHeadersStore';

const routes = [
	{
		path: '/cases',
		name: 'cases',
		component: {
			template: '<div />',
		},
	},
];

const id = 'cases/headers';

const rawHeaders = [
	{
		field: 'name',
		show: true,
		sort: null,
	},
	{
		field: 'subject',
		show: true,
		sort: null,
	},
	{
		field: 'createdAt',
		show: false,
		sort: null,
	},
] as DatalistTableHeader[];

/* route writes are queued, so several ticks are needed for all of them to land */
const flushWrites = async () => {
	for (let i = 0; i < 5; i += 1) {
		await new Promise((resolve) => setTimeout(resolve));
	}
};

const createStore = () =>
	tableHeadersStoreBody({
		rawHeaders: rawHeaders.map((header) => ({
			...header,
		})),
		id,
	});

describe('tableHeadersStoreBody', () => {
	let router: Router;
	let runWithRouter: <T>(fn: () => T) => T;

	beforeEach(async () => {
		localStorage.clear();

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
		const store = createStore();
		await runWithRouter(() => store.setupPersistence());
		return store;
	};

	it('exposes the shown headers and their fields', () => {
		const store = createStore();

		expect(store.shownHeaders.value.map(({ field }) => field)).toEqual([
			'name',
			'subject',
		]);
		expect(store.fields.value).toEqual([
			'name',
			'subject',
		]);
	});

	it('has no sort by default', () => {
		expect(createStore().sort.value).toBeNull();
	});

	it('encodes the sorted column into a sort query', () => {
		const store = createStore();

		store.updateSort(store.headers.value[0], 'desc');

		expect(store.sort.value).toBe('-name');
	});

	it('collects the widths of resized columns', () => {
		const store = createStore();

		store.columnResize({
			columnName: 'name',
			columnWidth: '100px',
		});

		expect(store.columnWidths.value).toEqual({
			name: '100px',
		});
	});

	describe('persistence', () => {
		it('restores shown fields from the route query', async () => {
			await router.push({
				name: 'cases',
				query: {
					fields: 'createdAt',
				},
			});

			const store = await setUpStore();

			expect(store.fields.value).toEqual([
				'createdAt',
			]);
		});

		it('writes a changed sort into the route query', async () => {
			const store = await setUpStore();

			store.updateSort(store.headers.value[0], 'asc');
			await flushWrites();

			expect(router.currentRoute.value.query.sort).toBe('+name');
		});
	});

	describe('syncPersistence', () => {
		it('publishes a customized column set', async () => {
			const store = await setUpStore();
			store.updateShownHeaders(
				store.headers.value.map((header) => ({
					...header,
					show: header.field === 'name',
				})),
			);
			await flushWrites();
			await router.push('/cases');

			await runWithRouter(() => store.syncPersistence());

			expect(router.currentRoute.value.query.fields).toBe('name');
		});

		it('publishes nothing while the columns are still default', async () => {
			const store = await setUpStore();

			await runWithRouter(() => store.syncPersistence());

			expect(router.currentRoute.value.query).toEqual({});
		});
	});
});
