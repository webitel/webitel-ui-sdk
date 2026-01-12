<template>
  <div
    class="wt-image"
    :style="{
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      cursor: overlayIcon ? 'pointer' : 'auto'
    }"
    @click="emit('click', $event)"
  >
    <!--    @slot Replaces `<img>` tag
            @scope `{ alt, src }`
     -->
    <slot v-bind="{ alt, src }">
      <p-image
        :alt="alt"
        :src="src"
        class="wt-image__img"
      />
      <div v-if="overlayIcon" class="wt-image__overlay-icon">
        <wt-icon 
          :icon="overlayIcon"
          :icon-prefix="overlayIconPrefix"
          :color="IconColor.ON_DARK"
        />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

import { IconColor } from '../../enums';

const sizeToUnits = {
  '3xs': '32px',
  '2xs': '64px',
  xs: '92px',
  sm: '128px',
  md: '192px',
  lg: '256px',
  xl: '380px',
  '2xl': '512px',
  '3xl': '600px',
} as const;

const props = defineProps<{
  src: string | object;
  size?: keyof typeof sizeToUnits;
  alt?: string;
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  overlayIcon?: string;
  overlayIconPrefix?: string;
}>();

const emit = defineEmits(['click']);

const width = computed(() => {
  const width = props.size ? sizeToUnits[props.size] : props.width;

  // if converted to Number without an error, it has no units in it
  if (+width) {
    return `${width}px`;
  }

  return width;
});

const height = computed(() => {
  // if (props.aspectRatio) return null;

  const height = props.size ? sizeToUnits[props.size] : props.height;

  // if converted to Number without an error, it has no units in it
  if (+height) {
    return `${height}px`;
  }

  return height;
});
</script> 


