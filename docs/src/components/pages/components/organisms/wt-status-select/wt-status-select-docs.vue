<template>
  <section>
    <h2>Status select</h2>
    <article>
      <div class="example-wrapper">
        <wt-status-select
          v-model="status"
        ></wt-status-select>
        <pre><code class="language-html">
          &lt;wt-status-select v-model="status"&gt;&lt;/wt-status-select&gt;
        </code></pre>
      </div>
    </article>
    <article>
      <h3>Agent Status enum</h3>
      <pre><code class="language-javascript">
          import AgentStatus from '@webitel/ui-sdk/src/enums/AgentStatus/AgentStatus.enum';
        </code></pre>
      <p>Enumerate with ONLINE ('online'), PAUSE ('pause') and OFFLINE ('offline') values. Used
        for agent status identifying and <b>recommended</b> for use in app logic</p>
    </article>
    <component-model
      prop="status"
      event="change"
    ></component-model>
    <component-props
      :properties="properties"
    ></component-props>
    <component-events
      :events="events"
    ></component-events>
  </section>
</template>

<script>
import Prism from 'prismjs';
import AgentStatus from '@webitel/ui-sdk/src/enums/AgentStatus/AgentStatus.enum';

export default {
  name: 'wt-status-select-docs',
  data: () => ({
    status: AgentStatus.ONLINE,
    properties: [
      {
        value: 'status',
        code: '<wt-status-select :status="AgentStatus.ONLINE"></wt-status-select>',
        type: 'String',
        default: 'AgentStatus.ONLINE',
        description: 'Component is looking for value from AgentStatus enum',
      },
      {
        value: 'statusDuration',
        code: '<wt-status-select :status-duraton="00:00:01"></wt-status-select>',
        type: ['String', 'Number'],
        default: '00:00:00',
        description: 'If seconds number, converts to hh:mm:ss format',
      },
    ],
    events: [
      {
        value: 'change',
        params: [
          {
            name: 'changed status value',
            type: 'String',
          },
        ],
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
</style>
