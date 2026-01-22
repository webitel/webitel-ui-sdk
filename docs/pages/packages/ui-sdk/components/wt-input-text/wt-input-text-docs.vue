<template>
  <component-model />
  <component-props :properties="properties" />
  <component-events :events="events" />
  <component-slots :slots="slots" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtInputTextDocs',
  data: () => ({
    properties: [
      {
        value: 'modelValue',
        code: '<wt-input-text v-model="value"></wt-input-text>',
        type: 'String',
        default: '',
        description: 'Input value (v-model)',
      },
      {
        value: 'label',
        code: '<wt-input-text label="Username"></wt-input-text>',
        type: 'String',
        default: '',
        description: 'Input label',
      },
      {
        value: 'placeholder',
        code: '<wt-input-text placeholder="Enter text"></wt-input-text>',
        type: 'String',
        default: '',
        description: 'Input placeholder',
      },
      {
        value: 'disabled',
        code: '<wt-input-text disabled></wt-input-text>',
        type: 'Boolean',
        default: 'false',
        description: 'Disable input',
      },
      {
        value: 'required',
        code: '<wt-input-text required></wt-input-text>',
        type: 'Boolean',
        default: 'false',
        description: 'Show required asterisk in label',
      },
      {
        value: 'invalid',
        code: '<wt-input-text invalid></wt-input-text>',
        type: 'Boolean',
        default: 'false',
        description: 'Show invalid state',
      },
      {
        value: 'preventTrim',
        code: '<wt-input-text prevent-trim></wt-input-text>',
        type: 'Boolean',
        default: 'false',
        description: 'Prevent trimming input value',
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
      {
        name: 'prefix',
        description: 'Prefix content for input group (icon, text, etc.)',
      },
      {
        name: 'suffix',
        description: 'Suffix content for input group (icon, text, etc.)',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>
