<template>
  <component-model />
  <component-props :properties="properties" />
  <component-events :events="events" />
  <component-slots :slots="slots" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtInputNumberDocs',
  data: () => ({
    properties: [
      {
        value: 'modelValue',
        code: '<wt-input-number v-model="value"></wt-input-number>',
        type: 'Number',
        default: 'null',
        description: 'Input value (v-model)',
      },
      {
        value: 'label',
        code: '<wt-input-number label="Quantity"></wt-input-number>',
        type: 'String',
        default: '',
        description: 'Input label',
      },
      {
        value: 'placeholder',
        code: '<wt-input-number placeholder="Enter number"></wt-input-number>',
        type: 'String',
        default: '',
        description: 'Input placeholder',
      },
      {
        value: 'disabled',
        code: '<wt-input-number disabled></wt-input-number>',
        type: 'Boolean',
        default: 'false',
        description: 'Disable input',
      },
      {
        value: 'required',
        code: '<wt-input-number required></wt-input-number>',
        type: 'Boolean',
        default: 'false',
        description: 'Show required asterisk in label',
      },
      {
        value: 'min',
        code: '<wt-input-number :min="0"></wt-input-number>',
        type: 'Number',
        description: 'Minimum value',
      },
      {
        value: 'max',
        code: '<wt-input-number :max="100"></wt-input-number>',
        type: 'Number',
        description: 'Maximum value',
      },
      {
        value: 'step',
        code: '<wt-input-number :step="1"></wt-input-number>',
        type: 'Number',
        default: '1',
        description: 'Step increment/decrement value',
      },
      {
        value: 'minFractionDigits',
        code: '<wt-input-number :min-fraction-digits="2"></wt-input-number>',
        type: 'Number',
        description: 'Minimum number of decimal digits',
      },
      {
        value: 'maxFractionDigits',
        code: '<wt-input-number :max-fraction-digits="2"></wt-input-number>',
        type: 'Number',
        description: 'Maximum number of decimal digits',
      },
      {
        value: 'showButtons',
        code: '<wt-input-number show-buttons></wt-input-number>',
        type: 'Boolean',
        default: 'false',
        description: 'Show increment/decrement buttons',
      },
    ],
    events: [
      {
        value: 'update:modelValue',
        params: [{ name: 'value', type: 'Number' }],
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
        description: 'Prefix content for input group (currency symbol, etc.)',
      },
      {
        name: 'suffix',
        description: 'Suffix content for input group (unit label, etc.)',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>
