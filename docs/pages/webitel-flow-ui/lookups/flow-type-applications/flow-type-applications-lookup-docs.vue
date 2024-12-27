<template>
  <section class="enums">
    <h2>Flow Type Applications</h2>
    <article class="enum">
      <pre><code class="language-javascript">{{ lookup }}</code></pre>
    </article>
  </section>
</template>

<script>
import FlowTypeApplications from '@webitel/flow-ui-sdk/src/lookups/FlowTypeApplications.lookup';
import enumReducer from '../../../webitel-ui/enums/_internals/enumReducer';

export default {
  name: 'FlowTypeApplicationsLookupDocs',
  computed: {
    lookup() {
      const _import =
        "import FlowTypeApplications from '@webitel/flow-ui-sdk/src/lookups/FlowTypeApplications.lookup';\n";
      return enumReducer(FlowTypeApplications, _import);
    },
  },
};
</script>

<style lang="scss" scoped></style>
