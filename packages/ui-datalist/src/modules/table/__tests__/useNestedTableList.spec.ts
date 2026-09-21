import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h, ref } from 'vue';
import { createMemoryHistory, createRouter, type Router } from 'vue-router';

import { provideCardStore } from '../../card/composables/useCardStoreProvider';
import type { CardItemId } from '../../card/types/CardStore.types';
import type { DatalistTableHeader } from '../../types/tableStore.types';
import { useNestedTableList } from '../composables/useNestedTableList';
import { createTableStore } from '../createTableStore.store';

const routes = [
	{
		path: '/queues',
		name: 'queues',
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
] as DatalistTableHeader[];

const flush = async () => {
	for (let i = 0; i < 5; i += 1) {
		await new Promise((resolve) => setTimeout(resolve));
	}
};

/*
 A nested list store is shared by every card of its kind and outlives all of
 them, so a tab that read it directly showed the rows of whichever record was
 opened before — and a card for an unsaved record showed them until saved.

 [WTEL-10350](https://webitel.atlassian.net/browse/WTEL-10350)
 */
describe('useNestedTableList', () => {
	let router: Router;
	let getList: ReturnType<typeof vi.fn>;
	let useStore: ReturnType<typeof createTableStore>;
	let namespace = 0;

	beforeEach(async () => {
		localStorage.clear();
		sessionStorage.clear();
		setActivePinia(createPinia());

		router = createRouter({
			history: createMemoryHistory(),
			routes,
		});
		await router.push('/queues');
		await router.isReady();

		getList = vi.fn().mockImplementation(({ parentId }) =>
			Promise.resolve({
				items: [
					{
						id: 1,
						name: `row of ${parentId}`,
					},
				],
				next: false,
			}),
		);

		namespace += 1;
		useStore = createTableStore(`queue-buckets-${namespace}/datalist`, {
			apiModule: {
				getList,
			},
			headers,
			disablePersistence: true,
		});
	});

	/** a card page with one nested tab in it */
	const openCard = (itemId: CardItemId) => {
		const cardItemId = ref<CardItemId>(itemId);
		const nestedLists = new Set<{
			$reset: () => void;
		}>();

		const Tab = defineComponent({
			setup() {
				useNestedTableList({
					useTableStore: useStore,
				});
				return () => h('div');
			},
		});

		const Card = defineComponent({
			setup() {
				provideCardStore({
					get itemId() {
						return cardItemId.value;
					},
					registerNestedList: (list) => nestedLists.add(list),
				});

				return () => h(Tab);
			},
		});

		const card = mount(Card, {
			global: {
				plugins: [
					router,
				],
			},
		});

		/** what the card page does on unmount */
		const close = () => {
			for (const list of nestedLists) list.$reset();
			nestedLists.clear();
			card.unmount();
		};

		return {
			card,
			close,
			cardItemId,
			nestedLists,
		};
	};

	it('loads the list of the card it is opened in', async () => {
		openCard('42');
		await flush();

		expect(getList).toHaveBeenCalledWith(
			expect.objectContaining({
				parentId: '42',
			}),
		);
		expect(useStore().dataList).toEqual([
			{
				id: 1,
				name: 'row of 42',
			},
		]);
	});

	it('registers itself with the card, which empties it on close', async () => {
		const first = openCard('42');
		await flush();
		expect(first.nestedLists.size).toBe(1);

		first.close();
		await flush();

		expect(useStore().dataList).toEqual([]);
		expect(first.nestedLists.size).toBe(0);
	});

	it('shows no rows of the previously opened card', async () => {
		const first = openCard('42');
		await flush();
		first.close();
		await flush();

		getList.mockClear();
		const second = openCard(null); // a record that is not saved yet
		await flush();

		expect(getList).not.toHaveBeenCalled();
		expect(useStore().dataList).toEqual([]);
		second.close();
	});

	it('loads once the unsaved record gets its id', async () => {
		const card = openCard(null);
		await flush();
		expect(getList).not.toHaveBeenCalled();

		card.cardItemId.value = '43';
		await flush();

		expect(getList).toHaveBeenCalledWith(
			expect.objectContaining({
				parentId: '43',
			}),
		);
		expect(useStore().dataList).toEqual([
			{
				id: 1,
				name: 'row of 43',
			},
		]);
	});

	it('does not reload the previous parent when the store reloads itself', async () => {
		const first = openCard('42');
		await flush();
		first.close();
		await flush();

		getList.mockClear();
		const store = useStore();

		// what a pagination change does, with no card to belong to
		store.updatePage(2);
		await flush();

		expect(getList).not.toHaveBeenCalled();
		expect(store.dataList).toEqual([]);
	});
});
