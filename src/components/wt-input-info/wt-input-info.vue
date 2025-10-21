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
@use '@webitel/styleguide/typography' as *;

.wt-input-info {
  @extend %typo-body-2;
  margin-top: var(--input-info-margin);
  min-height: var(--input-info-min-height);
  color: var(--wt-helper-text-color);
  padding: var(--wt-label-padding);

  &--invalid {
    color: var(--wt-helper-text-invalid-color);
  }
}
</style>
