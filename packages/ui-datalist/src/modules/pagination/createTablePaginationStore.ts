import { ref } from 'vue';

import { createDatalistStore } from '../_shared/createDatalistStore';
import type { PersistedStorageController } from '../persist/PersistedStorage.types';
import { usePersistedStorage } from '../persist/usePersistedStorage';
import type { Identifiable } from '../types/createDatalistStore.types';
import type { useTableStoreConfig } from '../types/tableStore.types';

export const tablePaginationStoreBody = () => {
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

	/*
   kept to republish state into the route query on registry re-mount,
    see syncPersistence()
   */
	let persistedStorageControllers: PersistedStorageController[] = [];

	const setupPersistence = () => {
		const pageStorage = usePersistedStorage({
			name: 'page',
			value: page,
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

	/*
   sequentially, because every route storage write is a router.replace()
    built on top of the current route query
   */
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
		storeBody: tablePaginationStoreBody,
		namespace: id,
		config,
	});
};
