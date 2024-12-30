<template>
  <dynamic-filter-config-view>
      <template #activator>
        <wt-chip>
          label

          <wt-tooltip>
            <template #activator>
              <wt-icon-btn
                icon="info"
              />
            </template>

            <template #default>
              <dynamic-filter-preview-info
                :name="props.filter.name || 'name goes here'"
                :value="props.filter.value"
              />
            </template>
          </wt-tooltip>

          <wt-icon-action
            action="delete"
            @click="deleteFilter"
          />
        </wt-chip>
      </template>

      <template #default>
        <dynamic-filter-config-form
          :selected="filterConfig"
          @submit="updateFilter"
        />
      </template>
    </dynamic-filter-config-view>
</template>

<script lang="ts" setup>
import {computed, type Ref} from 'vue';
import WtTooltip from '../../../../../../../components/wt-tooltip/wt-tooltip.vue';
import DynamicFilterPreviewInfo from './dynamic-filter-preview-info.vue';
import WtIconBtn from '../../../../../../../components/wt-icon-btn/wt-icon-btn.vue';
import DynamicFilterConfigView from '../config/dynamic-filter-config-view.vue';
import WtChip from '../../../../../../../components/wt-chip/wt-chip.vue';
import DynamicFilterConfigForm from '../config/dynamic-filter-config-form.vue';
import type {FilterSetupData, FilterType} from "../../../types/FilterSetup.type.ts";
import WtIconAction from "../../../../../../../components/wt-icon-action/wt-icon-action.vue";

interface Props {
  filter: IFilter;
  filterType: FilterType;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'filter:update': [FilterSetupData];
  'filter:delete': [FilterName];
}>();

const filterConfig: Ref<FilterSetupData> = computed(() => {
  const config = {
    name: props.filter.name,
    type: props.filterType,
    defaultValue: props.filter.value,
  };

  return config;
});

const updateFilter = (payload: FilterSetupData) => {
  emit('filter:update', payload);
};

const deleteFilter = () => {
  emit('filter:delete', props.filter.name);
};
</script>

<style lang="scss" scoped>

</style>
