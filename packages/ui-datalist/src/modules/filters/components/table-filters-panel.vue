<template>
  <dynamic-filter-panel-wrapper>
    <template #filters>
      <dynamic-filter-preview
        v-for="({ filter, filterConfig }) of appliedFilterToFilterConfigMappings"
        :key="filter.name"
        :filter="filter"
        :filter-config="filterConfig"
        disable-click-away
        @update:filter="emit('filter:update', $event)"
        @delete:filter="emit('filter:delete', filter)"
      />

      <dynamic-filter-add-action
        :filter-configs="unAppliedFiltersConfigs"
        :show-label="!appliedFilters.length"
        @add:filter="emit('filter:add', $event)"
      />
    </template>

    <template #actions>
      <div v-if="enablePresets">
        <apply-preset-action
          :filter-configs="filterConfigs"
          :namespace="props.presetNamespace"
          :use-presets-store="props.usePresetsStore"
          @apply="emit('preset:apply', $event)"
        />

        <save-preset-action
          :filter-configs="filterConfigs"
          :filters-included="filtersIncluded"
          :filters-manager="props.filtersManager"
          :namespace="props.presetNamespace"
        />

      </div>

      <wt-icon-action
        :disabled="!props.filtersManager.filters.size"
        action="clear"
        @click="emit('filter:reset-all')"
      />

      <wt-icon-action
        action="close"
        @click="emit('hide')"
      />
    </template>
  </dynamic-filter-panel-wrapper>
</template>

<script lang="ts" setup>
import { WtIconAction } from '@webitel/ui-sdk/components';
import { Store } from 'pinia';
import {computed} from 'vue';
import {WebitelProtoDataField} from "webitel-sdk";

import { ApplyPresetAction, SavePresetAction } from '../../filter-presets';
import {FilterData, IFilter} from "../classes/Filter";
import {IFiltersManager} from "../classes/FiltersManager";
import {useFilterConfigsToolkit} from "../composables/useFilterConfigsToolkit";
import {AnyFilterConfig} from "../modules/filterConfig/classes/FilterConfig";
import { FilterOption } from '../modules/filterConfig/enums/FilterOption';
import DynamicFilterAddAction from './dynamic-filter-add-action.vue';
import DynamicFilterPanelWrapper from './dynamic-filter-panel-wrapper.vue';
import DynamicFilterPreview from './preview/dynamic-filter-preview.vue';

type Props = {
  /**
   * @description
   * available filter options to set
   */
  filterOptions: (FilterOption | AnyFilterConfig)[];
  /**
   * @description
   * create local filters manager from snapshot
   * inside save-preset.vue
   */
  filtersManager: IFiltersManager;
  /**
   * @author @dlohvinov
   *
   * @implements
   * [WTEL-6702](https://webitel.atlassian.net/browse/WTEL-6702)
   *
   * @description
   * Decided to pass fields as a prop instead of converting them to
   * Props.filterOptions, because this functionality can be expanded to many
   * filter panels
   */
  filterableExtensionFields?: WebitelProtoDataField[];
  /**
   * @description
   * QueryPreset "section" field
   */
  presetNamespace?: string;
  /**
   * @author @dlohvinov
   *
   * @description
   * table store for operating with presets as dataList.
   * Seems to me like a bad idea, because apply-preset should not store
   * any data in a specific store – component state should be enough.
   * However as for now, there's no composable implementing this logic,
   * so store is used instead.
   *
   * TODO: https://github.com/webitel/webitel-ui-sdk/pull/551
   */
  usePresetsStore?: Store;
};

const props = defineProps<Props>();

/**
 * @author @dlohvinov
 *
 * @description
 * There are 2 reasons to use `add`/`update`/`delete` events
 * instead of mutate `props.filtersManager` directly:
 * 1. It's possible to add some custom logic on those event in parent component/store
 * 2. filtersManager shouldn't be passed here, it seems to me like an anti-pattern
 */
const emit = defineEmits<{
  'filter:add': [FilterData];
  'filter:update': [FilterData];
  'filter:delete': [IFilter];
  'filter:reset-all': [];
  /**
   * string == filtersManager.toString() snapshot
   */
  'preset:apply': [string];
  hide: [];
}>();

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

const enablePresets = computed(() => !!props.presetNamespace);
</script>

<style scoped></style>
