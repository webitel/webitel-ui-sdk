<template>
  <component-props :properties="properties" />
  <component-events :events="events" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtDummyDocs',
  data: () => ({
    properties: [
      {
        value: 'src',
        code: '<wt-dummy :src="pic"></wt-dummy>',
        type: 'String',
      },
      {
        value: 'text',
        code: '<wt-dummy :text="$t(\'empty.workspace\')"></wt-dummy>',
        type: 'String',
        default: 'There are no records yet',
      },
      {
        value: 'buttonText',
        code: '<wt-dummy :button-text="$t(\'reusable.save\')"></wt-dummy>',
        type: 'String',
        default: 'localized "ADD"',
      },
      {
        value: 'showAction',
        code: '<wt-dummy show-action></wt-dummy>',
        type: 'Boolean',
        default: false,
        description:
          'The prop controls the display of the button for adding new items',
      },
      {
        value: 'size',
        code: '<wt-dummy size="200"></wt-dummy>',
        type: '[String, Number]',
        default: 200,
      },
      {
        value: 'hiddenText',
        code: '<wt-dummy hidden-text></wt-dummy>',
        type: 'Boolean',
        default: false,
        description: 'If value is true - hides in markup "text"',
      },
    ],
    events: [
      {
        value: 'create',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
.example-wrapper .wt-dummy {
  display: flex;
  align-items: start;
}
</style>
