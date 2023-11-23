<template>
  <component-props
    :properties="properties"
  />
  <component-slots />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtTooltipDocs',
  data: () => ({
    properties: [
      {
        value: 'contrast',
        code: '<wt-tooltip contrast></wt-tooltip>',
        type: 'Boolean',
        default: 'false',
        description: 'Inverts tooltip colors',
      },
      {
        value: 'placement',
        code: '<wt-tooltip placement="left"></wt-tooltip>',
        type: 'String',
        default: 'auto',
        description: 'see [Floating UI](https://floating-ui.com/docs/tutorial#placements) docs, + "auto" for autoPlacement',
      },
      {
        value: 'popper-class',
        code: '<wt-tooltip popper-class="my-class"></wt-tooltip>',
        type: 'String',
        description: 'add special class to a floating part of tooltip',
      },
      {
        value: 'triggers',
        code: '<wt-tooltip :triggers="[\'click\']"></wt-tooltip>',
        type: 'Array',
        default: '[\'hover\', \'focus\', \'touch\']',
        description: 'see [Floating Vue](https://floating-vue.starpad.dev/api/#triggers) docs',
      },
      {
        value: 'popper-triggers',
        code: '<wt-tooltip :popper-triggers="[\'hover\']"></wt-tooltip>',
        type: 'Array',
        description: 'see [Floating Vue](https://floating-vue.starpad.dev/api/#poppertriggers) docs',
      },
      {
        value: 'visible',
        code: '<wt-tooltip visible></wt-tooltip>',
        type: 'Boolean',
        default: 'false',
        description: 'Make tooltip visible',
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
