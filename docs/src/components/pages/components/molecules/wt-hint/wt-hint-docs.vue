<template>
  <section>
    <h2>Hint</h2>
    <article>
      <div class="example-wrapper">
        <wt-hint>
          lorem ipsum
        </wt-hint>
        <pre><code class="language-html">&lt;wt-hint&gt;lorem ipsum&lt;/wt-hint&gt;</code></pre>
      </div>
    </article>
    <component-slots
      :slots="slots"
    ></component-slots>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-hint-docs',
    data: () => ({
      slots: [
        {
          name: 'default',
          description: 'Default content slot',
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
