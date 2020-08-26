<template>
  <section class="scripts">
    <h2>Filters</h2>
    <pre><code class="language-javascript">import Script from '@webitel/ui-sdk/src/scripts/Script'</code></pre>
    <article class="script">
      <h3>convertDuration</h3>
      <p>Converts duration from seconds (or null/undefined) to hh:mm:ss value.</p>
      <div>Params:</div>
      <ul>
        <li>duration: [String, Number, any false value]</li>
      </ul>
    </article>
    <article class="script">
      <h3>debounce</h3>
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
    <pre><code class="language-javascript">import Script from '@webitel/ui-sdk/src/scripts/Script'</code></pre>
    <article class="script">
      <h3>eventBus</h3>
      <p>Just an eventBus :)</p>
    </article>
    <article class="script">
      <h3>Prevent hidden page calls decorator</h3>
      <p>Used for periodically sent API requests</p>
      <div>
        Usage:
        <pre>
          <code class="language-javascript">import preventHiddenPageCallsDecorator from '@webitel/ui-sdk/src/scripts/preventHiddenPageCallsDecorator'</code>

          <code class="language-javascript">mounted() {
              this.method = preventHiddenPageCallsDecorator(this.method);
          }</code>
          <code class="language-javascript">methods: {
            method() {}
          }</code>
        </pre>
      </div>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'filters',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
