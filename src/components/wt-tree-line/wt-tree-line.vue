<template>
  <div class="wt-tree-line">
    <div class="wt-tree-line__icon-wrapper">
      <wt-icon v-for="n in countLines" :key="n" icon="tree-line" />
      <wt-icon v-if="nestedLevel >= 1" :icon="lastChild ? 'tree-corner' : 'tree-cross'" />
      <wt-icon-btn v-if="data[children]" :icon="collapsed ? 'plus' : 'minus'" @click="collapsed = !collapsed"/>
    </div>
    <p @click="selectElement" class="wt-tree-line__label">{{ label }} nextElement = {{ nextElement }}</p>
  </div>
  <wt-expansion-panel hide-title :collapsed="collapsed">
    <wt-tree-line
      v-for="(child, index) in data[children]"
      :key="index"
      :data="child"
      :children="children"
      :item-label="itemLabel"
      :item-data="itemData"
      :nested-level="nestedLevel + 1"
      :next-element="!!data[children][index+1]"
      :last-child="index === data[children].length - 1"
      @select="emit('select', $event)"
    />
  </wt-expansion-panel>

</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import WtIconBtn from "../wt-icon-btn/wt-icon-btn.vue";
import WtExpansionPanel from "../wt-expansion-panel/wt-expansion-panel.vue";
import type { WtTreeNestedIcons } from "./types/wt-tree-nested-icons.ts";

const emit = defineEmits<{
  (e: 'select', data: any): void
}>();

const props = withDefaults(defineProps<{
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

const countLines = computed(() => props.nestedLevel > 1 ? props.nestedLevel - 1 : 0)

const selectElement =() => {
  emit('select', props.itemData ? props.data[props.itemData] : props.data)
}

const collapsed = ref(true)
</script>

<style scoped lang="scss">
.wt-tree-line {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);

  &__icon-wrapper {
    display: flex;
  }

  &__label {
    cursor: pointer;
  }
}
</style>