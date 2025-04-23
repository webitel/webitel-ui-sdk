import {
  FilterOptionToFilterConfigCreatorMap,
  FilterOptionToPreviewComponentMap,
  FilterOptionToValueComponentMap,
} from '../components';
import { FilterOption } from '../enums/FilterOption';
import {
  BaseFilterConfig,
  FilterConfig,
  FilterConfigBaseParams,
} from './FilterConfig';

export const createFilterConfig = ({
  name,
}: Partial<FilterConfigBaseParams> &
  Pick<FilterConfigBaseParams, 'name'>): BaseFilterConfig => {
  const filterConfigClass = FilterOptionToFilterConfigCreatorMap[filterOption];

  if (filterConfigClass) {
    return filterConfigClass();
  }

  /**
   * @author @dlohvinov
   * */
  return new FilterConfig({
    name: filterOption,
    valueInputComponent: FilterOptionToValueComponentMap[filterOption],
    valuePreviewComponent: FilterOptionToPreviewComponentMap[filterOption],
  });
};
