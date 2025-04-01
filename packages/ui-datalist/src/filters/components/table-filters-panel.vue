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
          v-for="(filter) of appliedFilters"
          :key="filter.name"
          :filter="filter"
          disable-click-away
          @delete:filter="deleteFilter(filter)"
        >
          <template #form="{ hide }">
            <dynamic-filter-config-form
              :options="getAppliedFiltersOptions(filter)"
              :filter="filter"
              @cancel="() => hide()"
              @submit="(data) => setFilterWrapperAction(data, updateAppliedFilter, hide)"
            >
              <template #value-input="{ filterName, filterValue, onValueChange, onValueInvalidChange }">
                <component
                  :is="FilterOptionToValueComponentMap[filterName]"
                  :key="filterName"
                  :model-value="filterValue"
                  @update:model-value="onValueChange"
                  @update:invalid="onValueInvalidChange"
                />
              </template>
            </dynamic-filter-config-form>
          </template>

          <template #info>
            <component
              :is="FilterOptionToPreviewComponentMap[filter.name]"
              :value="filter.value"
            >
            </component>
          </template>
        </dynamic-filter-preview>

        <dynamic-filter-add-action
          :show-label="!appliedFilters.length"
        >
          <template #form="{ hide }">
            <dynamic-filter-config-form
              :options="unappliedFilters"
              @cancel="() => hide()"
              @submit="(data) => setFilterWrapperAction(data, applyFilter, hide)"
            >
              <template #value-input="{ filterName, filterValue, onValueChange, onValueInvalidChange }">
                <component
                  :is="FilterOptionToValueComponentMap[filterName]"
                  :key="filterName"
                  :model-value="filterValue"
                  @update:model-value="onValueChange"
                  @update:invalid="onValueInvalidChange"
                />
              </template>
            </dynamic-filter-config-form>
          </template>
        </dynamic-filter-add-action>
      </template>

      <template #actions>
        <apply-preset-action
          :namespace="namespace"
          :use-presets-store="createFilterPresetsStore(namespace)"
          @apply="applyPreset"
        />

        <save-preset-action
          v-if="enablePresets"
          :namespace="namespace"
          :filters-manager="props.filtersManager"
        />

        <wt-icon-action
          action="clear"
          @click="resetFilters"
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
import { computed } from 'vue';

import {ApplyPresetAction,SavePresetAction} from "../../filter-presets";
import { FilterOption } from "../enums/FilterOption";
import {IFilter} from "../types/Filter";
import {IFiltersManager} from "../types/FiltersManager";
import DynamicFilterConfigForm from './config/dynamic-filter-config-form.vue';
import DynamicFilterAddAction from './dynamic-filter-add-action.vue';
import DynamicFilterPanelWrapper from "./dynamic-filter-panel-wrapper.vue";
import {FilterOptionToPreviewComponentMap} from "./filter-options";
import DynamicFilterPreview from './preview/dynamic-filter-preview.vue';

type Props = {
  filterOptions: FilterOption[];
  /**
   * Looks like a anti-pattern, but save-preset component needs to
   */
  filtersManager: IFiltersManager;
  /**
   *
   */
  excludedFilters?: FilterOption[];
  presetNamespace?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'filter:add': [];
  'filter:update': [];
  'filter:delete': [];
  'filter:reset-all': [];
  'preset:add': [];

  'a'
  hide: [];
}>();

const availableFilterOptions = computed(() => {
  return props.filterOptions.filter((opt) => {
    return opt;
    // return !props.filtersManager.appliedFilters.some((filter) => {
    //   return filter.name === opt.name;
    // });
  })
});

const enablePresets = computed(() => !!props.presetNamespace);

const deleteFilter = (filter: IFilter) => {
  emit('delete:filter', filter);
};

const resetFilters = () => {
  emit('reset:filters');
};
</script>

<style scoped></style>
