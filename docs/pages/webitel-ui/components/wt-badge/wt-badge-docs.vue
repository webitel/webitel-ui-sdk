<template>
  <component-props
    :properties="properties"
  />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtBadgeDocs',
  data: () => ({
    properties: [
      {
        value: 'colorVariable',
        code: '<wt-badge color-variable="true-color"></wt-badge>',
        type: 'String',
        options: ['Any color from available colors in variables. For more information, see /style/colors section.'],
        default: 'false-color',
        description: 'Note! Variable name is passed without leading "--" strokes',
      },
      {
        value: 'outside',
        code: '<wt-badge outside></wt-badge>',
        type: 'Boolean',
        default: 'false',
        description: 'Draws badge outside of its container',
      },
      {
        value: 'icon-badge',
        code: '<wt-badge icon-badge="dnd"></wt-badge>',
        type: 'String',
        default: '',
        description: 'Replaces simple filled badge with predefined icon',
        options: ['dnd'],
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
.badge-wrapper {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 1px solid blue;
}
</style>
