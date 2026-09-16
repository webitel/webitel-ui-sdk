import type { ApiModule } from '@webitel/ui-sdk/api/types/ApiModule';
import type {
	WtTableHeader,
	WtTableHeaderFilter,
} from '@webitel/ui-sdk/components/wt-table/types/WtTable';
import type { Ref } from 'vue';

import type { IFiltersManager } from '../filters';
import type { DatalistStoreProviderType } from './StoreProvider';

/**
 * Table header shape used inside the datalist stores. In addition to the
 * base {@link WtTableHeader} shape, datalist stores key columns by `field`
 * and may flag dynamically-appended headers for lazy initialization.
 */
export type DatalistTableHeader = WtTableHeader & {
	field: string;
	shouldBeInitialized?: boolean;
	/**
	 * Access gate supplied by the consuming app, evaluated once when the headers
	 * store is created. Returning `false` drops the column completely: absent
	 * from the column picker, never rendered, never requested, and not
	 * restorable from persisted state. Omitted means allowed.
	 */
	access?: () => boolean | Ref<boolean>;
	/**
	 * Name of the filter shown in the column header popover (`column-filter` slot),
	 * or an already-resolved config for it (build one with `createFilterConfig`). Passing a
	 * config here lets `headers.ts` map the header to its filter once, instead of
	 * `useColumnFilter` searching `filterOptions`/`filterableExtensionFields` for it on every
	 * column.
	 *
	 * {@link WtTableHeaderFilter} deliberately keeps only the `name` of a resolved config and not
	 * the full `AnyFilterConfig` (with its `Component` props): `createTableHeadersStore` keeps
	 * headers in a plain `ref<DatalistTableHeader[]>`, and `Component` props there send Vue's
	 * `UnwrapRef` into excessive type-instantiation depth (TS2589). `useColumnFilter`'s
	 * `isResolvedFilterConfig` narrows it back to `AnyFilterConfig` for actual use.
	 */
	filter?: WtTableHeaderFilter;
};

export type TrackSelectedRowBy<T> = (row: T) => T;

/**
 * Every method on {@link ApiModule} is optional, but a table store cannot load
 * anything without `getList`, so it is required here. `patch`/`delete` stay
 * optional and are called defensively.
 */
export type TableApiModule<Entity> = ApiModule<Entity> &
	Required<Pick<ApiModule<Entity>, 'getList'>>;

export interface useTableStoreConfig<Entity> {
	apiModule: TableApiModule<Entity>;
	headers: DatalistTableHeader[];
	disablePersistence?: boolean | [];
	storeType?: DatalistStoreProviderType;
	isAppendDataList?: boolean;
	// etagMode: boolean;
}

export interface PatchItemPropertyParams {
	index: number;
	path: string;
	value: unknown;
}

export interface LoadDataListOptions {
	withLoading?: boolean;
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
	columnWidths: Ref<[]>;

	// filtersStore
	filtersManager: Ref<IFiltersManager>;
	isFiltersRestoring: Ref<boolean>;

	// tableStore
	initialize: () => Promise<void>;
	loadDataList: (options?: LoadDataListOptions) => Promise<void>;
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
