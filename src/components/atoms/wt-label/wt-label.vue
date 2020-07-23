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
    },
  };
</script>

<style lang="scss" scoped>
  .wt-label {
    @extend %typo-body-lg;

    display: block;
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
</style>
