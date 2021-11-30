<template>
  <div
    class="wt-button-select"
    v-clickaway="away">

    <wt-button
      class="wt-button-select__button"
      v-bind="$attrs"
      :color="color"
      :disabled="disabled"
      @click="$emit('click', $event)"
    >
      <slot></slot>
    </wt-button>

    <wt-button
      class="wt-button-select__select-btn"
      v-bind="$attrs"
      :color="color"
      :disabled="disabled"
      :loading="false"
      @click="isOpened = !isOpened"
    >
      <wt-icon
        class="wt-button-select__select-arrow"
        :class="{'wt-button-select__select-arrow--active': isOpened}"
        icon="arrow-down"
        :color="color"
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
    color: {
      type: String,
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
  padding: var(--button-select-icon-button-padding);
  border-radius: 0 var(--border-radius) var(--border-radius) 0;

  // NORMAL MODE
  &:not(.wt-button--outline)::v-deep {
    & .wt-icon--color-default .wt-icon__icon {
      fill: var(--button-select-icon-color-dark);
    }

    //For danger, success, transfer icon fill-colors.
    //In another case we will need to write three additional strings
    & .wt-icon__icon {
      fill: var(--button-select-icon-color-ligth);
    }

    &.secondary .wt-icon--color-secondary .wt-icon__icon {
      fill: var(--button-select-icon-color-secondary);
    }

    &.secondary {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--button-select-icon-color-secondary--hover);
        }
      }
    }
  }

  //OUTLINE MODE
  &.wt-button--outline::v-deep {
    & .wt-icon--color-default .wt-icon__icon {
      fill: var(--button-select-icon-color-primary);
    }

    &:hover,
    &:active {
      .wt-icon__icon {
        fill: var(--button-select-icon-color-primary--hover);
      }
    }

    .wt-icon--color-secondary .wt-icon__icon {
      fill: var(--button-select-icon-color-secondary);
    }

    &.danger {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--button-select-icon-color-danger--hover);
        }
      }
    }

    &.success {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--button-select-icon-color-success--hover);
        }
      }
    }

    &.transfer {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--button-select-icon-color-transfer--hover);
        }
      }
    }

    &.secondary {
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
    fill: var(--icon-color-disabled);
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
