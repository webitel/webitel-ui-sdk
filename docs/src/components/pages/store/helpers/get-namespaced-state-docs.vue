<template>
  <section class="store-helpers">
    <h2>getNamespacedState</h2>
    <article class="store-helper">
      <p>Helper returns nested state value by namespace:</p>
      <pre>
        <code class="language-javascript">import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';</code>
        <code class="language-javascript">
          ...mapState({
            value(state) {
              // this.namespace = 'queues/filters';
              return getNamespacedState(state, this.namespace).value;
            },
          }),
        </code>
      </pre>
    </article>
  </section>
</template>

<script>
export default {
  name: 'get-namespaced-state-docs',
};
</script>

<style scoped>

</style>
