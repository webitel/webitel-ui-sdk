<template>
  <component-model />
  <component-props :properties="properties" />
  <component-events :events="events" />
  <component-slots :slots="slots" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtTimeInputDocs',
  data: () => ({
    properties: [
      {
        value: 'value',
        code: '<wt-time-input :value="value"></wt-time-input>',
        type: 'Number',
        default: 0,
      },
      {
        value: 'label',
        code: '<wt-time-input label="Label"></wt-time-input>',
        type: 'String',
        default: '',
      },
      {
        value: 'name',
        code: '<wt-time-input name="my-time-input"></wt-time-input>',
        type: 'String',
        default: '',
        description: 'Input id name for label association',
      },
      {
        value: 'maxValue',
        code: '<wt-time-input :max-value="59"></wt-time-input>',
        type: 'Number',
        default: null,
      },
      {
        value: 'required',
        code: '<wt-time-input required></wt-time-input>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'disabled',
        code: '<wt-time-input disabled></wt-time-input>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'outline',
        code: '<wt-time-input outline></wt-time-input>',
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
        value: 'input',
        params: [{ name: 'value', type: 'Number' }],
      },
      {
        value: 'PLUS ALL NATIVE INPUT EVENTS',
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
