import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';
import set from 'lodash/fp/set';
import type { createTablePaginationStore } from '../pagination/createTablePaginationStore.ts';
import type { createTableHeadersStore } from '../headers/createTableHeadersStore.ts';
import { createTableFiltersStore } from '../filters/createTableFiltersStore.ts';

interface ApiModulePatchParams {
  changes: object;
  parentId?: string | number;
  id?: string | number;
  etag?: string;
}

interface ApiModuleDeleteParams {
  id: string | number;
  parentId?: string | number;
}

interface ApiModule<Entity> {
  getList: (params: object) => Promise<{ items: Entity[]; next: boolean }>;
  patch: (params: ApiModulePatchParams) => Promise<Entity>;
  delete: (params: ApiModuleDeleteParams) => Promise<Entity>;
}

interface useTableStoreParams<Entity> {
  apiModule: ApiModule<Entity>;
  etagMode: boolean;
  parentId?: string;
  deps: {
    usePaginationStore: () => ReturnType<typeof createTablePaginationStore>;
    useHeadersStore: () => ReturnType<typeof createTableHeadersStore>;
  };
}

interface PatchItemPropertyParams {
  index: number;
  path: string;
  value: unknown;
}

interface TableStore<Entity> {
  dataList: Ref<Entity[]>;
  selected: Ref<Entity[]>;
  error: Ref<Error | null>;
  isLoading: Ref<boolean>;

  loadDataList: (query?: object) => Promise<void>;
  patchItemProperty: (payload: PatchItemPropertyParams) => Promise<void>;
  deleteEls: (deleted: Entity[]) => Promise<void>;
}

const useTableStore = <Entity extends { id: string; etag?: string }>(
  namespace: string,
  {
    apiModule,
    parentId,
    deps: { usePaginationStore, useHeadersStore },
  }: useTableStoreParams<Entity>,
) => {
  return defineStore(namespace, (): TableStore<Entity> => {
    const paginationStore = usePaginationStore();
    const headersStore = useHeadersStore();
    const filtersStore = createTableFiltersStore(namespace)();

    const dataList: Ref<Entity[]> = ref([]);
    const selected: Ref<Entity[]> = ref([]);
    const error = ref(null);
    const isLoading = ref(false);

    const loadDataList = async () => {
      isLoading.value = true;
      paginationStore.$patch({ next: false });

      const params = {
        ...filtersStore.filtersManager.getAllValues(), // TODO: use getter
        page: paginationStore.page,
        size: paginationStore.size,
        sort: headersStore.sort,
        fields: headersStore.fields,
        parentId,
      };

      try {
        const { items, next } = await apiModule.getList(params);

        dataList.value = items;
        paginationStore.$patch({ next });
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
          parentId,
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
        return apiModule.delete({ id: el.id });
      };

      try {
        await Promise.all(els.map(deleteEl));
      } finally {
        await loadDataList();
      }
    };

    return {
      dataList,
      selected,
      error,
      isLoading,

      loadDataList,
      patchItemProperty,
      deleteEls,
    };
  });
};

export const createTableStore = (namespace: string, params) => {
  const id = namespace;

  return useTableStore(id, params);
};
