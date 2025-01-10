import type { Ref } from 'vue';

import { IFiltersManager } from '../filters';

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
  parentId?: string;
  apiModule: ApiModule<Entity>;
  headers: [];
  // etagMode: boolean;
}

export interface PatchItemPropertyParams {
  index: number;
  path: string;
  value: unknown;
}

export interface TableStore<Entity> {
  // tableStore
  dataList: Ref<Entity[]>;
  selected: Ref<Entity[]>;
  error: Ref<Error | null>;
  isLoading: Ref<boolean>;

  // paginationStore
  page: Ref<number>;
  size: Ref<number>;
  next: Ref<boolean>;

  // headersStore
  headers: Ref<[]>;
  shownHeaders: Ref<[]>;
  fields: Ref<[]>;
  sort: Ref<string>;

  // filtersStore
  filtersManager: Ref<IFiltersManager>;

  // tableStore
  initialize: () => Promise<void>;
  loadDataList: (query?: object) => Promise<void>;
  patchItemProperty: (payload: PatchItemPropertyParams) => Promise<void>;
  deleteEls: (deleted: Entity[]) => Promise<void>;

  // paginationStore
  updatePage: (page: number) => void;
  updateSize: (size: number) => void;

  // headersStore
  updateSort: (column: object) => void;
  updateShownHeaders: () => void;

  // filtersStore
  addFilter: (filter: object) => void;
  updateFilter: (filter: object) => void;
  deleteFilter: (filter: object) => void;
}
