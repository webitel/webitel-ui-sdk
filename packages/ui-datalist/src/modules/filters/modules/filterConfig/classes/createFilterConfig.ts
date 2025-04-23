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

export const createFilterConfig = ({
  name,
}: Partial<FilterConfigBaseParams> &
  Pick<FilterConfigBaseParams, 'name'>): BaseFilterConfig => {
  const filterConfigClass = FilterOptionToFilterConfigCreatorMap[name];

  if (filterConfigClass) {
    return filterConfigClass();
  }

  /**
   * @author @dlohvinov
   * */
  return new FilterConfig({
    name,
    valueInputComponent: FilterOptionToValueComponentMap[name],
    valuePreviewComponent: FilterOptionToPreviewComponentMap[name],
  });
};
