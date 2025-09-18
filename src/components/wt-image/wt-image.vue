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
      cursor: preview ? 'pointer' : 'auto'
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
      <div v-if="preview" class="wt-image__preview-icon">
        <wt-icon 
          :icon="previewIcon"
          :icon-prefix="previewIconPrefix"
          :color="IconColor.ON_DARK"
        />
      </div>
    </slot>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

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
};

const props = defineProps({
  src: {
    type: [Object, String],
    required: true,
  },
  // все в одну лінію, бо повалиться дока
  /**
   *  `'3xs': '32px', '2xs': '64px', 'xs': '92px', 'sm': '128px', 'md': '192px', 'lg': '256px', 'xl': '380px', '2xl': '512px', '3xl': '600px',`
   */
  size: {
    type: String,
    // default: 'md',
    // required: true,
    validator: (v) =>
      ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(v),
  },
  alt: {
    type: String,
    default: 'wt-image',
  },
  width: {
    type: [String, Number],
  },
  height: {
    type: [String, Number],
  },
  minWidth: {
    type: [String, Number],
  },
  minHeight: {
    type: [String, Number],
  },
  maxWidth: {
    type: [String, Number],
  },
  maxHeight: {
    type: [String, Number],
  },
  preview: {
    type: Boolean,
    default: false
  },
  previewIcon: {
    type: String,
  },
  previewIconPrefix: {
    type: String,
    default: '',
  }
  // aspectRatio: {
  //   type: [String, Number, null],
  //   default: 1,
  // },
});

const emit = defineEmits([]);

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

.wt-image__preview-icon {
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
