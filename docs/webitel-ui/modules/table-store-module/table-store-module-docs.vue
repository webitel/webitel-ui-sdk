<template>
  <section class="module docs-content-wrapper">
    <h2>Table Store Module</h2>
    <p><strong>Introduction: </strong> Module contains the necessary tools for organizing data in a table view</p>
    <article>
      <strong>Module includes: </strong>
      <h3><code> - class TableStoreModule</code></h3>
      <ul>
        <li><h4>* inherited from BaseStoreModule</h4></li>
        <li><h4>* Includes state, getters, actions and table mutations typical for the entire system</h4></li>
      </ul>

      <h3><code> - composable useTableStore.js</code></h3>
      <ul>
        <li><h4>* is an intermediate link between ui-component and table store</h4></li>
        <li><h4>* namespace input parameter</h4></li>
        <li><h4>* This is a function that returns an object with:</h4>
          <ul>
            <li><h4>--- computed properties to return the value of the required field from the store</h4></li>
            <li><h4>--- methods for distatch in store</h4></li>
          </ul>
        </li>
      </ul>

      <article>
        <h3>Usage example useTableStore</h3>
        <pre>
        <code class="language-javascript">
  import { useTableStore } from '@webitel/ui-sdk/src/modules/TableStoreModule/composables/useTableStore';

  const { dataList, isLoading, headers, size } = useTableStore(namespace);
        </code>
     </pre>
      </article>

      <strong>The general structure of building a store: </strong>
      <h3>Scheme of the steps below</h3>
      <img :src="pic"/>
      <h3><code>Step 1. create an instance of the ApiStoreModule store</code></h3>

      <article>
        <pre>
        <code class="language-javascript">
  import ApiStoreModule from '@webitel/ui-sdk/src/store/BaseStoreModules/ApiStoreModule';
  import AuditAPI from '../../../app/api/APIRepository';

  const api = new ApiStoreModule()
  .generateAPIActions(AuditAPI)
  .getModule();
        </code>
     </pre>
      </article>

      <h3><code>Step 2. create an instance of the TableStoreModule store</code></h3>
      <p>Take headers. Accepts an api module as a child(step 1) and can accept additional (for example, filters)</p>

      <article>
        <pre>
        <code class="language-javascript">
  import TableStoreModule from '@webitel/ui-sdk/src/modules/TableStoreModule/store/TableStoreModule';
  import headers from './_internals/headers';

  const table = new TableStoreModule({ headers })
  .setChildModules({ api, filters })
  .getModule();
        </code>
     </pre>
      </article>

      <h3><code>Step 3. create an instance of the CardStoreModule store </code></h3>
      <p>More details:
        <a class="full-docs-link" href="https://dev.webitel.com/ui-sdk/ui/modules/notifications-module/card-store-module">CardStoreModule</a>
      </p>
      <p>Accepts an api module as a child(step 1)</p>

      <article>
        <pre>
        <code class="language-javascript">
  import CardStoreModule from '@webitel/ui-sdk/src/modules/CardStoreModule/store/CardStoreModule';

  const card = new CardStoreModule()
  .setChildModules({ api })
  .getModule();
        </code>
     </pre>
      </article>

      <h3><code>Step 4. Create partition store</code></h3>
      <p>Instance of the BaseStoreModule store. Accepts an table and card module as a child(step 2 and 3)</p>

      <article>
        <pre>
        <code class="language-javascript">
  import BaseStoreModule from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule';

  const scorecards = new BaseStoreModule()
  .setChildModules({ table, card })
  .getModule();
        </code>
     </pre>
      </article>

      </article>

  </section>
</template>

<script>
import Prism from 'prismjs';
import pic from './assets/schema.png';

export default {
  name: 'table-store-module-docs',
  data: () => ({
    pic,
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>
</style>
