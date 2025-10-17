<template>
  <p-galleria
    ref="galleria" 
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
            class: [{ 'flex flex-col': fullScreen }],
        },
        content: {
            class: ['relative', { 'wt-galleria__content--fullscreen': fullScreen }]
        },
        thumbnails: 'wt-galleria__thumbnails',
        closeButton: {
          style: { display: fullScreen ? 'none' : 'block' },
        },
    }"
  >
    <template #item="{item}: {item: WtGalleriaItem}">
      <div 
        class="wt-galleria__image-container"
        :class="{ 'wt-galleria__image-container--preview': !fullScreen }"
      >
        <wt-loader v-if="isImageOnLoad" />
        <img 
          v-show="!isImageOnLoad"
          class="wt-galleria__image" 
          :class="{ 'wt-galleria__image--fullscreen': fullScreen }"
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
            @click="emit('download', activeIndex)"
          />
          <wt-icon 
            icon="bucket"
            @click="handleDelete"
          />
          <wt-icon 
            :icon="fullScreen ? 'collapse' : 'expand'"
            @click="toggleFullScreen"
          />
        </div>
      </div>
    </template>
  </p-galleria>
  <delete-confirmation-popup
    :shown="isDeleteConfirmationPopup"
    :callback="deleteCallback"
    :delete-count="deleteCount"
    @close="closeDelete"
  />
</template>

<script setup lang="ts">
import type { WtGalleriaItem } from './types/WtGalleria.d.ts';
import type { GalleriaProps } from 'primevue';

import { computed, defineModel, defineProps, ref, watch, useTemplateRef } from 'vue';
import { useGalleriaFullscreen } from '../../composables'
import DeleteConfirmationPopup from '../../modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
interface Props extends GalleriaProps{
  value: WtGalleriaItem[];
}

const props = defineProps<Props>();

const emit = defineEmits(['download', 'delete']);

const visible = defineModel<boolean>('visible', { required: true });
const activeIndex = defineModel<number>('activeIndex', { default: 0, required: false });
const currentImage = computed(() => props.value[activeIndex.value]);
const galleria = useTemplateRef('galleria')
const isImageOnLoad = ref(true)

const showThumbnails = ref(true);

const { 
  fullScreen,
  toggleFullScreen
} = useGalleriaFullscreen(galleria)

const {
  isVisible: isDeleteConfirmationPopup,
  deleteCount,
  deleteCallback,

  askDeleteConfirmation,
  closeDelete,
} = useDeleteConfirmationPopup();

const toggleThumbnails = () => {
  showThumbnails.value = !showThumbnails.value
}

const onImageLoad = () => {
  isImageOnLoad.value = false
}

const handleDelete = () => {
  if (fullScreen.value) toggleFullScreen()
  askDeleteConfirmation({
    deleteCount: 1,
    callback: () => emit('delete', activeIndex)
  })
}

watch(() => currentImage.value, () => {
  isImageOnLoad.value = true
}, { deep: true })

watch(() => visible.value, () => {
  if (!visible.value) {
    activeIndex.value = 0
  }
})

watch(() => props.value, () => {
  if (!props.value.length) { 
    visible.value = false
  }
})
</script>

<style lang="scss">
@use '@webitel/styleguide/typography' as *;

.wt-galleria__image-container {
  max-width: 100%; 
  display: flex;
  align-items: center;
  background: transparent;
}

.wt-galleria__content--fullscreen {
  flex: 1 1 0;
  justify-content: center;
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