<template>
  <div
    class="wt-input-info"
    :class="{
      'wt-input-info--invalid': invalid,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'wt-input-info',
  props: {
    invalid: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-input-info {
  @extend %typo-caption;
  margin-top: var(--input-info-margin);
  color: var(--input-info-color);
  min-height: var(--input-info-min-height);

  &--invalid {
    color: var(--input-info--invalid-color);
  }
}
</style>
