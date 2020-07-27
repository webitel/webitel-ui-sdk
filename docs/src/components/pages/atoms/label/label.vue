<template>
  <section>
    <h2>Label</h2>
    <article>
      <div class="example-wrapper">
        <wt-label>Input label</wt-label>
        <pre><code class="language-html">&lt;wt-label&gt;Input label&lt;/wt-label&gt;</code></pre>
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
    name: 'label',
    data: () => ({
      properties: [
        {
          value: 'for',
          code: '<wt-label for="inputIdName"></wt-label>',
          type: 'String',
          description: 'Functionally binds label to its input',
        },
        {
          value: 'disabled',
          code: '<wt-label disabled></wt-label>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'outline',
          code: '<wt-label outline></wt-label>',
          type: 'Boolean',
          default: 'false',
          description: 'Changes label visual style to outlined',
        },
        {
          value: 'invalid',
          code: '<wt-label invalid></wt-label>',
          type: 'Boolean',
          default: 'false',
          description: 'Changes label visual style to invalid (red)',
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
