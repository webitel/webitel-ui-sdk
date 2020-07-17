<template>
  <div
    class="wt-checkbox"
    :class="{
      'wt-checkbox--active': isChecked,
      'wt-checkbox--outline': outline,
      'wt-checkbox--disabled': disabled,
    }"
  >
    <wt-label class="wt-checkbox__wrapper">
      <input
        class="wt-checkbox__input"
        type="checkbox"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        @change="inputHandler"
      >
      <span class="wt-checkbox__checkmark">
      <wt-icon :icon="checkboxIcon"></wt-icon>
    </span>
      <!-- @slot Custom label markup -->
      <slot name="label" v-bind="{ label, isChecked, disabled }">
        <div v-if="label" class="wt-checkbox__label">{{ label }}</div>
      </slot>
    </wt-label>
  </div>
</template>

<script>
  export default {
    name: 'wt-checkbox',
    model: {
      prop: 'selected',
      event: 'change',
    },
    props: {
      value: {
        type: [String, Boolean],
        default: '',
      },
      selected: {
        type: [Array, Boolean],
        default: () => [],
      },
      label: {
        type: String,
        default: '',
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
    computed: {
      isChecked() {
        if (typeof this.selected === 'boolean') {
          return this.selected;
        }
        return this.selected.includes(this.value);
      },
      checkboxIcon() {
        return this.isChecked ? 'checkbox--checked' : 'checkbox';
      },
    },
    methods: {
      inputHandler() {
        if (typeof this.selected === 'boolean') {
          this.$emit('change', !this.selected);
        } else {
          let selected = [...this.selected];
          if (selected.includes(this.value)) {
            selected = selected.filter((value) => value !== this.value);
          } else {
            selected.push(this.value);
          }
          this.$emit('change', selected);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wt-checkbox {
    @include width-fit-content;
    box-sizing: border-box;
  }

  .wt-checkbox__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
  }

  .wt-checkbox__label {
    margin-left: var(--checkbox-icon-margin);
    transition: var(--transition);
  }

  /* Hide the browser's default checkbox */
  .wt-checkbox__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }

  .wt-checkbox:hover {
    .wt-checkbox__label {
      color: var(--form-label--hover-color);
    }

    ::v-deep .wt-icon__icon {
      fill: var(--icon--hover-color);
    }
  }

  .wt-checkbox--active {
    .wt-checkbox__label {
      color: var(--form-label--active-color);
    }

    ::v-deep .wt-icon__icon {
      fill: var(--icon--active-color);
    }
  }

  .wt-checkbox--outline {
    .wt-checkbox__label {
      color: var(--form-outline-label-color);
    }

    ::v-deep .wt-icon__icon {
      fill: var(--icon-outline-color);
    }

    &.wt-checkbox--active {
      .wt-checkbox__label {
        color: var(--form-label--active-color);
      }

      ::v-deep .wt-icon__icon {
        fill: var(--icon-outline--active-color);
      }
    }
  }

  .wt-checkbox--disabled {
    pointer-events: none;

    .wt-checkbox__label {
      color: var(--form-label--disabled-color);
    }

    ::v-deep .wt-icon__icon {
      fill: var(--icon--disabled-color);
    }
  }
</style>
