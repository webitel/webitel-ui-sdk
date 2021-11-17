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
      :visible="isOpened"
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
.wt-button-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--buttons-gap);

  .wt-context-menu {
    position: absolute;
    top: 100%;
    left: 0;
  }
}

.wt-button-select__button {
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.wt-button-select__select-btn {
  padding: var(--icon-button-padding);
  border-radius: 0 var(--border-radius) var(--border-radius) 0;

  // NORMAL MODE
  &::v-deep {
    & .wt-icon--color-default .wt-icon__icon {
      fill: var(--icon-color-dark);
    }

    //For danger, success, transfer icon fill-colors.
    //In another case we will need to write three additional strings
    & .wt-icon__icon:not(&.wt-button--outline) {
      fill: var(--main-color);
    }

    &.secondary .wt-icon--color-secondary .wt-icon__icon {
      fill: var(--icon-color-secondary);
    }

    &.secondary {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--icon-color-secondary--hover);
        }
      }
    }
  }

  //OUTLINE MODE
  &.wt-button--outline::v-deep {
    & .wt-icon--color-default .wt-icon__icon {
      fill: var(--icon-color-primary);
    }

    &:hover,
    &:active {
      .wt-icon__icon {
        fill: var(--iocn-color-primary--hover);
      }
    }

    .wt-icon--color-secondary .wt-icon__icon {
      fill: var(--icon-color-secondary);
    }

    &.danger {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--iocn-color-danger--hover);
        }
      }
    }

    &.success {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--icon-color-success--hover);
        }
      }
    }

    &.transfer {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--icon-color-transfer--hover);
        }
      }
    }

    &.secondary {
      &:hover,
      &:active {
        .wt-icon__icon {
          fill: var(--icon-color-secondary--hover);
        }
      }
    }
  }

  // DISABLED MODE
  &.wt-button--disabled .wt-icon::v-deep .wt-icon__icon {
    fill: var(--btn-disabled-color);
  }

  // OPEN AND SHUT ARROW
  .wt-icon {
    display: flex;
    transform: rotate(0);

    &--active {
      transform: rotate(180deg);
    }
  }
}
</style>
