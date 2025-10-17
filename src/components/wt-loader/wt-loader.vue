<template>
  <wt-brand-loader
    v-if="size === 'md'"
    :color="color"
    class="wt-loader"
  />
  <wt-spinner-loader
    v-else
    class="wt-loader"
    :color="color"
    :size="size"
  />
</template>

<script>
import WtBrandLoader from './_internals/wt-brand-loader.vue';
import WtSpinnerLoader from './_internals/wt-spinner-loader.vue';

export default {
  name: 'WtLoader',
  components: {
    WtBrandLoader,
    WtSpinnerLoader,
  },
  props: {
    size: {
      type: String,
      default: 'md',
      description: '["xs", "sm", "md"]',
    },
    color: {
      type: String,
      default: 'main',
      description: '["main", "icon", "on-dark", "on-light"]',
    },
  },
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped></style>
