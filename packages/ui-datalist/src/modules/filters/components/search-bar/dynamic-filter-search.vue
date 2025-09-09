<template>
  <wt-search-bar
    :placeholder="t('reusable.search')"
    :search-mode="searchMode"
    :search-mode-options="searchModeOptions"
    :value="localSearchValue"
    @input="inputValue"
    @search="handleSearch"
    @update:search-mode="updateSearchMode"
  />
</template>

<script lang="ts" setup>
import { WtSearchBar } from '@webitel/ui-sdk/components';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { FilterInitParams, FilterName } from '../../classes/Filter';
import { IFiltersManager } from '../../classes/FiltersManager';
import type { DynamicFilterSearchSearchModeOption } from './types/DynamicFilterSearch';

const props = defineProps<{
  filtersManager: IFiltersManager;
  searchModeOptions?: DynamicFilterSearchSearchModeOption[];
  isFiltersRestoring?: boolean;
  /**
   * @description
   * default search name is used when there are no search modes
   */
  singleSearchName?: string;
  searchMode?: string;
}>();

const defaultSearchName = props.singleSearchName || 'search';

const searchMode = defineModel<string>('searchMode');

const emit = defineEmits<{
  'filter:add': [FilterInitParams];
  'filter:update': [FilterInitParams];
  'filter:delete': [{ name: FilterName }];
}>();

const { t } = useI18n();

const localSearchValue = ref('');

const hasFilter = (filterName = searchMode.value) => {
  return props.filtersManager.filters.has(filterName);
};
const addFilter = (filterInitParams: FilterInitParams) => {
  return emit('filter:add', filterInitParams);
};
const updateFilter = (filterInitParams: FilterInitParams) => {
  return emit('filter:update', filterInitParams);
};
const deleteFilter = ({ name }: { name: FilterName }) => {
  return emit('filter:delete', { name });
};

const restoreLocalSearchValue = (searchMode: string) => {
  return localSearchValue.value = props.filtersManager.filters.get(searchMode)?.value;
}

const hasSearchModes = computed(() => {
  return props.searchModeOptions && props.searchModeOptions.length > 0;
});


const currentSearchName = computed(() => {
  if (hasSearchModes.value) {
    return searchMode.value;
  }

  return defaultSearchName;
});

const inputValue = (value: string) => {
  localSearchValue.value = value;

  if (value === '') {
    if (hasFilter(currentSearchName.value)) {
      deleteFilter({
        name: currentSearchName.value,
      });
    }
    return;
  }
};

const handleSearch = (value = localSearchValue.value) => {
  if(value) {
    if (hasFilter(currentSearchName.value)) {
      updateFilter({
        name: currentSearchName.value,
        value,
      });
    } else {
      addFilter({
        name: currentSearchName.value,
        value,
      });
    }
  }
};

const updateSearchMode = (
  nextSearchMode: DynamicFilterSearchSearchModeOption,
) => {
  if (hasFilter(currentSearchName.value)) {
    deleteFilter({
      name: currentSearchName.value,
    });
  }
  localSearchValue.value = '';
  searchMode.value = nextSearchMode.value;
};

const initialize = () => {
  if(hasSearchModes.value) {
    if(!searchMode.value) {
      searchMode.value = props.searchModeOptions[0].value;
    }
    restoreLocalSearchValue(searchMode.value);
  }
}
/**
 * @description
 * Initializing search mode (if there are search modes)
 * and localSearchValue at teh first load
 */

initialize();

/**
 * @description
 * Restoring search value after filters were restored
 */
watch(
  () => props.isFiltersRestoring,
  (next) => {
    if (next) return;

    let searchModes = [defaultSearchName];
    if (hasSearchModes.value) {
      searchMode.value = props.searchModeOptions?.map((option) => option.value)[0] || '';
    }

    for (const mode of searchModes) {
      if (hasFilter(mode)) {
        searchMode.value = mode;
        restoreLocalSearchValue(mode);
        break;
      }
    }
  },
);

</script>

<style scoped></style>
