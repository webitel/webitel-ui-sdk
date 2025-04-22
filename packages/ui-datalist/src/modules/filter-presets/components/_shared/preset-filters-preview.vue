<template>
  <div class="save-preset-filters-preview">
    <wt-label>
      {{ t('webitelUI.filters.filterName') }}
    </wt-label>
    <dynamic-filter-panel-wrapper size="sm">
      <template #filters>
        <dynamic-filter-preview
          v-for="({ filter, filterConfig }) of appliedFilterToFilterConfigMappings"
          :key="filter.name"
          :filter="filter"
          :filter-config="filterConfig"
          readonly
        />
      </template>
    </dynamic-filter-panel-wrapper>
  </div>
</template>

<script setup lang="ts">
import { WtLabel } from '@webitel/ui-sdk/components';
import { useI18n } from 'vue-i18n';

import type {IFiltersManager} from '../../../filters';
import DynamicFilterPanelWrapper from '../../../filters/components/dynamic-filter-panel-wrapper.vue';
import DynamicFilterPreview from '../../../filters/components/preview/dynamic-filter-preview.vue';
import { useFilterConfigsToolkit } from "../../../filters/composables/useFilterConfigsToolkit";
import {TFilterConfig} from "../../../filters/modules/filterConfig/classes/FilterConfig";

const props = defineProps<{
  filtersManager: IFiltersManager;
  filterConfigs: TFilterConfig[];
}>();

const { t } = useI18n();

const {
  appliedFilterToFilterConfigMappings,
} = useFilterConfigsToolkit({
  filterOptions: props.filterConfigs,
  filtersManager: props.filtersManager,
});
</script>

<style scoped></style>
