<template>
  <dynamic-filter-config-view>
    <template #activator>
      <wt-chip>
        label

        <wt-tooltip>
          <template #activator>
            <wt-icon-btn icon="info" />
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

    <template #content>
      <slot name="form" />
    </template>
  </dynamic-filter-config-view>
</template>

<script lang="ts" setup>
import { computed, type Ref } from 'vue';
import WtTooltip from '../../../../../../../components/wt-tooltip/wt-tooltip.vue';
import DynamicFilterPreviewInfo from './dynamic-filter-preview-info.vue';
import WtIconBtn from '../../../../../../../components/wt-icon-btn/wt-icon-btn.vue';
import DynamicFilterConfigView from '../config/dynamic-filter-config-view.vue';
import WtChip from '../../../../../../../components/wt-chip/wt-chip.vue';
import WtIconAction from '../../../../../../../components/wt-icon-action/wt-icon-action.vue';
import type { FilterName, IFilter } from '../../../types/Filter.types.ts';

interface Props {
  filter: IFilter;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'delete:filter': [];
}>();

const deleteFilter = () => {
  emit('delete:filter');
};
</script>

<style lang="scss" scoped></style>
