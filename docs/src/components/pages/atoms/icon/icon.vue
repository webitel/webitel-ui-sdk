<template>
  <section>
    <h2>Icons</h2>
    <article>
      <div class="example-wrapper">
        <wt-icon icon="bucket"></wt-icon>
        <pre><code class="language-html">&lt;wt-icon icon="bucket"&gt;&lt;/wt-icon&gt;</code></pre>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <icon-grid />
  </section>
</template>

<script>
  import Prism from 'prismjs';
  import IconGrid from './internals/icon-grid.vue';

  export default {
    name: 'icon',
    components: {
      IconGrid,
    },
    data: () => ({
      properties: [
        {
          value: 'icon',
          code: '<wt-icon icon="close"></wt-icon>',
          type: 'String',
          required: true,
        },
        {
          value: 'size',
          code: '<wt-icon icon="close" size="sm"></wt-icon>',
          type: 'String',
          options: ['"sm", "md", "lg", "xl"'],
          default: 'md',
        },
        {
          value: 'color',
          code: '<wt-icon icon="close" color="primary"></wt-icon>',
          type: 'String',
          default: 'primary',
          description: 'Options from list of icon colors, using formula --icon-{color}-color',
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
