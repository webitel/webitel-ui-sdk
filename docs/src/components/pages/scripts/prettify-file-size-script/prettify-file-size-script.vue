<template>
  <section class="scripts">
    <h2>prettifyFileSize</h2>
    <article class="script">
      <p>prettifies bytes number to string size script: </p>
      <wt-input style="max-width: 400px;" v-model="input" label="Size"></wt-input>
      <div>Prettified size is: <strong>{{ output }}</strong></div>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';
import prettifyFileSize from '@webitel/ui-sdk/src/scripts/prettifyFileSize';

export default {
  name: 'prettify-file-size-script-docs',
  data: () => ({
    input: 1024,
  }),
  mounted() {
    Prism.highlightAll();
  },
  computed: {
    output() {
      return prettifyFileSize(this.input);
    },
  },
};
</script>

<style scoped>

</style>
