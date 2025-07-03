import { FilterData, FilterInitParams, IFilter } from '../../classes/Filter';
import { AnyFilterConfig } from '../../modules/filterConfig';

export interface FilterEmits {
  'update:filter': [FilterData];
  'delete:filter': [IFilter];
}

export interface StaticFilterEmits extends FilterEmits {
  'add:filter': [FilterInitParams];
}

export interface DynamicFilterEmits extends FilterEmits {
}

export interface FilterProps {
  filter: IFilter;
  filterConfig: AnyFilterConfig;
}

export interface StaticFilterProps extends FilterProps {
}

export interface DynamicFilterProps extends FilterProps {
  readonly?: boolean;
}
