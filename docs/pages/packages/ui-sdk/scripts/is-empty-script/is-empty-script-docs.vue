<template>
  <section class="scripts">
    <h2>isEmpty</h2>
    <article class="script">
      <p>
        Checks if value is "empty". Truthy for empty array, empty object, and
        falsy primitives, ex. (!!0, !!'')
      </p>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'IsEmptyScriptDocs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped></style>
