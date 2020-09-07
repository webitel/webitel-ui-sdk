<template>
  <section class="scripts">
    <h2>Case converters</h2>
    <article class="script">
      <p>Converts strings and names from one case to another</p>
      <div>
        Usage:
        <pre>
          <code class="language-javascript">import { camelToSnake } from '@webitel/ui-sdk/src/scripts/caseConverters'</code>
          <code class="language-javascript">console.log('helloThere!')</code>
        </pre>
      </div>
      <div>Available converters:
      <div><b>Important: to convert complex structure like Object or Array, use obj- prefixed scripts</b></div>
        <ul>
          <li>snakeToCamel</li>
          <li>kebabToCamel</li>
          <li>objSnakeToCamel</li>
          <li>camelToSnake</li>
          <li>camelToKebab</li>
          <li>objCamelToSnake</li>
        </ul>
      </div>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'case-converter-scripts-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
