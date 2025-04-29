<template>
  <wt-search-bar
    :placeholder="t('reusable.search')"
    :search-mode="searchMode"
    :search-mode-options="searchModeOptions"
    :value="localSearchValue"
    @input="localSearchValue = $event"
    @search="handleSearch"
    @update:search-mode="updateSearchMode"
  />
</template>

<script lang="ts" setup>
import { WtSearchBar } from '@webitel/ui-sdk/components';
import { computed, type Ref, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  FilterInitParams,
  FilterName,
  IFiltersManager,
} from '../../types/Filters.types';
import type { DynamicFilterSearchSearchModeOption } from './types/DynamicFilterSearch';

/**
 * @description
 * default search name is used when there are no search modes
 */
const defaultSearchName = 'search';

const props = defineProps<{
  filtersManager: IFiltersManager;
  searchModeOptions?: DynamicFilterSearchSearchModeOption[];
  isFiltersRestoring?: boolean;
}>();

const emit = defineEmits<{
  'filter:add': [FilterInitParams];
  'filter:update': [FilterInitParams];
  'filter:delete': [{ name: FilterName }];
}>();

const { t } = useI18n();

const searchMode: Ref<FilterName> = ref();
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

const hasSearchModes = computed(() => {
  return props.searchModeOptions && props.searchModeOptions.length > 0;
});

if (hasSearchModes.value) {
  searchMode.value = props.searchModeOptions[0].value;
}

const currentSearchName = computed(() => {
  if (hasSearchModes.value) {
    return searchMode.value;
  }

  return defaultSearchName;
});

const handleSearch = (value = localSearchValue.value) => {
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
};

const updateSearchMode = (
  nextSearchMode: DynamicFilterSearchSearchModeOption,
) => {
  if (hasFilter(currentSearchName.value)) {
    deleteFilter({
      name: currentSearchName.value,
    });
  }
  searchMode.value = nextSearchMode.value;
  localSearchValue.value = '';
};

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
      searchModes = props.searchModeOptions?.map((option) => option.value);
    }

    for (const mode of searchModes) {
      if (hasFilter(mode)) {
        searchMode.value = mode;
        localSearchValue.value = props.filtersManager.filters.get(mode).value;

        break;
      }
    }
  },
);
</script>

<style scoped></style>
