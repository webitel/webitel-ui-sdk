<template>
  <section class="scripts">
    <h2>useCachedInterval</h2>
    <article>
      <h3>Usage:</h3>
      <pre><code class="language-javascript">
        import { useCachedInterval } from '@webitel/ui-sdk/src/composables/useCachedInterval/useCachedInterval';

        setup() {
          const { subscribe } = useCachedInterval({ timeout: 3000 });
          return { subscribe };
        },

        subscribe(callback);
      </code></pre>
    </article>
    <article>
      <h3>Input params:</h3>
        <ul>
          <li>
            <p>- timeout - frequency of function calls (default - 5min)</p>
          </li>
          <li>
            <p>- localStorageKey - key from localStorage where the timeout is stored (default - 'auto-refresh')</p>
          </li>
        </ul>
      <h3>Specification:</h3>
      <p>
        Сomposable run a trans callback at a specified frequency.
        We take startup time from parameter timeout, or localStorageKey, or 5 minutes by default
      </p>
    </article>
  </section>
</template>

<script setup>

</script>

<style scoped>

</style>
