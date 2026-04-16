import type { IFilter } from '../../../classes/Filter';
import type { TFilterConfig } from './FilterConfig';

export type DynamicFilterPreviewComponentProps = {
	value: unknown;
	filterConfig: TFilterConfig;
	filter: IFilter;
};
