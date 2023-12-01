<template>
  <wt-loader-sm
    v-if="size === 'sm'"
    class="wt-loader"
    :color="color"
  />
  <wt-loader-md
    v-else-if="size === 'md'"
    class="wt-loader"
  />
</template>

<script>
import WtLoaderSm from './_internals/wt-loader--sm.vue';
import WtLoaderMd from './_internals/wt-loader--md.vue';

export default {
  name: 'WtLoader',
  components: {
    WtLoaderSm,
    WtLoaderMd,
  },
  props: {
    size: {
      type: String,
      default: 'md',
      description: '["sm", "md"]',
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
@import './variables.scss';
</style>

<style lang="scss" scoped>

</style>
