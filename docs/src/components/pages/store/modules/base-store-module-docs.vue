<template>
  <section class="store-modules">
    <h2>BaseStoreModule</h2>
    <article class="store-module">
      <p>Abstract Module implements a universal constructor for store modules:</p>
      <pre>
        <code class="language-javascript">import BaseStoreModule from '@webitel/ui-sdk/src/store/BaseStoreModule/BaseStoreModule';</code>
        <code class="language-javascript">
          const module = new BaseStoreModule({ state })
            .attachAPIModule(APIModule)
            .generateAPIActions()
            .setChildModules({ module1, module2 })
            .getModule({ state, getters, actions, mutations, namespaced });

          export default module;
        </code>
      </pre>
    </article>
    <section>
      <h3>Class API:</h3>
      <article>
        <h4><code>attachAPIModule</code></h4>
        <p>Accepts <code>APIModule</code> object as param. Always used for next method: generateAPIActions.
          Default APIModule should have the following interface:</p>
        <pre><code class="language-javascript">
        {
          getList: function,
          get: function,
          add: function,
          patch: function,
          update: function,
          delete: function,
        }
      </code></pre>
        <p>All methods are optional: if you doesn't need some - doesn't there's no need to specify them.</p>
      </article>
      <article>
        <h4><code>generateAPIActions</code></h4>
        <p>Generates store module actions using previously set APIModule and attaches them to actions</p>
        <pre><code class="language-javascript">
        actions = {
          GET_LIST: (context, params?),          // APIModule.getList({ ...context.state, ...params });
          GET_ITEM: (context, params?),          // APIModule.get({ ...context.state, ...params });
          POST_ITEM: (context),                  // APIModule.add(context.state)
          PATCH_ITEM: (context, { id, changes }),// APIModule.patch({ ...context.state, id, changes })
          UPD_ITEM: (context),                   // APIModule.update(context.state);
          DELETE_ITEM: (context, id),            // APIModule.delete({ ...context.state, id });
        }
      </code></pre>
      </article>
      <article>
        <h4><code>setChildModules</code></h4>
        <p>Sets children modules to store module</p>
      </article>
      <article>
        <h4><code>getModule</code></h4>
        <p>Returns store module itself, built from class state. If some props are passed, they are not deeply merged with
        class properties in created module. created module <code>"namespaced" = true</code> by default.</p>
      </article>
    </section>
  </section>
</template>

<script>
export default {
  name: 'get-namespaced-state-docs',
};
</script>

<style scoped>

</style>
