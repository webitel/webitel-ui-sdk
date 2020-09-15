<template>
  <section class="mixins">
    <h2>Validation Mixin</h2>
    <article class="mixin">
      <p>Mixin wraps up the validation implementation in the library, providing minimal methods
        for computing the validation state.</p>
      <pre>
        <code class="language-javascript">this.isValidation // Boolean: checks is there any active validators</code>
        <code class="language-javascript">this.invalid // Boolean: checks if validation is throwing "invalid" error</code>
        <code class="language-javascript">this.validationText // String: validation error text, has its own error prioritization</code>
      </pre>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'validation-mixin-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
