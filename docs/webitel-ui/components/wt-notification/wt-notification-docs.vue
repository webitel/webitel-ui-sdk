<template>
  <section>
    <h2>Notification</h2>
    <article>
      <div class="example-wrapper">
        <wt-notification>lorem ipsum</wt-notification>
        <pre><code
          class="language-html">&lt;wt-notification&gt;lorem ipsum&lt;/wt-notification&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-notification type="error">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur,
          debitis
        </wt-notification>
      </div>
      <div class="example-wrapper">
        <wt-notification type="error">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut deserunt et eum
          exercitationem hic labore libero minus nam optio, praesentium, quas quasi quia rem
          repellendus sunt tempora tempore voluptas?'
        </wt-notification>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <component-events
      :events="events"
    ></component-events>
    <article>
      <h3>Notification positioning</h3>
      <p>By default, notification positioning is static. If you want make it absolute, you should do
        it
        explicitly in CSS</p>
      <pre><code
        class="language-html">&lt;wt-notification&gt;Hello there!&lt;/wt-notification&gt;</code>

  <code class="language-css">.wt-notification { position: absolute; }</code></pre>
    </article>
    <component-slots
    ></component-slots>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-notification-docs',
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
