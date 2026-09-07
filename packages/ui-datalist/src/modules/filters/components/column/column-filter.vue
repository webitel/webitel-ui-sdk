<template>
  <dynamic-filter-config-form
    class="column-filter"
    :filter="filter"
    :filter-config="filterConfig"
    column-mode
    @cancel="emit('close')"
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

/**
 * Column header filter body for the `wt-table` `column-filter` slot.
 * Resolves the filter from `header.filter`, reads the applied value from the filters manager and,
 * like the panel, only emits — the app binds `add/update/delete:filter` to its table store:
 * Save → `add:filter` / `update:filter`; cleared value (field's "x") + Save → `delete:filter`; all followed by `close`.
 * Values stay local to the form until Save, so the table doesn't reload on every click.
 *
 * [WTEL-7727](https://webitel.atlassian.net/browse/WTEL-7727)
 */
const props = defineProps<{
	/** header with a `filter` name */
	header: DatalistTableHeader;
	filtersManager: IFiltersManager;
	/** the page's filter definitions; a configured one is reused for the matching header */
	filterOptions?: FilterConfigDefinition[];
	/** custom (type extension) fields the table can filter by; matched to the header by field id */
	filterableExtensionFields?: DataField[];
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

const onSubmit = ({ value }: FilterInitParams) => {
	onValueChange(value);
	emit('close');
};
</script>
