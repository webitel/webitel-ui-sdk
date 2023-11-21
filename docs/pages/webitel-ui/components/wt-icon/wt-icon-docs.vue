<template>
  <section>
    <component-props
      :properties="properties"
    />
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtIconDocs',
  data: () => ({
    properties: [
      {
        value: 'icon',
        code: '<wt-icon icon="close"></wt-icon>',
        type: 'String',
        required: true,
      },
      {
        value: 'size',
        code: '<wt-icon icon="close" size="sm"></wt-icon>',
        type: 'String',
        options: ['sm (16px)', 'md (24px)', 'lg (32px)', 'xl (40px)'],
        default: 'md',
      },
      {
        value: 'color',
        code: '<wt-icon icon="close" color="success"></wt-icon>',
        type: 'String',
        default: 'default',
        options: [
          'default - var(--icon-color)',
          'contrast - var(--main-color)',
          'active - default icon color at :hover',
          'disabled - icon color, but with "disabled" opacity',
          'success - inherited from Semantic colors',
          'danger - inherited from Semantic colors',
          'transfer - inherited from Semantic colors',
          'hold - inherited from Semantic colors',
          'secondary-50',
        ],
        description: 'Icon colors. Attention! Hover color is changing only for "default color".',
      },
      {
        value: 'iconPrefix',
        code: '<wt-icon icon="close" icon-prefix="adm"></wt-icon>',
        type: 'String',
        default: '',
        description: `inserts icon name prefix between "icon" and actual icon name ("icon" prop).
            Useful for library icons extension with project-level icons with this prefix in name`,
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
