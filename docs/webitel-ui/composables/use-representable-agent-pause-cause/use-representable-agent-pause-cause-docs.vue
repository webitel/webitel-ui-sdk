<template>
  <section>
    <h2>useRepresentableAgentPauseCause</h2>
    <article>
      <h3>Usage:</h3>
      <pre><code class="language-javascript">
        import { useRepresentableAgentPauseCause } from '@webitel/ui-sdk/src/composables/useRepresentableAgentPauseCause/useRepresentableAgentPauseCause';
        const { representablePauseCause } = useRepresentableAgentPauseCause(options);
      </code></pre>
    </article>
    <article>
      <h3>Specification:</h3>
      <p>
        Сomposable accepts an input array of causes and converts the data into the required format for display.
      </p>
      <h3>Input params:</h3>
      <figure>

        <pre><code class="language-javascript">{{ inputCauses }}</code></pre>
      </figure>
      <h3>Output params:</h3>
      <figure>
        <pre><code class="language-javascript">{{ representablePauseCause }}</code></pre>
      </figure>

    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import {
  useRepresentableAgentPauseCause
} from '@webitel/ui-sdk/src/composables/useRepresentableAgentPauseCause/useRepresentableAgentPauseCause';

const inputCauses = ref([
  {
    id: 30,
    name: 'Технічна перерва',
    limit_min: 60
  },
  {
    id: 69,
    name: 'Навчання',
    limit_min: 120
  },
  {
    id: 37,
    name: 'Обід',
    limit_min: 23
  },
])

const { representablePauseCause } = useRepresentableAgentPauseCause(inputCauses);
</script>

<style lang="scss" scoped>

</style>
