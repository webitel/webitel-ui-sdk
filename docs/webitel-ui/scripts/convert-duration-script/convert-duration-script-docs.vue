<template>
  <section class="scripts">
    <h2>convertDuration</h2>
    <pre><code class="language-javascript">import Script from '@webitel/ui-sdk/src/scripts/Script'</code></pre>
    <article class="script">
      <p>Converts duration from seconds (or null/undefined) to hh:mm:ss value.</p>
      <div>Params:</div>
      <ul>
        <li>duration: [String, Number, any false value]</li>
      </ul>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'convert-duration-script-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
