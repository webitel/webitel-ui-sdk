import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';

import { FilterName, IFilter } from '../classes/Filter';
import { IFiltersManager } from '../classes/FiltersManager';
import {
  BaseFilterConfig,
  createFilterConfig,
  FilterConfig,
} from '../modules/filterConfig/classes/FilterConfig';
import { FilterOption } from '../modules/filterConfig/enums/FilterOption';

export type FilterConfigToolkit = {
  filterConfigs: ComputedRef<BaseFilterConfig[]>;
  /**
   * @description
   * some filters may be stored in filtersManager,
   * but not included in this filters panel
   */
  filtersIncluded: ComputedRef<FilterName[]>;
  appliedFilters: ComputedRef<IFilter[]>;
  /**
   * @description
   * available filters to add, with appliedFilters excluded
   */
  unAppliedFiltersConfigs: ComputedRef<BaseFilterConfig[]>;
  appliedFilterToFilterConfigMappings: ComputedRef<
    Array<{
      filterConfig: BaseFilterConfig;
      filter: IFilter;
    }>
  >;
};

export type FilterConfigToolkitParams = {
  filterOptions: (FilterOption | BaseFilterConfig)[];
  filtersManager: IFiltersManager;
};

export const useFilterConfigsToolkit = ({
  filterOptions,
  filtersManager,
}: FilterConfigToolkitParams): FilterConfigToolkit => {
  const { t } = useI18n();

  const filterConfigs = computed(() => {
    return filterOptions
      .map((opt) => {
        if (opt instanceof FilterConfig) {
          return opt;
        }

        if (typeof opt === 'string') {
          return createFilterConfig({ filterOption: opt });
        }

        return new FilterConfig({
          ...opt,
          name: opt.name,
        });
      })
      .map((filterConfig) => {
        if (!filterConfig.label) {
          filterConfig.label = t(`webitelUI.filters.${filterConfig.name}`);
        }

        return filterConfig;
      });
  });

  const filtersIncluded = computed(() => {
    return filterConfigs.value.map(({ name }) => name);
  });

  const appliedFilters = computed(() => {
    return filtersManager.getFiltersList({
      include: filtersIncluded.value,
    });
  });

  const unAppliedFiltersConfigs = computed(() => {
    return filterConfigs.value.filter(({ name }) => {
      return !filtersManager.hasFilter(name);
    });
  });

  const appliedFilterToFilterConfigMappings = computed(() => {
    const filterNameToFilterConfigMap = filterConfigs.value.reduce(
      (map, filterConfig) => {
        return {
          ...map,
          [filterConfig.name]: filterConfig,
        };
      },
      {},
    );

    return appliedFilters.value.map((filter) => {
      return {
        filter,
        filterConfig: filterNameToFilterConfigMap[filter.name],
      };
    });
  });

  return {
    filterConfigs,
    filtersIncluded,
    appliedFilters,
    appliedFilterToFilterConfigMappings,
    unAppliedFiltersConfigs,
  };
};
