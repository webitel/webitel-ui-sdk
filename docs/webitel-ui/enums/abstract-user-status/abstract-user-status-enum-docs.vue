<template>
  <section class="enums">
    <h2>Abstract User Status</h2>
    <p><code class="language-javascript">Abtract User Status enum</code> is used for status identifying in design purposes (like drawing colored cirles or borders for statuses).
      Abstacting from specific naming of entity, which status is being represented .Also, this enum is used in
      <router-link to="/components/avatar" class="full-docs-link">
        avatar component
      </router-link>
      .</p>
    <article class="enum">
      <pre><code class="language-javascript">{{ importString }}</code></pre>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';
import AgentStatus from '@webitel/ui-sdk/src/enums/AgentStatus/AgentStatus.enum';
import enumReducer from '../_internals/enumReducer';

export default {
  name: 'abstract-user-status-enum-docs',
  mounted() {
    Prism.highlightAll();
  },
  computed: {
    importString() {
      const _import = 'import AgentStatus from \'@webitel/ui-sdk/src/enums/AbstractUserStatus/AbstractUserStatus.enum\';';
      return enumReducer(AgentStatus, _import);
    },
  },
};
</script>

<style scoped>

</style>
