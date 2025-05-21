<template>
  <div class="table-filters-panel-v2">
    <dynamic-filter-preview-v2
      v-for="({ filter, filterConfig }) of appliedFilterToFilterConfigMappings"
      :key="filter.name"
      :filter="filter"
      :filter-config="filterConfig"
      :filter-configs="filterConfigs"
      disable-click-away
      @update:filter="emit('filter:update', $event);"
      @delete:filter="emit('filter:delete', filter)"
      @add:filter="emit('filter:add', $event)"
    />

    <wt-icon-action
      :disabled="!props.filtersManager.filters.size"
      action="clear"
      @click="emit('filter:reset-all')"
    />
  </div>

</template>
<script lang="ts" setup>

import { FilterOption } from '../modules/filterConfig/enums/FilterOption';
import { AnyFilterConfig } from '../modules/filterConfig';
import { IFiltersManager } from '../classes/FiltersManager';
import { WebitelProtoDataField } from 'webitel-sdk';
import { Store } from 'pinia';
import { FilterData, IFilter } from '../classes/Filter';
import { useFilterConfigsToolkit } from '../composables/useFilterConfigsToolkit';
import DynamicFilterPreviewV2 from './dynamic-filter-preview-v2.vue';
import DynamicFilterPanelWrapper from './dynamic-filter-panel-wrapper.vue';

type Props = {
  filterOptions: (FilterOption | AnyFilterConfig)[];
  filtersManager: IFiltersManager;
  filterableExtensionFields?: WebitelProtoDataField[];
  presetNamespace?: string;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  'filter:add': [FilterData]; ////?
  'filter:update': [FilterData];
  'filter:delete': [IFilter];
  'filter:reset-all': [];
  'preset:apply': [string];
  hide: [];
}>();

// function test(event) {
//   emit('filter:update', event);
//   console.log(event);
// }

const {
  filterConfigs,
  filtersIncluded,
  appliedFilters,
  appliedFilterToFilterConfigMappings,
  unAppliedFiltersConfigs,
} = useFilterConfigsToolkit({
  filterOptions: props.filterOptions,
  filtersManager: props.filtersManager,
  filterableExtensionFields: props.filterableExtensionFields,
});
</script>

<style lang="scss" scoped>
.table-filters-panel-v2 {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
