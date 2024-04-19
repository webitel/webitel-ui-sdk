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
  name: 'WtHintDocs',
  data: () => ({
    slots: [
      {
        name: 'default',
        description: 'Default content slot',
      },
    ],
    properties: [
      {
        value: 'iconColor',
        code: '<wt-hint :icon-сolor="iconColor"></wt-hint>',
        type: 'String',
        default: 'info',
        description: 'This prop is changing color only for hint icon',
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
