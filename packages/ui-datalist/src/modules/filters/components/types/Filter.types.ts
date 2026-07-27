import type {
	FilterData,
	FilterInitParams,
	IFilter,
} from '../../classes/Filter';
import type { AnyFilterConfig } from '../../modules/filterConfig';

export interface FilterEmits {
	'update:filter': [
		FilterData,
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
