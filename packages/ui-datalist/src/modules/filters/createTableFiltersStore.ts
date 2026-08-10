import { computed, reactive, ref } from 'vue';

import { createDatalistStore } from '../_shared/createDatalistStore';
import {
	type PersistedStorageController,
	PersistedStorageType,
} from '../persist/PersistedStorage.types';
import { usePersistedStorage } from '../persist/usePersistedStorage';
import type { Identifiable } from '../types/createDatalistStore.types';
import type { useTableStoreConfig } from '../types/tableStore.types';
import {
	createFiltersManager,
	type FiltersManagerConfig,
} from './classes/FiltersManager';

export const tableFiltersStoreBody = (
	namespace: string,
	config?: {
		filtersManagerConfig?: FiltersManagerConfig;
	},
) => {
	const filtersManager = reactive(
		createFiltersManager(config?.filtersManagerConfig),
	);

	/* for watchers in filter components */
	const isRestoring = ref(false);

	const searchMode = ref('');

	const updateSearchMode = (newSearch: string) => {
		searchMode.value = newSearch;
	};

	/*
   wrapping filtersManager methods to extend their functionality
   if it will be needed in future
   */
	const hasFilter = filtersManager.hasFilter.bind(filtersManager);
	const addFilter = filtersManager.addFilter.bind(filtersManager);
	const updateFilter = filtersManager.updateFilter.bind(filtersManager);
	const deleteFilter = filtersManager.deleteFilter.bind(filtersManager);

	const filtersList = computed(() => filtersManager.getFiltersList());

	let persistedStorageControllers: PersistedStorageController[] = [];

	const setupPersistence = () => {
		const filtersStorage = usePersistedStorage({
			name: 'filters',

			value: computed(
				() => filtersManager,
			) /* computed is used to provide value as ref(), not reactive() – as per usePersistedStorage interface */,

			storages: [
				PersistedStorageType.Route,
				PersistedStorageType.SessionStorage,
			],
			storagePath: namespace,

			/* use custom .toString() logic, provided by FiltersManager */
			onStore: async (save, { name }) => {
				const snapshotStr = filtersManager.toString();
				return save({
					name,
					value: snapshotStr,
				});
			},

			/* use custom .fromString() logic, provided by FiltersManager */
			onRestore: async (restore, name) => {
				isRestoring.value = true;
				const snapshotStr = await restore(name);
				/*
        snapshot as string because we know that filtersManager.toString() returns string,
         not string[]
         */
				if (snapshotStr) filtersManager.fromString(snapshotStr as string);

				isRestoring.value = false;
			},
		});

		const searchModeStorage = usePersistedStorage({
			name: 'searchMode',
			value: searchMode,
			storages: [
				PersistedStorageType.LocalStorage,
			],
			storagePath: namespace,

			onStore: async (save, { name }) => {
				return save({
					name,
					value: searchMode.value,
				});
			},
			onRestore: async (restore, name) => {
				const value = await restore(name);
				if (value) searchMode.value = value as string;
			},
		});

		persistedStorageControllers = [
			filtersStorage,
			searchModeStorage,
		];

		return Promise.all([
			filtersStorage.restore(),
			searchModeStorage.restore(),
		]);
	};

	/* sequentially: every route write is a router.replace() on top of the current query */
	const syncPersistence = async () => {
		for (const controller of persistedStorageControllers) {
			await controller.sync();
		}
	};

	return {
		filtersManager,
		isRestoring,
		searchMode,

		filtersList,

		hasFilter,
		addFilter,
		updateFilter,
		deleteFilter,

		updateSearchMode,

		setupPersistence,
		syncPersistence,
	};
};

export const createTableFiltersStore = <Entity extends Identifiable>(
	namespace: string,
	config: useTableStoreConfig<Entity> & {
		filtersManagerConfig?: FiltersManagerConfig;
	},
) => {
	const id = `${namespace}/filters`;
	return createDatalistStore({
		storeBody: () => tableFiltersStoreBody(namespace, config),
		config,
		namespace: id,
	});
};
