<template>
  <div class="wt-tree">
    <div class="wt-tree__content">
      <wt-tree-line
        v-for="(item, index) in data"
        :model-value="modelValue"
        :item-label="itemLabel"
        :item-data="itemData"
        :key="index"
        :data="item"
        :children="children"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import WtTreeLine from "../wt-tree-line/wt-tree-line.vue";

withDefaults(defineProps<{
  modelValue: null | any,
  data: any[],
  itemLabel?: string,
  itemData?: string,
  children?: string
}>(), {
  children: 'children'
})

const emit = defineEmits<{
  (e: 'select', data: any): void
  (e: 'update:modelValue', value: any): void
}>();
</script>

<style lang="scss">
@import '../../css/main.scss';

.wt-tree {
  padding: var(--spacing-sm);
  background: var(--content-wrapper-color);
  border-radius: var(--border-radius);

  &__content {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    @extend %wt-scrollbar;
  }
}
</style>
