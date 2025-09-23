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
      cursor: hoverIcon ? 'pointer' : 'auto'
    }"
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
      <div v-if="hoverIcon" class="wt-image__hover-icon">
        <wt-icon 
          :icon="hoverIcon"
          :icon-prefix="hoverIconPrefix"
          :color="IconColor.ON_DARK"
        />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

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
  hoverIcon?: string;
  hoverIconPrefix?: string;
}>();

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


<style lang="scss" scoped>
//@use '../../css/styleguide/styleguide';

.wt-image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &__img {
    display: inline-flex;
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: auto;
  }
}

.wt-image__hover-icon {
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.25);

  &:hover {
    opacity: 1;
  }
}
</style>
