<template>
  <wt-collapsible-search-bar
    v-if="collapsible"
    :placeholder="placeholder || t('reusable.search')"
    :value="localSearchValue"
    @input="inputValue"
    @search="handleSearch"
  />
  <wt-search-bar
    v-else
    :placeholder="placeholder || t('reusable.search')"
    :search-mode="searchMode"
    :search-mode-options="searchModeOptions"
    :value="localSearchValue"
    @input="inputValue"
    @search="handleSearch"
    @update:search-mode="updateSearchMode"
  />
</template>

<script lang="ts" setup>
import {
	WtCollapsibleSearchBar,
	WtSearchBar,
} from '@webitel/ui-sdk/components';
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
	/**
	 * @description
	 * collapses the field to a magnifier button while it is empty and not focused.
	 * Search modes are not supported then.
	 */
	collapsible?: boolean;
	/**
	 * @description
	 * "Search" by default
	 */
	placeholder?: string;
}>();

const defaultSearchName = props.singleSearchName || 'search';

const searchMode = defineModel<string>('searchMode');

const emit = defineEmits<{
	'filter:add': [
		FilterInitParams,
	];
	'filter:update': [
		FilterInitParams,
	];
	'filter:delete': [
		{
			name: FilterName;
		},
	];
}>();

const { t } = useI18n();

const localSearchValue = ref('');

const hasFilter = (filterName = searchMode.value ?? '') => {
	return props.filtersManager.filters.has(filterName);
};
const addFilter = (filterInitParams: FilterInitParams) => {
	return emit('filter:add', filterInitParams);
};
const updateFilter = (filterInitParams: FilterInitParams) => {
	return emit('filter:update', filterInitParams);
};
const deleteFilter = ({ name }: { name: FilterName }) => {
	return emit('filter:delete', {
		name,
	});
};

const restoreLocalSearchValue = (searchMode: string) => {
	const restoredValue = props.filtersManager.filters.get(searchMode)?.value;
	localSearchValue.value =
		typeof restoredValue === 'string' ? restoredValue : '';
	return localSearchValue.value;
};

const hasSearchModes = computed(() => {
	return props.searchModeOptions && props.searchModeOptions.length > 1;
});

const currentSearchName = computed(() => {
	if (hasSearchModes.value) {
		return searchMode.value ?? defaultSearchName;
	}

	return defaultSearchName;
});

/**
 * @description
 * a whitespace-only value is no search
 */
const isBlank = (value: string) => value.trim() === '';

const inputValue = (value: string) => {
	localSearchValue.value = value;

	if (isBlank(value) && hasFilter(currentSearchName.value)) {
		deleteFilter({
			name: currentSearchName.value,
		});
	}
	if (value === '' && hasSearchModes.value) {
		searchMode.value = props.searchModeOptions?.[0]?.value;
	}
};

const handleSearch = (value = localSearchValue.value) => {
	if (!isBlank(value)) {
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

const updateSearchMode = (nextSearchMode: string | object) => {
	if (hasFilter(currentSearchName.value)) {
		deleteFilter({
			name: currentSearchName.value,
		});
	}
	localSearchValue.value = '';
	searchMode.value =
		typeof nextSearchMode === 'string'
			? nextSearchMode
			: (nextSearchMode as DynamicFilterSearchSearchModeOption).value;
};

const initialize = () => {
	if (!hasSearchModes.value) return;

	if (!searchMode.value) {
		searchMode.value = props.searchModeOptions?.[0]?.value;
	}
	restoreLocalSearchValue(searchMode.value ?? defaultSearchName);
};
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

		const searchModes = hasSearchModes.value
			? (props.searchModeOptions?.map((option) => option.value) ?? [])
			: [
					defaultSearchName,
				];

		if (hasSearchModes.value && !searchMode.value) {
			searchMode.value = searchModes[0] || '';
		}

		for (const mode of searchModes) {
			if (hasFilter(mode)) {
				if (hasSearchModes.value) {
					searchMode.value = mode;
				}
				restoreLocalSearchValue(mode);
				break;
			}
		}
	},
	{
		immediate: true,
	},
);
</script>

<style scoped></style>
