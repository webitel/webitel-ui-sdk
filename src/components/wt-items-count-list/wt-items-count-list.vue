<template>
  <div class="wt-items-count-list">
    <wt-tooltip
      v-if="props.list.length"
      :triggers="props.triggers"
    >
      <template #activator>
        <wt-chip class="wt-items-count-list__count">
          +{{ props.list.length }}
        </wt-chip>
      </template>

      <p
        v-for="item of list"
        :key="item"
      >
        {{ item }}
      </p>
    </wt-tooltip>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

import WtChip from '../wt-chip/wt-chip.vue';
import WtTooltip from '../wt-tooltip/wt-tooltip.vue';

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  triggers: {
    type: Array,
    default: () => ['click'],
  },
});
</script>

<style scoped lang="scss">
.wt-items-count-list {
  cursor: pointer;
  &__count {
    text-wrap: nowrap;
  }
}
</style>
