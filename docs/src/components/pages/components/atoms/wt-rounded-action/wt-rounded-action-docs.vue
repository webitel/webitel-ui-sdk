<template>
  <section>
    <h2>Rounded actions</h2>
    <article>
      <div class="example-wrapper">
        <wt-rounded-action icon="call"></wt-rounded-action>
        <pre><code
          class="language-html"
        >&lt;wt-rounded-action icon="call"&gt;&lt;/wt-rounded-action&gt;</code></pre>
      </div>
      <div class="example-wrapper" style="display: flex;">
        <wt-rounded-action icon="call" color="secondary"></wt-rounded-action>
        <wt-rounded-action icon="call" disabled></wt-rounded-action>
        <wt-rounded-action icon="call" color="success"></wt-rounded-action>
        <wt-rounded-action icon="call" color="danger"></wt-rounded-action>
        <wt-rounded-action icon="call" color="transfer"></wt-rounded-action>
        <wt-rounded-action icon="call" color="transfer" disabled></wt-rounded-action>
      </div>
      <p>! class 'active', attached to secondary color button, highlights it.</p>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <component-events
      :events="events"
    ></component-events>
    <component-slots
    ></component-slots>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'wt-rounded-action-docs',
  data: () => ({
    properties: [
      {
        value: 'color',
        code: '<wt-rounded-action color="primary"></wt-rounded-action>',
        type: 'String',
        options: ['"primary", "secondary", "success", "danger", "transfer"'],
        default: 'primary',
      },
      {
        value: 'disabled',
        code: '<wt-rounded-action disabled></wt-rounded-action>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'size',
        code: '<wt-rounded-action size="md"></wt-rounded-action>',
        type: 'String',
        default: 'md',
        options: ['sm', 'md', 'lg'],
        description: 'Controls button size',
      },
      {
        value: 'loading',
        code: '<wt-rounded-action loading></wt-rounded-action>',
        type: 'Boolean',
        default: 'false',
        description: 'Displays loader instead of icon',
      },
    ],
    events: [
      {
        value: 'click',
        params: [
          { name: 'event', type: 'Event' },
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
