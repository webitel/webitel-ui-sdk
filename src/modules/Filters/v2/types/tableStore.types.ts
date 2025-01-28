import type { Ref } from 'vue';

import { ApiModule } from '../../../../api/types/ApiModule.type.ts';
import { IFiltersManager } from '../filters';

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
  isFiltersRestoring: Ref<boolean>;

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
  hasFilter: IFiltersManager['hasFilter'];
  addFilter: IFiltersManager['addFilter'];
  updateFilter: IFiltersManager['updateFilter'];
  deleteFilter: IFiltersManager['deleteFilter'];
}
