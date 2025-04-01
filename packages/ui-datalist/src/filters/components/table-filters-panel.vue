<template>
  <section class="the-history-filters">
    <dynamic-filter-panel-wrapper>
      <template #filters>
        <!--        WTF? -  /* https://webitel.atlassian.net/browse/WTEL-6308?focusedCommentId=657415 */ -->
        <dynamic-filter-preview
          v-if="!hasCreatedAtFromFilter"
          :filter="defaultCreatedAtFromFilterDataPreview"
          dummy
        >
          <template #info>
            <component
              :is="FilterOptionToPreviewComponentMap[FilterOption.CreatedAtFrom]"
              :value="defaultCreatedAtFromFilterDataPreview.value"
            />
          </template>
        </dynamic-filter-preview>

        <dynamic-filter-preview
          v-for="(filter) of appliedFilters"
          :key="filter.name"
          :filter="filter"
          disable-click-away
          @delete:filter="deleteAppliedFilter($event.name)"
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
          :namespace="namespace"
          :filters-manager="filtersManager"
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
  </section>
</template>

<script lang="ts" setup>
import { FilterOption } from "../enums/FilterOption";
import {IFilter} from "../types/Filter";
import DynamicFilterConfigForm from './config/dynamic-filter-config-form.vue';
import DynamicFilterAddAction from './dynamic-filter-add-action.vue';
import DynamicFilterPreview from './preview/dynamic-filter-preview.vue';

type Props = {
  filterOptions: FilterOption[];
  filtersList: IFilter[];
  presetNamespace: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'add:filter': [];
  'update:filter': [];
  'delete:filter': [];
  'reset:filters': [];
  hide: [];
}>();
</script>

<style scoped></style>
