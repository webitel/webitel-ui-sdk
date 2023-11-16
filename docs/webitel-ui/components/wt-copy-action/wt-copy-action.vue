<template>
  <section>
    <h2>Copy Action</h2>
    <article>
      <div class="example-wrapper">
        <wt-copy-action :value="value"></wt-copy-action>
        <pre><code class="language-html">&lt;wt-copy-action :value="value"&gt;&lt;/wt-copy-action&gt;</code></pre>
      </div>
    </article>
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

export default {
  name: 'wt-label-docs',
  data: () => ({
    value: 'Copied text',
    properties: [
      {
        value: 'value',
        code: '<wt-copy-action :value="value"></wt-copy-action>',
        type: 'String',
        description: 'Value to be copied',
      },
      {
        value: 'tooltips',
        code: '<wt-copy-action :tooltips="{}"></wt-copy-action>',
        type: 'Object',
        description: 'Value for tooltips before/after copying',
      },
    ],
    events: [
      {
        value: 'click',
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
