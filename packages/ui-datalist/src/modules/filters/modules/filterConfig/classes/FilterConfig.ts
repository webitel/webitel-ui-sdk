import type { Component } from 'vue';
import type { MessageResolver } from 'vue-i18n';

import type { FilterName, FilterValue } from '../../../classes/Filter';

export interface BaseFilterConfig {
	name: FilterName;
	valueInputComponent: Component;
	valuePreviewComponent: Component;
	label?: ReturnType<MessageResolver> | string;
	notDeletable?: boolean;
}

export type FilterConfigBaseParams = {
	name?: FilterName;
	valueInputComponent?: Component;
	valuePreviewComponent?: Component;
	notDeletable?: boolean;
	showFilterName?: boolean;
	staticView?: boolean;
};

export interface IWtSysTypeFilterConfig extends BaseFilterConfig {
	searchRecords: (...params: FilterConfigSearchMethodParams) => Promise<{
		items: unknown[];
		next?: boolean;
	}>;
}

export type FilterConfigSearchMethodParams = [
	/**
	 * @description
	 * any request-related data
	 *
	 * `any`, not `unknown`, so each filter narrows it in its own `searchRecords`
	 */
	// biome-ignore lint/suspicious/noExplicitAny: see above
	any,
	/**
	 * @description
	 * filter-related data
	 */
	{
		filterName?: FilterName;
		filterValue?: FilterValue;
		filterConfig?: BaseFilterConfig;
	}?,
];

export type AnyFilterConfig = IWtSysTypeFilterConfig | BaseFilterConfig;

/**
 * Loose shapes forwarded into filter-config lookup calls by
 * dynamic-filter-preview.vue and wt-select options loading. The callers pass
 * heterogeneous request params, so these stay permissive on purpose.
 */
// TODO(types): model per-filter search params and filter values precisely
export type FilterConfigSearchRequestParams = {
	/** arrives as a scalar id, a list of ids, or a `{ list }` wrapper */
	id?: any;
	size?: number;
} & Record<string, any>;

export type FilterConfigListFilterValue = {
	list?: Array<
		{
			id?: string | number;
		} & Record<string, any>
	>;
	unassigned?: boolean;
};

export type FilterConfigSearchFilterContext = {
	filterName?: FilterName;
	filterValue?: FilterConfigListFilterValue;
	filterConfig?: BaseFilterConfig;
};

export class FilterConfig implements BaseFilterConfig {
	// assigned by concrete configs as field initializers, e.g.
	// `readonly name = FilterOption.Skill`, not necessarily by this constructor
	name!: FilterName;
	valueInputComponent!: Component;
	valuePreviewComponent!: Component;
	label?: ReturnType<MessageResolver> | string;
	staticView?: boolean;
	notDeletable: boolean;
	showFilterName: boolean;

	constructor({
		name,
		valueInputComponent,
		valuePreviewComponent,
		notDeletable,
		showFilterName,
		staticView,
	}: FilterConfigBaseParams = {}) {
		if (name) this.name = name;
		if (valueInputComponent) this.valueInputComponent = valueInputComponent;
		if (valuePreviewComponent)
			this.valuePreviewComponent = valuePreviewComponent;
		this.notDeletable = !!notDeletable;
		if (staticView) this.staticView = staticView;
		this.showFilterName = !!showFilterName;
	}
}

/**
 * @author @dlohvinov
 *
 * @description
 * "abstract" class is used to support default config fields for all WtSysTypeFilterConfig
 * classes in future
 */
export abstract class WtSysTypeFilterConfig
	extends FilterConfig
	implements IWtSysTypeFilterConfig
{
	abstract name: FilterName;
	abstract searchRecords(...args: unknown[]): Promise<{
		items: unknown[];
		next?: boolean;
	}>;
}
