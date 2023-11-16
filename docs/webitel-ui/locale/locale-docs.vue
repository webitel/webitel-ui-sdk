<template>
  <section>
    <h2>Locale</h2>
    <pre><code class="language-javascript">
      {{ en }}
    </code></pre>
  </section>
</template>

<script>
import WebitelUiLocaleEn from '@webitel/ui-sdk/src/locale/en/en';

export default {
  name: 'locale-docs',
  computed: {
    en: () => WebitelUiLocaleEn,
  },
};
</script>

<style scoped>

</style>
