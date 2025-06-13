<template>
  <button
    :class="[
      `wt-rounded-action--size-${size}`,
      { 'wt-rounded-action--active': active },
      { 'wt-rounded-action--disabled': disabled },
      { 'wt-rounded-action--rounded': rounded },
      { 'wt-rounded-action--wide': wide },
    ]"
    class="wt-rounded-action"
    type="button"
    @click="emit('click', $event)"
  >
    <wt-loader
      v-if="loading"
      color="main"
      :size="loaderSize"
    />
    <wt-icon
      v-else
      :color="iColor"
      :icon="icon"
      :icon-prefix="iconPrefix"
      :size="size"
    />
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
   * inserts icon name prefix between "icon" and actual icon name ("icon" prop).
   * Useful for library icons extension with project-level icons with this prefix in name
   */
  iconPrefix: {
    type: String,
    default: '',
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

const loaderSize = computed(() => props.size === 'sm' ? 'xs' : 'sm'); // for matching wt-loader sizes with wt-rounded-action sizes

const iColor = computed(() => {
  if (props.disabled) return 'disabled';
  switch (props.color) {
    case 'secondary':
      return 'default';
    default:
      return props.color;
  }
});

watch: {
  loading: {
    immediate: true,
      handler(value) {
      if (value) {
        this.showLoader = true;
      } else {
        setTimeout(() => {
          this.showLoader = value;
        }, 1000); // why 1s? https://ux.stackexchange.com/a/104782
      }
    },
  },
},
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-rounded-action {
  display: block;
  transition: var(--transition);
  border: var(--rounded-action-border-size) solid;
  border-color: var(--rounded-action-bg-color);
  border-radius: var(--border-radius);
  background: var(--rounded-action-bg-color);
  padding: var(--rounded-action-padding);
  width: fit-content;
  line-height: 0;

  &:hover {
    border-color: var(--rounded-action-bg-hover-color);
    background: var(--rounded-action-bg-hover-color);
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
