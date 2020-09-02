<template>
  <section>
    <h2>Table Actions</h2>
    <article>
      <div class="example-wrapper">
        <wt-table-actions
          :icons="['import', 'export', 'filter-reset', 'column-select', 'refresh', 'settings']"
        ></wt-table-actions>
        <pre><code class="language-html">
          &lt;wt-table-actions
            :icons="['import', 'export', 'filter-reset', 'column-select', 'refresh', 'settings']"
          &gt;&lt;/wt-table-actions&gt;
        </code></pre>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <component-events
      :events="events"
    ></component-events>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'table-actions',
  data: () => ({
    properties: [
      {
        value: 'icons',
        code: '<wt-pagination :icons="[]"></wt-pagination>',
        type: 'Array',
        options: ['import', 'export', 'filter-reset', 'column-select', 'refresh', 'settings'],
        default: "['refresh']",
      },
    ],
    events: [
      {
        value: 'input',
        params: [
          {
            name: 'button name: [import, export, filter-reset, column-select, refresh, settings]',
            type: 'String',
          },
        ],
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
</style>
