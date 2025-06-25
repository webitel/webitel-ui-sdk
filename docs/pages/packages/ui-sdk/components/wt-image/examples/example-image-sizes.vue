<template>
  <div style="display: flex; gap: var(--spacing-sm); flex-wrap: nowrap">
    <wt-table
      :data="sizes.map((size) => ({ size, image }))"
      :headers="[
        { value: 'size', width: '40px' },
        { value: 'image', width: 'auto' },
      ]"
      :selectable="false"
    >
      <template #image="{ item }">
        <wt-image
          :size="item.size"
          :src="item.image"
        />
      </template>
    </wt-table>
  </div>
</template>

<script setup>
import image from './assets/img_3.png';

const props = defineProps({});

const emit = defineEmits([]);

const sizes = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
</script>

<style lang="scss" scoped>
.wt-image {
  border: 1px solid red;
}
</style>
