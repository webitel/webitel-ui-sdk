import { ref } from 'vue';

import { createDatalistStore } from '../_shared/createDatalistStore';
import {
	type PersistedStorageController,
	PersistedStorageType,
} from '../persist/PersistedStorage.types';
import { usePersistedStorage } from '../persist/usePersistedStorage';
import type { Identifiable } from '../types/createDatalistStore.types';
import type { useTableStoreConfig } from '../types/tableStore.types';

export const tablePaginationStoreBody = (namespace?: string) => {
	const page = ref(1);
	const size = ref(10);
	const next = ref(false);

	const updatePage = (newPage: number) => {
		page.value = newPage;
	};

	const updateSize = (newSize: number) => {
		size.value = newSize;
	};

	const $reset = () => {
		page.value = 1;
		size.value = 10;
		next.value = false;
	};

	let persistedStorageControllers: PersistedStorageController[] = [];

	/*
   a nested list (a card tab) shares its route query param names with the
    registry store of the same kind, so writing page/size into the route on
    every change would pollute/collide with the registry's own url –
    sessionStorage only, namespaced, for those

   [WTEL-10404](https://webitel.atlassian.net/browse/WTEL-10404)
   */
	const setupPersistence = ({
		isNested = false,
	}: {
		isNested?: boolean;
	} = {}) => {
		const pageStorage = usePersistedStorage({
			name: 'page',
			value: page,
			...(isNested && {
				storages: [
					PersistedStorageType.SessionStorage,
				],
				storagePath: namespace,
			}),
			onStore: (save, { name }) => {
				return save({
					name,
					value: `${page.value}`,
				});
			},
			onRestore: async (restore, name) => {
				const value = await restore(name);
				const numValue = Number(value);
				if (numValue) page.value = numValue;
			},
		});

		const sizeStorage = usePersistedStorage({
			name: 'size',
			value: size,
			...(isNested && {
				storages: [
					PersistedStorageType.SessionStorage,
				],
				storagePath: namespace,
			}),
			onStore: (save, { name }) => {
				return save({
					name,
					value: `${size.value}`,
				});
			},
			onRestore: async (restore, name) => {
				const value = await restore(name);
				const numValue = Number(value);
				if (numValue) size.value = numValue;
			},
		});

		persistedStorageControllers = [
			pageStorage,
			sizeStorage,
		];

		return Promise.allSettled([
			pageStorage.restore(),
			sizeStorage.restore(),
		]);
	};

	/* sequentially: every route write is a router.replace() on top of the current query */
	const syncPersistence = async () => {
		for (const controller of persistedStorageControllers) {
			await controller.sync();
		}
	};

	return {
		page,
		size,
		next,

		updatePage,
		updateSize,

		setupPersistence,
		syncPersistence,
		$reset,
	};
};

export const createTablePaginationStore = <Entity extends Identifiable>(
	namespace: string,
	config: useTableStoreConfig<Entity>,
) => {
	const id = `${namespace}/pagination`;
	return createDatalistStore({
		storeBody: () => tablePaginationStoreBody(namespace),
		namespace: id,
		config,
	});
};
