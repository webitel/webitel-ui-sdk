<template>
  <div
    v-if="src"
    class="screenshot-box"
    :class="[`screenshot-box--${props.size}`]"
    @click="onZoom"
  >
    <div class="preview-wrapper">
      <wt-image
        :class="[`preview-img--${props.size}`]"
        :src="src"
        class="preview-img"
        overlay-icon="zoom-in"
      />
      <button class="close-btn" @click.stop="onClose">
        <wt-icon icon="close--filled" size="sm" color="light" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WtIcon, WtImage } from '@webitel/ui-sdk/components';

import type { ComponentSize } from '../../../../enums';

const props = defineProps<{
	src?: string;
	size: ComponentSize;
}>();

const emit = defineEmits<{
	close: [];
	zoom: [];
}>();

const onClose = () => emit('close');
const onZoom = () => emit('zoom');
</script>

<style scoped >.screenshot-box {
display: flex;
  align-items: center;
  justify-content: center;
}

.preview-wrapper {
position: relative;

  width: 100%;
  height: 100%;
  border-radius: var(--p-content-border-radius);
}

.preview-img {
overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: cover;

  border-radius: var(--p-content-border-radius);
  display: block;
}

.close-btn {
position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  padding: 0;
  z-index: 3;
}</style>
