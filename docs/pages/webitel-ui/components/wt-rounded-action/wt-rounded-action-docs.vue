<template>
  <section>
    <component-props :properties="properties" />
    <component-events :events="events" />
    <component-slots />
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtRoundedActionDocs',
  data: () => ({
    properties: [
      {
        value: 'color',
        code: '<wt-rounded-action color="secondary"></wt-rounded-action>',
        type: 'String',
        options: [
          'secondary',
          'accent',
          'success',
          'danger',
          'hold',
          'transfer',
        ],
        default: 'secondary',
      },
      {
        value: 'icon',
        code: '<wt-rounded-action icon="call"></wt-rounded-action>',
        type: 'String',
      },
      {
        value: 'iconColor',
        code: '<wt-rounded-action icon-color="secondary-50"></wt-rounded-action>',
        type: 'String',
        description:
          'a prop for passing a specific color to icon. not for regular usage',
      },
      {
        value: 'rounded',
        code: '<wt-rounded-action rounded></wt-rounded-action>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'wide',
        code: '<wt-rounded-action wide></wt-rounded-action>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'disabled',
        code: '<wt-rounded-action disabled></wt-rounded-action>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'active',
        code: '<wt-rounded-action active></wt-rounded-action>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'size',
        code: '<wt-rounded-action size="md"></wt-rounded-action>',
        type: 'String',
        default: 'md',
        options: ['sm', 'md'],
        description: 'Controls button size',
      },
      {
        value: 'Plus all other wt-button props including "loading" :)',
      },
    ],
    events: [
      {
        value: 'click',
        params: [{ name: 'event', type: 'Event' }],
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
.example-wrapper .wt-rounded-action {
  margin: 10px;
}
</style>
