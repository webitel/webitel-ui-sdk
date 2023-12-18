<template>
  <component-props
    :properties="properties"
  />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtIndicatorDocs',
  data: () => ({
    properties: [
      {
        value: 'color',
        code: '<wt-indicator color="error"></wt-indicator>',
        type: ['String', 'Number'],
        options: ['primary', 'secondary', 'success', 'error', 'transfer', 'disabled', 'break-out', 'info'],
        default: 'secondary',
      },
      {
        value: 'text',
        code: '<wt-indicator text="Hello there!"></wt-indicator>',
        type: 'String',
      },
      {
        value: 'size',
        code: '<wt-indicator size="sm"></wt-indicator>',
        type: 'String',
        options: ['sm', 'md'],
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
