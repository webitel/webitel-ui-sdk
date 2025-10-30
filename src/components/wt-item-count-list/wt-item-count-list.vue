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
      <slot name="list">
        <p
          v-for="item of list"
          :key="item"
        >
          {{ item }}
        </p>
      </slot>
    </wt-tooltip>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

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
