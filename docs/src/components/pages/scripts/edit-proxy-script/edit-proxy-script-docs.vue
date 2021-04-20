<template>
  <section class="scripts">
    <h2>editProxy</h2>
    <article>
      <p>Proxies passed object and after each object property assigning marks this object
        <b><code>_dirty</code></b> flag to <b><code>true</code></b></p>
      <strong>Note: if you want _dirty property to be reactive, it should declared
      before this object will be set to store or component data</strong>
    </article>
    <article>
      <h3>Example usage:</h3>
      <pre><code class="language-javascript">
        import editProxy from '@webitel/ui-sdk/src/scripts/editProxy';
        const object = editProxy({ value: 'test', _dirty: false });
        object.value = 'upd value';
        console.log(object._dirty); // true
      </code></pre>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'edit-proxy-script-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
