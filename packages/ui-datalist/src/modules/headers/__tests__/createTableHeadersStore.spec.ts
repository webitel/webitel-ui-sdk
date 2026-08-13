import { beforeEach, describe, expect, it } from 'vitest';
import { createApp, ref } from 'vue';
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

	it('asks for a field once when several columns render from it', () => {
		const store = tableHeadersStoreBody({
			rawHeaders: [
				{
					field: 'grantee',
					show: true,
					sort: null,
				},
				{
					field: 'granted',
					show: true,
					sort: null,
				},
				{
					field: 'granted',
					show: true,
					sort: null,
				},
			] as DatalistTableHeader[],
			id,
		});

		expect(store.fields.value).toEqual([
			'grantee',
			'granted',
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

	describe('access', () => {
		const createGatedStore = (gated: DatalistTableHeader[]) =>
			tableHeadersStoreBody({
				rawHeaders: [
					...rawHeaders.map((header) => ({
						...header,
					})),
					...gated,
				],
				id,
			});

		it('drops a denied header from headers, shownHeaders and fields', () => {
			const store = createGatedStore([
				{
					field: 'agent',
					show: true,
					sort: null,
					access: () => false,
				} as DatalistTableHeader,
			]);

			expect(store.headers.value.map(({ field }) => field)).not.toContain(
				'agent',
			);
			expect(store.shownHeaders.value.map(({ field }) => field)).not.toContain(
				'agent',
			);
			expect(store.fields.value).not.toContain('agent');
		});

		it('keeps a granted header and leaves ungated headers untouched', () => {
			const store = createGatedStore([
				{
					field: 'agent',
					show: true,
					sort: null,
					access: () => true,
				} as DatalistTableHeader,
			]);

			expect(store.fields.value).toEqual([
				'name',
				'subject',
				'agent',
			]);
		});

		it('unwraps a ref returned by the access gate', () => {
			const store = createGatedStore([
				{
					field: 'agent',
					show: true,
					sort: null,
					access: () => ref(false),
				} as DatalistTableHeader,
			]);

			expect(store.fields.value).toEqual([
				'name',
				'subject',
			]);
		});

		it('does not resurrect a denied header from the persisted fields', async () => {
			await router.push({
				name: 'cases',
				query: {
					fields: 'agent,createdAt',
				},
			});

			const store = createGatedStore([
				{
					field: 'agent',
					show: true,
					sort: null,
					access: () => false,
				} as DatalistTableHeader,
			]);
			await runWithRouter(() => store.setupPersistence());

			expect(store.fields.value).toEqual([
				'createdAt',
			]);
			expect(store.headers.value.map(({ field }) => field)).not.toContain(
				'agent',
			);
		});

		it('does not resurrect a denied header on reset', () => {
			const store = createGatedStore([
				{
					field: 'agent',
					show: true,
					sort: null,
					access: () => false,
				} as DatalistTableHeader,
			]);

			store.$reset();

			expect(store.headers.value.map(({ field }) => field)).not.toContain(
				'agent',
			);
		});

		it('keeps a field alive while another allowed header still claims it', async () => {
			await router.push({
				name: 'cases',
				query: {
					fields: 'member',
				},
			});

			/* `member` and `memberId` share one API field — only one is gated */
			const store = createGatedStore([
				{
					value: 'member',
					field: 'member',
					show: true,
					sort: null,
				} as DatalistTableHeader,
				{
					value: 'memberId',
					field: 'member',
					show: false,
					sort: null,
					access: () => false,
				} as DatalistTableHeader,
			]);
			await runWithRouter(() => store.setupPersistence());

			expect(store.headers.value.map(({ value }) => value)).toContain('member');
			expect(store.headers.value.map(({ value }) => value)).not.toContain(
				'memberId',
			);
			expect(store.fields.value).toEqual([
				'member',
			]);
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
