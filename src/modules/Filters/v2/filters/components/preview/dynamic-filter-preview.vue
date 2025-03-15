<template>
  <dynamic-filter-config-view
    :disabled="dummy"
  >
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

            <template>
              <slot name="info" />
            </template>
          </dynamic-filter-preview-info>
        </template>
      </wt-tooltip>
    </template>

    <template #content="slotScope">
      <slot
        name="form"
        v-bind="slotScope"
      />
    </template>
  </dynamic-filter-config-view>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import WtChip from '../../../../../../components/wt-chip/wt-chip.vue';
import WtIconBtn from '../../../../../../components/wt-icon-btn/wt-icon-btn.vue';
import WtTooltip from '../../../../../../components/wt-tooltip/wt-tooltip.vue';
import type { IFilter } from '../../types/Filter';
import DynamicFilterConfigView from '../config/dynamic-filter-config-view.vue';
import DynamicFilterPreviewInfo from './dynamic-filter-preview-info.vue';

interface Props {
  filter: IFilter;
  dummy?: boolean /* https://webitel.atlassian.net/browse/WTEL-6308?focusedCommentId=657415 */;
}

const { t } = useI18n();

const props = defineProps<Props>();

const emit = defineEmits<{
  'delete:filter': [IFilter];
}>();

const deleteFilter = () => {
  emit('delete:filter', props.filter);
};
</script>

<style lang="scss" scoped>
.wt-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2xs);
}
</style>
