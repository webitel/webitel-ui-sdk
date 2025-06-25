<template>
  <component-props :properties="properties" />
  <component-slots />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtInputInfoDocs',
  data: () => ({
    properties: [
      {
        value: 'invalid',
        code: '<wt-input-info invalid></wt-input-info>',
        type: 'Boolean',
        default: 'false',
        description: 'Changes input info visual style to invalid (red)',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>
