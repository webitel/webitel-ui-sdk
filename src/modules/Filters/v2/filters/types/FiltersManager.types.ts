import type {FilterConfig, FilterName, FilterValue, IFilter} from "./Filter.types.ts";

export interface IFiltersManager {
    filters: Map<FilterName, IFilter>;

    get: (name: FilterName) => IFilter;
    add: (
        {name, value}: { name: FilterName; value: FilterValue },
        payload?: object,
        config?: FilterConfig,
    ) => IFilter;
    update: ({name, value}: { name: FilterName, value: FilterValue }) => IFilter;
    delete: (name: FilterName) => IFilter;

    resetAll: () => void;
    restoreAll: () => void;
    getAllValues: () => { [name: FilterName]: FilterValue };
}

export type FiltersManagerConfig = FilterConfig & {
    storagePrefix: string;
    storages?: 'url' | 'browser' | null;
};
