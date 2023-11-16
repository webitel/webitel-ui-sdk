<template>
  <section>
    <h2>Loader</h2>
    <article>
      <div class="example-wrapper">
        <wt-loader/>
        <pre><code class="language-html">&lt;wt-loader/&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-loader size="sm"/>
        <pre><code class="language-html">&lt;wt-loader size="sm"/&gt;</code></pre>
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
    name: 'wt-loader-docs',
    mounted() {
      Prism.highlightAll();
    },
    data: () => ({
      properties: [
        {
          value: 'size',
          type: 'String',
          default: 'md',
          options: ['sm', 'md'],
        },
        {
          value: 'color',
          type: 'String',
          default: 'contrast',
          options: ['main', 'contrast', 'icon'],
          description: 'Works only for sm loader',
        },
      ],
    }),
  };
</script>

<style lang="scss" scoped>
</style>
