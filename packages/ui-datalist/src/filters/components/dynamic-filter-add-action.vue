<template>
  <dynamic-filter-config-view
    disable-click-away
    class="dynamic-filter-add-action"
  >
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
import { WtIconAction } from '@webitel/ui-sdk/src/components/index';
import { useI18n } from 'vue-i18n';

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
    justify-content: center;
    align-items: center;
    gap: var(--spacing-2xs);
    cursor: pointer;
    width: fit-content;
  }
}
</style>
