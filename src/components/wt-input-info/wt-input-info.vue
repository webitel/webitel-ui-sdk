<template>
  <div
    :class="{
      'wt-input-info--invalid': invalid,
    }"
    class="wt-input-info"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'WtInputInfo',
  props: {
    invalid: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '../../../src/css/main.scss';

.wt-input-info {
  @extend %typo-caption;
  min-height: var(--input-info-min-height);
  margin-top: var(--input-info-margin);
  color: var(--wt-helper-text-color);

  &--invalid {
    color: var(--wt-helper-text-invalid-color);
  }
}
</style>
