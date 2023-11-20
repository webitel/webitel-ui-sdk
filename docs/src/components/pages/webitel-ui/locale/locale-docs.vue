<template>
  <section>
    <h2>Locale</h2>
    <pre><code class="language-javascript">
      {{ en }}
    </code></pre>
  </section>
</template>

<script>
import WebitelUiLocaleEn from '../../../../../../src/locale/en/en';

export default {
  name: 'LocaleDocs',
  computed: {
    en: () => WebitelUiLocaleEn,
  },
};
</script>

<style scoped>

</style>
