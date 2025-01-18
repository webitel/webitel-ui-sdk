<template>
  <div class="wt-tree-line">
    <div class="wt-tree-line__icon-wrapper">
      <wt-icon
        v-for="(icon, index) in nestedIcons"
        :key="index"
        :icon="icon.icon"
        :class="{ hidden: icon.hidden }"
      />
      <wt-icon
        v-if="nestedLevel >= 1"
        :icon="lastChild ? 'tree-corner' : 'tree-cross'"
      />
      <wt-icon-btn
        v-if="data[childrenProp]"
        :icon="collapsed ? 'plus' : 'minus'"
        @click="collapsed = !collapsed"
      />
    </div>
    <div
      :class="{ active: isSelected }"
      class="wt-tree-line__label-wrapper"
    >
      <p
        class="wt-tree-line__label"
        @click="selectElement"
      >
        {{ label }}
      </p>
      <wt-icon
        v-if="isSelected"
        icon="chat-message-status-sent"
      />
    </div>
  </div>
  <wt-expand-transition v-show="!collapsed">
    <div>
      <wt-tree-line
        v-for="(child, index) in data[childrenProp]"
        :key="index"
        :model-value="modelValue"
        :data="child"
        :children-prop="childrenProp"
        :item-label="itemLabel"
        :item-data="itemData"
        :nested-level="nestedLevel + 1"
        :next-element="!!data[childrenProp][index + 1]"
        :nested-icons="displayIcons"
        :last-child="index === data[childrenProp].length - 1"
        @open-parent="onOpenParent"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </div>
  </wt-expand-transition>
</template>

<script setup lang="ts">
import deepEqual from 'deep-equal';
import { computed, onMounted, ref, watch } from 'vue';

import WtExpandTransition from '../transitions/wt-expand-transition.vue';
import type { WtTreeNestedIcons } from './types/wt-tree-nested-icons.ts';

const emit = defineEmits<{
  (e: 'openParent'): void;
  (e: 'update:modelValue', value: any): void;
}>();

const props = withDefaults(
  defineProps<{
    modelValue: null | any;
    data: any;
    itemLabel?: string | undefined;
    itemData?: string | undefined;
    childrenProp?: string;
    nestedLevel?: number;
    lastChild?: boolean;
    nestedIcons?: WtTreeNestedIcons[];
    nextElement?: boolean;
    /**
     * 'It's a key in data object, which contains field what display searched elements. By this field, table will be opened to elements with this field value. '
     */
    searchedProp?: string;
  }>(),
  {
    nestedLevel: 0,
    childrenProp: 'children',
    lastChild: false,
    nextElement: false,
    searchedProp: 'searched',
  },
);

const label = computed(() =>
  props.itemLabel ? props.data[props.itemLabel] : props.data,
);

const displayIcons = computed(() => {
  const icons = props.nestedIcons ? [...props.nestedIcons] : [];

  if (props.nestedLevel === 0) {
    return icons;
  }

  if (props.nextElement) {
    icons.push({
      icon: 'tree-line',
      hidden: false,
    });
  } else {
    icons.push({
      icon: 'tree-line',
      hidden: true,
    });
  }

  return icons;
});

const isSelected = computed(() => {
  if (props.itemData) {
    return props.data[props.itemData] === props.modelValue;
  }

  return deepEqual(props.modelValue, props.data);
});

const selectElement = () => {
  if (props.data[props.childrenProp]?.length) {
    return;
  }

  emit(
    'update:modelValue',
    props.itemData ? props.data[props.itemData] : props.data,
  );
};

const collapsed = ref(true);
const openParent = () => {
  if (props.nestedLevel > 0) {
    emit('openParent');
  }
};

const onOpenParent = () => {
  collapsed.value = false;
  openParent();
};

const hasSearchedElement = (data: Record<string, any>, nestedLevel = 0) => {
  // Check if the object itself has searched
  if (data[props.searchedProp] && nestedLevel) {
    return true;
  }

  // Check if the object has children
  if (Array.isArray(data[props.childrenProp])) {
    // Iterate through the array
    for (const child of data[props.childrenProp]) {
      // Recursively check nested objects
      if (hasSearchedElement(child, nestedLevel + 1)) {
        return true;
      }
    }
  }

  // If no match is found, return false
  return false;
};

onMounted(() => {
  if (isSelected.value) {
    openParent();
  }

  if (props.data[props.searchedProp]) {
    openParent();
  }
});

watch(
  () => props.modelValue,
  () => {
    if (isSelected.value) {
      openParent();
    }
  },
);
</script>

<style lang="scss">
@use '../../css/main.scss' as *;
@use './variables.scss' as *;

.wt-tree-line {
  display: flex;
  align-items: flex-start;

  &__icon-wrapper {
    display: flex;
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

  &__label {
    @extend %typo-body-1;
    text-wrap: nowrap;
  }
}
</style>
