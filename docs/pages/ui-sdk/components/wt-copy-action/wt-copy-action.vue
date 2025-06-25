<template>
  <component-props :properties="properties" />
  <component-events :events="events" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtLabelDocs',
  data: () => ({
    value: 'Copied text',
    properties: [
      {
        value: 'value',
        code: '<wt-copy-action :value="value"></wt-copy-action>',
        type: 'String',
        description: 'Value to be copied',
      },
      {
        value: 'tooltips',
        code: '<wt-copy-action :tooltips="{}"></wt-copy-action>',
        type: 'Object',
        description: 'Value for tooltips before/after copying',
      },
    ],
    events: [
      {
        value: 'click',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>
