<template>
  <section class="enums">
    <h2>AgentStatus</h2>
    <p><code class="language-javascript">Agent Status enum</code> is used for agent status identifying. Also,
    this enum is used in
      <router-link to="/components/status-select" class="full-docs-link">
        status-select component
      </router-link>
      .</p>
    <article class="enum">
      <pre><code class="language-javascript">{{ agentStatus }}</code></pre>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';
import AgentStatus from '@webitel/ui-sdk/src/enums/AgentStatus/AgentStatus.enum';
import enumReducer from '../_internals/enumReducer';

export default {
  name: 'agent-status-enum-docs',
  mounted() {
    Prism.highlightAll();
  },
  computed: {
    agentStatus() {
      const _import = 'import AgentStatus from \'@webitel/ui-sdk/src/enums/AgentStatus/AgentStatus.enum\';';
      return enumReducer(AgentStatus, _import);
    },
  },
};
</script>

<style scoped>

</style>
