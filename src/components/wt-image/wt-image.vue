<template>
  <div
    :style="{
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    }"
    class="wt-image"
  >
    <!--    @slot Replaces `<img>` tag
            @scope `{ alt, src }`
     -->
    <slot v-bind="{ alt, src }">
      <img
        :alt="alt"
        :src="src"
        class="wt-image__img"
      >
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const sizeToUnits = {
  '3xs': '32px',
  '2xs': '64px',
  'xs': '92px',
  'sm': '128px',
  'md': '192px',
  'lg': '256px',
  'xl': '380px',
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
    validator: (v) => ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(v),
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
//@import '../../../src/css/main.scss';

.wt-image {
  display: flex;
  align-items: center;
  justify-content: center;

  &__img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
