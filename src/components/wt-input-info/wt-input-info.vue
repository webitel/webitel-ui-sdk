<template>
  <div
    :class="{
      'wt-input-info--invalid': invalid,
    }"
    class="wt-input-info typo-body-2"
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

<style scoped>
.wt-input-info {
  margin-top: var(--input-info-margin);
  min-height: var(--input-info-min-height);
  color: var(--wt-helper-text-color);
  padding: var(--wt-label-padding);
}

.wt-input-info--invalid {
  color: var(--wt-helper-text-invalid-color);
}
</style>
