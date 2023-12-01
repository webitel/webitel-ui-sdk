<template>
  <component-props
    :properties="properties"
  />
  <component-slots
    :slots="slots"
  />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtExpansionPanelDocs',
  data: () => ({
    properties: [
      {
        value: 'size',
        code: '<wt-expansion-panel size="sm"></wt-expansion-panel>',
        type: 'String',
        default: 'md',
        options: ['sm', 'md'],
      },
    ],
    slots: [
      {
        name: 'default',
        description: 'Displaying collapsible content',
      },
      {
        name: 'title',
        description: 'Display title for collapse panel',
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
