<template>
  <section class="scripts">
    <h2>Prevent hidden page calls decorator</h2>
    <article class="script">
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
  name: 'prevent-hidden-page-calls-decorator-script-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
