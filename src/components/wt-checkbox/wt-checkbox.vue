<template>
  <div
    class="wt-checkbox"
    :class="{
      'wt-checkbox--active': isChecked,
      'wt-checkbox--disabled': disabled,
    }"
  >
    <wt-label
      v-bind="labelProps"
      :disabled="disabled"
      class="wt-checkbox__wrapper"
    >
      <input
        class="wt-checkbox__input"
        type="checkbox"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        @change="inputHandler"
      >
      <span class="wt-checkbox__checkmark">
        <wt-icon
          :icon="checkboxIcon"
          :color="iconColor"
        />
      </span>
      <!-- @slot Custom label markup -->
      <slot
        v-bind="{ label, isChecked, disabled }"
        name="label"
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
  transition: var(--transition);
  cursor: pointer;
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
  :deep .wt-icon__icon {
    fill: var(--icon-active-color);
  }
}

.wt-checkbox--disabled {
  pointer-events: none;
}
</style>
