<template>
  <section class="store-modules">
    <h2>ApiStoreModule</h2>
    <article class="store-module">
      <p>Store module implements actions for working with API interface. Implements
        <router-link
          class="full-docs-link"
          to="base-store-module"
        >BaseStoreModule
        </router-link>
      </p>
      <pre>
        <code class="language-javascript">import ApiStoreModule from '@webitel/ui-sdk/src/store/BaseStoreModules/ApiStoreModule';</code>
        <code class="language-javascript">
          const module = new ApiStoreModule()
            .generateAPIActions(APIModule)
            .getModule();

          export default module;
        </code>
      </pre>
    </article>
    <section>
      <h3>API Interface:</h3>
      <article>
        <p>Default APIModule should have the following interface:</p>
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
        <p>Generates store module actions using passed APIModule</p>
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
    </section>
  </section>
</template>

<script>
export default {
  name: 'api-store-module-docs',
};
</script>

<style scoped>

</style>
