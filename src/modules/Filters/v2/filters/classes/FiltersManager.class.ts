import { isEmpty } from '../../../../../scripts';
import { PersistStorableValue } from '../../persist/PersistedStorage.types.ts';
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
import { Filter } from './Filter.class.ts';

const filterLabelToSnapshotKey = (name: FilterName): string => `${name}_lbl`;

const filterValueToSnapshotKey = (name: FilterName): string => `${name}_val`;

const filterLabelFromSnapshotKey = (snapshotKey: string): FilterName =>
  snapshotKey.replace('_lbl', '');

const filterValueFromSnapshotKey = (snapshotKey: string): FilterName =>
  snapshotKey.replace('_val', '');

const isLabelSnapshotKey = (snapshotKey: string): boolean =>
  snapshotKey.includes('_lbl');

const isValueSnapshotKey = (snapshotKey: string): boolean =>
  snapshotKey.includes('_val');

const filterNameFromSnapshotKey = (snapshotKey: string): FilterName => {
  if (isLabelSnapshotKey()) return filterLabelFromSnapshotKey(snapshotKey);
  if (isValueSnapshotKey()) return filterValueFromSnapshotKey(snapshotKey);
};

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

  toString(): PersistStorableValue {
    const filtersData = [...this.filters.values()].reduce(
      (acc, { name, label, value }) => {
        if (isEmpty(value)) return acc;

        acc[filterValueToSnapshotKey(name)] = value;

        if (label) {
          acc[filterLabelToSnapshotKey()] = label;
        }

        return acc;
      },
      {},
    );

    return JSON.stringify(filtersData);
  }

  fromString(snapshotStr: PersistStorableValue): void {
    const snapshot = JSON.parse(snapshotStr);

    const filters = Object.entries(snapshot).reduce(
      acc,
      ([snapshotKey, snapshotValue]) => {
        const name = filterNameFromSnapshotKey(snapshotKey);
        const valueProp = isValueSnapshotKey(snapshotKey) ? 'value' : 'label';

        if (acc[name]) {
          acc[name][valueProp] = snapshotValue;
        } else {
          acc[name] = {
            [valueProp]: snapshotValue,
          };
        }
      },
      {},
    );

    Object.entries(filters).forEach(([name, contents]) => {
      this.add({ ...contents, name });
    });
  }
}

export const createFiltersManager = (
  config: FiltersManagerConfig,
): IFiltersManager => {
  return new FiltersManager(config);
};
