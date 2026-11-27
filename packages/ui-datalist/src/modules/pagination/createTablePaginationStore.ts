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

	const setupPersistence = ({
		isNested = false,
		isAppendDataList = false,
	}: {
		isNested?: boolean;
		isAppendDataList?: boolean;
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

		/*
		 an appended list shows the rows of pages 1..N, and page N alone is not
		 where the user left it – restored, it put page N's rows on top. so the
		 page is not kept, and one left by an old url or session is dropped.

		 [WS-169](https://webitel.atlassian.net/browse/WS-169)
		 */
		if (isAppendDataList) {
			persistedStorageControllers = [
				sizeStorage,
			];

			return Promise.allSettled([
				pageStorage.reset(),
				sizeStorage.restore(),
			]);
		}

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
