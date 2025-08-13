<template>
  <label
    :class="{
      'wt-label--invalid': invalid,
      'wt-label--disabled': disabled,
      'wt-label--required': required,
    }"
    class="wt-label"
  >
    <slot />

    <wt-hint v-if="hint">{{ hint }} </wt-hint>
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  hint?: string;
}>();
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
  cursor: text;
  transition: var(--transition);
  color: var(--wt-label-color);
  //padding: var(--wt-label-padding);

  &--invalid {
    color: var(--wt-label-error-color);
  }

  &--disabled {
    color: var(--wt-label-disabled-color);
  }

  &--required {
    &::after {
      content: '*';
    }
  }
}

.wt-hint {
  margin-left: var(--spacing-2xs);
}
</style>
