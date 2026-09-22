import { set } from 'lodash-es';
import {
	computed,
	nextTick,
	type Ref,
	ref,
	shallowRef,
	toRaw,
	watch,
} from 'vue';

import {
	createDatalistStore,
	makeThisToRefs,
} from '../_shared/createDatalistStore';
import type { FilterName } from '../filters';
import { createTableFiltersStore } from '../filters/createTableFiltersStore';
import { createTableHeadersStore } from '../headers/createTableHeadersStore';
import { createTablePaginationStore } from '../pagination/createTablePaginationStore';
import type { Identifiable } from '../types/createDatalistStore.types';
import type {
	DatalistTableHeader,
	LoadDataListOptions,
	PatchItemPropertyParams,
	useTableStoreConfig,
} from '../types/tableStore.types';

const getFilterName = (
	filter: DatalistTableHeader['filter'],
): FilterName | undefined =>
	typeof filter === 'object' ? filter?.name : filter;

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
	/**
	 * A list initialized with a `parentId` is nested in a card page, and stays
	 * nested for the store's lifetime — the api module addresses its parent.
	 * `parentId` is dropped on `$reset`, this is not: it is what tells a reset
	 * store apart from a registry one that never had a parent.
	 */
	const isNested = ref(false);

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
		headers: rawHeaders,
		shownHeaders: rawShownHeaders,
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

	const withFilteredFlag = (list: DatalistTableHeader[]) =>
		list.map((header) => {
			const name = getFilterName(header.filter);
			return name
				? {
						...header,
						filtered: filtersManager.value.hasFilter(name),
					}
				: header;
		});

	const headers = computed(() => withFilteredFlag(rawHeaders.value));
	const shownHeaders = computed(() => withFilteredFlag(rawShownHeaders.value));

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

	const dataList: Ref<Entity[]> = ref([]);
	const error = ref<unknown>(null);
	const isLoading = ref(false);

	const selectedRegistry = shallowRef<Map<Entity['id'], Entity>>(new Map());

	const selected = computed(() =>
		dataList.value.filter((item) => selectedRegistry.value.has(item.id)),
	);

	const selectedAll = computed(() => [
		...selectedRegistry.value.values(),
	]);

	const selectedCount = computed(() => selectedRegistry.value.size);

	const updateSelected = (value: Entity[]) => {
		const nextIds = new Set(value.map(({ id }) => id));
		const updated = new Map(selectedRegistry.value);

		dataList.value.forEach(({ id }) => {
			if (id !== undefined && !nextIds.has(id)) updated.delete(id);
		});
		value.forEach((item) => {
			if (item.id !== undefined) updated.set(item.id, toRaw(item));
		});

		selectedRegistry.value = updated;
	};

	const deselect = (ids: Array<Entity['id']>) => {
		const updated = new Map(selectedRegistry.value);
		ids.forEach((id) => {
			updated.delete(id);
		});
		selectedRegistry.value = updated;
	};

	const clearSelected = () => {
		selectedRegistry.value = new Map();
	};

	const refreshSelectedRegistry = (items: Entity[]) => {
		if (!selectedRegistry.value.size) return;

		const updated = new Map(selectedRegistry.value);
		let hasChanges = false;

		items.forEach((item) => {
			if (item.id !== undefined && updated.has(item.id)) {
				updated.set(item.id, toRaw(item));
				hasChanges = true;
			}
		});

		if (hasChanges) selectedRegistry.value = updated;
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
		/*
     a nested list with no parent has nothing to address: either its card was
     left (the card store reset it) or the record is not saved yet. Loading
     here would query whatever parent the store held before.

     [WTEL-10350](https://webitel.atlassian.net/browse/WTEL-10350)
    */
		if (isNested.value && !parentId.value) return;

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

			refreshSelectedRegistry(items ?? []);

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
			deselect(els.map(({ id }) => id));

			// If we're deleting all items from the current page, and we're not on the first page,
			// we should go to the previous page
			const pageIds = new Set(dataList.value.map(({ id }) => id));
			const deletedFromPage = els.filter(({ id }) => pageIds.has(id));

			if (deletedFromPage.length === dataList.value.length && page.value > 1) {
				updatePage(page.value - 1);
			}
			await loadDataList();
		}
	};

	let loadingAfterFiltersChange = false;

	watch(
		[
			() => filtersManager.value.getAllValues(),
			sort,
			fields,
			size,
		],
		async () => {
			if (!isStoreSetUp.value) {
				return;
			}

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
			if (!isStoreSetUp.value) {
				return;
			}

			if (!loadingAfterFiltersChange && !isAppendDataList) {
				return loadDataList();
			}
		},
	);

	const setupStore = async () => {
		if (isStoreSetUp.value) {
			return;
		}

		if (!disablePersistence) {
			await Promise.allSettled([
				setupPaginationPersistence({
					isNested: isNested.value,
				}),
				setupFiltersPersistence({
					isNested: isNested.value,
				}),
				setupHeadersPersistence({
					isNested: isNested.value,
				}),
			]);
		}

		/*
		 * lets any reactive updates the restore above just made (e.g. to
		 * sort/fields/filters) finish flushing through the watchers above
		 * while `isStoreSetUp` is still false, before they start reacting to
		 * real changes
		 */
		await nextTick();

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
			isNested.value = true;
		}

		const isStoreAlreadySetUp = isStoreSetUp.value;

		await setupStore();

		if (isStoreAlreadySetUp && !disablePersistence && !storeParentId) {
			await syncPersistence();
		}

		return loadDataList();
	};

	/**
	 * Drops everything that belonged to one parent record. Called by the card
	 * store this list is registered with, when the card page goes away.
	 *
	 * Headers are left alone — they are the user's column choice, restored once
	 * per app lifetime — and so is `isStoreSetUp`, for the same reason.
	 */
	const $reset = () => {
		dataList.value = [];
		clearSelected();
		error.value = null;
		isLoading.value = false;
		parentId.value = undefined;

		paginationStore.$reset();
		filtersManager.value.reset();
	};

	const resetInfiniteScrollTableParamsToDefaults = () => {
		paginationStore.$reset();
		filtersManager.value.reset();
		headersStore.$reset();
	};

	return {
		isStoreSetUp, // internal export for pinia devtools
		isNested, // internal export for pinia devtools

		dataList,
		selected,
		selectedAll,
		selectedCount,
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
		$reset, // drop the data and the parent binding
		syncPersistence, // republish store state into the route query

		loadDataList,
		appendToDataList,

		updateSelected,
		clearSelected,
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
