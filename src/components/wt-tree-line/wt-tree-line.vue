<template>
  <div class="wt-tree-line">
    <div class="wt-tree-line__icon-wrapper">
      <wt-icon v-for="(icon, index) in nestedIcons" :key="index" :icon="icon.icon" :class="{ 'hidden': icon.hidden }" />
      <wt-icon v-if="nestedLevel >= 1" :icon="lastChild ? 'tree-corner' : 'tree-cross'" />
      <wt-icon-btn v-if="data[children]" :icon="collapsed ? 'plus' : 'minus'" @click="collapsed = !collapsed"/>
    </div>
    <div :class="{ active: isSelected }" class="wt-tree-line__label-wrapper">
      <p
        class="wt-tree-line__label"
        @click="selectElement"
      >
        {{ label }}
      </p>
      <wt-icon v-if="isSelected" icon="chat-message-status-sent" />
    </div>
  </div>
  <wt-expansion-panel background="transparent" hide-title :collapsed="collapsed">
    <wt-tree-line
      v-for="(child, index) in data[children]"
      :model-value="modelValue"
      :key="index"
      :data="child"
      :children="children"
      :item-label="itemLabel"
      :item-data="itemData"
      :nested-level="nestedLevel + 1"
      :next-element="!!data[children][index+1]"
      :nested-icons="displayIcons"
      :last-child="index === data[children].length - 1"
      @openParent="onOpenParent"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </wt-expansion-panel>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import WtIconBtn from "../wt-icon-btn/wt-icon-btn.vue";
import WtExpansionPanel from "../wt-expansion-panel/wt-expansion-panel.vue";
import type { WtTreeNestedIcons } from "./types/wt-tree-nested-icons.ts";
import deepEqual from "deep-equal";

const emit = defineEmits<{
  (e: 'openParent'): void
  (e: 'update:modelValue', value: any): void
}>();

const props = withDefaults(defineProps<{
  modelValue: null | any,
  data: any,
  itemLabel?: string | undefined,
  itemData?: string | undefined,
  children?: string,
  nestedLevel?: number
  lastChild?: boolean
  nestedIcons?: WtTreeNestedIcons[]
  nextElement?: boolean
}>(), {
  nestedLevel: 0,
  children: 'children',
  lastChild: false,
  nextElement: false,
})

const label = computed(() => props.itemLabel ? props.data[props.itemLabel] : props.data)

const displayIcons = computed(() => {
  const icons = props.nestedIcons ? [...props.nestedIcons] : []

  if (props.nestedLevel === 0) {
    return icons
  }

  if (props.nextElement) {
    icons.push({
      icon: 'tree-line',
      hidden: false
    })
  } else {
    icons.push({
      icon: 'tree-line',
      hidden: true
    })
  }

  return icons
})

const isSelected = computed(() => {
  if (props.itemData) {
    return props.data[props.itemData] === props.modelValue
  }

  return deepEqual(props.modelValue, props.data)
})

const selectElement = () => {
  emit('update:modelValue', props.itemData ? props.data[props.itemData] : props.data)
}

const collapsed = ref(true)
const openParent = () => {
  if(props.nestedLevel > 0) {
    emit('openParent')
  }
}

const onOpenParent = () => {
  collapsed.value = false
  openParent()
}

onMounted(() => {
  if (isSelected.value) {
    openParent()
  }
})
</script>

<style lang="scss">
@import '../../css/main.scss';
@import './variables.scss';

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
