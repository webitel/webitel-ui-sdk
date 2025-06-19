<template>
  <wt-loader-bigger
    v-if="size === 'md'"
    :color="color"
    class="wt-loader"
  />
  <wt-loader-smaller
    v-else
    class="wt-loader"
    :size="size"
  />
</template>

<script>
import WtLoaderBigger from './_internals/wt-loader-bigger.vue';
import WtLoaderSmaller from './_internals/wt-loader-smaller.vue';

export default {
  name: 'WtLoader',
  components: {
    WtLoaderSmaller,
    WtLoaderBigger,
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
