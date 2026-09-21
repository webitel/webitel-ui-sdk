import type { FilterInitParams, IFilter } from '../../classes/Filter';
import type { AnyFilterConfig } from '../../modules/filterConfig';

export interface FilterEmits {
	'update:filter': [
		FilterInitParams,
	];
	'delete:filter': [
		IFilter,
	];
}

export interface StaticFilterEmits extends FilterEmits {
	'add:filter': [
		FilterInitParams,
	];
}

export interface DynamicFilterEmits extends FilterEmits {}

/** column filter lives in a popover, so it also asks the parent to close it */
export interface ColumnFilterEmits extends StaticFilterEmits {
	close: [];
}

export interface FilterProps {
	filter: IFilter;
	filterConfig: AnyFilterConfig;
}

/** the static view lists every config, so the filter is absent until applied */
export interface StaticFilterProps extends Omit<FilterProps, 'filter'> {
	filter?: IFilter;
}

export interface DynamicFilterProps extends FilterProps {
	readonly?: boolean;
}
