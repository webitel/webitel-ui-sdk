<template>
  <section class="enums">
    <h2>Webitel Applications</h2>
    <p><code class="language-javascript">Webitel Applications enum</code> is used for applications identifying across
      projects. Enum is used in <code class="language-html">wt-app-navigator.vue</code></p>
    <article class="enum">
      <pre><code class="language-javascript">{{ WebitelApplications }}</code></pre>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import enumReducer from '../_internals/enumReducer';

export default {
  name: 'webitel-applications-enum-docs',
  mounted() {
    Prism.highlightAll();
  },
  computed: {
    WebitelApplications() {
      const _import = 'import WebitelApplications from \'@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum\';\n';
      return enumReducer(WebitelApplications, _import);
    },
  },
};
</script>

<style scoped>

</style>
