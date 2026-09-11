<template>
  <column-filter-preview
    v-if="!formView"
    :header="header"
    :filters-manager="filtersManager"
    :filter-options="filterOptions"
    :filterable-extension-fields="filterableExtensionFields"
  />
  <dynamic-filter-config-form
    v-else
    class="column-filter"
    :filter="filter"
    :filter-config="filterConfig"
    column-mode
    @cancel="close"
    @submit="onSubmit"
  />
</template>

<script lang="ts" setup>
import type { DataField } from '@webitel/api-services/gen/models';

import type { DatalistTableHeader } from '../../../types/tableStore.types';
import type { FilterInitParams } from '../../classes/Filter';
import type { IFiltersManager } from '../../classes/FiltersManager';
import { useColumnFilter } from '../../composables/useColumnFilter';
import { useFilterValueChange } from '../../composables/useFilterValueChange';
import type { FilterConfigDefinition } from '../../modules/filterConfig/types/FilterConfigDefinition';
import DynamicFilterConfigForm from '../config/dynamic-view/dynamic-filter-config-form.vue';
import type { ColumnFilterEmits } from '../types/Filter.types';
import ColumnFilterPreview from './column-filter-preview.vue';

/**
 * Column header filter for the `wt-table` `column-filter` slot, bound with `v-bind="scope"`:
 * `formView: true` renders the value form in the filter popover, `false` the hover card.
 * Resolves the filter from `header.filter`, reads the applied value from the filters manager and,
 * like the panel, only emits — the app binds `add/update/delete:filter` to its table store:
 * Apply → `add:filter` / `update:filter`; Clear then Apply → `delete:filter`; then the popover is closed via `hide`.
 * Values stay local to the form until Apply, so the table doesn't reload on every click.
 *
 * [WTEL-7727](https://webitel.atlassian.net/browse/WTEL-7727)
 */
const props = defineProps<{
	header: DatalistTableHeader;
	filtersManager: IFiltersManager;
	filterOptions?: FilterConfigDefinition[];
	filterableExtensionFields?: DataField[];
	formView?: boolean;
	index?: number;
	hide?: () => void;
}>();

const emit = defineEmits<ColumnFilterEmits>();

const { filterConfig, filter } = useColumnFilter({
	header: () => props.header,
	filtersManager: () => props.filtersManager,
	filterOptions: () => props.filterOptions ?? [],
	filterableExtensionFields: () => props.filterableExtensionFields ?? [],
});

const { onValueChange } = useFilterValueChange({
	filterConfig,
	filter,
	emit,
});

const close = () => {
	props.hide?.();
	emit('close');
};

const onSubmit = ({ value }: FilterInitParams) => {
	onValueChange(value);
	close();
};
</script>
