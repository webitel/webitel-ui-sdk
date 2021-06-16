<template>
  <label
    class="wt-label"
    :class="{
      'wt-label--outline': outline,
      'wt-label--invalid': invalid,
      'wt-label--disabled': disabled,
    }"
    :for="this.for"
  >
    <slot></slot>
    <wt-icon-btn
      v-if="hint"
      class="wt-label__hint"
      icon="rounded-info"
      color="outline"
      :tooltip="hint"
      :tooltip-position="hintPosition"
    ></wt-icon-btn>
  </label>
</template>

<script>
export default {
  name: 'wt-label',
  props: {
    for: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      description: 'Adds hint icon + tooltip with text, passed as "hint" prop',
    },
    hintPosition: {
      type: String,
      description: 'See wt-icon-btn tooltip-position prop',
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-label {
  @extend %typo-body-lg;

  display: flex;
  align-items: center;
  color: var(--form-label-color);
  transition: var(--transition);

  &--outline {
    color: var(--form-outline-label-color);
  }

  &--invalid {
    color: var(--label--invalid-color);
  }

  &--disabled {
    color: var(--form-label--disabled-color);
  }
}

.wt-label__hint {
  margin-left: var(--component-spacing);
  ::v-deep {
    .wt-tooltip {
      min-width: 120px;
      max-width: 280px;
    }
  }
}
</style>
