<template>
  <section class="module docs-content-wrapper">
    <h2>Card Store Module</h2>
    <p><strong>Introduction: </strong> Module contains the necessary tools for organizing data in a open card view</p>
    <article>
      <strong>Module includes: </strong>
      <h3><code> - class CardStoreModule</code></h3>
      <ul>
        <li><h4>* inherited from BaseStoreModule</h4></li>
        <li><h4>* Includes state, actions and table mutations typical for the entire system</h4></li>
      </ul>

      <h3><code> - composable useCardStore.js</code></h3>
      <ul>
        <li><h4>* is an intermediate link between ui-component and card store</h4></li>
        <li><h4>* namespace input parameter</h4></li>
        <li><h4>* This is a function that returns an object with:</h4>
          <ul>
            <li><h4>--- computed properties to return the value of the required field from the store</h4></li>
            <li><h4>--- methods for distatch in store</h4></li>
          </ul>
        </li>
      </ul>

      <article>
        <h3>Usage example useCardStore</h3>
        <pre>
        <code class="language-javascript">
  import { useCardStore } from '@webitel/ui-sdk/src/modules/CardStoreModule/composables/useCardStore';

  const { id, itemInstance } = useCardStore(namespace);
        </code>
     </pre>
      </article>

      <strong>The general structure of building a store: <a class="full-docs-link" href="https://dev.webitel.com/ui-sdk/ui/modules/notifications-module/table-store-module">TableStoreModule</a> </strong>

    </article>

  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'card-store-module-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>
</style>
