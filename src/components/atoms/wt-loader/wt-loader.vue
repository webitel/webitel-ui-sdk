<template>
  <div class="wt-loader">
    <wt-loader-sm v-if="size === 'sm'" :color="color"></wt-loader-sm>
    <wt-loader-md v-if="size === 'md'"></wt-loader-md>
  </div>
</template>

<script>
import WtLoaderSm from './_internals/wt-loader--sm.vue';
import WtLoaderMd from './_internals/wt-loader--md.vue';

  export default {
    name: 'wt-loader',
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
        default: 'contrast',
        description: '["main", "contrast"]',
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
