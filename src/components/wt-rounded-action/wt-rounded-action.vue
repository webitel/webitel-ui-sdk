<template>
  <button
    :class="[
      `wt-rounded-action--color-${color}`,
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
    options: ['primary', 'secondary', 'success', 'error', 'transfer'],
    default: 'secondary',
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
  const onDark = ['success', 'error', 'transfer'];
  const onLight = ['primary', 'secondary'];
  if (props.disabled) return 'disabled';
  if (onDark.includes(props.color)) return 'on-dark';
  if (onLight.includes(props.color)) return 'on-light';
  if (props.active) return 'default';
  return 'default';
});
const loaderColor = computed(() => {
  if (['success', 'transfer', 'error'].includes(props.color)) return 'main';
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
  box-shadow: var(--elevation-1);
  border: var(--rounded-action-border-size) solid;
  background: var(--rounded-action-secondary-color);
  border-color: var(--rounded-action-secondary-color);
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--elevation-2);
  }

  &--wide {
    width: 100%;
  }

  &--rounded {
    border-radius: var(--rounded-action-rounded-border-radius);
  }

  &--color {
    &-primary {
      background: var(--rounded-action-primary-color);
      border-color: var(--rounded-action-primary-color);

      &:hover {
        background: var(--rounded-action-primary-hover-color);
        border-color: var(--rounded-action-primary-hover-color);
      }
    }

    &-secondary {
      background: var(--rounded-action-secondary-color);
      border-color: var(--rounded-action-secondary-color);

      &:hover {
        background: var(--rounded-action-secondary-hover-color);
        border-color: var(--rounded-action-secondary-hover-color);
      }

      &.wt-rounded-action--active {
        background: transparent;
        border-color: var(--rounded-action-secondary-active-color);
      }
    }

    &-success {
      background: var(--rounded-action-success-color);
      border-color: var(--rounded-action-success-color);

      &:hover {
        background: var(--rounded-action-success-hover-color);
        border-color: var(--rounded-action-success-hover-color);
      }
    }

    &-error {
      background: var(--rounded-action-error-color);
      border-color: var(--rounded-action-error-color);

      &:hover {
        background: var(--rounded-action-error-hover-color);
        border-color: var(--rounded-action-error-hover-color);
      }
    }

    &-transfer {
      background: var(--rounded-action-transfer-color);
      border-color: var(--rounded-action-transfer-color);

      &:hover {
        background: var(--rounded-action-transfer-hover-color);
        border-color: var(--rounded-action-transfer-hover-color);
      }
    }
  }

  &.wt-rounded-action--disabled {
    background: var(--rounded-action-disabled-color);
    border-color: var(--rounded-action-disabled-color);
    box-shadow: none;
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
