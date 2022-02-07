<template>
  <div
    class="wt-button-select"
    v-clickaway="away">

    <wt-button
      class="wt-button-select__button"
      v-bind="$attrs"
      :disabled="disabled"
      @click="$emit('click', $event)"
    >
      <slot></slot>
    </wt-button>

    <wt-button
      class="wt-button-select__select-btn"
      v-bind="$attrs"
      :disabled="disabled"
      :loading="false"
      @click="isOpened = !isOpened"
    >
      <wt-icon
        class="wt-button-select__select-arrow"
        :class="{'wt-button-select__select-arrow--active': isOpened}"
        icon="arrow-down"
        :disabled="disabled"
      ></wt-icon>
    </wt-button>

    <wt-context-menu
      :visible="isOpened"
      :options="options"
      @click="selectOption"
    ></wt-context-menu>
  </div>
</template>

<script>
export default {
  name: 'wt-button-select',
  data: () => ({
    isOpened: false,
  }),
  props: {
    // all buttons props are passed as "$attrs"
    options: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    selectOption({ option, index }) {
      this.$emit('click:option', option, index);
      this.isOpened = false;
    },
    away() {
      this.isOpened = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.wt-button-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--button-select-buttons-gap);

  .wt-context-menu {
    position: absolute;
    top: calc(100% + 1px);
    left: 0;
  }
}

.wt-button-select__button {
  padding: var(--button-select-button-padding);
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.wt-button-select__select-btn {
  min-width: auto;
  padding: var(--button-select-icon-button-padding);
  border-radius: 0 var(--border-radius) var(--border-radius) 0;

  // NORMAL MODE
  &:not(.wt-button--outline)::v-deep {
    & .wt-icon__icon {
      fill: var(--button-select-icon-color-dark);
    }

    // For secondary color, the icon color and icon hover color are the same as in primary color mode

    &.danger,
    &.success,
    &.transfer {
      .wt-icon__icon {
        fill: var(--button-select-icon-color-ligth);
      }
    }
  }

  //OUTLINE MODE
  &.wt-button--outline::v-deep {
    & .wt-icon__icon {
      fill: var(--button-select-icon-color-primary);
    }

    &:hover,
    &:active {
      .wt-icon__icon {
        fill: var(--button-select-icon-color-primary--hover);
      }
    }

    &.danger {
      & .wt-icon__icon {
        fill: var(--icon-color-danger)
      }

      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--button-select-icon-color-danger--hover);
        }
      }
    }

    &.success {
      & .wt-icon__icon {
        fill: var(--icon-color-success)
      }

      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--button-select-icon-color-success--hover);
        }
      }
    }

    &.transfer {
      & .wt-icon__icon {
        fill: var(--icon-color-transfer)
      }

      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--button-select-icon-color-transfer--hover);
        }
      }
    }

    &.secondary {
      .wt-icon__icon {
        fill: var(--button-select-icon-color-secondary);
      }

      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--button-select-icon-color-secondary--hover);
        }
      }
    }
  }

  // DISABLED MODE
  &.wt-button--disabled .wt-icon::v-deep .wt-icon__icon {
    fill: var(--icon-color-secondary-50);
  }

  // OPEN AND SHUT ARROW
  .wt-button-select__select-arrow {
    display: flex;
    transform: rotate(0);

    &--active {
      transform: rotate(180deg);
    }
  }
}
</style>
