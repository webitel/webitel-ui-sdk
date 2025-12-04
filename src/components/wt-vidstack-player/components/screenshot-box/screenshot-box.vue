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
import {ComponentSize} from "../../../../enums";

const props = defineProps<{
  src?: string;
  rightSide?: boolean;
  size: keyof typeof ComponentSize
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'zoom'): void;
}>();

const onClose = () => emit('close');
const onZoom = () => emit('zoom');
</script>

<style scoped lang="scss">
.screenshot-box {
  display: flex;
  align-items: center;
  justify-content: center;

  &--sm {
    .close-btn {
      top: 1px;
      right: 1px;
    }
  }
  &--md {
    .close-btn {
      top: 3px;
      right: 3px;
    }
  }
  &--lg {
    .close-btn {
      top: 5px;
      right: 5px;
    }
  }
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
}
</style>
