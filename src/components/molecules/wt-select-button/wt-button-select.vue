<template>
  <div class="wt-button-select">
    <wt-button
      v-bind="$attrs"
      :color="color"
      :outline="outline"
      @click="$emit('click', $event)"
    >{{ name }}
    </wt-button>
    <wt-icon-btn
      :class="[
        colorClass,
        {
          'wt-icon-btn--active': isOpened,
          'wt-icon-btn--outline': outline,
        }
      ]"
      v-bind="$attrs"
      icon="arrow-down"
      :color="iconColor"
      @click="clickOnArrowBtn"
      v-clickaway="away"
    ></wt-icon-btn>

    <wt-list
      v-bind="$attrs"
      :is-opened="isOpened"
      @click="clickOnOption"
    ></wt-list>
  </div>
</template>
<script>
import clickaway from '../../../directives/clickaway/clickaway';

export default {
  name: 'wt-button-select',
  directives: { clickaway },
  data: () => ({
    isOpened: false,
  }),
  props: {
    name: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
    outline: {
      type: Boolean,
      default: false,
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
    iconColor() {
      if (this.outline) return this.color;
      if (!this.outline && this.color === 'primary') return 'default';
      if (!this.outline && this.color === 'secondary') return 'secondary';
      if (!this.outline) return 'contrast';
      return '';
    },
  },
  methods: {
    toggleArrow() {
      this.isOpened = !this.isOpened;
    },

    clickOnArrowBtn() {
      this.toggleArrow();
      this.$emit('click:arrow');
    },

    clickOnOption(options) {
      this.$emit('click:option', options);
      this.toggleArrow();
    },
    away() {
      this.isOpened = false;
    },
  },
};
</script>
<style lang="scss" scoped>
$iconBtnPadding: 6px 10px;
$buttonHeight: 38px;
$minOptionWidth: 150px;
$buttonsGap: 1px;

.wt-button-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: $buttonsGap;
}

.wt-button {
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.wt-icon-btn {
  padding: $iconBtnPadding;
  border: var(--btn-border);
  background: var(--btn-primary-color);
  border-color: var(--btn-primary-color);
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  transition: var(--transition);
  cursor: pointer;

  // Open and shut arrow
  &::v-deep .wt-icon {
    transform: rotate(0);
  }

  &--active::v-deep .wt-icon {
    transform: rotate(180deg);
  }

  // Disabled arrow btn
  &--disabled {
    background: var(--btn-disabled-bg-color);
    border-color: var(--disabled-color);
    cursor: auto;
    pointer-events: none;

    &::v-deep .wt-icon__icon {
      fill: var(--disabled-color)
    }
  }

  // Outline arrow btn
  &--outline {
    &:not(.wt-icon-btn--disabled) {
      border-color: var(--btn-primary-color);
      background: transparent;
    }

    &:not(.wt-icon-btn--disabled) ::v-deep .wt-icon__icon {
      fill: var(--btn-primary-color);

      &:hover,
      &:active {
        fill: var(--btn-primary--hover-color);
      }
    }

    &:hover,
    &:active {
      border-color: var(--btn-primary--hover-color);
      background: transparent;
    }

    &.secondary {
      border-color: var(--btn-secondary-color);

      &::v-deep .wt-icon__icon {
        fill:  var(--btn-secondary-color);

        &:hover,
        &:active {
          fill: var(--btn-secondary--hover-color);
        }
      }

      &:hover,
      &:active {
        border-color: var(--btn-secondary--hover-color);
      }
    }

    &.success {
      border-color: var(--btn-true-color);

      &::v-deep .wt-icon__icon {
        fill:  var(--btn-true-color);

        &:hover,
        &:active {
          fill: var(--btn-true--hover-color);
        }
      }

      &:hover,
      &:active {
        border-color: var(--btn-true--hover-color);
      }
    }

    &.transfer {
      border-color: var(--btn-transfer-color);

      &::v-deep .wt-icon__icon {
        fill:  var(--btn-transfer-color);

        &:hover,
        &:active {
          fill: var(--btn-transfer--hover-color);
        }
      }

      &:hover,
      &:active {
        border-color: var(--btn-transfer--hover-color);
      }
    }

    &.danger {
      border-color: var(--btn-false-color);

      &::v-deep .wt-icon__icon {
        fill: var(--btn-false-color);

        &:hover,
        &:active {
          fill: var(--btn-false--hover-color);
        }
      }

      &:hover,
      &:active {
        border-color: var(--btn-false--hover-color);
      }
    }
  }

  // Normal arrow btn (NOT OUTLINE)
  &:not(&--outline) {
    &.secondary {
      border-color: var(--btn-secondary-color);
      background: var(--btn-secondary-bg-color);

      &::v-deep .wt-icon .wt-icon__icon {
        fill: var(--btn-secondary-color);

        &:hover ,
        &:active {
          fill: var(--btn-secondary--hover-color);
        }
      }

      &:hover,
      &:active {
        border-color: var(--btn-secondary--hover-color);
        background: var(--btn-secondary-bg-color);
      }
    }

    &.success {
      background: var(--btn-true-color);
      border-color: var(--btn-true-color);

      &:hover,
      &:active {
        background: var(--btn-true--hover-color);
        border-color: var(--btn-true--hover-color);
      }
    }

    &.transfer {
      background: var(--btn-transfer-color);
      border-color: var(--btn-transfer-color);

      &:hover,
      &:active {
        background: var(--btn-transfer--hover-color);
        border-color: var(--btn-transfer--hover-color);
      }
    }

    &.danger {
      background: var(--btn-false-color);
      border-color: var(--btn-false-color);

      &:hover,
      &:active {
        background: var(--btn-false--hover-color);
        border-color: var(--btn-false--hover-color);
      }
    }
  }
}

.wt-list {
  position: absolute;
  top: $buttonHeight;
  left: 0;
  min-width: $minOptionWidth;
}
</style>
