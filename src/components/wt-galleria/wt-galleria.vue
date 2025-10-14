<template>
  <p-galleria 
    v-model:visible="visible"
    v-model:active-index="activeIndex"
    :value="value"
    :show-thumbnails="showThumbnails"
    full-screen
    circular
    show-item-navigators
    :num-visible="5"
    :pt="{
        root: {
            class: [{ 'flex flex-col': fullScreen }]
        },
        content: {
            class: ['relative', { 'flex-1 justify-center': fullScreen }]
        },
        thumbnails: 'wt-galleria__thumbnails'
    }"
  >
    <template #item="{item}: {item: WtGalleriaItem}">
      <div class="wt-galleria__image-container">
        <wt-loader v-if="isImageOnLoad" />
        <img 
          v-show="!isImageOnLoad"
          class="wt-galleria__image" 
          :src="item.src" 
          :alt="item.title" 
          @load="onImageLoad"
        />
      </div>
    </template>
    <template #thumbnail="{item}: {item: WtGalleriaItem}">
        <img :src="item.thumbnailSrc" :alt="item.title" class="wt-galleria__thumbnail" />
    </template>
    <template #closeicon>
      <wt-icon 
        icon="close"
      />
    </template>
    <template #previousitemicon>
      <wt-icon 
        icon="arrow-left"
      />
    </template>
    <template #nextitemicon>
      <wt-icon 
        icon="arrow-right"
      />
    </template>
    <template #previousthumbnailicon>
      <wt-icon 
        icon="arrow-left"
      />
    </template>
    <template #nextthumbnailicon>
      <wt-icon 
        icon="arrow-right"
      />
    </template>
    <template #footer>
      <div class="wt-galleria__footer">
        <wt-icon 
          icon="tile"
          @click="toggleThumbnails"
        />
        <span v-if="value.length" class="wt-galleria__footer-info">
            <span>{{ activeIndex + 1 }}/{{ value.length }}</span>
            <span>{{ value[activeIndex].title }}</span>
            <span>{{ value[activeIndex].description }}</span>
        </span>
        <div class="wt-galleria__footer-actions">
          <wt-icon 
            icon="download"
          />
          <wt-icon 
            icon="bucket"
          />
          <wt-icon 
            icon="expand"
          />
        </div>
      </div>
    </template>
  </p-galleria>
</template>

<script setup lang="ts">
import type { WtGalleriaItem } from './types/WtGalleria.d.ts';
import type { GalleriaProps } from 'primevue';

import { defineModel, defineProps, ref, watch } from 'vue';
interface Props extends GalleriaProps{
  value: WtGalleriaItem[];
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', { required: true });
const activeIndex = defineModel<number>('activeIndex', { default: 0, required: false });
const isImageOnLoad = ref(true)

const showThumbnails = ref(true);
const fullScreen = ref(false);

const toggleThumbnails = () => {
  showThumbnails.value = !showThumbnails.value
}

const onImageLoad = () => {
  isImageOnLoad.value = false
}

watch(() => activeIndex.value, () => {
  isImageOnLoad.value = true
})
</script>

<style lang="scss">
@use '@webitel/styleguide/typography' as *;

.wt-galleria__image-container {
  max-width: 100%; 
  display: flex;
  align-items: center;
}

.wt-galleria__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.wt-galleria__thumbnails {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
}

.wt-galleria__thumbnail {
  object-fit: cover;
}

.wt-galleria__footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.wt-galleria__footer-info {
  display: flex;
  gap: 0.5rem;
  @extend %typo-body-2
}

.wt-galleria__footer svg {
  cursor: pointer;
}

.wt-galleria__footer-actions {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}
</style>