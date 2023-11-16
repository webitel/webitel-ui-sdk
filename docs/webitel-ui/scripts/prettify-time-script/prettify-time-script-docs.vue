<template>
  <section class="scripts">
    <h2>prettifyTime</h2>
    <article class="script">
      <p>prettifies Date object or timestamp to time in format hh:mm (AM/PM, if locale is US)</p>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'prettify-time-script-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
