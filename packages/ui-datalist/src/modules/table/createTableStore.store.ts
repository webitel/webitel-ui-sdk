import set from 'lodash/fp/set';
import { defineStore, storeToRefs } from 'pinia';
import { type Ref, ref, watch } from 'vue';

import { makeThisToRefs } from '../_shared/createDatalistStore';
import { createTableFiltersStore } from '../filters/createTableFiltersStore';
import { createTableHeadersStore } from '../headers/createTableHeadersStore';
import { createTablePaginationStore } from '../pagination/createTablePaginationStore';
import {
  PatchItemPropertyParams,
  TableStore,
  useTableStoreConfig,
} from '../types/tableStore.types';

export const createTableStore = <Entity extends { id: string; etag?: string }>(
  namespace: string,
  config: useTableStoreConfig<Entity>,
) => {
  const { apiModule, headers, disablePersistence, storeType } = config;
  const usePaginationStore = createTablePaginationStore(namespace, config);
  const useHeadersStore = createTableHeadersStore(namespace, { headers });
  const useFiltersStore = createTableFiltersStore(namespace);

  return defineStore(namespace, (): TableStore<Entity> => {
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
      storePatch: $patchPaginationStore,
      setupPersistence: setupPaginationPersistence,
    } = paginationStore;

    const headersStore = useHeadersStore();
    const { headers, shownHeaders, fields, sort } = storeToRefs(headersStore);
    const {
      updateSort,
      updateShownHeaders,
      setupPersistence: setupHeadersPersistence,
    } = headersStore;

    const filtersStore = useFiltersStore();
    const { filtersManager, isRestoring: isFiltersRestoring } =
      storeToRefs(filtersStore);
    const {
      hasFilter,
      addFilter,
      updateFilter,
      deleteFilter,
      setupPersistence: setupFiltersPersistence,
    } = filtersStore;

    const dataList: Ref<Entity[]> = ref([]);
    const selected: Ref<Entity[]> = ref([]);
    const error = ref(null);
    const isLoading = ref(false);

    const updateSelected = (value: Entity[]) => {
      selected.value = value;
    };

    const loadDataList = async () => {
      isLoading.value = true;
      $patchPaginationStore({ next: false });

      const params = {
        ...filtersManager.value.getAllValues(),
        page: page.value,
        size: size.value,
        sort: sort.value,
        fields: fields.value,
        parentId: parentId.value,
      };

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

    const initialize = async ({
      parentId: storeParentId,
    }: { parentId?: string | number } = {}) => {
      if (storeParentId) {
        parentId.value = storeParentId;
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
        if (!loadingAfterFiltersChange) {
          return loadDataList();
        }
      });

      return loadDataList();
    };

    return {
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

      initialize,

      loadDataList,

      updateSelected,
      patchItemProperty,
      deleteEls,

      updatePage,
      updateSize,

      updateSort,
      updateShownHeaders,

      hasFilter,
      addFilter,
      updateFilter,
      deleteFilter,
    };
  });
};
