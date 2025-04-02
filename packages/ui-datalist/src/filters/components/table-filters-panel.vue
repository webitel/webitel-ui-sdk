<template>
  <dynamic-filter-panel-wrapper>
    <template #filters>
      <!--        WTF? -  /* https://webitel.atlassian.net/browse/WTEL-6308?focusedCommentId=657415 */ -->
      <!--TODO-->
      <!--        <dynamic-filter-preview-->
      <!--          v-if="!hasCreatedAtFromFilter"-->
      <!--          :filter="defaultCreatedAtFromFilterDataPreview"-->
      <!--          dummy-->
      <!--        >-->
      <!--          <template #info>-->
      <!--            <component-->
      <!--              :is="FilterOptionToPreviewComponentMap[FilterOption.CreatedAtFrom]"-->
      <!--              :value="defaultCreatedAtFromFilterDataPreview.value"-->
      <!--            />-->
      <!--          </template>-->
      <!--        </dynamic-filter-preview>-->

      <dynamic-filter-preview
        v-for="filter of appliedFilters"
        :key="filter.name"
        :filter="filter"
        disable-click-away
        @update:filter="emit('filter:update', $event)"
        @delete:filter="emit('filter:delete', filter)"
      />

      <dynamic-filter-add-action
        :show-label="!appliedFilters.length"
        :filter-options="availableFilterOptions"
        @add:filter="emit('filter:add', $event)"
      />
    </template>

    <template #actions>
      <apply-preset-action
        :namespace="props.presetNamespace"
        :use-presets-store="props.usePresetsStore"
        @apply="emit('preset:apply', $event)"
      />

      <save-preset-action
        v-if="enablePresets"
        :namespace="props.presetNamespace"
        :filters-manager="props.filtersManager"
      />

      <wt-icon-action
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
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { ApplyPresetAction, SavePresetAction } from '../../filter-presets';
import { FilterOption } from '../enums/FilterOption';
import { FilterData, IFilter } from '../types/Filter';
import { IFiltersManager } from '../types/FiltersManager';
import DynamicFilterAddAction from './dynamic-filter-add-action.vue';
import DynamicFilterPanelWrapper from './dynamic-filter-panel-wrapper.vue';
import DynamicFilterPreview from './preview/dynamic-filter-preview.vue';

type Props = {
  /**
   * @description
   * available filter options to set
   */
  filterOptions: FilterOption[];
  /**
   * @description
   * Looks like a anti-pattern, but save-preset.vue component needs filterManager
   */
  filtersManager: IFiltersManager;
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
  usePresetsStore: Store;
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

const { t } = useI18n();

const appliedFilters = computed(() => {
  return props.filtersManager.getFiltersList({
    include: props.filterOptions,
  });
});

/**
 * @description
 * available filters to add, with appliedFilters excluded
 */
const availableFilterOptions = computed(() => {
  return props.filterOptions
    .filter((opt) => {
      return appliedFilters.value.every((filter) => {
        return filter.name !== opt;
      });
    })
    .map((opt) => ({
      name: t(`webitelUI.filters.${opt}`),
      value: opt,
    }));
});

const enablePresets = computed(() => !!props.presetNamespace);
</script>

<style scoped></style>
