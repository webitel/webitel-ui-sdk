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
    <wt-hint
      v-if="hint"
    >{{ hint }}
    </wt-hint>
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
  },
};
</script>

<style lang="scss" scoped>
.wt-label {
  @extend %typo-body-1;

  display: flex;
  align-items: center;
  color: var(--form-label-color);
  transition: var(--transition);
  cursor: text;

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

.wt-hint {
  margin-left: var(--spacing-xs);
}
</style>
