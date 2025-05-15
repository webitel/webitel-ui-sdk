<template>
  <p-button
    v-bind="$attrs"
    :severity="color"
    :disabled="disabled"
    :loading="showLoader"
    :size="primevueSizeMap[size]"
    class="wt-button"
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

<script setup>
import { computed, defineEmits, defineProps, ref, watch } from 'vue';

const primevueSizeMap = {
  sm: 'small',
  md: 'medium',
};

const props = defineProps({
  /**
   * @values 'primary', 'secondary', 'success', 'error', 'transfer', 'job', 'info'
   * @example <wt-button color="success"></wt-button>
   */
  color: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * @values 'sm', 'md'
   * @example <wt-button size="sm"></wt-button>
   */
  size: {
    type: String,
    default: 'md',
  },
  /**
   * Stretches button to all available width
   */
  wide: {
    type: Boolean,
    default: false,
  },
  /**
   * Shrinks button to content width
   */
  widthByContent: {
    type: Boolean,
    default: false,
  },
  /**
   * sets wt-button line-height to 0 to prevent height changing: [stack overflow](https://stackoverflow.com/a/11126701)
   */
  containsIcon: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const showLoader = ref(false);

const colorClass = computed(() => {
  if (!props.disabled) return `${props.color}`;
  return '';
});

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
  },
);
</script>
