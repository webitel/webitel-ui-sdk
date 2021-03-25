<template>
  <section>
    <h2>Table Column Select</h2>
    <article>
      <div class="example-wrapper">
        <wt-table-column-select
          v-model="headers"
        ></wt-table-column-select>
        <pre><code class="language-html">
          &lt;wt-table-column-select
            :headers="[
              {value: 'column 1', text: 'Column 1', show: true },
              { value: 'column 2', text: 'Column 2', show: false },
            ]"
          &gt;&lt;/wt-table-column-select&gt;
        </code></pre>
      </div>
    </article>
    <component-model prop="headers" event="change"></component-model>
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
  name: 'wt-table-column-select-docs',
  data: () => ({
    headers: [
      {
        value: 'column 1',
        text: 'Column 1',
        show: true,
      },
      {
        value: 'column 2',
        text: 'Column 2',
        show: false,
      },
    ],
    properties: [
      {
        value: 'headers',
        code: '<wt-table-column-select :headers="[\n'
          + '              {value: \'column 1\', text: \'Column 1\', show: true },\n'
          + '              { value: \'column 2\', text: \'Column 2\', show: false },\n'
          + '            ]"></wt-table-column-select>',
        type: 'Array',
        required: true,
        description: 'Each header should have following schema: { value: String, show: Boolean, text: String }',
      },
      {
        value: 'staticHeaders',
        code: '<wt-table-column-select :headers="headers" :static-headers="[\'agents\']"></wt-table-column-select>',
        description: 'Header values to exclude from selection',
      },
    ],
    events: [
      {
        value: 'change',
        params: [
          {
            name: 'Headers',
            type: 'Array',
            description: 'Mutated headers',
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
