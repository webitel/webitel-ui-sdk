<template>
  <section class="enums">
    <h2>Supervisor Sections</h2>
    <p>
      <code class="language-javascript">Supervisor Sections enum</code> is used for supervisor nav sections identifying across
      projects.
    </p>
    <article class="enum">
      <pre><code class="language-javascript">{{ SupervisorSections }}</code></pre>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';
import SupervisorSections from '@webitel/ui-sdk/src/enums/WebitelApplications/SupervisorSections.enum';
import enumReducer from '../_internals/enumReducer';

export default {
  name: 'SupervisorSectionsEnumDocs',
  computed: {
    SupervisorSections() {
      const _import = 'import SupervisorSections from \'@webitel/ui-sdk/src/enums/WebitelApplications/SupervisorSections.enum\';\n';
      return enumReducer(SupervisorSections, _import);
    },
  },
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
