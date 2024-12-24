<template>
  <component-props
    :properties="properties"
  />
  <component-events
    :events="events"
  />
  <component-slots />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtTableActionsDocs',
  data: () => ({
    properties: [
      {
        value: 'icons',
        code: '<wt-table-actions :icons="[]"></wt-table-actions>',
        type: 'Array',
        options: ['import', 'export', 'filter-reset', 'column-select', 'refresh', 'settings'],
        default: '[\'refresh\']',
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
