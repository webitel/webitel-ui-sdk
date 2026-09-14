import type { ApiModule } from '@webitel/ui-sdk/api/types/ApiModule';
import type {
	WtTableHeader,
	WtTableSortOrder,
} from '@webitel/ui-sdk/components/wt-table/types/WtTable';
import type { Ref } from 'vue';

import type { IFiltersManager } from '../filters';
import type { Identifiable } from './createDatalistStore.types';
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

export interface InitializeListSessionOptions {
	parentId?: string | number;
}

/**
 * Public shape of a list-session — the deep module behind `createTableStore`.
 * Sibling stores (headers / pagination / filters) are projections on this interface.
 */
export interface TableStore<Entity extends Identifiable = Identifiable> {
	parentId: Ref<string | number | undefined>;
	isNested: Ref<boolean>;
	isStoreSetUp: Ref<boolean>;

	dataList: Ref<Entity[]>;
	selected: Ref<Entity[]>;
	error: Ref<unknown>;
	isLoading: Ref<boolean>;

	page: Ref<number>;
	size: Ref<number>;
	next: Ref<boolean>;

	headers: Ref<DatalistTableHeader[]>;
	shownHeaders: Ref<DatalistTableHeader[]>;
	fields: Ref<string[]>;
	sort: Ref<string | null>;
	columnWidths: Ref<Record<string, string>>;
	searchMode: Ref<string>;

	filtersManager: Ref<IFiltersManager>;
	isFiltersRestoring: Ref<boolean>;

	setupStore: () => Promise<void>;
	initialize: (options?: InitializeListSessionOptions) => Promise<void>;
	$reset: () => void;
	syncPersistence: () => Promise<void>;

	loadDataList: (options?: LoadDataListOptions) => Promise<void>;
	appendToDataList: () => Promise<void>;

	updateSelected: (selected: Entity[]) => void;
	patchItemProperty: (payload: PatchItemPropertyParams) => Promise<void>;
	deleteEls: (deleted: Entity | Entity[]) => Promise<void>;

	resetInfiniteScrollTableParamsToDefaults: () => void;

	updateSearchMode: (mode: string) => void;

	updatePage: (page: number) => void;
	updateSize: (size: number) => void;

	updateSort: (
		column: DatalistTableHeader,
		options?:
			| {
					order?: WtTableSortOrder;
			  }
			| WtTableSortOrder,
	) => void;
	columnResize: (payload: { columnName: string; columnWidth: string }) => void;
	columnReorder: (orderedFields: string[]) => void;
	updateShownHeaders: (headers: DatalistTableHeader[]) => void;

	hasFilter: IFiltersManager['hasFilter'];
	addFilter: IFiltersManager['addFilter'];
	updateFilter: IFiltersManager['updateFilter'];
	deleteFilter: IFiltersManager['deleteFilter'];
}

/** @deprecated prefer TableStore — alias kept while callers migrate */
export type ListSessionStore<Entity extends Identifiable = Identifiable> =
	TableStore<Entity>;
