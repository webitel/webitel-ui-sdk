<template>
  <section class="scripts">
    <h2>prettifyFileSize</h2>
    <article class="script">
      <p>prettifies bytes number to string size script: </p>
      <wt-input
        v-model="input"
        style="max-width: 400px;"
        label="Size"
      />
      <div>Prettified size is: <strong>{{ output }}</strong></div>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';
import prettifyFileSize from '@webitel/ui-sdk/src/scripts/prettifyFileSize';

export default {
  name: 'PrettifyFileSizeScriptDocs',
  data: () => ({
    input: 1024,
  }),
  computed: {
    output() {
      return prettifyFileSize(this.input);
    },
  },
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
