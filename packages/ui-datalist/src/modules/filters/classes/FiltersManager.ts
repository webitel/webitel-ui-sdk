import { isEmpty } from '@webitel/ui-sdk/scripts';

import {
	filterLabelToSnapshotKey,
	filterNameFromSnapshotKey,
	filterValuePropFromSnapshotKey,
	filterValueToSnapshotKey,
} from '../scripts/utils';
import {
	Filter,
	type FilterData,
	type FilterInitParams,
	type FilterInstanceConfig,
	type FilterLabel,
	type FilterName,
	type FilterValue,
	type IFilter,
} from './Filter';

export interface IFiltersManager {
	filters: Map<FilterName, IFilter>;

	hasFilter: (name: FilterName) => boolean;
	/** `undefined` when no filter is registered under `name` */
	getFilter: (name: FilterName) => IFilter | undefined;
	addFilter: (
		params: FilterInitParams,
		payload?: object,
		config?: FilterInstanceConfig,
	) => IFilter;
	updateFilter: ({
		name,
	}: {
		name: FilterName;
		value?: FilterValue;
		label?: FilterLabel;
	}) => IFilter;
	deleteFilter: ({ name }: { name: FilterName }) => IFilter | undefined;

	/**
	 * Converts filters data to String, that can be stored
	 */
	toString: (options?: {
		include?: FilterName[];
		exclude?: FilterName[];
	}) => string;

	/**
	 * Restores filters from string
	 */
	fromString: (snapshotStr: string) => void;

	/**
	 * deletes filters
	 * If include/exclude are not provided, all filters will be deleted
	 */
	reset: ({
		include,
		exclude,
	}?: {
		include?: FilterName[];
		exclude?: FilterName[];
	}) => void;

	/**
	 * @returns Array<FilterName>
	 */
	getAllKeys: () => FilterName[];

	/**
	 * @returns { FilterName: FilterValue }
	 */

	getAllValues: ({
		include,
		exclude,
	}?: {
		include?: FilterName[];
		exclude?: FilterName[];
	}) => {
		[name: FilterName]: FilterValue;
	};
	/**
	 * @returns Array<IFilter>
	 * @param include
	 * @param exclude
	 */

	getFiltersList: ({
		include,
		exclude,
	}?: {
		include?: FilterName[];
		exclude?: FilterName[];
	}) => IFilter[];
}

export type FiltersManagerConfig = FilterInstanceConfig;

class FiltersManager implements IFiltersManager {
	filters = new Map<FilterName, IFilter>();

	constructor(private config?: FiltersManagerConfig) {}

	hasFilter(name: FilterName): boolean {
		return this.filters.has(name);
	}

	getFilter(name: FilterName): IFilter | undefined {
		return this.filters.get(name);
	}

	addFilter(
		filterInitParams: FilterInitParams,
		payload?: object,
		config?: FilterInstanceConfig,
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
		if (!filter) {
			// previously a TypeError on `filter.set` a line later
			throw new Error(`FiltersManager: cannot update unknown filter "${name}"`);
		}
		filter.set({
			value,
			label,
		});
		return filter;
	}

	deleteFilter({ name }: { name: FilterName }): IFilter | undefined {
		const filter = this.filters.get(name);
		this.filters.delete(name);
		return filter;
	}

	getAllValues({
		include,
		exclude,
	}: {
		include?: FilterName[];
		exclude?: FilterName[];
	} = {}): {
		[name: FilterName]: FilterValue;
	} {
		const filters = this.getFiltersList({
			include,
			exclude,
		}).reduce(
			(acc, filter) => {
				acc[filter.name] = filter.value;
				return acc;
			},
			{} as {
				[name: FilterName]: FilterValue;
			},
		);

		return filters;
	}

	toString({
		include,
		exclude,
	}: {
		include?: FilterName[];
		exclude?: FilterName[];
	} = {}): string {
		const filtersData = this.getFiltersList({
			include,
			exclude,
		}).reduce((acc, { name, label, value }) => {
			if (isEmpty(value) && value == null) return acc;

			acc[filterValueToSnapshotKey(name)] = value;

			if (label) {
				acc[filterLabelToSnapshotKey(name)] = label;
			}

			return acc;
		}, {});

		return JSON.stringify(filtersData);
	}

	fromString(snapshotStr: string): void {
		const snapshot = JSON.parse(snapshotStr);

		/*
    first, make transition object from snapshot,
    because filter should bw always added with value
     */
		const filtersData: {
			FilterName: FilterData;
		} = Object.entries(snapshot).reduce(
			(filtersAcc, [snapshotKey, snapshotValue]) => {
				const name = filterNameFromSnapshotKey(snapshotKey);
				const valueProp = filterValuePropFromSnapshotKey(snapshotKey);

				// both are undefined for keys that are neither `_lbl` nor `_val`;
				// previously those produced an "undefined" key in the accumulator
				if (name === undefined || valueProp === undefined) {
					return filtersAcc;
				}

				if (filtersAcc[name]) {
					filtersAcc[name][valueProp] = snapshotValue;
				} else {
					filtersAcc[name] = {
						[valueProp]: snapshotValue,
					};
				}

				return filtersAcc;
			},
			{} as {
				FilterName: FilterData;
			},
		);

		Object.entries(filtersData).forEach(([name, filterData]) => {
			if (this.hasFilter(name)) {
				this.updateFilter({
					name,
					...filterData,
				});
			} else {
				this.addFilter({
					...filterData,
					name,
				});
			}
		});
	}

	getAllKeys(): FilterName[] {
		return [
			...this.filters.keys(),
		];
	}

	getFiltersList({
		include,
		exclude,
	}: {
		include?: FilterName[];
		exclude?: FilterName[];
	} = {}): IFilter[] {
		// bound to consts so the narrowing survives into the filter callback
		const includeList = isEmpty(include) ? undefined : include;
		const excludeList = isEmpty(exclude) ? undefined : exclude;

		if (!includeList && !excludeList) {
			return [
				...this.filters.values(),
			];
		}

		return [
			...this.filters.values(),
		].filter(({ name }) => {
			if (includeList) {
				return includeList.includes(name);
			} else if (excludeList) {
				return !excludeList.includes(name);
			}

			return true;
		});
	}

	reset({
		include,
		exclude,
	}: {
		include?: FilterName[];
		exclude?: FilterName[];
	} = {}): void {
		// bound to consts so the narrowing survives into the forEach callbacks
		const includeList = isEmpty(include) ? undefined : include;
		const excludeList = isEmpty(exclude) ? undefined : exclude;

		if (!includeList && !excludeList) {
			this.filters.clear();
			return;
		}

		if (includeList) {
			includeList.forEach((name) => {
				this.filters.delete(name);
			});
			return;
		}

		if (excludeList) {
			this.filters.forEach((_, filterName) => {
				if (!excludeList.includes(filterName)) {
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
