<template>
  <section>
    <h2>Divider</h2>
    <article>
      <div class="example-wrapper">
        <div class="divider-wrapper">
          <wt-divider></wt-divider>
        </div>
        <pre><code class="language-html">&lt;wt-divider/&gt;</code></pre>
      </div>
    </article>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-divider-docs',
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
  .divider-wrapper {
    width: 50%;
  }
</style>
