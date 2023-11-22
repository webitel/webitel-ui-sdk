<template>
  <div id="app">
    <playground />
  </div>
</template>

<script>
  import Playground from './playground.vue';

  export default {
    name: 'TheApp',
    components: {
      Playground,
    },
  };
</script>

<style lang="scss">
  @import './css/main';
</style>
