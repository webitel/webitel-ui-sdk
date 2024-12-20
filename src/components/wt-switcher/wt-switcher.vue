<template>
  <div
    :class="{
      'wt-switcher--off': !value,
      'wt-switcher--on': value,
      'wt-switcher--disabled': disabled,
    }"
    class="wt-switcher"
  >
    <wt-label
      :class="{'wt-switcher__wrapper--label-left': labelLeft}"
      :disabled="disabled"
      class="wt-switcher__wrapper"
      v-bind="labelProps"
    >
      <input
        :checked="value"
        :disabled="disabled"
        class="wt-switcher__input"
        type="checkbox"
        @change="inputHandler"
      >
      <span class="wt-switcher__checkmark" />
      <!-- @slot Custom input label -->
      <slot
        name="label"
        v-bind="{ label, value, disabled }"
      >
        <div
          v-if="label"
          class="wt-switcher__label"
        >
          {{ label }}
        </div>
      </slot>
    </wt-label>
  </div>
</template>

<script>
export default {
  name: 'WtSwitcher',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    labelLeft: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    labelProps: {
      type: Object,
      description: 'Object with props, passed down to wt-label as props',
    },
  },
  emits: ['change'],
  methods: {
    inputHandler() {
      this.$emit('change', !this.value);
    },
  },
};
</script>

<style lang="scss">
//@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-switcher {
  position: relative;
  box-sizing: border-box;
  width: fit-content;

  .wt-label {
    cursor: pointer;
  }
}

.wt-switcher__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &.wt-switcher__wrapper--label-left {
    flex-direction: row-reverse;
  }
}

.wt-switcher__label {
  margin-left: var(--switcher-icon-margin);
  transition: var(--transition);

  .wt-switcher__wrapper--label-left & {
    margin-right: var(--switcher-icon-margin);
    margin-left: 0;
  }
}

.wt-switcher__input {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  opacity: 0;
}

.wt-switcher__checkmark {
  position: relative;
  display: block;
  flex: 0 0 var(--switcher-width);
  width: var(--switcher-width);
  height: var(--switcher-height);
  transition: var(--transition);
  border-radius: var(--switcher-border-radius);

  &:before {
    position: absolute;
    bottom: var(--switcher-cicle-margin);
    left: var(--switcher-cicle-margin);
    width: var(--switcher-cicle-size);
    height: var(--switcher-cicle-size);
    content: '';
    transition: var(--transition);
    border-radius: 50%;
  }
}

.wt-switcher--off {
  .wt-switcher__checkmark {
    background: var(--wt-switcher-background-color-off);

    &:before {
      background: var(--wt-switcher-circle-background-color-off);
    }
  }

  &:hover {
    .wt-switcher__checkmark {
      background: var(--wt-switcher-background-color-off-hover);

      &:before {
        background: var(--wt-switcher-circle-background-color-off-hover);
      }
    }
  }

  &.wt-switcher--disabled {
    .wt-switcher__checkmark {
      background: var(--wt-switcher-background-color-off-disabled);

      &:before {
        background: var(--wt-switcher-circle-background-color-off-disabled);
      }
    }
  }
}

.wt-switcher--on {
  .wt-switcher__checkmark {
    background: var(--wt-switcher-background-color-on);

    /* Show the indicator (dot/circle) when checked */
    &:before {
      transform: translateX(var(--switcher-cicle-translateX));
      background: var(--wt-switcher-circle-background-color-on);
    }
  }

  &:hover {
    .wt-switcher__checkmark {
      background: var(--wt-switcher-background-color-on-hover);

      &:before {
        background: var(--wt-switcher-circle-background-color-on-hover);
      }
    }
  }

  &.wt-switcher--disabled {
    .wt-switcher__checkmark {
      background: var(--wt-switcher-background-color-on-disabled);

      &:before {
        background: var(--wt-switcher-circle-background-color-on-disabled);
      }
    }
  }
}

.wt-switcher--disabled {
  pointer-events: none;
}
</style>
