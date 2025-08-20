<template>
  <component-props :properties="properties" />
  <component-slots />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtChipDocs',
  data: () => ({
    properties: [
      {
        value: 'color',
        code: '<wt-chip color="primary"></wt-chip>',
        type: 'String',
        options: [
          'main',
          'outline',
          'accent',
          'secondary',
          'secondary-50',
          'success',
          'danger',
          'transfer',
        ],
        default: 'main',
        description: '"main" and "outline" are chip-specific colors',
      },
      {
        value: 'removable',
        code: '<wt-chip removable></wt-chip>',
        type: 'Boolean',
        default: 'false',
        description: 'Removes chip',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>
