<template>
  <component-props
    :properties="properties"
  />
  <component-events
    :events="events"
  />
  <article>
    <h3>Notification positioning</h3>
    <p>
      By default, notification positioning is static. If you want make it absolute, you should do
      it
      explicitly in CSS
    </p>
    <pre><code
      class="language-html"
    >&lt;wt-notification&gt;Hello there!&lt;/wt-notification&gt;</code>

  <code class="language-css">.wt-notification { position: absolute; }</code></pre>
  </article>
  <component-slots />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtNotificationDocs',
  data: () => ({
    properties: [
      {
        value: 'type',
        code: '<wt-notification type="error"></wt-notification>',
        type: 'String',
        options: ['"info"', '"error"'],
        default: 'info',
      },
    ],
    events: [
      {
        value: 'close',
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
