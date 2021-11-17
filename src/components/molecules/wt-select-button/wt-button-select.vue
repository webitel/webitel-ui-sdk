<template>
  <div
    class="wt-button-select"
    v-clickaway="away">

    <wt-button
      class="wt-button-select__button"
      v-bind="$attrs"
      @click="$emit('click', $event)"
    >{{ name }}
    </wt-button>

    <wt-button
      class="wt-button-select__select-btn"
      v-bind="$attrs"
      @click="isOpened = !isOpened"
    >
      <wt-icon
        :class="{'wt-icon--active': isOpened}"
        v-bind="$attrs"
        icon="arrow-down"
      ></wt-icon>
    </wt-button>

    <wt-context-menu
      v-bind="$attrs"
      :is-visible="isOpened"
      @click="selectOption"
    ></wt-context-menu>
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
  },
  methods: {
    selectOption(options) {
      this.$emit('click:option', options);
      this.isOpened = false;
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

  .wt-context-menu {
    position: absolute;
    top: $buttonHeight;
    left: 0;
    min-width: $minOptionWidth;
  }
}

.wt-button-select__button {
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.wt-button-select__select-btn {
  padding: $iconBtnPadding;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;

  // DISABLED MODE
  &.wt-button--disabled .wt-icon::v-deep .wt-icon__icon {
    fill: var(--btn-disabled-color)
  }

  //OUTLINE MODE
  &.wt-button--outline:not(.wt-button--disabled)::v-deep {
    .wt-icon--color-default .wt-icon__icon {
      fill: var(--btn-primary-color);
    }

    &:hover,
    &:active {
      .wt-icon__icon {
        fill: var(--btn-primary--hover-color);
      }
    }

    .wt-icon--color-secondary .wt-icon__icon {
      fill: var(--btn-secondary-color);
    }

    &.danger {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--btn-false--hover-color);
        }
      }
    }

    &.success {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--btn-true--hover-color);
        }
      }
    }

    &.transfer {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--btn-transfer--hover-color);
        }
      }
    }

    &.secondary {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--btn-secondary--hover-color);
        }
      }
    }
  }

  // NORMAL MODE
  &:not(.wt-button--outline)::v-deep {
    & .wt-icon__icon {
      fill: var(--btn-dark-font-color);
    }

    &.danger .wt-icon__icon,
    &.success .wt-icon__icon,
    &.transfer .wt-icon__icon {
      fill: var(--main-color);
    }

    &.secondary .wt-icon__icon {
      fill: var(--btn-secondary-color);
    }

    &.secondary {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--btn-dark-font-color);
        }
      }
    }
  }

  // Open and shut arrow
  .wt-icon {
    display: flex;
    transform: rotate(0);

    &--active {
      transform: rotate(180deg);
    }
  }
}
</style>
