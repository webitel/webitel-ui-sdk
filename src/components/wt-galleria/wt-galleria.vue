<template>
  <p-galleria 
    v-model:visible="visible"
    :value="value"
    full-screen
    circular
    show-item-navigators
    :num-visible="5"
  >
    <template #item="{item}: {item: WtGalleriaItem}">
        <img :src="item.src" alt="Gallery item" />
    </template>
    <template #thumbnail="{item}: {item: WtGalleriaItem}">
        <img :src="item.thumbnailSrc" alt="Gallery thumbnail" class="wt-galleria__thumbnail" />
    </template>
  </p-galleria>
</template>

<script setup lang="ts">
import type { WtGalleriaItem } from './types/WtGalleria.d.ts';

import { defineModel, defineProps, ref} from 'vue';
interface Props {
  value: WtGalleriaItem[];
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', { required: true });
</script>

<style lang="scss" scoped>
.wt-galleria__thumbnail {
  width: 80px;
  height: 50px;
  object-fit: cover;
}
</style>