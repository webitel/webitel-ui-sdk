<template>
  <section>
    <h2>Error page</h2>
    <article>
      <div class="example-wrapper" style="padding: 30px; background: #EAEAEA;">
        <wt-error-page style="min-height: 40vh; min-width: 40vw;" type="403"></wt-error-page>
        <pre><code
          class="language-html">
        &lt;wt-error-page type="403"&gt;&lt;/wt-error-page&gt;
        </code></pre>
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
  name: 'wt-error-page-docs',
  data: () => ({
    properties: [
      {
        name: 'type',
        code: '<wt-error-page type="404"></wt-error-page>',
        required: true,
        type: String,
        options: ['404', '403'],
        description: 'Error type',
      },
    ],
    events: [
      {
        name: 'back',
        description: '"back" button click event',
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
