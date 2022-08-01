<template>
  <wt-button
    v-bind="{ ...$attrs, ...$props }"
    :class="[
      `wt-rounded-action--color-${color}`,
      { 'wt-rounded-action--active': active },
      { 'wt-rounded-action--disabled': disabled },
    ]"
    class="wt-rounded-action"
    color="secondary"
    @click="$emit('click', $event)"
  >
    <wt-icon
      :color="iColor"
      :icon="icon"
      :size="size"
    ></wt-icon>
  </wt-button>
</template>

<script>
export default {
  name: 'wt-rounded-action',
  props: {
    icon: {
      type: String,
    },
    color: {
      type: String,
      default: 'secondary',
      options: ['secondary', 'accent', 'success', 'danger', 'hold', 'transfer'],
    },
    iconColor: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'md',
      options: ['sm', 'md'],
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iColor() {
      if (this.iconColor) return this.iconColor;
      if (this.disabled) return 'secondary-50';
      if (this.color === 'secondary') return null; // dont change icon color
      return this.color;
    },
  },
};
</script>

<!--not scoped to change .icon colors-->
<style lang="scss" scoped>
.wt-button.wt-rounded-action {
  min-width: auto;
  min-height: 0;
  padding: var(--rounded-action-padding);
  line-height: 0;
  border: var(--btn-border);
  border-color: transparent;
  background: var(--rounded-action-bg-color);
  box-shadow: var(--elevation-1);

  &:hover {
    background: inherit;
    box-shadow: var(--elevation-2);
  }

  &--active {
    border-color: var(--icon-color);

    &.wt-rounded-action--color-secondary {
      border-color: var(--icon-color);
    }

    &.wt-rounded-action--color-accent {
      border-color: var(--btn-accent--hover-color);
    }

    &.wt-rounded-action--color-success {
      border-color: var(--btn-true--hover-color);
    }

    &.wt-rounded-action--color-danger {
      border-color: var(--btn-false--hover-color);
    }

    &.wt-rounded-action--color-hold {
      border-color: var(--btn-hold--hover-color);
    }

    &.wt-rounded-action--color-transfer {
      border-color: var(--btn-transfer--hover-color);
    }
  }

  &.wt-rounded-action--disabled {
    border-color: transparent;
    box-shadow: none;
  }
}
</style>
