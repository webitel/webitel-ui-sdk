<template>
  <button
    :class="[
      `wt-rounded-action--size-${size}`,
      { 'wt-rounded-action--active': active },
      { 'wt-rounded-action--disabled': disabled },
      { 'wt-rounded-action--rounded': rounded },
      { 'wt-rounded-action--wide': wide },
    ]"
    type="button"
    class="wt-rounded-action"
    @click="emit('click', $event)"
  >
    <wt-loader
      v-if="loading"
      size="sm"
      :color="loaderColor"
    ></wt-loader>
    <wt-icon
      v-else
      :color="iColor"
      :icon="icon"
      :size="size"
    ></wt-icon>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  /**
   * @values 'primary', 'secondary', 'success', 'error', 'transfer'
   */
  color: {
    type: String,
    options: ['primary', 'success', 'error', 'transfer'],
  },
  /**
   * @values 'sm', 'md'
   */
  size: {
    type: String,
    default: 'md',
  },
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  /**
   * Stretches button to all available width
   */
  wide: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['click']);

const iColor = computed(() => {
  if (props.disabled) return 'disabled';
  return props.color;
});
const loaderColor = computed(() => {
  // if (['success', 'transfer', 'error'].includes(props.color)) return 'main';
  return 'contrast';
});
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
.wt-rounded-action {
  display: block;
  width: fit-content;
  line-height: 0;
  padding: var(--rounded-action-padding);
  border: var(--rounded-action-border-size) solid;
  background: var(--rounded-action-bg-color);
  border-color: var(--rounded-action-bg-color);
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    background: var(--rounded-action-bg-hover-color);
    border-color: var(--rounded-action-bg-hover-color);
  }

  &--wide {
    width: 100%;
  }

  &--rounded {
    border-radius: var(--rounded-action-rounded-border-radius);
  }

  &--active {
    border-color: var(--rounded-action-active-color);

    &:hover {
      border-color: var(--rounded-action-active-color);
    }
  }

  &.wt-rounded-action--disabled {
    pointer-events: none;
  }

  &--size {
    &-sm {
    }

    &-md {
    }
  }
}
</style>
