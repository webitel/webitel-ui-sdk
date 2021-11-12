<template>
  <div class="wt-button-select">
    <button
      class="wt-button-select__button"
      :class="[
        colorClass,
        {
          'wt-button-select__button--outline': outline,
          'wt-button-select__button--disabled': disabled,
        }
      ]"
      type="button"
      :disabled="disabled"
      @click="$emit('click', $event)"
    >
      <wt-loader v-if="loading" size="sm" :color="loaderColor"/>
      <slot v-else></slot>
    </button>
    <div
      class="wt-button-select__icon-btn-wrapper"
      :class="[
        colorClass,
        {
          'wt-button-select__icon-btn-wrapper--outline': outline,
          'wt-button-select__icon-btn-wrapper--disabled': disabled
        }
      ]"
    >
      <wt-icon-btn
        :class="[colorClass, {'wt-icon-btn--active': active}]"
        icon="arrow-down"
        :disabled="disabled"
        @click="toggleArrow"
      ></wt-icon-btn>
    </div>

    <ul
      class="wt-button-select__options"
      :class="{'hidden': !active}"
    >
      <li
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option, index)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'wt-button-select',
  data: () => ({
    active: false,
  }),
  props: {
    color: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    wide: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      require: true,
    },
  },
  computed: {
    colorClass() {
      if (!this.disabled) return `${this.color}`;
      return '';
    },
    loaderColor() {
      if (['success', 'transfer', 'danger'].includes(this.color)) return 'main';
      return 'contrast';
    },
  },
  methods: {
    toggleArrow() {
      this.active = !this.active;
    },
    selectOption(option, index) {
      this.$emit('select-option', option, index);
      this.toggleArrow();
    },
  },
};
</script>

<style lang="scss" scoped>
$optionsPadding: 9px;
$optionPadding: 9px 11px;
$buttonHeight: 38px;
$minOptionWidth: 150px;

.wt-button-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 1px;
}

.wt-button-select__icon-btn-wrapper,
.wt-button-select__button {
  @extend %typo-btn;
  display: inline-block;
  padding: var(--btn-padding);
  border: var(--btn-border);
  color: var(--btn-dark-font-color);
  background: var(--btn-primary-color);
  border-color: var(--btn-primary-color);
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  &--disabled {
    color: var(--disabled-color);
    background: var(--btn-disabled-bg-color);
    border-color: var(--disabled-color);
    cursor: auto;
    pointer-events: none;
  }

  &:hover,
  &:active {
    background: var(--btn-primary--hover-color);
    border-color: var(--btn-primary--hover-color);
  }

  &:not(&--outline) {
    &.secondary {
      color: var(--btn-secondary-color);
      border-color: var(--btn-secondary-color);
      background: var(--btn-secondary-bg-color);

      &:hover,
      &:active {
        color: var(--btn-secondary--hover-color);
        border-color: var(--btn-secondary--hover-color);
        background: var(--btn-secondary-bg-color);
      }
    }

    &.success {
      color: var(--btn-light-font-color);
      background: var(--btn-true-color);
      border-color: var(--btn-true-color);

      &:hover,
      &:active {
        background: var(--btn-true--hover-color);
        border-color: var(--btn-true--hover-color);
      }
    }

    &.transfer {
      color: var(--btn-light-font-color);
      background: var(--btn-transfer-color);
      border-color: var(--btn-transfer-color);

      &:hover,
      &:active {
        background: var(--btn-transfer--hover-color);
        border-color: var(--btn-transfer--hover-color);
      }
    }

    &.danger {
      color: var(--btn-light-font-color);
      background: var(--btn-false-color);
      border-color: var(--btn-false-color);

      &:hover,
      &:active {
        background: var(--btn-false--hover-color);
        border-color: var(--btn-false--hover-color);
      }
    }
  }

  &--outline {
    &:not(.wt-button-select__button--disabled, .wt-button-select__icon-btn-wrapper--disabled) {
      color: var(--btn-primary-color);
      border-color: var(--btn-primary-color);
      background: transparent;
    }

    &:hover,
    &:active {
      color: var(--btn-primary--hover-color);
      border-color: var(--btn-primary--hover-color);
      background: transparent;
    }

    &.secondary {
      color: var(--btn-secondary-color);
      border-color: var(--btn-secondary-color);

      &:hover,
      &:active {
        color: var(--btn-secondary--hover-color);
        border-color: var(--btn-secondary--hover-color);
      }
    }

    &.success {
      color: var(--btn-true-color);
      border-color: var(--btn-true-color);

      &:hover,
      &:active {
        color: var(--btn-true--hover-color);
        border-color: var(--btn-true--hover-color);
      }
    }

    &.transfer {
      color: var(--btn-transfer-color);
      border-color: var(--btn-transfer-color);

      &:hover,
      &:active {
        color: var(--btn-transfer--hover-color);
        border-color: var(--btn-transfer--hover-color);
      }
    }

    &.danger {
      color: var(--btn-false-color);
      border-color: var(--btn-false-color);

      &:hover,
      &:active {
        color: var(--btn-false--hover-color);
        border-color: var(--btn-false--hover-color);
      }
    }
  }
}

.wt-button-select__icon-btn-wrapper {
  @extend %typo-btn;
  padding: 6px 10px;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;

  &:hover,
  &:active {
    background: var(--btn-primary--hover-color);
    border-color: var(--btn-primary--hover-color);
  }

  .wt-icon-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(0);
    transition: var(--transition);
    z-index: var(--select-caret-z-index);

    &--active {
      transform: rotate(180deg);
    }
    // Fix me!!!!!!!!!!!!!!!!!!
    // May be need to add the primary and secondary icon color in to library ?
    &::v-deep {
      & .wt-icon svg {
        fill: var(--btn-dark-font-color);
      }

      &.secondary .wt-icon svg {
        fill: var(--btn-secondary-color);

        &:hover,
        &:active {
          fill: var(--btn-secondary--hover-color);
        }
      }

      &.danger .wt-icon svg {
        fill: var(--icon-color-contrast);
      }

      &.success .wt-icon svg {
        fill: var(--icon-color-contrast);
      }

      &.transfer .wt-icon svg {
        fill: var(--icon-color-contrast);
      }
    }
  }

  //FIX ME!!!!!!!!
  // May be need to add the primary and secondary icon color in to library ?
  &--outline::v-deep {
    & .wt-icon-btn .wt-icon svg {
      fill: var(--btn-primary-color);

      &:hover,
      &:active {
        fill: var(--btn-primary--hover-color);
      }
    }

    &:hover {
      background: transparent;
    }

    &.secondary .wt-icon-btn .wt-icon svg {
      fill: var(--btn-secondary-color);

      &:hover,
      &:active {
        fill: var(--btn-secondary--hover-color);
      }
    }

    &.success .wt-icon-btn .wt-icon svg {
      fill: var(--btn-true-color);

      &:hover,
      &:active {
        fill: var(--btn-true--hover-color);
      }
    }

    &.transfer .wt-icon-btn .wt-icon svg {
      fill: var(--btn-transfer-color);

      &:hover,
      &:active {
        fill: var(--btn-transfer--hover-color);
      }
    }

    &.danger .wt-icon-btn .wt-icon svg {
      fill: var(--btn-false-color);

      &:hover,
      &:active {
        fill: var(--btn-false--hover-color);
      }
    }
  }

  //FIX ME!!!!!!!!
  // May be need to add the primary and secondary icon color in to library ?
  &--disabled {
    .wt-icon-btn::v-deep .wt-icon svg {
      fill: var(--disabled-color);
    }
  }
}

.wt-button-select__options {
  @extend %typo-body-md;
  position: absolute;
  top: $buttonHeight;
  left: 0;
  min-width: $minOptionWidth;
  padding: $optionsPadding;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  background-color: var(--main-color);
  transition: var(--transition);
  z-index: var(--select-caret-z-index);

  li {
    padding: $optionPadding;
    cursor: pointer;

    &:hover {
      border-radius: var(--border-radius);
      background-color: var(--secondary-color);
    }
  }
}
</style>
