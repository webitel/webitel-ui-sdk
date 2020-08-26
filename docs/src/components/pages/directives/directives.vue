<template>
  <section class="directives">
    <h2>Directives</h2>
    <article class="directives">
      <h3>Clickaway</h3>
      <wt-button v-clickaway="handleClickAway">click away</wt-button>
      <pre><code class="language-html">&lt;wt-button v-clickaway="handleClickAway"&gt;click away&lt;/wt-button&gt;</code></pre>
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
  methods: {
    handleClickAway() {
      alert('clicked away!');
    },
  },
};
</script>

<style scoped>

</style>
