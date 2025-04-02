<template>
  <dynamic-filter-config-view :disabled="dummy">
    <template #activator="{ visible: configFormVisible }">
      <wt-tooltip :disabled="configFormVisible">
        <template #activator>
          <wt-chip color="primary">
            {{ filter.label || t(`webitelUI.filters.${filter.name}`) }}
            <wt-icon-btn
              v-if="!dummy"
              icon="close--filled"
              size="sm"
              color="on-primary"
              @mousedown.stop="deleteFilter"
            />
          </wt-chip>
        </template>

        <template #default>
          <dynamic-filter-preview-info>
            <template #header>
              {{ t(`webitelUI.filters.${props.filter.name}`) }}
            </template>

            <template #default>
              <slot name="info">
                <component
                  :is="FilterOptionToPreviewComponentMap[filter.name]"
                  :value="filter.value"
                />
              </slot>
            </template>
          </dynamic-filter-preview-info>
        </template>
      </wt-tooltip>
    </template>

    <template #content="slotScope">
      <slot
        name="form"
        v-bind="slotScope"
      >
        <dynamic-filter-config-form
          :filter="filter"
          @cancel="() => slotScope.hide()"
          @submit="(payload) => submitFilterChange(payload) && slotScope.hide()"
        />
      </slot>
    </template>
  </dynamic-filter-config-view>
</template>

<script lang="ts" setup>
import { WtChip } from '@webitel/ui-sdk/components';
import { WtIconBtn } from '@webitel/ui-sdk/components';
import { WtTooltip } from '@webitel/ui-sdk/components';
import { useI18n } from 'vue-i18n';

import type {FilterInitParams, IFilter} from '../../types/Filter';
import DynamicFilterConfigForm from "../config/dynamic-filter-config-form.vue";
import DynamicFilterConfigView from '../config/dynamic-filter-config-view.vue';
import {FilterOptionToPreviewComponentMap} from "../filter-options";
import DynamicFilterPreviewInfo from './dynamic-filter-preview-info.vue';

interface Props {
  filter: IFilter;
  dummy?: boolean /* https://webitel.atlassian.net/browse/WTEL-6308?focusedCommentId=657415 */;
}

const { t } = useI18n();

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:filter': [IFilter];
  'delete:filter': [IFilter];
}>();

const deleteFilter = () => {
  emit('delete:filter', props.filter);
};

const submitFilterChange = (filter: FilterInitParams) => {
  emit('update:filter', filter);
};
</script>

<style lang="scss" scoped>
.wt-chip {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-2xs);
}
</style>
