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
      <wt-icon
        class="wt-radio__icon"
        :icon="radioIcon"
      />
      <!-- @slot Custom input label -->
      <slot
        v-bind="{ label, isChecked, disabled }"
        name="label"
      >
        <div
          v-if="label"
          class="wt-radio__label"
        >
          {{ label }}
        </div>
      </slot>
    </wt-label>
  </div>
</template>

<script>
export default {
  name: 'WtRadio',
  model: {
    prop: 'selected',
    event: 'input',
  },
  props: {
    // value, set by radio
    value: {
      type: [String, Number, Boolean, Object],
      default: '',
    },
    // currently selected value
    selected: {
      type: [String, Number, Boolean, Object],
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
  emits: ['input'],
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

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

/* Customize the label (the container) */
.wt-radio {
  @include width-fit-content;
  box-sizing: border-box;

  .wt-label {
    cursor: pointer;
  }
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

.wt-radio__icon {
  flex: 0 0 var(--icon-md-size);
}

.wt-radio:hover {
  :deep .wt-icon__icon {
    fill: var(--icon-btn-hover-color);
  }
}

.wt-radio--active {
  :deep .wt-icon__icon {
    fill: var(--icon-active-color);
  }
}

.wt-radio--disabled {
  pointer-events: none;

  :deep .wt-icon__icon {
    fill: var(--icon-disabled-color);
  }
}
</style>
