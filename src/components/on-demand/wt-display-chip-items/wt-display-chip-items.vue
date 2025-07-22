<template>
  <div class="wt-display-chip-items">
    <p v-if="props.title">{{ title }}:</p>

    <slot name="first-item">
      {{ displayText(firstItemName) }}
    </slot>

    <slot name="items">
      <wt-popover
        v-if="displayList.length"
      >
        <template #activator="{ toggle }">
          <div @click="toggle">
            <wt-chip>
              +{{ displayList.length }}
            </wt-chip>
          </div>
        </template>

        <template #default>
          <div
            v-for="({ name, id }) of displayList"
            :key="id"
          >
            {{ name }}
          </div>
        </template>
      </wt-popover>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { displayText, EMPTY_SYMBOL } from '../../../utils';

interface Props {
  title?: string
  items: unknown[]
}
const props = defineProps<Props>()

const firstItemName = computed(() => {
  if(!props.items?.length) return EMPTY_SYMBOL;

  return props.items[0]?.name
});

const displayList = computed(() => {
  if(!props.items?.length) return [];

  return props.items.slice(1);
})
</script>

<style lang="scss" scoped>
.wt-display-chip-items {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
