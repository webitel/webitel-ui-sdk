<template>
  <div
    class="wt-switcher"
    :class="{
      'wt-switcher--off': !value,
      'wt-switcher--on': value,
      'wt-switcher--disabled': disabled,
    }"
  >
    <wt-label
      class="wt-switcher__wrapper"
      :class="{'wt-switcher__wrapper--label-left': labelLeft}"
      v-bind="labelProps"
    >
      <input
        class="wt-switcher__input"
        type="checkbox"
        :checked="value"
        :disabled="disabled"
        @change="inputHandler"
      >
      <span class="wt-switcher__checkmark"></span>
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label, value, disabled }">
        <div v-if="label" class="wt-switcher__label">{{ label }}</div>
      </slot>
    </wt-label>
  </div>
</template>

<script>
  export default {
    name: 'wt-switcher',
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
    model: {
      prop: 'value',
      event: 'change',
    },
    methods: {
      inputHandler() {
        this.$emit('change', !this.value);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wt-switcher {
    @include width-fit-content;
    position: relative;
    box-sizing: border-box;

    .wt-label {
      cursor: pointer;
    }
  }

  .wt-switcher__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;

    &.wt-switcher__wrapper--label-left {
      flex-direction: row-reverse;
    }
  }

  .wt-switcher__label {
    margin-left: var(--switcher-icon-margin);
    transition: var(--transition);

    .wt-switcher__wrapper--label-left & {
      margin-left: 0;
      margin-right: var(--switcher-icon-margin);
    }
    .wt-switcher:hover & {
      color: var(--form-label--hover-color);
    }
  }

  .wt-switcher__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }

  .wt-switcher__checkmark {
    position: relative;
    display: block;
    flex: 0 0 var(--switcher-width);
    width: var(--switcher-width);
    height: var(--switcher-height);
    border-radius: var(--switcher-border-radius);
    transition: var(--transition);

    &:before {
      content: '';
      position: absolute;
      bottom: var(--switcher-cicle-margin);
      left: var(--switcher-cicle-margin);
      height: var(--switcher-cicle-size);
      width: var(--switcher-cicle-size);
      background: var(--switcher-circle-bg-color);
      border-radius: 50%;
      transition: var(--transition);
    }
  }

  .wt-switcher--off {
    .wt-switcher__checkmark {
      background: var(--switcher-bg-color--off);
    }

    &:hover {
      .wt-switcher__checkmark {
        background: var(--switcher-bg-color--off--hover);
      }
    }

    &.wt-switcher--disabled {
      .wt-switcher__checkmark {
        background: var(--switcher-bg-color--off--disabled);
      }
    }
  }

  .wt-switcher--on {
    .wt-switcher__checkmark {
      background: var(--switcher-bg-color--on);

      /* Show the indicator (dot/circle) when checked */
      &:before {
        transform: translateX(var(--switcher-cicle-translateX));
      }
    }

    &:hover {
      .wt-switcher__checkmark {
        background: var(--switcher-bg-color--on--hover);
      }
    }

    &.wt-switcher--disabled {
      .wt-switcher__checkmark {
        background: var(--switcher-bg-color--on--disabled);
      }
    }
  }

  .wt-switcher--disabled {
    pointer-events: none;

    .wt-switcher__label {
      color: var(--form-label--disabled-color);
    }
  }
</style>
