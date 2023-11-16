<template>
  <section class="scripts">
    <h2>eventBus</h2>
    <article class="script">
      <p>Just an eventBus :)</p>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'event-bus-script-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
