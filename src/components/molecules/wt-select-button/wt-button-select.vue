<template>
  <div class="wt-button-select">
    <wt-button
      :color="color"
      :disabled="disabled"
      :outline="outline"
      :loading="loading"
      @click="$emit('btn-click', $event)"
    >{{ name }}
    </wt-button>

    <wt-icon-btn
      :class="[
        colorClass,
        {
          'wt-icon-btn--active': isOpened,
          'wt-icon-btn--disabled': disabled,
          'wt-icon-btn--outline': outline,
        }
      ]"
      icon="arrow-down"
      :color="iconColor"
      :disabled="disabled"
      @click="clickOnSelect"
      ref="button-select"
    ></wt-icon-btn>

    <ul
      class="wt-button-select__options"
      :class="{'hidden': !isOpened}"
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
import buttonMixin from '../../atoms/wt-button/buttonMixin';

export default {
  name: 'wt-button-select',
  mixins: [buttonMixin],
  data: () => ({
    isOpened: false,
  }),
  props: {
    name: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      require: true,
    },
  },
  computed: {
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

    clickOnSelect(event) {
      this.toggleArrow();
      this.$emit('select-click', event);
    },

    selectOption(option, index) {
      this.$emit('select-option', {
        option,
        index,
      });
      this.toggleArrow();
    },
  },
};
</script>
<style lang="scss" scoped>
$optionsPadding: 9px;
$optionPadding: 9px 11px;
$iconBtnPadding: 6px 10px;
$buttonHeight: 38px;
$minOptionWidth: 150px;

.wt-button-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 1px;
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
  }

  // Outline arrow btn
  &--outline {
    &:not(.wt-icon-btn--disabled) {
      border-color: var(--btn-primary-color);
      background: transparent;
    }

    &::v-deep .wt-icon svg {
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

      &::v-deep .wt-icon svg {
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

      &::v-deep .wt-icon svg {
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

      &::v-deep .wt-icon svg {
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

      &::v-deep .wt-icon svg {
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

.wt-button-select__options {
  @extend %typo-body-md;
  position: absolute;
  top: $buttonHeight;
  left: 0;
  padding: $optionsPadding;
  min-width: $minOptionWidth;
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
