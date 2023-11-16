<template>
  <section>
    <h2>Agent Status Select</h2>
    <p>Agent status select module includes:</p>
    <article class="figures-wrapper">
      <figure>
        <img
          src="./_internals/img/agent-status-select__select.png"
          alt="agent status select select pic"
          width="171"
          height="153"
        >
        <p>1) Status select view</p>
      </figure>
      <figure>
        <img
          src="./_internals/img/agent-status-select__pause-cause-popup.png"
          alt="agent status select pause cause popup pic"
          width="600"
        >
        <p>2) Status select pause cause popup </p>
      </figure>
      <figure>
        <img
          src="./_internals/img/agent-status-select__error-popup.jpg"
          alt="agent status select error popup pic"
          width="500"
        >
        <p>3) Status select error popup</p>
      </figure>
    </article>
    <article>
      <ul>
        <li>
          <h3>1) <b>Status select view</b></h3> consists of a component and api that returns possible statuses
        </li>
        <li>
          <h3>2) <b>Status select pause cause popup</b> consists of:</h3>
          <i>- popup component</i>
          <p>- <i>api</i> that returns possible cause</p>
          <b>Pay attention:</b> for the module to work correctly, you must have an API of a certain format in the store
          <p>- <i>composable</i> <a class="full-docs-link" href="https://dev.webitel.com/ui-sdk/ui/composables/use-representable-agent-pause-cause">useRepresentableAgentPauseCause</a> - converts data into the required format</p>
        </li>
        <li>
          <h3>3) <b>Status select error popup</b></h3> consists of a component. Displayed if have errors after selecting a cause
        </li>
      </ul>
    </article>
    <article>
      <h3>Usage:</h3>
      <pre><code class="language-html">
        &lt;template&gt;
          &lt;wt-cc-agent-status-select
            :agent-id="10"
            :status="online"
            :status-duration="offline"
            @changed="changeStatus"
          &gt;&lt;/wt-cc-agent-status-select&gt;
        &lt;/template&gt;
      </code>
      <code class="language-javascript">
        import WtCcAgentStatusSelect from '@webitel/ui-sdk/src/modules/AgentStatusSelect/components/wt-cc-agent-status-select.vue';
      </code></pre>
    </article>
    <article>
      <component-props
        :properties="properties"
      ></component-props>
      <component-events
        :events="events"
      ></component-events>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'wt-cc-agent-status-select-docs',
  data: () => ({
    properties: [
      {
        value: 'agentId',
        code: '<wt-cc-agent-status-select :agent-id="10"></wt-cc-agent-status-select>',
        type: ['Number', 'String'],
        required: true,
        description: 'Id of agent we\'re working on. Used for patching status changes and receiving pause causes.',
      },
      {
        value: 'status',
        code: '<wt-cc-agent-status-select :status="online"></wt-cc-agent-status-select>',
        type: 'String',
        default: 'AgentStatus.OFFLINE // \'offline\'',
        description: 'Agent status. Can be undefined, is agent wasn\'t loaded yet',
      },
      {
        value: 'statusDuration',
        code: '<wt-cc-agent-status-select :status-duration="offline"></wt-cc-agent-status-select>',
        type: ['String', 'Number'],
        default: 0,
        description: `Value, represented on select. If value is numeric, it is parsed by convertDuration webitel-ui-sdk script`,
      },
    ],
    events: [
      {
        value: 'changed',
        params: 'status',
        description: 'Status changed event'
      }
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
.figures-wrapper {
  display: flex;
}
</style>
