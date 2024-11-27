<template>
  <div>
    <wt-tree-line v-for="(item, index) in data" :item-label="itemLabel" :item-data="itemData" :key="index" :data="item" :children="children" @select="emit('select', $event)" />
  </div>
</template>

<script setup lang="ts">
import WtTreeLine from "../wt-tree-line/wt-tree-line.vue";

withDefaults(defineProps<{
  data: any[],
  itemLabel?: string | undefined,
  itemData?: string | undefined,
  children?: string
}>(), {
  children: 'children'
})

const emit = defineEmits<{
  (e: 'select', data: any): void
}>();
</script>

<style scoped lang="scss">

</style>