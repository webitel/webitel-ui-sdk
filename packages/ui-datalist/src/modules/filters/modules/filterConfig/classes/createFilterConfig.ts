import {
  FilterOptionToFilterConfigCreatorMap,
  FilterOptionToPreviewComponentMap,
  FilterOptionToValueComponentMap,
} from '../components';
import { FilterOption } from '../enums/FilterOption';
import { BaseFilterConfig, FilterConfig } from './FilterConfig';

export const createFilterConfig = ({
  filterOption,
}: {
  filterOption: FilterOption;
}): BaseFilterConfig => {
  const filterConfigClass = FilterOptionToFilterConfigCreatorMap[filterOption];

  if (filterConfigClass) {
    return filterConfigClass();
  }

  // throw new Error(
  //   `Filter config class not found for this filter option: ${filterOption}`,
  // );

  /**
   * @author @dlohvinov
   *
   * @deprecated
   * compat. should be removed with FilterOption to Component maps
   * */
  return new FilterConfig({
    name: filterOption,
    valueInputComponent: FilterOptionToValueComponentMap[filterOption],
    valuePreviewComponent: FilterOptionToPreviewComponentMap[filterOption],
  });
};
