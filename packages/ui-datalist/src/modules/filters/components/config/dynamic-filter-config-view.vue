<template>
  <div class="dynamic-filter-config-view">
    <template v-if="isStaticMode">
      <slot name="content" />
    </template>

    <wt-tooltip
      v-else
      :disable-click-away="props.disableClickAway"
      :disabled="props.disabled"
      :triggers="['click']"
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
import { inject } from 'vue';

interface Props {
  disabled?: boolean;
  disableClickAway?: boolean;
}

const props = defineProps<Props>();

const isStaticMode = inject('isStaticMode');

</script>

<style scoped></style>
