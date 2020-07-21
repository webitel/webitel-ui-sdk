<template>
  <div
    class="wt-radio"
    :class="{
      'wt-radio--active': isChecked,
      'wt-radio--outline': outline,
      'wt-radio--disabled': disabled,
    }"
  >
    <wt-label class="wt-radio__wrapper">
      <input
        class="wt-radio__input"
        type="radio"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        @input="inputHandler"
      >
      <span class="wt-radio__checkmark">
      <wt-icon :icon="radioIcon"></wt-icon>
    </span>
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label, isChecked, disabled }">
        <div v-if="label" class="wt-radio__label">{{ label }}</div>
      </slot>
    </wt-label>
  </div>
</template>

<script>
  export default {
    name: 'wt-radio',
    props: {
      // value, set by radio
      value: {
        type: String,
        default: '',
      },
      // currently selected value
      selected: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      required: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      outline: {
        type: Boolean,
        default: false,
      },
    },
    model: {
      prop: 'selected',
      event: 'input',
    },
    computed: {
      isChecked() {
        return this.value === this.selected;
      },
      radioIcon() {
        return this.isChecked ? 'radio--checked' : 'radio';
      },
    },
    methods: {
      inputHandler() {
        this.$emit('input', this.value);
      },
    },
  };
</script>

<style lang="scss" scoped>
  /* Customize the label (the container) */
  .wt-radio {
    @include width-fit-content;
    box-sizing: border-box;
  }

  .wt-radio__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
  }

  .wt-radio__label {
    margin-left: var(--radio-icon-margin);
    transition: var(--transition);
  }

  /* Hide the browser's default radio button */
  .wt-radio__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }

  .wt-radio:hover {
    .wt-radio__label {
      color: var(--form-label--hover-color);
    }

    ::v-deep .wt-icon__icon {
      fill: var(--icon--hover-color);
    }
  }

  .wt-radio--active {
    .wt-radio__label {
      color: var(--form-label--active-color);
    }

    ::v-deep .wt-icon__icon {
      fill: var(--icon--active-color);
    }
  }

  .wt-radio--outline {
    .wt-radio__label {
      color: var(--form-outline-label-color);
    }

    ::v-deep .wt-icon__icon {
      fill: var(--icon-outline-color);
    }

    &.wt-radio--active {
      .wt-radio__label {
        color: var(--form-label--active-color);
      }

      ::v-deep .wt-icon__icon {
        fill: var(--icon-outline--active-color);
      }
    }

    &:hover {

      ::v-deep .wt-icon__icon {
        fill: var(--icon-outline--hover-color);
      }
    }
  }

  .wt-radio--disabled {
    pointer-events: none;

    .wt-radio__label {
      color: var(--form-label--disabled-color);
    }

    ::v-deep .wt-icon__icon {
      fill: var(--icon--disabled-color);
    }
  }
</style>
