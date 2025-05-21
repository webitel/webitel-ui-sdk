import { ApiModule } from '@webitel/ui-sdk/api/types/ApiModule.type';
import type { Ref } from 'vue';

import { WtTableHeader } from '../../../../../src/components/wt-table/types/WtTable';
import { IFiltersManager } from '../filters';
import { DatalistStoreProviderType } from './StoreProvider';

export interface useTableStoreConfig<Entity> {
  apiModule: ApiModule<Entity>;
  headers: WtTableHeader[];
  disablePersistence?: boolean | [];
  storeType?: DatalistStoreProviderType;
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
  updateSelected: (selected: Entity[]) => void;
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
