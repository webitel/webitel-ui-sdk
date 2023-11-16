<template>
  <section class="mixins">
    <h2>Validation Mixin</h2>
    <article class="mixin">
      <p>Mixin wraps up the validation implementation in the library, providing minimal methods
        for computing the validation state.</p>
      <h3>Props</h3>
      <pre>
        <code class="language-javascript">this.v /* Object: expects vuelidate validation object for this input prop */</code>
        <code class="language-javascript">this.customValidators /* Array with objects. Each object should contain 'name' (validator name) and 'text' (locale) properties */</code>
      </pre>
      <h3>Methods</h3>
      <pre>
        <code class="language-javascript">this.isValidation // Boolean: checks is there any active validators</code>
        <code class="language-javascript">this.invalid // Boolean: checks if validation is throwing "invalid" error</code>
        <code class="language-javascript">this.validationText // String: validation error text, has its own error prioritization</code>
      </pre>
      <p>
        this.validationText contains locales for some default validations, and it can be
        extended with custom validation, passing them via 'custom-validation' prop.
        It's also possible to overwrite text and localization of default validations,
        using the same parameters as per custom validation.
      </p>
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
