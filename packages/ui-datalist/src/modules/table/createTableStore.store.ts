import set from 'lodash/fp/set';
import { type Ref, ref, watch } from 'vue';

import {
  createDatalistStore,
  makeThisToRefs,
} from '../_shared/createDatalistStore';
import { createTableFiltersStore } from '../filters/createTableFiltersStore';
import { createTableHeadersStore } from '../headers/createTableHeadersStore';
import { createTablePaginationStore } from '../pagination/createTablePaginationStore';
import {
  PatchItemPropertyParams,
  useTableStoreConfig,
} from '../types/tableStore.types';

export const tableStoreBody = <Entity extends { id: string; etag?: string }>(
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
  } = paginationStore;

  const headersStore = useHeadersStore();
  const { headers, shownHeaders, fields, sort } = makeThisToRefs<
    typeof headersStore
  >(headersStore, storeType);
  const {
    updateSort,
    columnResize,
    columnReorder,
    updateShownHeaders,
    setupPersistence: setupHeadersPersistence,
  } = headersStore;

  const filtersStore = useFiltersStore();
  const { filtersManager, isRestoring: isFiltersRestoring } = makeThisToRefs<
    typeof filtersStore
  >(filtersStore, storeType);
  const {
    hasFilter,
    addFilter,
    updateFilter,
    deleteFilter,
    setupPersistence: setupFiltersPersistence,
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

  const dataList: Ref<Entity[]> = ref([]);
  const selected: Ref<Entity[]> = ref([]);
  const error = ref(null);
  const isLoading = ref(false);

  const updateSelected = (value: Entity[]) => {
    selected.value = value;
  };

  const getLoadDataParams = () => ({
    ...filtersManager.value.getAllValues(),
    page: page.value,
    size: size.value,
    sort: sort.value,
    fields: fields.value,
    parentId: parentId.value,
  });

  const loadDataList = async () => {
    isLoading.value = true;
    $patchPaginationStore({ next: false });

    const params = getLoadDataParams();

    try {
      const { items, next } = await apiModule.getList(params);

      dataList.value = items;
      updateSelected([]);
      $patchPaginationStore({ next });
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const appendToDataList = async () => {
    isLoading.value = true;
    $patchPaginationStore({ next: false });
    updatePage(page.value + 1);

    const params = getLoadDataParams();

    try {
      const { items, next } = await apiModule.getList(params);

      dataList.value.push(...items);
      $patchPaginationStore({ next });
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
    set(path, value, changes);

    try {
      await apiModule.patch({
        changes,
        parentId: parentId.value,
        id: item.id,
        etag: item.etag,
      });
      set(path, value, item);
    } catch (err) {
      await loadDataList();
      throw err;
    }
  };

  const deleteEls = async (_els: Entity[]) => {
    const els = Array.isArray(_els) ? _els : [_els];
    const deleteEl = (el: Entity) => {
      return apiModule.delete({
        id: el.id,
        etag: el.etag,
        parentId: parentId.value,
      });
    };

    try {
      await Promise.all(els.map(deleteEl));
    } finally {
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

    watch(
      [() => filtersManager.value.getAllValues(), sort, fields, size],
      async () => {
        loadingAfterFiltersChange = true;
        updatePage(1);
        await loadDataList();
        loadingAfterFiltersChange = false;
      },
      /* filtersManager requires deep watching for its values */
      { deep: true },
    );

    watch([page], () => {
      if (!loadingAfterFiltersChange && !isAppendDataList) {
        return loadDataList();
      }
    });

    isStoreSetUp.value = true;
  };

  const initialize = async ({
    parentId: storeParentId,
  }: { parentId?: string | number } = {}) => {
    if (storeParentId) {
      parentId.value = storeParentId;
    }

    await setupStore();

    return loadDataList();
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

    filtersManager,
    isFiltersRestoring,

    setupStore, // only setup, no data loading
    initialize, // setup + load data

    loadDataList,
    appendToDataList,

    updateSelected,
    patchItemProperty,
    deleteEls,

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

export const createTableStore = <Entity extends { id: string; etag?: string }>(
  namespace: string,
  config: useTableStoreConfig<Entity>,
) => {
  return createDatalistStore({
    storeBody: () => tableStoreBody(namespace, config),
    namespace,
    config,
  });
};
