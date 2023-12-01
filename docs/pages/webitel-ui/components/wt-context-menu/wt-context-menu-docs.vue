<template>
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
  name: 'WtContextMenuDocs',
  data: () => ({
    properties: [
      {
        value: 'options',
        code: ' <wt-context-menu :options="options"></wt-context-menu>',
        type: 'Array',
        description: 'Array of objects [{ text: text, ?disabled: boolean }]',
        required: true,
      },
      {
        value: 'visible',
        code: ' <wt-context-menu :options="options" :visible="true"></wt-context-menu>',
        type: 'Boolean',
        default: 'true',
      },
      {
        value: 'width',
        code: ' <wt-context-menu width="300px"></wt-context-menu>',
        type: ['String'],
        default: 'auto',
      },
      {
        value: 'minWidth',
        code: ' <wt-context-menu min-width="300px"></wt-context-menu>',
        type: ['String'],
        default: '160px',
      },
      {
        value: 'width',
        code: ' <wt-context-menu width="300px"></wt-context-menu>',
        type: ['String'],
        default: 'auto',
      },
      {
        value: 'maxWidth',
        code: ' <wt-context-menu max-width="300px"></wt-context-menu>',
        type: ['String'],
        default: '300px',
      },
    ],
    events: [
      {
        value: 'click',
        params: [
          { name: 'Option and index', type: 'Object' },
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
