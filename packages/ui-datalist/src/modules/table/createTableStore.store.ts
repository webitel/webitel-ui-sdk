import deepEqual from 'deep-equal';
import set from 'lodash/set';
import { effectScope, type Ref, ref, toRaw, watch } from 'vue';

import {
	createDatalistStore,
	makeThisToRefs,
} from '../_shared/createDatalistStore';
import { createTableFiltersStore } from '../filters/createTableFiltersStore';
import { createTableHeadersStore } from '../headers/createTableHeadersStore';
import { createTablePaginationStore } from '../pagination/createTablePaginationStore';
import type { Identifiable } from '../types/createDatalistStore.types';
import type {
	LoadDataListOptions,
	PatchItemPropertyParams,
	useTableStoreConfig,
} from '../types/tableStore.types';

export const tableStoreBody = <Entity extends Identifiable>(
	namespace: string,
	config: useTableStoreConfig<Entity>,
) => {
	const {
		apiModule,
		headers: rowHeaders,
		disablePersistence,
		storeType,
		isAppendDataList,
	} = config;
	const usePaginationStore = createTablePaginationStore(namespace, config);
	const useHeadersStore = createTableHeadersStore(namespace, config, {
		headers: rowHeaders,
	});
	const useFiltersStore = createTableFiltersStore(namespace, config);

	const parentId = ref();

	const paginationStore = usePaginationStore();
	const { page, size, next } = makeThisToRefs<typeof paginationStore>(
		paginationStore,
		storeType,
	);
	const {
		updatePage,
		updateSize,
		// $reset: $resetPaginationStore,
		$patch: $patchPaginationStore,
		setupPersistence: setupPaginationPersistence,
		syncPersistence: syncPaginationPersistence,
	} = paginationStore;

	const headersStore = useHeadersStore();
	const {
		headers,
		shownHeaders,
		fields,
		sort,
		columnWidths,
		isReorderingColumn,
	} = makeThisToRefs<typeof headersStore>(headersStore, storeType);
	const {
		updateSort,
		columnResize,
		columnReorder,
		updateShownHeaders,
		setupPersistence: setupHeadersPersistence,
		syncPersistence: syncHeadersPersistence,
	} = headersStore;

	const filtersStore = useFiltersStore();
	const {
		filtersManager,
		isRestoring: isFiltersRestoring,
		searchMode,
	} = makeThisToRefs<typeof filtersStore>(filtersStore, storeType);
	const {
		hasFilter,
		addFilter,
		updateFilter,
		deleteFilter,
		setupPersistence: setupFiltersPersistence,
		syncPersistence: syncFiltersPersistence,
		updateSearchMode,
	} = filtersStore;

	/**
	 * @internal
	 * @description
	 * This flag is used to check if the store is set up.
	 * It is used to prevent multiple setup calls.
	 *
	 * @link
	 * https://webitel.atlassian.net/browse/WTEL-7495
	 */
	const isStoreSetUp = ref(false);

	/**
	 * @internal
	 * @description
	 * `setupStore()` (below) is called lazily from `initialize()`, which is
	 * itself invoked from a component's `<script setup>` - so on its first,
	 * guarded-once run, whatever `watch()` it registers would bind to that
	 * calling component's effect scope, not to this (Pinia-singleton) store's.
	 * That component unmounting later (e.g. closing a card) would then silently
	 * stop those watchers for good - filters would stop refetching for every
	 * consumer of this store, not just that one component, for the rest of the
	 * session. A detached scope keeps them tied to the store's own lifetime.
	 */
	const watchersScope = effectScope(true);

	const dataList: Ref<Entity[]> = ref([]);
	const selected: Ref<Entity[]> = ref([]);
	const error = ref<unknown>(null);
	const isLoading = ref(false);

	const updateSelected = (value: Entity[]) => {
		selected.value = value;
	};

	// filtersManager is reactive(), so its values come back as reactive
	// proxies — strip that here so apiModule implementations never have to.
	const toRawFilterValues = (source: Record<string, unknown>) =>
		Object.fromEntries(
			Object.entries(source).map(([key, value]) => [
				key,
				toRaw(value),
			]),
		);

	// Always request `id` (Vuex REQUIRED_FIELDS default) — needed for select/delete/open
	const getLoadDataParams = () => ({
		...toRawFilterValues(filtersManager.value.getAllValues()),
		page: page.value,
		size: size.value,
		sort: sort.value,
		fields: [
			'id',
			...fields.value.filter((field) => field !== 'id'),
		],
		parentId: parentId.value,
	});

	const loadDataList = async ({
		withLoading = true,
	}: LoadDataListOptions = {}) => {
		if (withLoading) {
			isLoading.value = true;
		}

		$patchPaginationStore({
			next: false,
		});

		const params = getLoadDataParams();

		try {
			const { items, next } = await apiModule.getList(params);

			dataList.value = items ?? [];

			/**
			 * @author: @Oleksandr Palonnyi
			 *
			 * [WTEL-8571](https://webitel.atlassian.net/browse/WTEL-8571)
			 *
			 * link to refactor task - https://webitel.atlassian.net/browse/WTEL-8599
			 * */
			updateSelected(filterSelected(items ?? []));

			$patchPaginationStore({
				next,
			});
		} catch (err) {
			error.value = err;
			throw err;
		} finally {
			if (withLoading) {
				isLoading.value = false;
			}
		}
	};

	function filterSelected(items: Entity[]): Entity[] {
		const selectedToRaw = selected.value.map(toRaw);

		return items.filter((item) =>
			selectedToRaw.some((s) => deepEqual(s, item)),
		);
	}

	const appendToDataList = async () => {
		isLoading.value = true;
		$patchPaginationStore({
			next: false,
		});
		updatePage(page.value + 1);

		const params = getLoadDataParams();

		try {
			const { items, next } = await apiModule.getList(params);

			dataList.value.push(...(items ?? []));
			$patchPaginationStore({
				next,
			});
		} catch (err) {
			error.value = err;
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	const patchItemProperty = async ({
		index,
		path,
		value,
	}: PatchItemPropertyParams) => {
		const item = dataList.value[index];
		const changes = {};
		set(changes, path, value);

		try {
			await apiModule.patch?.({
				changes,
				parentId: parentId.value,
				id: item.id,
				etag: item.etag,
			});
			set(item, path, value);
		} catch (err) {
			await loadDataList();
			throw err;
		}
	};

	const deleteEls = async (_els: Entity[]) => {
		const els = Array.isArray(_els)
			? _els
			: [
					_els,
				];
		const deleteEl = (el: Entity) => {
			return apiModule.delete?.({
				id: el.id,
				etag: el.etag,
				parentId: parentId.value,
			});
		};

		try {
			await Promise.all(els.map(deleteEl));
		} finally {
			// If we're deleting all items from the current page, and we're not on the first page,
			// we should go to the previous page
			if (els.length === dataList.value.length && page.value > 1) {
				updatePage(page.value - 1);
			}
			await loadDataList();
		}
	};

	const setupStore = async () => {
		if (isStoreSetUp.value) {
			return;
		}

		if (!disablePersistence) {
			await Promise.allSettled([
				setupPaginationPersistence(),
				setupFiltersPersistence(),
				setupHeadersPersistence(),
			]);
		}

		let loadingAfterFiltersChange = false;

		watchersScope.run(() => {
			watch(
				[
					() => filtersManager.value.getAllValues(),
					sort,
					fields,
					size,
				],
				async () => {
					/*
					 * @author @Lera24
					 * https://webitel.atlassian.net/browse/WTEL-7597?focusedCommentId=697115
					 * */
					if (isReorderingColumn.value) {
						return;
					}
					loadingAfterFiltersChange = true;
					updatePage(1);
					await loadDataList();
					loadingAfterFiltersChange = false;
				},
				/* filtersManager requires deep watching for its values */
				{
					deep: true,
				},
			);

			watch(
				[
					page,
				],
				() => {
					if (!loadingAfterFiltersChange && !isAppendDataList) {
						return loadDataList();
					}
				},
			);
		});

		isStoreSetUp.value = true;
	};

	/**
	 * @description
	 * Republishes the current store state into the storages that hold nothing
	 * for it – in practice, into the route query.
	 *
	 * Persistence is restored only once per app lifetime (see `setupStore`),
	 * and afterwards the query is written by watchers only, i.e. on change.
	 * So a registry re-opened with state still in memory (closing a card back to
	 * it, or reaching it from the menu) used to render filtered data behind a
	 * bare url, losing filters on reload or on copying the link.
	 *
	 * [WTEL-10093](https://webitel.atlassian.net/browse/WTEL-10093)
	 */
	const syncPersistence = async () => {
		await syncPaginationPersistence();
		await syncFiltersPersistence();
		await syncHeadersPersistence();
	};

	const initialize = async ({
		parentId: storeParentId,
	}: {
		parentId?: string | number;
	} = {}) => {
		if (storeParentId) {
			parentId.value = storeParentId;
		}

		const isStoreAlreadySetUp = isStoreSetUp.value;

		await setupStore();

		/*
     on the first setup the restore path is authoritative.

     a store initialized with a parentId is a list nested in a card page, not a
      registry: it shares the query param names with the registry stores, and
      the url it would publish into is the card one – so it keeps writing on
      change only, and syncs merely on demand
     */
		if (isStoreAlreadySetUp && !disablePersistence && !storeParentId) {
			await syncPersistence();
		}

		return loadDataList();
	};

	const resetInfiniteScrollTableParamsToDefaults = () => {
		paginationStore.$reset();
		filtersManager.value.reset();
		headersStore.$reset();
	};

	return {
		isStoreSetUp, // internal export for pinia devtools

		dataList,
		selected,
		error,
		isLoading,

		page,
		size,
		next,

		headers,
		shownHeaders,
		fields,
		sort,
		columnWidths,
		searchMode,

		filtersManager,
		isFiltersRestoring,

		setupStore, // only setup, no data loading
		initialize, // setup + load data
		syncPersistence, // republish store state into the route query

		loadDataList,
		appendToDataList,

		updateSelected,
		patchItemProperty,
		deleteEls,

		resetInfiniteScrollTableParamsToDefaults,

		updateSearchMode,

		updatePage,
		updateSize,

		updateSort,
		columnResize,
		columnReorder,
		updateShownHeaders,

		hasFilter,
		addFilter,
		updateFilter,
		deleteFilter,
	};
};

export const createTableStore = <Entity extends Identifiable>(
	namespace: string,
	config: useTableStoreConfig<Entity>,
) => {
	return createDatalistStore({
		storeBody: () => tableStoreBody(namespace, config),
		namespace,
		config,
	});
};
