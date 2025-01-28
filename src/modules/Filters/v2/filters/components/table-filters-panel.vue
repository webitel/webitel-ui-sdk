<template>
  <section class="table-filters-panel">
    <slot></slot>
    <div class="table-filters-panel-filters">
      <dynamic-filter-add-action>
        <template #form>
          <dynamic-filter-config-form
            :options="unappliedFilters"
            @submit="applyFilter"
          >
            <template
              #value-input="{
                filterName,
                filterValue,
                onValueChange,
                onValueInvalidChange,
              }"
            >
              <component
                :is="getFilterValueComponent(filterName)"
                :key="filterName"
                :model-value="filterValue"
                @update:model-value="onValueChange"
                @undate:invalid="onValueInvalidChange"
              />
            </template>
          </dynamic-filter-config-form>
        </template>
      </dynamic-filter-add-action>

      <dynamic-filter-preview
        v-for="filter of appliedFilters"
        :key="filter.name"
        :filter="filter"
        @delete:filter="deleteAppliedFilter($event.name)"
      >
        <template #form>
          <dynamic-filter-config-form
            :filter="filter"
            @submit="updateAppliedFilter"
          >
            <template
              #value-input="{
                filterName,
                filterValue,
                onValueChange,
                onValueInvalidChange,
              }"
            >
              <component
                :is="getFilterValueComponent(filterName)"
                :key="filterName"
                :model-value="filterValue"
                @update:model-value="onValueChange"
                @undate:invalid="onValueInvalidChange"
              />
            </template>
          </dynamic-filter-config-form>
        </template>
      </dynamic-filter-preview>
    </div>
    <div class="table-filters-panel-actions"></div>
  </section>
</template>

<script lang="ts" setup>
import DynamicFilterConfigForm from './dynamic/config/dynamic-filter-config-form.vue';
import DynamicFilterAddAction from './dynamic/dynamic-filter-add-action.vue';
import DynamicFilterPreview from './dynamic/preview/dynamic-filter-preview.vue';

interface Props {}

const props = defineProps<Props>();

const emit = defineEmits<{
  'add:filter': [];
  'update:filter': [];
  'delete:filter': [];
  'reset:filters': [];
  hide: [];
}>();
</script>

<style lang="scss" scoped>
.table-filters-panel {
}
</style>
