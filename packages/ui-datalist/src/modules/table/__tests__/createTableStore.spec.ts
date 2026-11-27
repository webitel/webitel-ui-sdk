import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';
import { createMemoryHistory, createRouter, type Router } from 'vue-router';

import type { DatalistTableHeader } from '../../types/tableStore.types';
import { createTableStore } from '../createTableStore.store';

const routes = [
	{
		path: '/cases',
		name: 'cases',
		component: {
			template: '<div />',
		},
	},
];

const headers = [
	{
		value: 'name',
		field: 'name',
		show: true,
		sort: null,
	},
	{
		value: 'subject',
		field: 'subject',
		show: true,
		sort: null,
	},
] as DatalistTableHeader[];

const flush = async () => {
	for (let i = 0; i < 5; i += 1) {
		await new Promise((resolve) => setTimeout(resolve));
	}
};

/*
 `setupStore` runs once per store, and the watchers it depends on must outlive
 every component that renders the table. Registering them from the caller left
 them owned by that component's effect scope, so a card tab that had been
 walked away from came back inert — it loaded once and then ignored sort,
 pagination, page size, column visibility and filters
 ([WTEL-10308](https://webitel.atlassian.net/browse/WTEL-10308), fixed by
 [WTEL-10277](https://webitel.atlassian.net/browse/WTEL-10277)).

 Tables that keep persistence were spared by accident back then: their setup
 awaits the restore, so the watchers landed with no active scope. Both settings
 are covered here, because that difference was invisible until it broke.
 */
describe('tableStoreBody', () => {
	let router: Router;
	let getList: ReturnType<typeof vi.fn>;

	beforeEach(async () => {
		localStorage.clear();
		sessionStorage.clear();
		setActivePinia(createPinia());

		router = createRouter({
			history: createMemoryHistory(),
			routes,
		});
		await router.push('/cases');
		await router.isReady();

		getList = vi.fn().mockResolvedValue({
			items: [],
			next: false,
		});
	});

	/*
   a tab on a card page: the table component is unmounted and mounted back as
   the user walks the tabs, and the store outlives all of it
   */
	const mountTab = (useStore: ReturnType<typeof createTableStore>) => {
		const Tab = defineComponent({
			setup() {
				const store = useStore();
				/* a nested list is initialized with the card's id */
				store.initialize({
					parentId: '42',
				});
				return () => h('div');
			},
		});

		return mount(Tab, {
			global: {
				plugins: [
					router,
				],
			},
		});
	};

	describe.each([
		[
			'with persistence',
			false,
		],
		[
			'without persistence',
			true,
		],
	])('%s', (_label, disablePersistence) => {
		let useStore: ReturnType<typeof createTableStore>;

		beforeEach(async () => {
			useStore = createTableStore(`cases-${disablePersistence}/datalist`, {
				apiModule: {
					getList,
				},
				headers,
				disablePersistence,
			});

			const first = mountTab(useStore);
			await flush();
			first.unmount();
			await flush();

			mountTab(useStore);
			await flush();

			getList.mockClear();
		});

		it('reloads on sort after the component is remounted', async () => {
			const store = useStore();

			store.updateSort(store.headers[0]);
			await flush();

			expect(getList).toHaveBeenCalled();
		});

		it('reloads on size change after the component is remounted', async () => {
			const store = useStore();

			store.updateSize(20);
			await flush();

			expect(getList).toHaveBeenCalled();
		});

		it('reloads on page change after the component is remounted', async () => {
			const store = useStore();

			store.updatePage(2);
			await flush();

			expect(getList).toHaveBeenCalled();
		});

		it('reloads on search after the component is remounted', async () => {
			const store = useStore();

			store.addFilter({
				name: 'search',
				value: 'lorem',
			});
			await flush();

			expect(getList).toHaveBeenCalled();
		});

		it('reloads on a hidden column after the component is remounted', async () => {
			const store = useStore();

			store.updateShownHeaders(
				store.headers.map((header, index) => ({
					...header,
					show: index === 0,
				})),
			);
			await flush();

			expect(getList).toHaveBeenCalled();
		});
	});
	/*
   A nested list is emptied by the card store it is registered with, and until
   it has a parent again it must not load: the store keeps the parent it was
   initialized with, so a reload in between queried the previous card's record.

   [WTEL-10350](https://webitel.atlassian.net/browse/WTEL-10350)
  */
	describe('$reset of a nested list', () => {
		let useStore: ReturnType<typeof createTableStore>;

		beforeEach(async () => {
			useStore = createTableStore('cases-reset/datalist', {
				apiModule: {
					getList,
				},
				headers,
				disablePersistence: true,
			});

			mountTab(useStore);
			await flush();
			getList.mockClear();
		});

		it('drops the rows, the parent and the pagination', async () => {
			const store = useStore();
			store.updatePage(3);
			await flush();

			store.$reset();

			expect(store.dataList).toEqual([]);
			expect(store.selected).toEqual([]);
			expect(store.error).toBeNull();
			expect(store.page).toBe(1);
		});

		it('keeps the headers, which are the user column choice', async () => {
			const store = useStore();
			store.updateShownHeaders(
				store.headers.map((header, index) => ({
					...header,
					show: index === 0,
				})),
			);
			await flush();
			const shown = store.headers.map((header) => header.show);

			store.$reset();

			expect(store.headers.map((header) => header.show)).toEqual(shown);
		});

		it('loads nothing until it has a parent again', async () => {
			const store = useStore();
			store.$reset();
			getList.mockClear();

			await store.loadDataList();
			store.updatePage(2);
			await flush();

			expect(getList).not.toHaveBeenCalled();

			store.initialize({
				parentId: '43',
			});
			await flush();

			expect(getList).toHaveBeenCalledWith(
				expect.objectContaining({
					parentId: '43',
				}),
			);
		});
	});

	/*
	 An endpoint may answer with sibling data alongside `items` — e.g. per-page
	 totals for a footer row — which has no home on the store otherwise;
	 without this, a table needing it had to bolt a bespoke wrapper onto
	 `createTableStore` just to surface one extra reactive field.
	 */
	describe('aggs', () => {
		let useStore: ReturnType<typeof createTableStore>;

		beforeEach(async () => {
			getList.mockResolvedValue({
				items: [],
				next: false,
				aggs: {
					total: 3,
				},
			});

			useStore = createTableStore('cases-aggs/datalist', {
				apiModule: {
					getList,
				},
				headers,
				disablePersistence: true,
			});

			mountTab(useStore);
			await flush();
		});

		it('picks up aggs from the getList response', () => {
			const store = useStore();

			expect(store.aggs).toEqual({
				total: 3,
			});
		});

		it('stays undefined when the response has none', async () => {
			getList.mockResolvedValue({
				items: [],
				next: false,
			});

			const store = useStore();
			await store.loadDataList();

			expect(store.aggs).toBeUndefined();
		});

		it('drops on $reset', () => {
			const store = useStore();

			store.$reset();

			expect(store.aggs).toBeUndefined();
		});
	});

	/*
	 An appended list holds the rows of pages 1..N. Coming back to it (another
	 tab and back, or a reload) loaded page N alone, so page N's rows came on
	 top, as if the order changed every time.

	 [WS-169](https://webitel.atlassian.net/browse/WS-169),
	 [WS-187](https://webitel.atlassian.net/browse/WS-187)
	 */
	describe('an appended list', () => {
		/* a registry page: no parent, and the table is mounted back on return */
		const mountPage = (useStore: ReturnType<typeof createTableStore>) => {
			const Page = defineComponent({
				setup() {
					useStore().initialize();
					return () => h('div');
				},
			});

			return mount(Page, {
				global: {
					plugins: [
						router,
					],
				},
			});
		};

		let useStore: ReturnType<typeof createTableStore>;

		beforeEach(() => {
			getList.mockImplementation(async ({ page }) => ({
				items: [
					{
						id: `row-of-page-${page}`,
					},
				],
				next: true,
			}));

			useStore = createTableStore('cases-append/datalist', {
				apiModule: {
					getList,
				},
				headers,
				isAppendDataList: true,
			});
		});

		it('starts from the first page when the list is opened again', async () => {
			const first = mountPage(useStore);
			await flush();
			const store = useStore();
			await store.appendToDataList();
			await store.appendToDataList();
			await flush();
			first.unmount();
			getList.mockClear();

			mountPage(useStore);
			await flush();

			expect(getList).toHaveBeenCalledTimes(1);
			expect(getList).toHaveBeenCalledWith(
				expect.objectContaining({
					page: 1,
				}),
			);
			expect(store.page).toBe(1);
			expect(store.dataList).toEqual([
				{
					id: 'row-of-page-1',
				},
			]);
		});

		it('keeps the page out of the route query while appending', async () => {
			mountPage(useStore);
			await flush();

			await useStore().appendToDataList();
			await flush();

			expect(router.currentRoute.value.query.page).toBeUndefined();
		});

		it('starts from the first page with a page left in the route query', async () => {
			await router.push({
				name: 'cases',
				query: {
					page: '3',
				},
			});

			mountPage(useStore);
			await flush();

			expect(getList).toHaveBeenCalledWith(
				expect.objectContaining({
					page: 1,
				}),
			);
			expect(router.currentRoute.value.query.page).toBeUndefined();
		});
	});

	describe('a paginated list', () => {
		it('still restores the page from the route query', async () => {
			await router.push({
				name: 'cases',
				query: {
					page: '3',
				},
			});
			const useStore = createTableStore('cases-paginated/datalist', {
				apiModule: {
					getList,
				},
				headers,
			});

			const Page = defineComponent({
				setup() {
					useStore().initialize();
					return () => h('div');
				},
			});
			mount(Page, {
				global: {
					plugins: [
						router,
					],
				},
			});
			await flush();

			expect(getList).toHaveBeenCalledWith(
				expect.objectContaining({
					page: 3,
				}),
			);
			expect(router.currentRoute.value.query.page).toBe('3');
		});
	});

	describe('filters persistence of a nested list', () => {
		it('keeps an added filter out of the route query, in sessionStorage instead', async () => {
			const useStore = createTableStore('cases-nested-filters/datalist', {
				apiModule: {
					getList,
				},
				headers,
			});

			mountTab(useStore);
			await flush();

			const store = useStore();
			store.addFilter({
				name: 'search',
				value: 'lorem',
			});
			await flush();

			expect(router.currentRoute.value.query).toEqual({});
			expect(
				sessionStorage.getItem('cases-nested-filters/datalist/filters'),
			).toContain('lorem');
		});
	});
});
