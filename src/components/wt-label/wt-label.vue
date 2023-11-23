<template>
  <label
    class="wt-label"
    :class="{
      'wt-label--invalid': invalid,
      'wt-label--disabled': disabled,
    }"
  >
    <slot />
    <wt-hint
      v-if="hint"
    >{{ hint }}
    </wt-hint>
  </label>
</template>

<script>
export default {
  name: 'WtLabel',
  props: {
    disabled: {
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

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-label {
  @extend %typo-body-1;

  display: flex;
  align-items: center;
  color: var(--wt-label-color);
  transition: var(--transition);
  cursor: text;

  &--invalid {
    color: var(--wt-label-error-color);
  }

  &--disabled {
    color: var(--wt-label-disabled-color);
  }
}

.wt-hint {
  margin-left: var(--spacing-xs);
}
</style>
