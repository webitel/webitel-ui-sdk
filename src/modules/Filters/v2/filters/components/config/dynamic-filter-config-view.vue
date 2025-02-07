<template>
  <div class="dynamic-filter-config-view">
    <wt-tooltip :triggers="['click']">
      <template #activator="slotScope">
        <slot
          name="activator"
          v-bind="slotScope"
        />
      </template>
      <template #default="slotScope">
        <slot
          name="content"
          v-bind="slotScope"
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

import WtTooltip from '../../../../../../components/wt-tooltip/wt-tooltip.vue';
</script>

<style lang="scss" scoped></style>
