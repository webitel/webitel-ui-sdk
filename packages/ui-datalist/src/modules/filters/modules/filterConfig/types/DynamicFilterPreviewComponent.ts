import { IFilter } from '../../../types/Filters.types';
import { TFilterConfig } from './FilterConfig';

export type DynamicFilterPreviewComponentProps = {
  value: unknown;
  filterConfig: TFilterConfig;
  filter: IFilter;
};
