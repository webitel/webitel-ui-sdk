<template>
  <section class="store-modules">
    <h2>Reactive Now</h2>
    <article class="store-module">
      <p>Module provides client with reactive <code>now</code> property from <code>Date.now()</code></p>
      <pre class="language-javascript">
        <code>
          // store/index.js
         import ReactiveNowStoreModule from '@webitel/ui-sdk/src/store/ReactiveNowStoreModule/ReactiveNowStoreModule';

          modules: {
            now: new ReactiveNowStoreModule().getModule(),
          },
        </code>

        <code>
          // somewhere at initialize
          context.dispatch('now/SET_NOW_WATCHER', null, { root: true }),
        </code>

        <code>
          // somewhere at destroy
          context.dispatch('ui/now/CLEAR_NOW_WATCHER', null, { root: true }),
        </code>

        <code>
          // usage
          computed: {
            ...mapState('now', {
              now: (state) => state.now,
            }),
            log() {
              console.info(this.now);
            },
          }
        </code>
      </pre>
    </article>
  </section>
</template>

<script setup>
import Prism from 'prismjs';
import { onMounted } from 'vue';

onMounted(() => {
  Prism.highlightAll();
});
</script>

<style lang="scss" scoped>

</style>
