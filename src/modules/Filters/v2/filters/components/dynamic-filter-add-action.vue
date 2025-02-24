<template>
  <dynamic-filter-config-view class="dynamic-filter-add-action">
    <template #activator>
      <div class="dynamic-filter-add-action-wrapper">
        <p v-if="props.showLabel">
          {{ t('webitelUI.filters.addFilter') }}
        </p>
        <wt-icon-action action="add-filter" />
      </div>
    </template>

    <template #content="slotScope">
      <slot
        name="form"
        v-bind="slotScope"
      >
        filter form should be here
      </slot>
    </template>
  </dynamic-filter-config-view>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import WtIconAction from '../../../../../components/wt-icon-action/wt-icon-action.vue';
import DynamicFilterConfigView from './config/dynamic-filter-config-view.vue';

interface Props {
  showLabel?: boolean;
}

const props = defineProps<Props>();

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.dynamic-filter-add-action {
  display: flex;

  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    cursor: pointer;
    gap: var(--spacing-2xs);
  }
}
</style>
