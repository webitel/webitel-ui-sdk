<template>
  <section class="filters">
    <h2>Filters</h2>
    <article class="filter">
      <h3>Truncate</h3>
      <p>{{ 'lorem ipsum dolor sit amet' | truncate }}</p>
      <p>{{ 'lorem ipsum dolor sit amet' | truncateFromEnd }}</p>
      <pre><code class="language-html">&lt;p&gt;lorem ipsum dolor sit amet | truncate&lt;/p&gt;</code></pre>
      <pre><code class="language-html">&lt;p&gt;lorem ipsum dolor sit amet | truncateFromEnd&lt;/p&gt;</code></pre>
      <div>
        Argument: string length (without dots). <strong>Default value: 18</strong>;
      </div>
      <span>truncateFromEnd is recommended for numbers.</span>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'filters',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
