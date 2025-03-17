<template>
  <div class="wt-tree">
    <div
      v-if="mode === WtTreeMode.Tree"
      class="wt-tree__content"
    >
      <wt-tree-line
        v-for="(item, index) in data"
        :key="index"
        :model-value="modelValue"
        :item-label="itemLabel"
        :item-data="itemData"
        :data="item"
        :children-prop="childrenProp"
        :multiple="multiple"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </div>
    <div
      v-if="mode === WtTreeMode.List"
      class="wt-tree__list-content"
    >
      <span
        v-for="(item, index) in allData"
        :key="index"
        class="wt-tree__label-wrapper"
        :class="{ active: compareSelectElement(item) }"
      >
        <p
          class="wt-tree__label"
          @click="selectElement(item)"
        >
          {{ itemLabel ? item[itemLabel] : item }}
        </p>
        <wt-icon
          v-if="compareSelectElement(item)"
          icon="chat-message-status-sent"
          class="wt-tree__label-icon"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import deepEqual from 'deep-equal';
import { computed } from 'vue';

import WtTreeLine from '../wt-tree-line/wt-tree-line.vue';
import { WtTreeMode } from './types/WtTreeMode';

const props = withDefaults(
  defineProps<{
    /**
     * Selected element, it can be an object or a string, related to itemData props
     */
    modelValue?: null | any;
    /**
     * You need to pass an array of objects that will be displayed in the tree
     */
    data: any[];
    /**
     * You can pass the name of the property that will be used as the label of the selected item
     */
    itemLabel?: string;
    /**
     * You can pass the name of the property that will be used as the value of the selected item
     */
    itemData?: string;
    /**
     * Select mode for display tree data
     * @example 'tree', 'list'
     */
    mode?: string;
    /**
     * You can pass the name of the property that will be used for getting children elements
     */
    childrenProp?: string;
    multiple?: boolean;
  }>(),
  {
    childrenProp: 'children',
    mode: WtTreeMode.Tree,
  },
);

const emit = defineEmits<{
  (e: 'select', data: any): void;
  (e: 'update:modelValue', value: any): void;
}>();

const allData = computed(() => {
  const result = [];

  const getNestedItems = (item: any) => {
    result.push(item);

    if (item[props.childrenProp]) {
      item[props.childrenProp].forEach((child: any) => {
        getNestedItems(child);
      });
    }
  };

  props.data.forEach((item) => {
    getNestedItems(item);
  });

  return result;
});

const selectElement = (item: any) => {
  emit('update:modelValue', props.itemData ? item[props.itemData] : item);
};

const compareSelectElement = (item: any) => {
  if (props.itemData) {
    return item[props.itemData] === props.modelValue;
  }

  return deepEqual(props.modelValue, item);
};
</script>

<style lang="scss">
@use '@webitel/styleguide/scroll' as *;

.wt-tree {
  padding: var(--spacing-sm);
  background: var(--content-wrapper-color);
  border-radius: var(--border-radius);
  overflow: auto;

  &__content {
    @extend %wt-scrollbar;

    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    padding-right: var(--spacing-2xs);
  }

  &__list-content {
    @extend %wt-scrollbar;

    display: flex;
    flex-direction: column;
    padding-right: var(--spacing-2xs);
    gap: var(--spacing-xs);
    overflow: auto;
    align-items: flex-start;
    height: 100%;
  }

  &__label-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 var(--spacing-2xs);
    border-radius: var(--border-radius);
    color: var(--wt-tree-item-on);
    transition: var(--transition);

    &:hover {
      background: var(--wt-tree-item-hover);
      color: var(--wt-tree-item-hover-on);
    }

    &.active {
      background: var(--wt-tree-item-active);
      color: var(--wt-tree-item-active-on);
    }
  }

  &__label-icon {
    flex-shrink: 0;
  }
}
</style>
