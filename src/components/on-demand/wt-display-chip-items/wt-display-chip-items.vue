<template>
  <div class="wt-display-chip-items">
    <p v-if="props.title">{{ title }}:</p>

    <slot v-if="!props.hideFirstItem" name="first-item">
      {{ displayText(firstItemName) }}
    </slot>

      <wt-popover>
        <template #activator="{ toggle }">
          <slot name="activator" :toggle="toggle">
            <div v-if="displayList.length" @click="toggle">
              <wt-chip>
                +{{ displayList.length }}
              </wt-chip>
            </div>
          </slot>
        </template>

        <template #default>
          <slot name="items" :items="displayList">
            <div
              v-for="({ name, id }) of displayList"
              :key="id"
            >
              {{ name }}
            </div>
          </slot>
        </template>
      </wt-popover>
  </div>
</template>

<script setup lang="ts">
import { WtChip,WtPopover } from '@webitel/ui-sdk/components';
import { computed } from 'vue';

import { displayText, EMPTY_SYMBOL } from '../../../utils';

interface Props {
  hideFirstItem?: boolean
  useEmptySymbol?: boolean
  title?: string
  items: unknown[]
}
const props = defineProps<Props>()

const firstItemName = computed(() => {
  if(!props.items?.length) return props.useEmptySymbol ? EMPTY_SYMBOL : '';

  return props.items[0]?.name
});

const displayList = computed(() => {
  if(!props.items?.length) return [];

  return !props.hideFirstItem ? props.items.slice(1) : props.items
})
</script>

<style lang="scss" scoped>
.wt-display-chip-items {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
