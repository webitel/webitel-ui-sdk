<template>
  <section class="enums">
    <h2>Admin Sections</h2>
    <p><code class="language-javascript">Admin Sections enum</code> is used for admin nav sections identifying across
      projects.</p>
    <article class="enum">
      <pre><code class="language-javascript">{{ AdminSections }}</code></pre>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';
import AdminSections from '@webitel/ui-sdk/src/enums/WebitelApplications/AdminSections.enum';
import enumReducer from '../_internals/enumReducer';

export default {
  name: 'admin-sections-enum-docs',
  mounted() {
    Prism.highlightAll();
  },
  computed: {
    AdminSections() {
      const _import = 'import AdminSections from \'@webitel/ui-sdk/src/enums/WebitelApplications/AdminSections.enum\';\n';
      return enumReducer(AdminSections, _import);
    },
  },
};
</script>

<style scoped>

</style>
