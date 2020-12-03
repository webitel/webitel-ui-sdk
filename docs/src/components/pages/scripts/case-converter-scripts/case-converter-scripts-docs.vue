<template>
  <section class="scripts">
    <h2>Case converters</h2>
    <article class="script">
      <p>Converts strings and names from one case to another</p>
      <div>
        Usage:
        <pre>
          <code class="language-javascript">import { camelToSnake } from '@webitel/ui-sdk/src/scripts/caseConverters'</code>
          <code class="language-javascript">console.log(camelToSnake('helloThere!'))</code>
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
    <article>
      <h3>Skipped keys</h3>
      <p>obj- case converters have 2nd optional param, which accepts array of keys to prevent from
      converting like:
        <code class="language-javascript">
          console.log(objCamelToSnake({ doNotConvertMe: 'helloThere!' }, ['doNotConvertMe']))
        </code></p>
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
