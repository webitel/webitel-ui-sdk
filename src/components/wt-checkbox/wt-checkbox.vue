<template>
  <div
    :class="{
      'wt-checkbox--active': isChecked,
      'wt-checkbox--disabled': disabled,
    }"
    class="wt-checkbox"
  >
    <wt-label
      :disabled="disabled"
      class="wt-checkbox__wrapper"
      v-bind="labelProps"
    >
      <input
        :checked="isChecked"
        :disabled="disabled"
        :value="value"
        class="wt-checkbox__input"
        type="checkbox"
        @change="inputHandler"
      >
      <span class="wt-checkbox__checkmark">
        <wt-icon
          :color="iconColor"
          :icon="checkboxIcon"
        />
      </span>
      <!-- @slot Custom label markup -->
      <slot
        name="label"
        v-bind="{ label, isChecked, disabled }"
      >
        <div
          v-if="label"
          class="wt-checkbox__label"
        >
          {{ label }}
        </div>
      </slot>
    </wt-label>
  </div>
</template>

<script>
export default {
  name: 'WtCheckbox',
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
    labelProps: {
      type: Object,
      description: 'Object with props, passed down to wt-label as props',
    },
  },
  emits: ['change'],
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
    iconColor() {
      if (this.disabled) return 'disabled';
      if (this.isChecked) return 'active';
      return null;
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

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-checkbox {
  @include width-fit-content;
  box-sizing: border-box;

  .wt-label {
    cursor: pointer;
  }
}

.wt-checkbox__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;

  .wt-checkbox__checkmark {
    line-height: 0; // prevent icon height >> content
  }
}

.wt-checkbox__label {
  margin-left: var(--checkbox-icon-margin);
  cursor: pointer;
  transition: var(--transition);
}

/* Hide the browser's default checkbox */
.wt-checkbox__input {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  opacity: 0;
}

.wt-checkbox:hover {
  :deep .wt-icon__icon {
    fill: var(--icon-active-color);
  }
}

.wt-checkbox--disabled {
  pointer-events: none;
}
</style>
