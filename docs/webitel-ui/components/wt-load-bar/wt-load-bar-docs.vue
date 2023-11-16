<template>
  <section>
    <h2>Load bar</h2>
    <article>
      <div class="example-wrapper">
        <wt-load-bar max="100" value="85"></wt-load-bar>
        <pre><code
          class="language-html">&lt;wt-load-bar max="100" value="85"&gt;&lt;/wt-progress-bar&gt;</code></pre>
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
    name: 'wt-progress-bar-docs',
    data: () => ({
      properties: [
        {
          value: 'max',
          code: '<wt-load-bar max="10"></wt-load-bar>',
          type: ['Number', 'String'],
          default: '100',
          description: 'Max load bar value',
        },
        {
          value: 'value',
          code: '<wt-load-bar value="10"></wt-load-bar>',
          type: ['Number', 'String'],
          description: 'Current load bar value',
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
