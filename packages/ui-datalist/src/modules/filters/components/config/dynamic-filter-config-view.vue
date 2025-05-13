<template>
  <div class="dynamic-filter-config-view">
    <wt-tooltip
      :triggers="['click']"
      :disabled="props.disabled"
      :disable-click-away="props.disableClickAway"
    >
      <template #activator="slotScope">
        <slot
          name="activator"
          v-bind="{ tooltipSlotScope: slotScope }"
        />
      </template>
      <template #default="slotScope">
        <slot
          name="content"
          v-bind="{ tooltipSlotScope: slotScope }"
        />
      </template>
    </wt-tooltip>
  </div>
</template>

<script lang="ts" setup>
/**
 * this component should only be used for config view representation: tooltip/popup/etc,
 * and their styling
 */

import { WtTooltip } from '@webitel/ui-sdk/components';

interface Props {
  disabled?: boolean;
  disableClickAway?: boolean;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
