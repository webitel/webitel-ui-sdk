import { IFilter } from '../../../classes/Filter';
import { TFilterConfig } from './FilterConfig';

export type DynamicFilterPreviewComponentProps = {
  value: unknown;
  filterConfig: TFilterConfig;
  filter: IFilter;
};
