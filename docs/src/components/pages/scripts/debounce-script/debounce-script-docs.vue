<template>
  <section class="scripts">
    <h2>Debounce</h2>
    <article class="script">
      <p>Debounces wrapped function</p>
      <div>
        Usage:
        <pre>
          <code class="language-javascript">import debounce from '@webitel/ui-sdk/src/scripts/debounce'</code>

          <code class="language-javascript">mounted() {
              this.method = debounce(this.method);
          }</code>
          <code class="language-javascript">methods: {
            method() {}
          }</code>
        </pre>
      </div>
      <div>Params:</div>
      <ul>
        <li>debounced function</li>
        <li>debounce delay: Number. Default: 1000</li>
      </ul>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'debounce-script-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
