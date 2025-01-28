import { isEmpty } from '../../../../../scripts';
import {
  filterLabelToSnapshotKey,
  filterNameFromSnapshotKey,
  filterValuePropFromSnapshotKey,
  filterValueToSnapshotKey,
} from '../scripts/utils.ts';
import type {
  FilterConfig,
  FilterData,
  FilterInitParams,
  FilterLabel,
  FilterName,
  FilterValue,
  IFilter,
} from '../types/Filter.types.ts';
import type {
  FiltersManagerConfig,
  IFiltersManager,
} from '../types/FiltersManager.types.ts';
import { Filter } from './Filter.class.ts';

class FiltersManager implements IFiltersManager {
  filters = new Map<FilterName, IFilter>();

  constructor(private config?: FiltersManagerConfig) {}

  hasFilter(name: FilterName): boolean {
    return this.filters.has(name);
  }

  getFilter(name: FilterName): IFilter {
    return this.filters.get(name);
  }

  addFilter(
    filterInitParams: FilterInitParams,
    payload?: object,
    config?: FilterConfig,
  ): IFilter {
    const filter = new Filter(filterInitParams, payload, config || this.config);
    this.filters.set(filterInitParams.name, filter);
    return filter;
  }

  updateFilter({
    name,
    value,
    label,
  }: {
    name: FilterName;
    value?: FilterValue;
    label?: FilterLabel;
  }): IFilter {
    const filter = this.filters.get(name);
    filter.set({ value, label });
    return filter;
  }

  deleteFilter(name: FilterName): IFilter {
    const filter = this.filters.get(name);
    this.filters.delete(name);
    return filter;
  }

  getAllValues(): { [name: FilterName]: FilterValue } {
    const filters = [...this.filters.values()].reduce((acc, filter) => {
      acc[filter.name] = filter.value;
      return acc;
    }, {});

    return filters;
  }

  toString(): string {
    const filtersData = [...this.filters.values()].reduce(
      (acc, { name, label, value }) => {
        if (isEmpty(value)) return acc;

        acc[filterValueToSnapshotKey(name)] = value;

        if (label) {
          acc[filterLabelToSnapshotKey(name)] = label;
        }

        return acc;
      },
      {},
    );

    return JSON.stringify(filtersData);
  }

  fromString(snapshotStr: string): void {
    const snapshot = JSON.parse(snapshotStr);

    /*
    first, make transition object from snapshot,
    because filter should bw always added with value
     */
    const filtersData: { FilterName: FilterData } = Object.entries(
      snapshot,
    ).reduce(
      (filtersAcc, [snapshotKey, snapshotValue]) => {
        const name = filterNameFromSnapshotKey(snapshotKey);
        const valueProp = filterValuePropFromSnapshotKey(snapshotKey);

        if (filtersAcc[name]) {
          filtersAcc[name][valueProp] = snapshotValue;
        } else {
          filtersAcc[name] = {
            [valueProp]: snapshotValue,
          };
        }

        return filtersAcc;
      },
      {} as { FilterName: FilterData },
    );

    Object.entries(filtersData).forEach(([name, filterData]) => {
      this.addFilter({ ...filterData, name });
    });
  }

  getAllKeys(): FilterName[] {
    return [...this.filters.keys()];
  }

  getFiltersList({
    include,
    exclude,
  }: {
    include: FilterName[];
    exclude: FilterName[];
  }): IFilter[] {
    const useInclude = !isEmpty(include);
    const useExclude = !isEmpty(exclude) && !useInclude;

    if (!useInclude && !useExclude) {
      return [...this.filters.values()];
    }

    return [...this.filters.values()].filter(({ name }) => {
      if (useInclude) {
        return include.includes(name);
      } else if (useExclude) {
        return !exclude.includes(name);
      }

      return true;
    });
  }

  reset({
    include,
    exclude,
  }: {
    include: FilterName[];
    exclude: FilterName[];
  }): void {
    const useInclude = !isEmpty(include);
    const useExclude = !isEmpty(exclude) && !useInclude;

    if (!useInclude && !useExclude) {
      this.filters.clear();
      return;
    }

    if (useInclude) {
      include.forEach((name) => {
        this.filters.delete(name);
      });
      return;
    }

    if (useExclude) {
      this.filters.forEach((_, filterName) => {
        if (exclude.includes(filterName)) {
          this.filters.delete(filterName);
        }
      });
      return;
    }
  }
}

export const createFiltersManager = (
  config?: FiltersManagerConfig,
): IFiltersManager => {
  return new FiltersManager(config);
};
