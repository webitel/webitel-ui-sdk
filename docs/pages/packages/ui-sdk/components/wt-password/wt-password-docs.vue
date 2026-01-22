<template>
  <component-model />
  <component-props :properties="properties" />
  <component-events :events="events" />
  <component-slots :slots="slots" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtPasswordDocs',
  data: () => ({
    properties: [
      {
        value: 'modelValue',
        code: '<wt-password v-model="value"></wt-password>',
        type: 'String',
        default: '',
        description: 'Input value (v-model)',
      },
      {
        value: 'label',
        code: '<wt-password label="Password"></wt-password>',
        type: 'String',
        default: '',
        description: 'Input label',
      },
      {
        value: 'placeholder',
        code: '<wt-password placeholder="Enter password"></wt-password>',
        type: 'String',
        default: '',
        description: 'Input placeholder',
      },
      {
        value: 'disabled',
        code: '<wt-password disabled></wt-password>',
        type: 'Boolean',
        default: 'false',
        description: 'Disable input',
      },
      {
        value: 'required',
        code: '<wt-password required></wt-password>',
        type: 'Boolean',
        default: 'false',
        description: 'Show required asterisk in label',
      },
      {
        value: 'invalid',
        code: '<wt-password invalid></wt-password>',
        type: 'Boolean',
        default: 'false',
        description: 'Show invalid state',
      },
      {
        value: 'toggleMask',
        code: '<wt-password :toggle-mask="true"></wt-password>',
        type: 'Boolean',
        default: 'true',
        description: 'Show toggle button to show/hide password',
      },
    ],
    events: [
      {
        value: 'update:modelValue',
        params: [{ name: 'value', type: 'String' }],
        description: 'Emitted when input value changes',
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
