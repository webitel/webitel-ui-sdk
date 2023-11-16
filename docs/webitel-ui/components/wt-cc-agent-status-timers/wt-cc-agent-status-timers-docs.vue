<template>
  <section>
    <h2>Agent Status Timers</h2>
    <article>
      <p>Note! Component is loading on-demand, so you should import it directly from</p>
      <pre><code class="language-javascript">import WtCcAgentStatusTimers from '@webitel/ui-sdk/src/components/on-demand/wt-cc-agent-status-timers/wt-cc-agent-status-timers.vue';</code></pre>
      <div class="example-wrapper">
        <wt-cc-agent-status-timers :status="{ online: 10, offline: 20, pause: 30 }"></wt-cc-agent-status-timers>
        <pre><code class="language-html">&lt;wt-cc-agent-status-timers :status="{ online: 10, offline: 20, pause: 30 }"&gt;&lt;/wt-cc-agent-status-timers&gt;</code></pre>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
  </section>
</template>

<script setup>
import Prism from 'prismjs';
import WtCcAgentStatusTimers
  from '@webitel/ui-sdk/src/components/on-demand/wt-cc-agent-status-timers/wt-cc-agent-status-timers.vue';
import { onMounted } from 'vue';

const properties = [
  {
    value: 'status',
    code: '<wt-cc-agent-status-timers :status="{ online: 10, offline: 20, pause: 30 }"></wt-cc-agent-status-timers>',
    type: 'Object',
    required: true,
    description: 'Object should have "online", "offline" and "pause" properties for representation',
  },
  {
    value: 'size',
    code: '<wt-cc-agent-status-timers :status="{ online: 10, offline: 20, pause: 30 }" size="sm"></wt-cc-agent-status-timers>',
    type: ['String'],
    default: 'md',
    description: 'Size of component',
    options: ['sm', 'md'],
  },
];
onMounted(() => {
  Prism.highlightAll();
});
</script>

<style lang="scss" scoped>
</style>
