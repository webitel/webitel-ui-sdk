import {
  FilterOptionToFilterConfigCreatorMap,
  FilterOptionToPreviewComponentMap,
  FilterOptionToValueComponentMap,
} from '../components';
import {
  BaseFilterConfig,
  FilterConfig,
  FilterConfigBaseParams,
} from './FilterConfig';

export const createFilterConfig = (
  params: BaseFilterConfigParams &
    Required<BaseFilterConfig, 'name'> &
    Record<string, unknown>,
): BaseFilterConfig => {
  const { name } = params;

  const filterConfigClass = FilterOptionToFilterConfigCreatorMap[name];

  if (filterConfigClass) {
    return filterConfigClass(params);
  }

  return new FilterConfig({
    valueInputComponent: FilterOptionToValueComponentMap[name],
    valuePreviewComponent: FilterOptionToPreviewComponentMap[name],
    ...params,
  });
};
