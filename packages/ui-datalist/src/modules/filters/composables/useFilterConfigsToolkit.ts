import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { WebitelProtoDataField } from 'webitel-sdk';

import {
  createFilterConfig,
  FilterConfig,
} from '../modules/filterConfig/classes/FilterConfig';
import { createTypeExtensionFilterConfig } from '../modules/filterConfig/components/_custom';
import { FilterOption } from '../modules/filterConfig/enums/FilterOption';
import {
  BaseFilterConfig,
  FilterName,
  IFilter,
  IFiltersManager,
} from '../types/Filters.types';

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
  filterableExtensionFields: WebitelProtoDataField[];
};

export const useFilterConfigsToolkit = ({
  filterOptions,
  filtersManager,
  filterableExtensionFields = [],
}: FilterConfigToolkitParams): FilterConfigToolkit => {
  const { t } = useI18n();

  const filterConfigs = computed(() => {
    return (
      filterOptions
        /**
         * make filterConfigs from standard filterOptions
         */
        .map((opt) => {
          if (opt instanceof FilterConfig) {
            return opt;
          }

          if (typeof opt === 'string') {
            return createFilterConfig({ name: opt });
          }

          return new FilterConfig({
            ...opt,
            name: opt.name,
          });
        })
        /**
         * localize
         */
        .map((filterConfig) => {
          if (!filterConfig.label) {
            filterConfig.label = t(`webitelUI.filters.${filterConfig.name}`);
          }

          return filterConfig;
        })
        /**
         * add filterConfigs for extension fields
         */
        .concat(
          filterableExtensionFields.map((field: WebitelProtoDataField) => {
            return createTypeExtensionFilterConfig(
              { name: field.id },
              { field },
            );
          }),
        )
    );
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
