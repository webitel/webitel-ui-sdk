import { isEmpty } from '../../../../../scripts';
import {
  filterLabelToSnapshotKey,
  filterNameFromSnapshotKey, filterValuePropFromSnapshotKey,
  filterValueToSnapshotKey,
} from '../scripts/utils.ts';
import type {
  FilterConfig,
  FilterName,
  FilterValue,
  IFilter,
} from '../types/Filter.types.ts';
import { FilterData } from '../types/Filter.types.ts';
import type {
  FiltersManagerConfig,
  IFiltersManager,
} from '../types/FiltersManager.types.ts';
import { Filter } from './Filter.class.ts';

class FiltersManager implements IFiltersManager {
  filters = new Map<FilterName, IFilter>();

  constructor(private config: FiltersManagerConfig) {}

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

  getAllValues(): { [name: FilterName]: FilterValue } {
    const filters = [...this.filters.values()].reduce((acc, filter) => {
      acc[filter.name] = filter.get();
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
    const filtersData: { FilterName: FilterData } = Object.entries(snapshot).reduce(
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
      this.add({ ...filterData, name });
    });
  }
}

export const createFiltersManager = (
  config: FiltersManagerConfig,
): IFiltersManager => {
  return new FiltersManager(config);
};
