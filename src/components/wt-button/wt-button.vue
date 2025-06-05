<template>
  <p-button
    v-bind="$attrs"
    :severity="color"
    :disabled="disabled"
    :loading="showLoader"
    :size="primevueSizeMap[size]"
    class="wt-button mt-2"
    :class="{
        'p-button--width-by-content': widthByContent,
        'p-button--contains-icon': containsIcon,
        'p-button--wide': wide,
        'p-button--loading': showLoader,
      }"
    @click.prevent="emit('click', $event)"
  >
    <wt-loader
      v-if="showLoader"
      :color="loaderColor"
      size="sm"
    />
    <div class="wt-button__contents">
      <slot> no content provided</slot>
    </div>
  </p-button>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, watch } from 'vue';

import { ButtonColor,ComponentSize } from '../../enums';

const primevueSizeMap = {
  [ComponentSize.SM]: 'small',
  [ComponentSize.MD]: 'medium',
};

const props = withDefaults(defineProps<{
  /**
   * @values 'primary', 'secondary', 'success', 'error', 'transfer', 'job', 'info'
   * @example <wt-button color="success"></wt-button>
   */
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  /**
   * @values 'sm', 'md'
   * @example <wt-button size="sm"></wt-button>
   */
  size?: ComponentSize;
  /**
   * Stretches button to all available width
   */
  wide?: boolean;
  /**
   * Shrinks button to content width
   */
  widthByContent?: boolean;
  /**
   * sets wt-button line-height to 0 to prevent height changing: [stack overflow](https://stackoverflow.com/a/11126701)
   */
  containsIcon?: boolean;
}>(), {
  color: ButtonColor.PRIMARY,
  disabled: false,
  loading: false,
  size: ComponentSize.MD,
  wide: false,
  widthByContent: false,
  containsIcon: false,
});

const emit = defineEmits(['click']);

const showLoader = ref(false);

const loaderColor = computed(() => {
  return 'on-dark';
  // if (['success', 'transfer', 'error', 'job'].includes(props.color)) return 'on-dark';
  // return 'on-light';
});

watch(
  () => props.loading,
  (value) => {
    if (value) {
      showLoader.value = true;
    } else {
      setTimeout(() => {
        showLoader.value = value;
      }, 1000); // why 1s? https://ux.stackexchange.com/a/104782
    }
  }, {
    immediate: true,
  },
);
</script>
