<template>
  <section>
    <h2>Input info</h2>
    <article>
      <div class="example-wrapper">
        <wt-input-info>Input info</wt-input-info>
        <pre><code class="language-html">&lt;wt-input-info&gt;Input info&lt;/wt-input-info&gt;</code></pre>
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
    name: 'input-info',
    data: () => ({
      properties: [
        {
          value: 'invalid',
          code: '<wt-input-info invalid></wt-input-info>',
          type: 'Boolean',
          default: 'false',
          description: 'Changes input info visual style to invalid (red)',
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
