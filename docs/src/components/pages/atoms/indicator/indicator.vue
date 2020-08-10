<template>
  <section>
    <h2>Indicator</h2>
    <article>
      <div class="example-wrapper">
        <wt-indicator color="primary" text="Indicator"></wt-indicator>
        <pre><code class="language-html">&lt;wt-indicator color="primary" text="Indicator"&gt;&lt;/wt-indicator&gt;</code></pre>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'indicator',
    data: () => ({
      properties: [
        {
          value: 'color',
          code: '<wt-icon color="danger"></wt-icon>',
          type: 'String',
          options: ['primary', 'secondary', 'success', 'danger', 'transfer'],
          default: 'secondary',
        },
        {
          value: 'text',
          code: '<wt-icon text="Hello there!"></wt-icon>',
          type: 'String',
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
