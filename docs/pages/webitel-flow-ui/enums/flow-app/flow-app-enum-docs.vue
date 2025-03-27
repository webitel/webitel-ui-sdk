<template>
  <section class="enums">
    <h2>Flow Apps</h2>
    <p>
      <code class="language-javascript">Webitel Applications enum</code> is used
      for applications identifying across projects. Enum is used in
      <code class="language-html">wt-app-navigator.vue</code>
    </p>
    <article class="enum">
      <pre><code class="language-javascript">{{ enums }}</code></pre>
    </article>
  </section>
</template>

<script>
import FlowApp from '@webitel/flow-ui-sdk/src/enums/FlowApp.enum';

import enumReducer from '../../../webitel-ui/enums/_internals/enumReducer';

export default {
  name: 'FlowAppEnumDocs',
  computed: {
    enums() {
      const _import =
        "import FlowApp from '@webitel/flow-ui-sdk/src/enums/FlowApp.enum';\n";
      return enumReducer(FlowApp, _import);
    },
  },
};
</script>

<style lang="scss" scoped></style>
