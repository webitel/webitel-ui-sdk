<template>
  <label
    :class="{
      'wt-label--invalid': invalid,
      'wt-label--disabled': disabled,
    }"
    class="wt-label"
  >
    <slot />
    <wt-hint v-if="hint">{{ hint }} </wt-hint>
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
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.wt-label {
  @extend %typo-body-1;

  display: flex;
  align-items: center;
  transition: var(--transition);
  cursor: text;
  color: var(--wt-label-color);
  //padding: var(--wt-label-padding);

  &--invalid {
    color: var(--wt-label-error-color);
  }

  &--disabled {
    color: var(--wt-label-disabled-color);
  }
}

.wt-hint {
  margin-left: var(--spacing-2xs);
}
</style>
