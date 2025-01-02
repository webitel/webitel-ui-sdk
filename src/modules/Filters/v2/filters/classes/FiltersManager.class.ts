// import mitt from "mitt";
import { Filter } from './Filter.class.ts';
import type {
  FilterConfig,
  FilterName,
  FilterValue,
  IFilter,
} from '../types/Filter.types.ts';
import type {
  FiltersManagerConfig,
  IFiltersManager,
} from '../types/FiltersManager.types.ts';

// import {type FilterStorage, QueryFilterStorage, BrowserFilterStorage} from "./FilterStorage.types.ts";

class FiltersManager implements IFiltersManager {
  // private readonly emitter = mitt();
  // private readonly storages: FilterStorage = [];

  filters = new Map<FilterName, IFilter>();

  constructor(private config: FiltersManagerConfig) {
    // let storages: [];
    // if (config.storages === null) {
    //     storages = [];
    // } else if (config.storages) {
    //     storages = config.storages;
    // } else {
    //     storages = ['url', 'browser'];
    // }
    //
    // this.storages = storages.map((storage) => {
    //     if (storage === 'url') {
    //         return new QueryFilterStorage();
    //     }
    //
    //     if (storage === 'browser') {
    //         return new BrowserFilterStorage({ prefix: config.storagePrefix });
    //     }
    // });
  }

  get(name: FilterName): IFilter {
    return this.filters.get(name);
  }

  add(
    { name, value }: { name: FilterName; value: FilterValue },
    payload?: object,
    config?: FilterConfig,
  ): IFilter {
    const filter = new Filter({ name, value }, payload, config || this.config);
    this.filters.set(name, filter);
    return filter;
  }

  update({ name, value }): IFilter {
    const filter = this.filters.get(name);
    filter.set(value);
    return filter;
  }

  delete(name: FilterName): IFilter {
    const filter = this.filters.get(name);
    this.filters.delete(name);
    return filter;
  }

  resetAll(): void {
    this.filters.forEach((filter) => filter.reset());
  }

  restoreAll(): void {
    this.filters.forEach((filter) => filter.restore());
  }

  getAllValues(): { [name: FilterName]: FilterValue } {
    const filters = [...this.filters.values()].reduce((acc, filter) => {
      acc[filter.name] = filter.get();
      return acc;
    }, {});

    return filters;
  }
}

export const createFiltersManager = (
  config: FiltersManagerConfig,
): IFiltersManager => {
  return new FiltersManager(config);
};
