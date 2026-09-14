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
});
