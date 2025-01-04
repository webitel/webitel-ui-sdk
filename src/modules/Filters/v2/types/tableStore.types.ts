import type { Ref } from 'vue';

import { createTableHeadersStore } from '../headers/createTableHeadersStore.ts';
import { createTablePaginationStore } from '../pagination/createTablePaginationStore.ts';

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

export interface useTableStoreParams<Entity> {
  apiModule: ApiModule<Entity>;
  etagMode: boolean;
  parentId?: string;
  deps: {
    usePaginationStore: () => ReturnType<typeof createTablePaginationStore>;
    useHeadersStore: () => ReturnType<typeof createTableHeadersStore>;
  };
}

export interface PatchItemPropertyParams {
  index: number;
  path: string;
  value: unknown;
}

export interface TableStore<Entity> {
  dataList: Ref<Entity[]>;
  selected: Ref<Entity[]>;
  error: Ref<Error | null>;
  isLoading: Ref<boolean>;

  loadDataList: (query?: object) => Promise<void>;
  patchItemProperty: (payload: PatchItemPropertyParams) => Promise<void>;
  deleteEls: (deleted: Entity[]) => Promise<void>;
}
