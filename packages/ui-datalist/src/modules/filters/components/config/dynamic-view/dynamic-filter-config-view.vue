<template>
  <div class="dynamic-filter-config-view">
    <wt-popover>
      <template #activator="{ toggle }">
        <slot
          name="activator"
          v-bind="{ toggle, disabled: props.disabled }"
        />
      </template>

      <template #default="{ hide }">
        <slot
          name="content"
          v-bind="{ hide }"
        />
      </template>
    </wt-popover>
  </div>
</template>

<script lang="ts" setup>
/**
 * this component should only be used for config view representation: tooltip/popup/etc,
 * and their styling
 */
import { WtPopover } from '@webitel/ui-sdk/components';

interface Props {
  disabled?: boolean;
  disableClickAway?: boolean;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
