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
  name: 'EventBusScriptDocs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped></style>
