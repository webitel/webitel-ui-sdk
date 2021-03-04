<template>
  <button
    class="wt-rounded-action"
    :class="[
      colorClass,
        `wt-rounded-action--${size}`,
      {
        'wt-rounded-action--disabled': disabled,
      }
    ]"
    type="button"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <wt-loader v-if="loading" size="sm" :color="loaderColor"/>
    <slot v-else>
      <wt-icon
        :icon="icon"
        :color="computeIconColor"
      ></wt-icon>
    </slot>
  </button>
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
      default: '',
    },
    iconColor: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'md',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    colorClass() {
      if (!this.disabled) return `${this.color}`;
      return '';
    },
    computeIconColor() {
      if (this.iconColor) return this.iconColor;
      switch (this.colorClass) {
        case 'secondary':
          return 'primary';
        case 'success':
          return 'outline';
        case 'transfer':
          return 'outline';
        case 'danger':
          return 'outline';
        default:
          return 'active';
      }
    },
    loaderColor() {
      if (['success', 'transfer', 'danger'].includes(this.color)) return 'main';
      return 'contrast';
    },
  },
};
</script>

<!--not scoped to change .icon colors-->
<style lang="scss" scoped>
.wt-rounded-action {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--rounded-action-border);
  color: var(--rounded-action-dark-font-color);
  background: var(--rounded-action-primary-color);
  border-color: var(--rounded-action-primary-color);
  border-radius: 50%;
  transition: var(--transition);
  cursor: pointer;

  &--sm {
    width: var(--rounded-action-size--sm);
    height: var(--rounded-action-size--sm);
  }

  &--md {
    width: var(--rounded-action-size--md);
    height: var(--rounded-action-size--md);
  }

  &--lg {
    width: var(--rounded-action-size--lg);
    height: var(--rounded-action-size--lg);
  }

  @media screen and (max-width: 1336px) {
    .wt-icon.sm {
      width: 14px;
      height: 14px;
    }

    .wt-icon.md {
      width: 20px;
      height: 20px;
    }

    .wt-icon.lg {
      width: 25px;
      height: 25px;
    }

    &--sm {
      width: calc(var(--rounded-action-size--sm) * 0.8);
      height: calc(var(--rounded-action-size--sm) * 0.8);
    }

    &--md {
      width: calc(var(--rounded-action-size--md) * 0.8);
      height: calc(var(--rounded-action-size--md) * 0.8);
    }

    &--lg {
      width: calc(var(--rounded-action-size--lg) * 0.8);
      height: calc(var(--rounded-action-size--lg) * 0.8);
    }
  }

  &--disabled {
    color: var(--text--disabled-color);
    background: var(--rounded-action-disabled-bg-color);
    border-color: var(--disabled-color);
    cursor: auto;
    pointer-events: none;

    .wt-icon ::v-deep .wt-icon__icon {
      fill: var(--icon--disabled-color);
    }
  }

  &:hover {
    background: var(--rounded-action-primary--hover-color);
    border-color: var(--rounded-action-primary--hover-color);
  }

  &.active,
  &:active {
    background: var(--rounded-action-primary--hover-color);
    border-color: var(--rounded-action-primary--hover-color);
  }

  &.secondary {
    border-color: var(--rounded-action-secondary-color);
    background: var(--rounded-action-secondary-bg-color);

    &:hover{
      border-color: var(--rounded-action-secondary--hover-color);
      background: var(--rounded-action-secondary-bg-color);

      .wt-icon ::v-deep .wt-icon__icon {
        fill: var(--icon--hover-color);
      }
    }

    &.active,
    &:active {
      color: var(--text-primary-color);
      border-color: var(--rounded-action-secondary--active-color);
      background: var(--rounded-action-secondary-bg-color);

      .wt-icon ::v-deep .wt-icon__icon {
        fill: var(--icon--active-color);
      }
    }
  }

  &.success {
    color: var(--text-contrast-color);
    background: var(--rounded-action-true-color);
    border-color: var(--rounded-action-true-color);

    &:hover,
    &:active {
      background: var(--rounded-action-true--hover-color);
      border-color: var(--rounded-action-true--hover-color);
    }
  }

  &.transfer {
    color: var(--text-contrast-color);
    background: var(--rounded-action-transfer-color);
    border-color: var(--rounded-action-transfer-color);

    &:hover,
    &:active {
      background: var(--rounded-action-transfer--hover-color);
      border-color: var(--rounded-action-transfer--hover-color);
    }
  }

  &.danger {
    color: var(--text-contrast-color);
    background: var(--rounded-action-false-color);
    border-color: var(--rounded-action-false-color);

    &:hover,
    &:active {
      background: var(--rounded-action-false--hover-color);
      border-color: var(--rounded-action-false--hover-color);
    }
  }
}
</style>
