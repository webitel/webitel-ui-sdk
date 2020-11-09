<template>
  <section class="scripts">
    <h2>sortQueryAdapters</h2>
    <article class="script">
      <p>has SortSymbols values enum,
        sortToQueryAdapter and queryToSortAdapter to convert '+', '-', and ''
        (url and request formal) to 'asc', 'desc', null -- code logic format</p>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'sort-query-adapter-scripts-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
