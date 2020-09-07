<template>
  <section>
    <h2>Loader</h2>
    <article>
      <div class="example-wrapper">
        <wt-loader />
        <pre><code class="language-html">&lt;wt-loader/&gt;</code></pre>
      </div>
    </article>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-loader-docs',
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
</style>
