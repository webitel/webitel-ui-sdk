<template>
  <section class="enums">
    <h2>Chat Gateway Provider</h2>
    <p>
      <code class="language-javascript">Chat Gateway Provider enum</code> is used to identify providers that are supported in the system
      projects.
    </p>
    <article class="enum">
      <pre><code class="language-javascript">{{ ChatGatewayProvider }}</code></pre>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';
import ChatGatewayProvider from '../../../../../src/enums/ChatGatewayProvider/ChatGatewayProvider.enum';
import enumReducer from '../_internals/enumReducer';

export default {
  name: 'AdminSectionsEnumDocs',
  computed: {
    ChatGatewayProvider() {
      const _import = 'import AdminSections from \'@webitel/ui-sdk/src/enums/ChatGatewayProvider/ChatGatewayProvider.enum\';\n';
      return enumReducer(ChatGatewayProvider, _import);
    },
  },
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
