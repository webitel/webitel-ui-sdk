<template>
  <component-model event="change" />
  <component-props :properties="properties" />
  <component-events :events="events" />
  <component-slots :slots="slots" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtSwitcherDocs',
  data: () => ({
    value: false,
    properties: [
      {
        value: 'value',
        code: '<wt-switcher :value="value"></wt-switcher>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'label',
        code: '<wt-switcher label="Label"></wt-switcher>',
        type: 'String',
        default: '',
      },
      {
        value: 'labelLeft',
        code: '<wt-switcher label-left></wt-switcher>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'disabled',
        code: '<wt-switcher disabled></wt-switcher>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'labelProps',
        code: '<wt-checkbox :label-props="{}"></wt-checkbox>',
        type: 'Object',
        description: 'Object with props, passed down to wt-label as props',
      },
    ],
    events: [
      {
        value: 'change',
        params: [
          {
            name: 'value',
            type: 'Boolean',
            description: 'Returns inverted value',
          },
        ],
      },
    ],
    slots: [
      {
        name: 'label',
        scope: [{ name: 'label' }],
        description: 'Custom label slot',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>
