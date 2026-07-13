import type { IFilter } from '../../../classes/Filter';
import type { AnyFilterConfig } from '../classes/FilterConfig';

export type DynamicFilterPreviewComponentProps = {
	value: unknown;
	filterConfig: AnyFilterConfig;
	filter: IFilter;
};
