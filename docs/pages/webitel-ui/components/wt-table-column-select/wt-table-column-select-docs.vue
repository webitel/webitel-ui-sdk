<template>
  <component-model
    event="change"
    prop="headers"
  />
  <component-props
    :properties="properties"
  />
  <component-events
    :events="events"
  />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtTableColumnSelectDocs',
  data: () => ({
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
